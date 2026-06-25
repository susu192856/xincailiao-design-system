import type { ReactNode } from "react";
import { X } from "@phosphor-icons/react";

export type DrawerProps = {
  open: boolean;
  title: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
  onClose?: () => void;
  placement?: "left" | "right";
  size?: "sm" | "md" | "lg" | "xl";
  tone?: "neutral" | "danger" | "warning" | "success";
  closeable?: boolean;
  maskClosable?: boolean;
  inline?: boolean;
  className?: string;
};

const sizeClasses: Record<NonNullable<DrawerProps["size"]>, string> = {
  sm: "w-[360px]",
  md: "w-[480px]",
  lg: "w-[640px]",
  xl: "w-[800px]",
};

const toneClasses: Record<NonNullable<DrawerProps["tone"]>, string> = {
  neutral: "border-[var(--neutral-200)]",
  danger: "border-[var(--error-text)]",
  warning: "border-[var(--warning-text)]",
  success: "border-[var(--success-text)]",
};

export function Drawer({
  open,
  title,
  description,
  children,
  footer,
  onClose,
  placement = "right",
  size = "md",
  tone = "neutral",
  closeable = true,
  maskClosable = true,
  inline = false,
  className,
}: DrawerProps) {
  if (!open) return null;

  const panel = (
    <div
      className={[
        "flex h-full max-w-[calc(100vw-32px)] flex-col bg-white",
        "border-l border-r",
        sizeClasses[size],
        toneClasses[tone],
        placement === "left" ? "animate-slide-in-left" : "animate-slide-in-right",
        className || "",
      ].join(" ")}
      role="dialog"
      aria-modal={!inline}
      aria-labelledby="drawer-title"
    >
      <div className="flex items-start justify-between gap-4 border-b border-[var(--neutral-200)] p-5">
        <div className="min-w-0">
          <h2 id="drawer-title" className="text-lg font-semibold text-[var(--text-primary)]">
            {title}
          </h2>
          {description ? <p className="mt-1 text-sm leading-6 text-[var(--text-tertiary)]">{description}</p> : null}
        </div>
        {closeable ? (
          <button
            type="button"
            onClick={onClose}
            aria-label="关闭"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--radius-sm)] text-[var(--text-tertiary)] hover:bg-[var(--neutral-100)] hover:text-[var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--neutral-900)]"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto p-5">{children}</div>
      {footer ? <div className="flex justify-end gap-3 border-t border-[var(--neutral-200)] p-5">{footer}</div> : null}
    </div>
  );

  const justifyClass = placement === "left" ? "justify-start" : "justify-end";

  if (inline) {
    return (
      <div className={["relative flex h-[360px] overflow-hidden bg-[var(--neutral-50)]", justifyClass].join(" ")}>
        <div
          className="absolute inset-0 bg-black/10"
          onMouseDown={(event) => {
            if (maskClosable && event.target === event.currentTarget) {
              onClose?.();
            }
          }}
        />
        <div className="relative z-10 h-full">{panel}</div>
      </div>
    );
  }

  return (
    <div
      className={["fixed inset-0 z-[var(--z-modal)] flex bg-black/30 animate-fade-in", justifyClass].join(" ")}
      onMouseDown={(event) => {
        if (maskClosable && event.target === event.currentTarget) {
          onClose?.();
        }
      }}
    >
      {panel}
    </div>
  );
}
