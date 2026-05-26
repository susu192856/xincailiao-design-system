import DocsTable from "../../components/docs/DocsTable";
import { SectionHeading } from "../../components/docs/ComponentDoc";
import PageHeader from "../../components/docs/PageHeader";

const radiusTokens = [
  {
    token: "radius-none",
    variable: "--radius-none",
    value: "0px",
    usage: "表格、数据网格、强秩序信息区",
    advice: "用于需要明确边界和工业秩序感的区域，体现精确和专业。",
  },
  {
    token: "radius-sm",
    variable: "--radius-sm",
    value: "2px",
    usage: "按钮、输入框、选择器、标签等交互控件",
    advice: "工业数据产品的核心圆角，兼顾精确与微柔化，体现品牌识别度。",
  },
  {
    token: "radius-md",
    variable: "--radius-md",
    value: "4px",
    usage: "卡片容器、弹窗内容区、分组容器",
    advice: "用于承载成组内容的容器，提供适度的层级和亲和感。",
  },
  {
    token: "radius-lg",
    variable: "--radius-lg",
    value: "8px",
    usage: "大卡片、浮层、对话框",
    advice: "用于面积较大的容器模块，提升视觉舒适度。",
  },
  {
    token: "radius-xl",
    variable: "--radius-xl",
    value: "12px",
    usage: "官网营销卡片、展示容器",
    advice: "用于官网品牌展示场景，后台慎用。",
  },
  {
    token: "radius-2xl",
    variable: "--radius-2xl",
    value: "16px",
    usage: "官网视觉卡片、品牌展示模块",
    advice: "适合品牌表达和较强视觉展示场景，后台慎用。",
  },
  {
    token: "radius-full",
    variable: "--radius-full",
    value: "9999px",
    usage: "胶囊标签、头像、圆形按钮",
    advice: "仅用于需要完整胶囊或圆形外观的元素。",
  },
];

export default function RadiusPage() {
  return (
    <div className="space-y-20">
      <PageHeader
        title="圆角系统"
        description="用于定义按钮、输入框、卡片、弹窗、标签等组件的边角规则，保持界面统一、克制、专业。"
      />

      <section>
        <SectionHeading
          eyebrow="Radius Tokens"
          title="圆角 Token"
          description="圆角用于控制界面气质。交互控件统一使用 2px 微圆角，保持工业数据产品的精确感和品牌识别度；容器层使用 4-8px 建立视觉层级。同一组件类型应保持圆角一致。"
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
            {radiusTokens.map((item) => (
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
          eyebrow="Radius Preview"
          title="圆角视觉示例"
          description="通过同尺寸容器对比不同圆角等级，帮助判断组件、卡片和营销展示模块的边角尺度。"
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {radiusTokens.map((item) => (
            <div key={item.variable} className="bg-white p-5">
              <div
                className="mb-4 h-24 bg-[var(--neutral-50)]"
                style={{ borderRadius: `var(${item.variable})` }}
              />
              <div className="font-mono text-xs text-[var(--neutral-600)]">{item.token}</div>
              <div className="mt-1 font-mono text-xs text-[var(--neutral-500)]">{item.value}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Guidelines" title="使用建议" />
        <div className="bg-white p-6">
          <ul className="space-y-3 text-sm leading-relaxed text-[var(--neutral-700)]">
            <li>• 交互控件（按钮、输入框、选择器、标签）统一使用 <strong>radius-sm (2px)</strong>，保持工业数据产品的精确感。</li>
            <li>• 容器层（卡片、弹窗）使用 <strong>radius-md (4px)</strong> 或 <strong>radius-lg (8px)</strong>，层级越高圆角越大。</li>
            <li>• radius-xl (12px) 和 radius-2xl (16px) 仅限官网营销展示场景，后台慎用。</li>
            <li>• 同一组件类型应保持圆角一致，避免在相同层级中混用多个圆角等级。</li>
            <li>• radius-full 仅用于胶囊标签、头像、圆形按钮等明确形态。</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
