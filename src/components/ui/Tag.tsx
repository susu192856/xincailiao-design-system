import type { HTMLAttributes, ReactNode } from "react";
import { X } from "@phosphor-icons/react";

type TagVariant = "neutral" | "brand" | "product" | "success" | "warning" | "error" | "info" | "teal" | "violet" | "slate" | "cyan";
export type { TagVariant };
type TagSize = "sm" | "md";

export type TagProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: TagVariant;
  size?: TagSize;
  icon?: ReactNode;
  closable?: boolean;
  disabled?: boolean;
  dot?: boolean;
  onClose?: () => void;
};

const variantClasses: Record<TagVariant, string> = {
  neutral: "border-[var(--neutral-200)] bg-[var(--neutral-50)] text-[var(--neutral-700)]",
  brand: "border-[var(--brand-200)] bg-[var(--brand-50)] text-[var(--brand-700)]",
  product: "border-[var(--product-blue-200)] bg-[var(--product-blue-50)] text-[var(--product-blue-600)]",
  success: "border-[var(--success-border)] bg-[var(--success-bg)] text-[var(--success-text)]",
  warning: "border-[var(--warning-border)] bg-[var(--warning-bg)] text-[var(--warning-text)]",
  error: "border-[var(--error-border)] bg-[var(--error-bg)] text-[var(--error-text)]",
  info: "border-[var(--info-border)] bg-[var(--info-bg)] text-[var(--info-text)]",
  teal: "border-[var(--category-teal-border)] bg-[var(--category-teal-bg)] text-[var(--category-teal-text)]",
  violet: "border-[var(--category-violet-border)] bg-[var(--category-violet-bg)] text-[var(--category-violet-text)]",
  slate: "border-[var(--category-slate-border)] bg-[var(--category-slate-bg)] text-[var(--category-slate-text)]",
  cyan: "border-[var(--category-cyan-border)] bg-[var(--category-cyan-bg)] text-[var(--category-cyan-text)]",
};

const sizeClasses: Record<TagSize, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-xs",
};

// Extract text color from variantClasses for dot mode
const dotColorMap: Partial<Record<TagVariant, string>> = {
  success: "var(--success-text)",
  warning: "var(--warning-text)",
  error: "var(--error-text)",
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
  variant = "neutral",
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
          style={{ backgroundColor: dotColorMap[variant] ?? "var(--neutral-400)" }}
        />
        <span className="text-[var(--neutral-800)]">{children}</span>
      </span>
    );
  }

  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] border font-normal",
        disabled ? "opacity-50" : "",
        variantClasses[variant],
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
