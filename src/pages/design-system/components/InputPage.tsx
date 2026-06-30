import { CheckCircle, MagnifyingGlass } from "@phosphor-icons/react";
import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import DocsTable from "../../../components/docs/DocsTable";
import { Input } from "../../../components/ui/Input";
import { Textarea } from "../../../components/ui/Textarea";

const anatomyRows = [
  ["字段容器", "组织标签、控件和辅助信息；正式录入字段必须保持完整结构。"],
  ["标签文字", "14px / Medium / text-primary；说明字段是什么，不由 placeholder 替代。"],
  ["输入文字", "14px / Regular / text-primary；单行输入垂直居中，多行输入顶部对齐。"],
  ["占位文字", "14px / Regular / neutral-400；只提供格式或示例，输入后消失。"],
  ["辅助或错误文字", "12px / Regular；默认 text-tertiary，错误使用 error-text 并说明修正方式。"],
  ["前缀 / 后缀", "可使用 16px 图标、单位或短标签；只补充语义，不承担字段名称。"],
];

const stateRows = [
  ["Default", "field-border-default", "可输入，白色背景。"],
  ["Hover", "field-border-hover", "仅桌面指针悬停时增强边框。"],
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

export default function InputPage() {
  return (
    <div className="space-y-16">
      <PageHeader
        title="输入框"
        description="输入框家族用于采集文本、参数和筛选条件，包括单行 Input 与多行 Textarea。先按内容长度选择结构，再统一应用标签、提示、状态和可访问性规则。"
      />

      <section>
        <SectionHeading
          eyebrow="Selection"
          title="选择单行输入或文本域"
          description="文本域是输入框家族的一种，只在内容需要换行和上下文时使用；富文本、代码补全和结构化配置仍交给专用编辑器。"
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <ExampleCard title="单行 Input">
            <Input label="材料名称" placeholder="例如：TC4 钛合金" helperText="名称、编号、关键词和单值参数使用单行输入。" />
          </ExampleCard>
          <ExampleCard title="多行 Textarea">
            <Textarea label="数据来源说明" placeholder="说明来源机构、采集方式和处理过程" helperText="备注、原因和说明等连续文本使用文本域。" />
          </ExampleCard>
          <ExampleCard title="专用编辑器">
            <div className="space-y-2 text-sm leading-6 text-[var(--text-secondary)]">
              <p className="font-medium text-[var(--text-primary)]">不要使用普通文本域承载：</p>
              <p>富文本排版、代码校验、语法高亮、公式编辑或结构化 JSON 配置。</p>
            </div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Anatomy"
          title="输入框构成与基础视觉"
          description="文字、颜色、边框和状态均使用基础规范 Token；页面示例不得用局部硬编码覆盖组件合同。"
        />
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <ExampleCard title="完整字段结构">
            <div className="space-y-5">
              <Input
                label="材料牌号"
                placeholder="例如：TC4"
                prefix={<MagnifyingGlass size={16} weight="regular" aria-hidden="true" />}
                suffix={<CheckCircle size={16} weight="regular" aria-hidden="true" />}
                helperText="输入牌号后匹配材料主数据。"
                required
              />
              <Input label="屈服强度" placeholder="请输入数值" suffix="MPa" helperText="单位固定显示，不写入输入值。" />
            </div>
          </ExampleCard>
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
      </section>

      <section>
        <SectionHeading
          eyebrow="Structures"
          title="不同结构"
          description="结构变化只解决字段关系与语义补充，不改变输入文字、边框和状态规则。"
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          <ExampleCard title="基础结构">
            <Input label="样品编号" placeholder="例如：MAT-2026-001" />
          </ExampleCard>
          <ExampleCard title="前置图标">
            <Input aria-label="搜索材料" placeholder="搜索材料" prefix={<MagnifyingGlass size={16} weight="regular" aria-hidden="true" />} />
            <p className="mt-3 text-xs leading-5 text-[var(--text-tertiary)]">仅用于搜索或上下文明确的工具栏；无可见 label 时必须提供 aria-label。</p>
          </ExampleCard>
          <ExampleCard title="后缀图标">
            <Input label="材料编码" defaultValue="MAT-2026-001" suffix={<CheckCircle size={16} weight="regular" aria-hidden="true" />} helperText="只读状态或校验结果仍需文字说明。" readOnly />
          </ExampleCard>
          <ExampleCard title="文字前缀 / 后缀">
            <div className="space-y-4">
              <Input label="采购金额" placeholder="0.00" prefix="¥" />
              <Input label="抗拉强度" placeholder="请输入数值" suffix="MPa" />
            </div>
          </ExampleCard>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="上下标签 - 默认推荐">
            <div className="max-w-[360px] space-y-4">
              <Input label="材料名称" placeholder="请输入材料名称" helperText="适合弹窗、窄表单、移动端和常规录入。" />
              <Textarea label="补充说明" placeholder="补充材料来源或用途" />
            </div>
          </ExampleCard>
          <ExampleCard title="左右标签 - 宽页面配置">
            <div className="max-w-[640px] space-y-4">
              <Input labelPosition="left" labelWidth={112} label="材料名称" placeholder="请输入材料名称" />
              <Input labelPosition="left" labelWidth={112} label="数据来源" placeholder="实验采集 / 企业上传" helperText="仅用于宽页面；移动端自动回到上下结构。" />
            </div>
          </ExampleCard>
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
      </section>

      <section>
        <SectionHeading eyebrow="States" title="单行输入状态" description="状态不能只依赖边框颜色；错误、只读和禁用必须同时有文字或上下文说明。" />
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1fr]">
          <ExampleCard title="可见状态示例">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input label="默认" placeholder="请输入内容" />
              <Input label="必填" placeholder="请输入内容" required />
              <Input label="错误" defaultValue="ABC" error="编号格式应为 MAT-年份-序号" />
              <Input label="只读" value="系统计算结果" readOnly helperText="可以查看和复制。" />
              <Input label="禁用" value="等待上一步完成" disabled helperText="当前流程节点不可操作。" />
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
                  <td className="px-6 py-4 font-mono text-xs text-[var(--text-secondary)]">{token}</td>
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
              helperText="按“来源—方法—时间”顺序填写。"
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
      </section>

      <section>
        <SectionHeading eyebrow="Backend Scenarios" title="后台典型场景" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="筛选工具栏">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <Input size="sm" aria-label="材料名称" placeholder="材料名称" prefix={<MagnifyingGlass size={16} weight="regular" aria-hidden="true" />} />
              <Input size="sm" aria-label="批次编号" placeholder="批次编号" />
              <Input size="sm" aria-label="负责人" placeholder="负责人" />
            </div>
            <p className="mt-4 text-xs leading-5 text-[var(--text-tertiary)]">上下文明确的筛选项可省略可见标签，但必须提供 aria-label。</p>
          </ExampleCard>
          <ExampleCard title="参数与说明组合">
            <div className="space-y-4">
              <Input label="屈服强度" defaultValue="620" suffix="MPa" />
              <Textarea label="异常说明" placeholder="说明异常原因与处理结果" error="异常关闭前必须填写处理说明" />
            </div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="API" title="属性与实现边界" />
        <div className="space-y-6">
          <div>
            <h3 className="mb-3 text-sm font-semibold text-[var(--text-primary)]">Input</h3>
            <DocsTable>
              <thead className="bg-[var(--neutral-50)] text-sm font-semibold text-[var(--text-primary)]"><tr className="border-b border-[var(--neutral-200)]"><th className="px-6 py-3 font-semibold">属性</th><th className="px-6 py-3 font-semibold">类型</th><th className="px-6 py-3 font-semibold">默认值</th><th className="px-6 py-3 font-semibold">规则</th></tr></thead>
              <tbody className="divide-y divide-[var(--neutral-100)] bg-white">{inputProps.map(([name, type, defaultValue, rule]) => <tr key={name}><td className="px-6 py-4 font-mono text-xs">{name}</td><td className="px-6 py-4 text-sm text-[var(--text-secondary)]">{type}</td><td className="px-6 py-4 text-sm text-[var(--text-secondary)]">{defaultValue}</td><td className="px-6 py-4 text-sm leading-6 text-[var(--text-secondary)]">{rule}</td></tr>)}</tbody>
            </DocsTable>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-[var(--text-primary)]">Textarea</h3>
            <DocsTable>
              <thead className="bg-[var(--neutral-50)] text-sm font-semibold text-[var(--text-primary)]"><tr className="border-b border-[var(--neutral-200)]"><th className="px-6 py-3 font-semibold">属性</th><th className="px-6 py-3 font-semibold">类型</th><th className="px-6 py-3 font-semibold">默认值</th><th className="px-6 py-3 font-semibold">规则</th></tr></thead>
              <tbody className="divide-y divide-[var(--neutral-100)] bg-white">{textareaProps.map(([name, type, defaultValue, rule]) => <tr key={name}><td className="px-6 py-4 font-mono text-xs">{name}</td><td className="px-6 py-4 text-sm text-[var(--text-secondary)]">{type}</td><td className="px-6 py-4 text-sm text-[var(--text-secondary)]">{defaultValue}</td><td className="px-6 py-4 text-sm leading-6 text-[var(--text-secondary)]">{rule}</td></tr>)}</tbody>
            </DocsTable>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Do / Don't" title="正确与错误示例" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="正确：字段语义与反馈完整">
            <Input label="试验温度" placeholder="例如：25" suffix="℃" helperText="填写试验时的环境温度。" required />
          </ExampleCard>
          <ExampleCard title="错误：只依赖占位符和颜色">
            <Input aria-label="错误示例：材料编号" placeholder="材料编号" className="border-[var(--error-text)]" />
            <p className="mt-3 text-xs leading-5 text-[var(--text-tertiary)]">缺少可见字段名和错误原因；输入后占位文字消失，颜色也无法说明如何修正。</p>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Guidelines" title="最佳实践" />
        <SpecList items={[
          "短名称、编号、关键词和单值参数使用 Input；备注、原因和说明使用 Textarea。",
          "正式录入字段必须有可见标签；placeholder 只提供格式或示例。",
          "标签使用 14px Medium，输入与占位文字使用 14px Regular，辅助和错误文字使用 12px Regular。",
          "默认使用 Medium；紧凑筛选使用 Small，低密度重点字段使用 Large。",
          "前后缀图标统一使用 16px；单位和短标签不得写入用户输入值。",
          "错误必须给出原因和修正方式；只读与禁用不能混用。",
          "Textarea 的 Small / Medium / Large 最小高度为 80 / 96 / 120px，长内容允许纵向滚动或缩放。",
          "帮助文字、错误信息和字符计数必须与对应控件保持关联，状态不能只依赖颜色。",
        ]} />
      </section>
    </div>
  );
}
