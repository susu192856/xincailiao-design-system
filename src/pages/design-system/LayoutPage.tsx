import type { ReactNode } from "react";
import {
  Bell,
  Globe,
  CaretDown,
  CaretLeft,
  CaretRight,
  FileText,
  GearSix,
  GridFour,
  MagnifyingGlass,
  Monitor,
  Table,
  UserCircle,
} from "@phosphor-icons/react";
import xincailiaoLogo from "../../assets/xincailiao-logo-horizontal.png";
import PageHeader from "../../components/docs/PageHeader";
import DocsTable from "../../components/docs/DocsTable";
import { MeasurementLabel, SectionCard, SectionHeading } from "../../components/docs/ComponentDoc";

type SkeletonKind =
  | "website-home"
  | "portal-home"
  | "website-product"
  | "website-section"
  | "website-detail"
  | "backend-dashboard"
  | "backend-list"
  | "backend-detail"
  | "backend-collapsed";

function Line({ className = "" }: { className?: string }) {
  return <span className={`block h-1 bg-[var(--neutral-300)] ${className}`} />;
}

function DimensionLine({ children }: { children: ReactNode }) {
  return (
    <span className="relative block h-8 min-w-0">
      <MeasurementLabel showArrows={false} className="absolute inset-x-0 top-1 truncate px-1">
        {children}
      </MeasurementLabel>
      <span aria-hidden="true" className="absolute inset-x-0 bottom-1 h-2">
        <span className="absolute inset-x-1 top-1/2 h-px -translate-y-1/2 bg-[var(--docs-measurement)]" />
        <span className="absolute left-0 top-1/2 h-0 w-0 -translate-y-1/2 border-y-[3px] border-r-[5px] border-y-transparent border-r-[var(--docs-measurement)]" />
        <span className="absolute right-0 top-1/2 h-0 w-0 -translate-y-1/2 border-y-[3px] border-l-[5px] border-y-transparent border-l-[var(--docs-measurement)]" />
      </span>
    </span>
  );
}

function StrategyFactGrid({ items }: { items: ReadonlyArray<readonly [string, string]> }) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
      {items.map(([label, text]) => (
        <div key={label} className="min-w-0 rounded-[var(--radius-sm)] bg-[var(--neutral-50)] p-4">
          <p className="text-xs font-medium text-[var(--text-primary)]">{label}</p>
          <p className="mt-2 text-xs leading-[var(--type-caption-line-height)] text-[var(--text-tertiary)]">{text}</p>
        </div>
      ))}
    </div>
  );
}

function BrandMark({ className = "" }: { className?: string }) {
  return <img src={xincailiaoLogo} alt="新材道" className={`h-4 w-auto object-contain ${className}`} />;
}

