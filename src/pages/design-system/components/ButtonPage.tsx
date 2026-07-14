import {
  ArrowRight,
  CheckCircle,
  DownloadSimple,
  PencilSimple,
  Plus,
  Trash,
  WarningCircle,
} from "@phosphor-icons/react";
import { useState } from "react";
import PageHeader from "../../../components/docs/PageHeader";
import { SectionHeading } from "../../../components/docs/ComponentDoc";
import CodeBlock from "../../../components/docs/CodeBlock";
import DocsTable from "../../../components/docs/DocsTable";
import { Button } from "../../../components/ui/Button";

type ButtonTone = "task" | "neutral" | "product" | "brand" | "danger" | "warning" | "success";
type ButtonVariant = "solid" | "outline" | "ghost" | "text";
type ButtonContent = "text" | "icon-left" | "icon-right" | "icon-only";

function SpecCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-5 md:p-6">
      <div className="mb-5">
        <h3 className="text-base font-semibold leading-[var(--type-body-l-line-height)] text-[var(--text-primary)]">{title}</h3>
        {description ? <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{description}</p> : null}
      </div>
      {children}
    </div>
  );
}

function ButtonSurface({
  children,
  className = "",
  gap = "normal",
}: {
  children: React.ReactNode;
  className?: string;
  gap?: "tight" | "normal" | "loose";
}) {
  const gapClass = {
    tight: "gap-2",
    normal: "gap-3",
    loose: "gap-4",
  }[gap];

  return (
    <div className={`flex min-h-[96px] items-center ${gapClass} rounded-[var(--radius-sm)] bg-[var(--neutral-50)] p-4 ${className}`}>
      {children}
    </div>
  );
}

function MetaText({ children }: { children: React.ReactNode }) {
  return <p className="mt-3 text-xs leading-[var(--type-caption-line-height)] text-[var(--text-tertiary)]">{children}</p>;
}

function ButtonDemoCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-4">
      <div className="mb-4">
        <p className="text-sm font-semibold text-[var(--text-primary)]">{title}</p>
        <p className="mt-1 text-xs leading-5 text-[var(--text-tertiary)]">{description}</p>
      </div>
      <ButtonSurface>{children}</ButtonSurface>
    </div>
  );
}

function IconOnlyButton({
  label,
  tone = "neutral",
  variant = "ghost",
  disabled = false,
  className = "",
  icon,
  displayOnly = false,
}: {
  label: string;
  tone?: ButtonTone;
  variant?: ButtonVariant;
  disabled?: boolean;
  className?: string;
  icon: React.ReactNode;
  displayOnly?: boolean;
}) {
  return (
    <Button
      aria-label={label}
      title={label}
      variant={variant}
      tone={tone}
      disabled={disabled}
      icon={icon}
      tabIndex={displayOnly ? -1 : undefined}
      className={`w-11 px-0 md:w-8 ${displayOnly ? "pointer-events-none select-none" : ""} ${className}`}
    />
  );
}

