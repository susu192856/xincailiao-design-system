import { useEffect, useMemo, useState } from "react";
import { ChatCentered, Trash } from "@phosphor-icons/react";
import PageHeader from "../../components/docs/PageHeader";
import { ExampleCard, SectionCard, SectionHeading } from "../../components/docs/ComponentDoc";
import { Button } from "../../components/ui/Button";
import { Empty } from "../../components/ui/Empty";
import { Select } from "../../components/ui/Select";
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
  updateFeedbackEntryStatus,
  type FeedbackDataSource,
  type FeedbackEntry,
} from "../../lib/feedback";

const allModules = [
  { label: "全部模块", value: "all" },
  { label: "基础规范", value: "基础规范" },
  { label: "操作与输入", value: "操作与输入" },
  { label: "数据与内容", value: "数据与内容" },
  { label: "导航与组织", value: "导航与组织" },
  { label: "反馈与浮层", value: "反馈与浮层" },
  { label: "交付与同步", value: "交付与同步" },
  { label: "页面体验", value: "页面体验" },
  { label: "其他", value: "其他" },
];

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
    window.addEventListener(FEEDBACK_STORAGE_EVENT, handleRefresh);
    window.addEventListener("storage", handleRefresh);
    return () => {
      window.removeEventListener(FEEDBACK_STORAGE_EVENT, handleRefresh);
      window.removeEventListener("storage", handleRefresh);
    };
  }, []);

  return { entries, source, loading, refresh } as const;
}

export default function FeedbackPage() {
  const { entries, source, loading, refresh } = useFeedbackEntries();
  const [moduleFilter, setModuleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState<FeedbackEntry["status"]>("pending");

  const moduleFilteredEntries = useMemo(() => (
    moduleFilter === "all" ? entries : entries.filter((entry) => entry.module === moduleFilter)
  ), [entries, moduleFilter]);
  const filteredEntries = useMemo(() => moduleFilteredEntries.filter((entry) => entry.status === statusFilter), [moduleFilteredEntries, statusFilter]);

  const latestEntry = entries[0];
  const pendingCount = moduleFilteredEntries.filter((entry) => entry.status === "pending").length;
  const resolvedCount = moduleFilteredEntries.filter((entry) => entry.status === "resolved").length;
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

  return (
    <div className="space-y-16">
      <PageHeader
        title="反馈记录"
        description="集中查看规范站右下角反馈按钮提交的信息，后续优化页面、组件和交付规则时可按模块归类处理。"
        status="review"
      />

      <section>
        <SectionHeading
          eyebrow="Overview"
          title="反馈概览"
          description="配置远程反馈接口后，所有用户的提交会进入共享反馈库；没有配置或接口不可用时，会自动降级到本机浏览器记录。"
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
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
          <SectionCard>
            <p className="text-xs text-[var(--text-tertiary)]">数据源</p>
            <p className="mt-2 text-sm font-medium leading-6 text-[var(--text-primary)]">{source?.label ?? "读取中"}</p>
            <p className="mt-1 text-xs leading-5 text-[var(--text-tertiary)]">{source?.description ?? "正在读取反馈记录。"}</p>
            {source?.error ? <p className="mt-2 text-xs leading-5 text-[var(--warning-text)]">接口状态：{source.error}</p> : null}
          </SectionCard>
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Records"
          title="反馈明细"
          description="按处理状态和模块筛选后查看页面、描述、截图、日期、提交人和备注。"
        />
        <ExampleCard title="全部反馈" description="提交后记录会立即出现在这里。">
          <div className="mb-4 flex flex-col gap-3 border-b border-[var(--neutral-200)] pb-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <Tabs
                value={statusFilter}
                onValueChange={(value) => setStatusFilter(value === "resolved" ? "resolved" : "pending")}
                variant="segment"
                size="sm"
                items={[
                  { value: "pending", label: "未修改", badge: pendingCount },
                  { value: "resolved", label: "已修改", badge: resolvedCount },
                ]}
              />
              <Select
                aria-label="按模块筛选反馈"
                className="md:w-48"
                value={moduleFilter}
                options={allModules}
                onChange={(value) => setModuleFilter(Array.isArray(value) ? value[0] ?? "all" : value)}
              />
            </div>
            <Button
              variant="outline"
              tone="danger"
              icon={<Trash size={16} />}
              disabled={!entries.length || loading}
              onClick={handleClear}
            >
              清空记录
            </Button>
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
    </div>
  );
}