function WebsiteContentFrame({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto w-[73%] ${className}`}>{children}</div>;
}

function WebsiteHeader({ portal = false, productName }: { portal?: boolean; productName: string }) {
  return (
    <div className="flex h-9 items-center gap-3 border-b border-[var(--neutral-200)] bg-white px-3">
      <BrandMark />
      <span className="max-w-28 truncate border-l border-[var(--neutral-200)] pl-2 text-xs font-medium text-[var(--text-primary)]" title={productName}>
        {productName}
      </span>
      <div className="flex gap-2.5">
        <Line className="w-7 bg-[var(--neutral-700)]" />
        <Line className="w-7" />
        <Line className="w-7" />
      </div>
      <div className="ml-auto flex items-center gap-2">
        {portal ? (
          <div className="flex h-5 w-24 items-center gap-1 rounded-[2px] border border-[var(--neutral-200)] px-1.5 text-[var(--neutral-400)]">
            <MagnifyingGlass size={10} weight="regular" />
            <Line className="w-9" />
          </div>
        ) : null}
        <span className="text-xs text-[var(--text-tertiary)]">登录</span>
      </div>
    </div>
  );
}

function Breadcrumb({ detail = false }: { detail?: boolean }) {
  return (
    <div className="flex items-center gap-1.5 text-xs leading-4">
      <span className="text-[var(--neutral-400)]">首页</span>
      <span className="text-[var(--neutral-300)]">/</span>
      <span className={detail ? "text-[var(--neutral-400)]" : "text-[var(--text-tertiary)]"}>一级栏目</span>
      {detail ? (
        <>
          <span className="text-[var(--neutral-300)]">/</span>
          <span className="text-[var(--text-tertiary)]">当前详情</span>
        </>
      ) : null}
    </div>
  );
}

function WebsiteFooter() {
  return (
    <div className="flex h-7 items-center justify-center gap-3 border-t border-[var(--neutral-200)] bg-white">
      <Line className="w-8" />
      <Line className="w-8" />
      <Line className="w-8" />
    </div>
  );
}

function WebsiteBanner({ variant = "home" }: { variant?: "home" | "portal" | "product" }) {
  if (variant === "home") {
    return (
      <div className="flex min-h-[120px] items-center bg-[var(--neutral-50)]">
        <WebsiteContentFrame className="flex flex-col items-center text-center">
          <Line className="h-3 w-24 bg-[var(--neutral-700)]" />
          <Line className="mt-3 w-40" />
          <Line className="mt-1.5 w-32" />
        </WebsiteContentFrame>
      </div>
    );
  }
  return (
    <div className={`flex items-center bg-[var(--neutral-200)] ${variant === "portal" ? "min-h-[120px]" : "min-h-[80px]"}`}>
      <WebsiteContentFrame>
        <Line className="h-3 w-24 bg-[var(--neutral-700)]" />
        <Line className="mt-2 w-40" />
        <Line className="mt-1.5 w-32" />
        {variant === "portal" ? <div className="mt-3 h-5 w-14 rounded-[2px] bg-[var(--neutral-700)]" /> : null}
      </WebsiteContentFrame>
    </div>
  );
}

function ExpandedSideMenu() {
  return (
    <div className="w-24 flex flex-col border-r border-[var(--neutral-200)] bg-white p-2 pt-3">
      <div className="flex-1">
        {[GridFour, Table, FileText, GearSix].map((Icon, index) => (
          <div key={index} className={`mb-1.5 flex h-5 items-center gap-1.5 px-1 ${index === 0 ? "bg-[var(--neutral-700)] text-white" : "text-[var(--text-tertiary)]"}`}>
            <Icon size={11} weight="regular" />
            <Line className={`w-9 ${index === 0 ? "bg-white" : ""}`} />
          </div>
        ))}
      </div>
      <button type="button" className="flex h-5 w-full items-center justify-end text-[var(--text-tertiary)]" aria-label="收起侧边栏">
        <CaretLeft size={11} weight="regular" />
      </button>
    </div>
  );
}

function CompactSideMenu() {
  return (
    <div className="w-[38px] flex flex-col border-r border-[var(--neutral-200)] bg-white p-2 pt-3">
      <div className="flex-1">
        {[GridFour, Table, FileText, GearSix].map((Icon, index) => (
          <div key={index} className={`mb-1.5 mx-auto flex h-5 w-5 items-center justify-center ${index === 0 ? "bg-[var(--neutral-700)] text-white" : "text-[var(--text-tertiary)]"}`}>
            <Icon size={11} weight="regular" />
          </div>
        ))}
      </div>
      <button type="button" className="flex h-5 w-full items-center justify-center text-[var(--text-tertiary)]" aria-label="展开侧边栏">
        <CaretRight size={11} weight="regular" />
      </button>
    </div>
  );
}

function BackendTopbar() {
  return (
    <div className="flex h-9 items-center gap-2 border-b border-[var(--neutral-200)] bg-white px-3">
      <BrandMark className="max-w-12 shrink-0" />
      <span className="whitespace-nowrap border-l border-[var(--neutral-200)] pl-2 text-xs font-medium text-[var(--text-primary)]">数据管理平台</span>
      <div className="ml-auto flex shrink-0 items-center gap-2 text-[var(--text-tertiary)]">
        <MagnifyingGlass size={12} weight="regular" />
        <Bell size={12} weight="regular" />
        <UserCircle size={15} weight="regular" />
        <CaretDown size={10} weight="regular" />
      </div>
    </div>
  );
}

function BackendBreadcrumb({ detail = false }: { detail?: boolean }) {
  return (
    <div className="mb-2 flex items-center gap-1 text-xs">
      <span className="text-[var(--neutral-400)]">首页</span>
      <span className="text-[var(--neutral-300)]">/</span>
      <span className={detail ? "text-[var(--neutral-400)]" : "text-[var(--text-secondary)]"}>数据管理</span>
      {detail ? (<><span className="text-[var(--neutral-300)]">/</span><span className="text-[var(--text-secondary)]">材料详情</span></>) : null}
    </div>
  );
}

function SkeletonPreview({ kind }: { kind: SkeletonKind }) {
  if (kind === "website-home") {
    return (
      <div className="overflow-hidden border border-[var(--neutral-200)] bg-[var(--neutral-50)]">
        <WebsiteHeader productName="新材道官网" />
        <WebsiteBanner />
        <div className="bg-white px-5 py-3">
          <WebsiteContentFrame className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((item) => (
              <div key={item} className="bg-[var(--neutral-50)] p-2">
                <div className="mb-2 h-7 bg-[var(--neutral-200)]" />
                <Line className="w-2/3 bg-[var(--neutral-700)]" />
                <Line className="mt-1.5 w-full" />
              </div>
            ))}
          </WebsiteContentFrame>
          <div className="mx-auto mt-6 max-w-lg text-center">
            <Line className="mx-auto h-2 w-32 bg-[var(--neutral-700)]" />
            <Line className="mx-auto mt-2 w-56" />
          </div>
          <WebsiteContentFrame className="mt-3">
            <div className="h-12 bg-[var(--neutral-50)]" />
          </WebsiteContentFrame>
        </div>
        <WebsiteFooter />
      </div>
    );
  }
  if (kind === "portal-home") {
    return (
      <div className="overflow-hidden border border-[var(--neutral-200)] bg-[var(--neutral-50)]">
        <WebsiteHeader portal productName="可信数据空间" />
        <WebsiteBanner variant="portal" />
        <div className="min-h-36 py-3">
          <WebsiteContentFrame className="grid grid-cols-[48px_1fr] gap-2">
            <div className="bg-white p-2">
              <Line className="mb-3 w-4/5 bg-[var(--neutral-700)]" />
              {[0, 1, 2, 3].map((item) => <Line key={item} className="mb-2" />)}
            </div>
            <div>
              <div className="mb-2 flex items-center"><Line className="w-16 bg-[var(--neutral-800)]" /></div>
              <div className="grid grid-cols-3 gap-2">
                {[0, 1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="bg-white p-2">
                    <div className="mb-2 h-6 bg-[var(--neutral-50)]" />
                    <Line className="w-3/4 bg-[var(--neutral-700)]" />
                    <Line className="mt-1 w-full" />
                  </div>
                ))}
              </div>
            </div>
          </WebsiteContentFrame>
        </div>
        <WebsiteFooter />
      </div>
    );
  }
  if (kind === "website-product") {
    return (
      <div className="overflow-hidden border border-[var(--neutral-200)] bg-white">
        <WebsiteHeader productName="新材道官网" />
        <WebsiteBanner variant="product" />
        <WebsiteContentFrame className="space-y-3 py-3">
          <div className="flex flex-col items-center text-center">
            <Line className="h-2 w-24 bg-[var(--neutral-700)]" />
            <Line className="mt-2 w-40" />
          </div>
          <div className="min-h-[90px] bg-[var(--neutral-50)]" />
        </WebsiteContentFrame>
        <WebsiteFooter />
      </div>
    );
  }
  if (kind === "website-section") {
    return (
      <div className="overflow-hidden border border-[var(--neutral-200)] bg-[var(--neutral-50)]">
        <WebsiteHeader productName="材料数据服务门户" />
        <WebsiteContentFrame className="space-y-2 py-3">
          <Breadcrumb />
          <div>
            <Line className="h-2 w-20 bg-[var(--neutral-700)]" />
            <Line className="mt-1.5 w-28" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="bg-white p-2">
                <div className="h-7 bg-[var(--neutral-50)]" />
                <Line className="mt-2 w-3/4 bg-[var(--neutral-700)]" />
                <Line className="mt-1 w-1/2" />
              </div>
            ))}
          </div>
        </WebsiteContentFrame>
        <WebsiteFooter />
      </div>
    );
  }
  if (kind === "website-detail") {
    return (
      <div className="overflow-hidden border border-[var(--neutral-200)] bg-[var(--neutral-50)]">
        <WebsiteHeader productName="新材道官网" />
        <WebsiteContentFrame className="py-3">
          <div className="mb-2">
            <Breadcrumb detail />
          </div>
          <div className="grid grid-cols-[48px_1fr] gap-2">
            <div>
              <Line className="mb-2 w-full bg-[var(--neutral-800)]" />
              {[0, 1, 2].map((item) => <Line key={item} className="mb-1.5" />)}
            </div>
            <div>
              <Line className="mb-3 h-2 w-24 bg-[var(--neutral-700)]" />
              <Line className="mb-2 w-4/5" />
              <Line className="mb-2 w-3/4" />
              <Line className="mb-2 w-2/3" />
              <div className="mt-3 h-12 bg-[var(--neutral-50)]" />
            </div>
          </div>
        </WebsiteContentFrame>
        <WebsiteFooter />
      </div>
    );
  }
  if (kind === "backend-dashboard") {
    return (
      <div className="overflow-hidden border border-[var(--neutral-200)] bg-[var(--neutral-50)]">
        <BackendTopbar />
        <div className="flex min-h-[220px]">
          <ExpandedSideMenu />
          <div className="flex-1 p-3">
            <Line className="mb-3 h-2 w-1/2 bg-[var(--neutral-700)]" />
            <div className="mb-3 grid grid-cols-4 gap-2">
              {[0, 1, 2, 3].map((item) => (
                <div key={item} className="rounded-[var(--radius-md)] bg-white p-3">
                  <Line className="mb-1 w-2/3 bg-[var(--neutral-700)]" />
                  <Line className="h-3 w-1/2 bg-[var(--neutral-700)]" />
                </div>
              ))}
            </div>
            <div className="bg-white p-3">
              <Line className="mb-3 w-3/4 bg-[var(--neutral-700)]" />
              <div className="space-y-2">{[0, 1, 2, 3, 4].map((item) => <Line key={item} className="w-full" />)}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (kind === "backend-list") {
    return (
      <div className="overflow-hidden border border-[var(--neutral-200)] bg-[var(--neutral-50)]">
        <BackendTopbar />
        <div className="flex min-h-[220px]">
          <ExpandedSideMenu />
          <div className="flex-1 p-3">
            <BackendBreadcrumb />
            <Line className="mb-3 h-2 w-1/3 bg-[var(--neutral-700)]" />
            <div className="mb-2 flex items-center gap-1.5">
              <div className="flex h-5 w-24 items-center gap-1 rounded-[2px] border border-[var(--neutral-200)] bg-white px-1.5">
                <MagnifyingGlass size={10} weight="regular" />
                <Line className="w-6" />
              </div>
              <div className="flex h-5 w-12 items-center rounded-[2px] bg-[var(--neutral-700)]" />
            </div>
            <div className="overflow-hidden bg-white">
              <div className="flex border-b border-[var(--neutral-100)] px-3 py-2.5"><Line className="w-3/4 bg-[var(--neutral-700)]" /></div>
              {[0, 1, 2, 3, 4].map((item) => (
                <div key={item} className="flex border-b border-[var(--neutral-50)] px-3 py-2"><Line className="w-full" /></div>
              ))}
            </div>
            <div className="mt-2 flex justify-center gap-2"><Line className="w-8" /><Line className="w-5" /><Line className="w-8" /></div>
          </div>
        </div>
      </div>
    );
  }
  if (kind === "backend-detail") {
    return (
      <div className="overflow-hidden border border-[var(--neutral-200)] bg-[var(--neutral-50)]">
        <BackendTopbar />
        <div className="flex min-h-[220px]">
          <ExpandedSideMenu />
          <div className="flex-1 p-2">
            <div className="flex items-center justify-between">
              <Line className="h-2 w-1/3 bg-[var(--neutral-700)]" />
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Line className="w-1/3 bg-[var(--neutral-500)]" /><div className="h-5 border-b border-[var(--neutral-200)]" />
                <Line className="w-2/3 bg-[var(--neutral-500)]" /><div className="h-5 border-b border-[var(--neutral-200)]" />
                <Line className="w-1/2 bg-[var(--neutral-500)]" /><div className="h-5 border-b border-[var(--neutral-200)]" />
              </div>
              <div className="space-y-1">
                <Line className="w-1/3 bg-[var(--neutral-500)]" /><div className="h-5 border-b border-[var(--neutral-200)]" />
                <Line className="w-2/3 bg-[var(--neutral-500)]" /><div className="h-5 border-b border-[var(--neutral-200)]" />
                <Line className="w-1/2 bg-[var(--neutral-500)]" /><div className="h-5 border-b border-[var(--neutral-200)]" />
              </div>
            </div>
            <div className="mt-3 flex justify-center gap-1.5">
              <div className="h-5 w-12 rounded-[2px] border border-[var(--neutral-200)] bg-white" />
              <div className="h-5 w-12 rounded-[2px] bg-[var(--neutral-700)]" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (kind === "backend-collapsed") {
    return (
      <div className="overflow-hidden border border-[var(--neutral-200)] bg-[var(--neutral-50)]">
        <BackendTopbar />
        <div className="flex min-h-[220px]">
          <CompactSideMenu />
          <div className="flex-1 p-3">
            <Line className="mb-3 h-2 w-1/2 bg-[var(--neutral-700)]" />
            <div className="mb-3 grid grid-cols-4 gap-2">
              {[0, 1, 2, 3].map((item) => (
                <div key={item} className="rounded-[var(--radius-md)] bg-white p-3">
                  <Line className="mb-1 w-2/3 bg-[var(--neutral-700)]" />
                  <Line className="h-3 w-1/2 bg-[var(--neutral-700)]" />
                </div>
              ))}
            </div>
            <div className="bg-white p-3">
              <Line className="mb-3 w-3/4 bg-[var(--neutral-700)]" />
              <div className="space-y-2">{[0, 1, 2, 3, 4].map((item) => <Line key={item} className="w-full" />)}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

function SkeletonCard({ kind, title, description }: { kind: SkeletonKind; title: string; description: string }) {
  return (
    <SectionCard className="overflow-hidden p-0">
      <div className="bg-white pt-0 pb-4">
        <h3 className="text-sm font-semibold text-[var(--text-primary)]">{title}</h3>
        <p className="text-xs leading-5 text-[var(--text-tertiary)]">{description}</p>
      </div>
      <SkeletonPreview kind={kind} />
    </SectionCard>
  );
}

export default function LayoutPage() {
  const breakpoints = [
    { name: "移动端（Mobile）", size: "375px - 767px", previewWidth: "375px", cols: 4, gutter: "16px", margin: "16px", usage: "手机与窄屏设备" },
    { name: "平板端（Tablet）", size: "768px - 1023px", previewWidth: "768px", cols: 8, gutter: "20px", margin: "24px", usage: "平板设备" },
    { name: "桌面端（Desktop）", size: "1024px - 1439px", previewWidth: "1024px", cols: 12, gutter: "24px", margin: "32px", usage: "桌面端标准" },
    { name: "大屏（Large）", size: "1440px - 1919px", previewWidth: "1440px", cols: 12, gutter: "24px", margin: "48px", usage: "大屏幕" },
    { name: "超大屏（XLarge）", size: "≥ 1920px", previewWidth: "1920px", cols: 12, gutter: "24px", margin: "自适应", usage: "超大屏幕" },
  ];

  return (
    <div className="space-y-20">
      <PageHeader title="布局" description="定义页面结构、网格系统和响应式断点，确保官网、门户和后台产品在不同场景下保持稳定、清晰、高效的内容排布。" />

      <section>
        <SectionHeading
          eyebrow="Layout Strategy"
          title="布局策略"
          description="官网与后台在布局目标上不同：官网优先品牌叙事和转化引导，后台优先信息密度和操作效率。先判断页面类型，再套用对应的密度、容器和首屏规则。"
        />
        <div className="grid grid-cols-1 gap-5">
          <SectionCard className="p-6">
            <div className="mb-8 flex items-start gap-4 sm:items-center">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--brand-50)] text-[var(--brand-600)]">
                <Globe size={22} weight="regular" />
              </div>
              <div className="min-w-0">
                <h3 className="text-base font-medium leading-[var(--type-body-l-line-height)] text-[var(--text-primary)]">官网 / 门户</h3>
                <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">面向品牌传播、产品展示和转化入口，布局应先建立信任和价值认知，再引导用户进入产品。</p>
              </div>
            </div>
            <div className="mb-8 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
              {[["设计稿宽度","1920px"],["内容最大宽度","1400px 居中"],["顶部导航","64px"],["首屏区高度（Hero）","500/650/800px"]].map(([label, value]) => (
                <div key={label} className="min-w-0">
                  <p className="text-xs text-[var(--text-tertiary)]">{label}</p>
                  <p className="mt-1 text-sm font-medium text-[var(--text-primary)]">{value}</p>
                </div>
              ))}
            </div>
            <div className="mb-3 overflow-hidden rounded-[var(--radius-md)] border border-[var(--neutral-200)]">
              <div className="grid h-14 grid-cols-[13.5416667%_72.9166666%_13.5416667%]">
                <span className="bg-[var(--neutral-100)]" />
                <div className="grid grid-cols-12 border-x border-dashed border-[var(--neutral-300)] bg-white" style={{ columnGap: "1.7142857%" }}>
                  {Array.from({ length: 12 }).map((_, index) => (
                    <span key={index} className="min-w-0 bg-[var(--neutral-100)]" />
                  ))}
                </div>
                <span className="bg-[var(--neutral-100)]" />
              </div>
              <div className="grid grid-cols-[13.5416667%_72.9166666%_13.5416667%] items-center border-t border-[var(--neutral-200)] bg-[var(--neutral-50)]">
                <DimensionLine>260px</DimensionLine>
                <div className="border-x border-dashed border-[var(--neutral-300)]">
                  <DimensionLine>1400px · 12 列</DimensionLine>
                </div>
                <DimensionLine>260px</DimensionLine>
              </div>
            </div>
            <p className="mb-4 text-xs leading-[var(--type-caption-line-height)] text-[var(--text-tertiary)]">1400px 容器由 12 列和 11 个列间距组成。按 24px 列间距计算，单列宽度约为 (1400 - 11 × 24) ÷ 12 = 94.7px；两侧 260px 是画布外边距，不计入栅格。平板切换 8 列，移动端切换 4 列。</p>
            <StrategyFactGrid items={[["内容排布","大板块分区，1-2列为主，图文结合，注重视觉叙事。"],["信息密度","低密度，宽松间距 32-64px，重点突出，营造呼吸感。"],["用户行为","浏览式交互，以滚动为主，停留时间短，需快速抓住注意力。"]]} />
          </SectionCard>
          <SectionCard className="p-6">
            <div className="mb-8 flex items-start gap-4 sm:items-center">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--product-blue-50)] text-[var(--product-blue-500)]">
                <Monitor size={22} weight="regular" />
              </div>
              <div className="min-w-0">
                <h3 className="text-base font-medium leading-[var(--type-body-l-line-height)] text-[var(--text-primary)]">后台 / 应用平台</h3>
                <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">面向数据空间、材库、人工智能（AI）应用和后台管理，布局应优先服务长时间操作、快速筛选和状态判断。</p>
              </div>
            </div>
            <div className="mb-8 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
              {[["设计稿宽度","1440px"],["内容区宽度","100% 自适应"],["顶部操作栏","64px"],["侧边栏","200-240px / 56px"]].map(([label, value]) => (
                <div key={label} className="min-w-0">
                  <p className="text-xs text-[var(--text-tertiary)]">{label}</p>
                  <p className="mt-1 text-sm font-medium text-[var(--text-primary)]">{value}</p>
                </div>
              ))}
            </div>
            <div className="mb-3 overflow-hidden rounded-[var(--radius-md)] border border-[var(--neutral-200)]">
              <div className="grid h-14 grid-cols-[16.6666667%_83.3333333%]">
                <span className="bg-[var(--neutral-900)]" />
                <div className="grid grid-cols-[2%_96%_2%] bg-[var(--warning-bg)]">
                  <span />
                  <div className="grid grid-cols-24 border-x border-dashed border-[var(--neutral-300)] bg-white" style={{ columnGap: "1.3888889%" }}>
                    {Array.from({ length: 24 }).map((_, index) => (
                      <span key={index} className="min-w-0 bg-[var(--neutral-100)]" />
                    ))}
                  </div>
                  <span />
                </div>
              </div>
              <div className="grid grid-cols-[16.6666667%_83.3333333%] items-center border-t border-[var(--neutral-200)] bg-[var(--neutral-50)]">
                <DimensionLine>240px</DimensionLine>
                <div className="border-l border-dashed border-[var(--neutral-300)]">
                  <DimensionLine>1200px 工作区</DimensionLine>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-[var(--neutral-200)] bg-white px-3 py-2 font-data text-[10px] leading-4 text-[var(--text-tertiary)]">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2.5 w-4 border border-[var(--docs-measurement)] bg-[var(--warning-bg)]" aria-hidden="true" />
                  工作区内边距 24px（左右）
                </span>
                <span>栅格 1152px · 24 列 · 列间距 16px</span>
              </div>
            </div>
            <p className="mb-4 text-xs leading-[var(--type-caption-line-height)] text-[var(--text-tertiary)]">1440px 画布扣除 240px 侧栏后得到 1200px 工作区；再扣除左右各 24px 内边距，1152px 栅格区域由 24 列和 23 个列间距组成。按 16px 列间距计算，单列宽度约为 (1152 - 23 × 16) ÷ 24 = 32.7px。空间不足时优先收起侧栏，工作区内边距保持不变。</p>
            <StrategyFactGrid items={[["内容排布","卡片和表格密集排列，3-4列为主，强调数据展示和操作便捷性。"],["信息密度","高密度，紧凑间距 16-24px，减少滚动次数，提升获取效率。"],["用户行为","操作式交互，以点击、筛选、表单提交为主，长时间使用，需功能清晰易找。"]]} />
          </SectionCard>
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Breakpoints"
          title="响应式断点"
          description="基于主流设备分辨率定义断点，确保从移动端到大屏都能获得稳定的信息层级和可用操作空间。"
        />
        <div className="mb-5">
          <DocsTable>
            <thead>
              <tr><th>屏幕</th><th>官网</th><th>后台</th></tr>
            </thead>
            <tbody>
              {[["大屏 ≥ 1440px", "保持 12 列与 1400px 居中容器，Hero 可通栏。", "完整展开侧栏、顶部操作栏和批量操作。"],["桌面 1024px - 1439px", "缩小外边距，保留主要图文分栏。", "先收起侧栏，再压缩筛选项和次要字段。"],["平板 768px - 1023px", "从 12 列切换到 8 列，图文可改为上下排布。", "仅保留关键工作流，隐藏低频功能。"],["移动端 < 768px", "单列布局，保留品牌标识、核心内容和主 CTA。", "按需支持核心查询与审批状态操作。"]].map(([screen, website, backend]) => (
                <tr key={screen}><td>{screen}</td><td>{website}</td><td>{backend}</td></tr>
              ))}
            </tbody>
          </DocsTable>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {breakpoints.map((bp) => (
            <SectionCard key={bp.name} className="flex min-h-64 flex-col p-5">
              <div>
                <h3 className="text-base font-medium leading-6 text-[var(--text-primary)]">{bp.name}</h3>
                <p className="mt-1 text-xs text-[var(--text-tertiary)]">{bp.size} · {bp.usage}</p>
              </div>
              <div className="mt-5 rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-[var(--neutral-50)] p-3">
                <div className={`grid gap-1 ${bp.cols === 4 ? "grid-cols-4" : bp.cols === 8 ? "grid-cols-8" : "grid-cols-12"}`}>
                  {Array.from({ length: bp.cols }).map((_, index) => (
                    <span key={index} className="h-10 min-w-0 bg-white" />
                  ))}
                </div>
                <div className="mt-1">
                  <DimensionLine>{bp.previewWidth}</DimensionLine>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3 border-t border-[var(--neutral-200)] pt-4">
                {[["列数", `${bp.cols}列`], ["列间距", bp.gutter], ["页面边距", bp.margin]].map(([label, value]) => (
                  <div key={label} className="min-w-0">
                    <p className="text-xs text-[var(--text-tertiary)]">{label}</p>
                    <p className="mt-1 text-sm font-medium text-[var(--text-primary)]">{value}</p>
                  </div>
                ))}
              </div>
            </SectionCard>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Website Skeleton"
          title="官网 / 门户页面骨架"
          description="以下骨架用于说明官网与门户一至三级页面的典型信息层级和区域关系，仅作为布局起点，不是固定模板或唯一标准。实际页面可根据业务目标、内容规模、导航深度和终端尺寸调整模块数量、顺序与比例；品牌标识、全局导航和用户入口等公共结构仍需遵循统一规范。示意图按比例缩放，不代表生产尺寸。"
        />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <SkeletonCard kind="website-home" title="一级页面 · 官网首页" description="品牌标识（Logo）、全局导航、登录、居中首屏区（Hero）文案、能力卡片和页脚。" />
          <SkeletonCard kind="portal-home" title="一级页面 · 聚合门户" description="搜索、用户入口、门户首屏区（Hero）、200px 分类菜单、数据卡片和页脚。一级门户不默认展示面包屑。" />
          <SkeletonCard kind="website-product" title="二级页面 · 产品介绍" description="产品首屏区（Hero）、居中标题、描述文本、内容区和页脚。适合产品能力说明。" />
          <SkeletonCard kind="website-section" title="二级页面 · 栏目聚合" description="二级面包屑、栏目标题、筛选标签和内容卡片列表。用于承接一级入口后的聚合浏览。" />
          <SkeletonCard kind="website-detail" title="三级页面 · 图文详情" description="三级面包屑、左侧快速导航和右侧结构化正文区域。" />
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Backend Skeleton"
          title="后台 / 应用平台页面骨架"
          description="以下骨架用于说明后台与应用平台常见工作台、列表页和详情页的典型区域关系，仅作为结构参考，不要求逐项照搬。实际页面可根据任务流程、数据密度、角色权限和操作频率调整侧栏、筛选区、表格、图表与详情区；顶栏、侧栏状态和基础组件仍需遵循统一规范。示意图按比例缩放，不代表生产尺寸。"
        />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <SkeletonCard kind="backend-dashboard" title="工作台 · 数据总览" description="全面通栏品牌顶栏、240px 侧栏、指标卡片和图表区域的仪表盘。" />
          <SkeletonCard kind="backend-collapsed" title="收起态 · 紧凑工作区" description="56px 图标侧栏和完整工作区。适合需要更大内容面积的任务。" />
          <SkeletonCard kind="backend-list" title="列表页 · 筛选表格" description="搜索筛选、新增按钮、批量操作栏、可滚动数据表格和底部分页。" />
          <SkeletonCard kind="backend-detail" title="详情页 · 信息配置" description="三级面包屑、表单字段、操作按钮和流程记录的详情与配置页面。" />
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Layout Tokens"
          title="布局设计变量（Token）"
          description="以下层叠样式表变量（CSS Variables）可直接在开发中使用，保持官网与后台布局的一致性。"
        />
        <DocsTable>
          <thead>
            <tr><th>Token</th><th>值</th><th>说明</th></tr>
          </thead>
          <tbody>
            {[["--layout-website-width", "1920px", "官网设计稿宽度"],["--layout-website-content", "1400px", "官网内容最大宽度"],["--layout-website-nav-height", "64px", "官网顶部导航高度"],["--layout-website-hero-sm", "500px", "小屏 Hero 高度"],["--layout-website-hero-md", "650px", "中屏 Hero 高度"],["--layout-website-hero-lg", "800px", "大屏 Hero 高度"],["--layout-backend-width", "1440px", "后台设计稿宽度"],["--layout-backend-sidebar-expanded", "240px", "后台侧栏展开宽度"],["--layout-backend-sidebar-collapsed", "56px", "后台侧栏收起宽度"],["--layout-backend-topbar-height", "64px", "后台顶部操作栏高度"]].map(([token, value, desc]) => (
              <tr key={token}><td className="font-token">{token}</td><td>{value}</td><td>{desc}</td></tr>
            ))}
          </tbody>
        </DocsTable>
      </section>
    </div>
  );
}
