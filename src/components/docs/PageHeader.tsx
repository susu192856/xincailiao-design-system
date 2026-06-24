type PageHeaderProps = {
  title: string;
  description?: string;
  version?: string;
  status?: "stable" | "review" | "draft";
};

const statusLabel = {
  stable: "稳定",
  review: "完善中",
  draft: "草案",
};

type MaturityStatus = keyof typeof statusLabel;

export default function PageHeader({
  title,
  description,
  version = "v0.2",
  status,
}: PageHeaderProps) {
  const location = useLocation();
  const componentStatus = manifest.components.find((component) => component.route === location.pathname)?.status;
  const foundationStatus = figmaSync.foundations.find((foundation) => foundation.route === location.pathname)?.status;
  const resolvedStatus = (status ?? componentStatus ?? foundationStatus ?? "review") as MaturityStatus;
  const statusClasses = {
    stable: "border-[var(--success-border)] bg-[var(--success-bg)] text-[var(--success-text)]",
    review: "border-[var(--brand-200)] bg-[var(--brand-50)] text-[var(--brand-700)]",
    draft: "border-[var(--neutral-300)] bg-[var(--neutral-100)] text-[var(--neutral-600)]",
  }[resolvedStatus];

  return (
    <header className="docs-surface relative mb-12 overflow-hidden rounded-[var(--radius-lg)] px-6 py-7 md:px-8 md:py-8">
      <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-[var(--brand-500)]/10 blur-2xl" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 right-24 h-20 w-20 translate-y-10 rounded-full bg-[var(--product-blue-500)]/10 blur-2xl" aria-hidden="true" />
      <div className="relative min-w-0">
        <div className="mb-3 h-1 w-10 rounded-full bg-[var(--docs-accent)]" aria-hidden="true" />
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="mr-1 text-[2.125rem] font-semibold leading-[1.16] tracking-[-0.035em] text-[var(--neutral-900)] md:text-[2.5rem]">{title}</h1>
          <span className="rounded-[var(--radius-sm)] border border-[var(--docs-border)] bg-[var(--neutral-50)] px-2 py-0.5 text-[10px] font-medium text-[var(--text-tertiary)]">
            {version}
          </span>
          <span className={`rounded-[var(--radius-sm)] border px-2 py-0.5 text-[10px] font-medium ${statusClasses}`}>
            {statusLabel[resolvedStatus]}
          </span>
        </div>
        {description ? (
          <p className="mt-4 max-w-[var(--content-reading-width)] text-base leading-8 text-[var(--text-primary)]">
            {description}
          </p>
        ) : null}
      </div>
    </header>
  );
}
import { useLocation } from "react-router-dom";
import manifest from "../../../figma/components.manifest.json";
import figmaSync from "../../../figma/sync.config.json";
