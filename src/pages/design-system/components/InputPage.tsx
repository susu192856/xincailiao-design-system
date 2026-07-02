import { CheckCircle, MagnifyingGlass, X, SpinnerGap, ArrowRight } from "@phosphor-icons/react";
import { useId, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionCard, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import DocsTable from "../../../components/docs/DocsTable";
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

const stateRows = [
  ["Default", "field-border-default", "可输入，白色背景。"],
  ["Hover", "field-border-hover", "仅可编辑控件在桌面指针悬停时增强边框；只读和禁用不响应。"],
  ["Focus", "field-border-focus + focus ring", "键盘和点击聚焦均显示清晰焦点。"],
  ["Error", "field-border-error + error-text", "保留可编辑，并显示具体错误原因。"],
  ["Read only", "field-bg-readonly", "可查看、选择和复制，不可修改。"],
  ["Disabled", "field-bg-disabled", "不可操作，需在上下文中说明禁用原因。"],
];

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
  defaultValue,
}: {
  label: string;
  placeholder?: string;
  defaultValue?: string;
}) {
  const [value, setValue] = useState(defaultValue ?? "");
  const inputId = useId();
  return (
    <div>
      <label htmlFor={inputId} className="mb-1.5 block text-sm font-normal text-[var(--text-secondary)]">{label}</label>
      <div className="relative">
        <Input id={inputId} aria-label={label} placeholder={placeholder} value={value} onChange={(e) => setValue(e.target.value)} className="pr-10" />
        {value ? (
          <button
            type="button"
            onClick={() => setValue("")}
            aria-label={`清除${label}`}
            className="absolute inset-y-0 right-0 flex w-8 items-center justify-center text-[var(--text-tertiary)] hover:bg-[var(--neutral-50)] hover:text-[var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--focus-ring-color)]"
          >
            <X size={16} weight="regular" aria-hidden="true" />
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default function InputPage() {
  return (
    <div className="space-y-16">
      <PageHeader
        title="输入框"
        description="输入框家族用于采集文本、参数和筛选条件，包括单行 Input 与多行 Textarea。先按内容长度选择结构，再统一应用标签、提示、状态和可访问性规则。"
        note={<>关联页面：多个输入框如何组成分组、栅格和提交路径见 <Link to="/components/form" className="font-medium text-[var(--product-blue-500)]">表单</Link>；提交后的只读字段呈现见 <Link to="/components/description-list" className="font-medium text-[var(--product-blue-500)]">详情与描述列表</Link>。</>}
      />

      <section>
        <SectionHeading
          eyebrow="Anatomy"
          title="输入框结构"
          description="文字、颜色、边框和状态均使用基础规范 Token；页面示例不得用局部硬编码覆盖组件合同。"
        />
        <SectionCard className="md:p-6">
            <div className="relative mx-auto max-w-[448px] py-2 sm:pl-6">
              <span aria-hidden="true" className={`${anatomyMarkerClass} left-[28px] -top-2`}>1</span>
              <span aria-hidden="true" className={`${anatomyMarkerClass} left-[68px] -top-2`}>2</span>
              <span aria-hidden="true" className={`${anatomyMarkerClass} left-[116px] top-1`}>3</span>
              <span aria-hidden="true" className={`${anatomyMarkerClass} left-[168px] -top-2`}>4</span>
              <span aria-hidden="true" className={`${anatomyMarkerClass} right-0 top-1`}>5</span>
              <span aria-hidden="true" className={`${anatomyMarkerClass} bottom-0 left-[116px]`}>6</span>
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
      </section>

      <section>
        <SectionHeading eyebrow="States" title="输入状态" description="状态不能只依赖边框颜色；错误、只读和禁用必须同时有文字或上下文说明。同时展示各状态的完整 Token 映射和视觉示例。" />
        <div className="space-y-5">
          <SectionCard className="md:p-6">
            <div className="max-w-[436px] space-y-4">
              <Input labelPosition="left" labelWidth={64} label="默认" placeholder="请输入内容" />
              <Input labelPosition="left" labelWidth={64} label="Hover" defaultValue="可编辑内容" className="!border-[var(--field-border-hover)]" helperText="仅桌面指针悬停时增强边框。" />
              <Input labelPosition="left" labelWidth={64} label="Focus" placeholder="点击或 Tab 聚焦" className="!border-[var(--field-border-focus)] ring-1 ring-[var(--neutral-900)]" helperText="键盘和鼠标聚焦均显示清晰焦点。" />
              <Input labelPosition="left" labelWidth={64} label="必填" placeholder="请输入内容" required />
              <Input labelPosition="left" labelWidth={64} label="错误" defaultValue="ABC" error="编号格式应为 MAT-年份-序号" />
              <Input labelPosition="left" labelWidth={64} label="只读" value="系统计算结果" readOnly helperText="可以查看和复制。" />
              <Input labelPosition="left" labelWidth={64} label="禁用" value="等待上一步完成" disabled helperText="当前流程节点不可操作。" />
              <Input labelPosition="left" labelWidth={64} label="Loading" value="正在校验…" readOnly suffix={<SpinnerGap size={16} weight="regular" className="animate-spin" aria-hidden="true" />} helperText="保留已有内容，并显示当前任务。" />
            </div>
          </SectionCard>
          <DocsTable>
            <thead className="bg-[var(--neutral-50)] text-sm font-semibold text-[var(--text-primary)]">
              <tr className="border-b border-[var(--neutral-200)]">
                <th className="px-6 py-3 font-semibold">状态</th>
                <th className="px-6 py-3 font-semibold">Token</th>
                <th className="px-6 py-3 font-semibold">说明</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--neutral-100)] bg-white">
              {stateRows.map(([state, token, rule]) => (
                <tr key={state}>
                  <td className="px-6 py-4 text-sm font-semibold text-[var(--text-primary)]">{state}</td>
                  <td className="px-6 py-4 text-sm text-[var(--text-secondary)]">{token}</td>
                  <td className="px-6 py-4 text-sm leading-6 text-[var(--text-secondary)]">{rule}</td>
                </tr>
              ))}
            </tbody>
          </DocsTable>
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Structures"
          title="输入框类型"
          description="日常项目长表单默认使用左右结构；上下结构保留给窄容器、移动端、弹窗和少量独立字段。结构变化不改变字段状态语义。"
        />
        <SectionCard className="md:p-6">
          <div className="max-w-[492px] space-y-4">
            <div className="grid grid-cols-1 items-start gap-3 md:grid-cols-[120px_360px]"><div className="pt-1.5 text-right text-sm text-[var(--text-secondary)]">基础输入</div><div><Input aria-label="样品编号" placeholder="例如：MAT-2026-001" /><p className="mt-1.5 text-xs leading-5 text-[var(--text-tertiary)]">名称、编号和单值文本。</p></div></div>
            <div className="grid grid-cols-1 items-start gap-3 md:grid-cols-[120px_360px]"><div className="pt-1.5 text-right text-sm text-[var(--text-secondary)]">文字前后缀</div><div><Input aria-label="采购金额" placeholder="0.00" prefix="¥" suffix="CNY" /><p className="mt-1.5 text-xs leading-5 text-[var(--text-tertiary)]">固定币种和单位只补充格式，不写入输入值。</p></div></div>
            <div className="grid grid-cols-1 items-start gap-3 md:grid-cols-[120px_360px]"><div className="pt-1.5 text-right text-sm text-[var(--text-secondary)]">搜索前缀</div><div><Input aria-label="搜索材料" placeholder="请输入材料名称" prefix={<MagnifyingGlass size={16} weight="regular" aria-hidden="true" />} /><p className="mt-1.5 text-xs leading-5 text-[var(--text-tertiary)]">图标只强化检索语义，仍需提供可访问名称。</p></div></div>
            <div className="grid grid-cols-1 items-start gap-3 md:grid-cols-[120px_360px]"><div className="pt-1.5 text-right text-sm text-[var(--text-secondary)]">状态后缀</div><Input aria-label="材料编码" defaultValue="MAT-2026-001" suffix={<CheckCircle size={16} weight="regular" aria-hidden="true" />} helperText="状态图标需配合文字解释校验结论。" readOnly /></div>
            <div className="grid grid-cols-1 items-start gap-3 md:grid-cols-[120px_360px]"><div className="pt-1.5 text-right text-sm text-[var(--text-secondary)]">可交互前后缀</div><div className="space-y-3"><Input aria-label="手机号码" inputMode="tel" placeholder="请输入手机号" prefixAddon={<InputAffixSelect aria-label="国家或地区区号" defaultValue="+86" options={[{ label: "+86", value: "+86" }, { label: "+852", value: "+852" }, { label: "+853", value: "+853" }]} />} /><Input aria-label="采购数量" inputMode="decimal" placeholder="请输入数量" suffixAddon={<InputAffixSelect aria-label="数量级单位" defaultValue="万" options={[{ label: "百", value: "百" }, { label: "万", value: "万" }, { label: "百万", value: "百万" }]} />} helperText="前缀用于区号，后缀用于可切换单位；两者都会改变输入值解释。" /></div></div>
            <div className="grid grid-cols-1 items-start gap-3 md:grid-cols-[120px_360px]"><div className="pt-1.5 text-right text-sm text-[var(--text-secondary)]">可清除输入</div><ClearableInput label="材料批号" defaultValue="MAT-2026-0618-TC4" /></div>
            <div className="grid grid-cols-1 items-start gap-3 md:grid-cols-[120px_360px]"><div className="pt-1.5 text-right text-sm text-[var(--text-secondary)]">数值步进器</div><InputNumber aria-label="温度增量" defaultValue={0.5} min={0} max={10} step={0.5} suffix="°C" helperText="用于连续数值调整；支持直接输入、步长、边界和单位。" /></div>
          </div>
        </SectionCard>
      </section>

      <section>
          <SectionHeading eyebrow="Label Layout" title="标签结构" description="按容器角色选择上下或左右标签；同一字段组保持一致。" />
        <div className="rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-5 md:p-6">
          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
            <ExampleCard title="上下标签 - 局部例外"><div className="max-w-[360px] space-y-4"><Input label="材料名称" placeholder="请输入材料名称" helperText="适合弹窗、窄卡片、移动端或需要强调的独立字段。" /><Textarea label="补充说明" placeholder="补充材料来源或用途" /></div></ExampleCard>
            <ExampleCard title="左右标签 - 项目默认"><div className="max-w-[640px] space-y-4"><Input labelPosition="left" labelWidth={88} label="名称" placeholder="请输入材料名称" required /><Input labelPosition="left" labelWidth={88} label="材料数据来源" placeholder="实验采集 / 企业上传" helperText="不同长度标签使用同一宽度并右对齐；移动端自动回到上下结构。" /></div></ExampleCard>
          </div>
          <div className="mt-6 border-t border-[var(--neutral-200)] pt-5">
            <h4 className="mb-3 text-sm font-semibold text-[var(--text-primary)]">标签结构使用规则</h4>
            <div className="grid grid-cols-1 gap-4 text-sm leading-6 text-[var(--text-secondary)] md:grid-cols-3">
              <div className="bg-[var(--neutral-50)] p-4"><strong className="block text-[var(--text-primary)]">按容器选择</strong>主编辑区使用左右结构；弹窗、窄容器和移动端使用上下结构。</div>
              <div className="bg-[var(--neutral-50)] p-4"><strong className="block text-[var(--text-primary)]">同组保持一致</strong>同一 FormSection 内的同级字段不得交替使用两种标签结构。</div>
              <div className="bg-[var(--neutral-50)] p-4"><strong className="block text-[var(--text-primary)]">标签与间距</strong>默认宽 88px、右对齐、间距 12px；长标签统一扩展至 96–120px。</div>
            </div>
          </div>
        </div>
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
      </section>

      <section>
        <SectionHeading eyebrow="Do / Don't" title="正确与错误示例" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="flex overflow-hidden rounded-[var(--radius-sm)]"><div className="flex min-w-0 flex-1 flex-col"><ExampleCard className="h-full flex-1" title="正确：字段语义与反馈完整"><Input label="试验温度" placeholder="例如：25" suffix="℃" helperText="填写试验时的环境温度。" required /></ExampleCard><div className="h-0.5 w-full shrink-0 bg-[var(--success-solid)]" /></div></div>
          <div className="flex overflow-hidden rounded-[var(--radius-sm)]"><div className="flex min-w-0 flex-1 flex-col"><ExampleCard className="h-full flex-1" title="错误：只依赖占位符和颜色"><div aria-hidden="true" className="mb-1.5 h-5" /><Input aria-label="错误示例：材料编号" placeholder="材料编号" className="border-[var(--error-text)]" /><p className="mt-1.5 text-xs leading-5 text-[var(--text-tertiary)]">缺少可见字段名和错误原因；输入后占位文字消失，颜色也无法说明如何修正。</p></ExampleCard><div className="h-0.5 w-full shrink-0 bg-[var(--error-solid)]" /></div></div>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Guidelines" title="最佳实践" />
        <SpecList items={[
          "短名称、编号、关键词和单值参数使用 Input；备注、原因和说明使用 Textarea。",
          "正式录入字段必须有可见标签；placeholder 只提供格式或示例。",
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
