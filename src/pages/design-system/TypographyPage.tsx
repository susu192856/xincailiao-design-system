import {
  Article,
  ChartLineUp,
  Check,
  Desktop,
  Hash,
  Rows,
  Table,
  TextAa,
  X,
} from "@phosphor-icons/react";
import type { ReactNode } from "react";
import PageHeader from "../../components/docs/PageHeader";
import { SectionHeading } from "../../components/docs/ComponentDoc";
import DocsTable from "../../components/docs/DocsTable";

const typeTokens = [
  ["Display/L", "56 / 64", "700", "首页主视觉、关键数据"],
  ["Heading/H1", "40 / 48", "600", "页面一级标题"],
  ["Heading/H2", "32 / 40", "600", "页面模块标题"],
  ["Heading/H3", "24 / 32", "500", "卡片与内容区标题"],
  ["Heading/H4", "20 / 28", "500", "产品页面标题"],
  ["Heading/H5", "18 / 26", "500", "产品模块标题"],
  ["Body/L", "16 / 24", "400", "官网正文、重要说明"],
  ["Body/M", "14 / 22", "400", "后台正文、表单、表格"],
  ["Body/S", "13 / 20", "400", "辅助信息"],
  ["Caption", "12 / 18", "400", "时间、图例、短标注"],
];

function FontCard({
  icon,
  title,
  sample,
  note,
  sampleFont,
}: {
  icon: ReactNode;
  title: string;
  sample: string;
  note: string;
  sampleFont?: string;
}) {
  return (
    <div className="rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-5">
      <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--neutral-100)] text-[var(--text-primary)]">
        {icon}
      </div>
      <h3 className="text-base font-semibold text-[var(--text-primary)]">{title}</h3>
      <p className={`mt-3 text-lg text-[var(--text-body)] ${sampleFont ?? ""}`}>{sample}</p>
      <p className="mt-2 text-xs leading-5 text-[var(--text-tertiary)]">{note}</p>
    </div>
  );
}

function RuleBadge({ ok, children }: { ok: boolean; children: ReactNode }) {
  return (
    <div className="flex items-start gap-2 text-sm leading-6 text-[var(--text-secondary)]">
      <span
        className={[
          "mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full",
          ok ? "bg-[var(--success-bg)] text-[var(--success-active)]" : "bg-[var(--error-bg)] text-[var(--error-active)]",
        ].join(" ")}
      >
        {ok ? <Check size={11} weight="bold" /> : <X size={11} weight="bold" />}
      </span>
      <span>{children}</span>
    </div>
  );
}

