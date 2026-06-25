import {
  BracketsCurly,
  CheckCircle,
  FigmaLogo,
  GitBranch,
  Globe,
  Package,
} from "@phosphor-icons/react";
import PageHeader from "../../components/docs/PageHeader";
import DocsTable from "../../components/docs/DocsTable";
import { ExampleCard, SectionCard, SectionHeading, SpecList, SubsectionHeading } from "../../components/docs/ComponentDoc";
import manifest from "../../../figma/components.manifest.json";
import figmaSync from "../../../figma/sync.config.json";

const deliveryCards = [
  {
    icon: <Globe size={20} weight="regular" />,
    title: "规则可直观看",
    target: "网页规范站",
    source: "src/pages + src/components/docs",
    output: "GitHub Pages",
    description: "设计师和前端通过浏览器查看颜色、布局、组件状态、示例和验收规则。",
  },
  {
    icon: <BracketsCurly size={20} weight="regular" />,
    title: "前端可交付",
    target: "代码组件与文档",
    source: "packages/vue-ui + docs/components",
    output: "Vue 3 源码组件、Markdown 规范、组件合同",
    description: "前端以 Vue 组件、Token 变量和组件规范为实现依据，不从截图反推样式。",
  },
  {
    icon: <FigmaLogo size={20} weight="regular" />,
    title: "Figma 可调用",
    target: "Figma Variables / Components",
    source: "figma/tokens.json + figma/components.manifest.json",
    output: "Figma 变量、文字样式、阴影样式、组件属性",
    description: "设计师在 Figma 中调用同名组件和变量，状态、尺寸、属性与代码合同保持一致。",
  },
];

const sourceRows = [
  ["设计 Token", "src/styles/tokens.css", "figma/tokens.json、docs/design-tokens、Skill assets", "颜色、字号、间距、圆角、阴影等精确数值"],
  ["组件合同", "figma/components.manifest.json", "网页组件页、React 示例、Vue 源码、Figma 组件属性", "组件命名、状态、属性、成熟度和同步资格"],
  ["网页版式", "src/components/docs", "规范站所有基础页和组件页", "标题、表格、卡片、示例区、提示区的统一视觉"],
  ["前端组件", "packages/vue-ui", "前端开发可复用源码组件", "Vue 3 项目优先复用的组件起点"],
  ["Figma 目标", "figma/sync.config.json", "Figma v2.0 官方文件", "同步策略、成熟度门槛和正式目标"],
  ["维护流程", "docs/VISUAL_GOVERNANCE.md", "Codex 任务描述、截图验收、视觉治理清单", "设计师在 Codex 中持续维护规范的工作方式"],
] as const;

const statusCount = manifest.components.reduce<Record<string, number>>((result, component) => {
  result[component.status] = (result[component.status] ?? 0) + 1;
  return result;
}, {});

const stableComponents = manifest.components.filter((component) => component.status === "stable").length;
const eligibleComponents = manifest.components.filter((component) => component.figma?.syncStatus === "eligible").length;

