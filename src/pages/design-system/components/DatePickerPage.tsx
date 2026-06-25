import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import { DatePicker } from "../../../components/ui/DatePicker";

export default function DatePickerPage() {
  return (
    <div className="space-y-16">
      <PageHeader title="日期选择" description="用于选择单个日期，支持清除、最小/最大日期限制，适用于表单、筛选等场景。" />

      <section>
        <SectionHeading eyebrow="Sizes" title="尺寸" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <ExampleCard title="小尺寸 sm (28px)">
            <DatePicker size="sm" placeholder="选择日期" />
          </ExampleCard>
          <ExampleCard title="中尺寸 md (32px)">
            <DatePicker size="md" placeholder="选择日期" />
          </ExampleCard>
          <ExampleCard title="大尺寸 lg (36px)">
            <DatePicker size="lg" placeholder="选择日期" />
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="States" title="状态" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="默认">
            <DatePicker label="发布日期" placeholder="请选择日期" />
          </ExampleCard>
          <ExampleCard title="已选择">
            <DatePicker label="发布日期" value="2026-06-24" />
          </ExampleCard>
          <ExampleCard title="禁用">
            <DatePicker label="发布日期" disabled placeholder="不可选" />
          </ExampleCard>
          <ExampleCard title="错误">
            <DatePicker label="有效期至" error="请选择有效日期" />
          </ExampleCard>
          <ExampleCard title="区间限制">
            <DatePicker label="选择日期" helperText="仅可选取 2026-06-01 至 2026-12-31" min="2026-06-01" max="2026-12-31" />
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Backend Scenarios" title="后台业务场景" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="筛选表单">
            <div className="space-y-3">
              <div className="flex flex-wrap items-end gap-3">
                <DatePicker size="sm" label="开始日期" />
                <span className="pb-1.5 text-sm text-[var(--text-tertiary)]">至</span>
                <DatePicker size="sm" label="结束日期" />
              </div>
            </div>
          </ExampleCard>
          <ExampleCard title="详情页只读替代">
            <div className="space-y-3">
              <div>
                <span className="text-sm text-[var(--text-tertiary)]">生效日期</span>
                <p className="text-sm text-[var(--text-body)]">2026-06-24</p>
              </div>
            </div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Guidelines" title="最佳实践" />
        <SpecList
          items={[
            "日期选择用于精确到天的日期录入，不应用于时间或日期范围的复杂选择。",
            "表单中使用时应明确标签，筛选区标签可省略用 placeholder 替代。",
            "通过 min / max 限制可选范围，避免用户选择无效日期。",
            "已选日期可通过清除按钮快速清空，适合非必填场景。",
            "移动端触发系统原生日期选择器，保持平台交互一致性。",
          ]}
        />
      </section>
    </div>
  );
}
