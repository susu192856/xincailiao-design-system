import type { HTMLAttributes, ReactNode } from "react";

type BadgeTone = "neutral" | "product" | "error" | "info" | "success" | "warning" | "danger";
type BadgeSize = "sm" | "md";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  count?: number;
  dot?: boolean;
  max?: number;
  tone?: BadgeTone;
  size?: BadgeSize;
  showZero?: boolean;
  children?: ReactNode;
};

const toneClasses: Record<BadgeTone, string> = {
  neutral: "bg-[var(--neutral-700)] text-white",
  product: "bg-[var(--product-blue-500)] text-white",
  error: "bg-[var(--error-solid)] text-white",
  danger: "bg-[var(--error-solid)] text-white",
  info: "bg-[var(--info-dot)] text-white",
  success: "bg-[var(--success-solid)] text-white",
  warning: "bg-[var(--warning-solid)] text-white",
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: "min-w-4 px-1 text-xs leading-4",
  md: "min-w-5 px-1.5 py-0.5 text-xs leading-4",
};

export function Badge({
  count,
  dot = false,
  max = 99,
  tone = "error",
  size = "md",
  showZero = false,
  children,
  className = "",
  ...props
}: BadgeProps) {
  if (!dot && typeof count === "number" && count === 0 && !showZero) return children ? <>{children}</> : null;
  const value = typeof count === "number" && count > max ? `${max}+` : count;
  const badgeClassName = [
    "inline-flex items-center justify-center rounded-full font-normal",
    dot ? "h-2 w-2" : sizeClasses[size],
    dot ? ({ neutral: "bg-[var(--neutral-400)]", product: "bg-[var(--product-blue-400)]", error: "bg-[var(--error-dot)]", danger: "bg-[var(--error-dot)]", info: "bg-[var(--info-dot)]", success: "bg-[var(--success-dot)]", warning: "bg-[var(--warning-dot)]" } as Record<BadgeTone, string>)[tone] : toneClasses[tone],
    className,
  ].join(" ");

  if (!children) {
    return (
      <span className={badgeClassName} {...props}>
        {dot ? null : value}
      </span>
    );
  }

  return (
    <span className="relative inline-flex" {...props}>
      {children}
      <span
        className={[
          "absolute -right-2 -top-2 inline-flex items-center justify-center rounded-full",
          badgeClassName,
        ].join(" ")}
      >
        {dot ? null : value}
      </span>
    </span>
  );
}