function StateButton({
  variant = "solid",
  tone = "task",
  state,
  children,
}: {
  variant?: ButtonVariant;
  tone?: ButtonTone;
  state: "default" | "hover" | "active" | "disabled";
  children?: React.ReactNode;
}) {
  const stateClass: Partial<Record<ButtonVariant, Partial<Record<ButtonTone, Partial<Record<typeof state, string>>>>>> = {
    solid: {
      task: { hover: "bg-[var(--color-action-task-hover)]", active: "bg-[var(--color-action-task-active)]" },
      neutral: { hover: "bg-[var(--neutral-800)]", active: "bg-[var(--neutral-700)]" },
      product: { hover: "bg-[var(--product-blue-600)]", active: "bg-[var(--product-blue-700)]" },
      brand: { hover: "bg-[var(--brand-700)]", active: "bg-[var(--brand-800)]" },
      danger: { hover: "bg-[var(--error-solid-hover)]", active: "bg-[var(--error-solid-active)]" },
      warning: { hover: "bg-[var(--warning-solid-hover)]", active: "bg-[var(--warning-solid-active)]" },
      success: { hover: "bg-[var(--success-solid-hover)]", active: "bg-[var(--success-solid-active)]" },
    },
    outline: {
      task: { hover: "!bg-[var(--neutral-50)]", active: "!bg-[var(--neutral-100)]" },
      neutral: { hover: "!bg-[var(--neutral-50)]", active: "!bg-[var(--neutral-100)]" },
      product: { hover: "!bg-[var(--product-blue-50)]", active: "!bg-[var(--product-blue-100)]" },
      brand: { hover: "!bg-[var(--brand-50)]", active: "!bg-[var(--brand-100)]" },
      danger: { hover: "!bg-[var(--error-bg)]", active: "!bg-[var(--error-border)]" },
      warning: { hover: "!bg-[var(--warning-bg)]", active: "!bg-[var(--warning-border)]" },
      success: { hover: "!bg-[var(--success-bg)]", active: "!bg-[var(--success-border)]" },
    },
    ghost: {
      task: { hover: "!bg-[var(--neutral-200)]", active: "!bg-[var(--neutral-300)]" },
      neutral: { hover: "!bg-[var(--neutral-200)]", active: "!bg-[var(--neutral-300)]" },
      product: { hover: "!bg-[var(--product-blue-100)]", active: "!bg-[var(--product-blue-200)]" },
      brand: { hover: "!bg-[var(--brand-100)]", active: "!bg-[var(--brand-200)]" },
      danger: { hover: "!bg-[var(--error-border)]", active: "!bg-[var(--error-border)]" },
      warning: { hover: "!bg-[var(--warning-border)]", active: "!bg-[var(--warning-border)]" },
      success: { hover: "!bg-[var(--success-border)]", active: "!bg-[var(--success-border)]" },
    },
    text: {
      task: { hover: "!bg-[var(--neutral-50)]", active: "!bg-[var(--neutral-100)]" },
      neutral: { hover: "!bg-[var(--neutral-50)]", active: "!bg-[var(--neutral-100)]" },
      product: { hover: "!bg-[var(--product-blue-50)]", active: "!bg-[var(--product-blue-100)]" },
      brand: { hover: "!bg-[var(--brand-50)]", active: "!bg-[var(--brand-100)]" },
      danger: { hover: "!bg-[var(--error-bg)]", active: "!bg-[var(--error-border)]" },
      warning: { hover: "!bg-[var(--warning-bg)]", active: "!bg-[var(--warning-border)]" },
      success: { hover: "!bg-[var(--success-bg)]", active: "!bg-[var(--success-border)]" },
    },
  };

  return (
    <Button
      variant={variant}
      tone={tone}
      disabled={state === "disabled"}
      tabIndex={-1}
      className={`pointer-events-none select-none ${stateClass[variant]?.[tone]?.[state] ?? ""}`}
    >
      {children ?? stateLabels[state]}
    </Button>
  );
}

function IconStatePair({ state }: { state: "default" | "hover" | "active" | "disabled" }) {
  const editClass = {
    default: "",
    hover: "!bg-[var(--neutral-100)]",
    active: "!bg-[var(--neutral-200)]",
    disabled: "",
  }[state];
  const deleteClass = {
    default: "",
    hover: "!bg-[var(--error-bg)]",
    active: "!bg-[var(--error-border)]",
    disabled: "",
  }[state];

  return (
    <div className="flex items-center gap-1.5">
      <IconOnlyButton
        label="编辑"
        variant="text"
        disabled={state === "disabled"}
        className={editClass}
        icon={<PencilSimple size={16} className="h-4 w-4" weight="regular" />}
        displayOnly
      />
      <IconOnlyButton
        label="删除"
        tone="danger"
        variant="text"
        disabled={state === "disabled"}
        className={deleteClass}
        icon={<Trash size={16} className="h-4 w-4" weight="regular" />}
        displayOnly
      />
    </div>
  );
}

const stateLabels = {
  default: "默认",
  hover: "悬停",
  active: "按下",
  disabled: "禁用",
};

