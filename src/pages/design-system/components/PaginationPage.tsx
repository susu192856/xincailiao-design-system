import { useState } from "react";
import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import { Checkbox } from "../../../components/ui/Checkbox";
import { Pagination } from "../../../components/ui/Pagination";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow } from "../../../components/ui/Table";
import { Tag } from "../../../components/ui/Tag";

const compositionRows = [
  ["TC4 钛合金", "2026-06-04"],
  ["高温合金 GH4169", "2026-06-03"],
  ["铝合金 6061", "2026-06-02"],
] as const;

export default function PaginationPage() {
  const [page, setPage] = useState(6);
  const [pageSize, setPageSize] = useState(20);
  const [jumpPage, setJumpPage] = useState("3");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const allRowsSelected = selectedRows.length === compositionRows.length;
  const someRowsSelected = selectedRows.length > 0 && !allRowsSelected;

  const toggleAllRows = () => {
    setSelectedRows(allRowsSelected ? [] : compositionRows.map(([item]) => item));
  };

  const toggleRow = (item: string) => {
    setSelectedRows((current) => current.includes(item) ? current.filter((value) => value !== item) : [...current, item]);
  };

  return (
    <div className="space-y-16">
      <PageHeader title="分页" description="分页用于切分大量列表和表格数据，帮助用户在明确范围内浏览、定位和操作。" />

      <section>
        <SectionHeading eyebrow="Variants" title="分页类型" description="后台分页以可定位和稳定操作为主，当前页使用中性黑，不使用品牌红表达普通选中。" />
        <div className="grid grid-cols-1 gap-5">
          <ExampleCard title="短分页" description="总页数不超过 7 页时直接显示全部页码，适合搜索结果和中小型列表。">
            <Pagination page={2} total={6} />
          </ExampleCard>
          <ExampleCard
            title="长分页折叠"
            description={`总页数超过 7 页时保留首尾、当前页邻近页和省略号；当前为第 ${page} 页，可直接切换。`}
            interactive
            code={`const [page, setPage] = useState(6);\n\n<Pagination\n  page={page}\n  total={18}\n  onPageChange={setPage}\n/>`}
          >
            <Pagination page={page} total={18} onPageChange={setPage} />
          </ExampleCard>
          <ExampleCard title="紧凑分页" description="只显示上一页、当前页 / 总页数和下一页，用于窄容器、侧栏及移动端。">
            <Pagination page={3} total={12} compact size="sm" />
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Sizes" title="分页尺寸" description="尺寸只改变页码按钮高度和文字大小，不改变信息结构；窄屏仍优先切换为紧凑分页。" />
        <div className="grid grid-cols-1 gap-5">
          <ExampleCard title="小尺寸（Small）· 28px" description="用于紧凑表格、窄工具栏和信息密度较高的后台页面。"><Pagination page={2} total={6} size="sm" /></ExampleCard>
          <ExampleCard title="中尺寸（Medium）· 32px" description="常规列表、搜索结果和默认后台页面使用的标准尺寸。"><Pagination page={2} total={6} size="md" /></ExampleCard>
        </div>
        <div className="mt-5"><ExampleCard title="禁用状态" description="仅用于整组分页暂不可操作的场景；首尾按钮在边界页由组件自动单独禁用。"><Pagination page={1} total={4} disabled /></ExampleCard></div>
      </section>

      <section>
        <SectionHeading eyebrow="Extensions" title="扩展能力" description="数据量较大时可配合页码跳转和每页条数切换，但不要让分页控件挤占表格主要操作区。" />
        <div className="grid grid-cols-1 gap-5">
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
        <SectionHeading eyebrow="Composition" title="表格组合" description="分页作为无外边框的表格底部（footer）紧接数据区；表格边框用于区分数据区与底部，总数放在左侧，分页放在右侧。" />
        <div className="border border-[var(--neutral-200)] bg-white p-6">
          <div className="bg-white">
            <TableContainer><Table density="compact" className="min-w-[640px]"><TableHeader><TableRow><TableHead className="w-10"><Checkbox aria-label="全选当前页" size="sm" checked={allRowsSelected} indeterminate={someRowsSelected} onChange={toggleAllRows} /></TableHead><TableHead>材料名称</TableHead><TableHead>数据状态</TableHead><TableHead>更新时间</TableHead></TableRow></TableHeader><TableBody>{compositionRows.map(([item, date]) => <TableRow key={item}><TableCell><Checkbox aria-label={`选择 ${item}`} size="sm" checked={selectedRows.includes(item)} onChange={() => toggleRow(item)} /></TableCell><TableCell>{item}</TableCell><TableCell><Tag variant="success" size="sm" dot>已治理</Tag></TableCell><TableCell className="tabular-nums">{date}</TableCell></TableRow>)}</TableBody></Table></TableContainer>
            <div className="flex flex-col gap-3 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <span className="shrink-0 whitespace-nowrap text-sm text-[var(--text-tertiary)]">共 356 条，当前展示 101–120 条</span>
              <Pagination page={6} total={18} className="sm:w-auto sm:flex-1 sm:justify-end" />
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Guidelines" title="最佳实践" />
        <SpecList
          items={[
            "分页作为无外边框的表格 footer 紧接数据区；总数单行显示在左侧，分页放在右侧。",
            "总页数不超过 7 页使用短分页；超过 7 页使用长分页折叠；窄容器自动切换紧凑分页，不允许页码折行。",
            "Small 用于紧凑表格，Medium 用于常规页面；同一页面内保持尺寸一致。",
            "当前页使用黑色填充，不使用品牌红表达普通选中。",
            "数据量较小时可不展示分页，减少界面噪音。",
          ]}
        />
      </section>
    </div>
  );
}
