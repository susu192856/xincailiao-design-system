import { ClockCounterClockwise, FunnelSimple, SidebarSimple, SlidersHorizontal } from "@phosphor-icons/react";
import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import { Button } from "../../../components/ui/Button";
import { Drawer } from "../../../components/ui/Drawer";
import { Tag } from "../../../components/ui/Tag";

function FieldRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[88px_1fr] gap-3 text-sm">
      <span className="text-[var(--neutral-500)]">{label}</span>
      <span className="text-[var(--neutral-800)]">{value}</span>
    </div>
  );
}

export default function DrawerPage() {
  return (
    <div className="space-y-16">
      <PageHeader title="抽屉" description="抽屉用于在不离开当前页面的情况下承载详情、筛选、配置和短流程编辑，适合后台和数据产品中的侧向任务。" />

      <section>
        <SectionHeading eyebrow="Usage" title="基础结构" description="抽屉由遮罩、侧向面板、标题区、内容区和可选底部操作组成。复杂长流程仍应进入独立页面。" />
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <ExampleCard title="右侧详情抽屉" description="用于列表或表格中快速查看详情，保持主页面上下文。">
            <Drawer
              inline
              open
              size="md"
              title="材料详情"
              description="快速核对材料基础信息、来源和流转状态。"
              footer={
                <>
                  <Button variant="ghost" size="sm">关闭</Button>
                  <Button size="sm" tone="product">打开详情页</Button>
                </>
              }
            >
              <div className="space-y-4">
                <FieldRow label="材料名称" value="高温合金 GH4169" />
                <FieldRow label="数据来源" value="材库 / 标准化数据集" />
                <FieldRow label="治理状态" value="字段已校验，待发布" />
                <div className="flex gap-2 pt-1">
                  <Tag size="sm" variant="product">数据资产</Tag>
                  <Tag size="sm" variant="neutral">可追溯</Tag>
                </div>
              </div>
            </Drawer>
          </ExampleCard>

          <ExampleCard title="筛选抽屉" description="用于移动端或低宽度场景收纳筛选条件，避免页面顶部过重。">
            <Drawer inline open size="sm" title="筛选条件" description="筛选项应按使用频率排序，默认展示关键条件。" footer={<Button size="sm" tone="product">应用筛选</Button>}>
              <div className="space-y-3">
                {["材料类别", "数据来源", "审核状态", "更新时间"].map((item) => (
                  <div key={item} className="flex items-center justify-between bg-[var(--neutral-50)] px-3 py-2 text-sm">
                    <span className="text-[var(--neutral-800)]">{item}</span>
                    <FunnelSimple size={16} className="text-[var(--neutral-500)]" />
                  </div>
                ))}
              </div>
            </Drawer>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Patterns" title="典型场景" description="抽屉适合侧向补充、局部配置和短编辑。页面主任务不应被抽屉无限延长。" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <ExampleCard title="配置面板">
            <div className="flex items-center gap-3">
              <SlidersHorizontal size={24} className="text-[var(--neutral-900)]" />
              <div>
                <p className="text-sm font-semibold text-[var(--neutral-900)]">字段显示配置</p>
                <p className="mt-1 text-sm leading-6 text-[var(--neutral-600)]">适合表格列、字段权限和视图偏好设置。</p>
              </div>
            </div>
          </ExampleCard>
          <ExampleCard title="流程追踪">
            <div className="flex items-center gap-3">
              <ClockCounterClockwise size={24} className="text-[var(--neutral-900)]" />
              <div>
                <p className="text-sm font-semibold text-[var(--neutral-900)]">审计时间线</p>
                <p className="mt-1 text-sm leading-6 text-[var(--neutral-600)]">展示流转记录、操作人、时间和状态结果。</p>
              </div>
            </div>
          </ExampleCard>
          <ExampleCard title="侧栏扩展">
            <div className="flex items-center gap-3">
              <SidebarSimple size={24} className="text-[var(--neutral-900)]" />
              <div>
                <p className="text-sm font-semibold text-[var(--neutral-900)]">低频导航或工具</p>
                <p className="mt-1 text-sm leading-6 text-[var(--neutral-600)]">用于补充说明，不替代主侧栏导航。</p>
              </div>
            </div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Size" title="尺寸规范" description="尺寸应由任务复杂度决定，避免把页面级任务塞进过窄抽屉。" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
          {[
            ["Small", "360px", "筛选、简单设置"],
            ["Medium", "480px", "详情摘要、短表单"],
            ["Large", "640px", "较复杂配置"],
            ["X-Large", "800px", "宽字段详情"],
          ].map(([name, width, usage]) => (
            <ExampleCard key={name} title={name}>
              <p className="font-mono text-xl font-semibold text-[var(--neutral-900)]">{width}</p>
              <p className="mt-2 text-sm leading-6 text-[var(--neutral-600)]">{usage}</p>
            </ExampleCard>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Guidelines" title="最佳实践" />
        <SpecList
          items={[
            "抽屉用于保持当前页面上下文，适合详情预览、筛选、配置和短编辑。",
            "右侧抽屉为后台默认方向；左侧抽屉只用于临时导航或低频工具面板。",
            "底部操作区固定在抽屉底部，取消在左、确认在右。",
            "抽屉内容过长时内容区滚动，标题和底部操作保持可见。",
            "复杂审核、多步骤流程、深层详情应进入独立页面，不应依赖抽屉承载。",
          ]}
        />
      </section>
    </div>
  );
}
