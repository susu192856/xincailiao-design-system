import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import { Button } from "../../../components/ui/Button";
import { DescriptionList } from "../../../components/ui/DescriptionList";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow } from "../../../components/ui/Table";
import { Tag, type TagVariant } from "../../../components/ui/Tag";

const statusMapping = [
  {
    domain: "交付管理",
    items: [
      { status: "交付中", variant: "info", desc: "进行中的正常流程" },
      { status: "待交付", variant: "warning", desc: "已排期但尚未启动" },
      { status: "交付完成", variant: "success", desc: "已成功交付" },
      { status: "终止交付", variant: "error", desc: "已终止，不可恢复" },
      { status: "恢复交付", variant: "info", desc: "从暂停中恢复" },
      { status: "暂停交付", variant: "warning", desc: "临时暂停，可恢复" },
      { status: "异常", variant: "error", desc: "流程异常需人工介入" },
    ],
  },
  {
    domain: "审批管理",
    items: [
      { status: "审批中", variant: "info", desc: "流转中的审批" },
      { status: "已通过", variant: "success", desc: "审批通过" },
      { status: "已驳回", variant: "error", desc: "审批未通过" },
      { status: "已撤回", variant: "warning", desc: "申请人主动撤回，中断审批流程" },
      { status: "已转交", variant: "info", desc: "审批流转至他人" },
    ],
  },
  {
    domain: "内容/数据管理",
    items: [
      { status: "草稿", variant: "info", desc: "未发布，内容仍在编辑中" },
      { status: "已发布", variant: "success", desc: "已发布上线" },
      { status: "已下架", variant: "warning", desc: "已从线上移除，需要关注" },
      { status: "已归档", variant: "info", desc: "已存入归档，仅作历史参考" },
      { status: "待审核", variant: "warning", desc: "等待审核确认" },
    ],
  },
  {
    domain: "运维/系统",
    items: [
      { status: "启用", variant: "success", desc: "正常运行" },
      { status: "停用", variant: "warning", desc: "已手动关闭" },
      { status: "告警", variant: "error", desc: "触发告警规则" },
      { status: "过期", variant: "warning", desc: "已超过有效期" },
    ],
  },
] as const;

