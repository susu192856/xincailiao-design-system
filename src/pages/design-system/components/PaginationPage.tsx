import { useState } from "react";
import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import { Pagination } from "../../../components/ui/Pagination";

export default function PaginationPage() {
  const [page, setPage] = useState(2);

  return (
    <div className="space-y-16">
      <PageHeader title="分页" description="分页用于切分大量列表和表格数据，帮助用户在明确范围内浏览、定位和操作。" />

      <section>
        <SectionHeading eyebrow="Usage" title="分页示例" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="默认分页">
            <Pagination page={page} total={6} onPageChange={setPage} />
          </ExampleCard>
          <ExampleCard title="禁用状态">
            <Pagination page={1} total={4} disabled />
          </ExampleCard>
        </div>
      </section>

      <section>
              <section>
        <SectionHeading eyebrow="Extensions" title="扩展功能" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="rounded-sm border border-[var(--neutral-200)] bg-white p-6">
            <h3 className="mb-3 text-sm font-semibold text-[var(--neutral-900)]">快速跳转</h3>
            <p className="mb-3 text-sm leading-6 text-[var(--neutral-600)]">
              当总页数 ≥ 10 页时，建议增加页码输入框，支持用户直接输入页码跳转。
            </p>
            <div className="flex items-center gap-2 rounded-sm bg-[var(--neutral-50)] p-3 text-sm">
              <span className="text-[var(--neutral-500)]">跳至</span>
              <input className="h-8 w-16 rounded-sm border border-[var(--neutral-300)] bg-white px-2 text-center text-sm outline-none" defaultValue="3" />
              <span className="text-[var(--neutral-500)]">/ 12 页</span>
            </div>
          </div>
          <div className="rounded-sm border border-[var(--neutral-200)] bg-white p-6">
            <h3 className="mb-3 text-sm font-semibold text-[var(--neutral-900)]">每页条数</h3>
            <p className="mb-3 text-sm leading-6 text-[var(--neutral-600)]">
              建议支持 10 / 20 / 50 / 100 条切换，默认 20 条。常用于数据量较大的表格场景。
            </p>
            <div className="flex items-center gap-2 rounded-sm bg-[var(--neutral-50)] p-3 text-sm">
              <span className="text-[var(--neutral-500)]">每页</span>
              <span className="inline-flex items-center gap-1 rounded-sm border border-[var(--neutral-300)] bg-white px-3 py-1.5 text-sm text-[var(--neutral-700)]">
                20 <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 4l3 3 3-3"/></svg>
              </span>
              <span className="text-[var(--neutral-500)]">条</span>
            </div>
          </div>
        </div>
      </section>
      <SectionHeading eyebrow="Guidelines" title="使用建议" />
        <SpecList
          items={[
            "分页通常放在表格或列表底部右侧，保持操作位置稳定。",
            "当前页使用黑色填充，不使用品牌红表达普通选中。",
            "数据量较小时可不展示分页，减少界面噪音。",
            "移动端可简化为上一页/下一页和当前页信息。",
          ]}
        />
      </section>
    </div>
  );
}
