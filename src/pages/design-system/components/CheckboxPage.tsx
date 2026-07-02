import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading } from "../../../components/docs/ComponentDoc";
import { Checkbox } from "../../../components/ui/Checkbox";

export default function CheckboxPage() {
  return (
    <div className="space-y-16">
      <PageHeader
        title="复选框"
        description="用于多项选择、表格批量操作、字段权限配置和协议确认。支持未选、选中、半选和禁用。"
      />

      <section>
        <SectionHeading eyebrow="Sizes" title="尺寸" />
        <div className="inline-flex flex-wrap items-end gap-8 rounded-[var(--radius-sm)] bg-white p-6">
          <div className="flex flex-col items-center gap-3">
            <Checkbox label="Small · 14px" size="sm" defaultChecked />
            <span className="text-xs text-[var(--text-tertiary)]">表格行内</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Checkbox label="Medium · 16px" size="md" defaultChecked />
            <span className="text-xs text-[var(--text-tertiary)]">表单默认</span>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="States" title="状态" />
        <div className="inline-flex flex-wrap gap-6 rounded-[var(--radius-sm)] bg-white p-6">
          <div className="pointer-events-none"><Checkbox label="未选" /></div>
          <div className="pointer-events-none"><Checkbox label="选中" defaultChecked /></div>
          <div className="pointer-events-none"><Checkbox label="半选" checked={false} indeterminate /></div>
          <div className="pointer-events-none"><Checkbox label="错误" error="请确认数据来源合法" /></div>
          <div className="pointer-events-none"><Checkbox label="禁用" disabled /></div>
          <div className="pointer-events-none"><Checkbox label="禁用选中" defaultChecked disabled /></div>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Scenarios" title="使用场景" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="权限多选">
            <div className="flex flex-col gap-3">
              <Checkbox label="允许查看材料数据" description="可进入详情页查看结构化字段。" defaultChecked />
              <Checkbox label="允许下载报告" description="下载行为会进入审计日志。" />
              <Checkbox label="允许编辑字段" />
              <Checkbox label="允许配置合约" description="仅空间管理员可配置。" disabled />
            </div>
          </ExampleCard>
          <ExampleCard title="混合选择 · 半选">
            <div className="space-y-2">
              <Checkbox label="全选当前页" checked={false} indeterminate />
              <div className="h-px bg-[var(--neutral-200)]" />
              <Checkbox label="TC4 钛合金数据集" defaultChecked />
              <Checkbox label="铝合金疲劳性能数据" defaultChecked />
              <Checkbox label="内部敏感数据" />
              <Checkbox label="外部供应商数据" disabled />
            </div>
            <p className="mt-3 text-xs text-[var(--text-tertiary)]">列表部分勾选时，表头显示半选；全选或全不选时恢复明确状态。</p>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Do / Don't" title="正确与错误" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="正确：多选用复选框">
            <div className="flex flex-col gap-3"><Checkbox label="成分" defaultChecked /><Checkbox label="工艺" /><Checkbox label="性能" /></div>
          </ExampleCard>
          <ExampleCard title="正确：全选用半选">
            <div className="space-y-2"><Checkbox label="全选当前页" checked={false} indeterminate /><div className="h-px bg-[var(--neutral-200)]" /><Checkbox label="TC4 钛合金数据集" defaultChecked /><Checkbox label="铝合金疲劳性能数据" /><Checkbox label="内部敏感数据" disabled /></div>
          </ExampleCard>
          <ExampleCard title="错误：互斥用复选框">
            <div className="flex flex-col gap-3"><Checkbox label="通过" /><Checkbox label="驳回" /></div>
          </ExampleCard>
          <ExampleCard title="错误：隐藏不可用选项">
            <p className="text-sm text-[var(--text-tertiary)]">用户看不到不可用项 → 无法理解权限边界。</p>
          </ExampleCard>
        </div>
      </section>
    </div>
  );
}