const typeCards = [
  {
    title: "主按钮",
    description: "承载当前区域最重要动作。同一操作组只保留一个 solid。",
    demo: (
      <>
        <Button tone="task">提交审核</Button>
        <Button tone="product">运行分析</Button>
        <Button tone="brand">预约演示</Button>
      </>
    ),
  },
  {
    title: "次按钮",
    description: "保留可见性但降低层级，通常与主按钮搭配。",
    demo: (
      <>
        <Button variant="outline" tone="neutral">返回列表</Button>
        <Button variant="outline" tone="product">导出数据</Button>
      </>
    ),
  },
  {
    title: "弱按钮",
    description: "用于取消、关闭、重置等低干扰操作。",
    demo: (
      <>
        <Button variant="ghost" tone="neutral">取消</Button>
        <Button variant="ghost" tone="product">刷新数据</Button>
      </>
    ),
  },
  {
    title: "文字按钮",
    description: "用于辅助入口、轻量跳转和表格行内操作。",
    demo: (
      <>
        <Button variant="text" tone="product">稍后处理</Button>
        <Button variant="text" tone="product" icon={<ArrowRight size={16} className="h-4 w-4" weight="regular" />} iconPosition="right">
          查看详情
        </Button>
      </>
    ),
  },
  {
    title: "图标按钮",
    description: "用于工具栏或行内高频操作，必须提供 title 或 aria-label。",
    demo: (
      <>
        <IconOnlyButton label="编辑" variant="text" icon={<PencilSimple size={16} className="h-4 w-4" weight="regular" />} />
        <IconOnlyButton label="删除" tone="danger" variant="text" icon={<Trash size={16} className="h-4 w-4" weight="regular" />} />
      </>
    ),
  },
  {
    title: "图标 + 文字按钮",
    description: "图标前置表示动作类型，图标后置表示方向、延伸或进入下一步。",
    demo: (
      <>
        <Button tone="task" icon={<Plus size={16} className="h-4 w-4" weight="regular" />}>新建项目</Button>
        <Button variant="outline" tone="product" icon={<DownloadSimple size={16} className="h-4 w-4" weight="regular" />}>导出数据</Button>
        <Button tone="brand" icon={<ArrowRight size={16} className="h-4 w-4" weight="regular" />} iconPosition="right">立即体验</Button>
      </>
    ),
  },
];

const stateRows: Array<{
  type: string;
  description: string;
  label: string;
  variant: ButtonVariant;
  tone: ButtonTone;
  icon?: React.ReactNode;
}> = [
  { type: "主按钮", description: "solid 承载最高层级操作。", label: "提交审核", variant: "solid", tone: "task" },
  { type: "次按钮", description: "outline 与主按钮配对。", label: "导出数据", variant: "outline", tone: "product" },
  { type: "弱按钮", description: "ghost 降低视觉干扰。", label: "取消", variant: "ghost", tone: "neutral" },
  { type: "文字按钮", description: "text 用于轻量操作和跳转。", label: "查看详情", variant: "text", tone: "product" },
  { type: "图标 + 文字", description: "状态变化跟随按钮主体。", label: "导出数据", variant: "outline", tone: "product", icon: <DownloadSimple size={16} className="h-4 w-4" weight="regular" /> },
];

const triToneRows = [
  ["官网 / 营销页", "brand solid", "neutral outline / text", "预约演示、立即体验", "红色承担品牌转化，黑色只用于登录、提交资料等事务动作。"],
  ["门户 / 数据空间首页", "brand 或 product solid", "neutral outline / product text", "进入空间、连接数据", "转化用 brand，能力入口用 product，同组不并列两个 solid。"],
  ["后台 / 管理系统", "task solid", "product outline / text", "提交审核、新建项目、导出数据", "黑色推进任务，蓝色调用能力，红色不进入常规操作组。"],
  ["应用平台 / AI 能力页", "product solid", "neutral ghost / task outline", "运行分析、生成报告", "页面核心是调用能力时，蓝色可作为唯一 solid；保存配置回到 task。"],
];

const semanticRows = [
  ["danger", "删除、撤销、停用等高风险操作", "--error-solid / --error-text / --error-bg", "必须配合二次确认；不要用 brand 红替代 danger。"],
  ["warning", "临界风险确认、即将超时、继续执行", "--warning-solid / --warning-text / --warning-bg", "用于需要用户注意但尚未失败的动作，不用于普通提示。"],
  ["success", "标记完成、确认通过、继续配置", "--success-solid / --success-text / --success-bg", "只在明确正向状态下使用；普通提交仍用 task。"],
];

