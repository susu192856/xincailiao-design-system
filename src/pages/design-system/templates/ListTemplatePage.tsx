import { Funnel, MagnifyingGlass, Plus } from "@phosphor-icons/react";
import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { Pagination } from "../../../components/ui/Pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/Table";
import { Tag } from "../../../components/ui/Tag";

const dataAssets = [
  {
    name: "高温合金性能数据集",
    category: "材料性能",
    owner: "材库运营组",
    status: "已发布",
    updateTime: "2026-05-18",
  },
  {
    name: "热处理工艺实验批次",
    category: "工艺参数",
    owner: "实验数据组",
    status: "待审核",
    updateTime: "2026-05-16",
  },
  {
    name: "相图预测任务结果",
    category: "AI 应用",
    owner: "模型平台",
    status: "计算中",
    updateTime: "2026-05-14",
  },
  {
    name: "复合材料供应链目录",
    category: "数据空间",
    owner: "可信流通组",
    status: "已驳回",
    updateTime: "2026-05-12",
  },
];

const statusVariant = {
  已发布: "success",
  待审核: "warning",
  计算中: "product",
  已驳回: "error",
} as const;

export default function ListTemplatePage() {
  return (
    <div className="space-y-16">
      <PageHeader
        title="列表页模板"
        description="列表页用于承载数据资产、业务记录、任务结果和后台配置项，强调筛选效率、批量浏览和状态判断。"
      />

      <section>
        <SectionHeading
          eyebrow="List Template"
          title="基础结构"
          description="列表页通常由页面标题、筛选区、数据表格、批量操作和分页组成。后台与数据产品优先保证信息密度和操作稳定性。"
        />

        <ExampleCard title="数据资产列表" description="示例展示数据空间、材库和 AI 应用中最常见的后台列表结构。">
          <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="grid flex-1 grid-cols-1 gap-3 md:grid-cols-3">
              <Input
                label="关键词"
                placeholder="搜索数据资产名称"
                icon={<MagnifyingGlass className="h-4 w-4" weight="regular" />}
              />
              <Input label="分类" placeholder="全部分类" />
              <Input label="状态" placeholder="全部状态" />
            </div>
            <div className="flex shrink-0 gap-2">
              <Button variant="outline" tone="neutral" icon={<Funnel className="h-4 w-4" weight="regular" />}>
                筛选
              </Button>
              <Button tone="neutral" icon={<Plus className="h-4 w-4" weight="regular" />}>
                新增数据
              </Button>
            </div>
          </div>

          <div className="overflow-hidden rounded-sm border border-[var(--neutral-200)]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>数据名称</TableHead>
                  <TableHead>分类</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>归属</TableHead>
                  <TableHead>更新时间</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dataAssets.map((item) => (
                  <TableRow key={item.name}>
                    <TableCell className="font-medium text-[var(--neutral-900)]">{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>
                      <Tag variant={statusVariant[item.status as keyof typeof statusVariant]} size="sm">
                        {item.status}
                      </Tag>
                    </TableCell>
                    <TableCell>{item.owner}</TableCell>
                    <TableCell>{item.updateTime}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="text" tone="neutral" size="sm">
                        查看
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-xs text-[var(--neutral-500)]">共 128 条数据，当前展示 1-10 条</p>
            <Pagination page={1} total={5} />
          </div>
        </ExampleCard>
      </section>

      <section>
        <SectionHeading eyebrow="Guidelines" title="使用建议" />
        <SpecList
          items={[
            "列表页优先服务检索、筛选、浏览和批量判断，不承载过多解释性内容。",
            "筛选项应按使用频率排序，高频条件前置，低频条件收进更多筛选。",
            "状态字段必须使用明确标签，避免仅依赖颜色判断业务状态。",
            "操作列保持稳定位置，常用动作用短文案，危险动作进入二次确认流程。",
          ]}
        />
      </section>
    </div>
  );
}
