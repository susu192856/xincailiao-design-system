import DocsTable from "../../components/docs/DocsTable";
import { SectionHeading } from "../../components/docs/ComponentDoc";
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
    usage: "官网首页大区块间距、Hero 与内容区分隔",
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
          eyebrow="Spacing Tokens"
          title="间距 Token"
          description="间距用于建立信息之间的亲疏关系。后台优先保证密度与效率，官网和门户通过更大的区块间距建立叙事节奏。"
        />
        <DocsTable>
          <thead className="bg-[var(--neutral-50)] text-sm font-semibold text-[var(--neutral-900)]">
            <tr className="border-b border-[var(--neutral-200)]">
              <th className="px-6 py-3 font-semibold">Token</th>
              <th className="px-6 py-3 font-semibold">数值</th>
              <th className="px-6 py-3 font-semibold">用途</th>
              <th className="px-6 py-3 font-semibold">使用建议</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--neutral-200)] bg-white">
            {spacingTokens.map((item) => (
              <tr key={item.token}>
                <td className="whitespace-nowrap px-6 py-4 font-mono text-xs text-[var(--neutral-600)]">
                  {item.token}
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-mono text-xs text-[var(--neutral-600)]">
                  {item.value}
                </td>
                <td className="px-6 py-4 text-sm text-[var(--neutral-700)]">{item.usage}</td>
                <td className="px-6 py-4 text-sm leading-relaxed text-[var(--neutral-600)]">
                  {item.advice}
                </td>
              </tr>
            ))}
          </tbody>
        </DocsTable>
      </section>

      <section>
        <SectionHeading
          eyebrow="Spacing Preview"
          title="间距视觉示例"
          description="用横向尺度展示不同间距 token 的视觉差异，便于判断组件内部留白和页面区块节奏。"
        />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {spacingTokens.map((item) => (
            <div key={item.variable} className="rounded-sm border border-[var(--neutral-200)] bg-white p-5">
              <div className="mb-4 flex h-12 items-center rounded-sm bg-[var(--neutral-50)] px-4">
                <div
                  className="h-3 bg-[var(--neutral-400)]"
                  style={{ width: `var(${item.variable})` }}
                />
              </div>
              <div className="font-mono text-xs text-[var(--neutral-600)]">{item.token}</div>
              <div className="mt-1 font-mono text-xs text-[var(--neutral-500)]">{item.value}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Spacing Recipes"
          title="场景间距配方"
          description="将 token 转译为常见页面的可执行间距，减少设计稿和代码实现中的随意取值。"
        />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {[
            {
              title: "后台表单",
              description: "适合数据录入、参数配置和审批流页面。",
              rows: [
                ["字段与字段", "16px"],
                ["分组与分组", "24px"],
                ["底部按钮组", "12px"],
              ],
            },
            {
              title: "后台列表",
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
            <div key={recipe.title} className="rounded-sm border border-[var(--neutral-200)] bg-white p-5">
              <p className="text-base font-semibold text-[var(--neutral-900)]">{recipe.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--neutral-600)]">{recipe.description}</p>
              <div className="mt-5 divide-y divide-[var(--neutral-200)] border-y border-[var(--neutral-200)]">
                {recipe.rows.map(([label, value]) => (
                  <div key={label} className="grid grid-cols-[1fr_auto] gap-4 py-3 text-sm">
                    <span className="text-[var(--neutral-700)]">{label}</span>
                    <span className="font-mono text-xs text-[var(--neutral-900)]">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Guidelines" title="使用建议" />
        <div className="rounded-sm border border-[var(--neutral-200)] bg-white p-6">
          <ul className="space-y-3 text-sm leading-relaxed text-[var(--neutral-700)]">
            <li>• 组件内部优先使用 spacing-xs、spacing-sm、spacing-md。</li>
            <li>• 内容模块内部使用 spacing-lg，页面区块之间使用 spacing-xl 或 spacing-2xl。</li>
            <li>• 官网和门户的大型视觉区块可以使用 spacing-3xl、spacing-4xl 拉开节奏。</li>
            <li>• 同一页面中应保持间距等级稳定，避免相近层级出现过多不同数值。</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
