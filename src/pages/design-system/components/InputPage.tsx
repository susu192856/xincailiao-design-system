import { MagnifyingGlass } from "@phosphor-icons/react";
import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import { Input } from "../../../components/ui/Input";

export default function InputPage() {
  return (
    <div className="space-y-16">
      <PageHeader title="输入框" description="输入框用于采集短文本、关键参数和筛选条件，适用于表单、搜索、参数面板等高频场景。" />

      <section>
        <SectionHeading eyebrow="Variants" title="输入框类型" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="基础输入">
            <div className="space-y-4">
              <Input label="材料名称" placeholder="请输入材料名称" helperText="用于材料数据检索和资产命名。" />
              <Input label="搜索" placeholder="搜索数据资产" icon={<MagnifyingGlass className="h-4 w-4" />} />
            </div>
          </ExampleCard>
          <ExampleCard title="状态输入">
            <div className="space-y-4">
              <Input label="样品编号" placeholder="MAT-2026-001" />
              <Input label="错误状态" placeholder="请输入编号" error="编号不能为空" />
              <Input label="禁用状态" value="系统自动生成" disabled readOnly />
            </div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Sizes" title="输入框尺寸" />
        <ExampleCard title="Small / Medium / Large">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Input size="sm" label="Small" placeholder="紧凑表格筛选" />
            <Input size="md" label="Medium" placeholder="默认表单输入" />
            <Input size="lg" label="Large" placeholder="重点参数输入" />
          </div>
        </ExampleCard>
      </section>

      <section>
        <SectionHeading eyebrow="Guidelines" title="使用建议" />
        <SpecList
          items={[
            "默认使用 Medium 尺寸，表格筛选和工具栏可使用 Small。",
            "错误状态必须显示明确原因，不只依赖红色边框。",
            "搜索输入建议使用前置图标，帮助用户快速识别用途。",
            "后台高频表单应保持左对齐，避免过长输入宽度影响阅读。",
          ]}
        />
      </section>
    </div>
  );
}
