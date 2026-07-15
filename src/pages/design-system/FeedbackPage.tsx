import { useEffect, useMemo, useState } from "react";
import { ChatCentered, Trash } from "@phosphor-icons/react";
import PageHeader from "../../components/docs/PageHeader";
import { ExampleCard, SectionCard, SectionHeading } from "../../components/docs/ComponentDoc";
import { Button } from "../../components/ui/Button";
import { Empty } from "../../components/ui/Empty";
import { Input } from "../../components/ui/Input";
import { Modal } from "../../components/ui/Modal";
import { Tabs } from "../../components/ui/Tabs";
import { Tag } from "../../components/ui/Tag";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableEmpty,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/Table";
import {
  clearFeedbackEntries,
  deleteFeedbackEntry,
  FEEDBACK_STORAGE_EVENT,
  listFeedbackEntries,
  sendFeedbackAdminMagicLink,
  signOutFeedbackAdmin,
  subscribeToFeedbackAuth,
  updateFeedbackEntryStatus,
  type FeedbackDataSource,
  type FeedbackEntry,
} from "../../lib/feedback";

function formatDateTime(value: string) {
  try {
    return new Intl.DateTimeFormat("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(value));
  } catch (_) {
    return value;
  }
}

function useFeedbackEntries() {
  const [entries, setEntries] = useState<FeedbackEntry[]>([]);
  const [source, setSource] = useState<FeedbackDataSource | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    const result = await listFeedbackEntries();
    setEntries(result.entries);
    setSource(result.source);
    setLoading(false);
  };

  useEffect(() => {
    void refresh();
    const handleRefresh = () => { void refresh(); };
    const unsubscribeAuth = subscribeToFeedbackAuth(handleRefresh);
    window.addEventListener(FEEDBACK_STORAGE_EVENT, handleRefresh);
    window.addEventListener("storage", handleRefresh);
    return () => {
      unsubscribeAuth();
      window.removeEventListener(FEEDBACK_STORAGE_EVENT, handleRefresh);
      window.removeEventListener("storage", handleRefresh);
    };
  }, []);

  return { entries, source, loading, refresh } as const;
}

