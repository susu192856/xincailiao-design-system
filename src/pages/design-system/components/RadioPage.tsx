import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionCard, SectionHeading } from "../../../components/docs/ComponentDoc";
import { Radio } from "../../../components/ui/Radio";

export default function RadioPage() {
  return (
    <div className="space-y-16">
      <PageHeader
        title="单选框"
        description="用于从互斥选项中选择一个结果，适合业务类型、发布方式、权限范围和处理策略。"
      />

      <section>
        <SectionHeading eyebrow="Sizes" title="尺寸" />
        <SectionCard className="inline-flex flex-wrap items-end gap-8">
          <div className="flex flex-col items-center gap-3">
            <Radio name="size-demo-sm" label="Small · 14px" size="sm" defaultChecked />
            <span className="text-xs text-[var(--text-tertiary)]">表格 / 紧凑区</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Radio name="size-demo-md" label="Medium · 16px" size="md" defaultChecked />
            <span className="text-xs text-[var(--text-tertiary)]">表单默认</span>
          </div>
        </SectionCard>
      </section>

      <section>
        <SectionHeading eyebrow="States" title="状态" />
        <SectionCard className="inline-flex flex-wrap gap-6">
          <div className="pointer-events-none"><Radio name="s" label="未选" /></div>
          <div className="pointer-events-none"><Radio name="s" label="选中" defaultChecked /></div>
          <div className="pointer-events-none"><Radio name="s" label="错误" error="请选择处理策略" /></div>
          <div className="pointer-events-none"><Radio name="s" label="禁用" disabled /></div>
          <div className="pointer-events-none"><Radio name="s" label="禁用选中" defaultChecked disabled /></div>
        </SectionCard>
      </section>

      <section>
        <SectionHeading eyebrow="Scenarios" title="使用场景" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <ExampleCard title="业务类型">
            <div className="flex flex-col gap-3">
              <Radio name="biz-type" label="数据空间" description="规则、权限、合约与可信流通。" defaultChecked />
              <Radio name="biz-type" label="材库" description="材料数据资产生产与治理。" />
              <Radio name="biz-type" label="AI 应用" description="预测、推荐与决策结果。" />
              <Radio name="biz-type" label="系统配置" disabled />
            </div>
          </ExampleCard>
          <ExampleCard title="权限范围">
            <div className="flex flex-col gap-3">
              <Radio name="scope" label="仅当前团队可见" />
              <Radio name="scope" label="数据空间内可见" defaultChecked helperText="推荐用于已完成审核的数据资产。" />
              <Radio name="scope" label="公开共享" description="审批完成前不可选择。" disabled />
            </div>
          </ExampleCard>
          <ExampleCard title="处理策略">
            <div className="space-y-3">
              <Radio name="policy" label="覆盖原数据" description="仅适用于未发布数据。" />
              <Radio name="policy" label="新建版本" description="保留旧版本并建立版本链。" defaultChecked />
              <Radio name="policy" label="跳过冲突项" />
            </div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Do / Don't" title="正确与错误" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="正确：选项写明后果">
            <Radio name="do" label="新建版本" description="保留旧版本并建立版本链，不影响已发布数据。" defaultChecked />
          </ExampleCard>
          <ExampleCard title="错误：选项过多仍用 Radio">
            <div className="space-y-1.5"><Radio name="bad" label="选项 1" /><Radio name="bad" label="选项 2" /><Radio name="bad" label="选项 3" /><Radio name="bad" label="选项 4" /><Radio name="bad" label="选项 5" /><Radio name="bad" label="选项 6" /></div>
          </ExampleCard>
          <ExampleCard title="正确：可选不可选都可见">
            <div className="flex flex-col gap-3"><Radio name="ok" label="团队可见" /><Radio name="ok" label="公开共享" disabled helperText="审批通过后可选择。" /></div>
          </ExampleCard>
          <ExampleCard title="错误：隐藏可选但不可用的选项">
            <p className="text-sm text-[var(--text-tertiary)]">用户只知道有 2 个选项，不知道还有第 3 种可能。</p>
          </ExampleCard>
        </div>
      </section>
    </div>
  );
}
