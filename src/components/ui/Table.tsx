import type { TableHTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from "react";

export function Table({ className = "", ...props }: TableHTMLAttributes<HTMLTableElement>) {
  return <table className={["w-full border-collapse text-left text-sm", className].join(" ")} {...props} />;
}

export function TableHeader(props: TableHTMLAttributes<HTMLTableSectionElement>) {
  return <thead {...props} />;
}

export function TableBody(props: TableHTMLAttributes<HTMLTableSectionElement>) {
  return <tbody {...props} />;
}

export function TableRow({ className = "", ...props }: TableHTMLAttributes<HTMLTableRowElement>) {
  return <tr className={["border-b border-[var(--neutral-200)] last:border-b-0", className].join(" ")} {...props} />;
}

export function TableHead({ className = "", ...props }: ThHTMLAttributes<HTMLTableCellElement>) {
  return <th className={["bg-[var(--neutral-50)] px-4 py-3 text-xs font-semibold text-[var(--neutral-900)]", className].join(" ")} {...props} />;
}

export function TableCell({ className = "", ...props }: TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={["px-4 py-3 text-[var(--neutral-700)]", className].join(" ")} {...props} />;
}
