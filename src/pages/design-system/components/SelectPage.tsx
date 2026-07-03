import { ArrowRight, CalendarBlank, SpinnerGap } from "@phosphor-icons/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionCard, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import DocsTable from "../../../components/docs/DocsTable";
import CodeBlock from "../../../components/docs/CodeBlock";
import { Select } from "../../../components/ui/Select";
import { DatePicker } from "../../../components/ui/DatePicker";
import { Checkbox } from "../../../components/ui/Checkbox";

const materialOptions = [
  { label: "金属材料", value: "metal" },
  { label: "高分子材料", value: "polymer" },
  { label: "无机非金属", value: "ceramic" },
];

const searchableOptions = [
  { label: "TC4 钛合金", value: "tc4" },
  { label: "TA15 钛合金", value: "ta15" },
  { label: "GH4169 高温合金", value: "gh4169" },
  { label: "7075 铝合金", value: "7075" },
];

const tagOptions = [
  { label: "高温", value: "heat" },
  { label: "疲劳", value: "fatigue" },
  { label: "航空", value: "aviation" },
  { label: "耐腐蚀", value: "corrosion" },
  { label: "轻量化", value: "lightweight" },
  { label: "高强度", value: "strength" },
  { label: "可焊接", value: "weldable" },
];

const anatomyRows = [
  ["必填标识", "使用红色 * 表示必选；左右标签时放在标签文字前，上下标签时放在标签文字后。"],
  ["标签文字", "说明选择对象，不由选项值或占位文字替代；左右结构固定宽度并右对齐。"],
  ["触发器", "承载当前选择结果并控制面板开合；与 Input 共用高度、边框和状态 Token。"],
  ["当前值 / 占位", "有结果时显示选中值或已选数量，无结果时使用 neutral-400 的动作提示。"],
  ["展开图标", "使用 16px / Regular 的 CaretDown，仅表达可展开；面板打开时方向翻转。"],
  ["辅助或错误文字", "使用 12px Regular；错误需同时显示错误边框和具体修正信息。"],
];

const anatomyMarkerClass = "absolute z-10 hidden h-5 w-5 items-center justify-center rounded-full border border-[var(--product-blue-500)] bg-[var(--product-blue-500)] font-data text-[10px] font-medium text-white shadow-sm sm:flex";

const selectProps = [
  ["label", "string", "—", "可见字段名称；说明选择对象，不省略。"],
  ["placeholder", "string", "—", "无选中值时的动作提示，描述要选择什么。"],
  ["options", "SelectOption[] | SelectOptionGroup[]", "—", "固定选项列表；每项包含 label、value，可选 disabled。传入 SelectOptionGroup[] 可在无搜索时显示分组标题。"],
  ["size", "sm | md | lg", "md", "桌面高度 28 / 32 / 36px，移动端至少 44px。"],
  ["value / defaultValue", "string | string[]", "—", "单选使用 string，多选使用 string[]。"],
  ["searchable", "boolean", "false", "启用选项内搜索，适合中等规模本地数据。"],
  ["multiple", "boolean", "false", "启用多选与标签移除。"],
  ["clearable", "boolean", "false", "在触发器内显示一键清除按钮；有选中值时可见。"],
  ["filterOption", "(option, search) => boolean", "label.includes", "自定义搜索过滤逻辑，可用于拼音、首字母或自定义字段匹配。"],
  ["loading", "boolean", "false", "锁定触发器并显示加载状态。"],
  ["disabled", "boolean", "false", "当前不可操作；不可交互但仍保留上下文。"],
  ["required", "boolean", "false", "必选标记，由表单层驱动校验。"],
  ["labelPosition", "top | left", "top", "主编辑区可用 left；窄容器自动回到上下结构。"],
  ["labelWidth", "number | string", "96", "左右结构中的标签宽度，推荐 88–120px。"],
  ["helperText / error", "string", "—", "字段用途说明或错误修正信息，通过 aria-describedby 关联。"],
  ["renderTag", "(option, onRemove) => ReactNode", "—", "多选标签自定义渲染。"],
  ["open / defaultOpen", "boolean", "false", "分别用于受控开合和初始展开；规范展示使用受控 open 保持面板可见。"],
  ["onOpenChange", "(open) => void", "—", "面板开合变化回调；与 open 配合管理受控状态。"],
];

