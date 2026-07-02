import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading } from "../../../components/docs/ComponentDoc";
import { Switch } from "../../../components/ui/Switch";

export default function SwitchPage() {
  return (
    <div className="space-y-16">
      <PageHeader
        title="开关"
        description="用于即时启停某项能力，常见于功能配置、权限开关、通知设置和自动化任务。"
      />

      <section>
        <SectionHeading eyebrow="Sizes" title="尺寸" />
        <div className="inline-flex flex-wrap items-end gap-8 rounded-[var(--radius-md)] border border-[var(--neutral-200)] bg-white p-6 shadow-[var(--shadow-xs)]">
          <div className="flex flex-col items-center gap-3">
            <Switch label="Small · 36×20px" size="sm" defaultChecked />
            <span className="text-xs text-[var(--text-tertiary)]">表格行内</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Switch label="Medium · 44×24px" size="md" defaultChecked />
            <span className="text-xs text-[var(--text-tertiary)]">设置页 / 表单</span>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="States" title="状态" />
        <div className="inline-flex flex-wrap gap-6 rounded-[var(--radius-md)] border border-[var(--neutral-200)] bg-white p-6 shadow-[var(--shadow-xs)]">
          <div className="pointer-events-none"><Switch label="关闭" /></div>
          <div className="pointer-events-none"><Switch label="开启" defaultChecked /></div>
          <div className="pointer-events-none"><Switch label="错误" error="需要二次确认" /></div>
          <div className="pointer-events-none"><Switch label="禁用关闭" disabled /></div>
          <div className="pointer-events-none"><Switch label="禁用开启" defaultChecked disabled /></div>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Scenarios" title="使用场景" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <ExampleCard title="功能配置">
            <div className="flex flex-col gap-4">
              <Switch label="开启消息通知" description="任务完成后推送站内消息。" />
              <Switch label="允许数据自动同步" description="开启后每 10 分钟同步一次。" defaultChecked />
              <Switch label="外部组织访问" description="当前流程未完成审批。" disabled />
            </div>
          </ExampleCard>
          <ExampleCard title="数据空间配置">
            <div className="flex flex-col gap-4">
              <Switch label="开启链上存证" description="记录数据流通关键节点。" defaultChecked />
              <Switch label="允许跨组织流通" description="开启前需要完成合约配置。" />
              <Switch label="开放外部下载" description="当前角色无权限。" disabled />
            </div>
          </ExampleCard>
          <ExampleCard title="高风险操作">
            <div className="flex flex-col gap-4">
              <Switch label="自动发布结果" error="该开关影响外部可见性，需要二次确认。" />
              <Switch label="链上存证" helperText="开启后会写入审计链路。" defaultChecked />
              <Switch label="删除后自动清理关联数据" disabled description="高风险能力默认不可直接启用。" />
            </div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Do / Don't" title="正确与错误" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="正确：即时生效用 Switch">
            <Switch label="消息通知" defaultChecked />
          </ExampleCard>
          <ExampleCard title="错误：需提交保存仍用 Switch">
            <div><Switch label="同意服务条款" /><p className="mt-2 text-xs text-[var(--text-tertiary)]">需要用户显式提交确认，应使用 Checkbox。</p></div>
          </ExampleCard>
          <ExampleCard title="正确：普通功能可即时切换">
            <Switch label="允许数据自动同步" defaultChecked />
          </ExampleCard>
          <ExampleCard title="错误：高风险无二次确认">
            <div><Switch label="自动发布结果" error="建议使用确认弹窗后再开启。" /><p className="mt-2 text-xs text-[var(--text-tertiary)]">影响外部可见性的开关需二次确认。</p></div>
          </ExampleCard>
        </div>
      </section>
    </div>
  );
}
