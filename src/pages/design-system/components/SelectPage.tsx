import { ArrowRight, CaretDown, CaretRight, Check, SpinnerGap } from "@phosphor-icons/react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionCard, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import DocsTable from "../../../components/docs/DocsTable";
import CodeBlock from "../../../components/docs/CodeBlock";
import { Select } from "../../../components/ui/Select";
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

const cascaderOptions = [
  {
    label: "金属材料",
    value: "metal",
    children: [
      {
        label: "钛合金",
        value: "titanium",
        children: [
          { label: "TC4 钛合金", value: "tc4" },
          { label: "TA15 钛合金", value: "ta15" },
          { label: "TB6 钛合金", value: "tb6" },
        ],
      },
      {
        label: "铝合金",
        value: "aluminum",
        children: [
          { label: "7075 铝合金", value: "7075" },
          { label: "6061 铝合金", value: "6061" },
        ],
      },
      {
        label: "高温合金",
        value: "superalloy",
        children: [
          { label: "GH4169 高温合金", value: "gh4169-cascade" },
          { label: "GH3625 高温合金", value: "gh3625" },
        ],
      },
      {
        label: "不锈钢",
        value: "stainless-steel",
        children: [
          { label: "304 不锈钢", value: "304" },
          { label: "316L 不锈钢", value: "316l" },
        ],
      },
      {
        label: "铜合金",
        value: "copper",
        children: [
          { label: "H62 黄铜", value: "h62" },
          { label: "QSn6.5-0.1 锡青铜", value: "qsn6501" },
        ],
      },
      {
        label: "镁合金",
        value: "magnesium",
        children: [
          { label: "AZ31B 镁合金", value: "az31b" },
          { label: "WE43 镁合金", value: "we43" },
        ],
      },
      {
        label: "镍合金",
        value: "nickel",
        children: [
          { label: "N06625 镍合金", value: "n06625" },
          { label: "N07718 镍合金", value: "n07718" },
        ],
      },
      {
        label: "模具钢",
        value: "die-steel",
        children: [
          { label: "H13 模具钢", value: "h13" },
          { label: "Cr12MoV 模具钢", value: "cr12mov" },
        ],
      },
    ],
  },
  {
    label: "高分子材料",
    value: "polymer",
    children: [
      {
        label: "工程塑料",
        value: "engineering-plastic",
        children: [
          { label: "PEEK", value: "peek" },
          { label: "PPS", value: "pps" },
        ],
      },
      {
        label: "橡胶",
        value: "rubber",
        children: [
          { label: "硅橡胶", value: "silicone" },
          { label: "氟橡胶", value: "fluoro" },
          { label: "丁腈橡胶", value: "nitrile" },
        ],
      },
    ],
  },
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

type CascaderState = "default" | "error" | "disabled" | "loading";

function CascaderPreview({
  label = "材料目录",
  layout = "top",
  size = "md",
  state = "default",
  open = true,
  onOpenChange,
  interactive = false,
  helperText,
  labelWidth = 88,
  maxDepth = 3,
}: {
  label?: string;
  layout?: "top" | "left";
  size?: "sm" | "md" | "lg";
  state?: CascaderState;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  interactive?: boolean;
  helperText?: string;
  labelWidth?: number | string;
  maxDepth?: 2 | 3;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [firstValue, setFirstValue] = useState<string | null>("metal");
  const [secondValue, setSecondValue] = useState<string | null>("titanium");
  const [leafValue, setLeafValue] = useState("tc4");
  const selectedPath = cascaderOptions.flatMap((first) =>
    first.children.flatMap((second) =>
      second.children.map((leaf) => ({ first, second, leaf })),
    ),
  ).find(({ leaf }) => leaf.value === leafValue);
  const selectedFirst = firstValue ? cascaderOptions.find((item) => item.value === firstValue) : undefined;
  const secondOptions = selectedFirst?.children ?? [];
  const selectedSecond = secondValue && selectedFirst ? secondOptions.find((item) => item.value === secondValue) : undefined;
  const thirdOptions = maxDepth === 3 ? selectedSecond?.children ?? [] : [];
  const selectedLeaf = selectedPath?.leaf ?? cascaderOptions[0].children[0].children[0];
  const triggerText = maxDepth === 2 ? selectedPath?.second.label ?? "钛合金" : selectedLeaf.label;
  const isDisabled = state === "disabled" || state === "loading";
  const canInteract = interactive && !isDisabled;
  const showFirstLevel = (value: string) => {
    setFirstValue(value);
    setSecondValue(null);
  };
  const showSecondLevel = (value: string) => setSecondValue(value);
  useEffect(() => {
    if (!interactive || !open) return;
    setFirstValue(null);
    setSecondValue(null);
  }, [interactive, open]);
  useEffect(() => {
    if (!interactive || !open) return;
    const panel = panelRef.current;
    if (!panel) return;
    panel.scrollTo({ left: firstValue ? panel.scrollWidth : 0, behavior: "smooth" });
  }, [firstValue, secondValue, interactive, open]);
  useEffect(() => {
    if (!interactive || !open) return;
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (rootRef.current?.contains(target)) return;
      onOpenChange?.(false);
    };
    document.addEventListener("pointerdown", handlePointerDown, true);
    return () => document.removeEventListener("pointerdown", handlePointerDown, true);
  }, [interactive, open, onOpenChange]);
  const heightClass = { sm: "h-[var(--control-height-sm)] min-h-11 sm:min-h-0", md: "h-[var(--control-height-md)] min-h-11 sm:min-h-0", lg: "h-[var(--control-height-lg)] min-h-11 sm:min-h-0" }[size];
  const labelClass = layout === "left" ? "flex flex-col gap-1.5 sm:flex-row sm:items-start sm:gap-3" : "block";
  const labelStyle = layout === "left" ? ({ "--cascader-label-width": typeof labelWidth === "number" ? `${labelWidth}px` : labelWidth } as CSSProperties) : undefined;
  const triggerBorder = state === "error"
    ? "border-[var(--field-border-error)]"
    : isDisabled
      ? "border-[var(--field-border-default)] bg-[var(--field-bg-disabled)] text-[var(--text-disabled)]"
      : "border-[var(--field-border-default)] bg-white text-[var(--text-primary)] hover:border-[var(--field-border-hover)]";
  const columnClass = "max-h-[192px] min-w-[148px] self-stretch overflow-y-auto border-r border-[var(--neutral-200)] last:border-r-0";
  const leafColumnClass = "max-h-[192px] min-w-[164px] overflow-y-auto";
  const optionClass = (active: boolean, disabled = false) => [
    "flex min-h-8 w-full items-center justify-between gap-2 rounded-[var(--radius-xs)] px-2 py-1.5 text-left text-sm transition-colors",
    disabled
      ? "cursor-not-allowed text-[var(--text-disabled)]"
      : active
        ? "bg-[var(--neutral-100)] text-[var(--neutral-900)]"
        : "text-[var(--text-secondary)] hover:bg-[var(--neutral-50)] hover:text-[var(--text-primary)]",
  ].join(" ");

  return (
    <div ref={rootRef} className={labelClass} style={labelStyle}>
      <label className={[
        "block text-sm font-normal leading-[var(--type-body-m-line-height)] text-[var(--text-secondary)]",
        layout === "left" ? "w-full shrink-0 sm:w-[var(--cascader-label-width)] sm:pt-1.5 sm:text-right" : "mb-1.5",
      ].join(" ")}>{label}</label>
      <span className={layout === "left" ? "min-w-0 flex-1" : "block"}>
        <span className="relative block">
          <button
            type="button"
            disabled={isDisabled}
            onClick={() => {
              if (!canInteract) return;
              if (!open) {
                setFirstValue(null);
                setSecondValue(null);
              }
              onOpenChange?.(!open);
            }}
            className={[
              "flex w-full items-center justify-between rounded-[var(--radius-sm)] border px-[var(--field-padding-x-md)] text-sm font-normal outline-none transition-colors",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring-color)]",
              heightClass,
              triggerBorder,
            ].join(" ")}
          >
            <span className={[
              "min-w-0 flex-1 truncate text-left",
              state === "loading" ? "text-[var(--text-tertiary)]" : "",
            ].join(" ")}>
              {state === "loading" ? "正在加载目录" : triggerText}
            </span>
            {state === "loading" ? <SpinnerGap size={16} className="animate-spin text-[var(--text-tertiary)]" /> : <CaretDown size={16} className={open ? "rotate-180 text-[var(--text-tertiary)]" : "text-[var(--text-tertiary)]"} />}
          </button>
          {open && !isDisabled ? (
            <div ref={panelRef} className="absolute left-0 z-[var(--z-dropdown)] mt-1 flex max-w-full items-start overflow-x-auto rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-1 shadow-[var(--shadow-lg)]">
              <div className={columnClass}>
                {cascaderOptions.map((item) => (
                  <button key={item.value} type="button" className={optionClass(item.value === firstValue)} onMouseEnter={() => { if (canInteract) showFirstLevel(item.value); }} onFocus={() => { if (canInteract) showFirstLevel(item.value); }} onClick={() => { if (!canInteract) return; showFirstLevel(item.value); }}>
                    <span>{item.label}</span><CaretRight size={14} className="shrink-0 text-[var(--text-tertiary)]" />
                  </button>
                ))}
              </div>
              {selectedFirst ? (
                <div className={columnClass}>
                  {secondOptions.map((item) => (
                    <button key={item.value} type="button" className={optionClass(item.value === selectedSecond?.value)} onMouseEnter={() => { if (canInteract) showSecondLevel(item.value); }} onFocus={() => { if (canInteract) showSecondLevel(item.value); }} onClick={() => { if (!canInteract) return; showSecondLevel(item.value); }}>
                      <span>{item.label}</span><CaretRight size={14} className="shrink-0 text-[var(--text-tertiary)]" />
                    </button>
                  ))}
                </div>
              ) : null}
              {maxDepth === 3 && selectedSecond ? (
                <div className={leafColumnClass}>
                  {thirdOptions.map((item) => (
                    <button key={item.value} type="button" className={optionClass(item.value === leafValue)} onClick={() => { if (!canInteract) return; setLeafValue(item.value); onOpenChange?.(false); }}>
                      <span>{item.label}</span>{item.value === leafValue ? <Check size={14} className="shrink-0 text-[var(--neutral-900)]" /> : null}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}
        </span>
        {state === "error" ? <span className="mt-1.5 block text-xs text-[var(--error-text)]">请选择到末级材料牌号</span> : null}
        {state !== "error" && helperText ? <span className="mt-1.5 block text-xs leading-5 text-[var(--text-tertiary)]">{helperText}</span> : null}
      </span>
    </div>
  );
}

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
  ["searchPlaceholder", "string", "\"搜索...\"", "搜索输入框的占位提示文字。"],
  ["noMatchText", "string", "\"无匹配选项\"", "搜索无结果时的提示文字。"],
  ["clearLabel", "string", "\"清除选中值\"", "清除按钮的无障碍标签。"],
  ["selectedCountText", "string", "\"已选 {count} 项\"", "多选时触发器中显示的数量文案，{count} 会被替换为实际数字。"],
  ["removeLabel", "string", "\"移除 {label}\"", "多选标签移除按钮的无障碍标签，{label} 会被替换为选项文字。"],
  ["open / defaultOpen", "boolean", "false", "分别用于受控开合和初始展开；规范展示使用受控 open 保持面板可见。"],
  ["onOpenChange", "(open) => void", "—", "面板开合变化回调；与 open 配合管理受控状态。"],
];

function SelectPlaygroundSection() {
  const [mode, setMode] = useState<"single" | "search" | "multiple" | "cascader">("single");
  const [size, setSize] = useState<"sm" | "md" | "lg">("md");
  const [layout, setLayout] = useState<"top" | "left">("left");
  const [state, setState] = useState<"default" | "error" | "disabled" | "loading">("default");
  const [open, setOpen] = useState(false);
  const optionClass = (active: boolean) => `rounded-[var(--radius-sm)] border px-3 py-2 text-xs font-medium transition-colors ${active ? "border-[var(--neutral-900)] bg-[var(--neutral-900)] text-white" : "border-[var(--neutral-200)] bg-white text-[var(--text-secondary)] hover:border-[var(--neutral-400)]"}`;
  const reset = () => { setMode("single"); setSize("md"); setLayout("left"); setState("default"); setOpen(false); };
  const stateProps = state === "error" ? { error: "请选择材料类型" } : state === "disabled" ? { disabled: true } : state === "loading" ? { loading: true } : {};
  const summary = [{single:"常规单选",search:"搜索式选择",multiple:"多选",cascader:"级联选择"}[mode], {sm:"Small · 28px",md:"Medium · 32px",lg:"Large · 36px"}[size], layout === "left" ? "左右标签" : "上下标签", {default:"默认",error:"错误",disabled:"禁用",loading:"加载"}[state]];
  const selectPreview = <Select key={`${mode}-${size}-${layout}-${state}`} label="材料类型" labelPosition={layout} labelWidth={88} size={size} options={mode === "multiple" ? tagOptions : mode === "search" ? searchableOptions : materialOptions} multiple={mode === "multiple"} searchable={mode === "search"} defaultValue={mode === "multiple" ? ["heat","aviation"] : mode === "search" ? "ta15" : "polymer"} open={open} onOpenChange={setOpen} {...stateProps} />;
  const preview = mode === "cascader"
    ? <CascaderPreview label="材料目录" layout={layout} size={size} state={state} open={open} onOpenChange={setOpen} interactive />
    : selectPreview;
  return (
    <section>
      <SectionHeading eyebrow="Playground" title="即时体验" description="比较单选、搜索和多选三种模式，切换尺寸、标签布局和状态，并直接体验选项面板。" />
      <SectionCard className="overflow-hidden !p-0">
        <div className="flex items-center justify-between gap-4 border-b border-[var(--neutral-200)] px-5 py-4 md:px-6"><div><h3 className="text-sm font-semibold text-[var(--text-primary)]">自定义选择器</h3><p className="mt-1 text-xs text-[var(--text-tertiary)]">选择左侧配置，右侧预览立即更新。</p></div><button type="button" onClick={reset} className="rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white px-3 py-2 text-xs text-[var(--text-secondary)] hover:border-[var(--neutral-400)]">恢复默认</button></div>
        <div className="grid grid-cols-1 lg:grid-cols-[360px_minmax(0,1fr)]">
          <div className="space-y-6 p-5 md:p-6 lg:border-r lg:border-[var(--neutral-200)]">
            <div><h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-tertiary)]">选择方式</h4><div className="flex flex-wrap gap-2">{([['single','常规单选'],['search','搜索式'],['multiple','多选'],['cascader','级联选择']] as const).map(([key,label])=><button id={`select-play-mode-${key}`} key={key} type="button" aria-pressed={mode===key} onClick={()=>{setMode(key);setOpen(false);}} className={optionClass(mode===key)}>{label}</button>)}</div></div>
            <div className="border-t border-[var(--neutral-200)] pt-5"><h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-tertiary)]">外观</h4><div className="space-y-4"><div><div className="mb-2 text-xs text-[var(--text-secondary)]">尺寸</div><div className="flex gap-2">{([['sm','Small'],['md','Medium'],['lg','Large']] as const).map(([key,label])=><button key={key} type="button" aria-pressed={size===key} onClick={()=>setSize(key)} className={optionClass(size===key)}>{label}</button>)}</div></div><div><div className="mb-2 text-xs text-[var(--text-secondary)]">标签布局</div><div className="flex gap-2">{([['top','上下标签'],['left','左右标签']] as const).map(([key,label])=><button key={key} type="button" aria-pressed={layout===key} onClick={()=>setLayout(key)} className={optionClass(layout===key)}>{label}</button>)}</div></div></div></div>
            <div className="border-t border-[var(--neutral-200)] pt-5"><h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-tertiary)]">状态</h4><div className="flex flex-wrap gap-2">{([['default','默认'],['error','错误'],['disabled','禁用'],['loading','加载']] as const).map(([key,label])=><button id={`select-play-state-${key}`} key={key} type="button" aria-pressed={state===key} onClick={()=>{setState(key);if(key==="disabled"||key==="loading")setOpen(false);}} className={optionClass(state===key)}>{label}</button>)}</div><Checkbox className="mt-4" id="select-play-open" size="sm" checked={open} onChange={(e)=>setOpen(e.target.checked)} label="展开预览面板" description="用于比较选项面板状态" /></div>
          </div>
          <div className="bg-[var(--neutral-50)] p-5 md:p-8"><div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div><h4 className="text-sm font-semibold text-[var(--text-primary)]">实时预览</h4><p className="mt-1 text-xs text-[var(--text-tertiary)]">可直接打开面板并选择结果。</p></div><div className="flex flex-wrap gap-1.5">{summary.map(item=><span key={item} className="rounded-full border border-[var(--neutral-200)] bg-white px-2.5 py-1 text-[11px] text-[var(--text-secondary)]">{item}</span>)}</div></div><div className="flex min-h-[420px] items-start justify-center overflow-x-auto rounded-[var(--radius-sm)] border border-dashed border-[var(--neutral-300)] bg-white p-8"><div key={`${mode}-preview`} className="w-full transition-all duration-[var(--motion-duration-slow)] ease-[var(--motion-easing-standard)] animate-scale-in"><div className={`w-full max-w-[492px] ${open ? "pb-[220px]" : ""}`}>{preview}</div></div></div>{mode === "cascader" ? <div className="mt-4 rounded-[var(--radius-sm)] border border-[var(--product-blue-200)] bg-[var(--info-bg)] px-4 py-3 text-xs leading-5 text-[var(--text-secondary)]"><strong className="text-[var(--text-primary)]">级联选择：</strong>适合省市区、材料分类到牌号等层级稳定的数据。需要选到末级后才提交结果；异步节点和远程搜索应升级为独立业务选择器。</div> : null}</div>
        </div>
      </SectionCard>
    </section>
  );
}

