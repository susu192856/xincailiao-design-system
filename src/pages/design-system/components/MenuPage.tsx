import { Bell, ChartBar, Database, GearSix, HouseSimple, Table, UserCircle } from "@phosphor-icons/react";
import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import { Badge } from "../../../components/ui/Badge";
import { Menu } from "../../../components/ui/Menu";
import { Tag } from "../../../components/ui/Tag";

const primaryItems = [
  { key: "home", label: "工作台", icon: <HouseSimple size={16} weight="regular" /> },
  { key: "data", label: "数据资产", icon: <Database size={16} weight="regular" />, badge: <Badge count={8} tone="product" size="sm" /> },
  { key: "table", label: "材料表格", icon: <Table size={16} weight="regular" /> },
  { key: "chart", label: "数据看板", icon: <ChartBar size={16} weight="regular" /> },
  { key: "setting", label: "系统配置", icon: <GearSix size={16} weight="regular" />, disabled: true },
];

const groupedItems = [
  {
    key: "asset-group",
    type: "group" as const,
    label: "数据资产",
    children: [
      { key: "datasets", label: "数据集", icon: <Database size={16} weight="regular" />, badge: <Badge count={8} tone="product" size="sm" /> },
      { key: "tables", label: "材料表格", icon: <Table size={16} weight="regular" /> },
      { key: "dashboard", label: "数据看板", icon: <ChartBar size={16} weight="regular" /> },
    ],
  },
  { key: "divider-1", type: "divider" as const, label: "" },
  {
    key: "system-group",
    type: "group" as const,
    label: "系统管理",
    children: [
      { key: "member", label: "成员权限", icon: <UserCircle size={16} weight="regular" /> },
      { key: "approval", label: "待办审批", icon: <Bell size={16} weight="regular" />, badge: <Badge count={12} tone="brand" size="sm" /> },
      { key: "config", label: "系统配置", icon: <GearSix size={16} weight="regular" />, disabled: true },
    ],
  },
];

export default function MenuPage() {
  return (
    <div className="space-y-16">
      <PageHeader title="菜单" description="菜单用于承载产品导航和功能入口，后台侧栏优先保证当前模块、层级和可访问状态清晰。" />

      <section>
        <SectionHeading eyebrow="Variants" title="菜单类型" description="菜单激活态使用中性黑，产品蓝只用于功能焦点、数量提醒和局部行为，不作为默认菜单背景。" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="侧边菜单" description="后台主导航，适合长期工作台和管理系统。">
            <Menu items={primaryItems} activeKey="data" />
          </ExampleCard>
          <ExampleCard title="顶部菜单" description="门户、轻量后台或内容栏目切换。">
            <div className="space-y-5">
              <Menu items={primaryItems.slice(0, 4)} activeKey="home" mode="horizontal" />
              <p className="text-xs leading-5 text-[var(--neutral-600)]">顶部菜单只保留一级入口，复杂功能仍建议进入侧栏或二级导航。</p>
            </div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Structure" title="分组与层级" description="复杂后台侧栏需要按业务域分组，分隔线只用于区分不同管理域，不用于装饰。" />
        <ExampleCard title="分组菜单">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-[260px_1fr]">
            <Menu items={groupedItems} activeKey="datasets" className="w-full" />
            <div className="rounded-sm bg-[var(--neutral-50)] p-5">
              <h3 className="text-base font-semibold text-[var(--neutral-900)]">数据集</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--neutral-600)]">
                当前入口属于“数据资产”分组。分组标题使用弱文字，真正可点击入口仍保持明确图标、标题和状态提示。
              </p>
            </div>
          </div>
        </ExampleCard>
      </section>

      <section>
        <SectionHeading eyebrow="States" title="后台菜单状态" description="后台菜单需要覆盖展开、收起、禁用、提醒和权限不可达状态。" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <ExampleCard title="展开状态">
            <Menu items={primaryItems} activeKey="table" size="md" />
          </ExampleCard>
          <ExampleCard title="收起状态">
            <Menu items={primaryItems} activeKey="table" collapsed />
          </ExampleCard>
          <ExampleCard title="紧凑状态">
            <Menu items={groupedItems} activeKey="datasets" size="sm" />
          </ExampleCard>
          <ExampleCard title="权限与提醒">
            <div className="space-y-4">
              <Menu
                items={[
                  { key: "approval", label: "待办审批", icon: <Bell size={16} weight="regular" />, badge: <Badge count={12} tone="brand" size="sm" /> },
                  { key: "member", label: "成员权限", icon: <UserCircle size={16} weight="regular" /> },
                  { key: "config", label: "系统配置", icon: <GearSix size={16} weight="regular" />, disabled: true },
                ]}
                activeKey="approval"
              />
              <Tag>禁用项保留可见性</Tag>
            </div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Composition" title="产品侧栏示例" description="侧栏宽度、收起宽度和内容区关系需要稳定，避免切换时破坏页面主任务。" />
        <div className="rounded-sm bg-white p-6">
          <div className="grid overflow-hidden rounded-sm border border-[var(--neutral-200)] md:grid-cols-[224px_1fr]">
            <div className="border-r border-[var(--neutral-200)] bg-[var(--neutral-50)] p-3">
              <div className="mb-3 px-3 text-sm font-semibold text-[var(--neutral-900)]">材库管理</div>
              <Menu items={primaryItems} activeKey="data" className="w-full bg-transparent p-0" />
            </div>
            <div className="min-h-72 bg-white p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-[var(--neutral-900)]">数据资产</h3>
                  <p className="mt-1 text-sm text-[var(--neutral-600)]">材料数据集、解析任务和治理状态。</p>
                </div>
                <Badge count={8} tone="product" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {["接入中", "待治理", "已发布"].map((item) => (
                  <div key={item} className="rounded-sm bg-[var(--neutral-50)] p-4">
                    <div className="h-2 w-16 bg-[var(--neutral-900)]" />
                    <p className="mt-4 text-sm text-[var(--neutral-700)]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Guidelines" title="最佳实践" />
        <SpecList
          items={[
            "后台主导航使用 neutral-900 激活态，保证当前位置识别明确。",
            "产品蓝只用于数量提醒、焦点行为和功能入口，不作为菜单默认激活背景。",
            "禁用菜单需要保留可见性时使用 disabled，不要隐藏关键权限线索。",
            "Figma 组件需包含 vertical、horizontal、collapsed、active、disabled、badge、group、divider 状态。",
          ]}
        />
      </section>
    </div>
  );
}
