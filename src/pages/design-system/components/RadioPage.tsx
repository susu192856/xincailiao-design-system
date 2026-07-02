import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import DocsTable from "../../../components/docs/DocsTable";
import { Radio } from "../../../components/ui/Radio";
import { Tag } from "../../../components/ui/Tag";

const anatomyRows = [
  ["控件区", "16px（sm=14px）圆形，未选 neutral-300 边框，选中后 neutral-900 边框加粗为选中环。"],
  ["标签文字", "14px / Regular / text-body；说明选项含义，点击可切换。"],
  ["描述文字", "12px / Regular / text-tertiary；补充选项影响范围，尤其后台策略类选项需写明后果。"],
  ["错误信息", "12px / Regular / error-text；必选未选或当前组合不合法时出现。"],
];

const stateRows = [
  ["未选", "neutral-300 边框 + 白色背景", "初始态，可点击。"],
  ["选中", "neutral-900 加粗边框", "用户选择被确认。"],
  ["错误", "error-text 边框 + error-text 错误说明", "未选或组合不合法，必须配合文案。"],
  ["禁用未选", "opacity=0.48 + neutral-300 边框", "条件不满足，保留可见。"],
  ["禁用选中", "opacity=0.48 + neutral-900 边框", "已被强制选中但不可更改。"],
];

const radioProps = [
  ["label", "string", "—", "选项名称，必须提供；点击标签可切换。"],
  ["description", "string", "—", "补充选项影响或前提条件。"],
  ["helperText", "string", "—", "辅助说明。"],
  ["error", "string", "—", "错误说明，驱动 error 边框和 aria-invalid。"],
  ["size", "sm | md", "md", "sm=14px（表格/紧凑区），md=16px（表单默认）。"],
  ["name", "string", "—", "同一组互斥选项必须共享相同 name。"],
  ["disabled", "boolean", "false", "禁用不可操作，保留可见性。"],
];

