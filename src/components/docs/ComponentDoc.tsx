import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
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
        <div className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
          {eyebrow}
        </div>
        <div className="flex items-center gap-3">
          <span className="h-6 w-1 shrink-0 rounded-full bg-[var(--docs-accent)]" aria-hidden="true" />
          <h2 className="text-xl font-semibold leading-7 text-[var(--neutral-900)]">{title}</h2>
          <div className="hidden h-px flex-1 bg-gradient-to-r from-[var(--neutral-300)] to-transparent md:block" />
        </div>
      </div>
      {description ? (
        <p className="max-w-[760px] text-sm leading-7 text-[var(--text-secondary)]">{description}</p>
      ) : null}
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
    <div className={["rounded-[var(--radius-md)] border bg-white p-5 md:p-6", toneClass].join(" ")}>
      <div className="mb-5">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold text-[var(--neutral-900)]">{title}</h3>
          {tone !== "default" ? (
            <span className={[
              "rounded-[var(--radius-sm)] px-1.5 py-0.5 text-[10px] font-medium",
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

export function ContractGrid({
  items,
}: {
  items: { label: string; value: ReactNode }[];
}) {
  return (
    <dl className="grid grid-cols-1 overflow-hidden rounded-[var(--radius-md)] border border-[var(--neutral-200)] bg-white md:grid-cols-2">
      {items.map((item) => (
        <div key={item.label} className="border-b border-[var(--neutral-200)] p-4 last:border-b-0 md:[&:nth-last-child(-n+2)]:border-b-0 md:[&:nth-child(odd)]:border-r">
          <dt className="text-xs font-medium text-[var(--text-tertiary)]">{item.label}</dt>
          <dd className="mt-1 text-sm leading-6 text-[var(--neutral-800)]">{item.value}</dd>
        </div>
      ))}
    </dl>
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
    <aside className={["rounded-[var(--radius-md)] border p-4", toneClass].join(" ")}>
      <h3 className="text-sm font-semibold text-[var(--neutral-900)]">{title}</h3>
      <div className="mt-2 text-sm leading-6 text-[var(--neutral-700)]">{children}</div>
    </aside>
  );
}

export function SpecList({ items }: { items: string[] }) {
  return (
    <div className="space-y-1.5">
      {items.map((item, index) => (
        <div key={item} className="flex items-start gap-3 rounded-[var(--radius-sm)] border border-[var(--neutral-100)] bg-white px-4 py-2.5">
          <span className="mt-0.5 shrink-0 font-mono text-xs font-medium text-[var(--text-tertiary)]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <p className="text-sm leading-6 text-[var(--neutral-700)]">{item}</p>
        </div>
      ))}
    </div>
  );
}
