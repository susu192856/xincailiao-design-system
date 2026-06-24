import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import DocsTable from "../../../components/docs/DocsTable";
import { Radio } from "../../../components/ui/Radio";
import { Tag } from "../../../components/ui/Tag";

export default function RadioPage() {
  return (
    <div className="space-y-16">
      <PageHeader title="单选框" description="单选框用于从互斥选项中选择一个结果，适合业务类型、发布方式、权限范围和处理策略。" />

      <section>
        <SectionHeading eyebrow="Variants" title="基础状态" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <ExampleCard title="业务类型选择" description="同一组使用相同 name，确保只有一个选项被选中。">
            <div className="flex flex-col gap-4">
              <Radio name="business-type" label="数据空间" description="规则、权限、合约与可信流通。" defaultChecked />
              <Radio name="business-type" label="材库" description="材料数据资产生产与治理。" />
              <Radio name="business-type" label="AI 应用" description="预测、推荐与决策结果。" />
              <Radio name="business-type" label="系统配置" description="当前角色不可选择。" disabled />
            </div>
          </ExampleCard>
          <ExampleCard title="权限范围选择" description="禁用选项需要保留可见性，让用户理解当前权限边界。">
            <div className="flex flex-col gap-4">
              <Radio name="scope" label="仅当前团队可见" />
              <Radio name="scope" label="数据空间内可见" defaultChecked helperText="推荐用于已完成审核的数据资产。" />
              <Radio name="scope" label="公开共享" description="审批完成前不可选择。" disabled />
            </div>
          </ExampleCard>
          <ExampleCard title="校验状态" description="策略类单选项需要在错误态中解释选择约束。">
            <div className="flex flex-col gap-4">
              <Radio name="validation-demo" label="立即覆盖" error="当前数据存在已发布版本，不允许直接覆盖。" />
              <Radio name="validation-demo" label="新建版本" defaultChecked />
              <Radio name="validation-demo" label="跳过冲突项" />
            </div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Backend States"
          title="后台典型场景"
          description="单选框适合互斥决策，例如处理策略、发布方式、模型结果采用方式。用户需要在选项文案中直接看到后果。"
        />
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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
          <div className="bg-white p-5"><Radio name="state-demo" label="默认" /></div>
          <div className="bg-white p-5"><Radio name="state-demo-checked" label="选中" defaultChecked /></div>
          <div className="bg-white p-5"><Radio name="state-demo-error" label="错误" error="请选择处理策略。" /></div>
          <div className="bg-white p-5"><Radio name="state-demo-disabled" label="禁用" disabled /></div>
          <div className="bg-white p-5"><Radio name="state-demo-disabled-checked" label="禁用选中" disabled defaultChecked /></div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Tag variant="neutral" size="sm">互斥选择</Tag>
          <Tag variant="product" size="sm">后台表单</Tag>
          <Tag variant="warning" size="sm">高风险策略需说明后果</Tag>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Figma States" title="Figma 状态拆分" />
        <DocsTable>
          <thead className="bg-[var(--neutral-50)] text-sm font-semibold text-[var(--neutral-900)]">
            <tr className="border-b border-[var(--neutral-200)]">
              <th className="px-6 py-3 font-semibold">状态</th>
              <th className="px-6 py-3 font-semibold">视觉</th>
              <th className="px-6 py-3 font-semibold">使用场景</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--neutral-200)] bg-white">
            <tr><td className="px-6 py-4 font-mono text-xs">unchecked</td><td className="px-6 py-4">白底、中性灰描边</td><td className="px-6 py-4">默认未选择</td></tr>
            <tr><td className="px-6 py-4 font-mono text-xs">checked</td><td className="px-6 py-4">neutral-900 加粗圆环</td><td className="px-6 py-4">当前唯一选项</td></tr>
            <tr><td className="px-6 py-4 font-mono text-xs">error</td><td className="px-6 py-4">错误描边与错误文案</td><td className="px-6 py-4">必选策略未满足</td></tr>
            <tr><td className="px-6 py-4 font-mono text-xs">disabled</td><td className="px-6 py-4">透明度降低，文案保留</td><td className="px-6 py-4">权限不足或流程未到达</td></tr>
          </tbody>
        </DocsTable>
      </section>

      <section>
        <SectionHeading eyebrow="Guidelines" title="最佳实践" />
        <SpecList
          items={[
            "单选框只用于互斥关系，不用于多项配置或批量选择。",
            "后台策略类选项应写清楚后果，例如覆盖、新建版本、跳过冲突项。",
            "禁用选项保留可见性，并通过说明解释无权限或条件未满足。",
            "选项超过 5 个时优先考虑 Select，避免页面被选项占满。",
            "错误态用于必选策略未满足或当前组合不合法，必须配合文案说明。",
            "Figma 组件需包含 unchecked、checked、error、disabled、disabled checked、helper text 等状态。",
          ]}
        />
      </section>
    </div>
  );
}
