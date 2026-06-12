import type { HTMLAttributes } from "react";

type AvatarSize = "sm" | "md" | "lg";
type AvatarStatus = "online" | "busy" | "offline";

export type AvatarProps = HTMLAttributes<HTMLDivElement> & {
  name: string;
  src?: string;
  size?: AvatarSize;
  status?: AvatarStatus;
};

const sizeClasses: Record<AvatarSize, string> = {
  sm: "h-7 w-7 text-xs",
  md: "h-9 w-9 text-sm",
  lg: "h-12 w-12 text-base",
};

const statusClasses: Record<AvatarStatus, string> = {
  online: "bg-[var(--success-text)]",
  busy: "bg-[var(--warning-text)]",
  offline: "bg-[var(--neutral-400)]",
};

export function Avatar({ name, src, size = "md", status, className = "", ...props }: AvatarProps) {
  const initial = name.trim().slice(0, 1).toUpperCase();

  return (
    <div className={["relative inline-flex shrink-0", className].join(" ")} {...props}>
      <div
        className={[
          "inline-flex items-center justify-center overflow-hidden rounded-[var(--radius-sm)] bg-[var(--neutral-100)] text-[var(--neutral-700)]",
          sizeClasses[size],
        ].join(" ")}
        aria-label={name}
        title={name}
      >
        {src ? <img src={src} alt={name} className="h-full w-full object-cover" /> : initial}
      </div>
      {status ? (
        <span
          className={[
            "absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white",
            statusClasses[status],
          ].join(" ")}
          aria-label={status}
        />
      ) : null}
    </div>
  );
}
