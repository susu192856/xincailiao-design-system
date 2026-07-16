import { ChartLine, Database, FileText, LockKey, Plus } from "@phosphor-icons/react";
import { useState } from "react";
import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import DocsTable from "../../../components/docs/DocsTable";
import { Badge } from "../../../components/ui/Badge";
import { Button } from "../../../components/ui/Button";
import { Card, CardActions, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/Card";
import { Tag } from "../../../components/ui/Tag";

const anatomy = [
  ["Header", "对象标题、简短说明和必要状态"],
  ["Content", "与当前对象直接相关的摘要或操作内容"],
  ["Footer", "补充信息、次级操作或唯一主操作"],
  ["Actions", "标题区辅助操作，数量保持克制"],
];

export default function CardPage() {
  const [selected, setSelected] = useState(true);

  return (
    <div className="space-y-16">
      <PageHeader title="卡片" description="卡片是承载独立信息单元的容器型复合组件，用于可重复、可移动或可整体操作的内容；普通页面分区不默认使用卡片。" />

      <section>
        <SectionHeading eyebrow="Boundary" title="使用边界" description="先判断内容是否能独立理解，再决定是否使用卡片（Card）。边框、白底或内边距本身不是使用卡片的理由。" />
        <div className="grid gap-5 lg:grid-cols-2">
          <ExampleCard title="适合使用卡片（Card）" description="内容可以作为独立对象重复排列、整体移动或进入详情。">
            <div className="grid gap-3 sm:grid-cols-3">
              {["独立主题", "稳定结构", "可重复排列"].map((item, index) => <div key={item} className="border border-[var(--neutral-200)] bg-[var(--neutral-50)] p-4"><span className="text-xs text-[var(--text-tertiary)]">0{index + 1}</span><p className="mt-2 text-sm font-semibold text-[var(--text-primary)]">{item}</p></div>)}
            </div>
          </ExampleCard>
          <ExampleCard title="不使用卡片（Card）" description="内容只是页面章节、视觉分隔或连续阅读的一部分。">
            <div className="space-y-3 border-l-2 border-[var(--neutral-300)] pl-4 text-sm leading-6 text-[var(--text-secondary)]">
              <p>页面大分区使用 Section 与间距建立层级。</p>
              <p>键值信息使用 DescriptionList，结构化数据使用 Table。</p>
              <p>仅需背景或边框时使用普通布局容器，不包装成卡片（Card）。</p>
            </div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Anatomy" title="结构" description="卡片（Card）提供稳定的容器、间距与状态；卡片头（Header）、内容区（Content）、底部（Footer）和操作区（Actions）按信息需要组合，不要求全部出现。" />
        <ExampleCard title="标准结构">
          <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
            <Card variant="outlined">
              <CardHeader className="flex items-start justify-between gap-4">
                <div><CardTitle>数据治理任务</CardTitle><CardDescription>解析、清洗和发布材料数据。</CardDescription></div>
                <CardActions><Button size="sm" variant="ghost">导出</Button></CardActions>
              </CardHeader>
              <CardContent className="grid grid-cols-3 gap-3">
                {[["处理中", "12"], ["待复核", "8"], ["已发布", "128"]].map(([label, value]) => <div key={label} className="bg-[var(--neutral-50)] p-3"><p className="font-data text-xl font-semibold tabular-nums text-[var(--text-primary)]">{value}</p><p className="mt-1 text-xs text-[var(--text-tertiary)]">{label}</p></div>)}
              </CardContent>
              <CardFooter className="flex items-center justify-between gap-3"><span className="text-xs text-[var(--text-tertiary)]">更新于 10 分钟前</span><Button size="sm" tone="task">查看任务</Button></CardFooter>
            </Card>
            <div className="divide-y divide-[var(--neutral-200)] border border-[var(--neutral-200)] bg-[var(--neutral-50)]">{anatomy.map(([name, description]) => <div key={name} className="p-4"><p className="text-sm font-semibold text-[var(--text-primary)]">{name}</p><p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">{description}</p></div>)}</div>
          </div>
        </ExampleCard>
      </section>

      <section>
        <SectionHeading eyebrow="Variants & Sizes" title="视觉类型与尺寸" description="组件类型只描述容器层级，业务内容不作为类型属性（variant）。后台默认使用描边型（outlined）；无边框型（plain）和弱背景型（muted）仅在已有清晰层级时使用。" />
        <div className="grid gap-5 md:grid-cols-3">
          {[{ variant: "plain" as const, title: "无边框型（plain）", description: "父级已有边界时使用。" }, { variant: "outlined" as const, title: "描边型（outlined）· 默认", description: "独立卡片和卡片列表。" }, { variant: "muted" as const, title: "弱背景型（muted）", description: "轻量摘要或辅助信息。" }].map((item) => <Card key={item.variant} variant={item.variant}><CardTitle>{item.title}</CardTitle><CardDescription>{item.description}</CardDescription></Card>)}
        </div>
        <div className="mt-5 grid gap-px overflow-hidden border border-[var(--neutral-200)] bg-[var(--neutral-200)] md:grid-cols-3">
          {[["Small", "16px", "紧凑入口与小型摘要"], ["Medium · 默认", "24px", "常规业务卡片"], ["Large", "32px", "低频阅读与重点概览"]].map(([name, padding, scene]) => <div key={name} className="bg-white p-5"><p className="text-sm font-semibold text-[var(--text-primary)]">{name}</p><p className="mt-1 text-xs text-[var(--text-tertiary)]">内边距 {padding}</p><div className="mt-4 bg-[var(--neutral-50)] p-3 text-xs text-[var(--text-secondary)]">{scene}</div></div>)}
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Interaction" title="交互与状态" description="整体可点击卡片必须可聚焦并支持 Enter、Space；卡片内部存在按钮或链接时，不再把整个卡片设为交互目标。" />
        <ExampleCard
          title="状态即时体验"
          description="点击第一张卡片或使用键盘切换选择状态；加载与禁用状态用于对照。"
          interactive
          code={`const [selected, setSelected] = useState(false);\n\n<Card\n  interactive\n  selected={selected}\n  onClick={() => setSelected((value) => !value)}\n>\n  <CardTitle>可选择卡片</CardTitle>\n</Card>`}
        >
          <div className="grid gap-5 md:grid-cols-3">
          <Card variant="outlined" interactive selected={selected} onClick={() => setSelected((value) => !value)} aria-label={`${selected ? "取消选择" : "选择"} TC4 数据集`}>
            <CardHeader><CardTitle>可选择卡片</CardTitle><CardDescription>点击或使用键盘切换选择。</CardDescription></CardHeader>
            <CardContent><Tag variant={selected ? "brand" : "neutral"}>{selected ? "已选中" : "未选中"}</Tag></CardContent>
          </Card>
          <Card variant="outlined" loading aria-label="数据计算卡片，加载中"><CardHeader><CardTitle>加载状态</CardTitle><CardDescription>保留结构并阻止重复操作。</CardDescription></CardHeader><CardContent><div className="h-16 bg-[var(--neutral-50)]" /></CardContent></Card>
          <Card variant="muted" disabled><CardHeader><div className="mb-3 flex h-9 w-9 items-center justify-center bg-white text-[var(--text-tertiary)]"><LockKey size={18} /></div><CardTitle>禁用状态</CardTitle><CardDescription>保留上下文，但不可进入或操作。</CardDescription></CardHeader></Card>
          </div>
          <p className="mt-4 border-l-2 border-[var(--neutral-300)] bg-[var(--neutral-50)] px-4 py-3 text-xs leading-5 text-[var(--text-secondary)]"><strong className="text-[var(--text-primary)]">选择规则：</strong>批量选择或多选必须显示复选框（Checkbox）；互斥方案必须显示单选框（Radio）。只有选择关系已由上下文明确时，才能使用整卡选中样式作为辅助反馈。</p>
        </ExampleCard>
      </section>

      <section>
        <SectionHeading eyebrow="Patterns" title="业务使用模式" description="以下是卡片（Card）的内容组合方式，不是组件类型属性（variant）；它们复用相同容器、尺寸和状态接口（API）。" />
        <div className="grid gap-5 md:grid-cols-3">
          <Card variant="outlined" status="brand"><CardHeader><div className="mb-4 flex h-9 w-9 items-center justify-center bg-[var(--neutral-50)] text-[var(--text-secondary)]"><Database size={18} /></div><CardTitle>数据资产</CardTitle><CardDescription>展示对象摘要、分类与治理状态。</CardDescription></CardHeader><CardContent className="flex flex-wrap gap-2"><Tag variant="brand">关键节点</Tag><Tag>已治理</Tag></CardContent></Card>
          <Card variant="outlined" status="product"><CardHeader><div className="mb-4 flex h-9 w-9 items-center justify-center bg-[var(--neutral-50)] text-[var(--text-secondary)]"><FileText size={18} /></div><CardTitle>功能入口</CardTitle><CardDescription>用于工作台和聚合首页的能力入口。</CardDescription></CardHeader><CardFooter><Button size="sm" icon={<Plus size={15} />}>进入模块</Button></CardFooter></Card>
          <Card variant="outlined"><CardHeader><div className="mb-4 flex items-center justify-between"><div className="flex h-9 w-9 items-center justify-center bg-[var(--neutral-50)] text-[var(--text-secondary)]"><ChartLine size={18} /></div><Badge count={12} tone="product" size="sm" /></div><CardTitle>状态摘要</CardTitle><CardDescription>用于指标、任务和流程概览。</CardDescription></CardHeader><CardContent><p className="font-data text-3xl font-semibold tabular-nums text-[var(--text-primary)]">128</p><p className="mt-1 text-sm text-[var(--text-secondary)]">本周新增数据集</p></CardContent></Card>
        </div>
        <p className="mt-4 text-xs leading-5 text-[var(--text-tertiary)]">顶部 2px 状态线仅作快速识别辅助；具体状态仍需由标题、标签或说明文字表达。</p>
      </section>

      <section>
        <SectionHeading eyebrow="Guidelines" title="最佳实践" />
        <SpecList items={["Card 是容器型复合组件，不是页面分区的默认样式。", "业务模式不等于组件 Variant；统一复用 plain、outlined、muted 和尺寸属性。", "整体可点击与内部多操作二选一，避免嵌套交互目标。", "标准内容卡片统一使用中圆角（radius-md，4px）；品牌展示大卡片可使用大圆角（radius-lg，8px），后台不使用更大圆角。", "后台卡片优先使用边框和间距建立层级，不使用大阴影。", "主操作不超过一个；状态颜色必须同时配合文字、标签或图标。", "Card 可组合 DescriptionList、Tag、Button 等组件，但不替代这些组件自身的语义。"]} />
      </section>

      <section>
        <SectionHeading eyebrow="API" title="属性与实现边界" description="卡片是容器型复合组件，不限制子组件类型；业务模式由组合方式体现，不作为类型属性（variant）。" />
        <DocsTable>
          <thead>
            <tr><th>属性</th><th>类型</th><th>默认值</th><th>说明</th></tr>
          </thead>
          <tbody>
            {[
              ["variant", "plain | outlined | muted", "plain", "视觉容器类型；不承载业务语义。"],
              ["size", "sm | md | lg", "md", "卡片内边距尺寸。"],
              ["status", "default | product | brand | success | warning | error", "default", "顶部 2px 状态线；辅助快速识别，不替代文字表达。"],
              ["interactive", "boolean", "false", "悬停时提升视觉反馈。"],
              ["selected", "boolean", "false", "选中态；边框 + 淡蓝背景。"],
              ["disabled", "boolean", "false", "降低透明度并禁用交互。"],
              ["loading", "boolean", "false", "异步加载中状态。"],
              ["className", "string", "—", "透传至外层容器。"],
            ].map(([name, type, defaultValue, desc]) => (
              <tr key={name}>
                <td className="font-token">{name}</td>
                <td className="font-token text-[var(--text-secondary)]">{type}</td>
                <td className="font-token text-[var(--text-secondary)]">{defaultValue}</td>
                <td className="text-[var(--text-secondary)]">{desc}</td>
              </tr>
            ))}
          </tbody>
        </DocsTable>
      </section>
    </div>
  );
}
