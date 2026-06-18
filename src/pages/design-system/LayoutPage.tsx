import type { ReactNode } from "react";
import {
  Bell,
  CaretDown,
  CaretLeft,
  CaretRight,
  FileText,
  GearSix,
  GridFour,
  MagnifyingGlass,
  Table,
  UserCircle,
} from "@phosphor-icons/react";
import xincailiaoLogo from "../../assets/xincailiao-logo-horizontal.png";
import PageHeader from "../../components/docs/PageHeader";
import DocsTable from "../../components/docs/DocsTable";
import { Tag } from "../../components/ui";

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

function SectionHeading({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3">
        <span className="h-5 w-0.5 shrink-0 bg-[var(--brand-600)]" aria-hidden="true" />
        <h2 className="text-2xl font-medium leading-8 text-[var(--neutral-900)]">{title}</h2>
      </div>
      {description ? <p className="mt-2 max-w-4xl text-sm leading-[22px] text-[var(--neutral-600)]">{description}</p> : null}
    </div>
  );
}

function Line({ className = "" }: { className?: string }) {
  return <span className={`block h-1 bg-[var(--neutral-300)] ${className}`} />;
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
      <span className="max-w-28 truncate border-l border-[var(--neutral-200)] pl-2 text-[9px] font-medium text-[var(--neutral-900)]" title={productName}>
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
        <span className="text-[10px] text-[var(--neutral-600)]">登录</span>
      </div>
    </div>
  );
}

function Breadcrumb({ detail = false }: { detail?: boolean }) {
  return (
    <div className="border-b border-[var(--neutral-200)] bg-white">
      <WebsiteContentFrame className="flex h-6 items-center gap-1.5">
        <span className="text-[9px] text-[var(--neutral-400)]">首页</span>
        <span className="text-[9px] text-[var(--neutral-300)]">/</span>
        <span className={`text-[9px] ${detail ? "text-[var(--neutral-400)]" : "text-[var(--neutral-800)]"}`}>一级栏目</span>
        {detail ? (
          <>
            <span className="text-[9px] text-[var(--neutral-300)]">/</span>
            <span className="text-[9px] text-[var(--neutral-800)]">当前详情</span>
          </>
        ) : null}
      </WebsiteContentFrame>
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

function WebsiteCanvasLabel() { return null; }
function BackendCanvasLabel(_props?: { compact?: boolean }) { return null; }

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
          <div key={index} className={`mb-1.5 flex h-5 items-center gap-1.5 px-1 ${index === 0 ? "bg-[var(--neutral-700)] text-white" : "text-[var(--neutral-500)]"}`}>
            <Icon size={11} weight="regular" />
            <Line className={`w-9 ${index === 0 ? "bg-white" : ""}`} />
          </div>
        ))}
      </div>
      <button type="button" className="flex h-5 w-full items-center justify-end text-[var(--neutral-500)]" aria-label="收起侧边栏">
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
          <div key={index} className={`mb-1.5 mx-auto flex h-5 w-5 items-center justify-center ${index === 0 ? "bg-[var(--neutral-700)] text-white" : "text-[var(--neutral-500)]"}`}>
            <Icon size={11} weight="regular" />
          </div>
        ))}
      </div>
      <button type="button" className="flex h-5 w-full items-center justify-center text-[var(--neutral-500)]" aria-label="展开侧边栏">
        <CaretRight size={11} weight="regular" />
      </button>
    </div>
  );
}

function BackendTopbar() {
  return (
    <div className="flex h-9 items-center gap-2 border-b border-[var(--neutral-200)] bg-white px-3">
      <BrandMark className="max-w-12 shrink-0" />
      <span className="whitespace-nowrap border-l border-[var(--neutral-200)] pl-2 text-[9px] font-medium text-[var(--neutral-900)]">新材料可信数据空间管理平台</span>
      <div className="ml-auto flex shrink-0 items-center gap-2 text-[var(--neutral-600)]">
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
    <div className="mb-2 flex items-center gap-1 text-[9px]">
      <span className="text-[var(--neutral-400)]">首页</span>
      <span className="text-[var(--neutral-300)]">/</span>
      <span className={detail ? "text-[var(--neutral-400)]" : "text-[var(--neutral-700)]"}>数据管理</span>
      {detail ? (<><span className="text-[var(--neutral-300)]">/</span><span className="text-[var(--neutral-700)]">材料详情</span></>) : null}
    </div>
  );
}

