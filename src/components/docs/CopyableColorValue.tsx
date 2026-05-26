import { Check, Copy } from "lucide-react";
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
        "group flex cursor-pointer items-center gap-1 font-mono text-xs text-zinc-600 transition-colors hover:text-zinc-900",
        className,
      ].join(" ")}
      onClick={copyToClipboard}
    >
      <span>{display}</span>
      {copied ? (
        <Check className="h-3 w-3 text-green-600" />
      ) : (
        <Copy className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
      )}
    </div>
  );
}