const layoutRows = [
  ["sm", "28px", "12px", "4px", "8px", "表格行内 / 紧凑工具栏", "高密度操作以 text/outline 为主；纯图标按钮桌面 32px，移动端触控目标不小于 44px。"],
  ["md", "32px", "16px", "4px", "12px", "后台 / 应用平台默认", "筛选、表单、弹窗底部和常规提交；取消在左，确认在右。"],
  ["lg", "36px / 40px", "20px", "4px", "12-16px", "后台页面级操作 / 门户普通 CTA", "后台使用 36px，官网/门户使用 40px；同组只保留一个 solid。"],
  ["xl", "48px", "32px", "4px", "16px", "官网 Hero / 强转化 CTA", "用于 Hero 主 CTA、产品能力入口；移动端全宽纵向排列时上下间距 12px。"],
  ["2xl", "56px", "40px", "4px", "16px", "首屏强转化 / 大屏展示", "只用于少量品牌转化区；不进入后台和高密度界面。"],
];

function ButtonPlaygroundSection() {
  const [variant, setVariant] = useState<ButtonVariant>("solid");
  const [tone, setTone] = useState<ButtonTone>("task");
  const [size, setSize] = useState<"sm" | "md" | "lg">("md");
  const [state, setState] = useState<"default" | "loading" | "disabled">("default");
  const [content, setContent] = useState<ButtonContent>("text");
  const optionClass = (active: boolean) => `rounded-[var(--radius-sm)] border px-3 py-2 text-xs font-medium transition-colors ${active ? "border-[var(--neutral-900)] bg-[var(--neutral-900)] text-white" : "border-[var(--neutral-200)] bg-white text-[var(--text-secondary)] hover:border-[var(--neutral-400)]"}`;
  const label = tone === "product" ? "运行分析" : tone === "brand" ? "预约演示" : tone === "danger" ? "删除数据" : "提交审核";
  const stateProp = state === "loading" ? " loading" : state === "disabled" ? " disabled" : "";
  const contentOptions: { value: ButtonContent; label: string }[] = [
    { value: "text", label: "纯文字" },
    { value: "icon-left", label: "左图标 + 文字" },
    { value: "icon-right", label: "文字 + 右图标" },
    { value: "icon-only", label: "单个图标" },
  ];
  const iconOnlyClass = size === "lg" ? "w-11 px-0 md:w-9" : "w-11 px-0 md:w-8";
  const code = content === "text"
    ? `<Button variant="${variant}" tone="${tone}" size="${size}"${stateProp}>\n  ${label}\n</Button>`
    : content === "icon-only"
      ? `import { PencilSimple } from "@phosphor-icons/react";\n\n<Button\n  variant="${variant}"\n  tone="${tone}"\n  size="${size}"${stateProp}\n  icon={<PencilSimple size={16} />}\n  aria-label="编辑"\n  title="编辑"\n  className="${iconOnlyClass}"\n/>`
      : `import { ${content === "icon-left" ? "Plus" : "ArrowRight"} } from "@phosphor-icons/react";\n\n<Button\n  variant="${variant}"\n  tone="${tone}"\n  size="${size}"${stateProp}\n  icon={<${content === "icon-left" ? "Plus" : "ArrowRight"} size={16} />}\n  iconPosition="${content === "icon-left" ? "left" : "right"}"\n>\n  ${label}\n</Button>`;

  return (
    <section>
      <SectionHeading
        eyebrow="Playground"
        title="即时体验"
        description="调整按钮类型、内容形式、业务语义、尺寸和状态，观察同一接口（API）如何映射到视觉与交互。"
      />
      <SpecCard title="按钮配置" description="选择属性后，预览和代码会同步更新。">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.8fr)]">
          <div className="space-y-5">
            <div><p className="mb-2 text-xs font-semibold text-[var(--text-secondary)]">类型</p><div className="flex flex-wrap gap-2">{(["solid", "outline", "ghost", "text"] as const).map((item) => <button key={item} type="button" aria-pressed={variant === item} onClick={() => setVariant(item)} className={optionClass(variant === item)}>{item}</button>)}</div></div>
            <div>
              <p className="mb-2 text-xs font-semibold text-[var(--text-secondary)]">内容形式</p>
              <div className="flex flex-wrap gap-2">{contentOptions.map((item) => <button key={item.value} type="button" aria-pressed={content === item.value} onClick={() => setContent(item.value)} className={optionClass(content === item.value)}>{item.label}</button>)}</div>
              <p className="mt-2 text-xs leading-5 text-[var(--text-tertiary)]">选择 text 类型并搭配左右图标，即为无背景的文字 + 图标按钮。</p>
            </div>
            <div><p className="mb-2 text-xs font-semibold text-[var(--text-secondary)]">语义</p><div className="flex flex-wrap gap-2">{(["task", "product", "brand", "danger"] as const).map((item) => <button key={item} type="button" aria-pressed={tone === item} onClick={() => setTone(item)} className={optionClass(tone === item)}>{item}</button>)}</div></div>
            <div><p className="mb-2 text-xs font-semibold text-[var(--text-secondary)]">尺寸</p><div className="flex flex-wrap gap-2">{(["sm", "md", "lg"] as const).map((item) => <button key={item} type="button" aria-pressed={size === item} onClick={() => setSize(item)} className={optionClass(size === item)}>{item}</button>)}</div></div>
            <div><p className="mb-2 text-xs font-semibold text-[var(--text-secondary)]">状态</p><div className="flex flex-wrap gap-2">{(["default", "loading", "disabled"] as const).map((item) => <button key={item} type="button" aria-pressed={state === item} onClick={() => setState(item)} className={optionClass(state === item)}>{item}</button>)}</div></div>
          </div>
          <div className="flex min-h-48 items-center justify-center rounded-[var(--radius-sm)] border border-dashed border-[var(--neutral-300)] bg-[var(--neutral-50)] p-6">
            {content === "icon-only" ? (
              <Button variant={variant} tone={tone} size={size} loading={state === "loading"} disabled={state === "disabled"} icon={<PencilSimple size={16} className="h-4 w-4" weight="regular" />} aria-label="编辑" title="编辑" className={iconOnlyClass} />
            ) : (
              <Button
                variant={variant}
                tone={tone}
                size={size}
                loading={state === "loading"}
                disabled={state === "disabled"}
                icon={content === "icon-left" ? <Plus size={16} className="h-4 w-4" weight="regular" /> : content === "icon-right" ? <ArrowRight size={16} className="h-4 w-4" weight="regular" /> : undefined}
                iconPosition={content === "icon-right" ? "right" : "left"}
              >
                {label}
              </Button>
            )}
          </div>
        </div>
      </SpecCard>
      <CodeBlock lang="tsx" label="当前按钮配置" code={code} />
    </section>
  );
}

