import { CheckCircle, WarningCircle } from "@phosphor-icons/react";
import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import { Tag } from "../../../components/ui/Tag";

export default function TagPage() {
  return (
    <div className="space-y-16">
      <PageHeader title="标签" description="标签用于表达分类、状态、属性和轻量提示，帮助用户快速识别数据对象的关键属性。" />

      <section>
        <SectionHeading eyebrow="Variants" title="标签类型" />
        <ExampleCard title="语义标签">
          <div className="flex flex-wrap gap-3">
            <Tag>默认标签</Tag>
            <Tag variant="brand">关键节点</Tag>
            <Tag variant="product">功能操作</Tag>
            <Tag variant="success" icon={<CheckCircle className="h-3.5 w-3.5" />}>已发布</Tag>
            <Tag variant="warning" icon={<WarningCircle className="h-3.5 w-3.5" />}>待确认</Tag>
            <Tag variant="error">异常数据</Tag>
          </div>
        </ExampleCard>
      </section>

      <section>
        <SectionHeading eyebrow="Sizes" title="标签尺寸" />
        <ExampleCard title="Small / Medium">
          <div className="flex flex-wrap items-center gap-3">
            <Tag size="sm" variant="neutral">Small</Tag>
            <Tag size="md" variant="neutral">Medium</Tag>
            <Tag size="md" variant="brand">品牌红浅色阶</Tag>
          </div>
        </ExampleCard>
      </section>

      <section>
              <section>
        <SectionHeading eyebrow="Color System" title="颜色使用规则" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="rounded-sm border border-[var(--neutral-200)] bg-white p-6">
            <h3 className="mb-3 text-sm font-semibold text-[var(--neutral-900)]">预置 6 色 · 满足 90% 场景</h3>
            <p className="text-sm leading-6 text-[var(--neutral-600)]">
              neutral：默认分类<br />
              brand：品牌标签、营销标记<br />
              product：产品功能、模块标识<br />
              success/warning/error：状态反馈
            </p>
          </div>
          <div className="rounded-sm border border-[var(--neutral-200)] bg-white p-6">
            <h3 className="mb-3 text-sm font-semibold text-[var(--neutral-900)]">自定义颜色 · 剩余 10% 场景</h3>
            <p className="text-sm leading-6 text-[var(--neutral-600)]">
              需要更多颜色时（如数据标签多分类），使用 data 色阶（data-01 ~ data-12），
              保持与图表数据色一致。
            </p>
          </div>
        </div>
      </section>
      <SectionHeading eyebrow="Guidelines" title="使用建议" />
        <SpecList
          items={[
            "品牌红标签仅用于关键节点、激活状态、决策结果和重点提示。",
            "状态标签必须和文字语义配合，不只依赖颜色。",
            "同一列表中标签数量应控制，避免干扰主数据阅读。",
            "后台表格内优先使用 Small 标签，保持信息密度。",
          ]}
        />
      </section>
    </div>
  );
}
