import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import { Switch } from "../../../components/ui/Switch";
import { Tag } from "../../../components/ui/Tag";

export default function SwitchPage() {
  return (
    <div className="space-y-16">
      <PageHeader title="开关" description="开关用于即时启停某项能力，常见于功能配置、权限开关、通知设置和自动化任务。" />

      <section>
        <SectionHeading eyebrow="Variants" title="基础状态" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <ExampleCard title="设置项" description="Switch 表示开关后立即生效，不等待表单提交。">
            <div className="flex flex-col gap-5">
              <Switch label="开启消息通知" description="任务完成后推送站内消息。" />
              <Switch label="允许数据自动同步" description="开启后每 10 分钟同步一次。" defaultChecked />
              <Switch label="外部组织访问" description="当前流程未完成审批。" disabled />
            </div>
          </ExampleCard>
          <ExampleCard title="尺寸与场景">
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-[var(--neutral-50)] px-3 py-2">
                <span className="text-sm text-[var(--text-secondary)]">设置页标准开关</span>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between bg-[var(--neutral-50)] px-3 py-2">
                <span className="text-sm text-[var(--text-secondary)]">表格行内开关</span>
                <Switch size="sm" />
              </div>
            </div>
            <p className="mt-4 text-xs leading-5 text-[var(--text-tertiary)]">开启态使用产品蓝，表示功能处于激活状态；不使用品牌红表达普通启用。</p>
          </ExampleCard>
          <ExampleCard title="风险状态">
            <div className="space-y-4">
              <Switch label="自动发布结果" error="该开关影响外部可见性，需要二次确认。" />
              <Switch label="链上存证" helperText="开启后会写入审计链路。" defaultChecked />
              <Switch label="删除后自动清理关联数据" disabled description="高风险能力默认不可直接启用。" />
            </div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Backend States"
          title="后台典型场景"
          description="开关常用于配置中心、权限能力、自动化任务和消息通知。高风险开关不应只靠开关本身完成操作，需要确认弹窗或审批流。"
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <ExampleCard title="数据空间配置" description="规则与可信流通相关开关。">
            <div className="space-y-4">
              <Switch label="开启链上存证" description="记录数据流通关键节点。" defaultChecked />
              <Switch label="允许跨组织流通" description="开启前需要完成合约配置。" />
              <Switch label="开放外部下载" description="当前角色无权限。" disabled />
            </div>
          </ExampleCard>
          <ExampleCard title="AI 任务配置" description="模型推演与决策辅助能力。">
            <div className="space-y-4">
              <Switch label="自动推荐材料方案" defaultChecked />
              <Switch label="异常结果提醒" description="异常时提醒数据负责人。" defaultChecked />
              <Switch label="自动发布结果" error="建议使用确认弹窗后再开启。" />
            </div>
          </ExampleCard>
          <ExampleCard title="开关风险等级">
            <div className="space-y-3">
              <Tag variant="product" size="sm">普通功能可即时切换</Tag>
              <Tag variant="warning" size="sm">影响权限需二次确认</Tag>
              <Tag variant="error" size="sm">危险开关需审批流</Tag>
            </div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Guidelines" title="最佳实践" />
        <SpecList
          items={[
            "Switch 表示即时生效，若需要提交表单后才生效，应使用 Checkbox 或 Select。",
            "开启态使用 product-blue，表示功能激活；品牌红不用于普通开关。",
            "影响权限、发布、外部共享的开关需要二次确认或审批提示。",
            "高风险开关需要显示说明或错误提示，不能只依赖颜色表达风险。",
            "表格行内使用 sm 尺寸，设置页使用 md 尺寸。",
          ]}
        />
      </section>
    </div>
  );
}
