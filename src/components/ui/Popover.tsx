import type { HTMLAttributes, ReactNode } from "react";

export type PopoverPlacement = "top" | "right" | "bottom" | "left";

export type PopoverProps = HTMLAttributes<HTMLSpanElement> & {
  title?: string;
  content: ReactNode;
  footer?: ReactNode;
  placement?: PopoverPlacement;
  open?: boolean;
  children: ReactNode;
};

const popoverPositionClasses: Record<PopoverPlacement, string> = {
  top: "bottom-full left-1/2 mb-3 -translate-x-1/2",
  right: "left-full top-1/2 ml-3 -translate-y-1/2",
  bottom: "left-1/2 top-full mt-3 -translate-x-1/2",
  left: "right-full top-1/2 mr-3 -translate-y-1/2",
};

const popoverArrowClasses: Record<PopoverPlacement, string> = {
  top: "left-1/2 top-full -translate-x-1/2 -translate-y-1/2",
  right: "right-full top-1/2 -translate-y-1/2 translate-x-1/2",
  bottom: "bottom-full left-1/2 -translate-x-1/2 translate-y-1/2",
  left: "left-full top-1/2 -translate-x-1/2 -translate-y-1/2",
};

export function Popover({
  title,
  content,
  footer,
  placement = "bottom",
  open = false,
  children,
  className = "",
  ...props
}: PopoverProps) {
  const visibility = open
    ? "opacity-100"
    : "pointer-events-none opacity-0 group-hover:opacity-100 group-focus-within:opacity-100";

  return (
    <span className={["group relative inline-flex", className].join(" ")} {...props}>
      {children}
      <span
        role="dialog"
        className={[
          "absolute z-[var(--z-tooltip)] w-72 rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white",
          "text-left shadow-[var(--shadow-lg)] transition-opacity",
          popoverPositionClasses[placement],
          visibility,
        ].join(" ")}
      >
        <span
          aria-hidden="true"
          className={[
            "absolute h-2.5 w-2.5 rotate-45 border border-[var(--neutral-200)] bg-white",
            popoverArrowClasses[placement],
          ].join(" ")}
        />
        <span className="relative block p-4">
          {title ? <span className="block text-sm font-semibold text-[var(--neutral-900)]">{title}</span> : null}
          <span className={["block text-sm leading-6 text-[var(--neutral-600)]", title ? "mt-2" : ""].join(" ")}>
            {content}
          </span>
          {footer ? <span className="mt-4 flex justify-end gap-2 border-t border-[var(--neutral-200)] pt-3">{footer}</span> : null}
        </span>
      </span>
    </span>
  );
}