function DateFieldPreview({ range = false, start = "2026-07-06", end = "2026-08-12", open = false, activePart = "start", error = false, disabled = false, loading = false, idPrefix, onPartChange, onClick }: { range?: boolean; start?: string; end?: string; open?: boolean; activePart?: "start" | "end"; error?: boolean; disabled?: boolean; loading?: boolean; idPrefix?: string; onPartChange?: (part: "start" | "end") => void; onClick?: () => void }) {
  if (range) return (
    <div className={`flex h-8 w-full items-center rounded-[var(--radius-sm)] border px-1 text-sm ${error ? "border-[var(--field-border-error)]" : open ? "border-[var(--field-border-focus)]" : "border-[var(--field-border-default)]"} ${disabled || loading ? "bg-[var(--field-bg-disabled)] text-[var(--text-disabled)]" : "bg-white text-[var(--text-primary)]"}`}>
      <button id={idPrefix ? `${idPrefix}-start` : undefined} type="button" disabled={disabled || loading} aria-pressed={open && activePart === "start"} onClick={() => { onPartChange?.("start"); onClick?.(); }} className={`h-6 min-w-0 flex-1 rounded-[var(--radius-xs)] px-2 text-center ${open && activePart === "start" ? "bg-[var(--neutral-100)] text-[var(--neutral-900)]" : ""}`}>{start || "YYYY-MM-DD"}</button>
      <span className="mx-1 h-px w-4 shrink-0 bg-[var(--neutral-400)]" aria-hidden="true" />
      <button id={idPrefix ? `${idPrefix}-end` : undefined} type="button" disabled={disabled || loading} aria-pressed={open && activePart === "end"} onClick={() => { onPartChange?.("end"); onClick?.(); }} className={`h-6 min-w-0 flex-1 rounded-[var(--radius-xs)] px-2 text-center ${open && activePart === "end" ? "bg-[var(--neutral-100)] text-[var(--neutral-900)]" : ""}`}>{end || "YYYY-MM-DD"}</button>
      {loading ? <SpinnerGap size={16} className="mx-2 shrink-0 animate-spin text-[var(--text-tertiary)]" aria-hidden="true" /> : <CalendarBlank size={16} weight="regular" className="mx-2 shrink-0 text-[var(--text-tertiary)]" aria-hidden="true" />}
    </div>
  );
  return (
    <button type="button" disabled={disabled || loading} aria-expanded={onClick ? open : undefined} onClick={onClick} className={`flex h-8 w-full items-center rounded-[var(--radius-sm)] border px-3 text-sm ${error ? "border-[var(--field-border-error)]" : "border-[var(--field-border-default)]"} ${disabled || loading ? "cursor-not-allowed bg-[var(--field-bg-disabled)] text-[var(--text-disabled)]" : "bg-white text-[var(--text-primary)] hover:border-[var(--field-border-hover)]"}`}>
      {range ? <><span className="flex-1 text-center">{start || "YYYY-MM-DD"}</span><span className="mx-2 h-px w-4 shrink-0 bg-[var(--neutral-400)]" aria-hidden="true" /><span className="flex-1 text-center">{end || "YYYY-MM-DD"}</span></> : <span className="flex-1">2026-07-02</span>}
      {loading ? <SpinnerGap size={16} className="ml-2 shrink-0 animate-spin text-[var(--text-tertiary)]" aria-hidden="true" /> : <CalendarBlank size={16} weight="regular" className="ml-2 shrink-0 text-[var(--text-tertiary)]" aria-hidden="true" />}
    </button>
  );
}

const julyDays = ["29", "30", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "1", "2"];
const augustDays = ["27", "28", "29", "30", "31", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "1", "2", "3", "4", "5", "6"];

function CalendarMonth({ month, days, range = false, start = "2026-07-06", end = "2026-08-12", selectedDate, onSelect }: { month: string; days: string[]; range?: boolean; start?: string; end?: string; selectedDate?: string; onSelect?: (value: string) => void }) {
  const monthNumber = month.includes("7") ? "07" : "08";
  const currentStart = monthNumber === "07" ? 2 : 5;
  const currentEnd = monthNumber === "07" ? 32 : 35;
  return (
    <div className="min-w-0">
      <div className="mb-3 text-center text-sm font-medium text-[var(--text-primary)]">{month}</div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-[var(--text-tertiary)]">{["一","二","三","四","五","六","日"].map((day) => <span key={day}>{day}</span>)}</div>
      <div className="mt-1 grid grid-cols-7 gap-1 text-center text-xs">{days.map((day, index) => {
        const inCurrentMonth = index >= currentStart && index <= currentEnd;
        const dateValue = inCurrentMonth ? `2026-${monthNumber}-${String(day).padStart(2, "0")}` : "";
        const selected = range && Boolean(dateValue) && Boolean(start) && Boolean(end) && dateValue >= start && dateValue <= end;
        const endpoint = (range && (dateValue === start || dateValue === end)) || dateValue === selectedDate;
        const singleSelected = !range && !selectedDate && month.includes("7") && index === 3;
        return <button type="button" disabled={!inCurrentMonth} aria-label={dateValue || undefined} onClick={() => dateValue && onSelect?.(dateValue)} key={`${month}-${index}`} className={`flex h-7 w-7 items-center justify-center justify-self-center rounded-[var(--radius-xs)] ${endpoint || singleSelected ? "bg-[var(--neutral-900)] text-white" : selected ? "bg-[var(--neutral-100)] text-[var(--neutral-900)]" : inCurrentMonth ? "text-[var(--text-secondary)] hover:bg-[var(--neutral-100)]" : "text-[var(--text-disabled)]"}`}>{day}</button>;
      })}</div>
    </div>
  );
}

