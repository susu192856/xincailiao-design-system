import type { ReactNode } from "react";
import { X } from "@phosphor-icons/react";

type ModalProps = {
  open: boolean;
  title: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
  onClose?: () => void;
};

export function Modal({ open, title, description, children, footer, onClose }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center bg-black/30 p-6">
      <div className="w-full max-w-lg rounded-[var(--radius-sm)] bg-white">
        <div className="flex items-start justify-between gap-4 border-b border-[var(--neutral-200)] p-5">
          <div>
            <h2 className="text-lg font-semibold text-[var(--neutral-900)]">{title}</h2>
            {description ? <p className="mt-1 text-sm leading-6 text-[var(--neutral-600)]">{description}</p> : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] text-[var(--neutral-600)] hover:bg-[var(--neutral-100)] hover:text-[var(--neutral-900)]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-5">{children}</div>
        {footer ? <div className="flex justify-end gap-3 border-t border-[var(--neutral-200)] p-5">{footer}</div> : null}
      </div>
    </div>
  );
}
