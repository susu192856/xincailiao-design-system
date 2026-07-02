import { CheckCircle, MagnifyingGlass, X, SpinnerGap, ArrowRight } from "@phosphor-icons/react";
import { useId, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading, SpecList, SubsectionHeading } from "../../../components/docs/ComponentDoc";
import DocsTable from "../../../components/docs/DocsTable";
import { Input, InputAffixSelect } from "../../../components/ui/Input";
import { InputNumber } from "../../../components/ui/InputNumber";
import { Textarea } from "../../../components/ui/Textarea";

const anatomyRows = [
  ["字段容器", "组织标签、控件和辅助信息；正式录入字段必须保持完整结构。"],
  ["标签文字", "14px / Regular / text-secondary；左右结构固定宽度并右对齐，不由 placeholder 替代。"],
  ["输入文字", "14px / Regular / text-primary；单行输入垂直居中，多行输入顶部对齐。"],
  ["占位文字", "14px / Regular / neutral-400；只提供格式或示例，输入后消失。"],
  ["辅助或错误文字", "12px / Regular；默认 text-tertiary，错误使用 error-text 并说明修正方式。"],
  ["前缀 / 后缀", "图标统一来自 @phosphor-icons/react，使用 16px / Regular 并设置 aria-hidden；只补充语义，不承担字段名称。"],
];

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

