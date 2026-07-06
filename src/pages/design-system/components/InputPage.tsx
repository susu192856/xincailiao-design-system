import { CheckCircle, MagnifyingGlass, X, SpinnerGap, ArrowRight } from "@phosphor-icons/react";
import { useId, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionCard, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import DocsTable from "../../../components/docs/DocsTable";
import CodeBlock from "../../../components/docs/CodeBlock";
import { Checkbox } from "../../../components/ui/Checkbox";
import { Input, InputAffixSelect } from "../../../components/ui/Input";
import { InputNumber } from "../../../components/ui/InputNumber";
import { Textarea } from "../../../components/ui/Textarea";

const anatomyRows = [
  ["必填标识", "使用红色 * 表示必填；左右标签时放在标签文字前，上下标签时放在标签文字后。"],
  ["标签文字", "14px / Regular / text-secondary；左右结构固定宽度并右对齐，不由 placeholder 替代。"],
  ["输入框容器", "承载输入值、占位符和前后缀；边框、背景与交互状态统一使用字段 Token。"],
  ["占位符", "使用 neutral-400 提供格式、示例或操作提示；内容应简短，不重复标签，也不能替代默认值。"],
  ["后缀区域", "位于输入框右侧，可显示字数限制、单位或状态图标；只补充输入语义，不替代标签与错误说明。"],
  ["辅助或错误文字", "12px / Regular；默认 text-tertiary，错误使用 error-text 并说明修正方式。"],
];

const anatomyMarkerClass = "absolute z-10 hidden h-5 w-5 items-center justify-center rounded-full border border-[var(--product-blue-500)] bg-[var(--product-blue-500)] font-data text-[10px] font-medium text-white shadow-sm sm:flex";

const inputProps = [
  ["label", "string", "—", "可见字段名称；正式录入场景必须提供。"],
  ["placeholder", "string", "—", "格式、示例或动作提示，不替代 label。"],
  ["size", "sm | md | lg", "md", "桌面高度分别为 28 / 32 / 36px，窄屏至少 44px。"],
  ["prefix", "ReactNode", "—", "前置图标或短文字，例如搜索图标、货币符号。"],
  ["suffix", "ReactNode", "—", "后置图标、单位或短标签，例如状态图标、MPa。"],
  ["prefixAddon / suffixAddon", "ReactNode", "—", "与输入框共享边框的可交互控件；用于区号、币种或数量级选择，不用于普通固定单位。"],
  ["showCount", "boolean", "false", "在控件内部右侧显示字符计数，建议与 maxLength 配合。"],
  ["helperText", "string", "—", "字段用途、格式或限制说明。"],
  ["error", "string", "—", "错误说明，同时驱动错误边框和 aria-invalid。"],
  ["loading", "boolean", "false", "异步校验中；输入框只读并显示旋转器替代后缀。"],
  ["labelPosition", "top | left", "top", "宽页面可使用 left；窄屏自动回到上下结构。"],
  ["labelWidth", "number | string", "96", "左右结构中的标签宽度，推荐 96–120px。"],
  ["readOnly / disabled", "boolean", "false", "分别表达可复制不可改、当前不可操作。"],
];

const textareaProps = [
  ["size", "sm | md | lg", "md", "最小高度分别为 80 / 96 / 120px。"],
  ["rows", "number", "浏览器默认", "需要按内容预估行数时使用，仍受最小高度约束。"],
  ["maxLength", "number", "—", "限制可输入字符数。"],
  ["showCount", "boolean", "false", "显示当前字符数，建议与 maxLength 配合。"],
  ["helperText / error", "string", "—", "帮助信息或错误说明，通过 aria-describedby 关联。"],
  ["readOnly / disabled", "boolean", "false", "语义与单行输入一致。"],
];

function ClearableInput({
  label,
  placeholder,
  helperText,
  defaultValue,
  size = "md",
  labelPosition = "top",
  labelWidth = 96,
}: {
  label?: string;
  placeholder?: string;
  helperText?: string;
  defaultValue?: string;
  size?: "sm" | "md" | "lg";
  labelPosition?: "top" | "left";
  labelWidth?: number | string;
}) {
  const [value, setValue] = useState(defaultValue ?? "");
  const inputId = useId();

  const sharedProps = {
    id: inputId,
    label,
    placeholder,
    helperText,
    size,
    labelPosition,
    labelWidth: labelPosition === "left" ? labelWidth : undefined,
    value,
    onChange: (e: { target: { value: string } }) => setValue(e.target.value),
  };

  return (
    <Input
      {...sharedProps}
      suffix={
        value ? (
          <button
            type="button"
            onClick={(event) => {
              const input = event.currentTarget.closest("span.relative")?.querySelector("input");
              setValue("");
              requestAnimationFrame(() => input?.focus());
            }}
            aria-label={label ? `清除${label}` : "清除输入内容"}
            title="清除输入内容"
            className="flex h-6 w-6 items-center justify-center rounded-[var(--radius-sm)] text-[var(--text-tertiary)] transition-colors hover:bg-[var(--neutral-100)] hover:text-[var(--text-primary)] focus-visible:bg-[var(--neutral-100)] focus-visible:text-[var(--text-primary)] focus-visible:outline-none"
          >
            <X size={14} weight="regular" aria-hidden="true" />
          </button>
        ) : undefined
      }
    />
  );
}

function InteractivePlaygroundSection() {
  const [labelText, setLabelText] = useState("材料牌号");
  const [placeholder, setPlaceholder] = useState("例如：TC4");
  const [size, setSize] = useState<"sm" | "md" | "lg">("md");
  const [labelPos, setLabelPos] = useState<"top" | "left">("left");
  const [prefixType, setPrefixType] = useState<"none" | "search" | "currency" | "prefixAddon" | "suffixAddon">("search");
  const [extra, setExtra] = useState<"none" | "clearable" | "stepper">("none");
  const [state, setState] = useState<"default" | "error" | "disabled" | "loading" | "readOnly">("default");
  const [showCount, setShowCount] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const prefixMap = {
    none: undefined,
    search: <MagnifyingGlass size={16} weight="regular" aria-hidden="true" />,
    currency: "¥",
    prefixAddon: <InputAffixSelect size={size} aria-label="国家或地区区号" defaultValue="+86" options={[{label:"+86",value:"+86"},{label:"+852",value:"+852"}]} />,
    suffixAddon: undefined,
  };

  const stateProps = {
    default: {},
    error: { error: "编号格式应为 MAT-年份-序号" } as Record<string, unknown>,
    disabled: { disabled: true },
    loading: { loading: true },
    readOnly: { readOnly: true },
  };

  const resetPlayground = () => {
    setLabelText("材料牌号");
    setPlaceholder("例如：TC4");
    setSize("md");
    setLabelPos("left");
    setPrefixType("search");
    setExtra("none");
    setState("default");
    setShowCount(false);
    setInputValue("");
  };

  const sizeLabel = { sm: "Small · 28px", md: "Medium · 32px", lg: "Large · 36px" }[size];
  const positionLabel = labelPos === "top" ? "上下标签" : "左右标签";
  const prefixLabel = { none: "无前缀", search: "搜索图标", currency: "¥ 货币", prefixAddon: "可交互前缀", suffixAddon: "可交互后缀" }[prefixType];
  const extraLabel = { none: "无", clearable: "一键清除", stepper: "数值步进" }[extra];
  const stateLabel = { default: "默认", error: "错误", disabled: "禁用", loading: "加载", readOnly: "只读" }[state];
  const optionClass = (selected: boolean) => `rounded-[var(--radius-sm)] border px-2 py-1 text-xs font-medium transition-colors ${selected ? "border-[var(--neutral-900)] bg-[var(--neutral-900)] text-white" : "border-[var(--neutral-200)] bg-white text-[var(--text-secondary)] hover:border-[var(--neutral-400)] hover:text-[var(--text-primary)]"}`;

  return (
    <section>
      <SectionHeading
        eyebrow="Playground"
        title="即时体验"
        description="选择内容、外观和状态，直接比较输入框在真实业务场景中的变化。"
      />
      <SectionCard className="overflow-hidden !p-0">
        <div className="flex items-center justify-between gap-4 border-b border-[var(--neutral-200)] px-5 py-4 md:px-6">
          <div><h3 className="text-sm font-semibold text-[var(--text-primary)]">自定义输入框</h3><p className="mt-1 text-xs text-[var(--text-tertiary)]">调整左侧选项，右侧结果会立即更新。</p></div>
          <button type="button" onClick={resetPlayground} className="shrink-0 rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white px-2 py-1 text-xs font-medium text-[var(--text-secondary)] hover:border-[var(--neutral-400)] hover:text-[var(--text-primary)]">恢复默认</button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[360px_minmax(0,1fr)]">
          <div className="space-y-7 p-5 md:p-6 lg:border-r lg:border-[var(--neutral-200)]">
            <div><h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-tertiary)]">内容</h4><div className="space-y-4"><Input label="标签文字" value={labelText} onChange={(e) => setLabelText(e.target.value)} /><Input label="占位提示" value={placeholder} onChange={(e) => setPlaceholder(e.target.value)} /><Input label="示例输入值" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="也可直接在右侧输入" /></div></div>
            <div className="border-t border-[var(--neutral-200)] pt-6"><h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-tertiary)]">外观</h4><div className="space-y-5">
              <div><div className="mb-2 text-xs font-medium text-[var(--text-secondary)]">尺寸</div><div className="flex flex-wrap gap-2">{([['sm','Small'],['md','Medium'],['lg','Large']] as const).map(([key,label])=><button key={key} type="button" aria-pressed={size===key} onClick={()=>setSize(key)} className={optionClass(size===key)}>{label}</button>)}</div></div>
              <div><div className="mb-2 text-xs font-medium text-[var(--text-secondary)]">标签布局</div><div className="flex gap-2">{([['top','上下标签'],['left','左右标签']] as const).map(([key,label])=><button key={key} type="button" aria-pressed={labelPos===key} onClick={()=>setLabelPos(key)} className={optionClass(labelPos===key)}>{label}</button>)}</div></div>
              <div><div className="mb-2 text-xs font-medium text-[var(--text-secondary)]">前缀 / 后缀</div><div className="flex flex-wrap gap-2">{([['none','无'],['search','搜索图标'],['currency','¥ 货币'],['prefixAddon','可交互前缀'],['suffixAddon','可交互后缀']] as const).map(([key,label])=><button key={key} type="button" aria-pressed={prefixType===key} onClick={()=>setPrefixType(key)} className={optionClass(prefixType===key)}>{label}</button>)}</div></div>
              <div><div className="mb-2 text-xs font-medium text-[var(--text-secondary)]">附加能力</div><div className="flex flex-wrap gap-2">{([['none','无'],['clearable','一键清除'],['stepper','数值步进']] as const).map(([key,label])=><button key={key} type="button" aria-pressed={extra===key} onClick={()=>setExtra(key)} className={optionClass(extra===key)}>{label}</button>)}</div></div>
            </div></div>
            <div className="border-t border-[var(--neutral-200)] pt-6"><h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-tertiary)]">状态</h4><div className="space-y-4">
              <div className="flex flex-wrap gap-2">{([['default','默认'],['error','错误'],['disabled','禁用'],['loading','加载'],['readOnly','只读']] as const).map(([key,label])=><button key={key} type="button" aria-pressed={state===key} onClick={()=>setState(key)} className={optionClass(state===key)}>{label}</button>)}</div>
              <Checkbox id="play-show-count" size="sm" checked={showCount} onChange={(e)=>setShowCount(e.target.checked)} label="显示字符计数" description="最多输入 20 个字符" />
            </div></div>
          </div>
          <div className="bg-[var(--neutral-50)] p-5 md:p-8">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div><h4 className="text-sm font-semibold text-[var(--text-primary)]">实时预览</h4><p className="mt-1 text-xs text-[var(--text-tertiary)]">可直接在下方输入框中体验。</p></div><div className="flex flex-wrap gap-1.5">{[sizeLabel,positionLabel,prefixLabel,extraLabel,stateLabel].filter(Boolean).map(item=><span key={item} className="rounded-full border border-[var(--neutral-200)] bg-white px-2.5 py-1 text-[11px] text-[var(--text-secondary)]">{item}</span>)}</div></div>
            <div className="flex min-h-[360px] items-center justify-center rounded-[var(--radius-sm)] border border-dashed border-[var(--neutral-300)] bg-white p-6 md:p-10">
              <div className="w-full max-w-[480px]">
                {extra === "stepper" ? (
                  <InputNumber label={labelText||undefined} placeholder={placeholder} size={size} labelPosition={labelPos} labelWidth={88} defaultValue={0.5} min={0} max={10} step={0.5} suffix="°C" {...stateProps[state]} />
                ) : extra === "clearable" ? (
                  <ClearableInput label={labelText||undefined} placeholder={placeholder} size={size} labelPosition={labelPos} labelWidth={labelPos === "left" ? 88 : undefined} defaultValue={inputValue || "MAT-2026-0618-TC4"} />
                ) : (
                  <Input label={labelText||undefined} placeholder={placeholder} size={size} labelPosition={labelPos} labelWidth={88} prefix={prefixType === "prefixAddon" ? undefined : prefixMap[prefixType]} prefixAddon={prefixType === "prefixAddon" ? <InputAffixSelect size={size} aria-label="国家或地区区号" defaultValue="+86" options={[{label:"+86",value:"+86"},{label:"+852",value:"+852"}]} /> : undefined} suffixAddon={prefixType === "suffixAddon" ? <InputAffixSelect size={size} side="end" aria-label="数量级单位" defaultValue="万" options={[{label:"百",value:"百"},{label:"万",value:"万"}]} /> : undefined} showCount={showCount} maxLength={showCount?20:undefined} value={inputValue} onChange={(e)=>setInputValue(e.target.value)} {...stateProps[state]} />
                )}
              </div>
            </div>
          </div>
        </div>
      </SectionCard>
    </section>
  );
}

