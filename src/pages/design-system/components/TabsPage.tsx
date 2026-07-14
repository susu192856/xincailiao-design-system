import { ChartLineUp, ClockCounterClockwise, Database, ShieldCheck } from "@phosphor-icons/react";
import { useState } from "react";
import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import { Tabs } from "../../../components/ui/Tabs";
import { Tag } from "../../../components/ui/Tag";

const detailItems = [
  {
    value: "overview",
    label: "概览",
    icon: <Database size={16} />,
    content: (
      <p className="text-sm leading-6 text-[var(--text-tertiary)]">
        展示材料数据资产的核心摘要、更新时间、可信状态和主要责任方。
      </p>
    ),
  },
  {
    value: "process",
    label: "工艺参数",
    icon: <ChartLineUp size={16} />,
    content: (
      <p className="text-sm leading-6 text-[var(--text-tertiary)]">
        展示温度、压力、时间等工艺参数，以及实验批次和参数变化轨迹。
      </p>
    ),
  },
  {
    value: "history",
    label: "流转记录（12）",
    icon: <ClockCounterClockwise size={16} />,
    content: (
      <p className="text-sm leading-6 text-[var(--text-tertiary)]">
        展示数据授权、审核、发布、调用和链上存证记录。
      </p>
    ),
  },
];

export default function TabsPage() {
  const [value, setValue] = useState("overview");

  return (
    <div className="space-y-16">
      <PageHeader title="标签页" description="标签页用于切换同级内容。后台多级使用时必须按影响范围区分一级、二级和三级，不能只靠字号临时区分。" />

      <section>
        <SectionHeading eyebrow="Hierarchy" title="三级层级" description="层级由内容影响范围决定：整页、当前页分组、局部图表。三级可按强调程度选择强分段或弱文字。" />
        <ExampleCard title="一级 · 整页内容切换" description="用于业务模块或整页内容切换，置于页面标题下方；同一页面最多保留一个一级标签栏。">
          <Tabs value={value} onValueChange={setValue} items={detailItems} variant="page" size="lg" listClassName="min-w-full" />
        </ExampleCard>
      </section>

      <section>
        <SectionHeading eyebrow="Patterns" title="后台常用模式" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="二级 · 当前页状态分组">
            <Tabs
              defaultValue="all"
              size="md"
              items={[
                { value: "all", label: "全部（128）", content: <p className="text-sm text-[var(--text-tertiary)]">展示全部数据。</p> },
                { value: "pending", label: "待审核（8）", content: <p className="text-sm text-[var(--text-tertiary)]">需要人工复核的数据。</p> },
                { value: "risk", label: "异常（3）", content: <p className="text-sm text-[var(--text-tertiary)]">存在异常或调用失败的数据。</p> },
              ]}
            />
          </ExampleCard>

          <ExampleCard title="卡片内次级分组">
            <Tabs
              defaultValue="base"
              variant="card"
              size="sm"
              items={[
                { value: "base", label: "基础信息", content: <p className="text-sm text-[var(--text-tertiary)]">字段、类型、来源和责任人。</p> },
                { value: "permission", label: "权限", icon: <ShieldCheck size={14} />, content: <p className="text-sm text-[var(--text-tertiary)]">查看、编辑、调用和导出权限。</p> },
                { value: "model", label: "模型结果", content: <p className="text-sm text-[var(--text-tertiary)]">模型结果暂未生成。</p>, disabled: true },
              ]}
            />
          </ExampleCard>

          <ExampleCard title="三级 · 强分段切换">
            <Tabs
              defaultValue="space"
              variant="segment"
              size="sm"
              items={[
                { value: "space", label: "数据空间", content: <p className="text-sm text-[var(--text-tertiary)]">偏规则、权限、合约和审计。</p> },
                { value: "library", label: "材库", content: <p className="text-sm text-[var(--text-tertiary)]">偏数据接入、治理、图谱和资产化。</p> },
                { value: "ai", label: "AI 应用", content: <p className="text-sm text-[var(--text-tertiary)]">偏预测、推荐、优化和结果决策。</p> },
              ]}
            />
          </ExampleCard>

          <ExampleCard title="三级 · 弱文字切换">
            <Tabs
              defaultValue="year"
              variant="text"
              size="sm"
              items={[
                { value: "year", label: "按年", content: <p className="text-sm text-[var(--text-tertiary)]">按年度汇总图表数据。</p> },
                { value: "month", label: "按月", content: <p className="text-sm text-[var(--text-tertiary)]">按月份查看变化趋势。</p> },
              ]}
            />
          </ExampleCard>

          <ExampleCard title="标签组合与禁用">
            <div className="space-y-4">
              <Tabs
                defaultValue="valid"
                items={[
                  { value: "valid", label: "有效数据", content: null },
                  { value: "archived", label: "归档数据", content: null },
                  { value: "deleted", label: "已删除", content: null, disabled: true },
                ]}
              />
              <div className="flex flex-wrap gap-2">
                <Tag size="sm" variant="product">当前分组可编辑</Tag>
                <Tag size="sm" variant="neutral">禁用项保留可见</Tag>
              </div>
            </div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Guidelines" title="最佳实践" />
        <SpecList
          items={[
            "Tabs 内容必须是同级关系，不应用于主流程步骤；流程应使用步骤条或状态流转。",
            "详情页推荐 2-5 个标签，超过 5 个时优先改为侧边导航或二级菜单。",
            "一级使用 page，二级使用 line；三级强切换使用 segment，按年/按月等弱切换使用 text。不要在同一层级混用样式。",
            "数量属于标签名称时写作“流转记录（12）”；只有异常、提醒等独立状态才使用彩色徽标。",
            "当前激活项默认使用中性黑，不用品牌红；红色只用于异常数量、风险提示等语义状态。",
            "禁用标签必须可见但不可交互，避免用户误以为内容消失。",
          ]}
        />
      </section>
    </div>
  );
}
