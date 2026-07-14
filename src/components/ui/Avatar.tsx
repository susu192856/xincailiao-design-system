import type { HTMLAttributes } from "react";
import { User } from "@phosphor-icons/react";
import avatar01 from "../../assets/avatar/avatar-01.jpg";
import avatar02 from "../../assets/avatar/avatar-02.jpg";
import avatar03 from "../../assets/avatar/avatar-03.jpg";
import avatar04 from "../../assets/avatar/avatar-04.jpg";
import avatar05 from "../../assets/avatar/avatar-05.jpg";
import avatar06 from "../../assets/avatar/avatar-06.jpg";
import avatar07 from "../../assets/avatar/avatar-07.jpg";
import avatar08 from "../../assets/avatar/avatar-08.jpg";
import avatar09 from "../../assets/avatar/avatar-09.jpg";
import avatar10 from "../../assets/avatar/avatar-10.jpg";

type AvatarSize = "sm" | "md" | "lg" | "xl";
type AvatarStatus = "online" | "busy" | "offline";
type AvatarVariant = "default" | "image" | "initial";
type AvatarShape = "circle" | "square";

export type AvatarProps = HTMLAttributes<HTMLDivElement> & {
  name: string;
  src?: string;
  fallbackKey?: string;
  variant?: AvatarVariant;
  shape?: AvatarShape;
  size?: AvatarSize;
  status?: AvatarStatus;
  disabled?: boolean;
};

const sizeClasses: Record<AvatarSize, string> = {
  sm: "h-7 w-7 text-xs",
  md: "h-9 w-9 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-xl",
};

const statusClasses: Record<AvatarStatus, string> = {
  online: "bg-[var(--success-dot)]",
  busy: "bg-[var(--warning-dot)]",
  offline: "bg-[var(--neutral-400)]",
};

const initialColors = [
  "var(--data-green-3)",
  "var(--data-orange-2)",
  "var(--data-amber-2)",
  "var(--data-blue-3)",
  "var(--data-purple-3)",
];

export const defaultAvatarImages = [avatar01, avatar02, avatar03, avatar04, avatar05, avatar06, avatar07, avatar08, avatar09, avatar10] as const;

export function getDefaultAvatarImage(key: string) {
  const score = Array.from(key.trim()).reduce(
    (total, character) => Math.imul(total, 31) + (character.codePointAt(0) ?? 0),
    0,
  );
  return defaultAvatarImages[(score >>> 0) % defaultAvatarImages.length];
}

function stableColor(name: string) {
  const score = Array.from(name.trim()).reduce((total, character) => total + (character.codePointAt(0) ?? 0), 0);
  return initialColors[score % initialColors.length];
}

function getInitials(name: string) {
  const normalized = name.trim();
  if (!normalized) return "?";
  if (/^[\u3400-\u9fff]/.test(normalized)) return Array.from(normalized).slice(-2).join("");
  const words = normalized.split(/\s+/).filter(Boolean);
  return words.slice(0, 2).map((word) => word[0]).join("").toUpperCase();
}

export function Avatar({ name, src, fallbackKey, variant, shape = "circle", size = "md", status, disabled = false, className = "", ...props }: AvatarProps) {
  const initial = getInitials(name);
  const resolvedVariant: AvatarVariant = variant ?? (src ? "image" : "default");
  const assignedAvatar = getDefaultAvatarImage(fallbackKey || name);
  const iconSize = size === "sm" ? 14 : size === "md" ? 18 : size === "lg" ? 22 : 28;
  const bodyStyle = resolvedVariant === "initial" ? { backgroundColor: stableColor(name), color: "white" } : undefined;

  return (
    <div
      className={["relative inline-flex shrink-0", disabled ? "opacity-[var(--disabled-opacity)]" : "", className].join(" ")}
      aria-disabled={disabled || undefined}
      {...props}
    >
      <div
        className={[
          "inline-flex items-center justify-center overflow-hidden bg-[var(--neutral-100)] text-[var(--text-secondary)]",
          shape === "circle" ? "rounded-full" : "rounded-[var(--radius-sm)]",
          sizeClasses[size],
        ].join(" ")}
        style={bodyStyle}
        aria-label={name}
        title={name}
      >
        {resolvedVariant === "image" ? (
          <img
            src={src || assignedAvatar}
            alt={name}
            className={["h-full w-full object-cover", shape === "square" ? "scale-[1.18]" : ""].join(" ")}
            onError={(event) => {
              if (event.currentTarget.src !== assignedAvatar) event.currentTarget.src = assignedAvatar;
            }}
          />
        ) : null}
        {resolvedVariant === "initial" ? initial : null}
        {resolvedVariant === "default" ? <User size={iconSize} weight="regular" aria-hidden="true" /> : null}
      </div>
      {status ? (
        <span
          className={[
            "absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white",
            statusClasses[status],
          ].join(" ")}
          aria-label={status}
        />
      ) : null}
    </div>
  );
}
