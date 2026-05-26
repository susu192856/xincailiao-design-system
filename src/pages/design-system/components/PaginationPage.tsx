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