export default function RadioPage() {
  return (
    <div className="space-y-16">
      <PageHeader
        title="单选框"
        description="单选框用于从互斥选项中选择一个结果，适合业务类型、发布方式、权限范围和处理策略。"
        note={<>关联页面：多项选择使用 <Link to="/components/checkbox" className="font-medium text-[var(--product-blue-500)]">复选框</Link>；选项超过 5 个时优先使用 <Link to="/components/select" className="font-medium text-[var(--product-blue-500)]">选择器</Link>。</>}
      />

      <section>
        <SectionHeading eyebrow="Anatomy" title="单选框结构" description="控件区与复选框尺寸一致，区别在于圆形外框和加粗选中环。" />
        <div>
          <ExampleCard title="构成样式">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Radio name="anatomy-demo" label="数据空间" description="规则、权限、合约与可信流通。" defaultChecked />
              <Radio name="anatomy-demo" label="材库" description="材料数据资产生产与治理。" />
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
        <SectionHeading eyebrow="Variants" title="基础状态" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <ExampleCard title="业务类型选择" description="同一组使用相同 name，确保互斥。">
            <div className="flex flex-col gap-4">
              <Radio name="business-type" label="数据空间" description="规则、权限、合约与可信流通。" defaultChecked />
              <Radio name="business-type" label="材库" description="材料数据资产生产与治理。" />
              <Radio name="business-type" label="AI 应用" description="预测、推荐与决策结果。" />
              <Radio name="business-type" label="系统配置" description="当前角色不可选择。" disabled />
            </div>
          </ExampleCard>
          <ExampleCard title="权限范围选择" description="禁用选项需保留可见性，让用户理解当前边界。">
            <div className="flex flex-col gap-4">
              <Radio name="scope" label="仅当前团队可见" />
              <Radio name="scope" label="数据空间内可见" defaultChecked helperText="推荐用于已完成审核的数据资产。" />
              <Radio name="scope" label="公开共享" description="审批完成前不可选择。" disabled />
            </div>
          </ExampleCard>
          <ExampleCard title="校验状态" description="策略类单选项需在错误态中解释约束。">
            <div className="flex flex-col gap-4">
              <Radio name="validation-demo" label="立即覆盖" error="当前数据存在已发布版本，不允许直接覆盖。" />
              <Radio name="validation-demo" label="新建版本" defaultChecked />
              <Radio name="validation-demo" label="跳过冲突项" />
            </div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Backend States" title="后台典型场景" description="单选框适合互斥决策，例如处理策略、发布方式、模型结果采用方式。" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <ExampleCard title="数据处理策略">
            <div className="space-y-3">
              <Radio name="process-policy" label="覆盖原数据" description="仅适用于未发布数据。" />
              <Radio name="process-policy" label="新建版本" description="保留旧版本并建立版本链。" defaultChecked />
              <Radio name="process-policy" label="跳过冲突项" />
            </div>
          </ExampleCard>
          <ExampleCard title="发布方式">
            <div className="space-y-3">
              <Radio name="publish-policy" label="立即发布" description="发布后进入可流通状态。" />
              <Radio name="publish-policy" label="定时发布" defaultChecked />
              <Radio name="publish-policy" label="仅保存草稿" />
            </div>
          </ExampleCard>
          <ExampleCard title="模型结果采用">
            <div className="space-y-3">
              <Radio name="model-policy" label="采用推荐方案" description="会写入决策结果记录。" defaultChecked />
              <Radio name="model-policy" label="人工确认后采用" />
              <Radio name="model-policy" label="仅作参考" />
            </div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="States" title="状态说明" />
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
      </section>

      <section>
        <SectionHeading eyebrow="Do / Don't" title="正确与错误示例" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="flex overflow-hidden rounded-[var(--radius-sm)]"><div className="flex min-w-0 flex-1 flex-col"><ExampleCard className="h-full flex-1" title="正确：策略选项写明后果"><Radio name="do-deploy" label="新建版本" description="保留旧版本并建立版本链，不影响已发布数据。" defaultChecked /></ExampleCard><div className="h-0.5 w-full shrink-0 bg-[var(--success-solid)]" /></div></div>
          <div className="flex overflow-hidden rounded-[var(--radius-sm)]"><div className="flex min-w-0 flex-1 flex-col"><ExampleCard className="h-full flex-1" title="错误：选项超过 5 个仍用 Radio"><div className="space-y-1.5"><Radio name="bad-select" label="选项 1" /><Radio name="bad-select" label="选项 2" /><Radio name="bad-select" label="选项 3" /><Radio name="bad-select" label="选项 4" /><Radio name="bad-select" label="选项 5" /><Radio name="bad-select" label="选项 6" /></div><p className="mt-2 text-xs leading-5 text-[var(--text-tertiary)]">选项 ≥5 时应改用 Select，避免页面被选项列表占满。</p></ExampleCard><div className="h-0.5 w-full shrink-0 bg-[var(--error-solid)]" /></div></div>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Guidelines" title="最佳实践" />
        <SpecList
          items={[
            "单选框只用于互斥关系，不用于多项配置或批量选择。",
            "后台策略类选项应写清楚后果，例如覆盖、新建版本、跳过冲突项。",
            "禁用选项保留可见性，并通过说明解释无权限或条件未满足。",
            "选项超过 5 个时优先考虑 Select，避免页面被选项占满。",
            "错误态用于必选未满足或组合不合法，必须配合文案说明。",
            "同一组 Radio 共享 name 实现互斥，不可各自独立。",
          ]}
        />
      </section>

      <section>
        <SectionHeading eyebrow="API" title="属性与实现边界" />
        <DocsTable>
          <thead className="bg-[var(--neutral-50)] text-sm font-semibold text-[var(--text-primary)]">
            <tr className="border-b border-[var(--neutral-200)]">
              <th className="px-6 py-3 font-semibold">属性</th>
              <th className="px-6 py-3 font-semibold">类型</th>
              <th className="px-6 py-3 font-semibold">默认值</th>
              <th className="px-6 py-3 font-semibold">规则</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--neutral-100)] bg-white">
            {radioProps.map(([name, type, defaultValue, rule]) => (
              <tr key={name}>
                <td className="px-6 py-4 text-sm text-[var(--text-primary)]">{name}</td>
                <td className="px-6 py-4 text-sm text-[var(--text-secondary)]">{type}</td>
                <td className="px-6 py-4 text-sm text-[var(--text-secondary)]">{defaultValue}</td>
                <td className="px-6 py-4 text-sm leading-6 text-[var(--text-secondary)]">{rule}</td>
              </tr>
            ))}
          </tbody>
        </DocsTable>
      </section>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Link to="/components/checkbox" className="group flex items-center gap-3 rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-5 transition-all hover:border-[var(--neutral-300)] hover:bg-[var(--neutral-50)]">
          <ArrowLeft size={18} weight="regular" className="text-[var(--text-tertiary)]" />
          <div><div className="text-xs text-[var(--text-tertiary)]">上一步</div><h3 className="mt-1 text-sm font-semibold text-[var(--text-primary)]">复选框</h3></div>
        </Link>
        <Link to="/components/select" className="group flex items-center justify-between gap-3 rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-5 transition-all hover:border-[var(--neutral-300)] hover:bg-[var(--neutral-50)]">
          <div><div className="text-xs text-[var(--text-tertiary)]">下一步</div><h3 className="mt-1 text-sm font-semibold text-[var(--text-primary)]">选择器</h3></div>
          <ArrowRight size={18} weight="regular" className="text-[var(--text-tertiary)]" />
        </Link>
      </div>
    </div>
  );
}
