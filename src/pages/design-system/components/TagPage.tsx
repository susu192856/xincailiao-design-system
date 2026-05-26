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
