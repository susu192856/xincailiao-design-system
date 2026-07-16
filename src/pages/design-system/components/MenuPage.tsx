import { Bell, ChartBar, Database, GearSix, HouseSimple, Table, UserCircle } from "@phosphor-icons/react";
import { useState } from "react";
import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import { Menu } from "../../../components/ui/Menu";
import { Tag } from "../../../components/ui/Tag";

const primaryItems = [
  { key: "home", label: "工作台", icon: <HouseSimple size={16} weight="regular" /> },
  { key: "data", label: "数据资产（8）", icon: <Database size={16} weight="regular" /> },
  { key: "table", label: "材料表格", icon: <Table size={16} weight="regular" /> },
  { key: "chart", label: "数据看板", icon: <ChartBar size={16} weight="regular" /> },
  { key: "setting", label: "系统配置", icon: <GearSix size={16} weight="regular" />, disabled: true },
];

const topMenuItems = primaryItems.slice(0, 4).map(({ key, label, disabled }) => ({ key, label, disabled }));

const groupedItems = [
  {
    key: "asset-group",
    type: "group" as const,
    label: "数据资产",
    children: [
      { key: "datasets", label: "数据集（8）", icon: <Database size={16} weight="regular" /> },
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
      { key: "approval", label: "待办审批（12）", icon: <Bell size={16} weight="regular" /> },
      { key: "config", label: "系统配置", icon: <GearSix size={16} weight="regular" />, disabled: true },
    ],
  },
];

export default function MenuPage() {
  const [activeMenu, setActiveMenu] = useState("data");

  return (
    <div className="space-y-16">
      <PageHeader title="菜单" description="菜单用于承载产品导航和功能入口，后台侧栏优先保证当前模块、层级和可访问状态清晰。" />

      <section>
        <SectionHeading eyebrow="Variants" title="菜单类型" description="菜单激活态使用中性黑；普通数量作为名称的一部分显示为“名称（数量）”，不使用彩色徽标。侧边菜单按需要使用图标，顶部菜单默认只使用文字。" />
        <div className="grid grid-cols-1 gap-5">
          <ExampleCard
            title="侧边菜单"
            description={`后台主导航，适合长期工作台和管理系统；当前入口为“${primaryItems.find((item) => item.key === activeMenu)?.label}”。`}
            interactive
            code={`const [activeKey, setActiveKey] = useState("data");\n\n<Menu\n  items={items}\n  value={activeKey}\n  onValueChange={setActiveKey}\n/>`}
          >
            <Menu items={primaryItems} value={activeMenu} onValueChange={setActiveMenu} />
          </ExampleCard>
          <ExampleCard title="顶部菜单" description="用于门户、轻量后台或跨页面栏目导航；默认使用文字，避免与页内标签页混淆。">
            <div className="space-y-5">
              <Menu items={topMenuItems} activeKey="home" mode="horizontal" />
              <p className="text-xs leading-5 text-[var(--text-tertiary)]">顶部菜单只保留一级页面入口，生产实现应更新网址（URL）并标记当前位置；复杂功能仍进入侧栏或二级导航。</p>
            </div>
          </ExampleCard>
        </div>
        <div className="mt-5 border border-[var(--neutral-200)] bg-[var(--neutral-50)] px-5 py-4 text-sm leading-6 text-[var(--text-secondary)]">
          <strong className="text-[var(--text-primary)]">菜单与标签页边界：</strong>
          切换后进入不同页面、模块或网址时使用菜单；页面标题和网址不变，只替换当前区域内容时使用标签页（Tabs）。两者可以都有激活下划线，但顶部菜单使用整项下划线和导航语义，标签页使用短下划线和标签面板语义。
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Structure" title="分组与层级" description="复杂后台侧栏需要按业务域分组，分隔线只用于区分不同管理域，不用于装饰。" />
        <ExampleCard title="分组菜单">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-[260px_1fr]">
            <Menu items={groupedItems} activeKey="datasets" className="w-full" />
            <div className="rounded-sm bg-[var(--neutral-50)] p-5">
              <h3 className="text-base font-semibold text-[var(--text-primary)]">数据集</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--text-tertiary)]">
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
                  { key: "approval", label: "待办审批（12）", icon: <Bell size={16} weight="regular" /> },
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
              <div className="mb-3 px-3 text-sm font-semibold text-[var(--text-primary)]">材库管理</div>
              <Menu items={primaryItems} activeKey="data" className="w-full bg-transparent p-0" />
            </div>
            <div className="min-h-72 bg-white p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-[var(--text-primary)]">数据资产（8）</h3>
                  <p className="mt-1 text-sm text-[var(--text-tertiary)]">材料数据集、解析任务和治理状态。</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {["接入中", "待治理", "已发布"].map((item) => (
                  <div key={item} className="rounded-sm bg-[var(--neutral-50)] p-4">
                    <div className="h-2 w-16 bg-[var(--neutral-900)]" />
                    <p className="mt-4 text-sm text-[var(--text-secondary)]">{item}</p>
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
            "侧边菜单在需要收起、入口较多或图标能稳定区分模块时使用图标；同级入口应全部有图标或全部无图标，分组标题不加图标。",
            "顶部菜单默认使用纯文字；只有高度通用且所有同级入口都有一致图标时才保留图标，不用图标装饰栏目名称。",
            "顶部菜单悬停只增强文字颜色，与线型标签页保持一致；侧边菜单悬停使用浅背景，扩大纵向列表的行反馈。",
            "跨页面或模块切换使用菜单并更新网址（URL）；同一页面内部切换内容使用标签页（Tabs），不要用顶部菜单模拟标签页。",
            "普通菜单数量统一写在名称后并使用全角括号，如“数据资产（8）”；数量继承菜单文字颜色，不单独强调。",
            "彩色徽标仅用于必须独立识别的异常或紧急提醒，不用于普通导航计数。",
            "禁用菜单需要保留可见性时使用 disabled，不要隐藏关键权限线索。",
          ]}
        />
      </section>
    </div>
  );
}
