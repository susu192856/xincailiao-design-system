import { CaretDown, CaretRight, DotsThree, MagnifyingGlass, TextAlignCenter, TextAlignLeft, TextAlignRight } from "@phosphor-icons/react";
import { Fragment, useState } from "react";
import CodeBlock from "../../../components/docs/CodeBlock";
import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import { Button } from "../../../components/ui/Button";
import { Checkbox } from "../../../components/ui/Checkbox";
import { Empty } from "../../../components/ui/Empty";
import { Input } from "../../../components/ui/Input";
import { Pagination } from "../../../components/ui/Pagination";
import { Select } from "../../../components/ui/Select";
import { Table, TableBody, TableCell, TableContainer, TableEmpty, TableHead, TableHeader, TableRow, TableSkeletonRows } from "../../../components/ui/Table";
import { Tag } from "../../../components/ui/Tag";

const rows = [
  { name: "TC4 钛合金性能数据集", type: "金属材料", status: "已发布", owner: "材料中心", updated: "2026-06-04" },
  { name: "复合材料实验批次", type: "复合材料", status: "待审核", owner: "实验室", updated: "2026-06-02" },
  { name: "相图预测结果", type: "AI 结果", status: "异常", owner: "模型平台", updated: "2026-05-29" },
];

function StatusTag({ status }: { status: string }) {
  if (status === "已发布") return <Tag variant="success" size="sm" dot>已发布</Tag>;
  if (status === "待审核") return <Tag variant="warning" size="sm" dot>待审核</Tag>;
  return <Tag variant="error" size="sm" dot>异常</Tag>;
}

