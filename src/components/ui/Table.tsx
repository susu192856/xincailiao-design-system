import type { CSSProperties, HTMLAttributes, ReactNode, TableHTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from "react";
import { CaretDown, CaretUp } from "@phosphor-icons/react";

type TableDensity = "compact" | "standard" | "comfortable";

export type TableProps = TableHTMLAttributes<HTMLTableElement> & {
  density?: TableDensity;
};

export type TableRowProps = HTMLAttributes<HTMLTableRowElement> & {
  selected?: boolean;
  disabled?: boolean;
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

export function TableContainer({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={["overflow-x-auto rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white", className].join(" ")}
      {...props}
    />
  );
}

export function Table({ className = "", density = "standard", style, ...props }: TableProps) {
  return (
    <table
      className={["w-full border-collapse text-left text-sm", className].join(" ")}
      style={{ ...densityVars[density], ...style }}
      {...props}
    />
  );
}

export function TableHeader(props: TableHTMLAttributes<HTMLTableSectionElement>) {
  return <thead {...props} />;
}

export function TableBody(props: TableHTMLAttributes<HTMLTableSectionElement>) {
  return <tbody {...props} />;
}

export function TableRow({ className = "", selected = false, disabled = false, ...props }: TableRowProps) {
  return (
    <tr
      className={[
        "border-b border-[var(--neutral-200)] last:border-b-0",
        selected ? "bg-[var(--product-blue-50)]" : "",
        disabled ? "text-[var(--neutral-400)] opacity-70" : "",
        className,
      ].join(" ")}
      aria-disabled={disabled || undefined}
      {...props}
    />
  );
}

export function TableHead({ className = "", align = "left", sortable = false, sortDirection = null, onSort, sticky, ...props }: TableHeadProps) {
  const handleSort = () => {
    if (!sortable || !onSort) return;
    const next: SortDirection = sortDirection === "asc" ? "desc" : sortDirection === "desc" ? null : "asc";
    onSort(next);
  };

  const stickyStyles: CSSProperties = {};
  if (sticky === "left") { stickyStyles.position = "sticky"; stickyStyles.left = 0; stickyStyles.zIndex = 2; }
  if (sticky === "right") { stickyStyles.position = "sticky"; stickyStyles.right = 0; stickyStyles.zIndex = 2; }

  return (
    <th
      className={[
        "bg-[var(--neutral-50)] px-[var(--table-cell-x)] py-[var(--table-cell-y)] text-xs font-semibold text-[var(--text-primary)]",
        sortable ? "cursor-pointer select-none hover:bg-[var(--neutral-100)]" : "",
        alignClass[align],
        className,
      ].join(" ")}
      style={stickyStyles}
      onClick={handleSort}
      aria-sort={sortDirection === "asc" ? "ascending" : sortDirection === "desc" ? "descending" : undefined}
      {...props}
    >
      <span className="inline-flex items-center gap-1">
        {props.children}
        {sortable && (
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
        )}
      </span>
    </th>
  );
}

export function TableCell({ className = "", align = "left", ...props }: TableCellProps) {
  return (
    <td
      className={[
        "px-[var(--table-cell-x)] py-[var(--table-cell-y)] text-[var(--text-secondary)]",
        alignClass[align],
        className,
      ].join(" ")}
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
