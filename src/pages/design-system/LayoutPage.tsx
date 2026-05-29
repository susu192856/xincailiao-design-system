import PageHeader from "../../components/docs/PageHeader";

type Breakpoint = {
  name: string;
  size: string;
  cols: string;
  gutter: string;
  margin: string;
  usage: string;
};

function SectionHeading({
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-8">
      <div className="mb-4">
        <div className="flex items-center gap-3">
          <span className="h-5 w-0.5 shrink-0 bg-[var(--docs-accent)]" aria-hidden="true" />
          <h2 className="text-lg font-semibold leading-6 text-[var(--neutral-900)]">{title}</h2>
          <div className="hidden h-px flex-1 bg-[var(--neutral-200)] md:block" />
        </div>
      </div>
      {description ? (
        <p className="max-w-4xl text-sm leading-7 text-[var(--neutral-600)]">{description}</p>
      ) : null}
    </div>
  );
}

function WebsiteLayoutExample() {
  return (
    <div className="rounded-sm bg-white p-6">
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--neutral-500)]">Website</p>
        <h3 className="mt-2 text-lg font-semibold text-[var(--neutral-900)]">官网/门户布局</h3>
      </div>
      <div className="overflow-hidden rounded-sm bg-[var(--neutral-50)]">
        <div className="h-10 bg-[var(--neutral-900)]" />
        <div className="px-8 py-6">
          <div className="mx-auto max-w-[70%]">
            <div className="mb-4 h-16 bg-white" />
            <div className="grid grid-cols-2 gap-3">
              <div className="h-20 bg-white" />
              <div className="h-20 bg-white" />
            </div>
          </div>
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-[var(--neutral-600)]">
        内容居中、留白宽松、强调首屏视觉与转化入口。
      </p>
    </div>
  );
}

function BackendLayoutExample() {
  return (
    <div className="rounded-sm bg-white p-6">
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--neutral-500)]">Product</p>
        <h3 className="mt-2 text-lg font-semibold text-[var(--neutral-900)]">后台/B端布局</h3>
      </div>
      <div className="overflow-hidden rounded-sm bg-[var(--neutral-50)]">
        <div className="h-10 bg-[var(--neutral-100)]" />
        <div className="flex h-36">
          <div className="w-16 bg-[var(--neutral-900)]" />
          <div className="grid flex-1 grid-cols-3 gap-3 p-4">
            <div className="bg-white" />
            <div className="bg-white" />
            <div className="bg-white" />
            <div className="col-span-3 bg-white" />
          </div>
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-[var(--neutral-600)]">
        侧边导航、信息密度高、充分利用横向空间承载操作。
      </p>
    </div>
  );
}

function GridSystemExample() {
  return (
    <div className="rounded-sm bg-white p-6">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--neutral-500)]">12 Columns</p>
          <h3 className="mt-2 text-lg font-semibold text-[var(--neutral-900)]">12列网格示例</h3>
        </div>
        <span className="h-2 w-2 bg-[#FF112D]" />
      </div>
      <div className="grid grid-cols-12 gap-2">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="flex h-24 items-center justify-center bg-[var(--neutral-100)] text-xs text-[var(--neutral-500)]">
            {index + 1}
          </div>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-12 gap-2">
        <div className="col-span-8 h-12 bg-[var(--neutral-900)]" />
        <div className="col-span-4 h-12 bg-[var(--neutral-200)]" />
        <div className="col-span-4 h-12 bg-[var(--neutral-100)]" />
        <div className="col-span-4 h-12 bg-[var(--neutral-100)]" />
        <div className="col-span-4 h-12 bg-[var(--neutral-100)]" />
      </div>
    </div>
  );
}

