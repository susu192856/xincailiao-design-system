import type { ReactNode } from "react";
import { useId, useState } from "react";
import { CaretDown } from "@phosphor-icons/react";

type CollapseItem = {
  key: string;
  title: ReactNode;
  children: ReactNode;
  disabled?: boolean;
  extra?: ReactNode;
};

export type CollapseProps = {
  items: CollapseItem[];
  defaultOpenKeys?: string[];
  openKeys?: string[];
  accordion?: boolean;
  onChange?: (openKeys: string[]) => void;
  size?: "sm" | "md";
  variant?: "outlined" | "plain";
  className?: string;
};

const sizeClasses = {
  sm: {
    trigger: "px-3 py-2 text-sm",
    content: "px-3 pb-3 text-sm leading-5",
  },
  md: {
    trigger: "px-4 py-3 text-sm",
    content: "px-4 pb-4 text-sm leading-[var(--type-body-m-line-height)]",
  },
};

export function Collapse({
  items,
  defaultOpenKeys = [],
  openKeys,
  accordion = false,
  onChange,
  size = "md",
  variant = "outlined",
  className = "",
}: CollapseProps) {
  const collapseId = useId();
  const [internalOpenKeys, setInternalOpenKeys] = useState(defaultOpenKeys);
  const currentOpenKeys = openKeys ?? internalOpenKeys;
  const sizing = sizeClasses[size];

  function toggle(key: string) {
    const nextOpenKeys = currentOpenKeys.includes(key)
      ? currentOpenKeys.filter((item) => item !== key)
      : accordion ? [key] : [...currentOpenKeys, key];
    setInternalOpenKeys(nextOpenKeys);
    onChange?.(nextOpenKeys);
  }

  return (
    <div
      className={[
        "divide-y divide-[var(--neutral-200)] rounded-[var(--radius-sm)] bg-white",
        variant === "outlined" ? "border border-[var(--neutral-200)]" : "",
        className,
      ].join(" ")}
    >
      {items.map((item) => {
        const isOpen = currentOpenKeys.includes(item.key);
        const safeKey = item.key.replace(/[^a-zA-Z0-9_-]/g, "-");
        const triggerId = `${collapseId}-${safeKey}-trigger`;
        const panelId = `${collapseId}-${safeKey}-panel`;
        return (
          <div key={item.key}>
            <button
              type="button"
              id={triggerId}
              disabled={item.disabled}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(item.key)}
              className={[
                "flex w-full items-center justify-between gap-3 text-left text-[var(--text-primary)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--neutral-900)] disabled:cursor-not-allowed disabled:text-[var(--neutral-400)]",
                sizing.trigger,
              ].join(" ")}
            >
              <span className="min-w-0 flex-1">{item.title}</span>
              <span className="flex shrink-0 items-center gap-2">
                {item.extra ? <span onClick={(event) => event.stopPropagation()}>{item.extra}</span> : null}
                <CaretDown
                  size={16}
                  weight="regular"
                  className={["transition-transform", isOpen ? "rotate-180" : ""].join(" ")}
                />
              </span>
            </button>
            {isOpen ? (
              <div
                id={panelId}
                role="region"
                aria-labelledby={triggerId}
                className={[sizing.content, "text-[var(--text-tertiary)]"].join(" ")}
              >
                {item.children}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
