import type { HTMLAttributes, ReactNode } from "react";
import { useEffect, useState } from "react";
import { CheckCircle, Info, SpinnerGap, Warning, WarningCircle, X, XCircle } from "@phosphor-icons/react";

export type ToastVariant = "success" | "error" | "warning" | "info" | "loading";

type ToastItem = {
  id: string;
  tone: ToastVariant;
  title: string;
  description?: string;
  duration?: number;
  action?: ReactNode;
};

type ToastRequest = Omit<ToastItem, "id" | "tone"> & {
  tone?: ToastVariant;
  /** @deprecated Use tone. */
  variant?: ToastVariant;
};

export type ToastProps = HTMLAttributes<HTMLDivElement> & Omit<ToastItem, "id" | "duration" | "variant"> & {
  tone?: ToastVariant;
  variant?: ToastVariant;
  closable?: boolean;
  onClose?: () => void;
};

let toastId = 0;
let addToastFn: ((t: ToastRequest) => void) | null = null;

export function toast(props: ToastRequest) {
  addToastFn?.(props);
}

const borderColorMap: Record<ToastVariant, string> = {
  success: "border-l-[var(--success-text)]",
  error: "border-l-[var(--error-text)]",
  warning: "border-l-[var(--warning-text)]",
  info: "border-l-[var(--info-text)]",
  loading: "border-l-[var(--product-blue-500)]",
};

const iconMap: Record<ToastVariant, { icon: typeof CheckCircle; color: string }> = {
  success: { icon: CheckCircle, color: "var(--success-text)" },
  error: { icon: XCircle, color: "var(--error-text)" },
  warning: { icon: Warning, color: "var(--warning-text)" },
  info: { icon: Info, color: "var(--info-text)" },
  loading: { icon: SpinnerGap, color: "var(--product-blue-500)" },
};

export function Toast({
  tone,
  variant,
  title,
  description,
  action,
  closable = true,
  onClose,
  className = "",
  ...props
}: ToastProps) {
  const resolvedTone = tone ?? variant ?? "info";
  return (
    <div
      className={[
        "flex w-full items-start gap-3 rounded-[var(--radius-sm)] border border-[var(--neutral-200)] border-l-2 bg-white p-4 shadow-[var(--shadow-sm)] animate-slide-in-up",
        borderColorMap[resolvedTone],
        className,
      ].join(" ")}
      role="status"
      {...props}
    >
      {(() => {
        const IconComp = iconMap[resolvedTone].icon;
        const iconColor = iconMap[resolvedTone].color;
        return resolvedTone === "loading" ? (
          <SpinnerGap className="mt-1 h-4 w-4 shrink-0 animate-spin" style={{ color: iconColor }} weight="regular" />
        ) : (
          <IconComp className="mt-1 h-4 w-4 shrink-0" style={{ color: iconColor }} weight="regular" />
        );
      })()}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-normal text-[var(--text-primary)]">{title}</p>
        {description ? (
          <p className="mt-0.5 text-xs leading-5 text-[var(--text-tertiary)]">{description}</p>
        ) : null}
        {action ? <div className="mt-3">{action}</div> : null}
      </div>
      {closable && onClose ? (
        <button
          type="button"
          onClick={onClose}
          className="-mr-1 -mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center text-[var(--neutral-400)] hover:text-[var(--text-tertiary)]"
          aria-label="关闭"
        >
          <X size={14} weight="regular" />
        </button>
      ) : null}
    </div>
  );
}

export type ToastContainerProps = {
  position?: "top-right" | "top-center" | "bottom-right";
};

export function ToastContainer({ position = "bottom-right" }: ToastContainerProps) {
  const [items, setItems] = useState<ToastItem[]>([]);

  useEffect(() => {
    addToastFn = (t) => {
      const id = String(++toastId);
      const { variant, tone, ...content } = t;
      setItems((prev) => [...prev, { ...content, id, tone: tone ?? variant ?? "info" }]);
      setTimeout(() => {
        setItems((prev) => prev.filter((i) => i.id !== id));
      }, t.duration ?? (Number.parseInt(getComputedStyle(document.documentElement).getPropertyValue("--toast-duration-default"), 10) || 4000));
    };
    return () => { addToastFn = null; };
  }, []);

  if (items.length === 0) return null;

  return (
    <div
      className={[
        "fixed z-[var(--z-toast)] flex w-80 flex-col gap-3",
        position === "top-center" ? "left-1/2 top-6 -translate-x-1/2" : "right-6",
        position === "top-right" ? "top-6" : position === "bottom-right" ? "bottom-6" : "",
      ].join(" ")}
    >
      {items.map((item) => (
        <Toast
          key={item.id}
          tone={item.tone}
          title={item.title}
          description={item.description}
          action={item.action}
          className="shadow-[var(--shadow-lg)]"
          onClose={() => setItems((prev) => prev.filter((i) => i.id !== item.id))}
        />
      ))}
    </div>
  );
}
