import { useState } from "react";

type CopyableColorValueProps = {
  value: string;
  display?: string;
  className?: string;
};

export default function CopyableColorValue({
  value,
  display = value,
  className = "",
}: CopyableColorValueProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={[
        "group flex cursor-pointer items-center gap-1 font-mono text-xs text-[var(--neutral-600)] transition-colors hover:text-[var(--neutral-900)]",
        className,
      ].join(" ")}
      onClick={copyToClipboard}
    >
      <span>{display}</span>
      {copied ? (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 6L5 8.5 9.5 3"/></svg>
      ) : (
        <svg className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3.5" y="3.5" width="7" height="7" rx="1"/><path d="M1.5 8.5V2A.5.5 0 012 1.5h6"/></svg>
      )}
    </div>
  );
}