function CalendarPanelPreview({ range = false, start, end, activePart = "start", pendingDate, onSelect, onConfirm }: { range?: boolean; start?: string; end?: string; activePart?: "start" | "end"; pendingDate?: string; onSelect?: (value: string) => void; onConfirm?: () => void }) {
  const activeMonth = activePart === "end" ? "2026 年 8 月" : "2026 年 7 月";
  const activeDays = activePart === "end" ? augustDays : julyDays;
  return (
    <div className="mt-1 w-full rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-3 shadow-[var(--shadow-lg)]">
      <div className="mb-3 flex items-center justify-between text-sm text-[var(--text-secondary)]"><span>‹</span><span className="text-xs">{range ? `选择${activePart === "start" ? "起始" : "结束"}日期` : "选择日期"}</span><span>›</span></div>
      <div className="grid grid-cols-1">
        <CalendarMonth month={range ? activeMonth : "2026 年 7 月"} days={range ? activeDays : julyDays} range={false} selectedDate={pendingDate} onSelect={onSelect} />
      </div>
      {range ? <div className="mt-3 flex items-center justify-between border-t border-[var(--neutral-200)] pt-3"><span className="text-xs text-[var(--text-tertiary)]">{activePart === "start" ? "确认后自动填写结束日期" : "确认后完成日期范围"}</span><button type="button" disabled={!pendingDate} onClick={onConfirm} className="h-7 rounded-[var(--radius-sm)] bg-[var(--neutral-900)] px-3 text-xs text-white disabled:opacity-[var(--disabled-opacity)]">确认</button></div> : null}
    </div>
  );
}

