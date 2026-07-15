import { useState } from "react";
import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import DocsTable from "../../../components/docs/DocsTable";
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
  const [filters, setFilters] = useState(["热处理", "数据空间", "关键结论"]);

  return (
    <div className="space-y-16">
      <PageHeader title="标签" description="标签用于表达分类、状态、属性和轻量提示，帮助用户快速识别数据对象的关键属性。色彩含义参见颜色页" />

      <section>
        <SectionHeading eyebrow="Concept" title="分类标签与状态标签" description="先判断标签回答的是“它是什么”还是“它处于什么状态”，再选择颜色。" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="rounded-sm border border-[var(--neutral-200)] bg-white p-5">
            <h3 className="mb-3 text-base font-semibold text-[var(--text-primary)]">分类标签</h3>
            <p className="mb-4 text-sm leading-6 text-[var(--text-secondary)]">表达类型或归属，例如材料品类、数据来源和业务板块。</p>
            <div className="flex flex-wrap gap-1.5">
              <Tag variant="orange" size="sm">热处理</Tag>
              <Tag variant="blue" size="sm">数据空间</Tag>
              <Tag variant="green" size="sm">材料属性</Tag>
              <Tag variant="pink" size="sm">样品类型</Tag>
              <Tag variant="magenta" size="sm">分析方法</Tag>
              <Tag variant="purple" size="sm">检测类型</Tag>
              <Tag variant="amber" size="sm">标准规范</Tag>
              <Tag variant="indigo" size="sm">工艺分类</Tag>
              <Tag variant="neutral" size="sm">其他属性</Tag>
            </div>
            <div className="mt-4 space-y-2 border-t border-[var(--neutral-200)] pt-3 text-xs leading-5 text-[var(--text-tertiary)]">
              <p><strong className="text-[var(--text-secondary)]">有色：</strong>8 种数据色相，建立稳定分类映射。</p>
              <p><strong className="text-[var(--text-secondary)]">中性：</strong>无需颜色区分时使用 neutral；coral / red 不用于分类。</p>
            </div>
          </div>
          <div className="rounded-sm border border-[var(--neutral-200)] bg-white p-5">
            <h3 className="mb-3 text-base font-semibold text-[var(--text-primary)]">状态标签</h3>
            <p className="mb-4 text-sm leading-6 text-[var(--text-secondary)]">表达当前阶段或结果，例如审批中、已通过、异常和已归档。</p>
            <div className="flex flex-wrap gap-1.5">
              <Tag variant="success" size="sm">已完成</Tag>
              <Tag variant="warning" size="sm">待确认</Tag>
              <Tag variant="error" size="sm">异常</Tag>
              <Tag variant="info" size="sm">进行中</Tag>
            </div>
            <div className="mt-4 border-t border-[var(--neutral-200)] pt-3 text-xs leading-5 text-[var(--text-tertiary)]">
              <p><span className="font-token">success / warning / error / info</span></p>
              <p className="mt-1 text-[var(--text-secondary)]">状态必须使用语义色；neutral 不表达业务状态。</p>
            </div>
          </div>
        </div>

      </section>

      <section>
        <SectionHeading eyebrow="Display" title="圆点模式与浅底模式" description="表格状态列使用圆点模式（dot）；详情页和卡片中的独立状态使用浅底模式（soft）。" />
        <div className="rounded-sm border border-[var(--neutral-200)] bg-white p-4">
          <p className="text-sm leading-6 text-[var(--text-secondary)]">分类和状态同屏时，状态统一使用圆点模式，避免两个彩色标签争夺注意力。</p>
          <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-medium text-[var(--text-tertiary)]">圆点模式（dot）— 表格状态列，与分类共存</p>
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
                        <TableCell><Tag size="sm" variant={category === "金属材料" ? "amber" : "green"}>{category}</Tag></TableCell>
                        <TableCell><Tag size="sm" variant={variant as TagVariant} dot>{status}</Tag></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div>
              <p className="mb-2 text-xs font-medium text-[var(--text-tertiary)]">浅底模式（soft）— 详情页或卡片，状态独立出现</p>
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
                labelWidth={88}
              />
            </div>
          </div>
          <p className="mt-2 text-xs text-[var(--text-tertiary)]">左：分类彩色标签加状态圆点模式，两者各司其职。右：无分类标签时，状态可使用浅底模式。</p>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Status Mapping" title="状态标签映射表" description="按状态含义选择颜色语义（tone），不按个人颜色偏好选择。21 个常见状态覆盖交付、审批、内容、运维四类场景。" />
        <DocsTable>
            <thead>
              <tr className="border-b border-[var(--neutral-200)] bg-[var(--neutral-50)] text-xs text-[var(--text-tertiary)]">
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
                    <td className="px-4 py-2 font-medium text-[var(--text-body)]">{item.status}</td>
                    <td className="px-4 py-2 text-xs text-[var(--neutral-400)]">{domain.domain}</td>
                    <td className="px-4 py-2"><Tag variant={item.variant as TagVariant} size="sm">{item.status}</Tag></td>
                    <td className="px-4 py-2 text-xs text-[var(--text-tertiary)]">{item.desc}</td>
                  </tr>
                ))
              )}
            </tbody>
        </DocsTable>
      </section>

      <section>
        <SectionHeading eyebrow="States" title="尺寸与交互" description="后台和数据密集场景统一优先使用小尺寸（sm）；中尺寸（md）仅用于少量宽松展示，不通过放大字号制造强调。可移除标签用于筛选条件，不用于普通状态展示。" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="小尺寸（sm，22px）— 后台默认">
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Tag size="sm" variant="amber">材料分类</Tag>
                <Tag size="sm" variant="success">状态</Tag>
              </div>
              <div className="flex flex-wrap gap-2">
                <Tag size="sm" variant="success" dot>已完成</Tag>
                <Tag size="sm" variant="warning" dot>待确认</Tag>
                <Tag size="sm" variant="error" dot>异常</Tag>
                <Tag size="sm" variant="info" dot>进行中</Tag>
              </div>
              <p className="text-xs text-[var(--neutral-400)]">上行：浅底模式（筛选面板或独立出现） · 下行：圆点模式（表格状态列或与分类共存）</p>
            </div>
          </ExampleCard>
          <ExampleCard title="中尺寸（md，26px）— 非默认宽松场景">
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Tag size="md" variant="green">材料属性</Tag>
                <Tag size="md" variant="blue">数据空间</Tag>
                <Tag size="md" variant="amber">重点项目</Tag>
              </div>
              <div className="flex flex-wrap gap-2">
                <Tag size="md" variant="success">交付完成</Tag>
                <Tag size="md" variant="error">异常</Tag>
                <Tag size="md" variant="warning">待审核</Tag>
              </div>
              <p className="text-xs text-[var(--neutral-400)]">中尺寸（md）仍使用 12px 常规字重，只增加高度与水平留白。后台详情和卡片通常继续使用 sm，仅在版面明显宽松且需要更大点击容器时采用。</p>
            </div>
          </ExampleCard>
          <ExampleCard
            title="可关闭标签"
            description="点击关闭按钮会立即移除当前筛选；全部移除后仍保留清晰的空结果说明。"
            interactive
            code={`const [filters, setFilters] = useState(["热处理", "数据空间"]);\n\n{filters.map((filter) => (\n  <Tag\n    key={filter}\n    closable\n    onClose={() => setFilters((items) => items.filter((item) => item !== filter))}\n  >\n    {filter}\n  </Tag>\n))}`}
          >
            {filters.length ? (
              <div className="flex flex-wrap gap-3">
                {filters.map((filter, index) => (
                  <Tag
                    key={filter}
                    size="sm"
                    variant={index === 1 ? "blue" : index === 2 ? "purple" : "soft"}
                    closable
                    onClose={() => setFilters((items) => items.filter((item) => item !== filter))}
                  >
                    {filter}
                  </Tag>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[var(--text-tertiary)]">暂无已选筛选条件</p>
            )}
            <p className="mt-3 text-xs text-[var(--neutral-400)]">用于筛选条件和已选项，不用于普通状态展示。</p>
          </ExampleCard>
          <ExampleCard title="禁用态">
            <div className="flex flex-wrap gap-3">
              <Tag size="sm" variant="indigo" disabled>权限受限</Tag>
              <Tag size="sm" variant="blue" closable disabled>不可移除</Tag>
              <Tag size="sm" variant="warning" disabled>流程锁定</Tag>
            </div>
            <p className="mt-3 text-xs leading-5 text-[var(--text-tertiary)]">禁用态降低整体透明度；可关闭标签同时禁用关闭按钮，不允许仅改变颜色而保留交互。</p>
          </ExampleCard>
          <ExampleCard title="长标签与窄容器">
            <div className="w-full max-w-[180px] border border-dashed border-[var(--neutral-300)] p-3">
              <Tag variant="indigo" className="max-w-full" title="新材料可信数据空间内部共享分类">新材料可信数据空间内部共享分类</Tag>
            </div>
            <p className="mt-3 text-xs leading-5 text-[var(--text-tertiary)]">标签保持单行并在容器内截断；完整名称通过标题属性（title）或业务文字提示（Tooltip）提供，父容器负责标签之间换行。</p>
          </ExampleCard>
          <ExampleCard title="圆点模式（dot）— 四种状态色">
            <p className="mb-3 text-xs text-[var(--text-tertiary)]">圆点模式仅用于表格状态列，始终使用小尺寸（sm）。</p>
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <span className="w-24 text-xs text-[var(--text-tertiary)]">成功（success）</span>
                <Tag size="sm" variant="success" dot>已完成</Tag>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-24 text-xs text-[var(--text-tertiary)]">警告（warning）</span>
                <Tag size="sm" variant="warning" dot>待确认</Tag>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-24 text-xs text-[var(--text-tertiary)]">错误（error）</span>
                <Tag size="sm" variant="error" dot>异常</Tag>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-24 text-xs text-[var(--text-tertiary)]">信息（info）</span>
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
            <div className="mb-3 text-sm font-semibold text-[var(--text-primary)]">已选条件</div>
            <div className="flex flex-wrap gap-2">
              <Tag size="sm" closable>材料类型：钛合金</Tag>
              <Tag size="sm" closable>状态：已治理</Tag>
              <Tag size="sm" closable>空间：组织内</Tag>
              <Button variant="text" size="sm" className="h-auto px-0 py-0 text-[var(--text-tertiary)]">清空</Button>
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Guidelines" title="最佳实践" />
        <SpecList
          items={[
            "先判断是「分类标签」还是「状态标签」——两者选色逻辑完全不同。有色分类从数据可视化色板选用 8 种色相；珊瑚和红色不用于分类，状态使用 success / warning / error / info 4 种。",
            "状态标签必须使用语义色，状态名称和颜色语义严格对应。中性语义（neutral）不用于任何状态。",
            "soft 状态标签使用专用高对比文字 Token，12px 文本与浅色背景的对比度不得低于 4.5:1。",
            "圆点模式使用 success-dot / warning-dot / error-dot / info-dot，不复用较深的状态文字色；圆点必须与可读状态文字同时出现。",
            "后台表格、详情字段、筛选条件、可关闭和禁用标签默认使用 sm；md 不放大字号，只在少量宽松展示或需要更大容器时使用。",
            "表格中分类和状态同时出现时，状态标签使用 dot 模式（`<Tag dot>`），分类保留彩色。独立出现时状态可用背景模式。",
            "coral 与 red 不作为分类 tone；品牌表达使用品牌组件，错误状态使用 error，不要通过相近红色替代语义。",
            "neutral 用于无需颜色区分、没有稳定颜色映射或仅作普通属性提示的分类；不要为了丰富页面而强行分配有色标签。",
            "同一业务分类必须保持固定 tone；同屏出现过多色相时优先合并分组，避免把 8 种可用色当成必须全部使用。",
            "分类标签固定使用 soft 外观；outline 与 solid 不作为分类标签类型，避免重新出现过重边框或大面积色块。",
            "颜色不能是唯一的信息区分方式，必须配合文字描述。",
          ]}
        />
      </section>
    </div>
  );
}