export default function TagPage() {
  return (
    <div className="space-y-16">
      <PageHeader title="标签" description="标签用于表达分类、状态、属性和轻量提示，帮助用户快速识别数据对象的关键属性。色彩含义参见颜色页" />

      <section>
        <SectionHeading eyebrow="Concept" title="分类标签 vs 状态标签" description="标签有两种本质不同的用途，选色逻辑完全不同。当分类和状态同时出现时，状态标签使用 dot 模式（圆点 + 黑色文字），分类标签保留彩色——两者互不干扰。" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="rounded-sm border border-[var(--neutral-200)] bg-white p-5">
            <h3 className="mb-3 text-base font-semibold text-[var(--neutral-900)]">分类标签</h3>
            <p className="mb-4 text-sm leading-6 text-[var(--neutral-600)]">表达"是什么类型/归属"——材料品类、数据来源、业务板块。11 种 variant 覆盖品牌强调、功能归属和多分类场景。</p>
            <div className="flex flex-wrap gap-1.5">
              <Tag variant="brand" size="sm">重点项目</Tag>
              <Tag variant="product" size="sm">数据空间</Tag>
              <Tag variant="teal" size="sm">材料属性</Tag>
              <Tag variant="violet" size="sm">检测类型</Tag>
              <Tag variant="slate" size="sm">标准规范</Tag>
              <Tag variant="cyan" size="sm">工艺分类</Tag>
              <Tag size="sm">默认分类</Tag>
            </div>
            <div className="mt-4 space-y-1.5 border-t border-[var(--neutral-200)] pt-3 text-xs leading-5 text-[var(--neutral-500)]">
              <p><span className="font-semibold text-[var(--neutral-700)]">brand</span>（红）— 关键/重点项目，平时少见</p>
              <p><span className="font-semibold text-[var(--neutral-700)]">product</span>（蓝）— 产品功能直接关联</p>
              <p><span className="font-semibold text-[var(--neutral-700)]">teal / violet / slate / cyan</span> — 多分类区分</p>
              <p><span className="font-semibold text-[var(--neutral-700)]">neutral</span>（灰）— 默认，最常用</p>
            </div>
          </div>
          <div className="rounded-sm border border-[var(--neutral-200)] bg-white p-5">
            <h3 className="mb-3 text-base font-semibold text-[var(--neutral-900)]">状态标签</h3>
            <p className="mb-4 text-sm leading-6 text-[var(--neutral-600)]">表达"当前处于什么阶段"——审批中、已通过、异常、已归档。颜色必须传递准确的语义信号。</p>
            <div className="flex flex-wrap gap-1.5">
              <Tag variant="success" size="sm">已完成</Tag>
              <Tag variant="warning" size="sm">待确认</Tag>
              <Tag variant="error" size="sm">异常</Tag>
              <Tag variant="info" size="sm">进行中</Tag>
            </div>
            <div className="mt-4 border-t border-[var(--neutral-200)] pt-3 text-xs leading-5 text-[var(--neutral-500)]">
              <p>success（绿）= 正向完成 · warning（琥珀）= 需关注 · error（红）= 失败/危险 · info（蓝）= 信息/流转中</p>
              <p className="mt-1 font-semibold text-[var(--neutral-700)]">neutral 不用于任何状态。</p>
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-sm border border-[var(--info-bg)] bg-[var(--info-bg)] p-4">
          <p className="text-sm font-semibold text-[var(--info-text)]">同屏共存：dot 模式 vs 背景模式</p>
          <p className="mt-1 text-sm leading-6 text-[var(--neutral-700)]">状态标签有两种展示方式：<span className="font-semibold text-[var(--neutral-900)]">dot 模式</span>（圆点+黑色文字，表格专用）和<span className="font-semibold text-[var(--neutral-900)]">背景模式</span>（全彩背景，详情页/卡片专用）。当与分类标签同屏时，状态统一用 dot 模式。</p>
          <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-medium text-[var(--neutral-500)]">dot 模式 — 表格状态列，与分类共存</p>
              <TableContainer>
                <Table density="compact">
                  <TableHeader>
                    <TableRow>
                      <TableHead>材料名称</TableHead>
                      <TableHead>分类</TableHead>
                      <TableHead>状态</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      ["TC4 钛合金", "金属材料", "已治理", "success"],
                      ["GH4169", "高温合金", "待确认", "warning"],
                      ["6061 铝合金", "金属材料", "异常", "error"],
                      ["CF/PEKK", "复合材料", "交付中", "info"],
                    ].map(([name, category, status, variant]) => (
                      <TableRow key={name}>
                        <TableCell>{name}</TableCell>
                        <TableCell><Tag size="sm" variant={category === "金属材料" ? "slate" : "teal"}>{category}</Tag></TableCell>
                        <TableCell><Tag size="sm" variant={variant as TagVariant} dot>{status}</Tag></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div>
              <p className="mb-2 text-xs font-medium text-[var(--neutral-500)]">背景模式 — 详情页/卡片，状态独立出现</p>
              <DescriptionList
                items={[
                  { label: "交付状态", value: <Tag size="sm" variant="success">交付完成</Tag> },
                  { label: "审批结果", value: <Tag size="sm" variant="success">已通过</Tag> },
                  { label: "质量检测", value: <Tag size="sm" variant="error">异常</Tag> },
                  { label: "当前阶段", value: <Tag size="sm" variant="info">交付中</Tag> },
                ]}
                columns={1}
                bordered
                size="sm"
                layout="inline"
                labelWidth={72}
              />
            </div>
          </div>
          <p className="mt-2 text-xs text-[var(--neutral-500)]">左：分类彩色标签 + 状态 dot 模式，两者各司其职。右：无分类标签时，状态可用全彩背景模式。</p>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Status Mapping" title="状态标签映射表" description="按状态语义匹配 variant，而非按颜色偏好选择。22 个常见状态覆盖交付、审批、内容、运维四类场景。" />
        <div className="overflow-x-auto rounded-sm border border-[var(--neutral-200)] bg-white">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--neutral-200)] bg-[var(--neutral-50)] text-xs text-[var(--neutral-500)]">
                <th className="px-4 py-2.5 font-medium">状态</th>
                <th className="px-4 py-2.5 font-medium">领域</th>
                <th className="px-4 py-2.5 font-medium">预览</th>
                <th className="px-4 py-2.5 font-medium">说明</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--neutral-100)]">
              {statusMapping.flatMap((domain) =>
                domain.items.map((item) => (
                  <tr key={`${domain.domain}-${item.status}`}>
                    <td className="px-4 py-2 font-medium text-[var(--neutral-800)]">{item.status}</td>
                    <td className="px-4 py-2 text-xs text-[var(--neutral-400)]">{domain.domain}</td>
                    <td className="px-4 py-2"><Tag variant={item.variant as TagVariant} size="sm">{item.status}</Tag></td>
                    <td className="px-4 py-2 text-xs text-[var(--neutral-500)]">{item.desc}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="States" title="尺寸与交互" description="后台表格内优先使用 sm + dot 模式；可移除标签用于筛选条件，不用于普通状态展示。" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="sm（22px）— 表格专用">
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Tag size="sm">分类</Tag>
                <Tag size="sm" variant="success">状态</Tag>
              </div>
              <div className="flex flex-wrap gap-2">
                <Tag size="sm" variant="success" dot>已完成</Tag>
                <Tag size="sm" variant="warning" dot>待确认</Tag>
                <Tag size="sm" variant="error" dot>异常</Tag>
                <Tag size="sm" variant="info" dot>进行中</Tag>
              </div>
              <p className="text-xs text-[var(--neutral-400)]">上行：背景模式（筛选面板/独立出现） · 下行：dot 模式（表格状态列/与分类共存）</p>
            </div>
          </ExampleCard>
          <ExampleCard title="md（26px）— 页面/卡片专用">
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Tag size="md">默认分类</Tag>
                <Tag size="md" variant="product">数据空间</Tag>
                <Tag size="md" variant="brand">重点项目</Tag>
              </div>
              <div className="flex flex-wrap gap-2">
                <Tag size="md" variant="success">交付完成</Tag>
                <Tag size="md" variant="error">异常</Tag>
                <Tag size="md" variant="warning">待审核</Tag>
              </div>
              <p className="text-xs text-[var(--neutral-400)]">md 默认使用背景模式，用于详情页字段、卡片标题区等需要视觉重量感的场景。</p>
            </div>
          </ExampleCard>
          <ExampleCard title="可关闭标签">
            <div className="flex flex-wrap gap-3">
              <Tag closable>热处理</Tag>
              <Tag variant="product" closable>数据空间</Tag>
              <Tag variant="brand" closable>关键结论</Tag>
            </div>
            <p className="mt-3 text-xs text-[var(--neutral-400)]">用于筛选条件和已选项，点击 × 移除。不用于普通状态展示。</p>
          </ExampleCard>
          <ExampleCard title="dot 模式 — 四种状态色">
            <p className="mb-3 text-xs text-[var(--neutral-500)]">dot 模式仅用于表格状态列，始终 sm 尺寸。</p>
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <span className="w-16 text-xs text-[var(--neutral-500)]">success</span>
                <Tag size="sm" variant="success" dot>已完成</Tag>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-16 text-xs text-[var(--neutral-500)]">warning</span>
                <Tag size="sm" variant="warning" dot>待确认</Tag>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-16 text-xs text-[var(--neutral-500)]">error</span>
                <Tag size="sm" variant="error" dot>异常</Tag>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-16 text-xs text-[var(--neutral-500)]">info</span>
                <Tag size="sm" variant="info" dot>进行中</Tag>
              </div>
            </div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Composition" title="后台筛选组合" description="筛选条件标签需要支持清除、换行和批量清空；不要把所有字段都标签化。" />
        <div className="rounded-sm bg-white p-6">
          <div className="rounded-sm border border-[var(--neutral-200)] p-4">
            <div className="mb-3 text-sm font-semibold text-[var(--neutral-900)]">已选条件</div>
            <div className="flex flex-wrap gap-2">
              <Tag closable>材料类型：钛合金</Tag>
              <Tag closable>状态：已治理</Tag>
              <Tag closable>空间：组织内</Tag>
              <Button variant="text" size="sm" className="h-auto px-0 py-0 text-[var(--neutral-500)]">清空</Button>
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Guidelines" title="使用建议" />
        <SpecList
          items={[
            "先判断是「分类标签」还是「状态标签」——两者选色逻辑完全不同。分类用 brand/product/teal 等 7 种，状态用 success/warning/error/info 4 种。",
            "状态标签必须使用语义色，状态名称和颜色语义严格对应。neutral 不用于任何状态。",
            "表格中分类和状态同时出现时，状态标签使用 dot 模式（`<Tag dot>`），分类保留彩色。独立出现时状态可用背景模式。",
            "品牌红标签仅用于关键节点和重点提示，不用于普通分类或后台常规状态。",
            "超过 7 个分类时优先合并分组或统一使用 neutral variant。",
            "颜色不能是唯一的信息区分方式，必须配合文字描述。",
          ]}
        />
      </section>
    </div>
  );
}
