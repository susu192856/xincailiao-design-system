export type FeedbackScreenshot = {
  name: string;
  size: number;
  type: string;
  dataUrl: string;
};

export type FeedbackEntry = {
  id: string;
  module: string;
  pagePath: string;
  detail: string;
  screenshots: FeedbackScreenshot[];
  submitDate: string;
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

const FEEDBACK_STORAGE_KEY = "xincailiao-design-feedback";
export const FEEDBACK_STORAGE_EVENT = "xincailiao-feedback-updated";

function getFeedbackApiUrl() {
  const raw = import.meta.env.VITE_FEEDBACK_API_URL;
  if (typeof raw !== "string") return "";
  return raw.trim().replace(/\/$/, "");
}

function remoteSource(endpoint: string): FeedbackDataSource {
  return {
    mode: "remote",
    label: "共享反馈库",
    description: "反馈记录来自远程接口，适合多人提交后统一查看。",
    endpoint,
    remoteConfigured: true,
    remoteAvailable: true,
  };
}

function localSource(error?: string, remoteConfigured = Boolean(getFeedbackApiUrl())): FeedbackDataSource {
  return {
    mode: "local",
    label: "本地浏览器",
    description: remoteConfigured
      ? "远程接口暂不可用，当前记录临时保存在本机浏览器。"
      : "尚未配置远程反馈接口，当前记录只保存在本机浏览器。",
    endpoint: getFeedbackApiUrl() || undefined,
    remoteConfigured,
    remoteAvailable: false,
    error,
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
  const entry = value as Partial<FeedbackEntry>;
  if (!entry.id || !entry.module || !entry.pagePath || !entry.detail || !entry.submitDate || !entry.createdAt) return null;

  return {
    id: String(entry.id),
    module: String(entry.module),
    pagePath: String(entry.pagePath),
    detail: String(entry.detail),
    screenshots: Array.isArray(entry.screenshots) ? entry.screenshots.filter(isFeedbackScreenshot) : [],
    submitDate: String(entry.submitDate),
    submitter: entry.submitter ? String(entry.submitter) : undefined,
    note: entry.note ? String(entry.note) : undefined,
    createdAt: String(entry.createdAt),
  };
}

function normalizeFeedbackEntries(value: unknown): FeedbackEntry[] {
  const rawEntries = Array.isArray(value)
    ? value
    : value && typeof value === "object" && Array.isArray((value as { items?: unknown[] }).items)
      ? (value as { items: unknown[] }).items
      : [];
  return rawEntries
    .map(normalizeFeedbackEntry)
    .filter((entry): entry is FeedbackEntry => Boolean(entry));
}

function readLocalFeedbackEntries(): FeedbackEntry[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(FEEDBACK_STORAGE_KEY);
    if (!raw) return [];
    return normalizeFeedbackEntries(JSON.parse(raw));
  } catch (_) {
    return [];
  }
}

function writeLocalFeedbackEntries(entries: FeedbackEntry[]) {
  window.localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(entries));
  window.dispatchEvent(new CustomEvent(FEEDBACK_STORAGE_EVENT));
}

function createLocalEntry(draft: FeedbackDraft): FeedbackEntry {
  const entry: FeedbackEntry = {
    ...draft,
    id: `fb-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    createdAt: new Date().toISOString(),
  };
  writeLocalFeedbackEntries([entry, ...readLocalFeedbackEntries()]);
  return entry;
}

async function parseFeedbackResponse(response: Response) {
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.json();
}

export async function listFeedbackEntries(): Promise<FeedbackListResult> {
  const endpoint = getFeedbackApiUrl();
  if (!endpoint) {
    return { entries: readLocalFeedbackEntries(), source: localSource(undefined, false) };
  }

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    const payload = await parseFeedbackResponse(response);
    return { entries: normalizeFeedbackEntries(payload), source: remoteSource(endpoint) };
  } catch (error) {
    return {
      entries: readLocalFeedbackEntries(),
      source: localSource(error instanceof Error ? error.message : "远程接口请求失败", true),
    };
  }
}

export async function submitFeedbackEntry(draft: FeedbackDraft): Promise<FeedbackSubmitResult> {
  const endpoint = getFeedbackApiUrl();
  if (!endpoint) {
    return { entry: createLocalEntry(draft), source: localSource(undefined, false) };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(draft),
    });
    const payload = await parseFeedbackResponse(response);
    const entry = normalizeFeedbackEntry(payload) ?? normalizeFeedbackEntry((payload as { item?: unknown }).item);
    if (!entry) throw new Error("远程接口返回的数据格式不正确");
    return { entry, source: remoteSource(endpoint) };
  } catch (error) {
    return {
      entry: createLocalEntry(draft),
      source: localSource(error instanceof Error ? error.message : "远程接口提交失败", true),
    };
  }
}

export async function deleteFeedbackEntry(id: string): Promise<FeedbackDataSource> {
  const endpoint = getFeedbackApiUrl();
  if (endpoint) {
    try {
      const response = await fetch(`${endpoint}/${encodeURIComponent(id)}`, { method: "DELETE" });
      await parseFeedbackResponse(response);
      window.dispatchEvent(new CustomEvent(FEEDBACK_STORAGE_EVENT));
      return remoteSource(endpoint);
    } catch (error) {
      writeLocalFeedbackEntries(readLocalFeedbackEntries().filter((entry) => entry.id !== id));
      return localSource(error instanceof Error ? error.message : "远程接口删除失败", true);
    }
  }

  writeLocalFeedbackEntries(readLocalFeedbackEntries().filter((entry) => entry.id !== id));
  return localSource(undefined, false);
}

export async function clearFeedbackEntries(): Promise<FeedbackDataSource> {
  const endpoint = getFeedbackApiUrl();
  if (endpoint) {
    try {
      const response = await fetch(endpoint, { method: "DELETE" });
      await parseFeedbackResponse(response);
      window.dispatchEvent(new CustomEvent(FEEDBACK_STORAGE_EVENT));
      return remoteSource(endpoint);
    } catch (error) {
      writeLocalFeedbackEntries([]);
      return localSource(error instanceof Error ? error.message : "远程接口清空失败", true);
    }
  }

  writeLocalFeedbackEntries([]);
  return localSource(undefined, false);
}
