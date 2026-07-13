import type { CSSProperties, HTMLAttributes, ReactNode, TableHTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from "react";
import { CaretDown, CaretUp } from "@phosphor-icons/react";

type TableDensity = "compact" | "standard" | "comfortable";
type TableVariant = "line" | "grid";

export type TableProps = TableHTMLAttributes<HTMLTableElement> & {
  density?: TableDensity;
  variant?: TableVariant;
};

export type TableRowProps = HTMLAttributes<HTMLTableRowElement> & {
  selected?: boolean;
  disabled?: boolean;
  sticky?: "top" | "bottom";
};

type TableCellAlign = "left" | "center" | "right";
type SortDirection = "asc" | "desc" | null;

export type TableHeadProps = ThHTMLAttributes<HTMLTableCellElement> & {
  align?: TableCellAlign;
  sortable?: boolean;
  sortDirection?: SortDirection;
  onSort?: (direction: SortDirection) => void;
  sticky?: "left" | "right";
};

export type TableCellProps = TdHTMLAttributes<HTMLTableCellElement> & {
  align?: TableCellAlign;
  sticky?: "left" | "right";
};

export type TableContainerProps = HTMLAttributes<HTMLDivElement> & {
  maxHeight?: number | string;
};

const densityVars: Record<TableDensity, CSSProperties> = {
  compact: {
    "--table-cell-x": "12px",
    "--table-cell-y": "8px",
  } as CSSProperties,
  standard: {
    "--table-cell-x": "16px",
    "--table-cell-y": "12px",
  } as CSSProperties,
  comfortable: {
    "--table-cell-x": "20px",
    "--table-cell-y": "16px",
  } as CSSProperties,
};

const alignClass: Record<TableCellAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export function TableContainer({ className = "", maxHeight, style, ...props }: TableContainerProps) {
  return (
    <div
      className={["overflow-auto rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white", className].join(" ")}
      style={{ maxHeight, ...style }}
      {...props}
    />
  );
}

export function Table({ className = "", density = "standard", variant = "line", style, ...props }: TableProps) {
  return (
    <table
      className={[
        "w-full border-collapse text-left text-sm",
        variant === "grid" ? "[&_th]:border-r [&_td]:border-r [&_th:last-child]:border-r-0 [&_td:last-child]:border-r-0 [&_th]:border-[var(--neutral-200)] [&_td]:border-[var(--neutral-200)]" : "",
        className,
      ].join(" ")}
      data-table-variant={variant}
      style={{ ...densityVars[density], ...style }}
      {...props}
    />
  );
}

export function TableHeader({ className = "", children, ...props }: TableHTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={className} {...props}>{children}</thead>;
}

export function TableBody({ children, ...props }: TableHTMLAttributes<HTMLTableSectionElement>) {
  return <tbody {...props}>{children}</tbody>;
}

export function TableRow({ className = "", selected = false, disabled = false, sticky, style, ...props }: TableRowProps) {
  const stickyStyles: CSSProperties = { ...style };
  if (sticky === "top") { stickyStyles.position = "sticky"; stickyStyles.top = 0; stickyStyles.zIndex = 3; }
  if (sticky === "bottom") { stickyStyles.position = "sticky"; stickyStyles.bottom = 0; stickyStyles.zIndex = 3; }
  return (
    <tr
      className={[
        "border-b border-[var(--neutral-200)] last:border-b-0",
        selected ? "bg-[var(--product-blue-50)]" : "",
        disabled ? "text-[var(--neutral-400)] opacity-70" : "",
        sticky ? "bg-white" : "",
        className,
      ].join(" ")}
      style={stickyStyles}
      aria-disabled={disabled || undefined}
      {...props}
    />
  );
}

export function TableHead({ className = "", align = "left", sortable = false, sortDirection = null, onSort, sticky, style, ...props }: TableHeadProps) {
  const handleSort = () => {
    if (!sortable || !onSort) return;
    const next: SortDirection = sortDirection === "asc" ? "desc" : sortDirection === "desc" ? null : "asc";
    onSort(next);
  };

  const stickyStyles: CSSProperties = { ...style };
  if (sticky === "left") { stickyStyles.position = "sticky"; stickyStyles.left = 0; stickyStyles.zIndex = 2; stickyStyles.boxShadow = "var(--table-sticky-shadow-left)"; }
  if (sticky === "right") { stickyStyles.position = "sticky"; stickyStyles.right = 0; stickyStyles.zIndex = 2; stickyStyles.boxShadow = "var(--table-sticky-shadow-right)"; }

  const justifyClass = align === "right" ? "justify-end" : align === "center" ? "justify-center" : "justify-start";

  return (
    <th
      className={[
        "whitespace-nowrap bg-[var(--neutral-50)] px-[var(--table-cell-x)] py-[var(--table-cell-y)] text-sm font-semibold text-[var(--neutral-600)]",
        sortable ? "select-none" : "",
        alignClass[align],
        className,
      ].join(" ")}
      style={stickyStyles}
      aria-sort={sortDirection === "asc" ? "ascending" : sortDirection === "desc" ? "descending" : undefined}
      {...props}
    >
      {sortable ? (
        <button type="button" onClick={handleSort} className={`inline-flex w-full items-center gap-1 rounded-[var(--radius-sm)] text-sm font-semibold hover:text-[var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring-color)] ${justifyClass}`} aria-label={`按${String(props.children)}排序`}>
          {props.children}
          <span className="inline-flex flex-col -space-y-1">
            <CaretUp
              size={10}
              weight="fill"
              className={sortDirection === "asc" ? "text-[var(--text-primary)]" : "text-[var(--neutral-300)]"}
            />
            <CaretDown
              size={10}
              weight="fill"
              className={sortDirection === "desc" ? "text-[var(--text-primary)]" : "text-[var(--neutral-300)]"}
            />
          </span>
        </button>
      ) : (
        <span className={`inline-flex w-full items-center ${justifyClass}`}>{props.children}</span>
      )}
    </th>
  );
}

export function TableCell({ className = "", align = "left", sticky, style, ...props }: TableCellProps) {
  const stickyStyles: CSSProperties = { ...style };
  if (sticky === "left") { stickyStyles.position = "sticky"; stickyStyles.left = 0; stickyStyles.zIndex = 1; stickyStyles.boxShadow = "var(--table-sticky-shadow-left)"; }
  if (sticky === "right") { stickyStyles.position = "sticky"; stickyStyles.right = 0; stickyStyles.zIndex = 1; stickyStyles.boxShadow = "var(--table-sticky-shadow-right)"; }
  return (
    <td
      className={[
        "whitespace-nowrap px-[var(--table-cell-x)] py-[var(--table-cell-y)] text-[var(--text-body)]",
        sticky ? "bg-white" : "",
        alignClass[align],
        className,
      ].join(" ")}
      style={stickyStyles}
      {...props}
    />
  );
}

export function TableEmpty({
  colSpan,
  title = "暂无数据",
  description,
  action,
}: {
  colSpan: number;
  title?: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="py-12 text-center">
        <div className="mx-auto max-w-sm">
          <p className="text-sm font-normal text-[var(--text-primary)]">{title}</p>
          {description ? <p className="mt-1 text-xs leading-5 text-[var(--text-tertiary)]">{description}</p> : null}
          {action ? <div className="mt-4">{action}</div> : null}
        </div>
      </TableCell>
    </TableRow>
  );
}

export function TableSkeletonRows({ rows = 3, columns = 4 }: { rows?: number; columns?: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {Array.from({ length: columns }).map((__, columnIndex) => (
            <TableCell key={columnIndex}>
              <div className="h-4 w-full bg-[var(--neutral-100)]" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}