export default function FeedbackPage() {
  const { entries, source, loading, refresh } = useFeedbackEntries();
  const [statusFilter, setStatusFilter] = useState<FeedbackEntry["status"]>("pending");
  const [adminEmail, setAdminEmail] = useState("");
  const [authMessage, setAuthMessage] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  const isAdmin = source?.viewer === "admin";

  useEffect(() => {
    if (isAdmin) setAdminLoginOpen(false);
  }, [isAdmin]);

  const filteredEntries = useMemo(() => entries.filter((entry) => entry.status === statusFilter), [entries, statusFilter]);

  const latestEntry = entries[0];
  const pendingCount = entries.filter((entry) => entry.status === "pending").length;
  const resolvedCount = entries.filter((entry) => entry.status === "resolved").length;
  const moduleCounts = useMemo(() => {
    return entries.reduce<Record<string, number>>((result, entry) => {
      result[entry.module] = (result[entry.module] ?? 0) + 1;
      return result;
    }, {});
  }, [entries]);

  const handleDelete = async (id: string) => {
    await deleteFeedbackEntry(id);
    await refresh();
  };

  const handleStatusChange = async (id: string, status: FeedbackEntry["status"]) => {
    await updateFeedbackEntryStatus(id, status);
    await refresh();
  };

  const handleClear = async () => {
    await clearFeedbackEntries();
    await refresh();
  };

  const handleAdminLogin = async () => {
    if (!adminEmail.trim()) {
      setAuthError("请输入管理员邮箱。");
      setAuthMessage("");
      return;
    }
    setAuthLoading(true);
    setAuthError("");
    setAuthMessage("");
    try {
      await sendFeedbackAdminMagicLink(adminEmail);
      setAuthMessage("登录链接已发送。请在当前电脑的当前浏览器中打开邮箱并点击链接；若在手机或其他浏览器打开，只会登录那个设备。");
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : "管理员验证失败，请稍后重试。");
    } finally {
      setAuthLoading(false);
    }
  };

  const closeAdminLogin = () => {
    setAdminLoginOpen(false);
    setAuthError("");
    setAuthMessage("");
  };

  const handleAdminLogout = async () => {
    setAuthLoading(true);
    try {
      await signOutFeedbackAdmin();
      setAuthMessage("已退出管理员模式。");
      await refresh();
    } catch (error) {
      setAuthMessage(error instanceof Error ? error.message : "退出失败，请稍后重试。");
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <div className="space-y-16">
      <PageHeader
        title="反馈记录"
        description={isAdmin
          ? "集中查看和处理所有用户从规范站右下角提交的反馈。"
          : "查看当前浏览器提交的反馈和最新处理状态。"}
        status="review"
        action={source?.remoteConfigured ? (
          isAdmin ? (
            <Button variant="outline" tone="neutral" loading={authLoading} onClick={handleAdminLogout}>退出管理员模式</Button>
          ) : (
            <Button variant="outline" tone="neutral" onClick={() => setAdminLoginOpen(true)}>管理员登录</Button>
          )
        ) : null}
      />

      {isAdmin ? (
        <section>
          <SectionHeading
            eyebrow="Overview"
            title="反馈概览"
            description="汇总所有用户提交的反馈，帮助管理员快速判断待处理数量和涉及范围。"
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <SectionCard>
              <p className="text-xs text-[var(--text-tertiary)]">反馈总数</p>
              <p className="mt-2 text-3xl font-semibold leading-9 text-[var(--text-primary)]">{loading ? "..." : entries.length}</p>
            </SectionCard>
            <SectionCard>
              <p className="text-xs text-[var(--text-tertiary)]">涉及模块</p>
              <p className="mt-2 text-3xl font-semibold leading-9 text-[var(--text-primary)]">{loading ? "..." : Object.keys(moduleCounts).length}</p>
            </SectionCard>
            <SectionCard>
              <p className="text-xs text-[var(--text-tertiary)]">最新提交</p>
              <p className="mt-2 text-sm leading-6 text-[var(--text-primary)]">{latestEntry ? formatDateTime(latestEntry.createdAt) : "暂无反馈"}</p>
            </SectionCard>
          </div>
        </section>
      ) : null}

      <section>
        <SectionHeading
          eyebrow="Records"
          title="反馈明细"
          description={isAdmin
            ? "按处理状态和模块筛选后查看页面、描述、截图、日期、提交人和备注。"
            : "查看当前浏览器提交的反馈和处理状态；更换设备或清除浏览器数据后无法找回。"}
        />
        <ExampleCard
          title={isAdmin ? "全部反馈" : "我的反馈"}
          description={isAdmin ? "所有用户提交的记录会出现在这里。" : "当前浏览器提交的记录和最新处理状态会出现在这里。"}
        >
          <div className="relative mb-4">
            <Tabs
              className="w-full"
              listClassName={isAdmin ? "pr-28" : ""}
              value={statusFilter}
              onValueChange={(value) => setStatusFilter(value === "resolved" ? "resolved" : "pending")}
              items={[
                { value: "pending", label: isAdmin ? "未修改" : "待处理", badge: pendingCount },
                { value: "resolved", label: isAdmin ? "已修改" : "已处理", badge: resolvedCount },
              ]}
            />
            {isAdmin ? (
              <Button
                className="absolute right-0 top-0"
                variant="outline"
                tone="danger"
                icon={<Trash size={16} />}
                disabled={!entries.length || loading}
                onClick={handleClear}
              >
                清空记录
              </Button>
            ) : null}
          </div>

          {loading ? (
            <div className="rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-[var(--neutral-50)] px-4 py-6 text-sm text-[var(--text-secondary)]">
              正在读取反馈记录...
            </div>
          ) : entries.length ? (
            <TableContainer>
              <Table density="compact">
                <TableHeader>
                  <TableRow>
                    <TableHead>模块</TableHead>
                    <TableHead>页面</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>描述详情</TableHead>
                    <TableHead>截图</TableHead>
                    <TableHead>提交日期</TableHead>
                    <TableHead>提交人</TableHead>
                    <TableHead>备注</TableHead>
                    <TableHead align="right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEntries.length ? filteredEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell><Tag size="sm" tone="product">{entry.module}</Tag></TableCell>
                      <TableCell className="min-w-[160px]">
                        <p className="text-sm text-[var(--text-primary)]">{entry.pageName}</p>
                        <p className="mt-1 font-mono text-xs text-[var(--text-tertiary)]">{entry.pagePath}</p>
                      </TableCell>
                      <TableCell>
                        <Tag size="sm" tone={entry.status === "resolved" ? "success" : "warning"}>{entry.status === "resolved" ? "已修改" : "未修改"}</Tag>
                      </TableCell>
                      <TableCell className="min-w-[220px] max-w-[320px]">
                        <p className="line-clamp-3 text-sm leading-5 text-[var(--text-secondary)]">{entry.detail}</p>
                        <p className="mt-2 text-xs text-[var(--text-tertiary)]">创建：{formatDateTime(entry.createdAt)}</p>
                      </TableCell>
                      <TableCell>
                        {entry.screenshots.length ? (
                          <div className="flex max-w-[180px] flex-wrap gap-2">
                            {entry.screenshots.map((screenshot) => (
                              <a
                                key={`${entry.id}-${screenshot.name}`}
                                href={screenshot.dataUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="block h-12 w-16 overflow-hidden rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-[var(--neutral-50)]"
                                title={screenshot.name}
                              >
                                <img src={screenshot.dataUrl} alt={screenshot.name} className="h-full w-full object-cover" />
                              </a>
                            ))}
                          </div>
                        ) : (
                          <span className="text-xs text-[var(--text-tertiary)]">未上传</span>
                        )}
                      </TableCell>
                      <TableCell>{entry.submitDate}</TableCell>
                      <TableCell>{entry.submitter ?? "匿名"}</TableCell>
                      <TableCell className="min-w-[160px] max-w-[240px]">
                        <p className="line-clamp-3 text-sm leading-5">{entry.note || "无"}</p>
                      </TableCell>
                      <TableCell align="right">
                        {isAdmin ? (
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="text"
                              tone={entry.status === "resolved" ? "neutral" : "success"}
                              size="sm"
                              className="h-auto px-0 py-0"
                              onClick={() => handleStatusChange(entry.id, entry.status === "resolved" ? "pending" : "resolved")}
                            >
                              {entry.status === "resolved" ? "设为未修改" : "标记已修改"}
                            </Button>
                            <Button variant="text" tone="danger" size="sm" className="h-auto px-0 py-0" onClick={() => handleDelete(entry.id)}>
                              删除
                            </Button>
                          </div>
                        ) : (
                          <span className="text-xs text-[var(--text-tertiary)]">仅管理员处理</span>
                        )}
                      </TableCell>
                    </TableRow>
                  )) : (
                    <TableEmpty colSpan={9} title="没有匹配的反馈" description="切换状态或筛选模块后再查看。" />
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Empty
              title="暂无反馈记录"
              description="点击页面右下角“反馈”按钮提交第一条信息。"
              action={<Button icon={<ChatCentered size={16} />} tone="product">等待提交</Button>}
            />
          )}
        </ExampleCard>
      </section>

      <Modal
        open={adminLoginOpen && !isAdmin}
        title="管理员登录"
        description="通过管理员邮箱验证后，可以查看和处理全部用户反馈。"
        size="sm"
        onClose={closeAdminLogin}
        footer={
          <>
            <Button variant="ghost" tone="neutral" onClick={closeAdminLogin}>取消</Button>
            <Button tone="task" loading={authLoading} onClick={handleAdminLogin}>登录</Button>
          </>
        }
      >
        <Input
          label="管理员邮箱"
          type="email"
          value={adminEmail}
          placeholder="输入管理员邮箱"
          helperText="普通访客无需填写；登录链接必须在当前电脑的当前浏览器中打开。"
          error={authError}
          onChange={(event) => {
            setAdminEmail(event.target.value);
            if (authError) setAuthError("");
          }}
        />
        {authMessage ? (
          <p className="mt-4 rounded-[var(--radius-sm)] border border-[var(--success-border)] bg-[var(--success-bg)] px-3 py-2 text-sm leading-6 text-[var(--success-text)]">
            {authMessage}
          </p>
        ) : null}
      </Modal>
    </div>
  );
}
