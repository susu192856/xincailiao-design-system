import type { ReactNode } from "react";
import { useState } from "react";
import { CaretRight } from "@phosphor-icons/react";
import { Checkbox } from "./Checkbox";

export type TreeNode = {
  key: string;
  label: ReactNode;
  children?: TreeNode[];
  disabled?: boolean;
};

export type TreeProps = {
  nodes: TreeNode[];
  defaultExpandedKeys?: string[];
  selectedKey?: string;
  defaultSelectedKey?: string;
  checkable?: boolean;
  checkedKeys?: string[];
  defaultCheckedKeys?: string[];
  loading?: boolean;
  emptyText?: ReactNode;
  className?: string;
  onSelect?: (key: string, node: TreeNode) => void;
  onCheck?: (checkedKeys: string[], node: TreeNode) => void;
};

function TreeItem({ node, level, expandedKeys, selectedKey, checkedKeys, checkable, onToggle, onSelect, onCheck }: {
  node: TreeNode;
  level: number;
  expandedKeys: string[];
  selectedKey?: string;
  checkedKeys: string[];
  checkable: boolean;
  onToggle: (key: string) => void;
  onSelect: (key: string, node: TreeNode) => void;
  onCheck: (key: string, node: TreeNode) => void;
}) {
  const hasChildren = Boolean(node.children?.length);
  const expanded = expandedKeys.includes(node.key);
  const selected = selectedKey === node.key;
  const checked = checkedKeys.includes(node.key);

  return (
    <div>
      <div
        className={[
          "flex h-8 w-full items-center gap-1.5 rounded-[var(--radius-sm)] pr-2 text-left text-sm disabled:text-[var(--neutral-400)]",
          node.disabled ? "text-[var(--neutral-400)]" : "",
          selected ? "bg-[var(--neutral-100)] text-[var(--text-primary)]" : "text-[var(--text-secondary)] hover:bg-[var(--neutral-50)]",
        ].join(" ")}
        style={{ paddingLeft: 8 + level * 16 }}
      >
        {hasChildren ? (
          <button
            type="button"
            disabled={node.disabled}
            aria-label={`${expanded ? "收起" : "展开"}${typeof node.label === "string" ? node.label : "树节点"}`}
            aria-expanded={expanded}
            onClick={() => onToggle(node.key)}
            className="flex h-5 w-[13px] shrink-0 items-center justify-center disabled:cursor-not-allowed"
          >
          <CaretRight
            size={13}
            weight="regular"
            className={[
              "shrink-0 transition-transform",
              node.disabled ? "text-[var(--neutral-400)]" : "text-[var(--text-secondary)]",
              hasChildren && expanded ? "rotate-90" : "",
            ].join(" ")}
          />
          </button>
        ) : <span className="w-[13px] shrink-0" aria-hidden="true" />}
        {checkable ? (
          <Checkbox
            size="sm"
            checked={checked}
            disabled={node.disabled}
            aria-label={`选择${typeof node.label === "string" ? node.label : "树节点"}`}
            onChange={() => onCheck(node.key, node)}
            className="shrink-0"
          />
        ) : null}
        <button
          type="button"
          disabled={node.disabled}
          onClick={() => onSelect(node.key, node)}
          className="min-w-0 flex-1 truncate text-left disabled:cursor-not-allowed"
        >
          {node.label}
        </button>
      </div>
      {hasChildren && expanded ? (
        <div>
          {node.children!.map((child) => (
            <TreeItem
              key={child.key}
              node={child}
              level={level + 1}
              expandedKeys={expandedKeys}
              selectedKey={selectedKey}
              checkedKeys={checkedKeys}
              checkable={checkable}
              onToggle={onToggle}
              onSelect={onSelect}
              onCheck={onCheck}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function Tree({
  nodes,
  defaultExpandedKeys = [],
  selectedKey,
  defaultSelectedKey,
  checkable = false,
  checkedKeys,
  defaultCheckedKeys = [],
  loading = false,
  emptyText = "暂无数据",
  className = "",
  onSelect,
  onCheck,
}: TreeProps) {
  const [expandedKeys, setExpandedKeys] = useState(defaultExpandedKeys);
  const [internalSelectedKey, setInternalSelectedKey] = useState(defaultSelectedKey);
  const [internalCheckedKeys, setInternalCheckedKeys] = useState(defaultCheckedKeys);
  const currentSelectedKey = selectedKey ?? internalSelectedKey;
  const currentCheckedKeys = checkedKeys ?? internalCheckedKeys;

  function toggle(key: string) {
    setExpandedKeys((current) => current.includes(key) ? current.filter((item) => item !== key) : [...current, key]);
  }

  function select(key: string, node: TreeNode) {
    setInternalSelectedKey(key);
    onSelect?.(key, node);
  }

  function check(key: string, node: TreeNode) {
    const nextCheckedKeys = currentCheckedKeys.includes(key)
      ? currentCheckedKeys.filter((item) => item !== key)
      : [...currentCheckedKeys, key];
    setInternalCheckedKeys(nextCheckedKeys);
    onCheck?.(nextCheckedKeys, node);
  }

  return (
    <div className={["w-72 rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-2", className].join(" ")}>
      {loading ? (
        <div className="space-y-2 p-2">
          {[0, 1, 2].map((item) => (
            <div key={item} className="h-7 animate-pulse bg-[var(--neutral-50)]" />
          ))}
        </div>
      ) : null}
      {!loading && nodes.length === 0 ? (
        <div className="flex min-h-28 items-center justify-center text-sm text-[var(--neutral-400)]">{emptyText}</div>
      ) : null}
      {!loading ? (
        <>
      {nodes.map((node) => (
        <TreeItem
          key={node.key}
          node={node}
          level={0}
          expandedKeys={expandedKeys}
          selectedKey={currentSelectedKey}
          checkedKeys={currentCheckedKeys}
          checkable={checkable}
          onToggle={toggle}
          onSelect={select}
          onCheck={check}
        />
      ))}
        </>
      ) : null}
    </div>
  );
}
