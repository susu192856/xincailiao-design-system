import type { HTMLAttributes, ReactNode } from "react";
import { X } from "@phosphor-icons/react";

type TagTone = "neutral" | "brand" | "product" | "success" | "warning" | "danger" | "error" | "info" | "teal" | "violet" | "slate" | "cyan";
type TagAppearance = "soft" | "outline" | "solid";
type LegacyTagVariant = Exclude<TagTone, "danger">;
export type TagVariant = TagAppearance | LegacyTagVariant;
type TagSize = "sm" | "md";

export type TagProps = HTMLAttributes<HTMLSpanElement> & {
  /** Canonical structure field. Legacy color values remain supported during migration. */
  variant?: TagVariant;
  /** Canonical business color field. */
  tone?: TagTone;
  size?: TagSize;
  icon?: ReactNode;
  closable?: boolean;
  disabled?: boolean;
  dot?: boolean;
  onClose?: () => void;
};

const toneClasses: Record<TagTone, { soft: string; outline: string; solid: string }> = {
  neutral: {
    soft: "border-[var(--neutral-200)] bg-[var(--neutral-50)] text-[var(--text-secondary)]",
    outline: "border-[var(--neutral-300)] bg-white text-[var(--text-secondary)]",
    solid: "border-[var(--neutral-900)] bg-[var(--neutral-900)] text-white",
  },
  brand: {
    soft: "border-[var(--brand-200)] bg-[var(--brand-50)] text-[var(--brand-700)]",
    outline: "border-[var(--brand-300)] bg-white text-[var(--brand-700)]",
    solid: "border-[var(--brand-600)] bg-[var(--brand-600)] text-white",
  },
  product: {
    soft: "border-[var(--product-blue-200)] bg-[var(--product-blue-50)] text-[var(--product-blue-600)]",
    outline: "border-[var(--product-blue-300)] bg-white text-[var(--product-blue-600)]",
    solid: "border-[var(--product-blue-500)] bg-[var(--product-blue-500)] text-white",
  },
  success: {
    soft: "border-[var(--success-border)] bg-[var(--success-bg)] text-[var(--success-text)]",
    outline: "border-[var(--success-border)] bg-white text-[var(--success-text)]",
    solid: "border-[var(--success-text)] bg-[var(--success-text)] text-white",
  },
  warning: {
    soft: "border-[var(--warning-border)] bg-[var(--warning-bg)] text-[var(--warning-text)]",
    outline: "border-[var(--warning-border)] bg-white text-[var(--warning-text)]",
    solid: "border-[var(--warning-text)] bg-[var(--warning-text)] text-white",
  },
  danger: {
    soft: "border-[var(--error-border)] bg-[var(--error-bg)] text-[var(--error-text)]",
    outline: "border-[var(--error-border)] bg-white text-[var(--error-text)]",
    solid: "border-[var(--error-text)] bg-[var(--error-text)] text-white",
  },
  error: {
    soft: "border-[var(--error-border)] bg-[var(--error-bg)] text-[var(--error-text)]",
    outline: "border-[var(--error-border)] bg-white text-[var(--error-text)]",
    solid: "border-[var(--error-text)] bg-[var(--error-text)] text-white",
  },
  info: {
    soft: "border-[var(--info-border)] bg-[var(--info-bg)] text-[var(--info-text)]",
    outline: "border-[var(--info-border)] bg-white text-[var(--info-text)]",
    solid: "border-[var(--info-text)] bg-[var(--info-text)] text-white",
  },
  teal: {
    soft: "border-[var(--category-teal-border)] bg-[var(--category-teal-bg)] text-[var(--category-teal-text)]",
    outline: "border-[var(--category-teal-border)] bg-white text-[var(--category-teal-text)]",
    solid: "border-[var(--category-teal-text)] bg-[var(--category-teal-text)] text-white",
  },
  violet: {
    soft: "border-[var(--category-violet-border)] bg-[var(--category-violet-bg)] text-[var(--category-violet-text)]",
    outline: "border-[var(--category-violet-border)] bg-white text-[var(--category-violet-text)]",
    solid: "border-[var(--category-violet-text)] bg-[var(--category-violet-text)] text-white",
  },
  slate: {
    soft: "border-[var(--category-slate-border)] bg-[var(--category-slate-bg)] text-[var(--category-slate-text)]",
    outline: "border-[var(--category-slate-border)] bg-white text-[var(--category-slate-text)]",
    solid: "border-[var(--category-slate-text)] bg-[var(--category-slate-text)] text-white",
  },
  cyan: {
    soft: "border-[var(--category-cyan-border)] bg-[var(--category-cyan-bg)] text-[var(--category-cyan-text)]",
    outline: "border-[var(--category-cyan-border)] bg-white text-[var(--category-cyan-text)]",
    solid: "border-[var(--category-cyan-text)] bg-[var(--category-cyan-text)] text-white",
  },
};

const sizeClasses: Record<TagSize, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-xs",
};

// Extract text color from variantClasses for dot mode
const dotColorMap: Partial<Record<TagTone, string>> = {
  success: "var(--success-text)",
  warning: "var(--warning-text)",
  error: "var(--error-text)",
  danger: "var(--error-text)",
  info: "var(--info-text)",
  brand: "var(--brand-600)",
  product: "var(--product-blue-500)",
  teal: "var(--category-teal-text)",
  violet: "var(--category-violet-text)",
  slate: "var(--category-slate-text)",
  cyan: "var(--category-cyan-text)",
  neutral: "var(--neutral-400)",
};

export function Tag({
  variant = "soft",
  tone,
  size = "md",
  icon,
  closable = false,
  disabled = false,
  dot = false,
  onClose,
  children,
  className = "",
  ...props
}: TagProps) {
  const isAppearance = variant === "soft" || variant === "outline" || variant === "solid";
  const resolvedAppearance: TagAppearance = isAppearance ? variant : "soft";
  const legacyTone = isAppearance ? undefined : variant;
  const resolvedTone: TagTone = tone ?? legacyTone ?? "neutral";

  if (dot) {
    return (
      <span
        className={[
          "inline-flex items-center gap-1.5 font-normal",
          disabled ? "opacity-50" : "",
          sizeClasses[size],
          className,
        ].join(" ")}
        {...props}
      >
        <span
          className="h-1.5 w-1.5 shrink-0 rounded-full"
          style={{ backgroundColor: dotColorMap[resolvedTone] ?? "var(--neutral-400)" }}
        />
        <span className="text-[var(--text-body)]">{children}</span>
      </span>
    );
  }

  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] border font-normal",
        disabled ? "opacity-50" : "",
        toneClasses[resolvedTone][resolvedAppearance],
        sizeClasses[size],
        className,
      ].join(" ")}
      {...props}
    >
      {icon}
      {children}
      {closable ? (
        <button
          type="button"
          disabled={disabled}
          aria-label="移除标签"
          onClick={(event) => {
            event.stopPropagation();
            onClose?.();
          }}
          className="-mr-0.5 inline-flex h-3.5 w-3.5 items-center justify-center rounded-[var(--radius-sm)] text-current/80 hover:text-current disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--neutral-900)]"
        >
          <X size={10} weight="bold" />
        </button>
      ) : null}
    </span>
  );
}
