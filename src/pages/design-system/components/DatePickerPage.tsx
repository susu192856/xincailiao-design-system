import { ArrowRight, CalendarBlank } from "@phosphor-icons/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionCard, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import DocsTable from "../../../components/docs/DocsTable";
import CodeBlock from "../../../components/docs/CodeBlock";
import { Checkbox, DatePicker, TimePicker } from "../../../components/ui";

const anatomyRows = [
  ["必填标识", "使用红色 * 表示必选；左右标签时放在标签文字前，上下标签时放在标签文字后。"],
  ["标签文字", "说明日期字段的业务含义，不由日期值替代；左右结构固定宽度并右对齐。"],
  ["输入区域", "显示日期值；单日期为输入框，范围日期为双区域按钮。与 Input 共用高度、边框和状态 Token。"],
  ["日历图标", "使用 16px / Regular 的 CalendarBlank；点击展开完整月份面板。"],
  ["日期面板", "展示完整月份日历；支持月份切换、日期选择和范围高亮。"],
  ["辅助或错误文字", "使用 12px Regular；错误需同时显示错误边框和具体修正信息。"],
];

const anatomyMarkerClass = "absolute z-10 hidden h-5 w-5 items-center justify-center rounded-full border border-[var(--product-blue-500)] bg-[var(--product-blue-500)] font-data text-[10px] font-medium text-white shadow-sm sm:flex";

const datePickerProps = [
  ["label", "string", "—", "可见字段名称；说明日期用途，不省略。"],
  ["placeholder", "string", "YYYY-MM-DD", "无日期值时的提示，范围模式可用「至」分隔。"],
  ["size", "sm | md | lg", "md", "桌面高度 28 / 32 / 36px，与 Input 和 Select 一致。"],
  ["value / defaultValue", "string", "—", "单日期模式下的日期值（YYYY-MM-DD 格式）。"],
  ["onChange", "(value: string) => void", "—", "单日期变化回调。"],
  ["range", "boolean", "false", "启用范围选择模式，支持起止双日期。"],
  ["rangeValue / defaultRangeValue", "[string, string]", "—", "范围模式下的起止日期值。"],
  ["onRangeChange", "(value: [string, string]) => void", "—", "范围日期变化回调。"],
  ["open / defaultOpen", "boolean", "false", "分别用于受控开合和初始展开；规范展示使用受控 open 保持面板可见。"],
  ["onOpenChange", "(open: boolean) => void", "—", "面板开合变化回调；与 open 配合管理受控状态。"],
  ["min / max", "string", "—", "可选日期范围的上下界（YYYY-MM-DD 格式）。"],
  ["disabled", "boolean", "false", "当前不可操作；不可交互但仍保留上下文。"],
  ["required", "boolean", "false", "必选标记，由表单层驱动校验。"],
  ["labelPosition", "top | left", "top", "主编辑区可用 left；窄容器自动回到上下结构。"],
  ["labelWidth", "number | string", "96", "左右结构中的标签宽度，推荐 88–120px。"],
  ["helperText / error", "string", "—", "字段用途说明或错误修正信息，通过 aria-describedby 关联。"],
];

