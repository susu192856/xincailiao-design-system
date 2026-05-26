import { useEffect, useState } from "react";
import type { ReactNode } from "react";

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

const iconMap: Record<ToastVariant, ReactNode> = {
  success: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="9" fill="#10B981" />
      <path d="M5 9L7.5 11.5L13 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  error: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="9" fill="#EF4444" />
      <path d="M6 6L12 12M12 6L6 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  warning: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="9" fill="#F59E0B" />
      <path d="M9 5V10M9 12.5V13" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  info: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="9" fill="#006DEA" />
      <path d="M9 8.5V12M9 6V6.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
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
          className="flex w-80 items-start gap-3 rounded-sm border border-[var(--neutral-200)] bg-white p-4 shadow-lg"
        >
          <span className="mt-0.5 shrink-0">{iconMap[item.variant]}</span>
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
