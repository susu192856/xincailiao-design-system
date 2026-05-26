import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "solid" | "outline" | "ghost" | "text";
type ButtonTone = "neutral" | "product" | "brand" | "danger";
type ButtonSize = "sm" | "md" | "lg" | "xl" | "2xl";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  tone?: ButtonTone;
  size?: ButtonSize;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-7 px-3 text-sm",
  md: "h-8 px-4 text-sm",
  lg: "h-9 px-5 text-sm",
  xl: "min-h-12 px-8 py-3 text-lg",
  "2xl": "min-h-14 px-10 py-3.5 text-xl",
};

const toneClasses: Record<ButtonVariant, Record<ButtonTone, string>> = {
  solid: {
    neutral:
      "bg-[var(--neutral-900)] text-white hover:bg-[var(--neutral-800)] active:bg-[var(--neutral-700)]",
    product:
      "bg-[var(--product-blue-500)] text-white hover:bg-[var(--product-blue-600)] active:bg-[var(--product-blue-700)]",
    brand: "bg-[var(--brand-600)] text-white hover:bg-[var(--brand-700)] active:bg-[var(--brand-800)]",
    danger: "bg-[var(--error-text)] text-white hover:bg-red-600 active:bg-red-700",
  },
  outline: {
    neutral:
      "border border-[var(--neutral-900)] bg-white text-[var(--neutral-900)] hover:bg-[var(--neutral-50)] active:bg-[var(--neutral-100)]",
    product:
      "border border-[var(--product-blue-500)] bg-white text-[var(--product-blue-500)] hover:bg-[var(--product-blue-50)] active:bg-[var(--product-blue-100)]",
    brand:
      "border border-[var(--brand-600)] bg-white text-[var(--brand-600)] hover:bg-[var(--brand-50)] active:bg-[var(--brand-100)]",
    danger:
      "border border-[var(--error-text)] bg-white text-[var(--error-text)] hover:bg-[var(--error-bg)] active:bg-red-100",
  },
  ghost: {
    neutral:
      "bg-[var(--neutral-100)] text-[var(--neutral-900)] hover:bg-[var(--neutral-200)] active:bg-[var(--neutral-300)]",
    product:
      "bg-[var(--product-blue-50)] text-[var(--product-blue-500)] hover:bg-[var(--product-blue-100)] active:bg-[var(--product-blue-200)]",
    brand:
      "bg-[var(--brand-50)] text-[var(--brand-600)] hover:bg-[var(--brand-100)] active:bg-[var(--brand-200)]",
    danger: "bg-[var(--error-bg)] text-[var(--error-text)] hover:bg-red-100 active:bg-red-200",
  },
  text: {
    neutral: "text-[var(--neutral-900)] hover:bg-[var(--neutral-50)] active:bg-[var(--neutral-100)]",
    product:
      "text-[var(--product-blue-500)] hover:bg-[var(--product-blue-50)] active:bg-[var(--product-blue-100)]",
    brand: "text-[var(--brand-600)] hover:bg-[var(--brand-50)] active:bg-[var(--brand-100)]",
    danger: "text-[var(--error-text)] hover:bg-[var(--error-bg)] active:bg-red-100",
  },
};

export function Button({
  variant = "solid",
  tone = "neutral",
  size = "md",
  disabled,
  loading = false,
  icon,
  iconPosition = "left",
  children,
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  const loadingIcon = (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.25" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={[
        "inline-flex items-center justify-center gap-2 rounded-[var(--radius-sm)] font-medium transition-colors",
        "whitespace-nowrap",
        "disabled:cursor-not-allowed disabled:opacity-50",
        sizeClasses[size],
        toneClasses[variant][tone],
        className,
      ].join(" ")}
      {...props}
    >
      {loading ? loadingIcon : iconPosition === "left" ? icon : null}
      {children}
      {!loading && iconPosition === "right" ? icon : null}
    </button>
  );
}
