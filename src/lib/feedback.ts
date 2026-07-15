import { getSupabaseClient, getSupabaseUrl, isSupabaseConfigured } from "./supabase";

export type FeedbackScreenshot = {
  name: string;
  size: number;
  type: string;
  dataUrl: string;
};

export type FeedbackEntry = {
  id: string;
  module: string;
  pageName: string;
  pagePath: string;
  detail: string;
  screenshots: FeedbackScreenshot[];
  submitDate: string;
  status: "pending" | "resolved";
  submitter?: string;
  note?: string;
  createdAt: string;
};

export type FeedbackDraft = Omit<FeedbackEntry, "id" | "createdAt">;

export type FeedbackDataSource = {
  mode: "remote" | "local";
  label: string;
  description: string;
  endpoint?: string;
  remoteConfigured: boolean;
  remoteAvailable: boolean;
  adminAuthenticated?: boolean;
  adminEmail?: string;
  viewer?: "visitor" | "admin";
  error?: string;
};

export type FeedbackListResult = {
  entries: FeedbackEntry[];
  source: FeedbackDataSource;
};

export type FeedbackSubmitResult = {
  entry: FeedbackEntry;
  source: FeedbackDataSource;
};

type FeedbackRow = {
  id: string;
  owner_id: string;
  module: string;
  page_name: string;
  page_path: string;
  detail: string;
  screenshots: FeedbackScreenshot[];
  submit_date: string;
  status: "pending" | "resolved";
  submitter: string | null;
  note: string | null;
  created_at: string;
};

const FEEDBACK_STORAGE_KEY = "xincailiao-design-feedback";
export const FEEDBACK_STORAGE_EVENT = "xincailiao-feedback-updated";

function feedbackEndpoint() {
  return isSupabaseConfigured() ? `${getSupabaseUrl()}/rest/v1/feedback_entries` : "";
}

function remoteSource(options: Pick<FeedbackDataSource, "adminAuthenticated" | "adminEmail" | "viewer" | "error"> = {}): FeedbackDataSource {
  const isAdmin = options.viewer === "admin";
  return {
    mode: "remote",
    label: isAdmin ? "全部反馈" : "我的反馈",
    description: isAdmin
      ? "已安全连接共享反馈库，当前账号可以查看和处理所有用户反馈。"
      : "无需登录即可查看当前浏览器提交的反馈；其他访客的内容不会显示。",
    endpoint: feedbackEndpoint(),
    remoteConfigured: true,
    remoteAvailable: !options.error,
    ...options,
  };
}

function localSource(): FeedbackDataSource {
  return {
    mode: "local",
    label: "本地浏览器",
    description: "当前仅用于本机开发预览，线上发布前需连接共享反馈库。",
    remoteConfigured: false,
    remoteAvailable: false,
  };
}

function isFeedbackScreenshot(value: unknown): value is FeedbackScreenshot {
  if (!value || typeof value !== "object") return false;
  const screenshot = value as Partial<FeedbackScreenshot>;
  return typeof screenshot.name === "string"
    && typeof screenshot.size === "number"
    && typeof screenshot.type === "string"
    && typeof screenshot.dataUrl === "string";
}

function normalizeFeedbackEntry(value: unknown): FeedbackEntry | null {
  if (!value || typeof value !== "object") return null;
  const row = value as Partial<FeedbackRow>;
  if (!row.id || !row.module || !row.page_path || !row.detail || !row.submit_date || !row.created_at) return null;

  return {
    id: String(row.id),
    module: String(row.module),
    pageName: row.page_name ? String(row.page_name) : String(row.page_path),
    pagePath: String(row.page_path),
    detail: String(row.detail),
    screenshots: Array.isArray(row.screenshots) ? row.screenshots.filter(isFeedbackScreenshot) : [],
    submitDate: String(row.submit_date),
    status: row.status === "resolved" ? "resolved" : "pending",
    submitter: row.submitter ? String(row.submitter) : undefined,
    note: row.note ? String(row.note) : undefined,
    createdAt: String(row.created_at),
  };
}

function toFeedbackRow(entry: FeedbackEntry, ownerId: string): FeedbackRow {
  return {
    id: entry.id,
    owner_id: ownerId,
    module: entry.module,
    page_name: entry.pageName,
    page_path: entry.pagePath,
    detail: entry.detail,
    screenshots: entry.screenshots,
    submit_date: entry.submitDate,
    status: entry.status,
    submitter: entry.submitter ?? null,
    note: entry.note ?? null,
    created_at: entry.createdAt,
  };
}

function readLocalFeedbackEntries(): FeedbackEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(FEEDBACK_STORAGE_KEY);
    if (!raw) return [];
    const entries = JSON.parse(raw);
    return Array.isArray(entries)
      ? entries.map((entry) => normalizeLegacyEntry(entry)).filter((entry): entry is FeedbackEntry => Boolean(entry))
      : [];
  } catch (_) {
    return [];
  }
}

function normalizeLegacyEntry(value: unknown): FeedbackEntry | null {
  if (!value || typeof value !== "object") return null;
  const entry = value as Partial<FeedbackEntry>;
  if (!entry.id || !entry.module || !entry.pagePath || !entry.detail || !entry.submitDate || !entry.createdAt) return null;
  return {
    id: String(entry.id),
    module: String(entry.module),
    pageName: entry.pageName ? String(entry.pageName) : String(entry.pagePath),
    pagePath: String(entry.pagePath),
    detail: String(entry.detail),
    screenshots: Array.isArray(entry.screenshots) ? entry.screenshots.filter(isFeedbackScreenshot) : [],
    submitDate: String(entry.submitDate),
    status: entry.status === "resolved" ? "resolved" : "pending",
    submitter: entry.submitter ? String(entry.submitter) : undefined,
    note: entry.note ? String(entry.note) : undefined,
    createdAt: String(entry.createdAt),
  };
}

