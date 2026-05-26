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
        <SectionHeading eyebrow="Multi Select" title="多选模式" />
        <div className="rounded-sm border border-[var(--neutral-200)] bg-white p-6">
          <p className="mb-4 text-sm leading-6 text-[var(--neutral-600)]">
            需要多选时，选中项以 Tag 形式展示在输入区内，可通过关闭按钮移除。多选推荐搭配搜索功能使用。
          </p>
          <div className="flex flex-wrap gap-2 rounded-sm bg-[var(--neutral-50)] p-3">
            <span className="inline-flex items-center gap-1 rounded-sm border border-[var(--neutral-200)] bg-white px-2 py-0.5 text-xs text-[var(--neutral-700)]">
              数据空间
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 2l6 6M8 2l-6 6"/></svg>
            </span>
            <span className="inline-flex items-center gap-1 rounded-sm border border-[var(--neutral-200)] bg-white px-2 py-0.5 text-xs text-[var(--neutral-700)]">
              材库
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 2l6 6M8 2l-6 6"/></svg>
            </span>
            <span className="inline-flex items-center gap-1 rounded-sm border border-[var(--product-blue-500)] bg-[var(--product-blue-50)] px-2 py-0.5 text-xs text-[var(--product-blue-600)]">
              AI 应用
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 2l6 6M8 2l-6 6"/></svg>
            </span>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Dropdown" title="下拉面板与长选项" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="rounded-sm border border-[var(--neutral-200)] bg-white p-6">
            <h3 className="mb-3 text-sm font-semibold text-[var(--neutral-900)]">面板样式</h3>
            <p className="mb-3 text-sm leading-6 text-[var(--neutral-600)]">
              下拉面板宽度与选择器同宽。选项高度 36px，hover 态使用 neutral-50 背景。
              选项过多时面板最大高度 240px，超出滚动。
            </p>
          </div>
          <div className="rounded-sm border border-[var(--neutral-200)] bg-white p-6">
            <h3 className="mb-3 text-sm font-semibold text-[var(--neutral-900)]">长选项处理</h3>
            <p className="mb-3 text-sm leading-6 text-[var(--neutral-600)]">
              选项文案建议 ≤ 12 汉字。超长文本使用省略号截断，悬停显示完整内容。
            </p>
            <div className="truncate rounded-sm bg-[var(--neutral-50)] p-3 font-mono text-xs text-[var(--neutral-700)]" title="新材料可信数据空间基础服务平台">
              新材料可信数据空间基础服务平台
            </div>
          </div>
        </div>
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
