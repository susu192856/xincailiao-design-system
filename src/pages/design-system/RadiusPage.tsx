import DocsTable from "../../components/docs/DocsTable";
import { SectionHeading, SpecList } from "../../components/docs/ComponentDoc";
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
    usage: "页面标题背景、标准卡片、提示与分组容器",
    advice: "文档页和后台内容容器的默认圆角，提供适度层级与亲和感。",
  },
  {
    token: "radius-lg",
    variable: "--radius-lg",
    value: "8px",
    usage: "品牌展示大卡片、独立浮层、对话框外壳",
    advice: "仅用于面积较大或脱离页面流的容器，不用于常规后台卡片。",
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
          eyebrow="Radius Preview"
          title="圆角视觉示例"
          description="通过同尺寸容器对比不同圆角等级，帮助判断组件、卡片和营销展示模块的边角尺度。"
        />
        <div className="rounded-[var(--radius-md)] border border-[var(--neutral-200)] bg-white p-6">
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4 xl:grid-cols-7">
            {radiusTokens.map((item) => (
              <div key={item.variable} className="flex min-w-0 flex-col items-center gap-2">
                <div className="flex w-full justify-center">
                  <div
                    className="h-16 w-16 bg-[var(--neutral-100)]"
                    style={{ borderRadius: `var(${item.variable})` }}
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
          eyebrow="Radius Tokens"
          title="圆角设计变量（Token）"
          description="圆角用于控制界面气质。后台与数据产品优先使用 0-4px：交互控件统一使用 2px，页面标题背景、标准卡片、提示区和分组容器统一使用 4px；8px 用于品牌展示大卡片与独立对话框外壳，更大圆角只用于特殊官网视觉。同一语义层级必须保持一致。"
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
            {radiusTokens.map((item) => (
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
            "交互控件（按钮、输入框、选择器、标签）统一使用小圆角（radius-sm，2px），保持工业数据产品的精确感。",
            "页面标题背景、标准内容卡片、提示说明区、代码区和分组容器统一使用中圆角（radius-md，4px）。",
            "表格与数据网格使用直角（radius-none，0px）；独立对话框外壳和品牌展示大卡片可使用 radius-lg（8px）。",
            "大圆角（radius-xl，12px）和特大圆角（radius-2xl，16px）仅限特殊官网视觉或媒体蒙版，不用于重复内容卡片。",
            "同一组件类型应保持圆角一致，避免在相同层级中混用多个圆角等级。",
            "全圆角（radius-full）仅用于胶囊标签、头像、圆形按钮等明确形态。",
          ]}
        />
      </section>
    </div>
  );
}
