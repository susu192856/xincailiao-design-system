/**
 * 官网门户页面模板 (Portal Page Template)
 *
 * 使用方式：
 * 1. 复制此文件到目标页面路径
 * 2. 替换 HeroSection / ContentSection 占位内容
 * 3. 按产品线配置调整主色调（参考 assets/product-lines.json）
 */

import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

/* ============================================================
   Navigation
   ============================================================ */
function PortalNav({ productLine = "xincailiao-portal" }: { productLine?: string }) {
  const navItems = [
    { label: "首页", href: "/" },
    { label: "产品", href: "/products" },
    { label: "解决方案", href: "/solutions" },
    { label: "关于我们", href: "/about" },
  ];

  return (
    <nav
      className="sticky top-0 z-[var(--z-sticky)] flex items-center justify-between bg-white border-b border-[var(--neutral-200)]"
      style={{ height: "var(--layout-website-nav-height)", padding: "0 var(--spacing-2xl)" }}
    >
      {/* Logo */}
      <a href="/" className="flex items-center">
        <img src="/logo.png" alt="Logo" style={{ height: 36 }} />
      </a>

      {/* Nav items */}
      <div className="flex items-center" style={{ gap: "var(--spacing-lg)" }}>
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="no-underline"
            style={{
              fontSize: "var(--type-body-m-size)",
              fontWeight: "var(--type-body-m-weight-medium)",
              color: "var(--neutral-700)",
            }}
          >
            {item.label}
          </a>
        ))}
        <Button variant="solid" tone="brand" size="md">
          开始使用
        </Button>
      </div>
    </nav>
  );
}

/* ============================================================
   Hero Section
   ============================================================ */
function HeroSection({
  title,
  subtitle,
  primaryAction,
  secondaryAction,
}: {
  title: string;
  subtitle: string;
  primaryAction: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
}) {
  return (
    <section
      className="flex items-center justify-center"
      style={{
        height: "var(--layout-website-hero-md)",
        padding: "0 var(--spacing-2xl)",
        background: "linear-gradient(180deg, var(--brand-50) 0%, #FFFFFF 100%)",
      }}
    >
      <div className="text-center" style={{ maxWidth: 720 }}>
        <h1
          style={{
            fontSize: "var(--type-display-l-size)",
            lineHeight: "var(--type-display-l-line-height)",
            fontWeight: "var(--type-display-l-weight)",
            color: "var(--neutral-900)",
            marginBottom: "var(--spacing-lg)",
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontSize: "var(--type-body-l-size)",
            lineHeight: "var(--type-body-l-line-height)",
            color: "var(--neutral-600)",
            marginBottom: "var(--spacing-xl)",
          }}
        >
          {subtitle}
        </p>
        <div className="flex justify-center" style={{ gap: "var(--spacing-md)" }}>
          <Button variant="solid" tone="brand" size="lg">
            {primaryAction.label}
          </Button>
          {secondaryAction && (
            <Button variant="outline" tone="neutral" size="lg">
              {secondaryAction.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Content Section (可复用的内容区块)
   ============================================================ */
function ContentSection({
  title,
  subtitle,
  children,
  background = "white",
}: {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  background?: "white" | "neutral";
}) {
  return (
    <section
      style={{
        padding: "var(--spacing-4xl) var(--spacing-2xl)",
        background: background === "neutral" ? "var(--neutral-50)" : "#FFFFFF",
      }}
    >
      <div style={{ maxWidth: "var(--layout-website-content)", margin: "0 auto" }}>
        {title && (
          <h2
            className="text-center"
            style={{
              fontSize: "var(--type-heading-h2-size)",
              lineHeight: "var(--type-heading-h2-line-height)",
              fontWeight: "var(--type-heading-h2-weight)",
              color: "var(--neutral-900)",
              marginBottom: subtitle ? "var(--spacing-sm)" : "var(--spacing-3xl)",
            }}
          >
            {title}
          </h2>
        )}
        {subtitle && (
          <p
            className="text-center"
            style={{
              fontSize: "var(--type-body-l-size)",
              color: "var(--neutral-500)",
              marginBottom: "var(--spacing-3xl)",
            }}
          >
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}

/* ============================================================
   Card Grid (特性卡片网格)
   ============================================================ */
function CardGrid({ cards }: { cards: { title: string; description: string; icon?: React.ReactNode }[] }) {
  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "var(--spacing-lg)",
      }}
    >
      {cards.map((card, i) => (
        <Card key={i} variant="basic">
          <div style={{ padding: "var(--spacing-lg)" }}>
            {card.icon && <div style={{ marginBottom: "var(--spacing-md)" }}>{card.icon}</div>}
            <h5
              style={{
                fontSize: "var(--type-heading-h5-size)",
                fontWeight: "var(--type-heading-h5-weight)",
                color: "var(--neutral-900)",
                marginBottom: "var(--spacing-sm)",
              }}
            >
              {card.title}
            </h5>
            <p
              style={{
                fontSize: "var(--type-body-m-size)",
                lineHeight: "var(--type-body-m-line-height)",
                color: "var(--neutral-600)",
              }}
            >
              {card.description}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}

/* ============================================================
   Footer
   ============================================================ */
function PortalFooter() {
  return (
    <footer
      style={{
        background: "var(--neutral-900)",
        color: "var(--neutral-400)",
        padding: "var(--spacing-2xl) var(--spacing-lg)",
        fontSize: "var(--type-body-s-size)",
      }}
    >
      <div
        className="flex justify-between"
        style={{ maxWidth: "var(--layout-website-content)", margin: "0 auto" }}
      >
        <span> 2026 新材道. All rights reserved.</span>
        <div style={{ gap: "var(--spacing-lg)", display: "flex" }}>
          <a href="/privacy" style={{ color: "var(--neutral-400)" }}>
            隐私政策
          </a>
          <a href="/terms" style={{ color: "var(--neutral-400)" }}>
            服务条款
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   完整门户页面示例
   ============================================================ */
export default function PortalPage() {
  return (
    <div className="min-h-screen bg-white">
      <PortalNav />
      <HeroSection
        title="构建可信数据空间"
        subtitle="新材道为企业提供安全、高效、可扩展的数据管理与协作平台，助力数字化转型。"
        primaryAction={{ label: "立即体验", href: "/signup" }}
        secondaryAction={{ label: "了解更多", href: "/about" }}
      />
      <ContentSection title="核心能力" subtitle="为企业提供全方位的数据管理能力">
        <CardGrid
          cards={[
            { title: "数据治理", description: "统一的数据标准和质量管控体系" },
            { title: "安全合规", description: "满足等保和行业合规要求的安全架构" },
            { title: "智能分析", description: "AI 驱动的数据洞察和辅助决策" },
          ]}
        />
      </ContentSection>
      <ContentSection title="开始使用" subtitle="立即体验新材道数据空间的强大功能" background="neutral">
        <div className="text-center">
          <Button variant="solid" tone="brand" size="lg">
            免费试用
          </Button>
        </div>
      </ContentSection>
      <PortalFooter />
    </div>
  );
}
