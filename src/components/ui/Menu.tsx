import type { ReactNode } from "react";

export type MenuItem = {
  key: string;
  type?: "item" | "group" | "divider";
  label: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  badge?: ReactNode;
  children?: MenuItem[];
};

export type MenuProps = {
  items: MenuItem[];
  value?: string;
  activeKey?: string;
  orientation?: "vertical" | "horizontal";
  mode?: "vertical" | "horizontal";
  collapsed?: boolean;
  size?: "sm" | "md";
  className?: string;
  onValueChange?: (key: string) => void;
  onSelect?: (key: string) => void;
};

const sizeClass = {
  sm: {
    vertical: "h-8 text-xs",
    horizontal: "h-9 text-sm",
  },
  md: {
    vertical: "h-9 text-sm",
    horizontal: "h-10 text-sm",
  },
};

function renderItems({
  items,
  activeKey,
  mode,
  collapsed,
  size,
  onSelect,
  depth = 0,
}: Required<Pick<MenuProps, "items" | "mode" | "collapsed" | "size">> & Pick<MenuProps, "activeKey" | "onSelect"> & { depth?: number }) {
  return items.map((item) => {
    if (item.type === "divider") {
      return <div key={item.key} className="my-2 h-px bg-[var(--neutral-200)]" />;
    }

    if (item.type === "group") {
      return (
        <div key={item.key} className={mode === "vertical" ? "space-y-1" : "contents"}>
          {!collapsed && mode === "vertical" ? (
            <div className="px-3 pb-1 pt-3 text-xs font-medium text-[var(--text-tertiary)]">{item.label}</div>
          ) : null}
          {item.children
            ? renderItems({ items: item.children, activeKey, mode, collapsed, size, onSelect, depth: depth + 1 })
            : null}
        </div>
      );
    }

    const active = item.key === activeKey;
    return (
      <button
        key={item.key}
        type="button"
        disabled={item.disabled}
        aria-current={active ? "page" : undefined}
        title={collapsed && typeof item.label === "string" ? item.label : undefined}
        onClick={() => onSelect?.(item.key)}
        className={[
          "inline-flex items-center gap-2 rounded-[var(--radius-sm)] font-normal transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--neutral-900)] disabled:cursor-not-allowed disabled:text-[var(--text-disabled)]",
          mode === "vertical"
            ? collapsed
              ? `${sizeClass[size].vertical} w-full justify-center px-0`
              : `${sizeClass[size].vertical} w-full px-3`
            : `${sizeClass[size].horizontal} shrink-0 whitespace-nowrap px-4`,
          !collapsed && mode === "vertical" && depth > 0 ? "pl-8" : "",
          active
            ? mode === "horizontal"
              ? "border-b-2 border-[var(--neutral-900)] text-[var(--text-primary)]"
              : "bg-[var(--neutral-900)] text-white"
            : mode === "horizontal"
              ? "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              : "text-[var(--text-secondary)] hover:bg-[var(--neutral-100)]",
        ].join(" ")}
      >
        {item.icon}
        {collapsed ? null : <span className="min-w-0 flex-1 truncate text-left">{item.label}</span>}
        {!collapsed && item.badge ? <span className="ml-auto">{item.badge}</span> : null}
      </button>
    );
  });
}

export function Menu({
  items,
  value,
  activeKey,
  orientation,
  mode,
  collapsed = false,
  size = "md",
  className = "",
  onValueChange,
  onSelect,
}: MenuProps) {
  const resolvedMode = orientation ?? mode ?? "vertical";
  const resolvedValue = value ?? activeKey;
  const handleSelect = (key: string) => {
    onValueChange?.(key);
    onSelect?.(key);
  };

  return (
    <nav
      className={[
        resolvedMode === "vertical"
          ? collapsed
            ? "w-14 space-y-1 bg-[var(--neutral-50)] p-2"
            : "w-56 space-y-1 bg-[var(--neutral-50)] p-2"
          : "flex max-w-full gap-1 overflow-x-auto border-b border-[var(--neutral-200)]",
        className,
      ].join(" ")}
    >
      {renderItems({
        items,
        activeKey: resolvedValue,
        mode: resolvedMode,
        collapsed,
        size,
        onSelect: handleSelect,
      })}
    </nav>
  );
}
