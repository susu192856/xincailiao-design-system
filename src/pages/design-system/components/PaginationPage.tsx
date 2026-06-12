import { useState } from "react";
import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import { Checkbox } from "../../../components/ui/Checkbox";
import { Pagination } from "../../../components/ui/Pagination";

export default function PaginationPage() {
  const [page, setPage] = useState(6);
  const [pageSize, setPageSize] = useState(20);
  const [jumpPage, setJumpPage] = useState("3");

  return (
    <div className="space-y-16">
      <PageHeader title="分页" description="分页用于切分大量列表和表格数据，帮助用户在明确范围内浏览、定位和操作。" />

      <section>
        <SectionHeading eyebrow="Variants" title="分页类型" description="后台分页以可定位和稳定操作为主，当前页使用中性黑，不使用品牌红表达普通选中。" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="短分页">
            <Pagination page={2} total={6} />
          </ExampleCard>
          <ExampleCard title="长分页折叠">
            <Pagination page={page} total={18} totalItems={356} pageSize={20} showTotal onPageChange={setPage} />
          </ExampleCard>
          <ExampleCard title="紧凑分页">
            <Pagination page={3} total={12} compact size="sm" />
          </ExampleCard>
          <ExampleCard title="禁用状态">
            <Pagination page={1} total={4} disabled />
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Extensions" title="扩展能力" description="数据量较大时可配合页码跳转和每页条数切换，但不要让分页控件挤占表格主要操作区。" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="快速跳转">
            <div className="rounded-sm bg-[var(--neutral-50)] p-4">
              <Pagination
                page={3}
                total={12}
                compact
                showQuickJumper
                jumpValue={jumpPage}
                onJumpValueChange={setJumpPage}
                onJump={setPage}
              />
            </div>
          </ExampleCard>
          <ExampleCard title="每页条数">
            <div className="rounded-sm bg-[var(--neutral-50)] p-4">
              <Pagination
                page={page}
                total={18}
                totalItems={356}
                pageSize={pageSize}
                showTotal
                pageSizeOptions={[10, 20, 50]}
                onPageSizeChange={setPageSize}
              />
            </div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Composition" title="表格组合" description="分页通常位于表格底部右侧；如需展示总数和每页条数，放在同一行左侧，保持扫描路径稳定。" />
        <div className="rounded-sm bg-white p-6">
          <div className="overflow-hidden rounded-sm border border-[var(--neutral-200)]">
            <div className="grid grid-cols-[40px_1fr_1fr_120px] bg-[var(--neutral-50)] px-4 py-3 text-xs text-[var(--neutral-500)]">
              <span />
              <span>材料名称</span>
              <span>数据状态</span>
              <span>更新时间</span>
            </div>
            {["TC4 钛合金", "高温合金 GH4169", "铝合金 6061"].map((item) => (
              <div key={item} className="grid grid-cols-[40px_1fr_1fr_120px] border-t border-[var(--neutral-100)] px-4 py-3 text-sm">
                <span><Checkbox aria-label={`选择 ${item}`} size="sm" /></span>
                <span className="text-[var(--neutral-900)]">{item}</span>
                <span className="text-[var(--neutral-600)]">已治理</span>
                <span className="text-[var(--neutral-500)]">06-04</span>
              </div>
            ))}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--neutral-200)] px-4 py-3">
              <span className="text-sm text-[var(--neutral-600)]">共 356 条</span>
              <Pagination page={6} total={18} />
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Guidelines" title="使用建议" />
        <SpecList
          items={[
            "分页通常放在表格或列表底部右侧，保持操作位置稳定。",
            "当前页使用黑色填充，不使用品牌红表达普通选中。",
            "数据量较小时可不展示分页，减少界面噪音。",
            "Figma 组件需包含短分页、长分页、禁用、紧凑、跳转、每页条数状态。",
          ]}
        />
      </section>
    </div>
  );
}
