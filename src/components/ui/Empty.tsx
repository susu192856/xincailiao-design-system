import type { HTMLAttributes, ReactNode } from "react";
import {
  Database,
  FileMagnifyingGlass,
  LockKey,
  PlusCircle,
  Prohibit,
  WarningCircle,
} from "@phosphor-icons/react";

type EmptyVariant = "noData" | "noResult" | "noPermission" | "firstUse" | "error" | "processing" | "disabled";

export type EmptyProps = HTMLAttributes<HTMLDivElement> & {
  variant?: EmptyVariant;
  title: string;
  description?: string;
  action?: ReactNode;
};

const iconMap: Record<EmptyVariant, typeof FileMagnifyingGlass> = {
  noData: Database,
  noResult: FileMagnifyingGlass,
  noPermission: LockKey,
  firstUse: PlusCircle,
  error: WarningCircle,
  processing: Database,
  disabled: Prohibit,
};

const iconColorMap: Record<EmptyVariant, string> = {
  noData: "text-[var(--neutral-400)]",
  noResult: "text-[var(--neutral-400)]",
  noPermission: "text-[var(--warning-text)]",
  firstUse: "text-[var(--product-blue-500)]",
  error: "text-[var(--error-text)]",
  processing: "text-[var(--product-blue-500)]",
  disabled: "text-[var(--neutral-400)]",
};

export function Empty({ variant = "noData", title, description, action, className = "", ...props }: EmptyProps) {
  const Icon = iconMap[variant];

  return (
    <div
      className={[
        "flex flex-col items-center justify-center rounded-[var(--radius-sm)] border border-dashed border-[var(--neutral-200)] bg-white px-6 py-10 text-center",
        className,
      ].join(" ")}
      {...props}
    >
      <Icon size={32} weight="regular" className={iconColorMap[variant]} />
      <h3 className="mt-4 text-base font-normal text-[var(--neutral-900)]">{title}</h3>
      {description ? <p className="mt-2 max-w-sm text-sm leading-[22px] text-[var(--neutral-500)]">{description}</p> : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
