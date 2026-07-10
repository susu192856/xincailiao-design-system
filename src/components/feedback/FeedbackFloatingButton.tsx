import { useEffect, useMemo, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { CaretDown, CaretRight, Check, CheckCircle, ChatCentered, Paperclip, X } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
import { DatePicker } from "../ui/DatePicker";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import { submitFeedbackEntry, type FeedbackDataSource, type FeedbackScreenshot } from "../../lib/feedback";

const feedbackCatalog = [
  {
    module: "基础规范",
    pages: [
      { label: "首页", path: "/" },
      { label: "布局", path: "/layout" },
      { label: "颜色", path: "/design-system/colors" },
      { label: "字体", path: "/typography" },
      { label: "间距", path: "/spacing" },
      { label: "阴影", path: "/shadow" },
      { label: "圆角", path: "/radius" },
    ],
  },
  {
    module: "操作与输入",
    pages: [
      { label: "按钮", path: "/components/button" },
      { label: "图标", path: "/components/icon" },
      { label: "输入框", path: "/components/input" },
      { label: "表单", path: "/components/form" },
      { label: "选择器", path: "/components/select" },
      { label: "日期选择", path: "/components/date-picker" },
      { label: "单选框", path: "/components/radio" },
      { label: "复选框", path: "/components/checkbox" },
      { label: "开关", path: "/components/switch" },
    ],
  },
  {
    module: "数据与内容",
    pages: [
      { label: "表格", path: "/components/table" },
      { label: "分页", path: "/components/pagination" },
      { label: "详情与描述列表", path: "/components/description-list" },
      { label: "卡片", path: "/components/card" },
      { label: "标签", path: "/components/tag" },
      { label: "头像", path: "/components/avatar" },
      { label: "徽标", path: "/components/badge" },
      { label: "图片", path: "/components/image" },
      { label: "图表", path: "/components/chart" },
      { label: "空状态", path: "/components/empty" },
      { label: "上传", path: "/components/upload" },
    ],
  },
  {
    module: "导航与组织",
    pages: [
      { label: "菜单", path: "/components/menu" },
      { label: "标签页", path: "/components/tabs" },
      { label: "面包屑", path: "/components/breadcrumb" },
      { label: "折叠面板", path: "/components/collapse" },
      { label: "树", path: "/components/tree" },
      { label: "穿梭框", path: "/components/transfer" },
    ],
  },
  {
    module: "反馈与浮层",
    pages: [
      { label: "弹窗", path: "/components/modal" },
      { label: "抽屉", path: "/components/drawer" },
      { label: "提示", path: "/components/tooltip" },
      { label: "气泡卡片", path: "/components/popover" },
      { label: "消息提示", path: "/components/toast" },
    ],
  },
  {
    module: "交付与同步",
    pages: [
      { label: "反馈记录", path: "/feedback" },
      { label: "交付与同步", path: "/delivery" },
    ],
  },
  {
    module: "页面体验",
    pages: [
      { label: "页面整体体验", path: "page-experience" },
    ],
  },
  {
    module: "其他",
    pages: [
      { label: "其他问题", path: "other" },
    ],
  },
];

type FeedbackCatalogGroup = (typeof feedbackCatalog)[number];
type FeedbackCatalogPage = FeedbackCatalogGroup["pages"][number];

function today() {
  return new Date().toISOString().slice(0, 10);
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

function FeedbackTargetCascader({
  module,
  pagePath,
  error,
  onChange,
}: {
  module: string;
  pagePath: string;
  error?: string;
  onChange: (next: { module: string; pagePath: string }) => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [activeModule, setActiveModule] = useState(module || feedbackCatalog[0].module);
  const selectedGroup = feedbackCatalog.find((item) => item.module === module);
  const selectedPage = selectedGroup?.pages.find((page) => page.path === pagePath);
  const activeGroup = feedbackCatalog.find((item) => item.module === activeModule) ?? feedbackCatalog[0];
  const triggerText = selectedGroup && selectedPage ? `${selectedGroup.module} / ${selectedPage.label}` : "请选择反馈位置";

  useEffect(() => {
    if (!open) return;
    setActiveModule(module || feedbackCatalog[0].module);
  }, [module, open]);

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (rootRef.current?.contains(target)) return;
      setOpen(false);
    };
    document.addEventListener("pointerdown", handlePointerDown, true);
    return () => document.removeEventListener("pointerdown", handlePointerDown, true);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.scrollTo({ left: activeModule ? panelRef.current.scrollWidth : 0, behavior: "smooth" });
  }, [activeModule, open]);

  const optionClass = (active: boolean) => [
    "flex min-h-8 w-full items-center justify-between gap-2 rounded-[var(--radius-xs)] px-2 py-1.5 text-left text-sm transition-colors",
    active
      ? "bg-[var(--neutral-100)] text-[var(--neutral-900)]"
      : "text-[var(--text-secondary)] hover:bg-[var(--neutral-50)] hover:text-[var(--text-primary)]",
  ].join(" ");

  return (
    <div ref={rootRef}>
      <span className="mb-1.5 block text-sm font-normal text-[var(--text-secondary)]">反馈位置 <span className="text-[var(--brand-600)]">*</span></span>
      <span className="relative block">
        <button
          type="button"
          aria-label="选择反馈位置"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-invalid={Boolean(error)}
          onClick={() => setOpen((current) => !current)}
          className={[
            "flex h-[var(--control-height-md)] min-h-11 w-full items-center justify-between rounded-[var(--radius-sm)] border bg-white px-[var(--field-padding-x-md)] text-sm font-normal outline-none transition-colors sm:min-h-0",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring-color)]",
            error ? "border-[var(--field-border-error)]" : "border-[var(--field-border-default)] hover:border-[var(--field-border-hover)]",
          ].join(" ")}
        >
          <span className={[
            "min-w-0 flex-1 truncate text-left",
            selectedGroup && selectedPage ? "text-[var(--text-primary)]" : "text-[var(--neutral-400)]",
          ].join(" ")}>{triggerText}</span>
          <CaretDown size={16} className={open ? "shrink-0 rotate-180 text-[var(--text-tertiary)]" : "shrink-0 text-[var(--text-tertiary)]"} />
        </button>

        {open ? (
          <div
            ref={panelRef}
            role="listbox"
            aria-label="反馈位置级联选择"
            className="absolute left-0 z-[var(--z-dropdown)] mt-1 flex max-w-full items-stretch overflow-x-auto rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-1 shadow-[var(--shadow-lg)]"
          >
            <div className="max-h-[224px] min-w-[144px] overflow-y-auto border-r border-[var(--neutral-200)] pr-1">
              {feedbackCatalog.map((item: FeedbackCatalogGroup) => (
                <button
                  key={item.module}
                  type="button"
                  role="option"
                  aria-selected={item.module === activeModule}
                  className={optionClass(item.module === activeModule)}
                  onMouseEnter={() => setActiveModule(item.module)}
                  onFocus={() => setActiveModule(item.module)}
                  onClick={() => setActiveModule(item.module)}
                >
                  <span className="truncate">{item.module}</span>
                  <CaretRight size={14} className="shrink-0 text-[var(--text-tertiary)]" />
                </button>
              ))}
            </div>
            <div className="max-h-[224px] min-w-[168px] overflow-y-auto pl-1">
              {activeGroup.pages.map((page: FeedbackCatalogPage) => {
                const selected = activeGroup.module === module && page.path === selectedPage?.path;
                return (
                  <button
                    key={page.path}
                    type="button"
                    role="option"
                    aria-selected={selected}
                    className={optionClass(selected)}
                    onClick={() => {
                      onChange({ module: activeGroup.module, pagePath: page.path });
                      setOpen(false);
                    }}
                  >
                    <span className="truncate">{page.label}</span>
                    {selected ? <Check size={14} className="shrink-0 text-[var(--neutral-900)]" /> : null}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}
      </span>
      {error ? <span className="mt-1.5 block text-xs text-[var(--error-text)]">{error}</span> : null}
    </div>
  );
}

export default function FeedbackFloatingButton() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [module, setModule] = useState("");
  const [selectedPagePath, setSelectedPagePath] = useState("");
  const [detail, setDetail] = useState("");
  const [submitDate, setSubmitDate] = useState(today);
  const [submitter, setSubmitter] = useState("");
  const [note, setNote] = useState("");
  const [screenshots, setScreenshots] = useState<FeedbackScreenshot[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [view, setView] = useState<"form" | "success">("form");
  const [saving, setSaving] = useState(false);
  const [source, setSource] = useState<FeedbackDataSource | null>(null);

  const pageOptions = useMemo(() => {
    const group = feedbackCatalog.find((item) => item.module === module) ?? feedbackCatalog[0];
    return group.pages.map((page) => ({ label: page.label, value: page.path }));
  }, [module]);
  const selectedPage = useMemo(() => pageOptions.find((page) => page.value === selectedPagePath), [pageOptions, selectedPagePath]);
  const pagePath = selectedPage?.value ?? "";
  const pageName = selectedPage?.label ?? "";

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []).slice(0, 3);
    if (!files.length) return;
    const nextScreenshots = await Promise.all(files.map(readFileAsDataUrl));
    setScreenshots(nextScreenshots);
    setErrors((current) => ({ ...current, screenshots: "" }));
  };

  const resetForm = () => {
    setModule("");
    setSelectedPagePath("");
    setDetail("");
    setSubmitDate(today());
    setSubmitter("");
    setNote("");
    setScreenshots([]);
    setErrors({});
    setSource(null);
    setSaving(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleOpenToggle = () => {
    setOpen((next) => {
      const willOpen = !next;
      setView("form");
      resetForm();
      return willOpen;
    });
  };

  const closePanel = () => {
    setOpen(false);
    setView("form");
    resetForm();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedDetail = detail.trim();
    const nextErrors: Record<string, string> = {};
    if (!module) nextErrors.module = "请选择反馈所属模块。";
    if (!pagePath) nextErrors.page = "请选择反馈所属页面。";
    if (!trimmedDetail) nextErrors.detail = "请填写需要反馈的具体问题或建议。";
    if (!screenshots.length) nextErrors.screenshots = "请上传问题截图，方便定位页面位置。";
    if (!submitDate) nextErrors.submitDate = "请选择提交日期。";

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setSaving(true);
    const result = await submitFeedbackEntry({
      module,
      pageName,
      pagePath,
      detail: trimmedDetail,
      screenshots,
      submitDate,
      status: "pending",
      submitter: submitter.trim() || undefined,
      note: note.trim() || undefined,
    });
    setSource(result.source);
    setSaving(false);
    setView("success");
  };

  return (
    <div className="fixed bottom-5 right-5 z-[var(--z-tooltip)] flex flex-col items-end gap-3">
      {open ? (
        <section
          aria-label="信息反馈表"
          className="flex h-[min(calc(100vh-2.5rem),760px)] max-h-[calc(100vh-2.5rem)] w-[min(calc(100vw-2.5rem),420px)] flex-col overflow-hidden rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white shadow-[var(--shadow-xl)]"
        >
          <div className="flex items-start justify-between gap-4 border-b border-[var(--neutral-200)] bg-[var(--neutral-50)] px-5 py-4">
            <div>
              <h2 className="text-base font-semibold leading-6 text-[var(--text-primary)]">信息反馈</h2>
              <p className="mt-1 text-xs leading-5 text-[var(--text-tertiary)]">定位页面：{module && pageName ? `${module} / ${pageName}` : "未选择"}</p>
            </div>
            <button
              type="button"
              aria-label="关闭反馈表"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-sm)] text-[var(--text-secondary)] hover:bg-white hover:text-[var(--text-primary)]"
              onClick={closePanel}
            >
              <X size={18} />
            </button>
          </div>

          {view === "success" ? (
            <div className="flex min-h-0 flex-1 flex-col items-center justify-start px-6 pb-8 pt-[22%] text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--success-bg)] text-[var(--success-text)]">
                <CheckCircle size={34} weight="fill" />
              </div>
              <h3 className="mt-4 text-lg font-semibold leading-7 text-[var(--text-primary)]">反馈成功</h3>
              <p className="mx-auto mt-2 max-w-[300px] text-sm leading-6 text-[var(--text-secondary)]">
                感谢你的反馈，我们会结合页面位置、描述和截图尽快核查并优化。
              </p>
              <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                可在
                <Link
                  to="/feedback"
                  onClick={closePanel}
                  className="mx-0.5 text-[var(--product-blue-500)] hover:text-[var(--product-blue-600)]"
                >
                  反馈记录
                </Link>
                中查看提交内容和处理状态。
              </p>
              {source?.mode === "local" && source.remoteConfigured ? (
                <p className="mt-3 rounded-[var(--radius-sm)] border border-[var(--warning-border)] bg-[var(--warning-bg)] px-3 py-2 text-xs leading-5 text-[var(--warning-text)]">
                  远程接口暂不可用，本次反馈已临时保存在本机浏览器。
                </p>
              ) : null}
              <div className="mt-6 flex justify-center gap-2">
                <Button type="button" variant="ghost" tone="neutral" onClick={closePanel}>关闭</Button>
                <Button type="button" tone="task" onClick={() => { resetForm(); setView("form"); }}>继续反馈</Button>
              </div>
            </div>
          ) : (
            <form className="min-h-0 flex-1 space-y-4 overflow-y-auto px-5 py-5" noValidate onSubmit={handleSubmit}>
              <FeedbackTargetCascader
                module={module}
                pagePath={selectedPagePath}
                error={errors.module || errors.page}
                onChange={(next) => {
                  setModule(next.module);
                  setSelectedPagePath(next.pagePath);
                  setErrors((current) => ({ ...current, module: "", page: "" }));
                }}
              />
              <Textarea
                label="描述详情"
                required
                value={detail}
                maxLength={500}
                showCount
                placeholder="说明看到的问题、期望优化方向或影响范围"
                error={errors.detail}
                onChange={(event) => {
                  setDetail(event.target.value);
                  if (errors.detail) setErrors((current) => ({ ...current, detail: "" }));
                }}
              />
              <div>
                <span className="mb-1.5 block text-sm font-normal text-[var(--text-secondary)]">上传截图 <span className="text-[var(--brand-600)]">*</span></span>
                <label className={[
                  "flex min-h-11 cursor-pointer items-center gap-2 rounded-[var(--radius-sm)] border border-dashed bg-[var(--neutral-50)] px-3 text-sm text-[var(--text-secondary)] hover:border-[var(--product-blue-300)] hover:bg-[var(--product-blue-50)]",
                  errors.screenshots ? "border-[var(--field-border-error)]" : "border-[var(--neutral-300)]",
                ].join(" ")}>
                  <Paperclip size={16} className="shrink-0" />
                  <span className="truncate">{screenshots.length ? `已选择 ${screenshots.length} 张截图` : "选择图片，最多 3 张"}</span>
                  <input ref={fileInputRef} className="sr-only" type="file" accept="image/*" multiple onChange={handleFileChange} />
                </label>
                {errors.screenshots ? <span className="mt-1.5 block text-xs text-[var(--error-text)]">{errors.screenshots}</span> : null}
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
              <DatePicker
                label="提交日期"
                required
                value={submitDate}
                placeholder="YYYY-MM-DD"
                error={errors.submitDate}
                onChange={(value) => {
                  setSubmitDate(value);
                  if (errors.submitDate) setErrors((current) => ({ ...current, submitDate: "" }));
                }}
              />
              <Input
                label="提交人（非必填）"
                value={submitter}
                placeholder="请输入"
                helperText="便于我们在问题描述不够明确时联系对应对接人。"
                onChange={(event) => setSubmitter(event.target.value)}
              />
              <Textarea
                label="备注（非必填）"
                value={note}
                maxLength={300}
                showCount
                placeholder="补充优先级、复现条件或相关页面"
                onChange={(event) => setNote(event.target.value)}
              />

              <div className="sticky bottom-0 -mx-5 -mb-5 flex flex-wrap justify-end gap-2 border-t border-[var(--neutral-200)] bg-white px-5 pb-5 pt-4">
                <Button type="button" variant="ghost" tone="neutral" onClick={resetForm}>清空</Button>
                <Button type="submit" tone="task" loading={saving}>提交反馈</Button>
              </div>
            </form>
          )}
        </section>
      ) : null}

      <button
        type="button"
        aria-label={open ? "收起反馈表" : "打开反馈表"}
        className="inline-flex min-h-[72px] w-11 flex-col items-center justify-center gap-1 rounded-full border border-[var(--neutral-200)] bg-white px-2 py-3 text-xs font-normal leading-4 text-[var(--neutral-900)] shadow-[0_12px_32px_rgba(15,23,42,0.22)] transition-colors hover:border-[var(--neutral-300)] hover:bg-[var(--neutral-50)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring-color)]"
        onClick={handleOpenToggle}
      >
        <ChatCentered size={17} />
        <span>反馈</span>
      </button>
    </div>
  );
}
