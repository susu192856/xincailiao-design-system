import type { HTMLAttributes, ReactNode } from "react";
import { X } from "@phosphor-icons/react";

type TagTone = "neutral" | "brand" | "product" | "success" | "warning" | "danger" | "error" | "info" | "amber" | "orange" | "pink" | "magenta" | "purple" | "indigo" | "blue" | "green";
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
  orange: { soft: "border-[var(--category-orange-border)] bg-[var(--category-orange-bg)] text-[var(--category-orange-text)]", outline: "border-[var(--category-orange-border)] bg-white text-[var(--category-orange-text)]", solid: "border-[var(--category-orange-text)] bg-[var(--category-orange-text)] text-white" },
  blue: { soft: "border-[var(--category-blue-border)] bg-[var(--category-blue-bg)] text-[var(--category-blue-text)]", outline: "border-[var(--category-blue-border)] bg-white text-[var(--category-blue-text)]", solid: "border-[var(--category-blue-text)] bg-[var(--category-blue-text)] text-white" },
  green: { soft: "border-[var(--category-green-border)] bg-[var(--category-green-bg)] text-[var(--category-green-text)]", outline: "border-[var(--category-green-border)] bg-white text-[var(--category-green-text)]", solid: "border-[var(--category-green-text)] bg-[var(--category-green-text)] text-white" },
  pink: { soft: "border-[var(--category-pink-border)] bg-[var(--category-pink-bg)] text-[var(--category-pink-text)]", outline: "border-[var(--category-pink-border)] bg-white text-[var(--category-pink-text)]", solid: "border-[var(--category-pink-text)] bg-[var(--category-pink-text)] text-white" },
  magenta: { soft: "border-[var(--category-magenta-border)] bg-[var(--category-magenta-bg)] text-[var(--category-magenta-text)]", outline: "border-[var(--category-magenta-border)] bg-white text-[var(--category-magenta-text)]", solid: "border-[var(--category-magenta-text)] bg-[var(--category-magenta-text)] text-white" },
  purple: { soft: "border-[var(--category-purple-border)] bg-[var(--category-purple-bg)] text-[var(--category-purple-text)]", outline: "border-[var(--category-purple-border)] bg-white text-[var(--category-purple-text)]", solid: "border-[var(--category-purple-text)] bg-[var(--category-purple-text)] text-white" },
  amber: { soft: "border-[var(--category-amber-border)] bg-[var(--category-amber-bg)] text-[var(--category-amber-text)]", outline: "border-[var(--category-amber-border)] bg-white text-[var(--category-amber-text)]", solid: "border-[var(--category-amber-text)] bg-[var(--category-amber-text)] text-white" },
  indigo: { soft: "border-[var(--category-indigo-border)] bg-[var(--category-indigo-bg)] text-[var(--category-indigo-text)]", outline: "border-[var(--category-indigo-border)] bg-white text-[var(--category-indigo-text)]", solid: "border-[var(--category-indigo-text)] bg-[var(--category-indigo-text)] text-white" },
};

const sizeClasses: Record<TagSize, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-xs",
};

// Extract text color from variantClasses for dot mode
const dotColorMap: Partial<Record<TagTone, string>> = {
  success: "var(--success-dot)",
  warning: "var(--warning-dot)",
  error: "var(--error-dot)",
  danger: "var(--error-dot)",
  info: "var(--info-dot)",
  brand: "var(--brand-600)",
  product: "var(--product-blue-500)",
  orange: "var(--category-orange-text)",
  blue: "var(--category-blue-text)",
  green: "var(--category-green-text)",
  pink: "var(--category-pink-text)",
  magenta: "var(--category-magenta-text)",
  purple: "var(--category-purple-text)",
  amber: "var(--category-amber-text)",
  indigo: "var(--category-indigo-text)",
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
  const categoryTone = ["amber", "orange", "pink", "magenta", "purple", "indigo", "blue", "green"].includes(resolvedTone);
  const effectiveAppearance: TagAppearance = categoryTone ? "soft" : resolvedAppearance;

  if (dot) {
    return (
      <span
        className={[
          "inline-flex max-w-full items-center gap-1.5 font-normal",
          disabled ? "opacity-50" : "",
          size === "sm" ? "px-0 py-0 text-sm" : sizeClasses[size],
          className,
        ].join(" ")}
        aria-disabled={disabled || undefined}
        {...props}
      >
        <span
          className="h-1.5 w-1.5 shrink-0 rounded-full"
          style={{ backgroundColor: dotColorMap[resolvedTone] ?? "var(--neutral-400)" }}
        />
        <span className="min-w-0 truncate text-[var(--text-body)]">{children}</span>
      </span>
    );
  }

  return (
    <span
      className={[
        "inline-flex max-w-full items-center gap-1.5 rounded-[var(--radius-sm)] border font-normal",
        disabled ? "opacity-50" : "",
        toneClasses[resolvedTone][effectiveAppearance],
        sizeClasses[size],
        className,
      ].join(" ")}
      aria-disabled={disabled || undefined}
      {...props}
    >
      {icon}
      <span className="min-w-0 truncate">{children}</span>
      {closable ? (
        <button
          type="button"
          disabled={disabled}
          aria-label={typeof children === "string" ? `移除${children}` : "移除标签"}
          onClick={(event) => {
            event.stopPropagation();
            onClose?.();
          }}
          className={[
            "relative inline-flex shrink-0 items-center justify-center rounded-[var(--radius-sm)] text-current/80 hover:text-current disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--neutral-900)]",
            "after:absolute after:left-1/2 after:top-1/2 after:h-11 after:w-11 after:-translate-x-1/2 after:-translate-y-1/2 after:content-[''] md:after:h-full md:after:w-full",
            size === "sm" ? "-mr-1.5 h-4 w-4" : "-mr-2 h-5 w-5",
          ].join(" ")}
        >
          <X size={10} weight="bold" />
        </button>
      ) : null}
    </span>
  );
}
