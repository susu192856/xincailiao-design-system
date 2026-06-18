import type { ReactNode } from "react";
import { X } from "@phosphor-icons/react";

export type ModalProps = {
  open: boolean;
  title: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
  onClose?: () => void;
  size?: "sm" | "md" | "lg" | "xl";
  tone?: "neutral" | "danger" | "warning" | "success";
  icon?: ReactNode;
  closeable?: boolean;
  maskClosable?: boolean;
  footerAlign?: "start" | "end" | "between";
};

const sizeClasses: Record<NonNullable<ModalProps["size"]>, string> = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

const toneClasses: Record<NonNullable<ModalProps["tone"]>, string> = {
  neutral: "bg-[var(--neutral-50)] text-[var(--neutral-700)]",
  danger: "bg-[var(--error-bg)] text-[var(--error-text)]",
  warning: "bg-[var(--warning-bg)] text-[var(--warning-text)]",
  success: "bg-[var(--success-bg)] text-[var(--success-text)]",
};

export function Modal({
  open,
  title,
  description,
  children,
  footer,
  onClose,
  size = "md",
  tone = "neutral",
  icon,
  closeable = true,
  maskClosable = true,
  footerAlign = "end",
}: ModalProps) {
  if (!open) return null;

  const footerAlignClasses = {
    start: "justify-start",
    end: "justify-end",
    between: "justify-between",
  };

  return (
    <div
      className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center bg-black/30 p-6"
      onMouseDown={(event) => {
        if (maskClosable && event.target === event.currentTarget) {
          onClose?.();
        }
      }}
    >
      <div
        className={["w-full rounded-[var(--radius-sm)] bg-white", sizeClasses[size]].join(" ")}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="flex items-start justify-between gap-4 border-b border-[var(--neutral-200)] p-5">
          <div className="flex min-w-0 gap-3">
            {icon ? (
              <div className={["flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-sm)]", toneClasses[tone]].join(" ")}>
                {icon}
              </div>
            ) : null}
            <div className="min-w-0">
              <h2 id="modal-title" className="text-lg font-semibold text-[var(--neutral-900)]">{title}</h2>
              {description ? <p className="mt-1 text-sm leading-6 text-[var(--neutral-600)]">{description}</p> : null}
            </div>
          </div>
          {closeable ? (
            <button
              type="button"
              onClick={onClose}
              aria-label="关闭"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--radius-sm)] text-[var(--neutral-600)] hover:bg-[var(--neutral-100)] hover:text-[var(--neutral-900)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--neutral-900)]"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>
        <div className="p-5">{children}</div>
        {footer ? (
          <div className={["flex gap-3 border-t border-[var(--neutral-200)] p-5", footerAlignClasses[footerAlign]].join(" ")}>
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}
