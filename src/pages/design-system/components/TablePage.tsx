import { MagnifyingGlass } from "@phosphor-icons/react";
import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import { Button } from "../../../components/ui/Button";
import { Checkbox } from "../../../components/ui/Checkbox";
import { Empty } from "../../../components/ui/Empty";
import { Input } from "../../../components/ui/Input";
import { Pagination } from "../../../components/ui/Pagination";
import { Select } from "../../../components/ui/Select";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableEmpty,
  TableHead,
  TableHeader,
  TableRow,
  TableSkeletonRows,
} from "../../../components/ui/Table";
import { Tag } from "../../../components/ui/Tag";

const rows = [
  { name: "TC4 钛合金性能数据集", type: "金属材料", status: "已发布", owner: "材料中心", updated: "2026-06-04" },
  { name: "复合材料实验批次", type: "复合材料", status: "待审核", owner: "实验室", updated: "2026-06-02" },
  { name: "相图预测结果", type: "AI 结果", status: "异常", owner: "模型平台", updated: "2026-05-29" },
];

function StatusTag({ status }: { status: string }) {
  if (status === "已发布") return <Tag variant="success" size="sm">已发布</Tag>;
  if (status === "待审核") return <Tag variant="warning" size="sm">待审核</Tag>;
  return <Tag variant="error" size="sm">异常</Tag>;
}