export default function ButtonPage() {
  return (
    <div className="space-y-20">
      <PageHeader
        title="按钮"
        description="按钮用于触发动作。先判断视觉层级，再判断业务语义；页面类型决定任务色（Task）、产品色（Product）、品牌色（Brand）如何进入操作组。"
      />

      <section>
        <SectionHeading
          eyebrow="Types"
          title="按钮类型"
          description="先用类型属性（variant）建立视觉层级，再用颜色语义（tone）表达业务含义。下面只展示默认样式，避免把状态、尺寸和颜色规则混在一起。"
        />
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          {typeCards.map((item) => (
            <ButtonDemoCard key={item.title} title={item.title} description={item.description}>
              {item.demo}
            </ButtonDemoCard>
          ))}
        </div>
      </section>

      <ButtonPlaygroundSection />

      <section>
        <SectionHeading
          eyebrow="States"
          title="按钮状态"
          description="每类按钮都必须覆盖默认、悬停、按下和禁用。状态不能只依赖颜色；禁用态不可交互，加载态属于异步状态，在业务示例里单独说明。"
        />
        <div className="space-y-4">
          <SpecCard title="状态矩阵" description="状态样张只用于展示组件视觉，不响应鼠标、键盘或点击交互。">
            <p className="mb-3 text-xs leading-5 text-[var(--text-tertiary)] md:hidden">状态列较多，可在下方区域左右滑动查看完整矩阵。</p>
            <div className="overflow-x-auto">
              <div className="min-w-[760px] space-y-2">
                <div className="grid grid-cols-[190px_repeat(4,minmax(104px,1fr))] items-center gap-0.5 border-b border-[var(--neutral-200)] px-3 pb-3 text-center text-xs text-[var(--text-tertiary)]">
                  <span className="text-left">类型</span>
                  {(["default", "hover", "active", "disabled"] as const).map((state) => (
                    <span key={state}>{stateLabels[state]}</span>
                  ))}
                </div>
                {stateRows.map((row) => (
                  <div key={row.type} className="grid grid-cols-[190px_repeat(4,minmax(104px,1fr))] items-center gap-0.5 border-b border-[var(--neutral-200)] p-3">
                    <div>
                      <p className="text-sm font-semibold text-[var(--text-primary)]">{row.type}</p>
                      <p className="mt-1 text-xs leading-5 text-[var(--text-tertiary)]">{row.description}</p>
                    </div>
                    {(["default", "hover", "active", "disabled"] as const).map((state) => (
                      <div key={state} className="flex min-h-9 items-center justify-center">
                        {row.icon ? (
                          <Button
                            variant={row.variant}
                            tone={row.tone}
                            disabled={state === "disabled"}
                            icon={row.icon}
                            tabIndex={-1}
                            className={`pointer-events-none select-none ${state === "hover" ? "!bg-[var(--product-blue-50)]" : state === "active" ? "!bg-[var(--product-blue-100)]" : ""}`}
                          >
                            {row.label}
                          </Button>
                        ) : (
                          <StateButton variant={row.variant} tone={row.tone} state={state}>{row.label}</StateButton>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
                <div className="grid grid-cols-[190px_repeat(4,minmax(104px,1fr))] items-center gap-0.5 p-3">
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">图标按钮</p>
                    <p className="mt-1 text-xs leading-5 text-[var(--text-tertiary)]">黑色为常规图标，删除使用红色危险图标；默认无背景。</p>
                  </div>
                  {(["default", "hover", "active", "disabled"] as const).map((state) => (
                    <div key={state} className="flex min-h-9 items-center justify-center">
                      <IconStatePair state={state} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SpecCard>
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Size & Layout"
          title="按钮尺寸与排列"
          description="官网/门户优先可点击性和转化效率，后台/应用平台优先信息密度和操作稳定性。尺寸不要跨场景混用。"
        />
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          <SpecCard title="官网 / 门户" description="以大、特大、超大（lg / xl / 2xl）为主，用于导航、首屏区（Hero）和内容区行动入口（CTA）。">
            <div className="space-y-5">
              <ButtonSurface gap="loose">
                <Button size="lg" tone="brand">预约演示</Button>
                <Button size="lg" variant="outline" tone="neutral">查看方案</Button>
              </ButtonSurface>
              <ButtonSurface gap="loose">
                <Button size="xl" tone="brand" icon={<ArrowRight size={16} className="h-4 w-4" weight="regular" />} iconPosition="right">开始体验</Button>
                <Button size="xl" variant="outline" tone="neutral">了解产品</Button>
              </ButtonSurface>
              <ButtonSurface gap="loose">
                <Button size="2xl" tone="brand">预约咨询</Button>
                <Button size="2xl" variant="outline" tone="neutral">查看案例</Button>
              </ButtonSurface>
            </div>
          </SpecCard>

          <SpecCard title="后台 / 应用平台" description="以小、中、大（sm / md / lg）为主。后台任务推进使用任务色（Task）；应用平台能力调用可使用产品色（Product）。">
            <div className="space-y-5">
              <ButtonSurface gap="tight">
                <Button size="sm" variant="text" tone="product">查看</Button>
                <Button size="sm" variant="outline" tone="product" icon={<DownloadSimple size={16} className="h-4 w-4" weight="regular" />}>导出数据</Button>
                <Button size="sm" tone="task">新建数据</Button>
              </ButtonSurface>
              <ButtonSurface gap="normal">
                <Button size="md" variant="ghost" tone="neutral">取消</Button>
                <Button size="md" variant="outline" tone="task">保存草稿</Button>
                <Button size="md" tone="task">提交审核</Button>
              </ButtonSurface>
              <ButtonSurface gap="normal">
                <Button size="lg" variant="ghost" tone="neutral">取消</Button>
                <Button size="lg" variant="outline" tone="product">预览结果</Button>
                <Button size="lg" tone="task">确认发布</Button>
              </ButtonSurface>
            </div>
          </SpecCard>
        </div>
        <DocsTable className="mt-5" caption="尺寸、按钮内部留白和按钮组间距统一在这一张表判断。文字越长不压缩左右 padding；空间不足时换行、改短文案或改为图标按钮，不临时改小内边距。">
          <thead>
            <tr>
              <th>尺寸</th>
              <th>高度</th>
              <th>文字左右间距</th>
              <th>图标与文字间距</th>
              <th>按钮组间距</th>
              <th>场景</th>
              <th>使用规则</th>
            </tr>
          </thead>
          <tbody>
            {layoutRows.map(([size, height, padding, iconGap, buttonGap, scene, rule]) => (
              <tr key={`${size}-${scene}`}>
                <td className="font-token">{size}</td>
                <td>{height}</td>
                <td>{padding}</td>
                <td>{iconGap}</td>
                <td>{buttonGap}</td>
                <td>{scene}</td>
                <td>{rule}</td>
              </tr>
            ))}
          </tbody>
        </DocsTable>
      </section>

      <section>
        <SectionHeading
          eyebrow="Tri-tone Rules"
          title="三色三角使用规则"
          description="任务色（Task）、产品色（Product）、品牌色（Brand）是平级主操作语义。它们可以出现在同一页面的不同区域，但同一个操作组只能有一个实色按钮（solid）。"
        />
        <div className="space-y-5">
          <SpecCard title="三色怎么判断">
            <div className="rounded-[var(--radius-sm)] bg-[var(--neutral-50)] p-4">
              <div className="space-y-4 text-sm leading-6 text-[var(--text-secondary)]">
                <p><span className="relative -top-px inline-block h-2 w-2 rounded-[1px] bg-[var(--neutral-900)] ml-1 mr-2" /><span className="font-semibold text-[var(--text-primary)]">黑色（Task）：</span>提交、确认、保存、发布、创建。它改变任务状态或推动流程。</p>
                <p><span className="relative -top-px inline-block h-2 w-2 rounded-[1px] bg-[var(--product-blue-500)] ml-1 mr-2" /><span className="font-semibold text-[var(--text-primary)]">蓝色（Product）：</span>分析、生成、连接、筛选、导出、预览。它调用产品能力，通常可重复或可撤回。</p>
                <p><span className="relative -top-px inline-block h-2 w-2 rounded-[1px] bg-[var(--brand-600)] ml-1 mr-2" /><span className="font-semibold text-[var(--text-primary)]">红色（Brand）：</span>预约演示、立即体验、查看方案。它服务品牌转化，不进入常规后台操作组。</p>
              </div>
              <div className="mt-5 grid grid-cols-1 gap-3 xl:grid-cols-3">
                <div className="rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-4">
                <p className="mb-3 text-sm font-semibold text-[var(--text-primary)]">主次弱标准排列</p>
                <ButtonSurface className="min-h-0 flex-nowrap bg-white" gap="normal">
                  <Button variant="ghost" tone="neutral">取消</Button>
                  <Button variant="outline" tone="product">预览</Button>
                  <Button tone="task">提交审核</Button>
                </ButtonSurface>
                <MetaText>从左到右降低风险到推进任务：弱操作、次操作、唯一主操作。</MetaText>
                </div>
                <div className="rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-4">
                <p className="mb-3 text-sm font-semibold text-[var(--text-primary)]">红色 + 黑色</p>
                <ButtonSurface className="min-h-0 bg-white" gap="loose">
                  <Button tone="brand">预约演示</Button>
                  <Button variant="outline" tone="neutral">登录</Button>
                </ButtonSurface>
                <MetaText>官网同组以品牌色（Brand）承担转化；黑色（Task）只用于提交资料等事务，避免和行动入口（CTA）抢主次。</MetaText>
                </div>
                <div className="rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-4">
                <p className="mb-3 text-sm font-semibold text-[var(--text-primary)]">黑色 + 蓝色</p>
                <ButtonSurface className="min-h-0 flex-nowrap bg-white" gap="normal">
                  <Button variant="outline" tone="product">预览版本</Button>
                  <Button tone="task">确认发布</Button>
                </ButtonSurface>
                <MetaText>后台常见组合：任务色（Task）作为唯一实色按钮（solid），产品色（Product）降为描边型（outline）或文字型（text）。</MetaText>
                </div>
              </div>
            </div>
          </SpecCard>

          <DocsTable caption="页面类型决定 tone 的默认选择。例外必须由业务意图解释，而不是由视觉偏好决定。">
            <thead>
              <tr>
                <th>页面类型</th>
                <th>主按钮</th>
                <th>次级按钮</th>
                <th>典型文案</th>
                <th>边界</th>
              </tr>
            </thead>
            <tbody>
              {triToneRows.map(([pageType, primary, secondary, copy, boundary]) => (
                <tr key={pageType}>
                  <td className="font-token">{pageType}</td>
                  <td className="font-token">{primary}</td>
                  <td className="font-token">{secondary}</td>
                  <td>{copy}</td>
                  <td>{boundary}</td>
                </tr>
              ))}
            </tbody>
          </DocsTable>
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Semantic Buttons"
          title="语义按钮"
          description="危险（Danger）、警告（Warning）、成功（Success）是状态语义，不参与三色三角主操作模型。只有当业务状态明确时才使用。"
        />
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          <SpecCard title="危险操作" description="用于不可逆或高风险动作，必须配合二次确认。">
            <ButtonSurface className="flex-wrap">
              <Button tone="danger" icon={<Trash size={16} className="h-4 w-4" weight="regular" />}>永久删除</Button>
              <Button variant="outline" tone="danger">撤销审批</Button>
              <Button variant="text" tone="danger">移除成员</Button>
            </ButtonSurface>
            <MetaText>{semanticRows[0][3]}</MetaText>
          </SpecCard>
          <SpecCard title="警告操作" description="用于临界风险确认，不用于普通提醒。">
            <ButtonSurface>
              <Button tone="warning" icon={<WarningCircle size={16} className="h-4 w-4" weight="regular" />}>继续执行</Button>
              <Button variant="outline" tone="warning">查看风险</Button>
            </ButtonSurface>
            <MetaText>{semanticRows[1][3]}</MetaText>
          </SpecCard>
          <SpecCard title="成功操作" description="用于明确正向状态动作，不替代普通提交。">
            <ButtonSurface>
              <Button tone="success" icon={<CheckCircle size={16} className="h-4 w-4" weight="regular" />}>标记完成</Button>
              <Button variant="outline" tone="success">查看结果</Button>
            </ButtonSurface>
            <MetaText>{semanticRows[2][3]}</MetaText>
          </SpecCard>
        </div>
        <DocsTable className="mt-5">
          <thead>
              <tr>
                <th>tone</th>
                <th>适用动作</th>
                <th>颜色来源</th>
                <th>使用规则</th>
              </tr>
            </thead>
            <tbody>
            {semanticRows.map(([tone, action, token, rule]) => (
              <tr key={tone}>
                <td className="font-token">{tone}</td>
                <td>{action}</td>
                <td className="font-token">{token}</td>
                <td>{rule}</td>
              </tr>
            ))}
          </tbody>
        </DocsTable>
      </section>

      <section>
        <SectionHeading
          eyebrow="Semantic Model"
          title="按钮语义模型"
          description="前端、Figma（设计工具）和 Codex（代码协作工具）都使用同一套模型：类型属性（variant）表示视觉层级，颜色语义（tone）表示业务含义，尺寸（size）表示场景密度，状态（state）表示交互状态。"
        />
        <div>
          <DocsTable caption="代码、Figma 和页面说明使用同一字段，不新增 secondary、primaryBlue 之类的派生属性。">
            <thead>
              <tr>
                <th>字段</th>
                <th>职责</th>
                <th>默认值</th>
                <th>注意事项</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-token">variant</td>
                <td>视觉层级</td>
                <td className="font-token">solid</td>
                <td>不承载颜色语义。</td>
              </tr>
              <tr>
                <td className="font-token">tone</td>
                <td>业务语义</td>
                <td className="font-token">task</td>
                <td>蓝色不是次按钮，红色不是危险按钮。</td>
              </tr>
              <tr>
                <td className="font-token">size</td>
                <td>尺寸密度</td>
                <td className="font-token">md</td>
                <td>后台默认中尺寸（md），官网行动入口（CTA）使用大尺寸（lg）以上。</td>
              </tr>
              <tr>
                <td className="font-token">state</td>
                <td>交互状态</td>
                <td className="font-token">default</td>
                <td>禁用和加载都要阻止重复操作。</td>
              </tr>
              <tr>
                <td className="font-token">icon</td>
                <td>图标关系</td>
                <td className="font-token">none</td>
                <td>纯图标必须有可访问名称。</td>
              </tr>
            </tbody>
          </DocsTable>
        </div>
      </section>
    </div>
  );
}