function ResponsiveExample() {
  const rows = [
    { label: "Mobile 4列", width: "375px", cols: 4 },
    { label: "Tablet 8列", width: "768px", cols: 8 },
    { label: "Desktop 12列", width: "1440px", cols: 12 },
  ];

  return (
    <div className="rounded-sm bg-white p-6">
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--neutral-500)]">Responsive</p>
        <h3 className="mt-2 text-lg font-semibold text-[var(--neutral-900)]">响应式布局示例</h3>
      </div>
      <div className="space-y-5">
        {rows.map((row) => (
          <div key={row.label}>
            <div className="mb-2 flex items-center justify-between text-xs text-[var(--neutral-500)]">
              <span>{row.label}</span>
              <span>{row.width}</span>
            </div>
            <div className={`grid gap-2 ${row.cols === 4 ? "grid-cols-4" : row.cols === 8 ? "grid-cols-8" : "grid-cols-12"}`}>
              {Array.from({ length: row.cols }).map((_, index) => (
                <div key={index} className="h-8 bg-[var(--neutral-100)]" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LayoutPage() {
  const breakpoints: Breakpoint[] = [
    { name: "Mobile", size: "375px - 767px", cols: "4列", gutter: "16px", margin: "16px", usage: "移动端适配" },
    { name: "Tablet", size: "768px - 1023px", cols: "8列", gutter: "20px", margin: "24px", usage: "平板设备" },
    { name: "Desktop", size: "1024px - 1439px", cols: "12列", gutter: "24px", margin: "32px", usage: "桌面端标准" },
    { name: "Large", size: "1440px - 1919px", cols: "12列", gutter: "24px", margin: "48px", usage: "大屏幕" },
    { name: "XLarge", size: "≥ 1920px", cols: "12列", gutter: "24px", margin: "自适应", usage: "超大屏" },
  ];

  const layoutStrategies = [
    {
      title: "官网/门户",
      eyebrow: "Website / Portal",
      summary: "面向品牌传播、产品展示和转化入口，布局应先建立信任和价值认知，再引导用户进入产品或业务流程。",
      specs: [
        ["设计稿宽度", "1920px"],
        ["内容最大宽度", "1400px 居中"],
        ["顶部导航", "64px"],
        ["Hero / Banner", "500 / 650 / 800px"],
      ],
      highlight: ["首屏价值主张", "品牌识别与信任感", "核心转化入口", "图文叙事节奏"],
      weaken: ["高密度表格", "复杂筛选器", "多级侧边导航", "过多操作按钮"],
      rows: [
        ["内容排布", "大板块分区，1-2列为主，图文结合，注重视觉叙事和故事化表达。"],
        ["信息密度", "低密度，宽松间距 32px-64px，突出重点内容，营造呼吸感。"],
        ["用户行为", "浏览式交互，以滚动为主，停留时间短，需快速抓住注意力。"],
      ],
    },
    {
      title: "后台/B端",
      eyebrow: "Backend / B2B",
      summary: "面向数据空间、材库、AI 应用和后台管理，布局应优先服务长时间操作、快速筛选、批量处理和状态判断。",
      specs: [
        ["设计稿宽度", "1440px"],
        ["内容区宽度", "100% 自适应"],
        ["侧边栏", "200-240px / 56px"],
        ["顶部操作栏", "64px"],
      ],
      highlight: ["筛选与搜索", "表格与列表数据", "状态与权限反馈", "批量和高频操作"],
      weaken: ["大面积 Hero", "营销式视觉装饰", "过宽正文段落", "低频入口抢占首屏"],
      rows: [
        ["内容排布", "卡片和表格密集排列，3-4列为主，强调数据展示和操作便捷性。"],
        ["信息密度", "高密度，紧凑间距 16px-24px，减少滚动次数，提升信息获取效率。"],
        ["用户行为", "操作式交互，以点击、筛选、表单提交为主，长时间使用，需功能清晰易找。"],
      ],
    },
  ];

  const gridReasons = [
    {
      title: "灵活性与可分割性",
      text: "12可被1、2、3、4、6、12整除，支持单列、两列、三列、四列和不对称布局。",
    },
    {
      title: "响应式设计基础",
      text: "Desktop保持12列，Tablet收缩为8列，Mobile简化为4列，保证跨设备一致。",
    },
    {
      title: "团队协作与一致性",
      text: "设计稿和代码实现遵循同一栅格规范，减少布局偏差，提高交付效率。",
    },
    {
      title: "行业标准与组件库适配",
      text: "主流UI框架默认采用12列网格，统一标准可更好集成第三方组件库。",
    },
  ];

  const responsiveRules = [
    {
      title: "移动端优先",
      text: "从最小屏幕开始设计，逐步增强布局复杂度。官网需完整适配移动端，后台可选择性支持平板端。",
    },
    {
      title: "断点过渡",
      text: "Mobile 到 Tablet 从4列扩展为8列；Tablet 到 Desktop 扩展为12列并展开更多功能。",
    },
    {
      title: "内容优先级",
      text: "小屏隐藏次要信息，中屏收起部分功能到更多菜单，大屏展开完整工具栏和操作按钮。",
    },
    {
      title: "触控优化",
      text: "移动端按钮最小点击区域44×44px，输入框高度≥48px，列表项间距≥12px。",
    },
  ];

  const bestPractices = [
    "正文容器宽度不超过700px，避免视线跨度过大影响阅读。",
    "卡片、表格、表单等组件垂直间距遵循8px基数，避免视觉跳跃。",
    "主要CTA按钮、搜索框、筛选器等应在首屏可见，减少滚动查找成本。",
    "响应式图片使用srcset或picture标签，避免移动端加载桌面端大图。",
    "断点调试不能完全替代真机测试，需要关注 iOS Safari 和 Android Chrome 的渲染差异。",
  ];

  return (
    <div className="space-y-20">
      <PageHeader title="布局" description="定义页面结构、网格系统和响应式断点，确保官网、门户和后台产品在不同场景下保持稳定、清晰、高效的内容排布。" />

      <section>
        <SectionHeading
          eyebrow="Layout Strategy"
          title="官网与后台的布局策略"
          description="官网与后台系统在布局目标上不同：官网更强调品牌叙事和转化入口，后台更强调信息密度、操作效率和可持续工作流。"
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {layoutStrategies.map((strategy) => (
            <div key={strategy.title} className="rounded-sm border border-[var(--neutral-200)] bg-white p-6">
              <div className="mb-6 flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--neutral-500)]">{strategy.eyebrow}</p>
                  <h3 className="mt-2 text-lg font-semibold text-[var(--neutral-900)]">{strategy.title}</h3>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-[var(--neutral-600)]">{strategy.summary}</p>
                </div>
                <span className={`mt-1 h-2 w-2 ${strategy.title === "官网/门户" ? "bg-[var(--brand-600)]" : "bg-[var(--product-blue-500)]"}`} />
              </div>

              <div className="mb-6 grid grid-cols-2 gap-px bg-[var(--neutral-100)]">
                {strategy.specs.map(([label, value]) => (
                  <div key={label} className="bg-[var(--neutral-50)] p-4">
                    <p className="text-xs text-[var(--neutral-500)]">{label}</p>
                    <p className="mt-2 font-mono text-lg font-semibold text-[var(--neutral-900)]">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="bg-[var(--neutral-50)] p-4">
                  <p className="mb-3 text-sm font-semibold text-[var(--neutral-900)]">优先突出</p>
                  <div className="flex flex-wrap gap-2">
                    {strategy.highlight.map((item) => (
                      <span key={item} className="bg-white px-2.5 py-1 text-xs text-[var(--neutral-900)]">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-[var(--neutral-50)]/60 p-4">
                  <p className="mb-3 text-sm font-semibold text-[var(--neutral-500)]">需要弱化</p>
                  <div className="flex flex-wrap gap-2">
                    {strategy.weaken.map((item) => (
                      <span key={item} className="bg-white px-2.5 py-1 text-xs text-[var(--neutral-500)]">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-sm">
                {strategy.rows.map(([label, text]) => (
                  <div key={label} className="grid gap-2 md:grid-cols-[96px_1fr]">
                    <p className="font-semibold text-[var(--neutral-900)]">{label}</p>
                    <p className="leading-6 text-[var(--neutral-600)]">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          <WebsiteLayoutExample />
          <BackendLayoutExample />
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Grid System"
          title="12列网格系统"
          description="12列网格系统同时适用于官网和后台。它提供足够的可分割性，让叙事型页面和高密度产品页面都能保持一致的结构秩序。"
        />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
          <GridSystemExample />
          <div className="grid grid-cols-1 gap-4">
            {gridReasons.map((reason) => (
              <div key={reason.title} className="rounded-sm bg-white p-5">
                <h3 className="text-sm font-semibold text-[var(--neutral-900)]">{reason.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--neutral-600)]">{reason.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Layout Tokens"
          title="布局 Token"
          description="以下 CSS 变量可直接在开发中使用，保持官网与后台布局的一致性。"
        />
        <div className="overflow-hidden rounded-none border border-[var(--neutral-200)]">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-[var(--neutral-50)] text-sm font-semibold text-[var(--neutral-900)]">
              <tr className="border-b border-[var(--neutral-200)]">
                <th className="px-6 py-3 font-semibold">Token</th>
                <th className="px-6 py-3 font-semibold">值</th>
                <th className="px-6 py-3 font-semibold">说明</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--neutral-200)] bg-white">
              {[
                ["--layout-website-width", "1920px", "官网设计稿宽度"],
                ["--layout-website-content", "1400px", "官网内容最大宽度"],
                ["--layout-website-nav-height", "64px", "官网顶部导航高度"],
                ["--layout-backend-width", "1440px", "后台设计稿宽度"],
                ["--layout-backend-sidebar-expanded", "240px", "后台侧边栏展开宽度"],
                ["--layout-backend-sidebar-collapsed", "56px", "后台侧边栏收起宽度"],
              ].map(([token, value, desc]) => (
                <tr key={token}>
                  <td className="px-6 py-4 font-mono text-xs text-[var(--neutral-700)]">{token}</td>
                  <td className="px-6 py-4 font-mono text-xs text-[var(--neutral-900)]">{value}</td>
                  <td className="px-6 py-4 text-sm text-[var(--neutral-600)]">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Breakpoints"
          title="响应式断点"
          description="基于主流设备分辨率定义断点，确保从移动端到大屏都能获得稳定的信息层级和可用操作空间。"
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
          {breakpoints.map((bp) => (
            <div key={bp.name} className="rounded-sm bg-white p-5">
              <div className="mb-5 flex items-start justify-between">
                <div>
                  <p className="font-mono text-xs text-[var(--neutral-500)]">{bp.name}</p>
                  <h3 className="mt-2 text-lg font-semibold text-[var(--neutral-900)]">{bp.cols}</h3>
                </div>
                <span className="h-2 w-2 bg-[var(--neutral-900)]" />
              </div>
              <div className="space-y-2 text-sm text-[var(--neutral-600)]">
                <p>{bp.size}</p>
                <p>Gutter {bp.gutter}</p>
                <p>Margin {bp.margin}</p>
                <p className="pt-2 text-xs font-semibold text-[var(--neutral-500)]">{bp.usage}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          <ResponsiveExample />
          <div className="grid grid-cols-1 gap-4">
            {responsiveRules.map((rule) => (
              <div key={rule.title} className="rounded-sm bg-white p-5">
                <h3 className="text-sm font-semibold text-[var(--neutral-900)]">{rule.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--neutral-600)]">{rule.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Best Practices" title="布局最佳实践" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
          {bestPractices.map((practice, index) => (
            <div key={practice} className="rounded-sm bg-white p-5">
              <div className="mb-5 font-mono text-3xl font-semibold text-[var(--neutral-100)]">
                {String(index + 1).padStart(2, "0")}
              </div>
              <p className="text-sm leading-6 text-[var(--neutral-700)]">{practice}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