export default function TablePage() {
  return (
    <div className="space-y-16">
      <PageHeader title="表格" description="表格用于展示高密度结构化数据，是数据空间、材库和后台管理系统最核心的信息容器。" />

      <section>
        <SectionHeading eyebrow="Data Table" title="基础表格" />
        <ExampleCard title="数据资产列表" description="默认表格由筛选区、批量操作区、数据表体和分页组成，适合后台高频浏览与处理。">
          <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-[1fr_160px_160px_auto]">
            <Input size="sm" placeholder="搜索数据资产" icon={<MagnifyingGlass className="h-4 w-4" />} />
            <Select size="sm" placeholder="数据状态" options={[{ label: "全部状态", value: "all" }, { label: "已发布", value: "published" }, { label: "待审核", value: "review" }]} />
            <Select size="sm" placeholder="材料类型" options={[{ label: "全部类型", value: "all" }, { label: "金属材料", value: "metal" }, { label: "复合材料", value: "composite" }]} />
            <Button size="sm" tone="product">筛选</Button>
          </div>
          <div className="mb-3 flex items-center justify-between rounded-sm bg-[var(--neutral-50)] px-3 py-2">
            <p className="text-xs text-[var(--neutral-600)]">已选择 2 项，可进行批量发布、导出或权限配置。</p>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">批量导出</Button>
              <Button size="sm" variant="ghost">权限配置</Button>
            </div>
          </div>
          <TableContainer>
            <Table density="compact">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10"><Checkbox aria-label="全选" /></TableHead>
                  <TableHead>名称</TableHead>
                  <TableHead>类型</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>归属</TableHead>
                  <TableHead>更新时间</TableHead>
                  <TableHead align="right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow
                    key={row.name}
                    selected={index < 2}
                    className={index === 2 ? "bg-[var(--error-bg)]/40" : "hover:bg-[var(--neutral-50)]"}
                  >
                    <TableCell><Checkbox aria-label={`选择 ${row.name}`} defaultChecked={index < 2} /></TableCell>
                    <TableCell className="font-medium text-[var(--neutral-900)]">{row.name}</TableCell>
                    <TableCell>{row.type}</TableCell>
                    <TableCell><StatusTag status={row.status} /></TableCell>
                    <TableCell>{row.owner}</TableCell>
                    <TableCell>{row.updated}</TableCell>
                    <TableCell align="right">
                      <div className="inline-flex items-center gap-3">
                        <Button variant="text" tone="product" size="sm" className="h-auto px-0 py-0">查看</Button>
                        <Button variant="text" tone="product" size="sm" className="h-auto px-0 py-0">编辑</Button>
                        <Button variant="text" tone="danger" size="sm" className="h-auto px-0 py-0">处理</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination className="mt-4 justify-end" page={1} total={4} />
        </ExampleCard>
      </section>

      <section>
        <SectionHeading eyebrow="States" title="表格状态" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <ExampleCard title="加载中">
            <TableContainer>
              <Table density="compact">
                <TableBody>
                  <TableSkeletonRows rows={4} columns={3} />
                </TableBody>
              </Table>
            </TableContainer>
            <p className="mt-4 text-xs leading-5 text-[var(--neutral-500)]">表格首次加载使用骨架屏，避免页面跳动。</p>
          </ExampleCard>
          <ExampleCard title="空状态">
            <TableContainer>
              <Table density="compact">
                <TableBody>
                  <TableEmpty colSpan={3} title="暂无数据资产" description="调整筛选条件或新建数据资产后再查看。" />
                </TableBody>
              </Table>
            </TableContainer>
            <div className="mt-3">
              <Empty title="筛选无结果" description="清空条件后重新查询。" action={<Button size="sm">清空筛选</Button>} />
            </div>
          </ExampleCard>
          <ExampleCard title="异常行">
            <TableContainer>
              <Table density="compact">
                <TableBody>
                  <TableRow className="bg-[var(--error-bg)]/40">
                    <TableCell className="font-medium text-[var(--neutral-900)]">相图预测结果</TableCell>
                    <TableCell><Tag variant="error" size="sm">异常</Tag></TableCell>
                    <TableCell align="right"><Button variant="text" tone="danger" size="sm" className="h-auto px-0 py-0">查看原因</Button></TableCell>
                  </TableRow>
                  <TableRow disabled>
                    <TableCell>历史归档数据</TableCell>
                    <TableCell><Tag variant="neutral" size="sm">已归档</Tag></TableCell>
                    <TableCell align="right">不可编辑</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <p className="mt-4 text-xs leading-5 text-[var(--neutral-500)]">异常行使用浅错误背景和错误标签，禁用行需要降低对比度并保留可读信息。</p>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Access" title="权限与部分可用" description="后台表格经常出现无权限、部分字段脱敏、操作禁用等状态，必须在代码和 Figma 中有明确表达。" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="无权限表格">
            <TableContainer>
              <Table density="compact">
                <TableHeader>
                  <TableRow>
                    <TableHead>数据资产</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead align="right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableEmpty
                    colSpan={3}
                    title="暂无访问权限"
                    description="当前账号无权查看该数据空间，请联系管理员申请权限。"
                    action={<Button variant="outline" tone="product" size="sm">申请权限</Button>}
                  />
                </TableBody>
              </Table>
            </TableContainer>
          </ExampleCard>
          <ExampleCard title="部分字段脱敏">
            <TableContainer>
              <Table density="compact">
                <TableHeader>
                  <TableRow>
                    <TableHead>材料名称</TableHead>
                    <TableHead>供应商</TableHead>
                    <TableHead>权限</TableHead>
                    <TableHead align="right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium text-[var(--neutral-900)]">高温合金样件</TableCell>
                    <TableCell>**** 材料科技</TableCell>
                    <TableCell><Tag variant="warning" size="sm">部分可见</Tag></TableCell>
                    <TableCell align="right"><Button variant="text" tone="product" size="sm" className="h-auto px-0 py-0">申请解锁</Button></TableCell>
                  </TableRow>
                  <TableRow disabled>
                    <TableCell>历史实验批次</TableCell>
                    <TableCell>无权限</TableCell>
                    <TableCell><Tag variant="neutral" size="sm">不可见</Tag></TableCell>
                    <TableCell align="right">不可操作</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Density" title="表格密度" />
        <ExampleCard title="后台高密度与详情页舒适密度" description="后台列表默认使用 compact；详情页字段较少时可使用 standard 或 comfortable。">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <TableContainer>
              <Table density="compact">
                <TableHeader>
                  <TableRow>
                    <TableHead>字段</TableHead>
                    <TableHead>值</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow><TableCell>密度</TableCell><TableCell>compact</TableCell></TableRow>
                  <TableRow><TableCell>高度</TableCell><TableCell>约 36px</TableCell></TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <TableContainer>
              <Table density="comfortable">
                <TableHeader>
                  <TableRow>
                    <TableHead>字段</TableHead>
                    <TableHead>值</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow><TableCell>密度</TableCell><TableCell>comfortable</TableCell></TableRow>
                  <TableRow><TableCell>场景</TableCell><TableCell>详情说明、审计摘要</TableCell></TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </ExampleCard>
      </section>

      <section>
        <SectionHeading eyebrow="Overflow" title="横向溢出与列对齐" description="字段较多的后台表格不能压缩到不可读，使用横向滚动承载宽表格，并保持数值、金额、百分比右对齐。" />
        <ExampleCard title="宽表格 · 材料参数" description="表格最小宽度可大于容器宽度，外层 TableContainer 负责横向滚动。">
          <TableContainer>
            <Table density="compact" className="min-w-[860px]">
              <TableHeader>
                <TableRow>
                  <TableHead>材料牌号</TableHead>
                  <TableHead>数据来源</TableHead>
                  <TableHead align="right">抗拉强度 MPa</TableHead>
                  <TableHead align="right">屈服强度 MPa</TableHead>
                  <TableHead align="right">延伸率 %</TableHead>
                  <TableHead>权限</TableHead>
                  <TableHead align="right">更新时间</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  ["TC4", "实验室复核", "895", "825", "13.5", "团队可见", "2026-06-04"],
                  ["GH4169", "标准导入", "1,270", "1,030", "18.0", "空间可见", "2026-06-02"],
                  ["6061-T6", "材库治理", "310", "276", "12.0", "内部共享", "2026-05-30"],
                ].map((row) => (
                  <TableRow key={row[0]}>
                    <TableCell className="font-medium text-[var(--neutral-900)]">{row[0]}</TableCell>
                    <TableCell>{row[1]}</TableCell>
                    <TableCell align="right" className="font-mono">{row[2]}</TableCell>
                    <TableCell align="right" className="font-mono">{row[3]}</TableCell>
                    <TableCell align="right" className="font-mono">{row[4]}</TableCell>
                    <TableCell><Tag variant="product" size="sm">{row[5]}</Tag></TableCell>
                    <TableCell align="right">{row[6]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <p className="mt-3 text-xs leading-5 text-[var(--neutral-500)]">文本列左对齐，数字列右对齐并使用等宽数字；操作列固定在最右侧时也保持右对齐。</p>
        </ExampleCard>
      </section>

      <section>
        <SectionHeading eyebrow="Patterns" title="后台表格规则" />
        <SpecList
          items={[
            "表格适合高密度结构化数据，不用卡片替代批量字段浏览。",
            "状态字段使用语义标签，操作列固定在右侧并保持短文案。",
            "筛选、批量操作、分页是后台表格的标准组合。",
            "无权限、脱敏、禁用行要在表格内清晰表达，避免用户误判为加载失败。",
            "字段过多时使用横向滚动，不强行压缩列宽；数字、金额、百分比等可比较数据统一右对齐。",
            "列表页优先使用 compact 密度；详情页或审计记录可使用 standard 或 comfortable。",
            "空、加载、错误、无权限、部分选中等状态必须在 Figma 和代码中都可调用。",
          ]}
        />
      </section>
    </div>
  );
}
