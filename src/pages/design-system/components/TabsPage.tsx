import { ChartLineUp, ClockCounterClockwise, Database, ShieldCheck } from "@phosphor-icons/react";
import { useState } from "react";
import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import { Badge } from "../../../components/ui/Badge";
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
    label: "流转记录",
    icon: <ClockCounterClockwise size={16} />,
    badge: "12",
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
      <PageHeader title="菜单标签页" description="菜单标签页用于在同一页面区域内切换同级内容，适合详情页信息分组、数据看板分区和配置面板。" />

      <section>
        <SectionHeading eyebrow="Usage" title="基础切换" />
        <ExampleCard title="详情页内容分组" description="详情页 Tabs 只承载同级内容，不用于表达流程步骤。">
          <Tabs value={value} onValueChange={setValue} items={detailItems} />
        </ExampleCard>
      </section>

      <section>
        <SectionHeading eyebrow="Patterns" title="后台常用模式" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="状态分组">
            <Tabs
              defaultValue="all"
              size="sm"
              items={[
                { value: "all", label: "全部", badge: <Badge tone="neutral" count={128} size="sm" />, content: <p className="text-sm text-[var(--text-tertiary)]">展示全部数据。</p> },
                { value: "pending", label: "待审核", badge: <Badge tone="warning" count={8} size="sm" />, content: <p className="text-sm text-[var(--text-tertiary)]">需要人工复核的数据。</p> },
                { value: "risk", label: "异常", badge: <Badge tone="danger" count={3} size="sm" />, content: <p className="text-sm text-[var(--text-tertiary)]">存在异常或调用失败的数据。</p> },
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

          <ExampleCard title="分段切换">
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
            "页面级切换优先使用线型 Tabs；卡片内容内部切换可使用 card；小范围条件切换可使用 segment。",
            "当前激活项默认使用中性黑，不用品牌红；红色只用于异常数量、风险提示等语义状态。",
            "禁用标签必须可见但不可交互，避免用户误以为内容消失。",
          ]}
        />
      </section>
    </div>
  );
}
