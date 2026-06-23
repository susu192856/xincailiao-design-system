import type { ButtonHTMLAttributes, ReactNode } from "react";
import { SpinnerGap } from "@phosphor-icons/react";

type ButtonVariant = "solid" | "outline" | "ghost" | "text";
type ButtonTone = "task" | "neutral" | "product" | "brand" | "danger" | "success" | "warning";
type ButtonSize = "sm" | "md" | "lg" | "xl" | "2xl";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  tone?: ButtonTone;
  size?: ButtonSize;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-[var(--control-height-sm)] min-h-11 px-[var(--button-padding-x-sm)] text-sm md:min-h-0",
  md: "h-[var(--control-height-md)] min-h-11 px-[var(--button-padding-x-md)] text-sm md:min-h-0",
  lg: "h-[var(--control-height-lg)] min-h-11 px-[var(--button-padding-x-lg)] text-sm md:min-h-0",
  xl: "min-h-[var(--control-height-xl)] px-[var(--button-padding-x-xl)] py-3 text-lg",
  "2xl": "min-h-[var(--control-height-2xl)] px-[var(--button-padding-x-2xl)] py-3.5 text-xl",
};

const toneClasses: Record<ButtonVariant, Record<ButtonTone, string>> = {
  solid: {
    task:
      "bg-[var(--color-action-task-default)] text-white hover:bg-[var(--color-action-task-hover)] active:bg-[var(--color-action-task-active)]",
    neutral:
      "bg-[var(--neutral-900)] text-white hover:bg-[var(--neutral-800)] active:bg-[var(--neutral-700)]",
    product:
      "bg-[var(--product-blue-500)] text-white hover:bg-[var(--product-blue-600)] active:bg-[var(--product-blue-700)]",
    brand: "bg-[var(--brand-600)] text-white hover:bg-[var(--brand-700)] active:bg-[var(--brand-800)]",
    danger: "bg-[var(--error-text)] text-white hover:bg-[var(--error-hover)] active:bg-[var(--error-active)]",
    success: "bg-[var(--success-text)] text-white hover:bg-[var(--success-hover)] active:bg-[var(--success-active)]",
    warning: "bg-[var(--warning-text)] text-white hover:bg-[var(--warning-hover)] active:bg-[var(--warning-active)]",
  },
  outline: {
    task:
      "border border-[var(--color-action-task-default)] bg-white text-[var(--color-action-task-default)] hover:bg-[var(--neutral-50)] active:bg-[var(--neutral-100)]",
    neutral:
      "border border-[var(--neutral-900)] bg-white text-[var(--neutral-900)] hover:bg-[var(--neutral-50)] active:bg-[var(--neutral-100)]",
    product:
      "border border-[var(--product-blue-500)] bg-white text-[var(--product-blue-500)] hover:bg-[var(--product-blue-50)] active:bg-[var(--product-blue-100)]",
    brand:
      "border border-[var(--brand-600)] bg-white text-[var(--brand-600)] hover:bg-[var(--brand-50)] active:bg-[var(--brand-100)]",
    danger:
      "border border-[var(--error-text)] bg-white text-[var(--error-text)] hover:bg-[var(--error-bg)] active:border-[var(--error-active)]",
    success:
      "border border-[var(--success-text)] bg-white text-[var(--success-text)] hover:bg-[var(--success-bg)] active:border-[var(--success-active)]",
    warning:
      "border border-[var(--warning-text)] bg-white text-[var(--warning-text)] hover:bg-[var(--warning-bg)] active:border-[var(--warning-active)]",
  },
  ghost: {
    task:
      "bg-[var(--neutral-100)] text-[var(--color-action-task-default)] hover:bg-[var(--neutral-200)] active:bg-[var(--neutral-300)]",
    neutral:
      "bg-[var(--neutral-100)] text-[var(--neutral-900)] hover:bg-[var(--neutral-200)] active:bg-[var(--neutral-300)]",
    product:
      "bg-[var(--product-blue-50)] text-[var(--product-blue-500)] hover:bg-[var(--product-blue-100)] active:bg-[var(--product-blue-200)]",
    brand:
      "bg-[var(--brand-50)] text-[var(--brand-600)] hover:bg-[var(--brand-100)] active:bg-[var(--brand-200)]",
    danger: "bg-[var(--error-bg)] text-[var(--error-text)] hover:text-[var(--error-hover)] active:text-[var(--error-active)]",
    success:
      "bg-[var(--success-bg)] text-[var(--success-text)] hover:text-[var(--success-hover)] active:text-[var(--success-active)]",
    warning:
      "bg-[var(--warning-bg)] text-[var(--warning-text)] hover:text-[var(--warning-hover)] active:text-[var(--warning-active)]",
  },
  text: {
    task: "text-[var(--color-action-task-default)] hover:bg-[var(--neutral-50)] active:bg-[var(--neutral-100)]",
    neutral: "text-[var(--neutral-900)] hover:bg-[var(--neutral-50)] active:bg-[var(--neutral-100)]",
    product:
      "text-[var(--product-blue-500)] hover:bg-[var(--product-blue-50)] active:bg-[var(--product-blue-100)]",
    brand: "text-[var(--brand-600)] hover:bg-[var(--brand-50)] active:bg-[var(--brand-100)]",
    danger: "text-[var(--error-text)] hover:bg-[var(--error-bg)] active:text-[var(--error-active)]",
    success: "text-[var(--success-text)] hover:bg-[var(--success-bg)] active:text-[var(--success-active)]",
    warning: "text-[var(--warning-text)] hover:bg-[var(--warning-bg)] active:text-[var(--warning-active)]",
  },
};

export function Button({
  variant = "solid",
  tone = "task",
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
  const loadingIcon = <SpinnerGap className="h-4 w-4 animate-spin" weight="regular" aria-hidden="true" />;

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={[
        "inline-flex items-center justify-center gap-[var(--button-gap)] rounded-[var(--radius-sm)] font-normal transition-colors duration-[var(--motion-duration-fast)]",
        "whitespace-nowrap",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring-color)]",
        "disabled:cursor-not-allowed disabled:opacity-[var(--disabled-opacity)]",
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