function SelectPlaygroundSection() {
  const [mode, setMode] = useState<"single" | "search" | "multiple" | "date" | "range">("single");
  const [size, setSize] = useState<"sm" | "md" | "lg">("md");
  const [layout, setLayout] = useState<"top" | "left">("left");
  const [state, setState] = useState<"default" | "error" | "disabled" | "loading">("default");
  const [open, setOpen] = useState(false);
  const [rangeStart, setRangeStart] = useState("2026-07-06");
  const [rangeEnd, setRangeEnd] = useState("2026-08-12");
  const [rangePart, setRangePart] = useState<"start" | "end">("start");
  const [pendingDate, setPendingDate] = useState("2026-07-06");
  const optionClass = (active: boolean) => `rounded-[var(--radius-sm)] border px-3 py-2 text-xs font-medium transition-colors ${active ? "border-[var(--neutral-900)] bg-[var(--neutral-900)] text-white" : "border-[var(--neutral-200)] bg-white text-[var(--text-secondary)] hover:border-[var(--neutral-400)]"}`;
  const reset = () => { setMode("single"); setSize("md"); setLayout("left"); setState("default"); setOpen(false); setRangeStart("2026-07-06"); setRangeEnd("2026-08-12"); setRangePart("start"); setPendingDate("2026-07-06"); };
  const stateProps = state === "error" ? { error: "请选择材料类型" } : state === "disabled" ? { disabled: true } : state === "loading" ? { loading: true } : {};
  const summary = [{single:"常规单选",search:"搜索式选择",multiple:"多选",date:"单日期",range:"起止日期"}[mode], {sm:"Small · 28px",md:"Medium · 32px",lg:"Large · 36px"}[size], layout === "left" ? "左右标签" : "上下标签", {default:"默认",error:"错误",disabled:"禁用",loading:"加载"}[state]];
  const dateStateProps = state === "error" ? { error: "请选择有效日期" } : state === "disabled" ? { disabled: true, helperText: "当前不可选择日期" } : state === "loading" ? { disabled: true, helperText: "正在加载可选日期…" } : {};
  const selectPreview = <Select key={`${mode}-${size}-${layout}-${state}`} label="材料类型" labelPosition={layout} labelWidth={88} size={size} options={mode === "multiple" ? tagOptions : mode === "search" ? searchableOptions : materialOptions} multiple={mode === "multiple"} searchable={mode === "search"} defaultValue={mode === "multiple" ? ["heat","aviation"] : mode === "search" ? "ta15" : "polymer"} open={open} onOpenChange={setOpen} {...stateProps} />;
  const datePreview = <div className={open ? "pb-[300px]" : ""}><DatePicker label="发布日期" labelPosition={layout} labelWidth={88} size={size} defaultValue="2026-07-02" open={open} onOpenChange={setOpen} {...dateStateProps} /></div>;
  const openRangePart = (part: "start" | "end") => { setRangePart(part); setPendingDate(part === "start" ? rangeStart : rangeEnd); setOpen(true); };
  const confirmRangeDate = () => { if (!pendingDate) return; if (rangePart === "start") { setRangeStart(pendingDate); if (rangeEnd && rangeEnd < pendingDate) setRangeEnd(""); setRangePart("end"); setPendingDate(rangeEnd && rangeEnd >= pendingDate ? rangeEnd : "2026-08-12"); } else if (pendingDate >= rangeStart) { setRangeEnd(pendingDate); setOpen(false); } };
  const rangeDisabled = state === "disabled" || state === "loading";
  const rangePreview = <div className="w-full max-w-[420px]"><div className={layout === "left" ? "grid grid-cols-[88px_minmax(0,1fr)] items-center gap-3" : "block"}><span className={`${layout === "left" ? "text-right" : "mb-1.5 block"} text-sm text-[var(--text-secondary)]`}>起止日期</span><DateFieldPreview range start={rangeStart} end={rangeEnd} open={open && !rangeDisabled} activePart={rangePart} error={state === "error"} disabled={state === "disabled"} loading={state === "loading"} idPrefix="playground-range" onPartChange={(part) => !rangeDisabled && openRangePart(part)} /></div>{state === "error" ? <p className={`${layout === "left" ? "ml-[100px]" : ""} mt-1.5 text-xs text-[var(--error-text)]`}>请选择有效的起止日期</p> : state === "disabled" ? <p className={`${layout === "left" ? "ml-[100px]" : ""} mt-1.5 text-xs text-[var(--text-tertiary)]`}>当前不可选择日期范围</p> : state === "loading" ? <p className={`${layout === "left" ? "ml-[100px]" : ""} mt-1.5 text-xs text-[var(--text-tertiary)]`}>正在加载可选日期…</p> : null}{open && !rangeDisabled ? <div className={layout === "left" ? "ml-[100px]" : ""}><CalendarPanelPreview range start={rangeStart} end={rangeEnd} activePart={rangePart} pendingDate={pendingDate} onSelect={setPendingDate} onConfirm={confirmRangeDate} /></div> : null}</div>;
  return (
    <section>
      <SectionHeading eyebrow="Playground" title="即时体验" description="比较选择类型、尺寸、标签布局和状态，并直接体验选项面板。切换到日期模式时预览区会自动拉高以容纳日历面板。" />
      <SectionCard className="overflow-hidden !p-0">
        <div className="flex items-center justify-between gap-4 border-b border-[var(--neutral-200)] px-5 py-4 md:px-6"><div><h3 className="text-sm font-semibold text-[var(--text-primary)]">自定义选择器</h3><p className="mt-1 text-xs text-[var(--text-tertiary)]">选择左侧配置，右侧预览立即更新。</p></div><button type="button" onClick={reset} className="rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white px-3 py-2 text-xs text-[var(--text-secondary)] hover:border-[var(--neutral-400)]">恢复默认</button></div>
        <div className={mode === "range" ? "grid grid-cols-1" : "grid grid-cols-1 lg:grid-cols-[360px_minmax(0,1fr)]"}>
          <div className={`space-y-6 p-5 md:p-6 ${mode === "range" ? "border-b border-[var(--neutral-200)]" : "lg:border-r lg:border-[var(--neutral-200)]"}`}>
            <div><h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-tertiary)]">选择方式</h4><div className="flex flex-wrap gap-2">{([['single','常规单选'],['search','搜索式'],['multiple','多选'],['date','单日期'],['range','起止日期']] as const).map(([key,label])=><button id={`select-play-mode-${key}`} key={key} type="button" aria-pressed={mode===key} onClick={()=>{setMode(key);setOpen(false);}} className={optionClass(mode===key)}>{label}</button>)}</div></div>
            <div className="border-t border-[var(--neutral-200)] pt-5"><h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-tertiary)]">外观</h4><div className="space-y-4"><div><div className="mb-2 text-xs text-[var(--text-secondary)]">尺寸</div><div className="flex gap-2">{([['sm','Small'],['md','Medium'],['lg','Large']] as const).map(([key,label])=><button key={key} type="button" aria-pressed={size===key} onClick={()=>setSize(key)} className={optionClass(size===key)}>{label}</button>)}</div></div><div><div className="mb-2 text-xs text-[var(--text-secondary)]">标签布局</div><div className="flex gap-2">{([['top','上下标签'],['left','左右标签']] as const).map(([key,label])=><button key={key} type="button" aria-pressed={layout===key} onClick={()=>setLayout(key)} className={optionClass(layout===key)}>{label}</button>)}</div></div></div></div>
            <div className="border-t border-[var(--neutral-200)] pt-5"><h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-tertiary)]">状态</h4><div className="flex flex-wrap gap-2">{([['default','默认'],['error','错误'],['disabled','禁用'],['loading','加载']] as const).map(([key,label])=><button key={key} type="button" aria-pressed={state===key} onClick={()=>{setState(key);if(key==="disabled"||key==="loading")setOpen(false);}} className={optionClass(state===key)}>{label}</button>)}</div><Checkbox className="mt-4" id="select-play-open" size="sm" checked={open} onChange={(e)=>setOpen(e.target.checked)} label="展开预览面板" description="用于比较选项与日期面板状态" /></div>
          </div>
          <div className="bg-[var(--neutral-50)] p-5 md:p-8"><div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div><h4 className="text-sm font-semibold text-[var(--text-primary)]">实时预览</h4><p className="mt-1 text-xs text-[var(--text-tertiary)]">可直接打开面板并选择结果。</p></div><div className="flex flex-wrap gap-1.5">{summary.map(item=><span key={item} className="rounded-full border border-[var(--neutral-200)] bg-white px-2.5 py-1 text-[11px] text-[var(--text-secondary)]">{item}</span>)}</div></div><div className="flex min-h-[420px] items-start justify-center overflow-x-auto rounded-[var(--radius-sm)] border border-dashed border-[var(--neutral-300)] bg-white p-8"><div key={`${mode}-preview`} className="transition-all duration-[var(--motion-duration-slow)] ease-[var(--motion-easing-standard)] animate-scale-in"><div className={`w-full ${mode === "range" ? "max-w-[640px]" : "max-w-[480px]"} rounded-[var(--radius-sm)] border border-[var(--neutral-100)] bg-white p-5 shadow-[var(--shadow-xs)] transition-all duration-[var(--motion-duration-slow)] ease-[var(--motion-easing-standard)] ${open && !["date","range"].includes(mode) ? "pb-[220px]" : ""}`}>{mode === "date" ? datePreview : mode === "range" ? rangePreview : selectPreview}</div></div></div>{"date" === mode || "range" === mode ? <div className="mt-4 animate-fade-in-slow rounded-[var(--radius-sm)] border border-[var(--product-blue-200)] bg-[var(--info-bg)] px-4 py-3 text-xs leading-5 text-[var(--text-secondary)]"><strong className="text-[var(--text-primary)]">日期选择模式：</strong>预览区会纵向展开以展示完整的日历面板。你仍可通过左侧“展开预览面板”复选框控制面板开合。</div> : null}</div>
        </div>
      </SectionCard>
    </section>
  );
}

