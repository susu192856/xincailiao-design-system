import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { CaretLeft, CaretRight, MagnifyingGlass } from "@phosphor-icons/react";
import { Checkbox } from "./Checkbox";
import { Input } from "./Input";

export type TransferItem = {
  key: string;
  label: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
};

export type TransferProps = {
  items: TransferItem[];
  targetKeys?: string[];
  defaultTargetKeys?: string[];
  sourceTitle?: string;
  targetTitle?: string;
  emptyText?: string;
  showSearch?: boolean;
  disabled?: boolean;
  targetActions?: ReactNode;
  className?: string;
  onChange?: (targetKeys: string[]) => void;
};

export function Transfer({
  items,
  targetKeys,
  defaultTargetKeys = [],
  sourceTitle = "可选项",
  targetTitle = "已选项",
  emptyText = "暂无数据",
  showSearch = false,
  disabled = false,
  targetActions,
  className = "",
  onChange,
}: TransferProps) {
  const [internalTargetKeys, setInternalTargetKeys] = useState(defaultTargetKeys);
  const [selectedSourceKeys, setSelectedSourceKeys] = useState<string[]>([]);
  const [selectedTargetKeys, setSelectedTargetKeys] = useState<string[]>([]);
  const [sourceKeyword, setSourceKeyword] = useState("");
  const [targetKeyword, setTargetKeyword] = useState("");
  const currentTargetKeys = targetKeys ?? internalTargetKeys;

  const sourceItems = useMemo(() => items.filter((item) => !currentTargetKeys.includes(item.key)), [items, currentTargetKeys]);
  const targetItems = useMemo(() => items.filter((item) => currentTargetKeys.includes(item.key)), [items, currentTargetKeys]);
  const filteredSourceItems = useMemo(() => filterItems(sourceItems, sourceKeyword), [sourceItems, sourceKeyword]);
  const filteredTargetItems = useMemo(() => filterItems(targetItems, targetKeyword), [targetItems, targetKeyword]);

  function filterItems(data: TransferItem[], keyword: string) {
    if (!keyword.trim()) return data;
    const normalizedKeyword = keyword.trim().toLowerCase();
    return data.filter((item) => {
      const label = typeof item.label === "string" ? item.label : "";
      const description = typeof item.description === "string" ? item.description : "";
      return `${label} ${description}`.toLowerCase().includes(normalizedKeyword);
    });
  }

  function updateTargetKeys(nextTargetKeys: string[]) {
    setInternalTargetKeys(nextTargetKeys);
    onChange?.(nextTargetKeys);
  }

  function toggleSelected(key: string, side: "source" | "target") {
    const setSelectedKeys = side === "source" ? setSelectedSourceKeys : setSelectedTargetKeys;
    setSelectedKeys((current) => current.includes(key) ? current.filter((item) => item !== key) : [...current, key]);
  }

  function move(direction: "right" | "left") {
    if (direction === "right") {
      updateTargetKeys(Array.from(new Set([...currentTargetKeys, ...selectedSourceKeys])));
      setSelectedSourceKeys([]);
    } else {
      updateTargetKeys(currentTargetKeys.filter((key) => !selectedTargetKeys.includes(key)));
      setSelectedTargetKeys([]);
    }
  }

  function ListPanel({ title, data, side, keyword, onKeywordChange }: {
    title: string;
    data: TransferItem[];
    side: "source" | "target";
    keyword: string;
    onKeywordChange: (keyword: string) => void;
  }) {
    const selectedKeys = side === "source" ? selectedSourceKeys : selectedTargetKeys;

    return (
      <div className="min-w-64 flex-1 rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white">
        <div className="flex items-center justify-between border-b border-[var(--neutral-200)] bg-[var(--neutral-50)] px-3 py-2 text-sm text-[var(--text-primary)]">
          <span>{title}</span>
          <span className="flex items-center gap-1.5">
            <span className="text-xs text-[var(--text-tertiary)]">{data.length} 项</span>
            {side === "target" ? targetActions : null}
          </span>
        </div>
        {showSearch ? (
          <div className="border-b border-[var(--neutral-200)] px-3 py-2">
            <Input
              size="sm"
              aria-label={`搜索${title}`}
              value={keyword}
              disabled={disabled}
              onChange={(event) => onKeywordChange(event.target.value)}
              prefix={<MagnifyingGlass size={14} weight="regular" />}
              placeholder="搜索"
            />
          </div>
        ) : null}
        <div className="min-h-52 divide-y divide-[var(--neutral-100)]">
          {data.length > 0 ? data.map((item) => (
            <Checkbox
              key={item.key}
              size="sm"
              label={item.label}
              description={item.description}
              disabled={disabled || item.disabled}
              checked={selectedKeys.includes(item.key)}
              onChange={() => toggleSelected(item.key, side)}
              className="px-3 py-2 text-[var(--text-secondary)]"
            />
          )) : (
            <div className="flex min-h-52 items-center justify-center text-sm text-[var(--neutral-400)]">{emptyText}</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={["flex flex-wrap items-center gap-3", className].join(" ")}>
      <ListPanel title={sourceTitle} data={filteredSourceItems} side="source" keyword={sourceKeyword} onKeywordChange={setSourceKeyword} />
      <div className="flex flex-col gap-2">
        <button
          type="button"
          disabled={disabled || selectedSourceKeys.length === 0}
          aria-label="移至已授权字段"
          className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--product-blue-500)] bg-white text-[var(--product-blue-500)] transition-colors hover:bg-[var(--product-blue-50)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring-color)] disabled:cursor-not-allowed disabled:border-[var(--neutral-200)] disabled:bg-[var(--neutral-50)] disabled:text-[var(--neutral-400)]"
          onClick={() => move("right")}
        >
          <CaretRight size={14} weight="regular" />
        </button>
        <button
          type="button"
          disabled={disabled || selectedTargetKeys.length === 0}
          aria-label="移回未授权字段"
          className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--product-blue-500)] bg-white text-[var(--product-blue-500)] transition-colors hover:bg-[var(--product-blue-50)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring-color)] disabled:cursor-not-allowed disabled:border-[var(--neutral-200)] disabled:bg-[var(--neutral-50)] disabled:text-[var(--neutral-400)]"
          onClick={() => move("left")}
        >
          <CaretLeft size={14} weight="regular" />
        </button>
      </div>
      <ListPanel title={targetTitle} data={filteredTargetItems} side="target" keyword={targetKeyword} onKeywordChange={setTargetKeyword} />
    </div>
  );
}