export default function TablePage() {
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(null);
  const [expanded, setExpanded] = useState(true);
  const [openActionMenu, setOpenActionMenu] = useState<string | null>("TC4");

  return (
    <div className="space-y-16">
      <PageHeader title="表格" description="表格用于浏览、比较和批量处理高密度结构化数据。先确认表格类型与列规则，再增加交互、滚动和异常状态。" />

      <section>
        <SectionHeading eyebrow="Overview" title="基本组成" description="后台数据表格通常由筛选区、批量操作区、表头与数据行、分页五部分组成；没有对应功能时可以省略筛选、批量操作或分页。" />
        <ExampleCard title="数据资产列表" description="这是默认完整结构，不用于讲解所有边界状态；下方模块分别解释每一项规则。">
          <div className="mb-4 flex flex-wrap items-end gap-2">
            <Input size="sm" className="w-full min-w-0 sm:w-[180px] sm:shrink-0" aria-label="搜索数据资产" placeholder="搜索数据资产" icon={<MagnifyingGlass className="h-4 w-4" />} />
            <div className="w-full min-w-0 sm:min-w-[210px] sm:flex-1"><Select size="sm" label="数据状态" labelPosition="left" labelWidth={64} placeholder="全部状态" options={[{ label: "全部状态", value: "all" }, { label: "已发布", value: "published" }, { label: "待审核", value: "review" }]} /></div>
            <div className="w-full min-w-0 sm:min-w-[210px] sm:flex-1"><Select size="sm" label="材料类型" labelPosition="left" labelWidth={64} placeholder="全部类型" options={[{ label: "全部类型", value: "all" }, { label: "金属材料", value: "metal" }, { label: "复合材料", value: "composite" }]} /></div>
            <Button size="sm" tone="product">筛选</Button>
          </div>
          <div className="mb-3 flex flex-col gap-2 bg-[var(--neutral-50)] px-3 py-2 sm:flex-row sm:items-center sm:justify-between"><p className="text-xs text-[var(--text-tertiary)]">已选择 2 项，可进行批量操作。</p><div className="flex gap-2"><Button size="sm" variant="outline">批量导出</Button><Button size="sm" variant="ghost">权限配置</Button></div></div>
          <TableContainer>
            <Table density="compact" className="min-w-[760px]">
              <TableHeader><TableRow><TableHead className="w-10"><Checkbox size="sm" aria-label="全选" indeterminate /></TableHead><TableHead>名称</TableHead><TableHead>类型</TableHead><TableHead>状态</TableHead><TableHead>归属</TableHead><TableHead>更新时间</TableHead><TableHead>操作</TableHead></TableRow></TableHeader>
              <TableBody>{rows.map((row, index) => <TableRow key={row.name} selected={index < 2} className="hover:bg-[var(--neutral-50)]"><TableCell><Checkbox size="sm" aria-label={`选择 ${row.name}`} defaultChecked={index < 2} /></TableCell><TableCell>{row.name}</TableCell><TableCell>{row.type}</TableCell><TableCell><StatusTag status={row.status} /></TableCell><TableCell>{row.owner}</TableCell><TableCell className="tabular-nums">{row.updated}</TableCell><TableCell><Button variant="text" tone="product" size="sm" className="!h-auto !px-0 !py-0">查看</Button></TableCell></TableRow>)}</TableBody>
            </Table>
          </TableContainer>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><p className="shrink-0 whitespace-nowrap text-xs text-[var(--text-tertiary)]">共 128 条，当前展示 1–3 条</p><Pagination page={1} total={4} className="justify-end sm:flex-1" /></div>
        </ExampleCard>
      </section>

      <section>
        <SectionHeading eyebrow="Type & Density" title="类型与行高" description="先选择通栏或格子类型，再根据使用频率和信息量选择行高。不要用更密的行高弥补字段规划问题。" />
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          <ExampleCard title="通栏型 · 默认" description="只有横向分隔线，适合资产列表、账号管理和审批记录。"><TableContainer><Table density="compact" variant="line"><TableHeader><TableRow><TableHead>材料名称</TableHead><TableHead>分类</TableHead><TableHead align="right">数量</TableHead></TableRow></TableHeader><TableBody><TableRow><TableCell>TC4 钛合金</TableCell><TableCell>金属材料</TableCell><TableCell align="right" className="tabular-nums">1,280</TableCell></TableRow><TableRow><TableCell>GH4169 高温合金</TableCell><TableCell>金属材料</TableCell><TableCell align="right" className="tabular-nums">896</TableCell></TableRow></TableBody></Table></TableContainer></ExampleCard>
          <ExampleCard title="格子型 · 逐格核对" description="同时分隔行列，只用于参数矩阵、报价对比和可编辑数据。"><TableContainer><Table density="compact" variant="grid"><TableHeader><TableRow><TableHead>牌号</TableHead><TableHead align="center">批次</TableHead><TableHead align="right">强度 MPa</TableHead></TableRow></TableHeader><TableBody><TableRow><TableCell>TC4</TableCell><TableCell align="center">A-07</TableCell><TableCell align="right" className="tabular-nums">895.00</TableCell></TableRow><TableRow><TableCell>GH4169</TableCell><TableCell align="center">B-12</TableCell><TableCell align="right" className="tabular-nums">1,270.00</TableCell></TableRow></TableBody></Table></TableContainer></ExampleCard>
        </div>
        <h3 className="mb-3 mt-6 text-base font-semibold text-[var(--text-primary)]">行高</h3>
        <div className="grid gap-px overflow-hidden border border-[var(--neutral-200)] bg-[var(--neutral-200)] md:grid-cols-3">{[["小", 36, "compact", "高频后台列表、批量处理、字段较多"], ["中", 44, "standard", "常规管理页、默认触控场景、混合图文"], ["大", 52, "comfortable", "详情对比、审计摘要、低频阅读"]].map(([name, height, value, scene]) => <div key={name} className="bg-white p-5"><div className="flex items-baseline justify-between gap-3"><p className="text-sm font-semibold text-[var(--text-primary)]">{name} · {height}px</p><span className="text-xs text-[var(--text-tertiary)]">{value}</span></div><div className="mt-4 flex h-14 items-end"><div className="flex w-full items-center justify-between border-y border-[var(--neutral-200)] bg-[var(--neutral-50)] px-3 text-xs text-[var(--text-secondary)]" style={{ height: `${height}px` }}><span>示例数据行</span><span className="tabular-nums">{height}px</span></div></div><p className="mt-4 text-xs leading-5 text-[var(--text-secondary)]">{scene}</p></div>)}</div>
      </section>

      <section>
        <SectionHeading eyebrow="Spacing" title="列间距" description="表格不单独使用间隙属性（gap）控制列距；相邻列的内容间距由两个单元格的左右内边距共同产生，并随行高密度统一变化。" />
        <ExampleCard title="由单元格内边距形成列距" description="空间不足时调整列宽、精简字段或在 TableContainer 内启用横向滚动，不把相邻列内容压缩到 24px 以下。">
          <div className="grid gap-px overflow-hidden border border-[var(--neutral-200)] bg-[var(--neutral-200)] md:grid-cols-3">
            {[
              ["小 · compact", 12, 24, "高频后台列表"],
              ["中 · standard", 16, 32, "常规管理页面"],
              ["大 · comfortable", 20, 40, "低频阅读与详情对比"],
            ].map(([name, padding, distance, scene]) => (
              <div key={name} className="bg-white p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{name}</p>
                  <span className="text-xs text-[var(--text-tertiary)]">单侧 {padding}px</span>
                </div>
                <div className="mt-4 flex overflow-hidden border border-[var(--neutral-200)] bg-[var(--neutral-50)]" aria-label={`${name} 相邻列内容间距 ${distance}px`}>
                  {["列 A", "列 B"].map((label) => (
                    <div key={label} className="min-w-0 flex-1 border-r border-[var(--neutral-200)] py-3 last:border-r-0" style={{ paddingInline: `${padding}px` }}>
                      <div className="truncate bg-[var(--product-blue-50)] px-2 py-1 text-center text-xs text-[var(--text-secondary)]">{label}</div>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs leading-5 text-[var(--text-secondary)]">相邻内容间距 {distance}px · {scene}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="border-l-2 border-[var(--product-blue-300)] bg-[var(--neutral-50)] px-4 py-3 text-xs leading-5 text-[var(--text-secondary)]"><strong className="text-[var(--text-primary)]">设计规则：</strong>列宽负责分配内容空间，单元格内边距负责形成列距；不要在表格（table）、表格行（tr）或单元格之间追加间隙属性（gap）。</div>
            <div className="border-l-2 border-[var(--neutral-300)] bg-[var(--neutral-50)] px-4 py-3 text-xs leading-5 text-[var(--text-secondary)]"><strong className="text-[var(--text-primary)]">空间不足：</strong>优先调整列宽或隐藏低优先级列；必须保留的多列在表格容器内横向滚动。</div>
          </div>
        </ExampleCard>
      </section>

      <section>
        <SectionHeading eyebrow="Columns" title="内容与对齐" description="通栏型与格子型共用同一套语义对齐规则；区别只在分隔方式和比较强度，不改变内容方向。" />
        <ExampleCard title="共用对齐规则" description="表头与正文均为 14px；表头使用中性色 600 加半粗字重（Semibold），正文使用中性色 800 加常规字重（Regular）。">
          <div className="mt-2 grid gap-4 sm:grid-cols-3">
            <div className="border border-[var(--neutral-200)] bg-[var(--neutral-50)] p-5"><span className="inline-flex h-8 w-8 items-center justify-center border border-[var(--neutral-200)] bg-white text-[var(--product-blue-500)]"><TextAlignLeft size={18} aria-hidden="true" /></span><p className="mt-4 text-sm font-semibold text-[var(--text-tertiary)]">左对齐</p><p className="mt-2 text-xs leading-5 text-[var(--text-body)]">名称、描述、日期时间、编号、操作</p></div>
            <div className="border border-[var(--product-blue-100)] bg-[var(--product-blue-50)] p-5 text-center"><span className="inline-flex h-8 w-8 items-center justify-center border border-[var(--product-blue-100)] bg-white text-[var(--product-blue-500)]"><TextAlignCenter size={18} aria-hidden="true" /></span><p className="mt-4 text-sm font-semibold text-[var(--text-tertiary)]">居中</p><p className="mt-2 text-xs leading-5 text-[var(--text-body)]">状态、布尔值、短枚举</p></div>
            <div className="border border-[var(--neutral-300)] bg-[var(--neutral-100)] p-5 text-right"><span className="inline-flex h-8 w-8 items-center justify-center border border-[var(--neutral-200)] bg-white text-[var(--product-blue-500)]"><TextAlignRight size={18} aria-hidden="true" /></span><p className="mt-4 text-sm font-semibold text-[var(--text-tertiary)]">右对齐</p><p className="mt-2 text-xs leading-5 text-[var(--text-body)]">数量、金额、百分比等可比较数值</p></div>
          </div>
          <div className="mt-8 grid gap-6 xl:grid-cols-2">
            <div className="border border-[var(--neutral-200)] bg-[var(--neutral-50)] p-4"><div className="mb-4 flex items-baseline justify-between gap-3"><p className="text-sm font-semibold text-[var(--text-primary)]">通栏型</p><span className="bg-white px-2 py-1 text-xs text-[var(--text-tertiary)]">快速浏览</span></div><TableContainer><Table density="compact" variant="line"><TableHeader><TableRow><TableHead>名称</TableHead><TableHead>更新时间</TableHead><TableHead align="right">数量</TableHead><TableHead>操作</TableHead></TableRow></TableHeader><TableBody><TableRow><TableCell>高温合金样件</TableCell><TableCell className="tabular-nums">2026-06-04</TableCell><TableCell align="right" className="tabular-nums">12,860</TableCell><TableCell><Button variant="text" tone="product" size="sm" className="!h-auto !px-0 !py-0">查看</Button></TableCell></TableRow></TableBody></Table></TableContainer></div>
            <div className="border border-[var(--neutral-300)] bg-[var(--neutral-100)] p-4"><div className="mb-4 flex items-baseline justify-between gap-3"><p className="text-sm font-semibold text-[var(--text-primary)]">格子型</p><span className="bg-white px-2 py-1 text-xs text-[var(--text-tertiary)]">逐格核对</span></div><TableContainer><Table density="compact" variant="grid"><TableHeader><TableRow><TableHead>批次编号</TableHead><TableHead>检测时间</TableHead><TableHead align="center">结论</TableHead><TableHead align="right">强度 MPa</TableHead></TableRow></TableHeader><TableBody><TableRow><TableCell>A-07</TableCell><TableCell className="tabular-nums">2026-06-04 14:30</TableCell><TableCell align="center">合格</TableCell><TableCell align="right" className="tabular-nums">895.00</TableCell></TableRow></TableBody></Table></TableContainer></div>
          </div>
          <p className="mt-6 border-l-2 border-[var(--product-blue-300)] bg-[var(--neutral-50)] px-4 py-3 text-xs leading-5 text-[var(--text-secondary)]"><strong className="text-[var(--text-primary)]">格子型补充：</strong>同一列必须保持相同对齐和精度，竖向边框用于强化单元格对应关系，不作为改变对齐方式的理由。缺失值统一显示“—”，不用 0 代替未知值。</p>
        </ExampleCard>
        <div className="mt-5">
          <ExampleCard title="文本显示" description="默认单行显示，超出列宽后省略；只有描述类内容或阅读型表格允许两行或完整换行。省略内容必须能通过文字提示（Tooltip）、详情或展开行查看全文。">
            <TableContainer><Table density="standard" className="table-fixed min-w-[760px]"><TableHeader><TableRow><TableHead className="w-40">方式</TableHead><TableHead className="w-56">适用场景</TableHead><TableHead>显示示例</TableHead></TableRow></TableHeader><TableBody>
              <TableRow><TableCell className="align-top">单行省略 · 默认</TableCell><TableCell className="min-w-0 align-top"><div className="truncate" title="名称、编号、日期、状态及普通数据列">名称、编号、日期、状态及普通数据列</div></TableCell><TableCell className="min-w-0 align-top"><div className="truncate" title="高温合金材料性能实验数据集与多批次验证结果">高温合金材料性能实验数据集与多批次验证结果</div></TableCell></TableRow>
              <TableRow><TableCell className="align-top">最多两行</TableCell><TableCell className="!whitespace-normal align-top">需要辅助判断的备注、摘要和说明</TableCell><TableCell className="!whitespace-normal align-top"><div className="line-clamp-2" title="该数据集包含高温拉伸、疲劳寿命、热处理工艺、样件来源与多批次复核记录，仅供团队内部审核、质量追踪和后续模型训练评估使用，未经批准不得导出或公开共享。">该数据集包含高温拉伸、疲劳寿命、热处理工艺、样件来源与多批次复核记录，仅供团队内部审核、质量追踪和后续模型训练评估使用，未经批准不得导出或公开共享。</div></TableCell></TableRow>
              <TableRow><TableCell className="align-top">完整换行</TableCell><TableCell className="!whitespace-normal align-top">大行高、低频阅读且必须直接阅读全文</TableCell><TableCell className="!whitespace-normal break-words align-top">审核意见需要在当前视图完整阅读，不依赖悬停或跳转。</TableCell></TableRow>
            </TableBody></Table></TableContainer>
            <p className="mt-3 text-xs leading-5 text-[var(--text-tertiary)]">表头默认单行且不换行；字段名过长时优先缩短名称或增加列宽，不使用多行表头。</p>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Interaction" title="行内交互" description="先保证阅读，再按需增加展开、排序和更多操作；筛选放在表格上方，不塞进表头。" />
        <ExampleCard title="展开、排序与更多操作" description="状态表头保持普通文字；排序支持升序、降序和取消排序，展开内容紧邻所属数据行。">
          <TableContainer><Table density="compact" className="min-w-[680px]"><TableHeader><TableRow><TableHead>数据名称</TableHead><TableHead>状态</TableHead><TableHead align="right" sortable sortDirection={sortDirection} onSort={setSortDirection}>记录数</TableHead><TableHead>操作</TableHead></TableRow></TableHeader><TableBody>{[{ name: "TC4", status: "已发布", count: "1,280" }, { name: "GH4169", status: "待审核", count: "896" }].map((item, index) => <Fragment key={item.name}><TableRow><TableCell>{index === 0 ? <button type="button" className="inline-flex items-center gap-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--focus-ring-color)]" aria-expanded={expanded} aria-label={`${expanded ? "收起" : "展开"} ${item.name}`} onClick={() => setExpanded((value) => !value)}>{expanded ? <CaretDown size={14} /> : <CaretRight size={14} />}{item.name}</button> : item.name}</TableCell><TableCell><StatusTag status={item.status} /></TableCell><TableCell align="right" className="tabular-nums">{item.count}</TableCell><TableCell><div className="relative inline-flex"><Button variant="text" tone="neutral" size="sm" icon={<DotsThree size={18} />} aria-label={`${item.name} 更多操作`} title="更多操作" aria-haspopup="menu" aria-expanded={openActionMenu === item.name} className="h-8 w-8 !px-0" onClick={() => setOpenActionMenu((current) => current === item.name ? null : item.name)} />{openActionMenu === item.name ? <div role="menu" aria-label={`${item.name} 更多操作`} className="absolute right-0 top-full z-30 mt-1 w-36 border border-[var(--neutral-200)] bg-white p-1 text-left shadow-[var(--shadow-lg)]"><button role="menuitem" type="button" className="block w-full px-3 py-2 text-left text-sm text-[var(--text-body)] hover:bg-[var(--neutral-50)]">编辑</button><button role="menuitem" type="button" className="block w-full px-3 py-2 text-left text-sm text-[var(--text-body)] hover:bg-[var(--neutral-50)]">复制</button><button role="menuitem" type="button" className="block w-full px-3 py-2 text-left text-sm text-[var(--text-body)] hover:bg-[var(--neutral-50)]">导出</button><div className="my-1 border-t border-[var(--neutral-200)]" /><button role="menuitem" type="button" className="block w-full px-3 py-2 text-left text-sm text-[var(--error-text)] hover:bg-[var(--error-bg)]">删除</button></div> : null}</div></TableCell></TableRow>{index === 0 && expanded ? <><TableRow className="bg-[var(--neutral-50)]"><TableCell className="pl-8 text-[var(--text-tertiary)]">数据来源</TableCell><TableCell colSpan={3}>实验室复核</TableCell></TableRow><TableRow className="bg-[var(--neutral-50)]"><TableCell className="pl-8 text-[var(--text-tertiary)]">权限范围</TableCell><TableCell colSpan={3}>材料中心团队可见</TableCell></TableRow><TableRow className="bg-[var(--neutral-50)]"><TableCell className="pl-8 text-[var(--text-tertiary)]">最近同步</TableCell><TableCell colSpan={3}>10 分钟前，由自动同步任务更新</TableCell></TableRow></> : null}</Fragment>)}</TableBody></Table></TableContainer>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <div className="border border-[var(--neutral-200)] bg-white p-4"><p className="text-sm font-semibold text-[var(--text-primary)]">1 个操作</p><div className="mt-3"><Button variant="text" tone="product" size="sm" className="!h-auto !px-0 !py-0">查看</Button></div><p className="mt-2 text-xs leading-5 text-[var(--text-secondary)]">直接显示高频文字操作。</p></div>
            <div className="border border-[var(--neutral-200)] bg-white p-4"><p className="text-sm font-semibold text-[var(--text-primary)]">2–3 个操作</p><div className="mt-3 flex gap-4"><Button variant="text" tone="product" size="sm" className="!h-auto !px-0 !py-0">编辑</Button><Button variant="text" tone="product" size="sm" className="!h-auto !px-0 !py-0">复制</Button></div><p className="mt-2 text-xs leading-5 text-[var(--text-secondary)]">最多保留三个短文字，顺序按频率排列。</p></div>
            <div className="border border-[var(--neutral-200)] bg-white p-4"><p className="text-sm font-semibold text-[var(--text-primary)]">4 个及以上</p><div className="mt-2 flex items-center gap-2"><Button variant="text" tone="product" size="sm" className="!h-auto !px-0 !py-0">查看</Button><Button variant="text" tone="neutral" size="sm" icon={<DotsThree size={18} />} aria-label="更多操作" title="更多操作" className="h-8 w-8 !px-0" /></div><p className="mt-2 text-xs leading-5 text-[var(--text-secondary)]">有明确主操作时保留一个文字入口；没有时仅显示“更多”。</p></div>
          </div>
          <p className="mt-3 border-l-2 border-[var(--neutral-300)] pl-3 text-xs leading-5 text-[var(--text-secondary)]"><strong className="text-[var(--text-primary)]">文字与图标：</strong>文字用于高频、业务语义不够通用或需要明确后果的操作；无文字图标仅用于“更多”等认知稳定的动作，并必须提供文字提示（Tooltip）与可访问名称。删除、停用等危险操作不得只用图标表达。</p>
        </ExampleCard>
      </section>

      <section>
        <SectionHeading eyebrow="Scroll & Sticky" title="滚动与固定" description="只让表格容器滚动，不让整个页面横向溢出。列多时横向滚动，行多时限制高度并固定表头；关键列和操作列按需固定。" />
        <ExampleCard title="横向、纵向滚动与固定行列" description="示例固定表头、名称列和操作列。固定区域使用实体背景与轻量内侧阴影，滚动时仍能识别边界。">
          <TableContainer maxHeight={220}><Table density="compact" className="min-w-[1120px]"><TableHeader className="sticky top-0 z-20"><TableRow><TableHead sticky="left" className="min-w-48">数据名称</TableHead><TableHead>分类</TableHead><TableHead>归属团队</TableHead><TableHead align="right">记录数</TableHead><TableHead align="right">完整度</TableHead><TableHead>更新时间</TableHead><TableHead sticky="right" className="w-28 min-w-28">操作</TableHead></TableRow></TableHeader><TableBody>{Array.from({ length: 8 }).map((_, index) => <TableRow key={index}><TableCell sticky="left">材料数据集 {index + 1}</TableCell><TableCell>性能数据</TableCell><TableCell>材料中心</TableCell><TableCell align="right" className="tabular-nums">{(1280 + index * 87).toLocaleString()}</TableCell><TableCell align="right" className="tabular-nums">{96 - index}.0%</TableCell><TableCell className="tabular-nums">2026-06-{String(12 - index).padStart(2, "0")}</TableCell><TableCell sticky="right" className="w-28 min-w-28"><Button variant="text" tone="product" size="sm" className="!h-auto !px-0 !py-0">查看</Button></TableCell></TableRow>)}</TableBody></Table></TableContainer>
          <p className="mt-3 text-xs leading-5 text-[var(--text-tertiary)]">窄屏优先固定名称列；操作列空间不足时可取消固定，通过行菜单进入。不要同时固定过多列。</p>
        </ExampleCard>
      </section>

      <section>
        <SectionHeading eyebrow="States & Access" title="状态与权限" description="覆盖加载、空、异常、禁用和权限状态，并明确区分“没有数据”“加载失败”和“没有权限”。" />
        <div className="space-y-5">
          <ExampleCard title="加载与空状态"><TableContainer><Table density="compact"><TableBody><TableSkeletonRows rows={3} columns={3} /></TableBody></Table></TableContainer><div className="mt-3"><Empty title="筛选无结果" description="清空条件后重新查询。" action={<Button size="sm">清空筛选</Button>} /></div></ExampleCard>
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            <ExampleCard title="异常与禁用"><TableContainer><Table density="compact"><TableBody><TableRow className="bg-[var(--error-bg)]/40"><TableCell>相图预测结果</TableCell><TableCell><Tag variant="error" size="sm" dot>异常</Tag></TableCell><TableCell><Button variant="text" tone="product" size="sm" className="!h-auto !px-0 !py-0">查看原因</Button></TableCell></TableRow><TableRow disabled><TableCell>历史归档数据</TableCell><TableCell><Tag variant="neutral" size="sm" dot>已归档</Tag></TableCell><TableCell>不可编辑</TableCell></TableRow></TableBody></Table></TableContainer><p className="mt-3 text-xs leading-5 text-[var(--text-tertiary)]">异常保留原因入口；禁用降低强调但仍需可读。</p></ExampleCard>
            <ExampleCard title="无权限与部分可见"><TableContainer><Table density="compact"><TableHeader><TableRow><TableHead>材料名称</TableHead><TableHead>权限</TableHead><TableHead>操作</TableHead></TableRow></TableHeader><TableBody><TableRow><TableCell>高温合金样件</TableCell><TableCell><Tag variant="warning" size="sm" dot>部分可见</Tag></TableCell><TableCell><Button variant="text" tone="product" size="sm" className="!h-auto !px-0 !py-0">申请解锁</Button></TableCell></TableRow><TableEmpty colSpan={3} title="暂无访问权限" description="联系管理员申请数据空间权限。" /></TableBody></Table></TableContainer></ExampleCard>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="API" title="规则与实现" description="集中列出设计和开发交付时需要核对的规则与代码。" />
        <SpecList items={["默认使用通栏型；格子型只用于需要逐格核对的矩阵数据。", "表格与数据网格统一使用直角（radius-none，0px），通过边框和分隔线建立精确秩序。", "文本和操作左对齐、短枚举居中、数字右对齐；同列格式与精度一致。", "内容默认单行省略；描述类内容最多两行，只有大行高阅读型表格允许完整换行。", "小行高对应 compact，中行高对应 standard，大行高对应 comfortable。", "列距由相邻单元格左右内边距产生，最小 24px；不要为表格列单独设置 gap。", "筛选控件放在表格上方；表头保持字段标签，仅明确可比较的列增加排序。", "字段或行数过多时在 TableContainer 内滚动；按需固定表头、关键列和操作列。", "状态使用 Tag 规范；按钮、输入框、选择器、复选框和分页必须直接复用已有组件。"]} />
        <CodeBlock lang="tsx" label="表格组合示例" code={`<TableContainer maxHeight={320}>\n  <Table density="compact" variant="line">\n    <TableHeader className="sticky top-0 z-20">\n      <TableRow>\n        <TableHead sticky="left">名称</TableHead>\n        <TableHead align="right" sortable>数量</TableHead>\n        <TableHead sticky="right">操作</TableHead>\n      </TableRow>\n    </TableHeader>\n  </Table>\n</TableContainer>`} />
      </section>
    </div>
  );
}