export default function SelectPage() {
  return (
    <div className="space-y-16">
      <PageHeader
        title="选择器与日期选择"
        description="选择器用于从固定范围选值，覆盖单选、多选和搜索；日期选择用于单日期和起止日期范围。两者与输入框共用字段结构、标签布局和状态 Token，但只接受预设选项或日历日期，不承担自由文本录入。"
        note={<>关联页面：选择器与 <Link to="/components/input" className="font-medium text-[var(--product-blue-500)]">输入框</Link> 共用字段结构，由 <Link to="/components/form" className="font-medium text-[var(--product-blue-500)]">表单</Link> 组织提交。</>}
      />

      <section>
        <SectionHeading eyebrow="Anatomy" title="选择器结构" description="标签说明选择对象，触发器展示选择结果并控制选项面板，辅助信息补充选择条件或反馈。" />
        <SectionCard className="md:p-6">
          <div className="relative mx-auto max-w-[448px] py-2 sm:pl-6">
            <span aria-hidden="true" className={`${anatomyMarkerClass} left-[28px] -top-2`}>1</span>
            <span aria-hidden="true" className={`${anatomyMarkerClass} left-[68px] -top-2`}>2</span>
            <span aria-hidden="true" className={`${anatomyMarkerClass} left-[116px] -top-2`}>3</span>
            <span aria-hidden="true" className={`${anatomyMarkerClass} left-[168px] -top-2`}>4</span>
            <span aria-hidden="true" className={`${anatomyMarkerClass} right-0 -top-2`}>5</span>
            <span aria-hidden="true" className={`${anatomyMarkerClass} bottom-0 left-[116px]`}>6</span>
            <Select labelPosition="left" labelWidth={88} label="材料类型" defaultValue="polymer" options={materialOptions} required helperText="固定枚举使用常规单选。" />
          </div>
          <div className="mt-6 grid grid-cols-1 gap-3 border-t border-[var(--neutral-200)] pt-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {anatomyRows.map(([name, rule], index) => (
              <div key={name} className="rounded-[var(--radius-sm)] bg-[var(--neutral-50)] p-4">
                <div className="flex items-start gap-2"><span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[var(--product-blue-500)] bg-[var(--product-blue-500)] font-data text-[10px] font-medium text-white">{index + 1}</span><h3 className="text-sm font-semibold text-[var(--text-primary)]">{name}</h3></div>
                <p className="mt-1.5 text-xs leading-5 text-[var(--text-secondary)]">{rule}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 border-t border-[var(--neutral-200)] pt-5">
            <h4 className="mb-3 text-sm font-semibold text-[var(--text-primary)]">宽度规则</h4>
            <div className="grid grid-cols-1 gap-4 text-sm leading-6 text-[var(--text-secondary)] md:grid-cols-3">
              <div className="bg-[var(--neutral-50)] p-4"><strong className="block text-[var(--text-primary)]">常规选择 · 360px</strong>名称、状态和单值枚举的推荐宽度。</div>
              <div className="bg-[var(--neutral-50)] p-4"><strong className="block text-[var(--text-primary)]">长选项 · 最大 480px</strong>超出后应拆分栅格，不继续拉长触发器。</div>
              <div className="bg-[var(--neutral-50)] p-4"><strong className="block text-[var(--text-primary)]">紧凑筛选 · 160–240px</strong>多条件筛选优先每行 3 个并保留标签。</div>
            </div>
          </div>
          <div className="mt-6 border-t border-[var(--neutral-200)] pt-5">
            <h4 className="mb-3 text-sm font-semibold text-[var(--text-primary)]">选择器结构规则</h4>
            <div className="grid grid-cols-1 gap-4 text-sm leading-6 text-[var(--text-secondary)] md:grid-cols-3">
              <div className="bg-[var(--neutral-50)] p-4"><strong className="block text-[var(--text-primary)]">完整字段</strong>标签、触发器和辅助信息共同构成字段；正式录入场景不得省略标签语义。</div>
              <div className="bg-[var(--neutral-50)] p-4"><strong className="block text-[var(--text-primary)]">结果与占位</strong>触发器优先显示当前结果；占位文字只说明未选择时需要执行的动作。</div>
              <div className="bg-[var(--neutral-50)] p-4"><strong className="block text-[var(--text-primary)]">触发器与面板</strong>展开图标、面板宽度、选项状态和已选结果必须保持同一交互关系。</div>
            </div>
          </div>
        </SectionCard>
      </section>

      <section>
        <SectionHeading eyebrow="Types" title="选择器类型" description="按值的数量和日期语义选择组件，不用外观相似的控件互相替代。下方为静态对比展示，可交互体验请跳至 Playground。" />
        <SectionCard className="pointer-events-none md:p-6"><div className="max-w-[492px] space-y-4"><Select labelPosition="left" labelWidth={96} label="常规选择" defaultValue="metal" options={materialOptions} /><Select labelPosition="left" labelWidth={96} label="多选" multiple defaultValue={["heat","aviation"]} options={tagOptions} /><Select labelPosition="left" labelWidth={96} label="搜索式选择" searchable placeholder="输入关键词搜索" options={searchableOptions} /><DatePicker labelPosition="left" labelWidth={96} label="单日期" defaultValue="2026-07-02" /><DatePicker range labelPosition="left" labelWidth={96} label="起止日期" defaultRangeValue={["2026-07-06", "2026-08-12"]} /></div></SectionCard>
        <CodeBlock lang="tsx" label="类型" code={`<Select label="材料类型" options={materialOptions} />\n<Select label="数据标签" multiple options={tagOptions} />\n<Select label="材料牌号" searchable options={searchableOptions} />\n<DatePicker label="发布日期" defaultValue="2026-07-02" />\n<DatePicker range label="起止日期" defaultRangeValue={["2026-07-06", "2026-08-12"]} />`} />
      </section>

      <section>
        <SectionHeading eyebrow="Sizes" title="选择器尺寸" description="尺寸控制控件高度，不改变文字层级和状态语义。" />
        <ExampleCard title="Small / Medium / Large">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <Select size="sm" label="Small · 28px" defaultValue="metal" options={materialOptions} helperText="表格筛选、紧凑工具栏。" />
            <Select size="md" label="Medium · 32px" defaultValue="polymer" options={materialOptions} helperText="后台表单默认尺寸。" />
            <Select size="lg" label="Large · 36px" defaultValue="ceramic" options={materialOptions} helperText="低密度表单和弹窗。" />
          </div>
          <p className="mt-5 border-t border-[var(--neutral-200)] pt-4 text-xs leading-5 text-[var(--text-tertiary)]">多选沿用相同控件高度；内部标签随尺寸分别使用 20px / 24px / 28px，保证上下留白一致。</p>
        </ExampleCard>
        <CodeBlock lang="tsx" label="尺寸" code={`// 三档尺寸，桌面高度与 Input 保持一致
<Select size="sm" label="Small" options={options} />
<Select size="md" label="Medium" options={options} />
<Select size="lg" label="Large" options={options} />`} />
      </section>

      <section>
        <SectionHeading eyebrow="States" title="选择器状态" description="状态必须通过边框、背景、文字和可操作性共同表达；颜色不能是唯一的信号。Hover 和 Focus 为静态展示，实际由浏览器交互触发。" />
        <SectionCard className="pointer-events-none md:p-6">
          <div className="grid max-w-[672px] grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2">
            <Select labelPosition="left" labelWidth={64} label="默认" placeholder="请选择" options={materialOptions} />
            <Select labelPosition="left" labelWidth={64} label="Hover" defaultValue="metal" options={materialOptions} className="!border-[var(--field-border-hover)]" />
            <Select labelPosition="left" labelWidth={64} label="Focus" defaultValue="polymer" options={materialOptions} className="!border-[var(--field-border-focus)]" />
            <Select labelPosition="left" labelWidth={64} label="必填" placeholder="请选择" options={materialOptions} required />
            <Select labelPosition="left" labelWidth={64} label="错误" placeholder="请选择" options={materialOptions} error="请选择材料类型" />
            <Select labelPosition="left" labelWidth={64} label="禁用" defaultValue="metal" options={materialOptions} disabled />
            <Select labelPosition="left" labelWidth={64} label="加载" placeholder="正在加载" options={[]} loading />
            <div className="pb-[132px]"><Select labelPosition="left" labelWidth={64} label="展开" defaultValue="polymer" options={materialOptions} open /></div>
          </div>
        </SectionCard>
        <CodeBlock lang="tsx" label="状态" code={`// 默认
<Select label="材料类型" placeholder="请选择" options={options} />

// 错误 — 必须给出修正信息
<Select label="材料类型" options={options} error="请选择材料类型" />

// 禁用 — 不可交互
<Select label="材料类型" defaultValue="metal" options={options} disabled />

// 加载 — 异步校验中
<Select label="材料类型" placeholder="正在加载" options={[]} loading />`} />
      </section>

      <section>
        <SectionHeading eyebrow="Layout" title="标签布局" description="同一字段组保持一种标签布局；桌面主编辑区优先左右布局，窄容器使用上下布局。" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="左右布局"><div className="max-w-[448px] space-y-4"><Select labelPosition="left" labelWidth={88} label="材料类型" placeholder="请选择" options={materialOptions} /><Select labelPosition="left" labelWidth={88} label="数据状态" defaultValue="published" options={[{label:"待审核",value:"review"},{label:"已发布",value:"published"}]} /></div></ExampleCard>
          <ExampleCard title="上下布局"><div className="max-w-[360px] space-y-4"><Select label="材料类型" placeholder="请选择" options={materialOptions} /><DatePicker label="发布日期" defaultValue="2026-07-02" /></div></ExampleCard>
        </div>
        <CodeBlock lang="tsx" label="标签布局" code={`// 左右标签 — 主编辑区（项目默认）
<Select labelPosition="left" labelWidth={88} label="材料类型" options={options} />

// 上下标签 — 弹窗、窄容器
<Select label="材料类型" options={options} />`} />
      </section>

      <section>
        <SectionHeading eyebrow="Panels" title="展开面板与选项状态" description="Select 面板直接展开比较；日期面板完整展示月份，范围选择使用单月面板按起止顺序确认。" />
        <div className="pointer-events-none grid grid-cols-1 gap-5 lg:grid-cols-3">
          <ExampleCard title="默认"><div className="pb-[132px]"><Select label="材料类型" defaultValue="polymer" open options={materialOptions} /></div></ExampleCard>
          <ExampleCard title="搜索"><div className="pb-[196px]"><Select label="材料牌号" searchable defaultValue="ta15" open options={searchableOptions} /></div></ExampleCard>
          <ExampleCard title="多标签 · 超过 6 行滚动"><div className="pb-[212px]"><Select label="数据标签" multiple defaultValue={["heat", "aviation"]} open options={tagOptions} /></div></ExampleCard>
        </div>
        <div className="pointer-events-none mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="单日期"><div className="max-w-[480px] pb-[300px]"><DatePicker label="发布日期" defaultValue="2026-07-02" open /></div></ExampleCard>
          <ExampleCard title="起止日期 · 顺序选择"><div className="max-w-[420px]"><DateFieldPreview range open activePart="start" /><CalendarPanelPreview range activePart="start" pendingDate="2026-07-06" /><p className="mt-3 text-xs leading-5 text-[var(--text-tertiary)]">先选择起始日期并确认，焦点自动进入结束日期；再次确认后完成范围。</p></div></ExampleCard>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-3 rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-5 text-sm text-[var(--text-secondary)] md:grid-cols-4">
          <p><strong className="block text-[var(--text-primary)]">Select 面板</strong>跟随触发器，限制在 180–480px。</p>
          <p><strong className="block text-[var(--text-primary)]">高度</strong>每行至少 32px，最多完整显示 6 行。</p>
          <p><strong className="block text-[var(--text-primary)]">状态</strong>Hover 使用 neutral 底色；选中使用 neutral-100 底 + neutral-900 文字。</p>
          <p><strong className="block text-[var(--text-primary)]">日期范围</strong>触发器不小于 320px；单月面板推荐 320–420px。按“起始日期 → 确认 → 结束日期 → 确认”顺序完成。</p>
        </div>
        <CodeBlock lang="tsx" label="展开面板" code={`// 默认单选
<Select label="材料类型" options={options} />

// 搜索式 — 选项超过 10 项时启用
<Select label="材料牌号" searchable options={searchableOptions} />

// 多选 — 触发器显示数量，面板内可勾选/移除
<Select label="数据标签" multiple options={tagOptions} />`} />
      </section>

      <SelectPlaygroundSection />

      <section>
        <SectionHeading eyebrow="Guidelines" title="最佳实践" />
        <SpecList items={[
          "固定枚举使用选择器；允许创建新值时改用 Input + 建议列表。",
          "默认值必须可解释，选择范围不能省略，不使用含义模糊的「全部」。",
          "搜索用于中等规模本地选项（<200 项）；远程实体需要业务层处理请求、分页和失败状态。",
          "多选仅用于规模可控的标签（<20 项）；大量实体使用独立复合选择器或穿梭框。",
          "面板最多完整显示 6 行，第 7 项起仅选项区滚动，不撑开页面。",
          "起止日期使用单一范围控件，在同一面板内完成双日期选择。",
          "错误必须给出原因和修正方式；禁用与只读不能混用。",
          "选项文本保持一行，过长时使用缩略 + 完整解释的辅助文字。",
        ]} />
        <div className="mt-5 rounded-[var(--radius-sm)] border border-[var(--warning-border)] bg-[var(--warning-bg)] p-4 text-sm leading-6 text-[var(--text-secondary)]">
          <strong className="text-[var(--text-primary)]">常见错误：</strong>
          用选择器处理大量动态数据（应改用搜索式 Input）、只用红色边框表达错误而不给修正文字——这两种做法会让用户无法定位选项，也无法知道如何修正。
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="API" title="属性与实现边界" description="远程数据、权限过滤和跨字段日期校验由业务层管理。" />
        <DocsTable>
          <thead className="bg-[var(--neutral-50)]"><tr><th className="px-6 py-3 font-semibold">属性</th><th className="px-6 py-3 font-semibold">类型</th><th className="px-6 py-3 font-semibold">默认值</th><th className="px-6 py-3 font-semibold">说明</th></tr></thead>
          <tbody className="divide-y divide-[var(--neutral-100)]">{selectProps.map(([name,type,value,desc]) => <tr key={name}><td className="px-6 py-4 text-sm text-[var(--text-primary)]">{name}</td><td className="px-6 py-4 text-sm text-[var(--text-secondary)]">{type}</td><td className="px-6 py-4 text-sm text-[var(--text-secondary)]">{value}</td><td className="px-6 py-4 text-sm leading-6 text-[var(--text-secondary)]">{desc}</td></tr>)}</tbody>
        </DocsTable>
      </section>

      <Link
        to="/components/form"
        className="group flex items-center justify-between gap-4 rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-5 transition-all hover:border-[var(--neutral-300)] hover:bg-[var(--neutral-50)]"
      >
        <div>
          <div className="text-xs font-medium text-[var(--text-tertiary)]">下一步</div>
          <h3 className="mt-1 text-sm font-semibold text-[var(--text-primary)]">表单</h3>
          <p className="mt-1 text-xs text-[var(--text-tertiary)]">将单个选择器组合到表单分组、栅格、校验和提交路径中</p>
        </div>
        <ArrowRight size={18} weight="regular" className="text-[var(--text-tertiary)]" />
      </Link>
    </div>
  );
}
