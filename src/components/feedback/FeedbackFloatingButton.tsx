import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { CheckCircle, ChatCentered, Paperclip, X } from "@phosphor-icons/react";
import { useLocation } from "react-router-dom";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { Textarea } from "../ui/Textarea";
import { submitFeedbackEntry, type FeedbackDataSource, type FeedbackScreenshot } from "../../lib/feedback";

const moduleOptions = [
  { label: "基础规范", value: "基础规范" },
  { label: "操作与输入", value: "操作与输入" },
  { label: "数据与内容", value: "数据与内容" },
  { label: "导航与组织", value: "导航与组织" },
  { label: "反馈与浮层", value: "反馈与浮层" },
  { label: "交付与同步", value: "交付与同步" },
  { label: "页面体验", value: "页面体验" },
  { label: "其他", value: "其他" },
];

function today() {
  return new Date().toISOString().slice(0, 10);
}

function inferModule(pathname: string) {
  if (pathname === "/delivery") return "交付与同步";
  if (pathname.startsWith("/components/modal") || pathname.startsWith("/components/drawer")
    || pathname.startsWith("/components/tooltip") || pathname.startsWith("/components/popover")
    || pathname.startsWith("/components/toast")) return "反馈与浮层";
  if (pathname.startsWith("/components/table") || pathname.startsWith("/components/pagination")
    || pathname.startsWith("/components/description-list") || pathname.startsWith("/components/card")
    || pathname.startsWith("/components/tag") || pathname.startsWith("/components/avatar")
    || pathname.startsWith("/components/badge") || pathname.startsWith("/components/image")
    || pathname.startsWith("/components/chart") || pathname.startsWith("/components/empty")
    || pathname.startsWith("/components/upload")) return "数据与内容";
  if (pathname.startsWith("/components/menu") || pathname.startsWith("/components/tabs")
    || pathname.startsWith("/components/breadcrumb") || pathname.startsWith("/components/collapse")
    || pathname.startsWith("/components/tree") || pathname.startsWith("/components/transfer")) return "导航与组织";
  if (pathname.startsWith("/components/")) return "操作与输入";
  return "基础规范";
}

