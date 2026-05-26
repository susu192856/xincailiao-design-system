import type { HTMLAttributes, ReactNode } from "react";

type TagVariant = "neutral" | "brand" | "product" | "success" | "warning" | "error";
type TagSize = "sm" | "md";

type TagProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: TagVariant;
  size?: TagSize;
  icon?: ReactNode;
};

const variantClasses: Record<TagVariant, string> = {
  neutral: "border-[var(--neutral-200)] bg-[var(--neutral-50)] text-[var(--neutral-700)]",
  brand: "border-[var(--brand-200)] bg-[var(--brand-50)] text-[var(--brand-700)]",
  product: "border-[var(--product-blue-200)] bg-[var(--product-blue-50)] text-[var(--product-blue-600)]",
  success: "border-[var(--success-tag)] bg-[var(--success-bg)] text-[var(--success-text)]",
  warning: "border-[var(--warning-tag)] bg-[var(--warning-bg)] text-[var(--warning-text)]",
  error: "border-[var(--error-tag)] bg-[var(--error-bg)] text-[var(--error-text)]",
};

const sizeClasses: Record<TagSize, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-xs",
};

export function Tag({ variant = "neutral", size = "md", icon, children, className = "", ...props }: TagProps) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] border font-normal",
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(" ")}
      {...props}
    >
      {icon}
      {children}
    </span>
  );
}
