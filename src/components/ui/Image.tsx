import type { ImgHTMLAttributes, ReactNode } from "react";
import { ImageBroken } from "@phosphor-icons/react";

export type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  ratio?: "square" | "video" | "wide";
  fit?: "cover" | "contain";
  fallbackText?: string;
  isError?: boolean;
  loadingState?: boolean;
  caption?: ReactNode;
};

const ratioClasses = {
  square: "aspect-square",
  video: "aspect-video",
  wide: "aspect-[3/1]",
} as const;

const fitClasses = {
  cover: "object-cover",
  contain: "object-contain",
} as const;

export function Image({
  ratio = "video",
  fit = "cover",
  fallbackText = "图片加载失败",
  isError = false,
  loadingState = false,
  caption,
  className = "",
  alt = "",
  ...props
}: ImageProps) {
  const frameClassName = [
    "overflow-hidden bg-[var(--neutral-50)]",
    ratioClasses[ratio],
    className,
  ].join(" ");

  const content = (() => {
    if (loadingState) {
      return (
        <div className={["flex animate-pulse items-center justify-center border border-[var(--neutral-100)] bg-[var(--neutral-50)]", ratioClasses[ratio]].join(" ")}>
          <div className="h-8 w-28 bg-[var(--neutral-200)]" />
        </div>
      );
    }

    if (isError || !props.src) {
      return (
        <div
          className={[
            "flex items-center justify-center border border-[var(--neutral-200)] bg-[var(--neutral-50)] text-[var(--neutral-400)]",
            ratioClasses[ratio],
          ].join(" ")}
        >
          <div className="flex flex-col items-center gap-2 text-xs">
            <ImageBroken size={24} weight="regular" />
            <span>{fallbackText}</span>
          </div>
        </div>
      );
    }

    return (
      <div className={frameClassName}>
        <img alt={alt} className={["h-full w-full", fitClasses[fit]].join(" ")} {...props} />
      </div>
    );
  })();

  if (caption) {
    return (
      <div
        className={[
          "overflow-hidden border border-[var(--neutral-200)] bg-white",
          className,
        ].join(" ")}
      >
        {content}
        <div className="border-t border-[var(--neutral-200)] px-3 py-2 text-xs leading-5 text-[var(--neutral-600)]">
          {caption}
        </div>
      </div>
    );
  }

  return content;
}
