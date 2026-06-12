import type { HTMLAttributes, ReactNode } from "react";

export type TooltipPlacement = "top" | "right" | "bottom" | "left";

export type TooltipProps = HTMLAttributes<HTMLSpanElement> & {
  content: ReactNode;
  placement?: TooltipPlacement;
  open?: boolean;
  children: ReactNode;
};

const tooltipPositionClasses: Record<TooltipPlacement, string> = {
  top: "bottom-full left-1/2 mb-2 -translate-x-1/2",
  right: "left-full top-1/2 ml-2 -translate-y-1/2",
  bottom: "left-1/2 top-full mt-2 -translate-x-1/2",
  left: "right-full top-1/2 mr-2 -translate-y-1/2",
};

const arrowPositionClasses: Record<TooltipPlacement, string> = {
  top: "left-1/2 top-full -translate-x-1/2 -translate-y-1/2",
  right: "right-full top-1/2 -translate-y-1/2 translate-x-1/2",
  bottom: "bottom-full left-1/2 -translate-x-1/2 translate-y-1/2",
  left: "left-full top-1/2 -translate-x-1/2 -translate-y-1/2",
};

export function Tooltip({
  content,
  placement = "top",
  open = false,
  children,
  className = "",
  ...props
}: TooltipProps) {
  const visibility = open
    ? "opacity-100"
    : "pointer-events-none opacity-0 group-hover:opacity-100 group-focus-within:opacity-100";

  return (
    <span className={["group relative inline-flex", className].join(" ")} {...props}>
      {children}
      <span
        role="tooltip"
        className={[
          "absolute z-[var(--z-tooltip)] w-max max-w-60 rounded-[var(--radius-sm)] bg-[var(--neutral-900)] px-2.5 py-1.5",
          "text-xs leading-5 text-white shadow-[var(--shadow-md)] transition-opacity",
          tooltipPositionClasses[placement],
          visibility,
        ].join(" ")}
      >
        {content}
        <span
          aria-hidden="true"
          className={[
            "absolute h-2 w-2 rotate-45 bg-[var(--neutral-900)]",
            arrowPositionClasses[placement],
          ].join(" ")}
        />
      </span>
    </span>
  );
}