export default function SelectPage() {
  return (
    <div className="space-y-16">
      <PageHeader
        title="选择器"
        description="选择器用于从固定范围选值，覆盖单选、多选、搜索和级联选择。与输入框共用字段结构、标签布局和状态 Token，但只接受预设选项，不承担自由文本录入。"
        note={<>关联页面：选择器与 <Link to="/components/input" className="font-medium text-[var(--product-blue-500)]">输入框</Link> 共用字段结构，由 <Link to="/components/form" className="font-medium text-[var(--product-blue-500)]">表单</Link> 组织提交；日期录入见 <Link to="/components/date-picker" className="font-medium text-[var(--product-blue-500)]">日期选择</Link>。</>}
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
            <Select labelPosition="left" labelWidth={88} label="材料类型" placeholder="请选择" options={materialOptions} required helperText="固定枚举使用常规单选。" />
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
        <SectionHeading eyebrow="Types" title="选择器类型" description="按值的数量和数据结构选择组件模式。级联选择仍归入 Select 的层级面板变体，暂不单独拆页。" />
        <SectionCard className="md:p-6">
          <div className="max-w-[492px] space-y-4">
            <Select labelPosition="left" labelWidth={96} label="常规选择" defaultValue="metal" options={materialOptions} />
            <Select labelPosition="left" labelWidth={96} label="多选" multiple defaultValue={["heat","aviation"]} options={tagOptions} />
            <Select labelPosition="left" labelWidth={96} label="搜索式选择" searchable placeholder="输入关键词搜索" options={searchableOptions} />
            <CascaderPreview
              label="级联选择"
              layout="left"
              labelWidth={96}
              open={false}
              helperText="用于层级稳定、路径可解释的数据，不承载远程实体搜索。"
            />
          </div>
        </SectionCard>
        <CodeBlock lang="tsx" label="类型" code={`<Select label="材料类型" options={materialOptions} />\n<Select label="数据标签" multiple options={tagOptions} />\n<Select label="材料牌号" searchable options={searchableOptions} />\n\n// 级联选择暂作为 Select 页面的层级面板规范；\n// 若需要异步节点、远程搜索或独立键盘树导航，再拆成 Cascader 组件。\n<CascaderSelect label="材料目录" options={cascaderOptions} />`} />
      </section>

      <SelectPlaygroundSection />

      <section>
        <SectionHeading eyebrow="Sizes" title="选择器尺寸" description="尺寸控制控件高度，不改变文字层级和状态语义。" />
        <ExampleCard title="Small / Medium / Large">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <Select size="sm" label="Small · 28px" placeholder="请选择" options={materialOptions} helperText="表格筛选、紧凑工具栏。" />
            <Select size="md" label="Medium · 32px" placeholder="请选择" options={materialOptions} helperText="后台表单默认尺寸。" />
            <Select size="lg" label="Large · 36px" placeholder="请选择" options={materialOptions} helperText="低密度表单和弹窗。" />
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
        <SectionCard className="md:p-6">
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
          <ExampleCard title="上下布局"><div className="max-w-[360px] space-y-4"><Select label="材料类型" placeholder="请选择" options={materialOptions} /><Select label="数据状态" defaultValue="published" options={[{label:"待审核",value:"review"},{label:"已发布",value:"published"}]} /></div></ExampleCard>
        </div>
        <CodeBlock lang="tsx" label="标签布局" code={`// 左右标签 — 主编辑区（项目默认）
<Select labelPosition="left" labelWidth={88} label="材料类型" options={options} />

// 上下标签 — 弹窗、窄容器
<Select label="材料类型" options={options} />`} />
      </section>

      <section>
        <SectionHeading eyebrow="Panels" title="展开面板与选项状态" description="面板直接展开比较；Hover 使用 neutral 底色，选中使用 neutral-100 底 + neutral-900 文字。这里的级联示例展示两级路径；三级路径在即时体验中验证。" />
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <ExampleCard title="默认"><div className="pb-[132px]"><Select label="材料类型" defaultValue="polymer" open options={materialOptions} /></div></ExampleCard>
          <ExampleCard title="搜索"><div className="pb-[196px]"><Select label="材料牌号" searchable defaultValue="ta15" open options={searchableOptions} /></div></ExampleCard>
          <ExampleCard title="多标签 · 超过 6 行滚动"><div className="pb-[212px]"><Select label="数据标签" multiple defaultValue={["heat", "aviation"]} open options={tagOptions} /></div></ExampleCard>
          <ExampleCard title="级联 · 两级路径"><div className="pb-[232px]"><CascaderPreview label="材料目录" open maxDepth={2} /></div></ExampleCard>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-3 rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-5 text-sm text-[var(--text-secondary)] md:grid-cols-3">
          <p><strong className="block text-[var(--text-primary)]">面板宽度</strong>跟随触发器，限制在 180–480px。</p>
          <p><strong className="block text-[var(--text-primary)]">高度</strong>每行至少 32px，单列最多完整显示 6 行；超过 6 行时该列纵向滚动，列间分割线贯穿当前面板高度。</p>
          <p><strong className="block text-[var(--text-primary)]">状态</strong>Hover 使用 neutral 底色；路径激活和末级选中使用 neutral-100 底 + neutral-900 文字。</p>
        </div>
        <CodeBlock lang="tsx" label="展开面板" code={`// 默认单选
<Select label="材料类型" options={options} />

// 搜索式 — 选项超过 10 项时启用
<Select label="材料牌号" searchable options={searchableOptions} />

// 多选 — 触发器显示数量，面板内可勾选/移除
<Select label="数据标签" multiple options={tagOptions} />

// 级联 — 按业务深度展示两级或三级路径
<CascaderSelect label="材料目录" options={cascaderOptions} />`} />
      </section>

      <section>
        <SectionHeading eyebrow="Guidelines" title="最佳实践" />
        <SpecList items={[
          "固定枚举使用选择器；允许创建新值时改用 Input + 建议列表。",
          "默认值必须可解释，选择范围不能省略，不使用含义模糊的「全部」。",
          "搜索用于中等规模本地选项（<200 项）；远程实体需要业务层处理请求、分页和失败状态。",
          "多选仅用于规模可控的标签（<20 项）；大量实体使用独立复合选择器或穿梭框。",
          "级联选择用于 2–4 层稳定路径；超过 4 层、节点异步加载或需要跨层搜索时，应拆成独立业务选择器。",
          "面板最多完整显示 6 行，第 7 项起仅选项区滚动，不撑开页面。",
          "错误必须给出原因和修正方式；禁用与只读不能混用。",
          "选项文本保持一行，过长时使用缩略 + 完整解释的辅助文字。",
        ]} />
        <div className="mt-5 rounded-[var(--radius-sm)] border border-[var(--warning-border)] bg-[var(--warning-bg)] p-4 text-sm leading-6 text-[var(--text-secondary)]">
          <strong className="text-[var(--text-primary)]">常见错误：</strong>
          用选择器处理大量动态数据（应改用搜索式 Input）、只用红色边框表达错误而不给修正文字——这两种做法会让用户无法定位选项，也无法知道如何修正。
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="API" title="属性与实现边界" description="远程数据、权限过滤和跨字段校验由业务层管理。" />
        <DocsTable>
          <thead className="bg-[var(--neutral-50)]"><tr><th className="px-6 py-3 font-semibold">属性</th><th className="px-6 py-3 font-semibold">类型</th><th className="px-6 py-3 font-semibold">默认值</th><th className="px-6 py-3 font-semibold">说明</th></tr></thead>
          <tbody className="divide-y divide-[var(--neutral-100)]">{selectProps.map(([name,type,value,desc]) => <tr key={name}><td className="px-6 py-4 text-sm text-[var(--text-primary)]">{name}</td><td className="px-6 py-4 text-sm text-[var(--text-secondary)]">{type}</td><td className="px-6 py-4 text-sm text-[var(--text-secondary)]">{value}</td><td className="px-6 py-4 text-sm leading-6 text-[var(--text-secondary)]">{desc}</td></tr>)}</tbody>
        </DocsTable>
      </section>

      <Link
        to="/components/date-picker"
        className="group flex items-center justify-between gap-4 rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-5 transition-all hover:border-[var(--neutral-300)] hover:bg-[var(--neutral-50)]"
      >
        <div>
          <div className="text-xs font-medium text-[var(--text-tertiary)]">下一步</div>
          <h3 className="mt-1 text-sm font-semibold text-[var(--text-primary)]">日期选择</h3>
          <p className="mt-1 text-xs text-[var(--text-tertiary)]">了解单日期和起止日期范围的录入规范</p>
        </div>
        <ArrowRight size={18} weight="regular" className="text-[var(--text-tertiary)]" />
      </Link>
    </div>
  );
}