export default function InputPage() {
  return (
    <div className="space-y-16">
      <PageHeader
        title="输入框"
        description="输入框家族用于采集文本、参数和筛选条件，包括单行 Input 与多行 Textarea。先按内容长度选择结构，再统一应用标签、提示、状态和可访问性规则。"
        note={<>关联页面：多个输入框如何组成分组、栅格和提交路径见 <Link to="/components/form" className="font-medium text-[var(--product-blue-500)]">表单</Link>；提交后的只读字段呈现见 <Link to="/components/description-list" className="font-medium text-[var(--product-blue-500)]">详情与描述列表</Link>；日期选择见 <Link to="/components/select" className="font-medium text-[var(--product-blue-500)]">选择器与日期选择</Link>。</>}
      />

      <section>
        <SectionHeading
          eyebrow="Anatomy"
          title="输入框结构"
          description="文字、颜色、边框和状态均使用基础规范 Token；页面示例不得用局部硬编码覆盖组件合同。"
        />
        <SectionCard className="md:p-6">
            <div className="relative mx-auto max-w-[448px] py-2 sm:pl-6">
              <span aria-hidden="true" className={`${anatomyMarkerClass} left-[24px] -top-2`}>1</span>
              <span aria-hidden="true" className={`${anatomyMarkerClass} left-[64px] -top-2`}>2</span>
              <span aria-hidden="true" className={`${anatomyMarkerClass} left-[114px] -top-2`}>3</span>
              <span aria-hidden="true" className={`${anatomyMarkerClass} left-[168px] -top-2`}>4</span>
              <span aria-hidden="true" className={`${anatomyMarkerClass} right-0 -top-2`}>5</span>
              <span aria-hidden="true" className={`${anatomyMarkerClass} -bottom-1 left-[114px]`}>6</span>
              <Input
                labelPosition="left"
                labelWidth={88}
                label="材料牌号"
                placeholder="例如：TC4"
                prefix={<MagnifyingGlass size={16} weight="regular" aria-hidden="true" />}
                helperText="输入牌号后匹配材料主数据。"
                maxLength={20}
                showCount
                required
              />
            </div>
            <div className="mt-6 grid grid-cols-1 gap-3 border-t border-[var(--neutral-200)] pt-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {anatomyRows.map(([name, rule], index) => (
                <div key={name} className="rounded-[var(--radius-sm)] bg-[var(--neutral-50)] p-4">
                  <div className="flex items-start gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[var(--product-blue-500)] bg-[var(--product-blue-500)] font-data text-[10px] font-medium text-white">{index + 1}</span>
                    <h3 className="text-sm font-semibold text-[var(--text-primary)]">{name}</h3>
                  </div>
                  <p className="mt-1.5 text-xs leading-5 text-[var(--text-secondary)]">{rule}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 border-t border-[var(--neutral-200)] pt-5">
              <h4 className="mb-3 text-sm font-semibold text-[var(--text-primary)]">宽度规则</h4>
              <div className="grid grid-cols-1 gap-4 text-sm leading-6 text-[var(--text-secondary)] md:grid-cols-3">
                <div className="bg-[var(--neutral-50)] p-4"><strong className="block text-[var(--text-primary)]">常规输入 · 360px</strong>名称、编号、单值参数的推荐宽度。</div>
                <div className="bg-[var(--neutral-50)] p-4"><strong className="block text-[var(--text-primary)]">长字段 · 最大 480px</strong>超出后应拆分栅格，不继续拉长控件。</div>
                <div className="bg-[var(--neutral-50)] p-4"><strong className="block text-[var(--text-primary)]">紧凑筛选 · 160–240px</strong>多条件筛选优先每行 3 个并保留标签。</div>
              </div>
            </div>
        </SectionCard>
      </section>

      <section>
        <SectionHeading eyebrow="Structures" title="输入框类型与能力" description="先选择基础输入类型，再按业务语义叠加前后缀形式或清除能力；附加能力不改变输入值的基础类型。" />
        <SectionCard className="md:p-6">
          <div className="space-y-6">
            <div><h3 className="mb-4 text-sm font-semibold text-[var(--text-primary)]">基础类型</h3><div className="max-w-[492px] space-y-4"><Input labelPosition="left" labelWidth={96} label="文本输入" placeholder="例如：MAT-2026-001" helperText="名称、编号和单值文本。" /><InputNumber label="数值步进器" labelPosition="left" labelWidth={96} defaultValue={0.5} min={0} max={10} step={0.5} suffix="°C" helperText="用于连续数值调整；支持直接输入、步长、边界和单位。" /></div></div>
            <div className="border-t border-[var(--neutral-200)] pt-5"><h3 className="mb-4 text-sm font-semibold text-[var(--text-primary)]">前后缀形式</h3><div className="max-w-[492px] space-y-4"><Input labelPosition="left" labelWidth={96} label="采购金额" inputMode="decimal" placeholder="0.00" prefix="¥" helperText="人民币语境明确时使用 ¥；跨币种场景改用 CNY，不与 ¥ 重复显示。" /><Input labelPosition="left" labelWidth={96} label="抗拉强度" inputMode="decimal" placeholder="请输入数值" suffix="MPa" helperText="固定单位仅补充数值语义，不写入输入值。" /><Input labelPosition="left" labelWidth={96} label="搜索前缀" placeholder="请输入材料名称" prefix={<MagnifyingGlass size={16} weight="regular" aria-hidden="true" />} helperText="图标只强化检索语义，仍需提供可访问名称。" /><Input labelPosition="left" labelWidth={96} label="状态后缀" defaultValue="MAT-2026-001" suffix={<CheckCircle size={16} weight="regular" aria-hidden="true" />} readOnly helperText="状态图标需配合文字解释校验结论。" /><Input labelPosition="left" labelWidth={96} label="可交互前缀" inputMode="tel" placeholder="请输入手机号" prefixAddon={<InputAffixSelect aria-label="国家或地区区号" defaultValue="+86" options={[{label:"+86",value:"+86"},{label:"+852",value:"+852"}]} />} /><Input labelPosition="left" labelWidth={96} label="可交互后缀" inputMode="decimal" placeholder="请输入数量" suffixAddon={<InputAffixSelect side="end" aria-label="数量级单位" defaultValue="万" options={[{label:"百",value:"百"},{label:"万",value:"万"}]} />} helperText="可交互前后缀会改变输入值解释。" /></div></div>
            <div className="border-t border-[var(--neutral-200)] pt-5"><h3 className="mb-4 text-sm font-semibold text-[var(--text-primary)]">附加能力</h3><div className="max-w-[492px]"><ClearableInput label="可清除输入" labelPosition="left" labelWidth={96} defaultValue="MAT-2026-0618-TC4" placeholder="请输入材料批号" helperText="清空后保持输入焦点；重新输入内容时清除按钮再次出现。" /></div></div>
          </div>
        </SectionCard>
        <CodeBlock lang="tsx" label="类型与能力" code={`<Input label="文本输入" />\n<Input label="采购金额" prefix="¥" />\n<Input label="抗拉强度" suffix="MPa" />\n<InputNumber min={0} max={10} step={0.5} />`} />
      </section>

      <section>
        <SectionHeading eyebrow="Sizes" title="输入框尺寸" description="单行 Input 使用固定控件高度，多行 Textarea 使用最小高度；两者文字均为 14px，并共享 Small / Medium / Large 三级语义。" />
        <ExampleCard title="单行 Input · Small / Medium / Large">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <Input size="sm" label="Small · 28px" placeholder="表格筛选" />
              <p className="mt-2 text-xs leading-5 text-[var(--text-tertiary)]">紧凑筛选、表格工具栏和行内编辑。</p>
            </div>
            <div>
              <Input size="md" label="Medium · 32px" placeholder="默认表单" />
              <p className="mt-2 text-xs leading-5 text-[var(--text-tertiary)]">后台表单默认尺寸。</p>
            </div>
            <div>
              <Input size="lg" label="Large · 36px" placeholder="重点字段" />
              <p className="mt-2 text-xs leading-5 text-[var(--text-tertiary)]">官网线索、重点字段和低密度表单。</p>
            </div>
          </div>
        </ExampleCard>
        <div className="mt-5">
          <ExampleCard title="多行 Textarea · Small / Medium / Large">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div><Textarea size="sm" label="Small · 80px" placeholder="简短备注" /><p className="mt-2 text-xs leading-5 text-[var(--text-tertiary)]">1–3 行简短补充。</p></div>
              <div><Textarea size="md" label="Medium · 96px" placeholder="默认说明输入" /><p className="mt-2 text-xs leading-5 text-[var(--text-tertiary)]">常规说明与审核意见。</p></div>
              <div><Textarea size="lg" label="Large · 120px" placeholder="长说明或治理记录" /><p className="mt-2 text-xs leading-5 text-[var(--text-tertiary)]">长说明、异常原因和治理记录。</p></div>
            </div>
          </ExampleCard>
        </div>
        <CodeBlock
          lang="tsx"
          label="尺寸"
          code={`// Input 三档尺寸
<Input size="sm" label="Small" placeholder="表格筛选" />
<Input size="md" label="Medium" placeholder="默认表单" />
<Input size="lg" label="Large" placeholder="重点字段" />

// Textarea 三档尺寸
<Textarea size="sm" label="Small" placeholder="简短备注" />
<Textarea size="md" label="Medium" placeholder="默认说明输入" />
<Textarea size="lg" label="Large" placeholder="长说明或治理记录" />`}
        />
      </section>

      <section>
        <SectionHeading eyebrow="States" title="输入状态" description="状态不能只依赖边框颜色；错误、只读和禁用必须同时有文字或上下文说明。" />
        <div className="space-y-5">
          <SectionCard className="md:p-6">
            <div className="max-w-[672px] grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <Input labelPosition="left" labelWidth={64} label="默认" placeholder="请输入内容" />
              <Input labelPosition="left" labelWidth={64} label="Hover" defaultValue="可编辑内容" className="!border-[var(--field-border-hover)]" helperText="仅桌面指针悬停时增强边框。" />
              <Input labelPosition="left" labelWidth={64} label="Focus" placeholder="点击或 Tab 聚焦" autoFocus className="!border-[var(--field-border-focus)] [box-shadow:0_0_0_1px_#FFFFFF,_0_0_0_3px_var(--focus-ring-color)]" helperText="键盘和鼠标聚焦均显示清晰焦点。" />
              <Input labelPosition="left" labelWidth={64} label="必填" placeholder="请输入内容" required />
              <Input labelPosition="left" labelWidth={64} label="错误" defaultValue="ABC" error="编号格式应为 MAT-年份-序号" />
              <Input labelPosition="left" labelWidth={64} label="只读" value="系统计算结果" readOnly helperText="可以查看和复制。" />
              <Input labelPosition="left" labelWidth={64} label="禁用" value="等待上一步完成" disabled helperText="当前流程节点不可操作。" />
              <Input labelPosition="left" labelWidth={64} label="Loading" value="正在校验…" loading helperText="保留已有内容，输入框只读并显示旋转器。" />
            </div>
          </SectionCard>
          <CodeBlock
                lang="tsx"
                label="状态"
                code={`// 可选标记
<Input label="必填" placeholder="请输入内容" required />

// 错误 — 必须给出修正方式
<Input label="编号" defaultValue="ABC" error="编号格式应为 MAT-年份-序号" />

// 只读 — 可选中、可复制
<Input label="计算结果" value="系统计算结果" readOnly />

// 禁用 — 不可操作，需在上下文中说明原因
<Input label="当前节点" value="等待上一步完成" disabled />

// Loading — 校验中
<Input label="校验" value="正在校验…" loading />`}
          />
        </div>
      </section>

      <section>
          <SectionHeading eyebrow="Label Layout" title="标签结构" description="按容器角色选择上下或左右标签；同一字段组保持一致。" />
        <div className="rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-5 md:p-6">
          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
            <ExampleCard title="上下标签 - 局部例外"><div className="max-w-[360px] space-y-4"><Input label="材料名称" placeholder="请输入材料名称" helperText="适合弹窗、窄卡片、移动端或需要强调的独立字段。" /><Textarea label="补充说明" placeholder="补充材料来源或用途" /></div></ExampleCard>
            <ExampleCard title="左右标签 - 项目默认"><div className="max-w-[640px] space-y-4"><Input labelPosition="left" labelWidth={88} label="名称" placeholder="请输入材料名称" required /><Input labelPosition="left" labelWidth={88} label="材料数据来源" placeholder="实验采集 / 企业上传" helperText="不同长度标签使用同一宽度并右对齐；移动端自动回到上下结构。" /></div></ExampleCard>
          </div>
          <div className="mt-5 border-t border-[var(--neutral-200)] pt-5">
            <h4 className="mb-3 text-sm font-semibold text-[var(--text-primary)]">标签结构使用规则</h4>
            <div className="grid grid-cols-1 gap-4 text-sm leading-6 text-[var(--text-secondary)] md:grid-cols-3">
              <div className="bg-[var(--neutral-50)] p-4"><strong className="block text-[var(--text-primary)]">按容器选择</strong>主编辑区使用左右结构；弹窗、窄容器和移动端使用上下结构。</div>
              <div className="bg-[var(--neutral-50)] p-4"><strong className="block text-[var(--text-primary)]">同组保持一致</strong>同一 FormSection 内的同级字段不得交替使用两种标签结构。</div>
              <div className="bg-[var(--neutral-50)] p-4"><strong className="block text-[var(--text-primary)]">标签与间距</strong>默认宽 88px、右对齐、间距 12px；长标签统一扩展至 96–120px。</div>
            </div>
          </div>
        </div>
        <CodeBlock
            lang="tsx"
            label="标签结构"
            code={`// 上下标签 — 弹窗、窄容器
<Input label="材料名称" placeholder="请输入材料名称" />

// 左右标签 — 主编辑区（项目默认）
<Input labelPosition="left" labelWidth={88} label="名称" placeholder="请输入" required />

// 长标签扩展宽度
<Input labelPosition="left" labelWidth={120} label="材料数据来源" placeholder="实验采集 / 企业上传" />`}
        />
      </section>

      <section id="textarea" className="scroll-mt-6">
        <SectionHeading
          eyebrow="Textarea"
          title="文本域"
          description="文本域沿用单行输入的标签、占位、辅助文字、错误、只读和禁用规则，并增加最小高度、纵向缩放和字符计数。"
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="标准结构与字符计数">
            <Textarea
              label="数据来源说明"
              placeholder="说明来源机构、采集方式和处理过程"
              helperText={"按「来源—方法—时间」顺序填写。"}
              maxLength={300}
              showCount
              required
            />
          </ExampleCard>
          <ExampleCard title="错误、只读与禁用">
            <div className="space-y-4">
              <Textarea label="审核意见" placeholder="请输入驳回原因" error="驳回时必须填写审核意见" />
              <Textarea label="系统摘要" value="该内容由系统生成，可查看复制。" readOnly />
              <Textarea label="当前节点" value="审批完成前不可编辑。" disabled />
            </div>
          </ExampleCard>
        </div>
        <div className="mt-5 rounded-[var(--radius-sm)] border border-[var(--warning-border)] bg-[var(--warning-bg)] p-4 text-sm leading-6 text-[var(--text-secondary)]">
          <strong className="text-[var(--text-primary)]">边界提醒：</strong>
          文本域不承载富文本排版、代码校验、语法高亮、公式编辑或结构化 JSON 配置——这些是专用编辑器的职责。
        </div>
        <CodeBlock
          lang="tsx"
          label="Textarea"
          code={`// 标准结构 + 字数统计
<Textarea
  label="数据来源说明"
  placeholder="说明来源机构、采集方式和处理过程"
  helperText="按「来源—方法—时间」顺序填写。"
  maxLength={300}
  showCount
  required
/>

// 错误
<Textarea label="审核意见" placeholder="请输入驳回原因" error="驳回时必须填写审核意见" />

// 只读
<Textarea label="系统摘要" value="该内容由系统生成，可查看复制。" readOnly />

// 禁用
<Textarea label="当前节点" value="审批完成前不可编辑。" disabled />`}
        />
      </section>

      <InteractivePlaygroundSection />

      <section>
        <SectionHeading eyebrow="Guidelines" title="最佳实践" />
        <SpecList items={[
          "短名称、编号、关键词和单值参数使用 Input；备注、原因和说明使用 Textarea。",
          "正式录入字段必须有可见标签；placeholder 只提供格式或示例——不要只依赖占位符和颜色表达状态。",
          "标签、输入与占位文字使用 14px Regular；辅助和错误文字使用 12px Regular。",
          "默认使用 Medium；紧凑筛选使用 Small，低密度重点字段使用 Large。",
          "页面图标统一来自 @phosphor-icons/react，不使用临时手绘 SVG；输入框前后缀图标使用 16px / Regular。",
          "图标只补充搜索、状态和加载语义，不替代字段标签、错误文字或操作名称。",
          "单个字段推荐宽度 360px，Max 480px。超出时先拆多列栅格再考虑左右 label，详见表单页面。",
          "紧凑筛选控件建议宽 160–240px；多条件筛选优先每行 3 个，并保留可见标签。",
          "内容较长时提供清除按钮；有字数限制时在控件内部显示实时字符计数。",
          "错误必须给出原因和修正方式；只读与禁用不能混用。",
          "Textarea 的 Small / Medium / Large 最小高度为 80 / 96 / 120px，长内容允许纵向滚动或缩放。",
          "帮助文字、错误信息和字符计数必须与对应控件保持关联，状态不能只依赖颜色。",
        ]} />
        <div className="mt-5 rounded-[var(--radius-sm)] border border-[var(--warning-border)] bg-[var(--warning-bg)] p-4 text-sm leading-6 text-[var(--text-secondary)]">
          <strong className="text-[var(--text-primary)]">常见错误：</strong>
          只用 placeholder 替代 label、只用红色边框表示错误而不给修正文字——这两种做法会让用户在输入后失去上下文，也无法知道如何修正。
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="API" title="属性与实现边界" />
        <div className="space-y-6">
          <div>
            <h3 className="mb-3 text-sm font-semibold text-[var(--text-primary)]">Input</h3>
            <DocsTable>
              <thead className="bg-[var(--neutral-50)] text-sm font-semibold text-[var(--text-primary)]"><tr className="border-b border-[var(--neutral-200)]"><th className="px-6 py-3 font-semibold">属性</th><th className="px-6 py-3 font-semibold">类型</th><th className="px-6 py-3 font-semibold">默认值</th><th className="px-6 py-3 font-semibold">规则</th></tr></thead>
              <tbody className="divide-y divide-[var(--neutral-100)] bg-white">{inputProps.map(([name, type, defaultValue, rule]) => <tr key={name}><td className="px-6 py-4 text-sm text-[var(--text-primary)]">{name}</td><td className="px-6 py-4 text-sm text-[var(--text-secondary)]">{type}</td><td className="px-6 py-4 text-sm text-[var(--text-secondary)]">{defaultValue}</td><td className="px-6 py-4 text-sm leading-6 text-[var(--text-secondary)]">{rule}</td></tr>)}</tbody>
            </DocsTable>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-[var(--text-primary)]">Textarea</h3>
            <DocsTable>
              <thead className="bg-[var(--neutral-50)] text-sm font-semibold text-[var(--text-primary)]"><tr className="border-b border-[var(--neutral-200)]"><th className="px-6 py-3 font-semibold">属性</th><th className="px-6 py-3 font-semibold">类型</th><th className="px-6 py-3 font-semibold">默认值</th><th className="px-6 py-3 font-semibold">规则</th></tr></thead>
              <tbody className="divide-y divide-[var(--neutral-100)] bg-white">{textareaProps.map(([name, type, defaultValue, rule]) => <tr key={name}><td className="px-6 py-4 text-sm text-[var(--text-primary)]">{name}</td><td className="px-6 py-4 text-sm text-[var(--text-secondary)]">{type}</td><td className="px-6 py-4 text-sm text-[var(--text-secondary)]">{defaultValue}</td><td className="px-6 py-4 text-sm leading-6 text-[var(--text-secondary)]">{rule}</td></tr>)}</tbody>
            </DocsTable>
          </div>
        </div>
      </section>

      <Link
        to="/components/form"
        className="group flex items-center justify-between gap-4 rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-5 transition-all hover:border-[var(--neutral-300)] hover:bg-[var(--neutral-50)]"
      >
        <div>
          <div className="text-xs font-medium text-[var(--text-tertiary)]">下一步</div>
          <h3 className="mt-1 text-sm font-semibold text-[var(--text-primary)]">表单</h3>
          <p className="mt-1 text-xs text-[var(--text-tertiary)]">将单个字段组合为分组、栅格、校验和提交路径</p>
        </div>
        <ArrowRight size={18} weight="regular" className="text-[var(--text-tertiary)]" />
      </Link>
    </div>
  );
}
