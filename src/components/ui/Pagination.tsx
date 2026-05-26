import { CaretLeft, CaretRight } from "@phosphor-icons/react";

type PaginationProps = {
  page: number;
  total: number;
  onPageChange?: (page: number) => void;
  disabled?: boolean;
  className?: string;
};

export function Pagination({ page, total, onPageChange, disabled = false, className = "" }: PaginationProps) {
  const pages = Array.from({ length: total }, (_, index) => index + 1);

  return (
    <nav className={["flex items-center gap-1", className].join(" ")} aria-label="Pagination">
      <button
        type="button"
        disabled={disabled || page <= 1}
        onClick={() => onPageChange?.(page - 1)}
        className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] text-[var(--neutral-700)] hover:bg-[var(--neutral-100)] disabled:cursor-not-allowed disabled:opacity-40"
      >
        <CaretLeft className="h-4 w-4" />
      </button>
      {pages.map((item) => (
        <button
          key={item}
          type="button"
          disabled={disabled}
          onClick={() => onPageChange?.(item)}
          className={[
            "h-8 min-w-8 rounded-[var(--radius-sm)] px-2 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-40",
            item === page
              ? "bg-[var(--neutral-900)] text-white"
              : "text-[var(--neutral-700)] hover:bg-[var(--neutral-100)]",
          ].join(" ")}
        >
          {item}
        </button>
      ))}
      <button
        type="button"
        disabled={disabled || page >= total}
        onClick={() => onPageChange?.(page + 1)}
        className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] text-[var(--neutral-700)] hover:bg-[var(--neutral-100)] disabled:cursor-not-allowed disabled:opacity-40"
      >
        <CaretRight className="h-4 w-4" />
      </button>
    </nav>
  );
}