function DatePickerPlaygroundSection() {
  const [mode, setMode] = useState<"date" | "range">("date");
  const [size, setSize] = useState<"sm" | "md" | "lg">("md");
  const [layout, setLayout] = useState<"top" | "left">("left");
  const [state, setState] = useState<"default" | "error" | "disabled" | "loading">("default");
  const [open, setOpen] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const optionClass = (active: boolean) => `rounded-[var(--radius-sm)] border px-3 py-2 text-xs font-medium transition-colors ${active ? "border-[var(--neutral-900)] bg-[var(--neutral-900)] text-white" : "border-[var(--neutral-200)] bg-white text-[var(--text-secondary)] hover:border-[var(--neutral-400)]"}`;
  const reset = () => { setMode("date"); setSize("md"); setLayout("left"); setState("default"); setOpen(false); setShowTime(false); };
  const dateStateProps = state === "error" ? { error: "请选择有效日期" } : state === "disabled" ? { disabled: true, helperText: "当前不可选择日期" } : state === "loading" ? { disabled: true, helperText: "正在加载可选日期…" } : {};
  const summary = [{date: showTime ? "日期+时间" : "单日期", range: showTime ? "范围+时间" : "起止日期"}[mode], {sm:"Small · 28px",md:"Medium · 32px",lg:"Large · 36px"}[size], layout === "left" ? "左右标签" : "上下标签", {default:"默认",error:"错误",disabled:"禁用",loading:"加载"}[state], showTime ? "含时间" : null].filter(Boolean);
  const datePreview = <div className={open ? (showTime ? "pb-[400px]" : "pb-[300px]") : ""}><DatePicker showTime={showTime} label="发布日期" labelPosition={layout} labelWidth={88} size={size} defaultValue={showTime ? "2026-07-02 14:30" : "2026-07-02"} open={open} onOpenChange={setOpen} {...dateStateProps} /></div>;
  const rangePreview = <div className={open ? (showTime ? "pb-[400px]" : "pb-[300px]") : ""}><DatePicker range showTime={showTime} label="起止日期" labelPosition={layout} labelWidth={88} size={size} defaultRangeValue={showTime ? ["2026-07-06 09:00", "2026-08-12 18:00"] : ["2026-07-06", "2026-08-12"]} open={open} onOpenChange={setOpen} {...dateStateProps} /></div>;
  return (
    <section>
      <SectionHeading eyebrow="Playground" title="即时体验" description="比较单日期和起止日期两种模式，切换尺寸、标签布局和状态，并直接体验日历面板。开启时间选择可体验日期+时间组合。" />
      <SectionCard className="overflow-hidden !p-0">
        <div className="flex items-center justify-between gap-4 border-b border-[var(--neutral-200)] px-5 py-4 md:px-6"><div><h3 className="text-sm font-semibold text-[var(--text-primary)]">日期选择器配置</h3><p className="mt-1 text-xs text-[var(--text-tertiary)]">选择左侧配置，右侧预览立即更新。</p></div><button type="button" onClick={reset} className="rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white px-3 py-2 text-xs text-[var(--text-secondary)] hover:border-[var(--neutral-400)]">恢复默认</button></div>
        <div className="grid grid-cols-1 lg:grid-cols-[360px_minmax(0,1fr)]">
          <div className="space-y-6 p-5 md:p-6 lg:border-r lg:border-[var(--neutral-200)]">
            <div><h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-tertiary)]">日期模式</h4><div className="flex flex-wrap gap-2">{([['date','单日期'],['range','起止日期']] as const).map(([key,label])=><button id={`date-play-mode-${key}`} key={key} type="button" aria-pressed={mode===key} onClick={()=>{setMode(key);setOpen(false);}} className={optionClass(mode===key)}>{label}</button>)}</div></div>
            <div className="border-t border-[var(--neutral-200)] pt-5"><h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-tertiary)]">外观</h4><div className="space-y-4"><div><div className="mb-2 text-xs text-[var(--text-secondary)]">尺寸</div><div className="flex gap-2">{([['sm','Small'],['md','Medium'],['lg','Large']] as const).map(([key,label])=><button key={key} type="button" aria-pressed={size===key} onClick={()=>setSize(key)} className={optionClass(size===key)}>{label}</button>)}</div></div><div><div className="mb-2 text-xs text-[var(--text-secondary)]">标签布局</div><div className="flex gap-2">{([['top','上下标签'],['left','左右标签']] as const).map(([key,label])=><button key={key} type="button" aria-pressed={layout===key} onClick={()=>setLayout(key)} className={optionClass(layout===key)}>{label}</button>)}</div></div></div></div>
            <div className="border-t border-[var(--neutral-200)] pt-5"><h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-tertiary)]">状态</h4><div className="flex flex-wrap gap-2">{([['default','默认'],['error','错误'],['disabled','禁用'],['loading','加载']] as const).map(([key,label])=><button key={key} type="button" aria-pressed={state===key} onClick={()=>{setState(key);if(key==="disabled"||key==="loading")setOpen(false);}} className={optionClass(state===key)}>{label}</button>)}</div><Checkbox className="mt-4" id="date-play-open" size="sm" checked={open} onChange={(e)=>setOpen(e.target.checked)} label="展开预览面板" description="用于比较单日期/起止日期面板状态" /><Checkbox className="mt-3" id="date-play-showtime" size="sm" checked={showTime} onChange={(e) => { setShowTime(e.target.checked); if (e.target.checked) setOpen(true); }} label="包含时间选择" description="在日历面板中启用时间选择条" /></div>
          </div>
          <div className="bg-[var(--neutral-50)] p-5 md:p-8"><div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div><h4 className="text-sm font-semibold text-[var(--text-primary)]">实时预览</h4><p className="mt-1 text-xs text-[var(--text-tertiary)]">可直接打开面板并选择日期。</p></div><div className="flex flex-wrap gap-1.5">{summary.map(item=><span key={item} className="rounded-full border border-[var(--neutral-200)] bg-white px-2.5 py-1 text-[11px] text-[var(--text-secondary)]">{item}</span>)}</div></div><div className="flex min-h-[420px] items-start justify-center overflow-x-auto rounded-[var(--radius-sm)] border border-dashed border-[var(--neutral-300)] bg-white p-8"><div key={`${mode}-${showTime}-preview`} className="w-full transition-all duration-[var(--motion-duration-slow)] ease-[var(--motion-easing-standard)] animate-scale-in"><div className={`w-full max-w-[492px]`}>{mode === "range" ? rangePreview : datePreview}</div></div></div>{mode === "range" && !showTime ? <div className="mt-4 animate-fade-in-slow rounded-[var(--radius-sm)] border border-[var(--product-blue-200)] bg-[var(--info-bg)] px-4 py-3 text-xs leading-5 text-[var(--text-secondary)]"><strong className="text-[var(--text-primary)]">起止日期模式：</strong>预览区会展示完整的范围选择流程。你仍可通过左侧“展开预览面板”复选框控制面板开合。</div> : showTime ? <div className="mt-4 animate-fade-in-slow rounded-[var(--radius-sm)] border border-[var(--product-blue-200)] bg-[var(--info-bg)] px-4 py-3 text-xs leading-5 text-[var(--text-secondary)]"><strong className="text-[var(--text-primary)]">时间选择模式：</strong>日历面板右侧显示时间选择列，选定日期后可直接调整时间。点"确认"关闭面板。</div> : null}</div>
        </div>
      </SectionCard>
    </section>
  );
}

