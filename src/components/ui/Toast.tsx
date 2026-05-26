import { useEffect, useState } from "react";

type ToastVariant = "success" | "error" | "warning" | "info";

type ToastItem = {
  id: string;
  variant: ToastVariant;
  title: string;
  description?: string;
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
};

const dotColorMap: Record<ToastVariant, string> = {
  success: "bg-[var(--success-text)]",
  error: "bg-[var(--error-text)]",
  warning: "bg-[var(--warning-text)]",
  info: "bg-[var(--info-text)]",
};

export function ToastContainer() {
  const [items, setItems] = useState<ToastItem[]>([]);

  useEffect(() => {
    addToastFn = (t) => {
      const id = String(++toastId);
      setItems((prev) => [...prev, { ...t, id }]);
      setTimeout(() => {
        setItems((prev) => prev.filter((i) => i.id !== id));
      }, 4000);
    };
    return () => { addToastFn = null; };
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[var(--z-toast)] flex flex-col gap-3">
      {items.map((item) => (
        <div
          key={item.id}
          className={["flex w-80 items-start gap-3 rounded-sm border border-[var(--neutral-200)] border-l-2 bg-white p-4 shadow-lg", borderColorMap[item.variant]].join(" ")}
        >
          <span className={["mt-1.5 h-2 w-2 shrink-0 rounded-full", dotColorMap[item.variant]].join(" ")} />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[var(--neutral-900)]">{item.title}</p>
            {item.description ? (
              <p className="mt-0.5 text-xs leading-5 text-[var(--neutral-600)]">{item.description}</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={() => setItems((prev) => prev.filter((i) => i.id !== item.id))}
            className="ml-auto shrink-0 text-[var(--neutral-400)] hover:text-[var(--neutral-600)]"
            aria-label="关闭"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 3L11 11M11 3L3 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
