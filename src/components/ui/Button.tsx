import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Spinner } from "@phosphor-icons/react";

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
  sm: "h-[var(--control-height-sm)] min-h-11 px-[var(--button-padding-x-sm)] text-[length:var(--type-body-m-size)] leading-[var(--type-body-m-line-height)] md:min-h-0",
  md: "h-[var(--control-height-md)] min-h-11 px-[var(--button-padding-x-md)] text-[length:var(--type-body-m-size)] leading-[var(--type-body-m-line-height)] md:min-h-0",
  lg: "h-[var(--control-height-lg)] min-h-11 px-[var(--button-padding-x-lg)] text-[length:var(--type-body-m-size)] leading-[var(--type-body-m-line-height)] md:min-h-0",
  xl: "min-h-[var(--control-height-xl)] px-[var(--button-padding-x-xl)] py-3 text-[length:var(--type-heading-h5-size)] leading-[var(--type-heading-h5-line-height)]",
  "2xl": "min-h-[var(--control-height-2xl)] px-[var(--button-padding-x-2xl)] py-3.5 text-[length:var(--type-heading-h4-size)] leading-[var(--type-heading-h4-line-height)]",
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
    danger: "bg-[var(--error-solid)] text-white hover:bg-[var(--error-solid-hover)] active:bg-[var(--error-solid-active)]",
    success: "bg-[var(--success-solid)] text-white hover:bg-[var(--success-solid-hover)] active:bg-[var(--success-solid-active)]",
    warning: "bg-[var(--warning-solid)] text-white hover:bg-[var(--warning-solid-hover)] active:bg-[var(--warning-solid-active)]",
  },
  outline: {
    task:
      "border border-[var(--color-action-task-default)] bg-white text-[var(--color-action-task-default)] hover:bg-[var(--neutral-50)] active:bg-[var(--neutral-100)]",
    neutral:
      "border border-[var(--neutral-900)] bg-white text-[var(--text-primary)] hover:bg-[var(--neutral-50)] active:bg-[var(--neutral-100)]",
    product:
      "border border-[var(--product-blue-500)] bg-white text-[var(--product-blue-500)] hover:bg-[var(--product-blue-50)] active:bg-[var(--product-blue-100)]",
    brand:
      "border border-[var(--brand-600)] bg-white text-[var(--brand-600)] hover:bg-[var(--brand-50)] active:bg-[var(--brand-100)]",
    danger:
      "border border-[var(--error-text)] bg-white text-[var(--error-text)] hover:bg-[var(--error-bg)] active:bg-[var(--error-border)]",
    success:
      "border border-[var(--success-text)] bg-white text-[var(--success-text)] hover:bg-[var(--success-bg)] active:bg-[var(--success-border)]",
    warning:
      "border border-[var(--warning-text)] bg-white text-[var(--warning-text)] hover:bg-[var(--warning-bg)] active:bg-[var(--warning-border)]",
  },
  ghost: {
    task:
      "bg-[var(--neutral-100)] text-[var(--color-action-task-default)] hover:bg-[var(--neutral-200)] active:bg-[var(--neutral-300)] disabled:text-[var(--text-disabled)]",
    neutral:
      "bg-[var(--neutral-100)] text-[var(--text-primary)] hover:bg-[var(--neutral-200)] active:bg-[var(--neutral-300)] disabled:text-[var(--text-disabled)]",
    product:
      "bg-[var(--product-blue-50)] text-[var(--product-blue-500)] hover:bg-[var(--product-blue-100)] active:bg-[var(--product-blue-200)] disabled:text-[var(--product-blue-300)]",
    brand:
      "bg-[var(--brand-50)] text-[var(--brand-600)] hover:bg-[var(--brand-100)] active:bg-[var(--brand-200)] disabled:text-[var(--brand-300)]",
    danger: "bg-[var(--error-bg)] text-[var(--error-text)] hover:bg-[var(--error-border)] active:bg-[var(--error-border)] disabled:text-[var(--error-text-light)]",
    success:
      "bg-[var(--success-bg)] text-[var(--success-text)] hover:bg-[var(--success-border)] active:bg-[var(--success-border)] disabled:text-[var(--success-text-light)]",
    warning:
      "bg-[var(--warning-bg)] text-[var(--warning-text)] hover:bg-[var(--warning-border)] active:bg-[var(--warning-border)] disabled:text-[var(--warning-text-light)]",
  },
  text: {
    task: "text-[var(--color-action-task-default)] hover:bg-[var(--neutral-50)] hover:text-[var(--color-action-task-default)] active:bg-[var(--neutral-100)] active:text-[var(--color-action-task-default)] disabled:text-[var(--text-disabled)]",
    neutral: "text-[var(--text-primary)] hover:bg-[var(--neutral-50)] hover:text-[var(--text-primary)] active:bg-[var(--neutral-100)] active:text-[var(--text-primary)] disabled:text-[var(--text-disabled)]",
    product:
      "text-[var(--product-blue-500)] hover:bg-[var(--product-blue-50)] hover:text-[var(--product-blue-500)] active:bg-[var(--product-blue-100)] active:text-[var(--product-blue-500)] disabled:text-[var(--product-blue-300)]",
    brand: "text-[var(--brand-600)] hover:bg-[var(--brand-50)] hover:text-[var(--brand-600)] active:bg-[var(--brand-100)] active:text-[var(--brand-600)] disabled:text-[var(--brand-300)]",
    danger: "text-[var(--error-text)] hover:bg-[var(--error-bg)] hover:text-[var(--error-text)] active:bg-[var(--error-border)] active:text-[var(--error-text)] disabled:text-[var(--error-text-light)]",
    success: "text-[var(--success-text)] hover:bg-[var(--success-bg)] hover:text-[var(--success-text)] active:bg-[var(--success-border)] active:text-[var(--success-text)] disabled:text-[var(--success-text-light)]",
    warning: "text-[var(--warning-text)] hover:bg-[var(--warning-bg)] hover:text-[var(--warning-text)] active:bg-[var(--warning-border)] active:text-[var(--warning-text)] disabled:text-[var(--warning-text-light)]",
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
  const loadingIcon = <Spinner size={16} className="h-4 w-4 animate-spin" weight="regular" aria-hidden="true" />;

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={[
        "inline-flex items-center justify-center gap-1 rounded-[var(--radius-sm)] font-normal transition-colors duration-[var(--motion-duration-fast)]",
        "whitespace-nowrap",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring-color)]",
        variant === "ghost" || variant === "text"
          ? "disabled:cursor-not-allowed"
          : "disabled:cursor-not-allowed disabled:opacity-[var(--disabled-opacity)]",
        sizeClasses[size],
        toneClasses[variant][tone],
        className,
      ].join(" ")}
      {...props}
    >
      {loading ? loadingIcon : iconPosition === "left" && icon ? <span className="inline-flex shrink-0 items-center justify-center leading-none">{icon}</span> : null}
      {children}
      {!loading && iconPosition === "right" && icon ? <span className="inline-flex shrink-0 items-center justify-center leading-none">{icon}</span> : null}
    </button>
  );
}
