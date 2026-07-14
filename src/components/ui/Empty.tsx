import type { HTMLAttributes, ReactNode } from "react";
import {
  Database,
  FileMagnifyingGlass,
  LockKey,
  PlusCircle,
  Prohibit,
  WarningCircle,
} from "@phosphor-icons/react";
import noDataIllustration from "../../assets/empty/no-data.svg";
import noResultIllustration from "../../assets/empty/no-result.svg";
import noPermissionIllustration from "../../assets/empty/no-permission.svg";
import notFoundIllustration from "../../assets/empty/not-found.svg";
import networkIllustration from "../../assets/empty/network-error.svg";
import firstUseIllustration from "../../assets/empty/first-use.svg";

type EmptyVariant = "noData" | "noResult" | "noPermission" | "notFound" | "network" | "firstUse" | "error" | "processing" | "disabled";

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
  notFound: WarningCircle,
  network: WarningCircle,
  firstUse: PlusCircle,
  error: WarningCircle,
  processing: Database,
  disabled: Prohibit,
};

const iconColorMap: Record<EmptyVariant, string> = {
  noData: "text-[var(--neutral-400)]",
  noResult: "text-[var(--neutral-400)]",
  noPermission: "text-[var(--warning-text)]",
  notFound: "text-[var(--error-text)]",
  network: "text-[var(--warning-text)]",
  firstUse: "text-[var(--product-blue-500)]",
  error: "text-[var(--error-text)]",
  processing: "text-[var(--product-blue-500)]",
  disabled: "text-[var(--neutral-400)]",
};

const illustrationMap: Partial<Record<EmptyVariant, string>> = {
  noData: noDataIllustration,
  noResult: noResultIllustration,
  noPermission: noPermissionIllustration,
  notFound: notFoundIllustration,
  network: networkIllustration,
  firstUse: firstUseIllustration,
};

export function Empty({ variant = "noData", title, description, action, className = "", ...props }: EmptyProps) {
  const Icon = iconMap[variant];
  const illustration = illustrationMap[variant];

  return (
    <div
      className={[
        "flex flex-col items-center justify-center rounded-[var(--radius-sm)] border border-dashed border-[var(--neutral-200)] bg-white px-6 py-10 text-center",
        className,
      ].join(" ")}
      {...props}
    >
      {illustration ? (
        <div className="flex h-40 w-full items-center justify-center" aria-hidden="true">
          <img src={illustration} alt="" className="max-h-40 max-w-[180px] object-contain" />
        </div>
      ) : (
        <Icon size={32} weight="regular" className={iconColorMap[variant]} />
      )}
      <h3 className="mt-4 text-base font-normal text-[var(--text-primary)]">{title}</h3>
      {description ? <p className="mt-2 max-w-sm text-sm leading-[var(--type-body-m-line-height)] text-[var(--text-tertiary)]">{description}</p> : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
