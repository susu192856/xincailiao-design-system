import type { HTMLAttributes, ReactNode } from "react";
import { useEffect, useState } from "react";
import { CheckCircle, Info, SpinnerGap, Warning, WarningCircle, X, XCircle } from "@phosphor-icons/react";

export type ToastVariant = "success" | "error" | "warning" | "info" | "loading";
export type ToastPresentation = "toast" | "notification" | "alert";

type ToastItem = {
  id: string;
  tone: ToastVariant;
  title: string;
  description?: string;
  duration?: number;
  action?: ReactNode;
  closable?: boolean;
  presentation?: ToastPresentation;
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
const toastListeners = new Set<(toastItem: ToastRequest) => void>();

export function toast(props: ToastRequest) {
  toastListeners.forEach((listener) => listener(props));
}

const iconMap: Record<ToastVariant, { icon: typeof CheckCircle; color: string }> = {
  success: { icon: CheckCircle, color: "var(--success-dot)" },
  error: { icon: XCircle, color: "var(--error-dot)" },
  warning: { icon: Warning, color: "var(--warning-dot)" },
  info: { icon: Info, color: "var(--info-dot)" },
  loading: { icon: SpinnerGap, color: "var(--product-blue-500)" },
};

const alertToneClasses: Record<ToastVariant, string> = {
  success: "bg-[var(--success-bg)]",
  error: "bg-[var(--error-bg)]",
  warning: "bg-[var(--warning-bg)]",
  info: "bg-[var(--info-bg)]",
  loading: "bg-[var(--info-bg)]",
};

export function Toast({
  tone,
  variant,
  title,
  description,
  action,
  closable = true,
  presentation = "toast",
  onClose,
  className = "",
  ...props
}: ToastProps) {
  const resolvedTone = tone ?? variant ?? "info";
  return (
    <div
      className={[
        "flex gap-3 rounded-[4px] animate-slide-in-up",
        description || action ? "items-start" : "items-center",
        presentation === "toast" ? "w-fit min-w-[220px] max-w-[360px] bg-white px-3 py-2.5 shadow-[var(--shadow-md)]" : "",
        presentation === "notification" ? "w-full max-w-[360px] bg-white p-4 shadow-[var(--shadow-lg)]" : "",
        presentation === "alert" ? `w-full px-3 py-2 shadow-none ${alertToneClasses[resolvedTone]}` : "",
        className,
      ].join(" ")}
      role={resolvedTone === "error" ? "alert" : "status"}
      data-presentation={presentation}
      {...props}
    >
      {(() => {
        const IconComp = iconMap[resolvedTone].icon;
        const iconColor = iconMap[resolvedTone].color;
        return resolvedTone === "loading" ? (
          <SpinnerGap className="mt-0.5 h-4 w-4 shrink-0 animate-spin" style={{ color: iconColor }} weight="regular" />
        ) : (
          <IconComp className="mt-0.5 h-4 w-4 shrink-0" style={{ color: iconColor }} weight="regular" />
        );
      })()}
      <div className="min-w-0 flex-1">
        <p
          className={["text-sm text-[var(--text-primary)]", presentation === "notification" || description ? "font-semibold" : "font-normal"].join(" ")}
        >
          {title}
        </p>
        {description ? (
          <p className={["mt-1 text-[var(--text-secondary)]", presentation === "toast" ? "text-xs leading-5" : "text-sm leading-6"].join(" ")}>{description}</p>
        ) : null}
        {action ? <div className="mt-3">{action}</div> : null}
      </div>
      {closable && onClose ? (
        <button
          type="button"
          onClick={onClose}
          className="-mr-1 inline-flex h-5 w-5 shrink-0 items-center justify-center text-[var(--neutral-400)] hover:text-[var(--text-tertiary)]"
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

export function ToastContainer({ position = "top-center" }: ToastContainerProps) {
  const [items, setItems] = useState<ToastItem[]>([]);

  useEffect(() => {
    const addToast = (t: ToastRequest) => {
      const id = String(++toastId);
      const { variant, tone, ...content } = t;
      setItems((prev) => [...prev, { ...content, id, tone: tone ?? variant ?? "info" }]);
      setTimeout(() => {
        setItems((prev) => prev.filter((i) => i.id !== id));
      }, t.duration ?? (Number.parseInt(getComputedStyle(document.documentElement).getPropertyValue("--toast-duration-default"), 10) || 4000));
    };
    toastListeners.add(addToast);
    return () => { toastListeners.delete(addToast); };
  }, []);

  if (items.length === 0) return null;

  return (
    <div
      className={[
        "fixed z-[var(--z-toast)] flex w-[min(360px,calc(100vw-48px))] flex-col gap-3",
        position === "top-center" ? "left-1/2 top-20 -translate-x-1/2 items-center" : "right-6 items-stretch",
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
          closable={item.closable ?? false}
          presentation={item.presentation ?? "toast"}
          className="shadow-[var(--shadow-lg)]"
          onClose={() => setItems((prev) => prev.filter((i) => i.id !== item.id))}
        />
      ))}
    </div>
  );
}
