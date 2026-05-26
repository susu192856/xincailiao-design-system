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
              <section>
        <SectionHeading eyebrow="Variants" title="Tabs 变体" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="rounded-sm border border-[var(--neutral-200)] bg-white p-6">
            <h3 className="mb-3 text-sm font-semibold text-[var(--neutral-900)]">线型 Tabs（当前实现）</h3>
            <p className="text-sm leading-6 text-[var(--neutral-600)]">
              适用于页面级内容切换，底部强调线表示当前激活项。默认样式，推荐作为首选。
            </p>
            <div className="mt-3 flex border-b border-[var(--neutral-200)]">
              {["Tab 1", "Tab 2", "Tab 3"].map((t, i) => (
                <div key={t} className={`border-b-2 px-4 py-2 text-sm ${i === 0 ? "border-[var(--neutral-900)] text-[var(--neutral-900)]" : "border-transparent text-[var(--neutral-500)]"}`}>{t}</div>
              ))}
            </div>
          </div>
          <div className="rounded-sm border border-[var(--neutral-200)] bg-white p-6">
            <h3 className="mb-3 text-sm font-semibold text-[var(--neutral-900)]">卡片式 Tabs</h3>
            <p className="text-sm leading-6 text-[var(--neutral-600)]">
              适用于卡片容器内的次级切换，激活项以白底+边框区分。可用于两级 Tabs 嵌套中的第二级。
            </p>
            <div className="mt-3 flex gap-1">
              {["明细", "日志", "配置"].map((t, i) => (
                <div key={t} className={`rounded-sm px-4 py-2 text-sm ${i === 0 ? "border border-[var(--neutral-200)] bg-white text-[var(--neutral-900)]" : "text-[var(--neutral-500)]"}`}>{t}</div>
              ))}
            </div>
          </div>
        </div>
      </section>
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
