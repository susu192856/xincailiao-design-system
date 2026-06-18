import type { HTMLAttributes } from "react";

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: "plain" | "outlined" | "muted";
  size?: "sm" | "md";
  status?: "default" | "product" | "brand" | "success" | "warning" | "error";
  interactive?: boolean;
  selected?: boolean;
  disabled?: boolean;
  loading?: boolean;
};

const variantClasses: Record<NonNullable<CardProps["variant"]>, string> = {
  plain: "bg-white",
  outlined: "border border-[var(--neutral-200)] bg-white",
  muted: "bg-[var(--neutral-50)]",
};

const sizeClasses: Record<NonNullable<CardProps["size"]>, string> = {
  sm: "p-4",
  md: "p-6",
};

const statusClasses: Record<NonNullable<CardProps["status"]>, string> = {
  default: "",
  product: "before:bg-[var(--product-blue-500)]",
  brand: "before:bg-[var(--brand-600)]",
  success: "before:bg-[var(--success-text)]",
  warning: "before:bg-[var(--warning-text)]",
  error: "before:bg-[var(--error-text)]",
};

export function Card({
  variant = "plain",
  size = "md",
  status = "default",
  interactive = false,
  selected = false,
  disabled = false,
  loading = false,
  className = "",
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={[
        "relative rounded-[var(--radius-sm)] overflow-hidden",
        sizeClasses[size],
        variantClasses[variant],
        status !== "default" ? "before:absolute before:left-0 before:top-0 before:h-0.5 before:w-full" : "",
        statusClasses[status],
        interactive && !disabled ? "cursor-pointer transition-colors hover:bg-[var(--neutral-50)]" : "",
        selected ? "ring-1 ring-[var(--neutral-900)]" : "",
        disabled ? "cursor-not-allowed opacity-55" : "",
        loading ? "overflow-hidden" : "",
        className,
      ].join(" ")}
      aria-disabled={disabled || undefined}
      {...props}
    >
      {children}
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70 text-sm text-[var(--neutral-500)]">
          加载中
        </div>
      ) : null}
    </div>
  );
}

export function CardHeader({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={["mb-4", className].join(" ")} {...props} />;
}

export function CardTitle({ className = "", ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={["text-base font-semibold text-[var(--neutral-900)]", className].join(" ")} {...props} />;
}

export function CardDescription({ className = "", ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={["mt-2 text-sm leading-6 text-[var(--neutral-600)]", className].join(" ")} {...props} />;
}

export function CardContent({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={className} {...props} />;
}

export function CardFooter({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={["mt-5 border-t border-[var(--neutral-200)] pt-4", className].join(" ")} {...props} />;
}

export function CardActions({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={["flex items-center gap-2", className].join(" ")} {...props} />;
}
