import DocsTable from "../../components/docs/DocsTable";
import { MeasurementLabel, SectionHeading, SpecList } from "../../components/docs/ComponentDoc";
import PageHeader from "../../components/docs/PageHeader";

const spacingTokens = [
  {
    token: "spacing-xs",
    variable: "--spacing-xs",
    value: "4px",
    usage: "图标与文字的极小间距、表单提示与字段的贴近关系",
    advice: "用于需要紧密关联的元素，避免在大范围布局中使用。",
  },
  {
    token: "spacing-sm",
    variable: "--spacing-sm",
    value: "8px",
    usage: "按钮内部元素间距、标签内边距、小组件间距",
    advice: "适合小型组件内部的基础留白，保持元素之间可辨识。",
  },
  {
    token: "spacing-md",
    variable: "--spacing-md",
    value: "16px",
    usage: "表单项间距、卡片基础内边距、列表单元间距",
    advice: "作为组件和列表的常规间距，适合高频后台界面。",
  },
  {
    token: "spacing-lg",
    variable: "--spacing-lg",
    value: "24px",
    usage: "卡片内容区内边距、模块内部区块间距",
    advice: "用于模块内部的信息分组，让内容层级更清晰。",
  },
  {
    token: "spacing-xl",
    variable: "--spacing-xl",
    value: "32px",
    usage: "页面区块之间的常规间距",
    advice: "适合页面主体区块之间的常规分隔。",
  },
  {
    token: "spacing-2xl",
    variable: "--spacing-2xl",
    value: "48px",
    usage: "大模块之间的分隔，例如页面主区块上下间距",
    advice: "用于承接较大内容模块，建立明显但克制的分区。",
  },
  {
    token: "spacing-3xl",
    variable: "--spacing-3xl",
    value: "64px",
    usage: "官网首页大区块间距、首屏区（Hero）与内容区分隔",
    advice: "适合官网和门户页面的大段落节奏控制。",
  },
  {
    token: "spacing-4xl",
    variable: "--spacing-4xl",
    value: "96px",
    usage: "官网大型视觉区块、专题页首屏与内容分隔",
    advice: "用于视觉展示型页面的大尺度留白，后台产品中谨慎使用。",
  },
];

