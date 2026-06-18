import { CaretLeft, CaretRight } from "@phosphor-icons/react";

export type PaginationProps = {
  page: number;
  total: number;
  onPageChange?: (page: number) => void;
  disabled?: boolean;
  className?: string;
  compact?: boolean;
  totalItems?: number;
  pageSize?: number;
  showTotal?: boolean;
  size?: "sm" | "md";
  showQuickJumper?: boolean;
  jumpValue?: string | number;
  onJumpValueChange?: (value: string) => void;
  onJump?: (page: number) => void;
  pageSizeOptions?: number[];
  onPageSizeChange?: (pageSize: number) => void;
};

function getPages(page: number, total: number) {
  if (total <= 7) return Array.from({ length: total }, (_, index) => index + 1);
  if (page <= 4) return [1, 2, 3, 4, 5, "...", total];
  if (page >= total - 3) return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "...", page - 1, page, page + 1, "...", total];
}

export function Pagination({
  page,
  total,
  onPageChange,
  disabled = false,
  className = "",
  compact = false,
  totalItems,
  pageSize,
  showTotal = false,
  size = "md",
  showQuickJumper = false,
  jumpValue,
  onJumpValueChange,
  onJump,
  pageSizeOptions,
  onPageSizeChange,
}: PaginationProps) {
  const pages = getPages(page, total);
  const buttonSize = size === "sm" ? "h-7 min-w-7 text-xs" : "h-8 min-w-8 text-sm";
  const iconButtonSize = size === "sm" ? "h-7 w-7" : "h-8 w-8";
  const inputSize = size === "sm" ? "h-7 w-14 text-xs" : "h-8 w-16 text-sm";

  return (
    <nav
      className={[
        "flex flex-wrap items-center gap-2",
        compact ? "text-sm" : "",
        className,
      ].join(" ")}
      aria-label="Pagination"
    >
      {showTotal && typeof totalItems === "number" ? (
        <span className="mr-2 text-sm text-[var(--neutral-600)]">
          共 {totalItems} 条{pageSize ? ` / ${pageSize} 条每页` : ""}
        </span>
      ) : null}
      <button
        type="button"
        disabled={disabled || page <= 1}
        onClick={() => onPageChange?.(page - 1)}
        aria-label="上一页"
        className={[
          "flex items-center justify-center rounded-[var(--radius-sm)] text-[var(--neutral-700)] hover:bg-[var(--neutral-100)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--neutral-900)] disabled:cursor-not-allowed disabled:opacity-40",
          iconButtonSize,
        ].join(" ")}
      >
        <CaretLeft className="h-4 w-4" />
      </button>
      {compact ? (
        <span className={[size === "sm" ? "h-7 leading-7 text-xs" : "h-8 leading-8 text-sm", "px-2 text-[var(--neutral-700)]"].join(" ")}>
          {page} / {total}
        </span>
      ) : (
        pages.map((item, index) => {
          if (item === "...") {
            return (
              <span key={`ellipsis-${index}`} className={[buttonSize, "px-2 text-center leading-8 text-[var(--neutral-400)]"].join(" ")}>
              ...
              </span>
            );
          }

          const pageNumber = Number(item);
          return (
            <button
              key={pageNumber}
              type="button"
              disabled={disabled}
              onClick={() => onPageChange?.(pageNumber)}
              aria-current={pageNumber === page ? "page" : undefined}
              className={[
                "rounded-[var(--radius-sm)] px-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--neutral-900)] disabled:cursor-not-allowed disabled:opacity-40",
                buttonSize,
                pageNumber === page
                  ? "bg-[var(--neutral-900)] text-white"
                  : "text-[var(--neutral-700)] hover:bg-[var(--neutral-100)]",
              ].join(" ")}
            >
              {pageNumber}
            </button>
          );
        })
      )}
      <button
        type="button"
        disabled={disabled || page >= total}
        onClick={() => onPageChange?.(page + 1)}
        aria-label="下一页"
        className={[
          "flex items-center justify-center rounded-[var(--radius-sm)] text-[var(--neutral-700)] hover:bg-[var(--neutral-100)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--neutral-900)] disabled:cursor-not-allowed disabled:opacity-40",
          iconButtonSize,
        ].join(" ")}
      >
        <CaretRight className="h-4 w-4" />
      </button>
      {showQuickJumper ? (
        <span className="ml-2 inline-flex items-center gap-2 text-sm text-[var(--neutral-500)]">
          跳至
          <input
            disabled={disabled}
            inputMode="numeric"
            value={jumpValue ?? page}
            onChange={(event) => onJumpValueChange?.(event.target.value)}
            onKeyDown={(event) => {
              if (event.key !== "Enter") return;
              const nextPage = Number((event.target as HTMLInputElement).value);
              if (Number.isFinite(nextPage)) onJump?.(Math.min(Math.max(nextPage, 1), total));
            }}
            className={[
              "rounded-[var(--radius-sm)] border border-[var(--neutral-300)] bg-white px-2 text-center text-[var(--neutral-900)] outline-none transition-colors focus:border-[var(--neutral-900)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--neutral-900)] disabled:cursor-not-allowed disabled:bg-[var(--neutral-100)] disabled:text-[var(--neutral-400)]",
              inputSize,
            ].join(" ")}
            aria-label="跳转页码"
          />
          页
        </span>
      ) : null}
      {pageSizeOptions && pageSizeOptions.length > 0 ? (
        <select
          disabled={disabled}
          value={pageSize}
          onChange={(event) => onPageSizeChange?.(Number(event.target.value))}
          className={[
            "ml-2 rounded-[var(--radius-sm)] border border-[var(--neutral-300)] bg-white px-2 text-[var(--neutral-700)] outline-none transition-colors focus:border-[var(--neutral-900)] disabled:cursor-not-allowed disabled:bg-[var(--neutral-100)] disabled:text-[var(--neutral-400)]",
            size === "sm" ? "h-7 text-xs" : "h-8 text-sm",
          ].join(" ")}
          aria-label="每页条数"
        >
          {pageSizeOptions.map((option) => (
            <option key={option} value={option}>
              {option} 条 / 页
            </option>
          ))}
        </select>
      ) : null}
    </nav>
  );
}
