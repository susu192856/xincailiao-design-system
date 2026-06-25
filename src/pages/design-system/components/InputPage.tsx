import { MagnifyingGlass } from "@phosphor-icons/react";
import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import { Input } from "../../../components/ui/Input";

export default function InputPage() {
  return (
    <div className="space-y-16">
      <PageHeader title="输入框" description="输入框用于采集短文本、关键参数和筛选条件，适用于表单、搜索、参数面板等高频后台场景。" />

      <section>
        <SectionHeading eyebrow="Variants" title="输入框类型" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <ExampleCard title="基础输入">
            <div className="space-y-4">
              <Input label="材料名称" placeholder="请输入材料名称" helperText="用于材料数据检索和资产命名。" required />
              <Input label="搜索" placeholder="搜索数据资产" prefix={<MagnifyingGlass className="h-4 w-4" />} />
            </div>
          </ExampleCard>
          <ExampleCard title="状态输入">
            <div className="space-y-4">
              <Input label="样品编号" placeholder="MAT-2026-001" />
              <Input label="错误状态" placeholder="请输入编号" error="编号不能为空" />
              <Input label="禁用状态" value="系统自动生成" disabled readOnly />
            </div>
          </ExampleCard>
          <ExampleCard title="后台参数">
            <div className="space-y-4">
              <Input label="屈服强度" defaultValue="620" suffix="MPa" />
              <Input label="置信度" defaultValue="92" suffix="%" readOnly helperText="AI 推演结果只读展示。" />
              <Input label="权限锁定" value="组织管理员可编辑" readOnly />
            </div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Sizes" title="输入框尺寸" />
        <ExampleCard title="Small / Medium / Large">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <Input size="sm" label="Small - 28px" placeholder="紧凑表格筛选" />
              <p className="mt-2 text-xs leading-5 text-[var(--text-tertiary)]">字号 14px，适用于表格工具栏、行内编辑、紧凑筛选。</p>
            </div>
            <div>
              <Input size="md" label="Medium - 32px" placeholder="默认表单输入" />
              <p className="mt-2 text-xs leading-5 text-[var(--text-tertiary)]">字号 14px，后台表单默认尺寸。</p>
            </div>
            <div>
              <Input size="lg" label="Large - 36px" placeholder="重点参数输入" />
              <p className="mt-2 text-xs leading-5 text-[var(--text-tertiary)]">字号 14px，用于官网线索、弹窗重点字段和低密度表单。</p>
            </div>
          </div>
        </ExampleCard>
      </section>

      <section>
        <SectionHeading
          eyebrow="Label Rules"
          title="名称与输入框关系"
          description="输入框有名称时必须先说明字段语义；无名称输入只用于搜索、筛选工具栏或上下文已明确的短任务。"
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="上下结构 - 默认推荐">
            <div className="max-w-[360px] space-y-4">
              <Input label="材料名称" placeholder="请输入材料名称" helperText="适合弹窗、窄表单、移动端和官网线索收集。" />
              <Input label="样品编号" placeholder="MAT-2026-001" />
            </div>
          </ExampleCard>
          <ExampleCard title="左右结构 - 宽页面配置">
            <div className="max-w-[640px] space-y-4">
              <Input labelPosition="left" labelWidth={112} label="材料名称" placeholder="请输入材料名称" />
              <Input labelPosition="left" labelWidth={112} label="数据来源" placeholder="实验采集 / 企业上传" helperText="适合 1000px 以上宽表单，减少纵向滚动。" />
              <Input labelPosition="left" labelWidth={112} label="屈服强度" defaultValue="620" suffix="MPa" />
            </div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Readonly / Disabled"
          title="只读与禁用"
          description="只读表示用户可以查看和复制，但不能修改；禁用表示当前条件下不可操作，通常也不参与当前提交。"
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="只读：可查看不可改">
            <div className="space-y-4">
              <Input label="AI 推荐牌号" value="TC4" readOnly helperText="系统计算结果、审批锁定字段、权限受限字段优先使用只读。" />
              <Input label="数据哈希" value="0x9A7F-2026" readOnly />
            </div>
          </ExampleCard>
          <ExampleCard title="禁用：当前不可操作">
            <div className="space-y-4">
              <Input label="归档编号" value="系统归档后不可编辑" disabled />
              <Input label="外部同步字段" value="等待接口返回" disabled helperText="禁用状态需要在说明或页面状态中解释原因。" />
            </div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Backend States" title="后台常见状态" description="后台页面里的输入框经常出现在筛选区、表格行内编辑、参数面板和权限配置中，状态必须比官网表单更明确。" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="筛选区">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <Input size="sm" aria-label="材料名称" placeholder="材料名称" prefix={<MagnifyingGlass className="h-4 w-4" />} />
              <Input size="sm" aria-label="批次编号" placeholder="批次编号" />
              <Input size="sm" aria-label="负责人" placeholder="负责人" />
            </div>
            <p className="mt-4 text-xs leading-5 text-[var(--text-tertiary)]">
              筛选区优先使用 28px 或 32px 高度，保证表格上方工具栏紧凑。
            </p>
          </ExampleCard>
          <ExampleCard title="行内编辑与校验">
            <div className="space-y-3">
              <Input size="sm" label="标准牌号" defaultValue="TC4" />
              <Input size="sm" label="数值范围" defaultValue="980" suffix="MPa" error="超出标准范围 860-930 MPa" />
              <Input size="sm" label="审核后字段" value="已锁定" readOnly helperText="审核通过后进入只读状态。" />
            </div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Do / Don't" title="正确与错误示例" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="正确：字段含义与反馈完整">
            <Input
              label="试验温度"
              placeholder="例如：25"
              suffix="℃"
              helperText="填写试验时的环境温度。"
              required
            />
          </ExampleCard>
          <ExampleCard title="错误：只依赖占位符和颜色">
            <div>
              <Input
                aria-label="错误示例：材料编号"
                placeholder="材料编号"
                className="border-[var(--error-text)]"
              />
              <p className="mt-3 text-xs leading-5 text-[var(--text-tertiary)]">
                缺少可见字段名和错误原因；占位符在输入后消失，红色边框也无法说明如何修正。
              </p>
            </div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Guidelines" title="最佳实践" />
        <SpecList
          items={[
            "默认使用 Medium 尺寸，表格筛选和工具栏可使用 Small。",
            "Small / Medium / Large 高度分别为 28px / 32px / 36px，输入文字统一 14px、常规字重。",
            "带名称字段默认上下结构；宽表单、数据配置和审批配置可使用左右结构，label 推荐 96px–120px 宽。",
            "无名称输入仅用于搜索、表格筛选和上下文明确的短任务，不用于正式录入表单。",
            "错误状态必须显示明确原因，不只依赖红色边框。",
            "参数输入需要明确单位，单位使用后缀弱化展示，不参与输入内容。",
            "只读用于权限、审核和系统计算结果；禁用用于当前不可操作。",
            "搜索输入建议使用前置图标，帮助用户快速识别用途。",
            "后台高频表单应保持左对齐，避免过长输入宽度影响阅读。",
          ]}
        />
      </section>
    </div>
  );
}
