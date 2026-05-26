import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import { Button } from "../../../components/ui/Button";
import { Pagination } from "../../../components/ui/Pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/Table";
import { Tag } from "../../../components/ui/Tag";

export default function TablePage() {
  const rows = [
    { name: "高温合金数据集", type: "金属材料", status: "已发布", owner: "材料中心" },
    { name: "复合材料实验批次", type: "复合材料", status: "待审核", owner: "实验室" },
    { name: "相图预测结果", type: "AI结果", status: "异常", owner: "模型平台" },
  ];

  return (
    <div className="space-y-16">
      <PageHeader title="表格" description="表格用于展示高密度结构化数据，是后台系统、数据空间和材库的核心信息容器。" />

      <section>
        <SectionHeading eyebrow="Data Table" title="基础表格" />
        <ExampleCard title="数据资产列表" description="表格应保持清晰边界、稳定列宽和可预测操作入口。">
          <div className="overflow-hidden rounded-sm border border-[var(--neutral-200)]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>名称</TableHead>
                  <TableHead>类型</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>归属</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell className="font-medium text-[var(--neutral-900)]">{row.name}</TableCell>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>
                      <Tag variant={row.status === "已发布" ? "success" : row.status === "待审核" ? "warning" : "error"} size="sm">
                        {row.status}
                      </Tag>
                    </TableCell>
                    <TableCell>{row.owner}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">查看</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Pagination className="mt-4 justify-end" page={1} total={4} />
        </ExampleCard>
      </section>

      <section>
              <section>
        <SectionHeading eyebrow="Patterns" title="表格常见模式" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="rounded-sm border border-[var(--neutral-200)] bg-white p-6">
            <h3 className="mb-3 text-sm font-semibold text-[var(--neutral-900)]">操作栏设计</h3>
            <p className="mb-3 text-sm leading-6 text-[var(--neutral-600)]">
              操作项 ≤ 3 个：使用文字按钮（Text variant）<br />
              操作项 4-5 个：使用图标按钮 + Tooltip<br />
              操作项 &gt; 5 个：收起为「更多」下拉菜单
            </p>
            <div className="flex items-center gap-3 rounded-sm bg-[var(--neutral-50)] p-3 text-xs">
              <span className="text-[var(--product-blue-500)]">查看</span>
              <span className="text-[var(--neutral-300)]">|</span>
              <span className="text-[var(--product-blue-500)]">编辑</span>
              <span className="text-[var(--neutral-300)]">|</span>
              <span className="text-[var(--error-text)]">删除</span>
            </div>
          </div>
          <div className="rounded-sm border border-[var(--neutral-200)] bg-white p-6">
            <h3 className="mb-3 text-sm font-semibold text-[var(--neutral-900)]">内容截断</h3>
            <p className="mb-3 text-sm leading-6 text-[var(--neutral-600)]">
              长文本自动截断显示省略号，悬停展示完整内容。建议结合响应式断点控制列显隐。
            </p>
            <div className="rounded-sm bg-[var(--neutral-50)] p-3 text-sm">
              <div className="truncate text-[var(--neutral-700)]" title="这是完整的新材料牌号数据描述文本内容">
                这是完整的新材料牌号数据描述文本内容
              </div>
              <div className="mt-1 text-xs text-[var(--neutral-500)]">宽度不足时显示「设计宽度 ≥ 内容宽度」</div>
            </div>
          </div>
        </div>
      </section>
      <SectionHeading eyebrow="Guidelines" title="使用建议" />
        <SpecList
          items={[
            "表格用于高密度数据，不应用卡片替代表格承载批量字段。",
            "状态字段使用语义标签，操作列保持短文案和固定位置。",
            "默认行高保持紧凑，避免后台系统出现过多空白。",
            "表格底部通常与分页组合出现，便于批量浏览。",
          ]}
        />
      </section>
    </div>
  );
}
