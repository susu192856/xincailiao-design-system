import type { HTMLAttributes, ReactNode } from "react";
import { useEffect, useState } from "react";
import { SpinnerGap, X } from "@phosphor-icons/react";

export type ToastVariant = "success" | "error" | "warning" | "info" | "loading";

type ToastItem = {
  id: string;
  variant: ToastVariant;
  title: string;
  description?: string;
  duration?: number;
  action?: ReactNode;
};

export type ToastProps = HTMLAttributes<HTMLDivElement> & Omit<ToastItem, "id" | "duration"> & {
  onClose?: () => void;
};

let toastId = 0;
let addToastFn: ((t: Omit<ToastItem, "id">) => void) | null = null;

export function toast(props: Omit<ToastItem, "id">) {
  addToastFn?.(props);
}

const borderColorMap: Record<ToastVariant, string> = {
  success: "border-l-[var(--success-text)]",
  error: "border-l-[var(--error-text)]",
  warning: "border-l-[var(--warning-text)]",
  info: "border-l-[var(--info-text)]",
  loading: "border-l-[var(--product-blue-500)]",
};

const dotColorMap: Record<ToastVariant, string> = {
  success: "bg-[var(--success-text)]",
  error: "bg-[var(--error-text)]",
  warning: "bg-[var(--warning-text)]",
  info: "bg-[var(--info-text)]",
  loading: "bg-[var(--product-blue-500)]",
};

export function Toast({ variant, title, description, action, onClose, className = "", ...props }: ToastProps) {
  return (
    <div
      className={[
        "flex w-full items-start gap-3 rounded-[var(--radius-sm)] border border-[var(--neutral-200)] border-l-2 bg-white p-4 shadow-[var(--shadow-sm)]",
        borderColorMap[variant],
        className,
      ].join(" ")}
      role="status"
      {...props}
    >
      {variant === "loading" ? (
        <SpinnerGap className="mt-1.5 h-4 w-4 shrink-0 animate-spin" weight="regular" />
      ) : (
        <span
          className={[
            "mt-1.5 h-2 w-2 shrink-0 rounded-full",
            dotColorMap[variant],
          ].join(" ")}
        />
      )}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-normal text-[var(--neutral-900)]">{title}</p>
        {description ? (
          <p className="mt-0.5 text-xs leading-5 text-[var(--neutral-600)]">{description}</p>
        ) : null}
        {action ? <div className="mt-3">{action}</div> : null}
      </div>
      {onClose ? (
        <button
          type="button"
          onClick={onClose}
          className="-mr-1 -mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center text-[var(--neutral-400)] hover:text-[var(--neutral-600)]"
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
      setItems((prev) => [...prev, { ...t, id }]);
      setTimeout(() => {
        setItems((prev) => prev.filter((i) => i.id !== id));
      }, t.duration ?? 4000);
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
          variant={item.variant}
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