export default function SpacingPage() {
  return (
    <div className="space-y-20">
      <PageHeader
        title="间距系统"
        description="用于定义页面布局、组件内边距、区块间距和信息层级，保证官网、门户和后台产品界面的空间秩序统一。"
      />

      <section>
        <SectionHeading
          eyebrow="Spacing Preview"
          title="间距视觉示例"
          description="用横向尺度展示不同间距设计变量（Token）的视觉差异，便于判断组件内部留白和页面区块节奏。"
        />
        <div className="rounded-[var(--radius-md)] border border-[var(--neutral-200)] bg-white p-6">
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4 xl:grid-cols-8">
            {spacingTokens.map((item) => (
              <div key={item.variable} className="flex min-w-0 flex-col items-center gap-2">
                <div className="flex h-3 w-full items-center justify-center">
                  <div
                    className="h-3 bg-[var(--neutral-400)]"
                    style={{ width: `var(${item.variable})`, maxWidth: "100%" }}
                  />
                </div>
                <span className="font-token text-xs text-[var(--text-tertiary)]">{item.token}</span>
                <span className="text-xs text-[var(--text-tertiary)]">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Vertical Spacing"
          title="纵向间距对比"
          description="纵向间距直接影响内容的阅读节奏和信息密度。以下是相同内容在不同纵向间距下的视觉差异。"
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            { grade: "紧凑", gap: "8px", token: "spacing-sm", desc: "适合后台表格、密集列表", className: "space-y-2" },
            { grade: "标准", gap: "16px", token: "spacing-md", desc: "适合后台表单、卡片内容", className: "space-y-4" },
            { grade: "宽松", gap: "32px", token: "spacing-xl", desc: "适合官网模块、门户页面", className: "space-y-8" },
          ].map((item) => (
            <div key={item.grade} className="rounded-[var(--radius-md)] border border-[var(--neutral-200)] bg-white p-5">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-tertiary)]">{item.grade}</span>
                  <h3 className="mt-0.5 text-sm font-semibold text-[var(--text-primary)]">{item.gap} · {item.token}</h3>
                </div>
                <span className="text-xs text-[var(--text-tertiary)]">{item.desc}</span>
              </div>
              <div className={item.className}>
                <div className="h-2 rounded-sm bg-[var(--neutral-500)]" />
                <div className="h-2 rounded-sm bg-[var(--neutral-300)]" />
                <div className="h-2 rounded-sm bg-[var(--neutral-200)]" />
                <div className="h-2 rounded-sm bg-[var(--neutral-100)]" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Spacing Recipes"
          title="场景间距配方"
          description="将设计变量（Token）转译为常见页面的可执行间距，减少设计稿和代码实现中的随意取值。"
        />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {[
            {
              title: "表单",
              description: "适合数据录入、参数配置和审批流页面。",
              rows: [
                ["字段与字段", "16px"],
                ["分组与分组", "24px"],
                ["底部按钮组", "12px"],
              ],
            },
            {
              title: "列表",
              description: "适合筛选、工具栏、表格和分页组合。",
              rows: [
                ["筛选项间距", "12px"],
                ["工具栏到表格", "12px-16px"],
                ["表格到分页", "16px"],
              ],
            },
            {
              title: "官网/门户",
              description: "适合首页、聚合页、专题页的叙事节奏。",
              rows: [
                ["标题到正文", "16px-24px"],
                ["卡片栅格", "24px-32px"],
                ["页面大区块", "64px-96px"],
              ],
            },
          ].map((recipe) => (
            <div key={recipe.title} className="rounded-[var(--radius-md)] border border-[var(--neutral-200)] bg-white p-5">
              <h3 className="text-base font-semibold text-[var(--text-primary)]">{recipe.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{recipe.description}</p>
              <div className="mt-4 mb-5">
                {recipe.title === "表单" ? (
                  <div className="space-y-0 rounded-[var(--radius-md)] border border-[var(--neutral-200)] bg-[var(--neutral-50)] p-3">
                    <div className="bg-white border border-[var(--neutral-300)] rounded-sm px-2 py-1.5 text-xs text-[var(--text-secondary)]">标签 / 输入框</div>
                    <div className="flex items-center justify-center" style={{ height: "16px" }}><MeasurementLabel>16px</MeasurementLabel></div>
                    <div className="bg-white border border-[var(--neutral-300)] rounded-sm px-2 py-1.5 text-xs text-[var(--text-secondary)]">标签 / 输入框</div>
                    <div className="flex items-center justify-center" style={{ height: "24px", borderLeft: "1px dashed var(--docs-measurement)", marginLeft: "8px" }}><MeasurementLabel>24px（分组）</MeasurementLabel></div>
                    <div className="bg-white border border-[var(--neutral-300)] rounded-sm px-2 py-1.5 text-xs text-[var(--text-secondary)]">标签 / 输入框</div>
                    <div className="flex items-center justify-center" style={{ height: "12px" }}><MeasurementLabel>12px</MeasurementLabel></div>
                    <div className="flex justify-end gap-2">
                      <span className="rounded-sm border border-[var(--neutral-300)] bg-white px-3 py-1 text-xs text-[var(--text-secondary)]">取消</span>
                      <span className="rounded-sm bg-[var(--neutral-900)] px-3 py-1 text-xs text-white">提交</span>
                    </div>
                  </div>
                ) : recipe.title === "列表" ? (
                  <div className="space-y-0 rounded-[var(--radius-md)] border border-[var(--neutral-200)] bg-[var(--neutral-50)] p-3">
                    <div className="flex gap-1.5" style={{ marginBottom: "12px" }}>
                      <span className="rounded-sm border border-[var(--neutral-300)] bg-white px-2 py-1 text-[10px] text-[var(--text-secondary)]">筛选A</span>
                      <span className="rounded-sm border border-[var(--neutral-300)] bg-white px-2 py-1 text-[10px] text-[var(--text-secondary)]">筛选B</span>
                    </div>
                    <div className="flex items-center justify-center" style={{ height: "14px" }}><MeasurementLabel>12-16px</MeasurementLabel></div>
                    <div className="border border-[var(--neutral-300)] bg-white rounded-[var(--radius-none)]">
                      <div className="border-b border-[var(--neutral-200)] px-2 py-1 text-[10px] text-[var(--text-secondary)]">表头</div>
                      <div className="px-2 py-1 text-[10px] text-[var(--text-secondary)]">数据行</div>
                      <div className="px-2 py-1 text-[10px] text-[var(--text-secondary)]">数据行</div>
                    </div>
                    <div className="flex items-center justify-center" style={{ height: "16px" }}><MeasurementLabel>16px</MeasurementLabel></div>
                    <div className="flex justify-end gap-1.5">
                      <span className="rounded-sm border border-[var(--neutral-300)] bg-white px-2 py-1 text-[10px] text-[var(--text-secondary)]">1 2 3 …</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-0 rounded-[var(--radius-md)] border border-[var(--neutral-200)] bg-[var(--neutral-50)] p-3">
                    <div className="bg-white border border-[var(--neutral-300)] rounded-[var(--radius-md)] px-2 py-1.5 text-xs font-semibold text-[var(--text-primary)]">页面标题</div>
                    <div className="flex items-center justify-center" style={{ height: "18px" }}><MeasurementLabel>16-24px</MeasurementLabel></div>
                    <div className="bg-white border border-[var(--neutral-200)] rounded-[var(--radius-md)] px-2 py-1.5 text-xs text-[var(--text-secondary)]">正文段落内容……</div>
                    <div className="flex items-center justify-center" style={{ height: "28px" }}><MeasurementLabel>24-32px（卡片间距）</MeasurementLabel></div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="h-8 rounded-[var(--radius-md)] border border-[var(--neutral-200)] bg-white" />
                      <div className="h-8 rounded-[var(--radius-md)] border border-[var(--neutral-200)] bg-white" />
                      <div className="h-8 rounded-[var(--radius-md)] border border-[var(--neutral-200)] bg-white" />
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-5 divide-y divide-[var(--neutral-100)] border-y border-[var(--neutral-200)]">
                {recipe.rows.map(([label, value]) => (
                  <div key={label} className="grid grid-cols-[1fr_auto] gap-4 py-3 text-sm">
                    <span className="text-[var(--text-secondary)]">{label}</span>
                    <span className="text-sm text-[var(--text-primary)]">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Spacing Tokens"
          title="间距设计变量（Token）"
          description="间距用于建立信息之间的亲疏关系。后台优先保证密度与效率，官网和门户通过更大的区块间距建立叙事节奏。"
        />
        <DocsTable>
          <thead>
            <tr>
              <th>Token</th>
              <th>数值</th>
              <th>用途</th>
              <th>使用建议</th>
            </tr>
          </thead>
          <tbody>
            {spacingTokens.map((item) => (
              <tr key={item.token}>
                <td className="whitespace-nowrap font-token">
                  {item.token}
                </td>
                <td className="whitespace-nowrap">
                  {item.value}
                </td>
                <td>{item.usage}</td>
                <td>
                  {item.advice}
                </td>
              </tr>
            ))}
          </tbody>
        </DocsTable>
      </section>

      <section>
        <SectionHeading eyebrow="Guidelines" title="最佳实践" />
        <SpecList
          items={[
            "组件内部优先使用极小、小和中等间距（spacing-xs、spacing-sm、spacing-md）。",
            "内容模块内部使用大间距（spacing-lg），页面区块之间使用特大间距（spacing-xl 或 spacing-2xl）。",
            "官网和门户的大型视觉区块可以使用展示级间距（spacing-3xl、spacing-4xl）拉开节奏。",
            "同一页面中应保持间距等级稳定，避免相近层级出现过多不同数值。",
          ]}
        />
      </section>
    </div>
  );
}
