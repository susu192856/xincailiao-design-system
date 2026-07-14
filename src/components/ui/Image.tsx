import type { ImgHTMLAttributes, ReactNode } from "react";
import { ImageBroken } from "@phosphor-icons/react";
import defaultPlaceholder from "../../assets/image/default-placeholder.jpg";

type ImageRatio = "1:1" | "2:1" | "3:1" | "3:2" | "16:9" | "4:3" | "3:4" | "2:3" | "square" | "video" | "wide";

export type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  ratio?: ImageRatio;
  fit?: "cover" | "contain";
  fallbackText?: string;
  isError?: boolean;
  loadingState?: boolean;
  caption?: ReactNode;
  placeholder?: "error" | "default";
};

const ratioClasses = {
  square: "aspect-square",
  video: "aspect-video",
  wide: "aspect-[3/1]",
  "1:1": "aspect-square",
  "2:1": "aspect-[2/1]",
  "3:1": "aspect-[3/1]",
  "3:2": "aspect-[3/2]",
  "16:9": "aspect-video",
  "4:3": "aspect-[4/3]",
  "3:4": "aspect-[3/4]",
  "2:3": "aspect-[2/3]",
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
  placeholder = "error",
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

    if (!isError && !props.src && placeholder === "default") {
      return (
        <div className={frameClassName}>
          <img src={defaultPlaceholder} alt={alt || "默认图片"} className={["h-full w-full", fitClasses[fit]].join(" ")} />
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
          "overflow-hidden rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white",
          className,
        ].join(" ")}
      >
        {content}
        <div className="border-t border-[var(--neutral-200)] px-3 py-2 text-xs leading-5 text-[var(--text-tertiary)]">
          {caption}
        </div>
      </div>
    );
  }

  return content;
}