function CharacterCountInput({
  label,
  placeholder,
  defaultValue = "",
  maxLength,
}: {
  label: string;
  placeholder?: string;
  defaultValue?: string;
  maxLength: number;
}) {
  return <Input label={label} placeholder={placeholder} defaultValue={defaultValue} maxLength={maxLength} showCount />;
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
        <div>
          <ExampleCard title="构成样式">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Input
                label="材料牌号"
                placeholder="例如：TC4"
                prefix={<MagnifyingGlass size={16} weight="regular" aria-hidden="true" />}
                helperText="输入牌号后匹配材料主数据。"
                required
              />
              <Input label="屈服强度" placeholder="请输入数值" suffix="MPa" helperText="单位固定显示，不写入输入值。" />
            </div>
            <div className="mt-6 border-t border-[var(--neutral-200)] pt-6">
              <DocsTable>
                <thead className="bg-[var(--neutral-50)] text-sm font-semibold text-[var(--text-primary)]">
                  <tr className="border-b border-[var(--neutral-200)]">
                    <th className="px-6 py-3 font-semibold">构成</th>
                    <th className="px-6 py-3 font-semibold">视觉与使用规则</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--neutral-100)] bg-white">
                  {anatomyRows.map(([name, rule]) => (
                    <tr key={name}>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-[var(--text-primary)]">{name}</td>
                      <td className="px-6 py-4 text-sm leading-6 text-[var(--text-secondary)]">{rule}</td>
                    </tr>
                  ))}
                </tbody>
              </DocsTable>
            </div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Numeric Input" title="数值输入" description="加减步进器用于连续数值调整，支持直接输入、步长、边界和单位；少量固定选项应改用 Select。" />
        <div className="space-y-5">
          <ExampleCard title="步进器与使用边界">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <InputNumber label="试验次数" defaultValue={3} min={1} max={10} step={1} helperText="整数步长 1，允许范围 1–10。" />
              <InputNumber label="温度增量" defaultValue={0.5} min={0} max={10} step={0.5} suffix="°C" helperText="小数步长 0.5，单位不写入数值。" />
              <InputNumber label="材料数量" defaultValue={100} min={0} step={100} suffix="kg" helperText="到达最小值时禁用减号，避免产生越界值。" />
              <InputNumber label="系统计算值" value={1200} suffix="MPa" disabled helperText="禁用状态不可输入，也不可通过按钮调整。" />
            </div>
            <div className="mt-5 border-t border-[var(--neutral-200)] pt-4 text-xs leading-5 text-[var(--text-tertiary)]">按钮使用 16px / Regular 的 Minus 与 Plus；减号、居中数值、无底色单位和加号紧凑排列，共享同一焦点边界。</div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Structures"
          title="使用边界"
          description="日常项目长表单默认使用左右结构；上下结构保留给窄容器、移动端、弹窗和少量独立字段。结构变化不改变字段状态语义。"
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-5 shadow-[var(--shadow-xs)]">
            <div className="mb-5 flex items-center justify-between"><div><div className="text-xs font-medium text-[var(--text-tertiary)]">01 · BASIC</div><h3 className="mt-1 text-base font-semibold text-[var(--text-primary)]">基础输入</h3></div><span className="h-8 w-1 bg-[var(--neutral-900)]" /></div>
            <Input label="样品编号" placeholder="例如：MAT-2026-001" />
            <p className="mt-3 text-xs leading-5 text-[var(--text-tertiary)]">无附加元素，适合名称、编号和单值文本。</p>
          </div>
          <div className="rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-[var(--neutral-50)] p-5">
            <div className="mb-5 flex items-center justify-between"><div><div className="text-xs font-medium text-[var(--text-tertiary)]">02 · TEXT AFFIX</div><h3 className="mt-1 text-base font-semibold text-[var(--text-primary)]">文字前后缀</h3></div><span className="h-8 w-1 bg-[var(--product-blue-500)]" /></div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2"><Input label="采购金额" placeholder="0.00" prefix="¥" /><Input label="抗拉强度" placeholder="请输入数值" suffix="MPa" /></div>
            <p className="mt-3 text-xs leading-5 text-[var(--text-tertiary)]">单位和币种只补充格式，不写入用户输入值。</p>
          </div>
          <div className="rounded-[var(--radius-sm)] border border-[var(--product-blue-100)] bg-[var(--product-blue-50)]/40 p-5">
            <div className="mb-5 flex items-center justify-between"><div><div className="text-xs font-medium text-[var(--product-blue-600)]">03 · SEARCH</div><h3 className="mt-1 text-base font-semibold text-[var(--text-primary)]">搜索前缀</h3></div><MagnifyingGlass size={20} weight="regular" className="text-[var(--product-blue-500)]" aria-hidden="true" /></div>
            <Input label="搜索材料" placeholder="请输入材料名称" prefix={<MagnifyingGlass size={16} weight="regular" aria-hidden="true" />} />
            <p className="mt-3 text-xs leading-5 text-[var(--text-tertiary)]">搜索图标只强化检索语义。多条件筛选保留可见标签；只有语义明确的单一全局搜索可以省略标签，并提供 aria-label。</p>
          </div>
          <div className="rounded-[var(--radius-sm)] border border-[var(--success-border)] bg-[var(--success-bg)]/30 p-5">
            <div className="mb-5 flex items-center justify-between"><div><div className="text-xs font-medium text-[var(--success-text)]">04 · STATUS</div><h3 className="mt-1 text-base font-semibold text-[var(--text-primary)]">状态后缀</h3></div><CheckCircle size={20} weight="regular" className="text-[var(--success-text)]" aria-hidden="true" /></div>
            <Input label="材料编码" defaultValue="MAT-2026-001" suffix={<CheckCircle size={16} weight="regular" aria-hidden="true" />} helperText="状态图标不能独立传达结果，仍需文字解释校验结论。" readOnly />
          </div>
          <div className="rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-5 shadow-[var(--shadow-xs)] md:col-span-2">
            <div className="mb-5 flex items-center justify-between"><div><div className="text-xs font-medium text-[var(--text-tertiary)]">05 · SELECTABLE AFFIX</div><h3 className="mt-1 text-base font-semibold text-[var(--text-primary)]">可交互前后缀</h3></div><span className="h-8 w-1 bg-[var(--brand-600)]" /></div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Input label="手机号码" inputMode="tel" placeholder="请输入手机号" prefixAddon={<InputAffixSelect aria-label="国家或地区区号" defaultValue="+86" options={[{ label: "+86", value: "+86" }, { label: "+852", value: "+852" }, { label: "+853", value: "+853" }]} />} helperText="区号参与完整号码语义，但与号码主体分别选择和输入。" />
              <Input label="采购数量" inputMode="decimal" placeholder="请输入数量" suffixAddon={<InputAffixSelect aria-label="数量级单位" defaultValue="万" options={[{ label: "百", value: "百" }, { label: "万", value: "万" }, { label: "百万", value: "百万" }]} />} helperText="可切换单位必须作为独立值提交，不能只保留视觉文本。" />
            </div>
            <p className="mt-4 border-t border-[var(--neutral-200)] pt-4 text-xs leading-5 text-[var(--text-tertiary)]">仅在前后缀会改变输入值解释时使用选择控件；固定币种、固定单位和状态图标继续使用普通 prefix / suffix。</p>
          </div>
        </div>
        <div className="mt-8 rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-5 md:p-6">
          <SubsectionHeading eyebrow="Label Layout" title="标签结构" description="按容器角色选择上下或左右标签；同一字段组保持一致。" />
          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
            <ExampleCard title="上下标签 - 局部例外"><div className="max-w-[360px] space-y-4"><Input label="材料名称" placeholder="请输入材料名称" helperText="适合弹窗、窄卡片、移动端或需要强调的独立字段。" /><Textarea label="补充说明" placeholder="补充材料来源或用途" /></div></ExampleCard>
            <ExampleCard title="左右标签 - 项目默认"><div className="max-w-[640px] space-y-4"><Input labelPosition="left" labelWidth={88} label="名称" placeholder="请输入材料名称" required /><Input labelPosition="left" labelWidth={88} label="材料数据来源" placeholder="实验采集 / 企业上传" helperText="不同长度标签使用同一宽度并右对齐；移动端自动回到上下结构。" /></div></ExampleCard>
          </div>
          <div className="mt-6 border-t border-[var(--neutral-200)] pt-5">
            <h4 className="mb-3 text-sm font-semibold text-[var(--text-primary)]">标签结构使用规则</h4>
            <SpecList items={["同一项目可以存在两种结构，但应由容器类型决定：主编辑区用左右结构，弹窗和移动端用上下结构。", "同一页面的主表单、筛选栏、侧边抽屉可采用不同结构；同一 FormSection 内的同级字段不得交替混用。", "标签默认宽 88px、右对齐、与控件间隔 8px；长业务标签可统一扩展到 96–120px。上下标签的必填 * 放在文字后，左右标签的 * 放在文字前。"]} />
          </div>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Sizes" title="单行输入尺寸" description="尺寸控制容器高度和水平内边距，输入文字统一为 14px。移动端三档均提升到至少 44px 触控高度。" />
        <ExampleCard title="Small / Medium / Large">
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
        <div className="mt-5 border-l-2 border-[var(--success-solid)] bg-white p-5 shadow-[var(--shadow-xs)]">
          <h3 className="text-base font-semibold text-[var(--text-primary)]">字段宽度规则</h3>
          <div className="mt-4 grid grid-cols-1 gap-4 text-sm leading-6 text-[var(--text-secondary)] md:grid-cols-3">
            <div className="bg-[var(--neutral-50)] p-4"><strong className="block text-[var(--text-primary)]">常规输入 · 360px</strong>名称、编号、单值参数的推荐宽度。</div>
            <div className="bg-[var(--neutral-50)] p-4"><strong className="block text-[var(--text-primary)]">长字段 · 最大 480px</strong>超出后应拆分栅格，不继续拉长控件。</div>
            <div className="bg-[var(--neutral-50)] p-4"><strong className="block text-[var(--text-primary)]">紧凑筛选 · 160–240px</strong>多条件筛选优先每行 3 个并保留标签。</div>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="States" title="输入状态" description="状态不能只依赖边框颜色；错误、只读和禁用必须同时有文字或上下文说明。同时展示各状态的完整 Token 映射和视觉示例。" />
        <div className="space-y-5">
          <ExampleCard title="常见状态示例">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input labelPosition="left" labelWidth={64} label="默认" placeholder="请输入内容" />
              <Input labelPosition="left" labelWidth={64} label="必填" placeholder="请输入内容" required />
              <Input labelPosition="left" labelWidth={64} label="错误" defaultValue="ABC" error="编号格式应为 MAT-年份-序号" />
              <Input labelPosition="left" labelWidth={64} label="只读" value="系统计算结果" readOnly helperText="可以查看和复制。" />
              <Input labelPosition="left" labelWidth={64} label="禁用" value="等待上一步完成" disabled helperText="当前流程节点不可操作。" />
            </div>
            <div className="mt-6 border-t border-[var(--neutral-200)] pt-5">
              <p className="mb-4 text-xs font-semibold text-[var(--text-tertiary)]">扩展状态：Focus 聚焦态与 Loading 加载中</p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Input labelPosition="left" labelWidth={88} label="材料牌号" autoFocus placeholder="点击或 Tab 聚焦" />
                  <p className="mt-1.5 text-xs text-[var(--text-tertiary)] md:ml-24">neutral-900 边框 + neutral-900 焦点环，键盘和鼠标聚焦一致。</p>
                </div>
                <div>
                  <Input labelPosition="left" labelWidth={88} label="数据校验中" value="正在校验…" readOnly suffix={<SpinnerGap size={16} weight="regular" className="animate-spin" aria-hidden="true" />} />
                  <p className="mt-1.5 text-xs text-[var(--text-tertiary)] md:ml-24">保留已有内容；无结果时显示当前任务，而不是笼统提示“不可点击”。</p>
                </div>
              </div>
            </div>
          </ExampleCard>
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
        <div className="mt-5">
          <ExampleCard title="Small / Medium / Large">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div><Textarea size="sm" label="Small · 80px" placeholder="简短备注" /><p className="mt-2 text-xs leading-5 text-[var(--text-tertiary)]">1–3 行简短补充。</p></div>
              <div><Textarea size="md" label="Medium · 96px" placeholder="默认说明输入" /><p className="mt-2 text-xs leading-5 text-[var(--text-tertiary)]">常规说明与审核意见。</p></div>
              <div><Textarea size="lg" label="Large · 120px" placeholder="长说明或治理记录" /><p className="mt-2 text-xs leading-5 text-[var(--text-tertiary)]">长说明、异常原因和治理记录。</p></div>
            </div>
          </ExampleCard>
        </div>
        <div className="mt-5 rounded-[var(--radius-sm)] border border-[var(--warning-border)] bg-[var(--warning-bg)] p-4 text-sm leading-6 text-[var(--text-secondary)]">
          <strong className="text-[var(--text-primary)]">边界提醒：</strong>
          文本域不承载富文本排版、代码校验、语法高亮、公式编辑或结构化 JSON 配置——这些是专用编辑器的职责。
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Clearable & Character Count"
          title="可清除与字符计数"
          description="当输入框内容较长或需要快速清空时，提供清除按钮；当有字符限制时，显示实时计数帮助用户预判。"
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="可清除输入">
            <div className="space-y-4">
              <ClearableInput label="搜索关键词" placeholder="输入内容后右侧出现清除按钮" />
              <ClearableInput label="材料批号" defaultValue="MAT-2026-0618-TC4" />
            </div>
            <p className="mt-4 text-xs leading-5 text-[var(--text-tertiary)]">输入内容后右侧出现 × 图标，点击清空并恢复焦点。</p>
          </ExampleCard>
          <ExampleCard title="字符计数">
            <div className="space-y-4">
              <CharacterCountInput label="材料描述" placeholder="简要描述材料特征" maxLength={50} />
              <CharacterCountInput label="备注说明" defaultValue="该批号样品已通过进场复验" maxLength={30} />
            </div>
            <p className="mt-4 text-xs leading-5 text-[var(--text-tertiary)]">字符计数位于控件内部右侧，和输入限制保持视觉归属；帮助或错误文字仍放在控件下方。</p>
          </ExampleCard>
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
