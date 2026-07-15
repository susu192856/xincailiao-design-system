import { useId, type ReactNode } from "react";
import { X } from "@phosphor-icons/react";

export type ModalProps = {
  open: boolean;
  title: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
  onClose?: () => void;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "decision";
  tone?: "neutral" | "danger" | "warning" | "success";
  icon?: ReactNode;
  closeable?: boolean;
  maskClosable?: boolean;
  footerAlign?: "start" | "end" | "between";
  inline?: boolean;
  className?: string;
};

const sizeClasses: Record<NonNullable<ModalProps["size"]>, string> = {
  sm: "max-w-[384px]",
  md: "max-w-[504px]",
  lg: "max-w-[720px]",
  xl: "max-w-[960px]",
};

const toneClasses: Record<NonNullable<ModalProps["tone"]>, string> = {
  neutral: "bg-[var(--neutral-50)] text-[var(--text-secondary)]",
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
  variant = "default",
  tone = "neutral",
  icon,
  closeable = true,
  maskClosable = true,
  footerAlign = "end",
  inline = false,
  className = "",
}: ModalProps) {
  const titleId = useId();
  if (!open) return null;
  const isDecision = variant === "decision";

  const footerAlignClasses = {
    start: "justify-start",
    end: "justify-end",
    between: "justify-between",
  };

  const panel = (
    <div
      className={["relative z-10 flex max-h-[min(864px,calc(100dvh-48px))] w-full flex-col overflow-hidden rounded-[var(--radius-lg)] bg-white animate-scale-in", sizeClasses[size], className].join(" ")}
      role="dialog"
      aria-modal={!inline}
      aria-labelledby={titleId}
    >
      <div className={isDecision ? "relative flex shrink-0 flex-col items-center bg-white px-7 pb-2 pt-7 text-center" : "flex shrink-0 items-center justify-between gap-4 bg-[var(--neutral-50)] px-7 py-3"}>
        <div className={isDecision ? "flex min-w-0 flex-col items-center gap-3" : "flex min-w-0 gap-3"}>
          {icon ? (
            <div className={["flex shrink-0 items-center justify-center", isDecision ? "h-10 w-10 rounded-full" : "h-8 w-8 rounded-[var(--radius-sm)]", toneClasses[tone]].join(" ")}>
              {icon}
            </div>
          ) : null}
          <h2 id={titleId} className={["min-w-0 text-lg font-semibold text-[var(--text-primary)]", isDecision ? "text-center" : ""].join(" ")}>{title}</h2>
        </div>
        {closeable ? (
          <button
            type="button"
            onClick={onClose}
            aria-label="关闭"
            className={["flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--radius-sm)] text-[var(--text-tertiary)] hover:bg-[var(--neutral-100)] hover:text-[var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--neutral-900)]", isDecision ? "absolute right-4 top-4" : ""].join(" ")}
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>
      <div className={["min-h-0 flex-1 overflow-y-auto bg-white px-7", isDecision ? "pb-5 pt-2 text-center [&_p]:[text-wrap:balance]" : "py-6"].join(" ")}>
        {description ? <p className="mb-4 text-sm leading-6 text-[var(--text-secondary)]">{description}</p> : null}
        {children}
      </div>
      {footer ? (
        <div className={["flex min-h-[54px] shrink-0 gap-3 px-7", isDecision ? "justify-center pb-6 pt-0" : `border-t border-[var(--neutral-200)] py-[11px] ${footerAlignClasses[footerAlign]}`].join(" ")}>
          {footer}
        </div>
      ) : null}
    </div>
  );

  if (inline) {
    return (
      <div className="relative flex min-h-[420px] items-center justify-center overflow-hidden bg-[var(--neutral-50)] p-6">
        <div
          className="absolute inset-0 bg-black/10"
          aria-hidden="true"
          onMouseDown={() => {
            if (maskClosable) onClose?.();
          }}
        />
        {panel}
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center bg-black/30 p-6 animate-fade-in"
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
