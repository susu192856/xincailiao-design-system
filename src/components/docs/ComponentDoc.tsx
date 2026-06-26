import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-8">
      <div className="mb-4">
        {eyebrow ? (
          <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
            {eyebrow}
          </div>
        ) : null}
        <div className="flex items-center gap-3">
          <span className="h-5 w-0.5 shrink-0 bg-[var(--brand-600)]" aria-hidden="true" />
          <h2 className="text-xl font-semibold leading-7 text-[var(--text-primary)]">{title}</h2>
          <div className="hidden h-px flex-1 bg-gradient-to-r from-[var(--neutral-300)] to-transparent md:block" />
        </div>
      </div>
      {description ? (
        <p className="max-w-[var(--content-reading-width)] text-sm leading-[var(--type-body-m-line-height)] text-[var(--text-secondary)]">{description}</p>
      ) : null}
    </div>
  );
}

export function SubsectionHeading({
  eyebrow,
  title,
  description,
  tone = "neutral",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  tone?: "neutral" | "brand" | "product";
}) {

  return (
    <div className="mb-4">
      {eyebrow ? (
        <div className="mb-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
          {eyebrow}
        </div>
      ) : null}
      <div className="flex items-center gap-2">
        <h3 className="text-base font-medium leading-[var(--type-body-l-line-height)] text-[var(--text-primary)]">{title}</h3>
      </div>
      {description ? (
        <p className="mt-1.5 text-sm leading-[var(--type-body-m-line-height)] text-[var(--text-tertiary)]">{description}</p>
      ) : null}
    </div>
  );
}

export function SectionCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-5 ${className}`}>
      {children}
    </div>
  );
}

export function ExampleCard({
  title,
  description,
  children,
  tone = "default",
}: {
  title: string;
  description?: string;
  children: ReactNode;
  tone?: "default" | "recommended" | "avoid";
}) {
  const toneClass = {
    default: "border-[var(--neutral-200)]",
    recommended: "border-[var(--success-border)]",
    avoid: "border-[var(--error-border)]",
  }[tone];

  return (
    <div className={["rounded-[var(--radius-sm)] border bg-white p-5 md:p-6", toneClass].join(" ")}>
      <div className="mb-5">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold text-[var(--text-primary)]">{title}</h3>
          {tone !== "default" ? (
            <span className={[
              "rounded-[var(--radius-sm)] px-1.5 py-0.5 text-xs font-medium",
              tone === "recommended"
                ? "bg-[var(--success-bg)] text-[var(--success-text)]"
                : "bg-[var(--error-bg)] text-[var(--error-text)]",
            ].join(" ")}>
              {tone === "recommended" ? "推荐" : "避免"}
            </span>
          ) : null}
        </div>
        {description ? <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{description}</p> : null}
      </div>
      {children}
    </div>
  );
}

export function RuleCallout({
  title,
  children,
  tone = "info",
}: {
  title: string;
  children: ReactNode;
  tone?: "info" | "warning" | "danger";
}) {
  const toneClass = {
    info: "border-[var(--info-border)] bg-[var(--info-bg)]",
    warning: "border-[var(--warning-border)] bg-[var(--warning-bg)]",
    danger: "border-[var(--error-border)] bg-[var(--error-bg)]",
  }[tone];

  return (
    <aside className={["rounded-[var(--radius-sm)] border p-4", toneClass].join(" ")}>
      <h3 className="text-sm font-semibold text-[var(--text-primary)]">{title}</h3>
      <div className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{children}</div>
    </aside>
  );
}

export function SpecList({ items }: { items: string[] }) {
  return (
    <div className="space-y-1.5">
      {items.map((item, index) => (
        <div key={item} className="flex items-start gap-3 rounded-[var(--radius-sm)] border border-[var(--neutral-100)] bg-white px-4 py-2.5">
          <span className="mt-0.5 shrink-0 font-data text-xs font-medium text-[var(--text-tertiary)]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <p className="text-sm leading-6 text-[var(--text-secondary)]">{item}</p>
        </div>
      ))}
    </div>
  );
}
