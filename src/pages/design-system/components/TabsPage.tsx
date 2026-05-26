import { useState } from "react";
import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import { Tabs } from "../../../components/ui/Tabs";

export default function TabsPage() {
  const [value, setValue] = useState("overview");

  return (
    <div className="space-y-16">
      <PageHeader title="Tabs" description="Tabs 用于在同一页面区域内切换同级内容，适合详情页信息分组、数据看板分区和配置面板。" />

      <section>
        <SectionHeading eyebrow="Usage" title="基础切换" />
        <ExampleCard title="详情页分组">
          <Tabs
            value={value}
            onValueChange={setValue}
            items={[
              { value: "overview", label: "概览", content: <p className="text-sm leading-6 text-[var(--neutral-600)]">展示材料数据资产的核心摘要、更新时间和可信状态。</p> },
              { value: "process", label: "工艺参数", content: <p className="text-sm leading-6 text-[var(--neutral-600)]">展示温度、压力、时间等工艺参数和实验批次。</p> },
              { value: "history", label: "流转记录", content: <p className="text-sm leading-6 text-[var(--neutral-600)]">展示数据授权、审核、发布和调用记录。</p> },
            ]}
          />
        </ExampleCard>
      </section>

      <section>
        <SectionHeading eyebrow="States" title="状态示例" />
        <ExampleCard title="禁用标签">
          <Tabs
            value="base"
            items={[
              { value: "base", label: "基础信息", content: <p className="text-sm text-[var(--neutral-600)]">当前可用内容。</p> },
              { value: "model", label: "模型结果", content: "disabled", disabled: true },
            ]}
          />
        </ExampleCard>
      </section>

      <section>
        <SectionHeading eyebrow="Guidelines" title="使用建议" />
        <SpecList
          items={[
            "Tabs 内容必须是同级关系，不应用于主流程步骤。",
            "标签数量建议 2-5 个，过多时应考虑二级导航或筛选。",
            "当前激活项用黑色下划线表达，不额外使用大面积色块。",
            "后台详情页可用 Tabs 承载基础信息、参数、记录、权限等分组。",
          ]}
        />
      </section>
    </div>
  );
}