export default function DeliveryPage() {
  return (
    <div className="space-y-16">
      <PageHeader
        title="交付与同步"
        description="新材道设计规范不是单一文稿，而是一套由 Codex 维护的规则源头。网页负责直观看规则，代码负责交付前端，Figma 负责设计调用，三者共享 Token、组件合同和成熟度门槛。"
        status="stable"
      />

      <section>
        <SectionHeading
          eyebrow="One Source"
          title="一套源头，三类交付"
          description="Codex 不需要把所有内容塞进一个文件；它需要维护同一仓库中的结构化源头，并让不同产物从同一套规则生成或对齐。"
        />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {deliveryCards.map((card) => (
            <SectionCard key={card.title}>
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white text-[var(--text-body)]">
                {card.icon}
              </div>
              <h3 className="text-lg font-medium leading-[var(--type-heading-h5-line-height)] text-[var(--text-primary)]">{card.title}</h3>
              <p className="mt-2 text-sm leading-[var(--type-body-m-line-height)] text-[var(--text-secondary)]">{card.description}</p>
              <dl className="mt-5 space-y-3 border-t border-[var(--neutral-200)] pt-4">
                <div>
                  <dt className="text-xs text-[var(--text-tertiary)]">目标</dt>
                  <dd className="mt-1 text-sm font-medium text-[var(--text-primary)]">{card.target}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[var(--text-tertiary)]">源头</dt>
                  <dd className="mt-1 font-mono text-xs leading-[var(--type-caption-line-height)] text-[var(--text-secondary)]">{card.source}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[var(--text-tertiary)]">产物</dt>
                  <dd className="mt-1 text-sm leading-[var(--type-body-m-line-height)] text-[var(--text-secondary)]">{card.output}</dd>
                </div>
              </dl>
            </SectionCard>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Source Map"
          title="规则源头与产物映射"
          description="前端、设计师和 Codex 都必须引用这些源头，避免出现网页、代码和 Figma 各自维护一套样式的情况。"
        />
        <DocsTable caption="说明型表格统一使用 DocsTable；表头、单元格和代码列字号由全局样式控制。">
          <thead>
            <tr>
              <th>规则源头</th>
              <th>文件</th>
              <th>同步到</th>
              <th>负责内容</th>
            </tr>
          </thead>
          <tbody>
            {sourceRows.map(([name, file, output, owner]) => (
              <tr key={name}>
                <td>{name}</td>
                <td className="font-mono">{file}</td>
                <td>{output}</td>
                <td>{owner}</td>
              </tr>
            ))}
          </tbody>
        </DocsTable>
      </section>

      <section>
        <SectionHeading
          eyebrow="Gates"
          title="交付门槛"
          description="只有通过网页、代码、Figma 三条链路的内容，才算真正可交付。"
        />
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <ExampleCard title="当前状态" description="从组件 manifest 和 Figma 同步配置读取。">
            <div className="grid grid-cols-2 gap-3">
              {[
                ["组件总数", `${manifest.components.length}`],
                ["Stable 组件", `${stableComponents}`],
                ["Figma eligible", `${eligibleComponents}`],
                ["基础规范", `${figmaSync.foundations.length}`],
              ].map(([label, value]) => (
                <div key={label} className="rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-[var(--neutral-50)] p-4">
                  <p className="text-xs text-[var(--text-tertiary)]">{label}</p>
                  <p className="mt-1 text-2xl font-semibold leading-8 text-[var(--text-primary)]">{value}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs leading-[var(--type-caption-line-height)] text-[var(--text-tertiary)]">
              成熟度统计：stable {statusCount.stable ?? 0} · review {statusCount.review ?? 0} · draft {statusCount.draft ?? 0}
            </p>
          </ExampleCard>

          <ExampleCard title="每轮交付必须完成" description="设计师在 Codex 中发起任务时，按这四步验收。">
            <SpecList
              items={[
                "网页规范站能直观看到规则、状态和示例，桌面与 375px 移动端无页面级横向溢出。",
                "前端能在 docs/components、packages/vue-ui 和组件合同中找到同名同义的实现依据。",
                "Figma 同步前确认组件状态为 stable，tokens 与 manifest 没有未同步差异。",
                "每轮修改运行 npm run verify，并提供被修改页面的关键截图和剩余未审页面。",
              ]}
            />
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Workflow"
          title="设计师在 Codex 中的维护方式"
          description="把设计反馈写成页面组、问题类型和验收视口，Codex 才能稳定修复并持续维护。"
        />
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <ExampleCard title="推荐描述" tone="recommended">
            <div className="rounded-[var(--radius-sm)] bg-[var(--neutral-50)] p-4 font-mono text-xs leading-6 text-[var(--text-secondary)]">
              按视觉一致性清单检查「表格组件页」：
              <br />
              只修说明表格字号、组件示例密度、卡片间距和移动端溢出；
              <br />
              不改组件 API；
              <br />
              改完运行 npm run verify，并给我 1440px 和 375px 截图。
            </div>
          </ExampleCard>
          <ExampleCard title="不推荐描述" tone="avoid">
            <div className="rounded-[var(--radius-sm)] bg-[var(--neutral-50)] p-4 font-mono text-xs leading-6 text-[var(--text-secondary)]">
              帮我全盘检查一下有没有问题。
            </div>
            <p className="mt-3 text-sm leading-[var(--type-body-m-line-height)] text-[var(--text-secondary)]">
              这类任务没有页面边界和验收标准，容易只检查代码通过，而漏掉设计师真正关心的视觉细节。
            </p>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Next"
          title="下一阶段"
          description="当前仓库已具备同源交付结构，后续重点是逐页视觉审计和 Figma 组件落地。"
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            { icon: <CheckCircle size={18} />, title: "逐页视觉验收", text: "按基础页、组件页、模板页顺序修复视觉细节。" },
            { icon: <Package size={18} />, title: "前端包收口", text: "补齐 Vue 组件导出、版本策略和使用文档。" },
            { icon: <GitBranch size={18} />, title: "Figma 批次同步", text: "稳定组件按批次进入 Figma Variables 和 Components。" },
          ].map((item) => (
            <SectionCard key={item.title}>
              <div className="mb-3 text-[var(--text-primary)]">{item.icon}</div>
              <SubsectionHeading title={item.title} />
              <p className="text-sm leading-[var(--type-body-m-line-height)] text-[var(--text-secondary)]">{item.text}</p>
            </SectionCard>
          ))}
        </div>
      </section>
    </div>
  );
}
