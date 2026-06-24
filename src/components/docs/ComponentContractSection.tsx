import { useLocation } from "react-router-dom";
import manifest from "../../../figma/components.manifest.json";
import { ContractGrid, SectionHeading } from "./ComponentDoc";

const exampleLabels = {
  basic: "基础示例",
  business: "业务示例",
  boundary: "边界示例",
  wrong: "错误示例",
} as const;

export default function ComponentContractSection() {
  const location = useLocation();
  const component = manifest.components.find((item) => item.route === location.pathname);

  if (!component) return null;

  const contract = component.contract;

  return (
    <section className="mt-16 border-t border-[var(--neutral-200)] pt-16">
      <SectionHeading
        eyebrow="Delivery Contract"
        title="完整交付合同"
        description="以下内容是网页规范、React、Vue、Figma 与 AI Skill 共用的正式合同。局部页面示例不能覆盖或改写这些规则。"
      />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
        <div className="rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-5 md:p-6">
          <h3 className="text-base font-semibold text-[var(--neutral-900)]">结构与使用边界</h3>
          <ol className="mt-4 grid gap-2 sm:grid-cols-2">
            {contract.anatomy.map((item, index) => (
              <li key={item} className="flex items-start gap-3 rounded-[var(--radius-sm)] bg-[var(--neutral-50)] px-3 py-2.5">
                <span className="font-mono text-xs font-semibold text-[var(--text-tertiary)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-sm leading-5 text-[var(--neutral-800)]">{item}</span>
              </li>
            ))}
          </ol>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-tertiary)]">适用</p>
              <p className="mt-2 text-sm leading-6 text-[var(--neutral-700)]">{contract.usage}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--error-text)]">避免</p>
              <p className="mt-2 text-sm leading-6 text-[var(--neutral-700)]">{contract.avoid}</p>
            </div>
          </div>
        </div>

        <ContractGrid
          items={[
            { label: "交互", value: contract.interaction },
            { label: "内容", value: contract.content },
            { label: "响应式", value: contract.responsive },
            { label: "可访问性", value: contract.accessibility },
          ]}
        />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        <div className="overflow-hidden rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white">
          <div className="border-b border-[var(--neutral-200)] bg-[var(--neutral-50)] px-5 py-3">
            <h3 className="text-sm font-semibold text-[var(--neutral-900)]">变体与状态合同</h3>
          </div>
          <dl className="grid grid-cols-1 sm:grid-cols-2">
            {[
              ["Variants", component.variants],
              ["Tones", component.tones],
              ["Sizes", component.sizes],
              ["States", component.states],
            ].map(([label, values]) => (
              <div key={label as string} className="border-b border-[var(--neutral-200)] p-5 sm:[&:nth-child(odd)]:border-r sm:[&:nth-last-child(-n+2)]:border-b-0">
                <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-tertiary)]">{label}</dt>
                <dd className="mt-3 flex flex-wrap gap-2">
                  {(values as string[]).length ? (values as string[]).map((value) => (
                    <code key={value} className="rounded-[var(--radius-sm)] bg-[var(--neutral-100)] px-2 py-1 text-xs text-[var(--neutral-800)]">
                      {value}
                    </code>
                  )) : <span className="text-sm text-[var(--text-secondary)]">不设置独立语义轴</span>}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-5">
          <h3 className="text-sm font-semibold text-[var(--neutral-900)]">四类示例门槛</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {Object.entries(contract.examples).map(([key, value]) => (
              <div key={key} className="rounded-[var(--radius-sm)] border border-[var(--neutral-200)] p-3">
                <p className="text-xs font-semibold text-[var(--neutral-900)]">
                  {exampleLabels[key as keyof typeof exampleLabels]}
                </p>
                <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-[var(--neutral-50)] px-5 py-4">
        <div className="flex flex-col gap-2 text-xs leading-5 text-[var(--text-secondary)] md:flex-row md:flex-wrap md:gap-x-6">
          <span>合同版本：{component.contractVersion}</span>
          <span>React：{component.reactSource}</span>
          <span>Vue：{component.vueSource}</span>
          <span>Figma：{component.figmaName} · 等待集中同步</span>
        </div>
      </div>
    </section>
  );
}