export default function TypographyPage() {
  return (
    <div className="space-y-20">
      <PageHeader
        title="字体"
        description="用字号、行高、字重与文字颜色建立稳定的信息层级。先看真实页面效果，再查具体 Token。"
      />

      <section>
        <SectionHeading
          eyebrow="Font Family"
          title="字体家族"
          description="中文优先使用系统字体，减少加载与跨平台差异；英文与普通数字使用 Inter，特殊数字使用 D-DIN-Pro。"
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <FontCard icon={<Desktop size={20} />} title="中文界面" sample="新材料可信数据空间" note='PingFang SC / Microsoft YaHei / Source Han Sans CN' />
          <FontCard icon={<TextAa size={20} />} title="英文与普通数字" sample="Material ID 2026-001 · 06/25" note="Inter，用于英文、普通数字、编号、日期和 Token。数字密集场景前端启用 tabular-nums。" />
          <FontCard icon={<Hash size={20} />} title="特殊数字" sample="12,580 · +8.24% · 512 MPa" note="D-DIN-Pro，用于数据、指标、金额、百分比和对比数值" sampleFont="font-data" />
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Type Scale"
          title="字号与行高"
          description="字号与行高成对使用，不单独缩放其中一项。产品正文默认 Body/M，阅读型正文默认 Body/L。"
        />
        <DocsTable>
          <thead>
            <tr>
              <th>Token</th>
              <th>字号 / 行高</th>
              <th>字重</th>
              <th>推荐用途</th>
            </tr>
          </thead>
          <tbody>
            {typeTokens.map(([token, metrics, weight, usage]) => (
              <tr key={token}>
                <td className="font-token">{token}</td>
                <td>{metrics}px</td>
                <td>{weight}</td>
                <td>{usage}</td>
              </tr>
            ))}
          </tbody>
        </DocsTable>
      </section>

      <section>
        <SectionHeading
          eyebrow="Page Examples"
          title="真实页面中的排版层级"
          description="相同的字体 Token 在页面中承担不同角色。以下示例直接展示官网、后台详情与数据看板的组合关系。"
        />
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          <div className="overflow-hidden rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white">
            <div className="flex items-center gap-2 border-b border-[var(--neutral-200)] px-5 py-3 text-sm font-semibold text-[var(--text-primary)]">
              <Article size={18} /> 官网内容页
            </div>
            <div className="p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--product-blue-600)]">Material Insight</p>
              <h3 className="mt-3 text-[32px] font-semibold leading-[40px] text-[var(--text-primary)]">高性能钛合金数据专题</h3>
              <p className="mt-4 max-w-[34rem] text-base leading-7 text-[var(--text-body)]">汇集材料牌号、工艺参数与性能数据，帮助研发团队快速建立可靠的材料认知。</p>
              <p className="mt-5 text-xs text-[var(--text-tertiary)]">更新于 2026-06-22 · 阅读约 6 分钟</p>
            </div>
          </div>

          <div className="overflow-hidden rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white">
            <div className="flex items-center gap-2 border-b border-[var(--neutral-200)] px-5 py-3 text-sm font-semibold text-[var(--text-primary)]">
              <Table size={18} /> 后台详情页
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-medium leading-7 text-[var(--text-primary)]">TC4 钛合金</h3>
                  <p className="mt-1 text-sm leading-[var(--type-body-m-line-height)] text-[var(--text-secondary)]">材料编号 MAT-2026-001</p>
                </div>
                <span className="rounded-sm bg-[var(--success-bg)] px-2 py-1 text-xs font-medium text-[var(--success-active)]">已审核</span>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4">
                {[["屈服强度", "860 MPa"], ["抗拉强度", "930 MPa"], ["数据来源", "企业上传"], ["负责人", "王工"]].map(([label, value]) => (
                  <div key={label}>
                    <p className="text-xs leading-[var(--type-caption-line-height)] text-[var(--text-tertiary)]">{label}</p>
                    <p className="mt-1 text-sm font-medium leading-[var(--type-body-m-line-height)] text-[var(--text-body)]">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white">
            <div className="flex items-center gap-2 border-b border-[var(--neutral-200)] px-5 py-3 text-sm font-semibold text-[var(--text-primary)]">
              <ChartLineUp size={18} /> 数据看板
            </div>
            <div className="p-6">
              <p className="text-sm font-medium leading-[var(--type-body-m-line-height)] text-[var(--text-secondary)]">本月新增材料数据</p>
              <div className="mt-2 flex items-end gap-3">
                <strong className="font-data text-[40px] font-semibold leading-[48px] text-[var(--text-primary)]">12,580</strong>
                <span className="mb-1 text-sm font-medium text-[var(--success-active)]">+8.24%</span>
              </div>
              <div className="mt-6 flex h-24 items-end gap-2" aria-label="数据柱状图示例">
                {[38, 52, 46, 70, 62, 88, 76, 96].map((height, index) => (
                  <span key={index} className="flex-1 bg-[var(--product-blue-500)]" style={{ height: `${height}%`, opacity: 0.35 + index * 0.08 }} />
                ))}
              </div>
              <div className="mt-3 flex justify-between text-xs text-[var(--text-tertiary)]"><span>06-01</span><span>06-22</span></div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Line Height & Readability"
          title="行高与可读性"
          description="不要只比较两段孤立文字；应在标题、摘要、数据和辅助信息共同出现的页面里判断节奏。"
        />
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-6">
            <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)]"><Rows size={18} /> 阅读型详情示例</div>
            <article className="max-w-[680px]">
              <h3 className="text-2xl font-semibold leading-8 text-[var(--text-primary)]">材料数据如何支持研发决策</h3>
              <p className="mt-3 text-sm leading-[var(--type-body-m-line-height)] text-[var(--text-secondary)]">摘要使用 Body/M，快速说明文章价值，不与标题争夺注意力。</p>
              <p className="mt-5 text-base leading-7 text-[var(--text-body)]">研发团队需要在材料性能、工艺成本与供应稳定性之间持续权衡。正文采用 16/28 的舒适阅读节奏，并将行宽控制在约 680px，使视线能够自然换行。</p>
              <p className="mt-4 text-base leading-7 text-[var(--text-body)]">当内容进入参数、编号或对比数据时，再切换为表格和等宽数字，而不是继续堆叠长段落。</p>
            </article>
          </div>
          <div className="rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-6">
            <h3 className="text-base font-semibold text-[var(--text-primary)]">判断标准</h3>
            <div className="mt-5 space-y-4">
              <RuleBadge ok>标题行高约 1.2–1.35，正文约 1.5–1.75。</RuleBadge>
              <RuleBadge ok>中文阅读正文控制在约 32–45 个汉字宽。</RuleBadge>
              <RuleBadge ok>主正文使用 neutral-800，描述与标注至少使用 neutral-700/600。</RuleBadge>
              <RuleBadge ok={false}>不要让 neutral-500 承担正常小字，它在白底仅约 2.64:1。</RuleBadge>
              <RuleBadge ok={false}>移动端不要机械缩小到桌面字号的 85%，优先重排布局并保持正文至少 14px。</RuleBadge>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