export default function DatePickerPage() {
  return (
    <div className="space-y-16">
      <PageHeader
        title="日期选择"
        description="日期选择覆盖单日期、日期范围、独立时间和日期时间录入。先按业务精度选择类型，再统一使用字段结构、标签布局和状态 Token。"
        note={<>关联页面：日期选择与 <Link to="/components/select" className="font-medium text-[var(--product-blue-500)]">选择器</Link>、<Link to="/components/input" className="font-medium text-[var(--product-blue-500)]">输入框</Link> 共用字段结构，由 <Link to="/components/form" className="font-medium text-[var(--product-blue-500)]">表单</Link> 组织提交。</>}
      />

      <section>
        <SectionHeading eyebrow="Anatomy" title="日期选择结构" description="标签说明日期用途，输入区域展示日期值并控制日历面板，辅助信息补充字段条件或反馈。" />
        <SectionCard className="md:p-6">
          <div className="relative mx-auto max-w-[448px] py-2 sm:pl-6">
            <span aria-hidden="true" className={`${anatomyMarkerClass} left-[28px] -top-2`}>1</span>
            <span aria-hidden="true" className={`${anatomyMarkerClass} left-[68px] -top-2`}>2</span>
            <span aria-hidden="true" className={`${anatomyMarkerClass} left-[128px] -top-2`}>3</span>
            <span aria-hidden="true" className={`${anatomyMarkerClass} right-0 -top-2`}>4</span>
            <span aria-hidden="true" className={`${anatomyMarkerClass} bottom-0 left-[128px]`}>6</span>
            <span aria-hidden="true" className={`${anatomyMarkerClass} bottom-0 left-[210px]`}>5</span>
            <DatePicker labelPosition="left" labelWidth={88} label="发布日期" defaultValue="2026-07-02" required helperText="格式为 YYYY-MM-DD，也可点击图标从日历中选择。" />
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
            <div className="grid grid-cols-1 gap-4 text-sm leading-6 text-[var(--text-secondary)] md:grid-cols-2 xl:grid-cols-4">
              <div className="bg-[var(--neutral-50)] p-4"><strong className="block text-[var(--text-primary)]">单日期 · 280–360px</strong>标准表单日期字段的推荐宽度。</div>
              <div className="bg-[var(--neutral-50)] p-4"><strong className="block text-[var(--text-primary)]">日期范围 · ≥320px</strong>触发器内包含两个日期区域和分隔符，不小于 320px。</div>
              <div className="bg-[var(--neutral-50)] p-4"><strong className="block text-[var(--text-primary)]">日期时间 · 单项 ≥340px / 范围 ≥480px</strong>避免日期、时间和图标互相挤压；窄容器改用上下布局或分步选择。</div>
              <div className="bg-[var(--neutral-50)] p-4"><strong className="block text-[var(--text-primary)]">日历面板 · 320–420px</strong>单月面板推荐宽度；范围选择使用同一面板分步确认。</div>
            </div>
          </div>
          <div className="mt-6 border-t border-[var(--neutral-200)] pt-5">
            <h4 className="mb-3 text-sm font-semibold text-[var(--text-primary)]">日期选择结构规则</h4>
            <div className="grid grid-cols-1 gap-4 text-sm leading-6 text-[var(--text-secondary)] md:grid-cols-3">
              <div className="bg-[var(--neutral-50)] p-4"><strong className="block text-[var(--text-primary)]">完整字段</strong>标签、输入区域和辅助信息共同构成字段；正式录入场景不得省略标签语义。</div>
              <div className="bg-[var(--neutral-50)] p-4"><strong className="block text-[var(--text-primary)]">双通道录入</strong>支持手动输入和日历点选两种方式；两者保持值同步，不互相覆盖未确认状态。</div>
              <div className="bg-[var(--neutral-50)] p-4"><strong className="block text-[var(--text-primary)]">面板定位</strong>日历面板跟随输入区域；z-index 使用 dropdown 层级，不超出可视区域。</div>
            </div>
          </div>
        </SectionCard>
      </section>

      <section>
        <SectionHeading eyebrow="Types" title="日期选择类型" description="先判断业务需要精确到日期还是时间，再判断选择单点还是范围。" />
        <SectionCard className="overflow-hidden !p-0">
          <div className="divide-y divide-[var(--neutral-200)]">
            <div className="grid gap-4 p-5 md:grid-cols-[140px_minmax(0,1fr)_220px] md:items-center"><div><strong className="text-sm text-[var(--text-primary)]">单日期</strong><p className="mt-1 text-xs text-[var(--text-tertiary)]">发布日期、到期日</p></div><p className="text-sm text-[var(--text-secondary)]">只需要一个自然日，选择后立即写入。</p><DatePicker defaultValue="2026-07-02" /></div>
            <div className="grid gap-4 p-5 md:grid-cols-[140px_minmax(0,1fr)_320px] md:items-center"><div><strong className="text-sm text-[var(--text-primary)]">起止日期</strong><p className="mt-1 text-xs text-[var(--text-tertiary)]">查询区间、活动周期</p></div><p className="text-sm text-[var(--text-secondary)]">在同一触发器内分步确认起始和结束日期。</p><DatePicker range defaultRangeValue={["2026-07-06", "2026-08-12"]} /></div>
            <div className="grid gap-4 p-5 md:grid-cols-[140px_minmax(0,1fr)_220px] md:items-center"><div><strong className="text-sm text-[var(--text-primary)]">独立时间</strong><p className="mt-1 text-xs text-[var(--text-tertiary)]">班次、提醒时间</p></div><p className="text-sm text-[var(--text-secondary)]">只记录时分，不附带日期，使用 TimePicker。</p><TimePicker defaultValue="14:30" /></div>
            <div className="grid gap-4 p-5 md:grid-cols-[140px_minmax(0,1fr)_340px] md:items-center"><div><strong className="text-sm text-[var(--text-primary)]">日期 + 时间</strong><p className="mt-1 text-xs text-[var(--text-tertiary)]">发布时间、预约时间</p></div><p className="text-sm text-[var(--text-secondary)]">同一任务同时需要日期和分钟精度，使用 DatePicker showTime。</p><DatePicker showTime defaultValue="2026-07-02 14:30" /></div>
          </div>
        </SectionCard>
        <CodeBlock lang="tsx" label="类型" code={`<DatePicker label="发布日期" defaultValue="2026-07-02" />\n<DatePicker range label="起止日期" defaultRangeValue={["2026-07-06", "2026-08-12"]} />\n<TimePicker label="开始时间" defaultValue="14:30" />\n<DatePicker showTime label="发布时间" defaultValue="2026-07-02 14:30" />`} />
      </section>

      <section>
        <SectionHeading eyebrow="Sizes" title="日期选择尺寸" description="尺寸控制控件高度，与 Select 和 Input 保持一致的 28 / 32 / 36px 三档。" />
        <ExampleCard title="Small / Medium / Large">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <DatePicker size="sm" label="Small · 28px" defaultValue="2026-07-02" helperText="表格筛选、紧凑工具栏。" />
            <DatePicker size="md" label="Medium · 32px" defaultValue="2026-07-02" helperText="后台表单默认尺寸。" />
            <DatePicker size="lg" label="Large · 36px" defaultValue="2026-07-02" helperText="低密度表单和弹窗。" />
          </div>
        </ExampleCard>
        <CodeBlock lang="tsx" label="尺寸" code={`// 三档尺寸，桌面高度与 Input、Select 保持一致
<DatePicker size="sm" label="Small" defaultValue="2026-07-02" />
<DatePicker size="md" label="Medium" defaultValue="2026-07-02" />
<DatePicker size="lg" label="Large" defaultValue="2026-07-02" />`} />
      </section>

      <section>
        <SectionHeading eyebrow="States" title="日期选择状态" description="状态必须通过边框、背景、文字和可操作性共同表达；颜色不能是唯一的信号。" />
        <SectionCard className="md:p-6">
          <div className="grid max-w-[672px] grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2">
            <DatePicker labelPosition="left" labelWidth={64} label="默认" placeholder="YYYY-MM-DD" />
            <DatePicker labelPosition="left" labelWidth={64} label="已选择" defaultValue="2026-07-02" />
            <DatePicker labelPosition="left" labelWidth={64} label="必填" placeholder="YYYY-MM-DD" required />
            <DatePicker labelPosition="left" labelWidth={64} label="错误" placeholder="YYYY-MM-DD" error="请选择发布日期" />
            <DatePicker labelPosition="left" labelWidth={64} label="禁用" defaultValue="2026-07-02" disabled />
            <DatePicker labelPosition="left" labelWidth={64} label="加载" placeholder="正在加载" disabled helperText="正在加载可选日期…" />
            <div className="pb-[300px]"><DatePicker labelPosition="left" labelWidth={64} label="展开" defaultValue="2026-07-02" open /></div>
            <div className="pb-[300px]"><DatePicker range labelPosition="left" labelWidth={64} label="范围展开" defaultRangeValue={["2026-07-06", "2026-08-12"]} open /></div>
          </div>
        </SectionCard>
        <CodeBlock lang="tsx" label="状态" code={`// 默认
<DatePicker label="发布日期" placeholder="YYYY-MM-DD" />

// 错误 — 必须给出修正信息
<DatePicker label="发布日期" error="请选择发布日期" />

// 禁用 — 不可交互
<DatePicker label="发布日期" defaultValue="2026-07-02" disabled />

// 范围模式
<DatePicker range label="起止日期" defaultRangeValue={["2026-07-06", "2026-08-12"]} />`} />
      </section>

      <section>
        <SectionHeading eyebrow="Layout" title="标签布局" description="同一字段组保持一种标签布局；桌面主编辑区优先左右布局，窄容器使用上下布局。" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="左右布局"><div className="max-w-[448px] space-y-4"><DatePicker labelPosition="left" labelWidth={88} label="发布日期" defaultValue="2026-07-02" /><DatePicker range labelPosition="left" labelWidth={88} label="起止日期" defaultRangeValue={["2026-07-06", "2026-08-12"]} /></div></ExampleCard>
          <ExampleCard title="上下布局"><div className="max-w-[360px] space-y-4"><DatePicker label="发布日期" defaultValue="2026-07-02" /><DatePicker range label="起止日期" defaultRangeValue={["2026-07-06", "2026-08-12"]} /></div></ExampleCard>
        </div>
        <CodeBlock lang="tsx" label="标签布局" code={`// 左右标签 — 主编辑区（项目默认）
<DatePicker labelPosition="left" labelWidth={88} label="发布日期" defaultValue="2026-07-02" />

// 上下标签 — 弹窗、窄容器
<DatePicker label="发布日期" defaultValue="2026-07-02" />`} />
      </section>

      <section>
        <SectionHeading eyebrow="Panels" title="日历面板" description="单日期面板直接展示完整月份；范围选择使用单月面板按起止顺序分步确认。" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="单日期"><div className="max-w-[480px] pb-[300px]"><DatePicker label="发布日期" defaultValue="2026-07-02" open /></div></ExampleCard>
          <ExampleCard title="起止日期 · 顺序选择"><div className="max-w-[420px] pb-[300px]"><DatePicker range label="起止日期" defaultRangeValue={["2026-07-06", "2026-08-12"]} open /></div><p className="mt-3 text-xs leading-5 text-[var(--text-tertiary)]">先选择起始日期并确认，焦点自动进入结束日期；再次确认后完成范围。</p></ExampleCard>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-3 rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-5 text-sm text-[var(--text-secondary)] md:grid-cols-4">
          <p><strong className="block text-[var(--text-primary)]">面板宽度</strong>日历面板推荐 320–420px，跟随输入区域。</p>
          <p><strong className="block text-[var(--text-primary)]">月份切换</strong>左右箭头逐月切换；不跨年跳转。</p>
          <p><strong className="block text-[var(--text-primary)]">日期状态</strong>选中使用 neutral-900 实心圆底 + 白色文字；范围高亮使用 neutral-100 底色。</p>
          <p><strong className="block text-[var(--text-primary)]">范围确认</strong>按“起始日期 → 确认 → 结束日期 → 确认”顺序完成，不跳过确认步骤。</p>
        </div>
        <CodeBlock lang="tsx" label="日历面板" code={`// 单日期 — 点击日历图标展开
<DatePicker label="发布日期" defaultValue="2026-07-02" />

// 起止日期 — 同一面板分步选择
<DatePicker range label="起止日期" defaultRangeValue={["2026-07-06", "2026-08-12"]} />`} />
      </section>

      <section>
        <SectionHeading eyebrow="Time" title="时间选择" description="独立时间选择器用于精确到分钟的时段录入，支持 24h/12h 显示制式和可配置分钟步长。" />
        <div className="space-y-5">
          <ExampleCard title="24 小时制 · 默认"><div className="max-w-[360px]"><TimePicker label="开始时间" defaultValue="14:30" helperText="内部始终以 HH:mm 格式存储，格式仅控制显示。" /></div></ExampleCard>
          <ExampleCard title="12 小时制"><div className="max-w-[360px]"><TimePicker label="开始时间" defaultValue="14:30" format="12h" helperText="显示 02:30 PM，值仍为 14:30。" /></div></ExampleCard>
          <SectionCard className="md:p-6">
            <h3 className="mb-4 text-sm font-semibold text-[var(--text-primary)]">三档尺寸 · Small / Medium / Large</h3>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              <TimePicker size="sm" label="Small · 28px" defaultValue="09:00" />
              <TimePicker size="md" label="Medium · 32px" defaultValue="09:00" />
              <TimePicker size="lg" label="Large · 36px" defaultValue="09:00" />
            </div>
          </SectionCard>
          <SectionCard className="md:p-6">
            <h3 className="mb-4 text-sm font-semibold text-[var(--text-primary)]">状态</h3>
            <div className="grid max-w-[672px] grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2">
              <TimePicker labelPosition="left" labelWidth={56} label="默认" placeholder="请选择时间" />
              <TimePicker labelPosition="left" labelWidth={56} label="已选择" defaultValue="14:30" />
              <TimePicker labelPosition="left" labelWidth={56} label="必填" placeholder="请选择时间" required />
              <TimePicker labelPosition="left" labelWidth={56} label="错误" placeholder="请选择时间" error="请选择有效时间" />
              <TimePicker labelPosition="left" labelWidth={56} label="禁用" defaultValue="09:00" disabled />
              <div className="pb-[220px]"><TimePicker labelPosition="left" labelWidth={56} label="展开" defaultValue="09:30" open /></div>
            </div>
          </SectionCard>
          <ExampleCard title="分钟步长"><div className="grid max-w-[480px] grid-cols-1 gap-4 md:grid-cols-3"><TimePicker label="step=1" defaultValue="09:00" step={1} helperText="每分钟可选" /><TimePicker label="step=15" defaultValue="09:00" step={15} helperText="每 15 分钟" /><TimePicker label="step=30" defaultValue="09:00" step={30} helperText="每 30 分钟" /></div></ExampleCard>
          <ExampleCard title="时间范围限制"><div className="max-w-[360px]"><TimePicker label="工作时间" defaultValue="09:00" min="08:00" max="18:00" helperText="仅可选择 08:00-18:00" /></div></ExampleCard>
        </div>
        <CodeBlock lang="tsx" label="时间选择" code={`// 24 小时制（默认）
<TimePicker label="开始时间" defaultValue="14:30" />

// 12 小时制
<TimePicker label="开始时间" defaultValue="14:30" format="12h" />

// 分钟步长
<TimePicker label="时段" defaultValue="09:00" step={15} />

// 时间范围限制
<TimePicker label="工作时间" min="08:00" max="18:00" />`} />
      </section>

      <section>
        <SectionHeading eyebrow="DateTime" title="日期 + 时间选择" description="通过 DatePicker 的 showTime 属性，在日历面板下方直接选择时间，无需独立的时间选择器。" />
        <div className="space-y-5">
          <SectionCard className="md:p-6">
            <h3 className="mb-4 text-sm font-semibold text-[var(--text-primary)]">单日期 + 时间</h3>
            <div className="max-w-[420px]"><DatePicker showTime label="发布日期与时间" defaultValue="2026-07-02 14:30" helperText="值格式为 YYYY-MM-DD HH:mm" /></div>
          </SectionCard>
          <SectionCard className="md:p-6">
            <h3 className="mb-4 text-sm font-semibold text-[var(--text-primary)]">起止日期 + 时间</h3>
            <div className="max-w-[520px]"><DatePicker range showTime label="活动起止时间" defaultRangeValue={["2026-07-06 09:00", "2026-08-12 18:00"]} helperText="每个端点独立携带时间值" /></div>
          </SectionCard>
          <SectionCard className="md:p-6">
            <h3 className="mb-4 text-sm font-semibold text-[var(--text-primary)]">展开态 · 带时间选择条</h3>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="pb-[380px]"><DatePicker showTime label="发布时间" defaultValue="2026-07-02 14:30" open /></div>
              <div className="pb-[380px]"><DatePicker showTime range label="活动起止时间" open defaultRangeValue={["2026-07-06 09:00", "2026-08-12 18:00"]} /></div>
            </div>
          </SectionCard>
        </div>
        <CodeBlock lang="tsx" label="日期 + 时间" code={`// 单日期 + showTime
<DatePicker showTime label="发布日期与时间" defaultValue="2026-07-02 14:30" />

// 起止日期 + showTime
<DatePicker range showTime label="活动起止时间"
  defaultRangeValue={["2026-07-06 09:00", "2026-08-12 18:00"]} />`} />
      </section>

      <DatePickerPlaygroundSection />

      <section>
        <SectionHeading eyebrow="Guidelines" title="最佳实践" />
        <SpecList items={[
          "单日期用于精确到天的日期录入；起止日期使用单一范围控件，在同一面板内完成双日期选择。",
          "需要精确到分钟的时间录入使用 TimePicker；需同时选择日期和时间时使用 DatePicker 的 showTime 属性。",
          "日期格式统一使用 YYYY-MM-DD；时间内部使用 HH:mm 存储，显示可配置 24h 或 12h 制式。",
          "TimePicker 支持 24h 和 12h 两种显示制式；内部始终使用 HH:mm 存储以确保排序和比较一致。",
          "支持手动输入和日历点选两种方式；手动输入后按 Tab 或点击外部完成校验。",
          "通过 min/max 限制可选日期/时间范围；范围之外不可交互并降低透明度。",
          "日历面板使用单月展示，范围选择按顺序分步确认，不跳过确认步骤。",
          "错误必须给出原因和修正方式；禁用与只读不能混用。",
        ]} />
        <div className="mt-5 rounded-[var(--radius-sm)] border border-[var(--warning-border)] bg-[var(--warning-bg)] p-4 text-sm leading-6 text-[var(--text-secondary)]">
          <strong className="text-[var(--text-primary)]">常见错误：</strong>
          只用红色边框表达错误而不给修正文字、日期范围使用两个独立 DatePicker 而没有用 range 模式、在需要日期+时间的场景使用两个独立字段——这些做法会让用户无法定位问题，操作流程也会被打断。
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="API" title="属性与实现边界" description="远程数据校验、时区处理和跨字段日期约束由业务层管理。" />
        <div className="space-y-6">
          <div>
            <h3 className="mb-3 text-sm font-semibold text-[var(--text-primary)]">DatePicker</h3>
            <DocsTable>
              <thead className="bg-[var(--neutral-50)]"><tr><th className="px-6 py-3 font-semibold">属性</th><th className="px-6 py-3 font-semibold">类型</th><th className="px-6 py-3 font-semibold">默认值</th><th className="px-6 py-3 font-semibold">说明</th></tr></thead>
              <tbody className="divide-y divide-[var(--neutral-100)]">{datePickerProps.map(([name,type,value,desc]) => <tr key={name}><td className="px-6 py-4 text-sm text-[var(--text-primary)]">{name}</td><td className="px-6 py-4 text-sm text-[var(--text-secondary)]">{type}</td><td className="px-6 py-4 text-sm text-[var(--text-secondary)]">{value}</td><td className="px-6 py-4 text-sm leading-6 text-[var(--text-secondary)]">{desc}</td></tr>)}</tbody>
            </DocsTable>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-[var(--text-primary)]">TimePicker</h3>
            <DocsTable>
              <thead className="bg-[var(--neutral-50)]"><tr><th className="px-6 py-3 font-semibold">属性</th><th className="px-6 py-3 font-semibold">类型</th><th className="px-6 py-3 font-semibold">默认值</th><th className="px-6 py-3 font-semibold">说明</th></tr></thead>
              <tbody className="divide-y divide-[var(--neutral-100)]">{[["label","string","—","可见字段名称；说明时间用途。"],["placeholder","string","请选择时间","无时间值时的提示。"],["size","sm | md | lg","md","桌面高度 28 / 32 / 36px，与 DatePicker 一致。"],["value / defaultValue","string","—","时间值，HH:mm 格式。"],["onChange","(value: string) => void","—","时间变化回调。"],["format","24h | 12h","24h","显示制式，不影响内部 HH:mm 存储。"],["step","number","1","分钟步长，可选 1/5/10/15/30。"],["min / max","string","—","可选时间范围（HH:mm 格式）。"],["open / defaultOpen / onOpenChange","boolean / (open) => void","—","面板开合控制。"],["disabled","boolean","false","当前不可操作。"],["required","boolean","false","必选标记，由表单驱动校验。"],["labelPosition","top | left","top","桌面主编辑区可用 left。"],["labelWidth","number | string","96","左右结构中的标签宽度。"],["helperText / error","string","—","帮助信息或错误说明。"],].map(([name,type,value,desc]) => <tr key={name}><td className="px-6 py-4 text-sm text-[var(--text-primary)]">{name}</td><td className="px-6 py-4 text-sm text-[var(--text-secondary)]">{type}</td><td className="px-6 py-4 text-sm text-[var(--text-secondary)]">{value}</td><td className="px-6 py-4 text-sm leading-6 text-[var(--text-secondary)]">{desc}</td></tr>)}</tbody>
            </DocsTable>
          </div>
        </div>
      </section>

      <Link
        to="/components/select"
        className="group flex items-center justify-between gap-4 rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-5 transition-all hover:border-[var(--neutral-300)] hover:bg-[var(--neutral-50)]"
      >
        <div>
          <div className="text-xs font-medium text-[var(--text-tertiary)]">下一步</div>
          <h3 className="mt-1 text-sm font-semibold text-[var(--text-primary)]">选择器</h3>
          <p className="mt-1 text-xs text-[var(--text-tertiary)]">了解固定枚举选择、多选和搜索式选择的规范</p>
        </div>
        <ArrowRight size={18} weight="regular" className="text-[var(--text-tertiary)]" />
      </Link>
    </div>
  );
}