function readFileAsDataUrl(file: File): Promise<FeedbackScreenshot> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve({
        name: file.name,
        size: file.size,
        type: file.type,
        dataUrl: String(reader.result ?? ""),
      });
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export default function FeedbackFloatingButton() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [module, setModule] = useState(() => inferModule(location.pathname));
  const [detail, setDetail] = useState("");
  const [submitDate, setSubmitDate] = useState(today);
  const [submitter, setSubmitter] = useState("");
  const [note, setNote] = useState("");
  const [screenshots, setScreenshots] = useState<FeedbackScreenshot[]>([]);
  const [detailError, setDetailError] = useState("");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [source, setSource] = useState<FeedbackDataSource | null>(null);

  const pagePath = useMemo(() => `${location.pathname}${location.search}`, [location.pathname, location.search]);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []).slice(0, 3);
    if (!files.length) return;
    const nextScreenshots = await Promise.all(files.map(readFileAsDataUrl));
    setScreenshots(nextScreenshots);
  };

  const resetForm = () => {
    setModule(inferModule(location.pathname));
    setDetail("");
    setSubmitDate(today());
    setSubmitter("");
    setNote("");
    setScreenshots([]);
    setDetailError("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedDetail = detail.trim();
    if (!trimmedDetail) {
      setDetailError("请填写需要反馈的具体问题或建议。");
      return;
    }

    setSaving(true);
    const result = await submitFeedbackEntry({
      module,
      pagePath,
      detail: trimmedDetail,
      screenshots,
      submitDate,
      submitter: submitter.trim() || undefined,
      note: note.trim() || undefined,
    });
    setSource(result.source);
    setSaving(false);
    resetForm();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 3600);
  };

  return (
    <div className="fixed bottom-5 right-5 z-[var(--z-tooltip)] flex flex-col items-end gap-3">
      {open ? (
        <section
          aria-label="信息反馈表"
          className="w-[min(calc(100vw-2.5rem),420px)] overflow-hidden rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white shadow-[var(--shadow-xl)]"
        >
          <div className="flex items-start justify-between gap-4 border-b border-[var(--neutral-200)] bg-[var(--neutral-50)] px-5 py-4">
            <div>
              <h2 className="text-base font-semibold leading-6 text-[var(--text-primary)]">信息反馈</h2>
              <p className="mt-1 text-xs leading-5 text-[var(--text-tertiary)]">当前页面：{pagePath}</p>
            </div>
            <button
              type="button"
              aria-label="关闭反馈表"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-sm)] text-[var(--text-secondary)] hover:bg-white hover:text-[var(--text-primary)]"
              onClick={() => setOpen(false)}
            >
              <X size={18} />
            </button>
          </div>

          <form className="max-h-[min(76vh,680px)] space-y-4 overflow-y-auto px-5 py-5" onSubmit={handleSubmit}>
            {saved ? (
              <div className={[
                "flex items-start gap-2 rounded-[var(--radius-sm)] border px-3 py-2 text-sm",
                source?.mode === "local" && source.remoteConfigured
                  ? "border-[var(--warning-border)] bg-[var(--warning-bg)] text-[var(--warning-text)]"
                  : "border-[var(--success-border)] bg-[var(--success-bg)] text-[var(--success-text)]",
              ].join(" ")}>
                <CheckCircle size={18} className="mt-0.5 shrink-0" />
                <span>
                  反馈已提交到{source?.label ?? "反馈记录"}，可在“反馈记录”页面查看。
                  {source?.mode === "local" && source.remoteConfigured ? " 远程接口暂不可用，本次已临时保存在本机。" : ""}
                </span>
              </div>
            ) : null}

            <Select
              label="选择模块"
              value={module}
              options={moduleOptions}
              onChange={(value) => setModule(Array.isArray(value) ? value[0] ?? "其他" : value)}
            />
            <Textarea
              label="描述详情"
              required
              value={detail}
              maxLength={500}
              showCount
              placeholder="说明看到的问题、期望优化方向或影响范围"
              error={detailError}
              onChange={(event) => {
                setDetail(event.target.value);
                if (detailError) setDetailError("");
              }}
            />
            <div>
              <span className="mb-1.5 block text-sm font-normal text-[var(--text-secondary)]">上传截图</span>
              <label className="flex min-h-11 cursor-pointer items-center gap-2 rounded-[var(--radius-sm)] border border-dashed border-[var(--neutral-300)] bg-[var(--neutral-50)] px-3 text-sm text-[var(--text-secondary)] hover:border-[var(--product-blue-300)] hover:bg-[var(--product-blue-50)]">
                <Paperclip size={16} className="shrink-0" />
                <span className="truncate">{screenshots.length ? `已选择 ${screenshots.length} 张截图` : "选择图片，最多 3 张"}</span>
                <input className="sr-only" type="file" accept="image/*" multiple onChange={handleFileChange} />
              </label>
              {screenshots.length ? (
                <div className="mt-2 flex flex-wrap gap-2">
                  {screenshots.map((screenshot) => (
                    <span key={`${screenshot.name}-${screenshot.size}`} className="max-w-full truncate rounded-[var(--radius-sm)] bg-[var(--neutral-100)] px-2 py-1 text-xs text-[var(--text-tertiary)]">
                      {screenshot.name}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
            <Input
              label="提交日期"
              type="date"
              value={submitDate}
              onChange={(event) => setSubmitDate(event.target.value)}
            />
            <Input
              label="提交人（非必填）"
              value={submitter}
              placeholder="姓名、团队或联系方式"
              onChange={(event) => setSubmitter(event.target.value)}
            />
            <Textarea
              label="备注"
              value={note}
              maxLength={300}
              showCount
              placeholder="补充优先级、复现条件或相关页面"
              onChange={(event) => setNote(event.target.value)}
            />

            <div className="flex flex-wrap justify-end gap-2 border-t border-[var(--neutral-200)] pt-4">
              <Button type="button" variant="outline" tone="neutral" onClick={resetForm}>清空</Button>
              <Button type="submit" tone="product" loading={saving}>提交反馈</Button>
            </div>
          </form>
        </section>
      ) : null}

      <button
        type="button"
        aria-label={open ? "收起反馈表" : "打开反馈表"}
        className="inline-flex min-h-[72px] w-11 flex-col items-center justify-center gap-1 rounded-full border border-[var(--neutral-200)] bg-white px-2 py-3 text-xs font-normal leading-4 text-[var(--neutral-900)] shadow-[0_12px_32px_rgba(15,23,42,0.22)] transition-colors hover:border-[var(--neutral-300)] hover:bg-[var(--neutral-50)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring-color)]"
        onClick={() => setOpen((next) => !next)}
      >
        <ChatCentered size={17} />
        <span>反馈</span>
      </button>
    </div>
  );
}
