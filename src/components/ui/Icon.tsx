import type { HTMLAttributes } from "react";
import type { Icon as PhosphorIcon, IconWeight } from "@phosphor-icons/react";

type IconTone = "neutral" | "muted" | "product" | "brand" | "danger" | "warning" | "success";
type IconSize = 12 | 16 | 20 | 24 | 32 | 48;

export interface IconProps extends Omit<HTMLAttributes<HTMLSpanElement>, "color"> {
  as?: PhosphorIcon;
  size?: IconSize;
  weight?: IconWeight;
  tone?: IconTone;
  decorative?: boolean;
  disabled?: boolean;
  label?: string;
  redMark?: boolean;
}

const toneClass: Record<IconTone, string> = {
  neutral: "text-[var(--neutral-800)]",
  muted: "text-[var(--neutral-500)]",
  product: "text-[var(--product-blue-500)]",
  brand: "text-[var(--brand-600)]",
  danger: "text-[var(--error-text)]",
  warning: "text-[var(--warning-text)]",
  success: "text-[var(--success-text)]",
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Icon({
  as: Component,
  size = 20,
  weight = "regular",
  tone = "neutral",
  decorative = false,
  disabled = false,
  label,
  redMark = false,
  className,
  style,
  ...props
}: IconProps) {
  return (
    <span
      aria-hidden={label ? undefined : true}
      aria-label={label}
      className={cx(
        "relative inline-flex shrink-0 items-center justify-center leading-none",
        toneClass[tone],
        disabled && "cursor-not-allowed opacity-40",
        className,
      )}
      style={{ width: size, height: size, ...style }}
      {...props}
    >
      {Component ? (
        <Component aria-hidden size={size} weight={weight} />
      ) : (
        <span
          aria-hidden
          className="block border border-current"
          style={{ width: Math.round(size * 0.7), height: Math.round(size * 0.7) }}
        />
      )}
      {(decorative || redMark) && (
        <span
          aria-hidden
          className="absolute right-0 top-1/2 h-0.5 w-1.5 -translate-y-1/2 bg-[var(--brand-600)]"
        />
      )}
    </span>
  );
}