function SkeletonPreview({ kind }: { kind: SkeletonKind }) {
  if (kind === "website-home") {
    return (
      <div className="overflow-hidden border border-[var(--neutral-200)] bg-[var(--neutral-50)]">
        <WebsiteCanvasLabel />
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
        <WebsiteCanvasLabel />
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
        <WebsiteCanvasLabel />
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
        <WebsiteCanvasLabel />
        <WebsiteHeader productName="材料数据服务门户" />
        <Breadcrumb />
        <WebsiteContentFrame className="space-y-2 py-3">
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
        <WebsiteCanvasLabel />
        <WebsiteHeader productName="新材道官网" />
        <Breadcrumb detail />
        <WebsiteContentFrame className="py-3">
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
        <BackendCanvasLabel compact={false} />
        <BackendTopbar />
        <div className="flex min-h-[320px]">
          <ExpandedSideMenu />
          <div className="flex-1 p-3">
            <Line className="mb-3 h-2 w-1/2 bg-[var(--neutral-700)]" />
            <div className="mb-3 grid grid-cols-4 gap-2">
              {[0, 1, 2, 3].map((item) => (
                <div key={item} className="rounded-sm bg-white p-3">
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
        <BackendCanvasLabel />
        <BackendTopbar />
        <div className="flex min-h-[320px]">
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
        <BackendCanvasLabel />
        <BackendTopbar />
        <div className="flex min-h-[320px]">
          <ExpandedSideMenu />
          <div className="flex-1 p-3">
            <BackendBreadcrumb detail />
            <div className="rounded-sm bg-white p-3">
              <div className="flex items-center justify-between">
                <Line className="h-2 w-1/3 bg-[var(--neutral-700)]" />
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Line className="w-1/3 bg-[var(--neutral-500)]" /><div className="h-7 border-b border-[var(--neutral-200)]" />
                  <Line className="w-2/3 bg-[var(--neutral-500)]" /><div className="h-7 border-b border-[var(--neutral-200)]" />
                  <Line className="w-1/2 bg-[var(--neutral-500)]" /><div className="h-7 border-b border-[var(--neutral-200)]" />
                </div>
                <div className="space-y-2">
                  <Line className="w-1/3 bg-[var(--neutral-500)]" /><div className="h-7 border-b border-[var(--neutral-200)]" />
                  <Line className="w-2/3 bg-[var(--neutral-500)]" /><div className="h-7 border-b border-[var(--neutral-200)]" />
                  <Line className="w-1/2 bg-[var(--neutral-500)]" /><div className="h-7 border-b border-[var(--neutral-200)]" />
                </div>
              </div>
              <div className="mt-4 flex justify-center gap-1.5">
                <div className="h-5 w-12 rounded-[2px] border border-[var(--neutral-200)] bg-white" />
                <div className="h-5 w-12 rounded-[2px] bg-[var(--neutral-700)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (kind === "backend-collapsed") {
    return (
      <div className="overflow-hidden border border-[var(--neutral-200)] bg-[var(--neutral-50)]">
        <BackendCanvasLabel compact />
        <BackendTopbar />
        <div className="flex min-h-[320px]">
          <CompactSideMenu />
          <div className="flex-1 p-3">
            <Line className="mb-3 h-2 w-1/2 bg-[var(--neutral-700)]" />
            <div className="mb-3 grid grid-cols-4 gap-2">
              {[0, 1, 2, 3].map((item) => (
                <div key={item} className="rounded-sm bg-white p-3">
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
    <div className="rounded-sm bg-white">
      <div className="bg-[var(--neutral-50)] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-0.5 shrink-0 bg-[var(--brand-600)]" aria-hidden="true" />
          <span className="text-sm font-medium text-[var(--neutral-900)]">{title}</span>
        </div>
        <p className="mt-1 pl-2.5 text-xs leading-[18px] text-[var(--neutral-500)]">{description}</p>
      </div>
      <SkeletonPreview kind={kind} />
    </div>
  );
}

function GridSystemExample() {
  return (
    <div className="rounded-sm bg-[var(--neutral-50)] p-5">
      <div className="mb-4 flex items-center gap-2">
        <span className="h-2 w-2 bg-[var(--brand-600)]" />
        <h3 className="text-lg font-medium leading-[26px] text-[var(--neutral-900)]">12 列网格示例</h3>
      </div>
      <div className="grid grid-cols-12 gap-1.5">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="flex h-16 items-center justify-center rounded-sm bg-white text-xs text-[var(--neutral-400)]">{index + 1}</div>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-12 gap-1.5">
        <div className="col-span-8 h-10 rounded-sm bg-[var(--neutral-900)]" />
        <div className="col-span-4 h-10 rounded-sm bg-[var(--neutral-300)]" />
        <div className="col-span-4 h-10 rounded-sm bg-[var(--neutral-200)]" />
        <div className="col-span-4 h-10 rounded-sm bg-[var(--neutral-50)]" />
        <div className="col-span-4 h-10 rounded-sm bg-white" />
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
    <div className="rounded-sm bg-[var(--neutral-50)] p-5">
      <div className="mb-4 flex items-center gap-2">
        <span className="h-2 w-2 bg-[var(--product-blue-500)]" />
        <h3 className="text-lg font-medium leading-[26px] text-[var(--neutral-900)]">响应式布局示例</h3>
      </div>
      <div className="space-y-4">
        {rows.map((row) => (
          <div key={row.label}>
            <div className="mb-1.5 flex items-center justify-between text-xs text-[var(--neutral-500)]"><span>{row.label}</span><span>{row.width}</span></div>
            <div className={`grid gap-1.5 ${row.cols === 4 ? "grid-cols-4" : row.cols === 8 ? "grid-cols-8" : "grid-cols-12"}`}>
              {Array.from({ length: row.cols }).map((_, index) => (<div key={index} className="h-6 rounded-sm bg-white" />))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LayoutPage() {
  const breakpoints = [
    { name: "Mobile", size: "375px - 767px", cols: "4列", gutter: "16px", margin: "16px", usage: "移动端适配" },
    { name: "Tablet", size: "768px - 1023px", cols: "8列", gutter: "20px", margin: "24px", usage: "平板设备" },
    { name: "Desktop", size: "1024px - 1439px", cols: "12列", gutter: "24px", margin: "32px", usage: "桌面端标准" },
    { name: "Large", size: "1440px - 1919px", cols: "12列", gutter: "24px", margin: "48px", usage: "大屏幕" },
    { name: "XLarge", size: "≥ 1920px", cols: "12列", gutter: "24px", margin: "自适应", usage: "超大屏" },
  ];

  const layoutStrategies = [
    {
      title: "官网/门户",
      summary: "面向品牌传播、产品展示和转化入口，布局应先建立信任和价值认知，再引导用户进入产品或业务流程。",
      specs: [
        ["设计稿宽度", "1920px"], ["内容最大宽度", "1400px 居中"], ["顶部导航", "64px"],
        ["Hero / Banner", "500 / 650 / 800px"], ["基础排版", "H1 40/48 · Body/L 16/24"], ["内容间距", "32px - 64px"],
      ],
    },
    {
      title: "后台/B端",
      summary: "面向数据空间、材库、AI 应用和后台管理，布局应优先服务长时间操作、快速筛选、批量处理和状态判断。",
      specs: [
        ["设计稿宽度", "1440px"], ["内容区宽度", "100% 自适应"], ["侧边栏", "200-240px / 56px"],
        ["顶部操作栏", "64px"], ["基础排版", "H4 20/28 · Body/M 14/22"], ["内容间距", "16px - 24px"],
      ],
    },
  ];

  const gridReasons = [
    { title: "灵活性与可分割性", text: "12可被1、2、3、4、6、12整除，支持单列、两列、三列、四列和不对称布局。" },
    { title: "响应式设计基础", text: "Desktop保持12列，Tablet收缩为8列，Mobile简化为4列，保证跨设备一致。" },
    { title: "团队协作与一致性", text: "设计稿和代码实现遵循同一栅格规范，减少布局偏差，提高交付效率。" },
    { title: "行业标准与组件库适配", text: "主流UI框架默认采用12列网格，统一标准可更好集成第三方组件库。" },
  ];

  const responsiveRules = [
    { title: "移动端优先", text: "从最小屏幕开始设计，逐步增强布局复杂度。官网需完整适配移动端，后台可选择性支持平板端。" },
    { title: "断点过渡", text: "Mobile 到 Tablet 从4列扩展为8列；Tablet 到 Desktop 扩展为12列并展开更多功能。" },
    { title: "内容优先级", text: "小屏隐藏次要信息，中屏收起部分功能到更多菜单，大屏展开完整工具栏和操作按钮。" },
    { title: "触控优化", text: "移动端按钮最小点击区域44×44px，输入框高度≥48px，列表项间距≥12px。" },
  ];

  return (
    <div className="space-y-20">
      <PageHeader title="布局" description="定义页面结构、网格系统和响应式断点，确保官网、门户和后台产品在不同场景下保持稳定、清晰、高效的内容排布。" />

      <section>
        <SectionHeading title="布局策略" description="官网与后台系统在布局目标上不同：官网更强调品牌叙事和转化入口，后台更强调信息密度、操作效率和可持续工作流。" />
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {layoutStrategies.map((strategy) => (
            <div key={strategy.title} className="rounded-sm bg-[var(--neutral-50)] p-6">
              <div className="mb-5">
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 ${strategy.title === "官网/门户" ? "bg-[var(--brand-600)]" : "bg-[var(--product-blue-500)]"}`} />
                  <h3 className="text-lg font-medium leading-[26px] text-[var(--neutral-900)]">{strategy.title}</h3>
                </div>
                <p className="mt-2 text-sm leading-[22px] text-[var(--neutral-600)]">{strategy.summary}</p>
              </div>
              <div className="mb-5 grid grid-cols-2 gap-3">
                {strategy.specs.map(([label, value]) => (
                  <div key={label} className="rounded-sm bg-white p-3">
                    <p className="text-xs text-[var(--neutral-500)]">{label}</p>
                    <p className="mt-1 text-sm font-medium text-[var(--neutral-900)]">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading title="官网 / 门户页面骨架" description="使用白色或 neutral-50 作为页面背景。品牌标识和产品名称固定在通栏顶栏左侧，搜索在导航右侧仅用于门户。登录与用户状态展示在右侧。Hero 使用面向宽屏的三级响应高度。" />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <SkeletonCard kind="website-home" title="一级页面 · 官网首页" description="Logo、全局导航、登录、居中 Hero 文案、能力卡片和页脚。" />
          <SkeletonCard kind="portal-home" title="一级页面 · 聚合门户" description="搜索、用户入口、门户 Hero、200px 分类菜单、数据卡片和页脚。一级门户不默认展示面包屑。" />
          <SkeletonCard kind="website-product" title="二级页面 · 产品介绍" description="产品 Hero、居中标题、描述文本、内容区和页脚。适合产品能力说明。" />
          <SkeletonCard kind="website-section" title="二级页面 · 栏目聚合" description="二级面包屑、栏目标题、筛选标签和内容卡片列表。用于承接一级入口后的聚合浏览。" />
          <SkeletonCard kind="website-detail" title="三级页面 · 图文详情" description="三级面包屑、左侧快速导航和右侧结构化正文区域。" />
        </div>
      </section>

      <section>
        <SectionHeading title="后台 / B端页面骨架" description="使用白色或 neutral-50 工作框架。品牌标识和完整产品名称固定在通栏顶栏，侧栏只承载页面导航。侧栏展开 200px-240px，收起 56px。示例图按比例缩小，生产字号和尺寸以 Token 与复制骨架为准。" />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <SkeletonCard kind="backend-dashboard" title="工作台 · 数据总览" description="全面通栏品牌顶栏、240px 侧栏、指标卡片和图表区域的仪表盘。" />
          <SkeletonCard kind="backend-collapsed" title="收起态 · 紧凑工作区" description="56px 图标侧栏和完整工作区。适合需要更大内容面积的任务。" />
          <SkeletonCard kind="backend-list" title="列表页 · 筛选表格" description="搜索筛选、新增按钮、批量操作栏、可滚动数据表格和底部分页。" />
          <SkeletonCard kind="backend-detail" title="详情页 · 信息配置" description="三级面包屑、表单字段、操作按钮和流程记录的详情与配置页面。" />
        </div>
      </section>

      <section>
        <SectionHeading title="布局最佳实践" description="官网和后台在布局目标上不同，优先突出与需要弱化的内容各有侧重，设计时应区分场景适配。" />
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="rounded-sm bg-[var(--neutral-50)] p-5">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-2 w-2 bg-[var(--brand-600)]" /><h3 className="text-base font-medium text-[var(--neutral-900)]">官网 / 门户</h3>
            </div>
            <div className="space-y-4">
              <div>
                <p className="mb-2 text-xs font-medium text-[var(--neutral-500)]">优先突出</p>
                <div className="flex flex-wrap gap-1.5">{["首屏价值主张", "品牌识别与信任感", "核心转化入口", "图文叙事节奏"].map((item) => (<Tag key={item} variant="neutral" size="sm" className="bg-white">{item}</Tag>))}</div>
              </div>
              <div>
                <p className="mb-2 text-xs font-medium text-[var(--neutral-400)]">需要弱化</p>
                <div className="flex flex-wrap gap-1.5">{["高密度表格", "复杂筛选器", "多级侧边导航", "过多操作按钮"].map((item) => (<Tag key={item} variant="neutral" size="sm" className="bg-white text-[var(--neutral-400)]">{item}</Tag>))}</div>
              </div>
              <div className="space-y-2 border-t border-[var(--neutral-200)] pt-4">
                {[["内容排布", "大板块分区，1-2列为主，图文结合，注重视觉叙事和故事化表达。"],["信息密度", "低密度，宽松间距 32px-64px，突出重点内容，营造呼吸感。"],["用户行为", "浏览式交互，以滚动为主，停留时间短，需快速抓住注意力。"]].map(([label, text]) => (
                  <div key={label} className="flex gap-2 text-xs"><span className="shrink-0 font-medium text-[var(--neutral-700)]">{label}</span><span className="leading-[18px] text-[var(--neutral-600)]">{text}</span></div>
                ))}
              </div>
            </div>
          </div>
          <div className="rounded-sm bg-[var(--neutral-50)] p-5">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-2 w-2 bg-[var(--product-blue-500)]" /><h3 className="text-base font-medium text-[var(--neutral-900)]">后台 / B 端</h3>
            </div>
            <div className="space-y-4">
              <div>
                <p className="mb-2 text-xs font-medium text-[var(--neutral-500)]">优先突出</p>
                <div className="flex flex-wrap gap-1.5">{["筛选与搜索", "表格与列表数据", "状态与权限反馈", "批量和高频操作"].map((item) => (<Tag key={item} variant="neutral" size="sm" className="bg-white">{item}</Tag>))}</div>
              </div>
              <div>
                <p className="mb-2 text-xs font-medium text-[var(--neutral-400)]">需要弱化</p>
                <div className="flex flex-wrap gap-1.5">{["大面积 Hero", "营销式视觉装饰", "过宽正文段落", "低频入口抢占首屏"].map((item) => (<Tag key={item} variant="neutral" size="sm" className="bg-white text-[var(--neutral-400)]">{item}</Tag>))}</div>
              </div>
              <div className="space-y-2 border-t border-[var(--neutral-200)] pt-4">
                {[["内容排布", "卡片和表格密集排列，3-4列为主，强调数据展示和操作便捷性。"],["信息密度", "高密度，紧凑间距 16px-24px，减少滚动次数，提升信息获取效率。"],["用户行为", "操作式交互，以点击、筛选、表单提交为主，长时间使用，需功能清晰易找。"]].map(([label, text]) => (
                  <div key={label} className="flex gap-2 text-xs"><span className="shrink-0 font-medium text-[var(--neutral-700)]">{label}</span><span className="leading-[18px] text-[var(--neutral-600)]">{text}</span></div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-5">
          {["正文容器宽度不超过700px，避免视线跨度过大影响阅读。","卡片、表格、表单等组件垂直间距遵循8px基数，避免视觉跳跃。","主要CTA按钮、搜索框、筛选器等应在首屏可见，减少滚动查找成本。","响应式图片使用srcset或picture标签，避免移动端加载桌面端大图。","断点调试不能完全替代真机测试，需要关注 iOS Safari 和 Android Chrome 的渲染差异。"].map((practice, index) => (
            <div key={practice} className="rounded-sm bg-[var(--neutral-50)] p-4"><span className="text-xs text-[var(--neutral-300)]">{String(index + 1).padStart(2, "0")}</span><p className="mt-3 text-sm leading-[22px] text-[var(--neutral-700)]">{practice}</p></div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading title="栅格与容器" description="页面骨架负责表达结构，栅格负责约束复用。只保留开发落地必须知道的列数、容器宽度和间距。" />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="rounded-sm bg-[var(--neutral-50)] p-4">
            <h3 className="text-base font-medium text-[var(--neutral-900)]">官网 / 门户</h3>
            <p className="mt-1 text-xs leading-[18px] text-[var(--neutral-500)]">1920px 设计画布 · 1400px 居中容器 · 桌面端 12 列</p>
            <div className="mt-4 grid grid-cols-12 gap-1">{Array.from({ length: 12 }).map((_, index) => <span key={index} className="h-14 bg-white" />)}</div>
            <p className="mt-3 text-xs leading-[18px] text-[var(--neutral-600)]">桌面列间距建议 24px-32px；平板切换 8 列，移动端切换 4 列。Hero 可通栏，正文和核心模块进入容器。</p>
          </div>
          <div className="rounded-sm bg-[var(--neutral-50)] p-4">
            <h3 className="text-base font-medium text-[var(--neutral-900)]">后台 / B端</h3>
            <p className="mt-1 text-xs leading-[18px] text-[var(--neutral-500)]">1440px 设计画布 · 240px / 56px 侧栏 · 工作区自适应 12 列</p>
            <div className="mt-4 grid grid-cols-[48px_1fr] gap-2"><span className="h-14 bg-[var(--neutral-900)]" /><div className="grid grid-cols-12 gap-1">{Array.from({ length: 12 }).map((_, index) => <span key={index} className="h-14 bg-white" />)}</div></div>
            <p className="mt-3 text-xs leading-[18px] text-[var(--neutral-600)]">工作区列间距建议 16px-24px。优先收起侧栏释放空间，不强行压缩表格、图表和字段详情。</p>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading title="12列网格系统" description="12列网格系统同时适用于官网和后台。它提供足够的可分割性，让叙事型页面和高密度产品页面都能保持一致的结构秩序。" />
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
          <GridSystemExample />
          <div className="grid grid-cols-1 gap-3">
            {gridReasons.map((reason) => (
              <div key={reason.title} className="rounded-sm bg-[var(--neutral-50)] p-4">
                <h3 className="text-sm font-medium leading-[22px] text-[var(--neutral-800)]">{reason.title}</h3>
                <p className="mt-1 text-sm leading-[22px] text-[var(--neutral-600)]">{reason.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <SectionHeading title="响应式断点" description="基于主流设备分辨率定义断点，确保从移动端到大屏都能获得稳定的信息层级和可用操作空间。" />
        <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
          {breakpoints.map((bp) => (
            <div key={bp.name} className="rounded-sm bg-[var(--neutral-50)] p-4">
              <div className="mb-4 flex items-start justify-between"><div><p className="text-xs text-[var(--neutral-500)]">{bp.name}</p><h3 className="mt-1 text-xl font-medium leading-7 text-[var(--neutral-900)]">{bp.cols}</h3></div><span className="mt-1 h-1.5 w-1.5 bg-[var(--neutral-900)]" /></div>
              <div className="space-y-1.5 text-xs leading-5 text-[var(--neutral-600)]"><p>{bp.size}</p><p>Gutter {bp.gutter}</p><p>Margin {bp.margin}</p><p className="pt-2 font-medium text-[var(--neutral-500)]">{bp.usage}</p></div>
            </div>
          ))}
        </div>
        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
          <ResponsiveExample />
          <div className="grid grid-cols-1 gap-3">
            {responsiveRules.map((rule) => (
              <div key={rule.title} className="rounded-sm bg-[var(--neutral-50)] p-4">
                <h3 className="text-sm font-medium leading-[22px] text-[var(--neutral-800)]">{rule.title}</h3>
                <p className="mt-1 text-sm leading-[22px] text-[var(--neutral-600)]">{rule.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <SectionHeading title="屏幕适配" description="官网完整适配移动端；后台以桌面工作流为主，窄屏优先收起导航并保留关键任务。" />
        <DocsTable>
          <thead className="bg-[var(--neutral-50)] text-xs font-medium text-[var(--neutral-700)]">
            <tr className="border-b border-[var(--neutral-200)]"><th className="px-4 py-3 font-medium">屏幕</th><th className="px-4 py-3 font-medium">官网</th><th className="px-4 py-3 font-medium">后台</th></tr>
          </thead>
          <tbody className="divide-y divide-[var(--neutral-200)] bg-white">
            {[["大屏 ≥ 1440px", "保持 12 列与 1400px 居中容器，Hero 可通栏。", "完整展开侧栏、顶部操作栏和批量操作。"],["桌面 1024px - 1439px", "缩小外边距，保留主要图文分栏。", "先收起侧栏，再压缩筛选项和次要字段。"],["平板 768px - 1023px", "从 12 列切换到 8 列，图文可改为上下排布。", "仅保留关键工作流，隐藏低频功能。"],["移动端 < 768px", "单列布局，保留品牌标识、核心内容和主 CTA。", "按需支持核心查询与审批状态操作。"]].map(([screen, website, backend]) => (
              <tr key={screen}><td className="px-4 py-3 font-medium text-[var(--neutral-900)]">{screen}</td><td className="px-4 py-3 text-xs leading-[18px] text-[var(--neutral-600)]">{website}</td><td className="px-4 py-3 text-xs leading-[18px] text-[var(--neutral-600)]">{backend}</td></tr>
            ))}
          </tbody>
        </DocsTable>
      </section>

      <section>
        <SectionHeading title="移动端适配" description="移动端以 375px 为设计画布宽度，4 列网格、单列内容排布。Hero 高度：移动端 375-500px、平板 500-650px、桌面 650-800px，保持品牌标识和核心 CTA 在首屏可见。" />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="overflow-hidden rounded-sm border border-[var(--neutral-200)] bg-white">
            <div className="border-b border-[var(--neutral-200)] bg-[var(--neutral-50)] px-4 py-3">
              <div className="flex items-center gap-2"><span className="h-3 w-0.5 shrink-0 bg-[var(--brand-600)]" /><span className="text-sm font-medium text-[var(--neutral-900)]">移动端 · 官网首页</span></div>
              <p className="mt-1 pl-2.5 text-xs leading-[18px] text-[var(--neutral-500)]">375px 设计画布、4 列网格、单列卡片、汉堡导航、简化页脚。</p>
            </div>
            <div className="mx-auto max-w-[375px] border-x border-[var(--neutral-100)]">
              <div className="flex h-12 items-center justify-between border-b border-[var(--neutral-200)] bg-white px-3">
                <BrandMark className="h-5" />
                <div className="flex flex-col gap-1"><span className="block h-0.5 w-5 bg-[var(--neutral-700)]" /><span className="block h-0.5 w-5 bg-[var(--neutral-700)]" /><span className="block h-0.5 w-5 bg-[var(--neutral-700)]" /></div>
              </div>
              <div className="flex min-h-[160px] items-center bg-[var(--neutral-50)] py-6">
                <div className="mx-auto flex w-4/5 flex-col items-center text-center"><Line className="h-2 w-20 bg-[var(--neutral-700)]" /><Line className="mt-2 w-32" /><Line className="mt-1.5 w-24" /></div>
              </div>
              <div className="space-y-3 bg-white px-4 py-4">
                {[0, 1, 2].map((item) => (<div key={item} className="bg-[var(--neutral-50)] p-3"><div className="mb-2 h-8 bg-[var(--neutral-200)]" /><Line className="w-2/3 bg-[var(--neutral-700)]" /><Line className="mt-1.5 w-full" /></div>))}
              </div>
              <div className="flex h-10 items-center justify-center gap-2 border-t border-[var(--neutral-200)] bg-white"><Line className="w-6" /><Line className="w-6" /><Line className="w-6" /></div>
            </div>
          </div>
          <div className="overflow-hidden rounded-sm border border-[var(--neutral-200)] bg-white">
            <div className="border-b border-[var(--neutral-200)] bg-[var(--neutral-50)] px-4 py-3">
              <div className="flex items-center gap-2"><span className="h-3 w-0.5 shrink-0 bg-[var(--brand-600)]" /><span className="text-sm font-medium text-[var(--neutral-900)]">移动端 · 后台列表</span></div>
              <p className="mt-1 pl-2.5 text-xs leading-[18px] text-[var(--neutral-500)]">375px 设计画布、顶栏简化、全宽表格横滑、底部固定操作栏。</p>
            </div>
            <div className="mx-auto max-w-[375px] border-x border-[var(--neutral-100)]">
              <div className="flex h-12 items-center justify-between border-b border-[var(--neutral-200)] bg-white px-3">
                <div className="flex items-center gap-1.5"><BrandMark className="h-5" /><span className="text-[11px] font-medium text-[var(--neutral-700)]">数据管理</span></div>
                <UserCircle size={14} weight="regular" className="text-[var(--neutral-700)]" />
              </div>
              <div className="bg-[var(--neutral-50)] p-3">
                <div className="mb-2 flex h-7 items-center gap-1 rounded-[2px] border border-[var(--neutral-200)] bg-white px-2"><MagnifyingGlass size={10} weight="regular" className="text-[var(--neutral-400)]" /><Line className="w-12" /></div>
                <div className="overflow-hidden bg-white">
                  <div className="flex border-b border-[var(--neutral-100)] px-2.5 py-2"><Line className="w-2/3 bg-[var(--neutral-700)]" /></div>
                  {[0, 1, 2, 3].map((item) => (<div key={item} className="flex border-b border-[var(--neutral-50)] px-2.5 py-2"><Line className="w-full" /></div>))}
                </div>
                <div className="mt-2 flex justify-center gap-1.5"><Line className="w-6" /><Line className="w-4" /><Line className="w-6" /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading title="布局 Token" description="以下 CSS 变量可直接在开发中使用，保持官网与后台布局的一致性。" />
        <DocsTable>
          <thead className="bg-[var(--neutral-50)] text-xs font-medium text-[var(--neutral-700)]">
            <tr className="border-b border-[var(--neutral-200)]"><th className="px-6 py-3 font-medium">Token</th><th className="px-6 py-3 font-medium">值</th><th className="px-6 py-3 font-medium">说明</th></tr>
          </thead>
          <tbody className="divide-y divide-[var(--neutral-200)] bg-white">
            {[["--layout-website-width", "1920px", "官网设计稿宽度"],["--layout-website-content", "1400px", "官网内容最大宽度"],["--layout-website-nav-height", "64px", "官网顶部导航高度"],["--layout-website-hero-sm", "500px", "小屏 Hero 高度"],["--layout-website-hero-md", "650px", "中屏 Hero 高度"],["--layout-website-hero-lg", "800px", "大屏 Hero 高度"],["--layout-backend-width", "1440px", "后台设计稿宽度"],["--layout-backend-sidebar-expanded", "240px", "后台侧栏展开宽度"],["--layout-backend-sidebar-collapsed", "56px", "后台侧栏收起宽度"],["--layout-backend-topbar-height", "64px", "后台顶部操作栏高度"]].map(([token, value, desc]) => (
              <tr key={token}><td className="px-6 py-4 font-mono text-xs text-[var(--neutral-700)]">{token}</td><td className="px-6 py-4 font-mono text-xs text-[var(--neutral-900)]">{value}</td><td className="px-6 py-4 text-sm text-[var(--neutral-600)]">{desc}</td></tr>
            ))}
          </tbody>
        </DocsTable>
      </section>
    </div>
  );
}