function createEntry(draft: FeedbackDraft): FeedbackEntry {
  return {
    ...draft,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
}

function createLocalEntry(draft: FeedbackDraft) {
  const entry = createEntry(draft);
  window.localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify([entry, ...readLocalFeedbackEntries()]));
  window.dispatchEvent(new CustomEvent(FEEDBACK_STORAGE_EVENT));
  return entry;
}

export async function listFeedbackEntries(): Promise<FeedbackListResult> {
  if (!isSupabaseConfigured()) {
    return { entries: readLocalFeedbackEntries(), source: localSource() };
  }

  try {
    const supabase = getSupabaseClient();
    const session = await ensureFeedbackSession();
    const { data: isAdmin, error: adminCheckError } = await supabase.rpc("is_feedback_admin");
    if (adminCheckError) throw adminCheckError;
    const viewer = isAdmin ? "admin" : "visitor";
    const adminEmail = isAdmin ? session.user.email : undefined;
    const { data, error } = await supabase
      .from("feedback_entries")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;

    return {
      entries: (data ?? []).map(normalizeFeedbackEntry).filter((entry): entry is FeedbackEntry => Boolean(entry)),
      source: remoteSource({ viewer, adminAuthenticated: Boolean(isAdmin), adminEmail }),
    };
  } catch (error) {
    return {
      entries: [],
      source: remoteSource({
        viewer: "visitor",
        error: error instanceof Error ? error.message : "共享反馈库暂时不可用",
      }),
    };
  }
}

export async function submitFeedbackEntry(draft: FeedbackDraft): Promise<FeedbackSubmitResult> {
  if (!isSupabaseConfigured()) {
    const entry = createLocalEntry(draft);
    return { entry, source: localSource() };
  }

  const entry = createEntry(draft);
  const session = await ensureFeedbackSession();
  const { error } = await getSupabaseClient().from("feedback_entries").insert(toFeedbackRow(entry, session.user.id));
  if (error) throw new Error(`反馈未能提交：${error.message}`);
  return { entry, source: remoteSource({ viewer: "visitor" }) };
}

export async function deleteFeedbackEntry(id: string): Promise<FeedbackDataSource> {
  if (!isSupabaseConfigured()) {
    const entries = readLocalFeedbackEntries().filter((entry) => entry.id !== id);
    window.localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(entries));
    window.dispatchEvent(new CustomEvent(FEEDBACK_STORAGE_EVENT));
    return localSource();
  }

  const { error } = await getSupabaseClient().from("feedback_entries").delete().eq("id", id);
  if (error) throw new Error(error.message);
  return remoteSource({ viewer: "admin", adminAuthenticated: true });
}

export async function updateFeedbackEntryStatus(id: string, status: FeedbackEntry["status"]): Promise<FeedbackDataSource> {
  if (!isSupabaseConfigured()) {
    const entries = readLocalFeedbackEntries().map((entry) => entry.id === id ? { ...entry, status } : entry);
    window.localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(entries));
    window.dispatchEvent(new CustomEvent(FEEDBACK_STORAGE_EVENT));
    return localSource();
  }

  const { error } = await getSupabaseClient().from("feedback_entries").update({ status }).eq("id", id);
  if (error) throw new Error(error.message);
  return remoteSource({ viewer: "admin", adminAuthenticated: true });
}

export async function clearFeedbackEntries(): Promise<FeedbackDataSource> {
  if (!isSupabaseConfigured()) {
    window.localStorage.setItem(FEEDBACK_STORAGE_KEY, "[]");
    window.dispatchEvent(new CustomEvent(FEEDBACK_STORAGE_EVENT));
    return localSource();
  }

  const { error } = await getSupabaseClient()
    .from("feedback_entries")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000");
  if (error) throw new Error(error.message);
  return remoteSource({ viewer: "admin", adminAuthenticated: true });
}

async function ensureFeedbackSession() {
  const supabase = getSupabaseClient();
  const { data: current, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) throw new Error(sessionError.message);
  if (current.session) return current.session;

  const { data, error } = await supabase.auth.signInAnonymously();
  if (error || !data.session) {
    throw new Error(error?.message ?? "无法建立访客身份");
  }
  return data.session;
}

export async function sendFeedbackAdminMagicLink(email: string) {
  const redirectUrl = new URL(`${import.meta.env.BASE_URL}feedback`, window.location.origin).toString();
  const { error } = await getSupabaseClient().auth.signInWithOtp({
    email: email.trim(),
    options: { emailRedirectTo: redirectUrl },
  });
  if (error) throw new Error(error.message);
}

export async function signOutFeedbackAdmin() {
  const { error } = await getSupabaseClient().auth.signOut();
  if (error) throw new Error(error.message);
}

export function subscribeToFeedbackAuth(onChange: () => void) {
  if (!isSupabaseConfigured()) return () => undefined;
  const { data } = getSupabaseClient().auth.onAuthStateChange(() => {
    window.setTimeout(onChange, 0);
  });
  return () => data.subscription.unsubscribe();
}
