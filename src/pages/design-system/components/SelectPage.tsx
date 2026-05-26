import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import { Select } from "../../../components/ui/Select";

const materialOptions = [
  { label: "金属材料", value: "metal" },
  { label: "高分子材料", value: "polymer" },
  { label: "无机非金属", value: "ceramic" },
];

export default function SelectPage() {
  return (
    <div className="space-y-16">
      <PageHeader title="选择器" description="选择器用于从固定选项中选择单一值，适合状态、类型、分类和筛选条件。" />

      <section>
        <SectionHeading eyebrow="Variants" title="选择器类型" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="基础选择">
            <div className="space-y-4">
              <Select label="材料类型" placeholder="请选择材料类型" options={materialOptions} />
              <Select label="数据状态" defaultValue="review" options={[{ label: "待审核", value: "review" }, { label: "已发布", value: "published" }]} />
            </div>
          </ExampleCard>
          <ExampleCard title="状态选择">
            <div className="space-y-4">
              <Select label="错误状态" placeholder="请选择" options={materialOptions} error="请选择材料类型" />
              <Select label="禁用状态" options={materialOptions} defaultValue="metal" disabled />
            </div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Sizes" title="选择器尺寸" />
        <ExampleCard title="Small / Medium / Large">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Select size="sm" label="Small" options={materialOptions} defaultValue="metal" />
            <Select size="md" label="Medium" options={materialOptions} defaultValue="polymer" />
            <Select size="lg" label="Large" options={materialOptions} defaultValue="ceramic" />
          </div>
        </ExampleCard>
      </section>

      <section>
        <SectionHeading eyebrow="Guidelines" title="使用建议" />
        <SpecList
          items={[
            "选项数量较少且语义固定时使用选择器，开放输入不要强行做成选择器。",
            "默认选项必须可解释，避免用不明确的“全部”覆盖实际状态。",
            "表格筛选区域优先使用 Small 或 Medium，减少工具栏高度。",
            "错误状态需要搭配文字说明，保证状态可理解。",
          ]}
        />
      </section>
    </div>
  );
}
