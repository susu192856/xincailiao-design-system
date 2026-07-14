<template>
  <figure class="xc-image">
    <div class="xc-image__frame" :class="[`xc-image__frame--${ratio}`, `xc-image__frame--${fit}`]">
      <div v-if="loading" class="xc-image__state xc-image__state--loading" />
      <img v-else-if="!src && placeholder === 'default'" class="xc-image__media" :src="defaultPlaceholder" :alt="alt || '默认图片'" />
      <div v-else-if="error || !src" class="xc-image__state">{{ fallbackText }}</div>
      <img v-else class="xc-image__media" :src="src" :alt="alt" />
    </div>
    <figcaption v-if="caption" class="xc-image__caption">{{ caption }}</figcaption>
  </figure>
</template>

<script setup lang="ts">
import defaultPlaceholder from "../../../../src/assets/image/default-placeholder.jpg";

type ImageRatio = "1:1" | "2:1" | "3:1" | "3:2" | "16:9" | "4:3" | "3:4" | "2:3" | "square" | "video" | "wide";
type ImageFit = "cover" | "contain";

withDefaults(
  defineProps<{
    src?: string;
    alt?: string;
    ratio?: ImageRatio;
    fit?: ImageFit;
    loading?: boolean;
    error?: boolean;
    fallbackText?: string;
    caption?: string;
    placeholder?: "error" | "default";
  }>(),
  {
    alt: "",
    ratio: "video",
    fit: "cover",
    loading: false,
    error: false,
    fallbackText: "图片加载失败",
    placeholder: "error",
  },
);
</script>

<style scoped>
.xc-image {
  margin: 0;
}

.xc-image__frame {
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--neutral-200);
  background: var(--neutral-50);
}

.xc-image__frame--square { aspect-ratio: 1 / 1; }
.xc-image__frame--video { aspect-ratio: 16 / 9; }
.xc-image__frame--wide { aspect-ratio: 3 / 1; }
.xc-image__frame--1\:1 { aspect-ratio: 1 / 1; }
.xc-image__frame--2\:1 { aspect-ratio: 2 / 1; }
.xc-image__frame--3\:1 { aspect-ratio: 3 / 1; }
.xc-image__frame--3\:2 { aspect-ratio: 3 / 2; }
.xc-image__frame--16\:9 { aspect-ratio: 16 / 9; }
.xc-image__frame--4\:3 { aspect-ratio: 4 / 3; }
.xc-image__frame--3\:4 { aspect-ratio: 3 / 4; }
.xc-image__frame--2\:3 { aspect-ratio: 2 / 3; }

.xc-image__media {
  width: 100%;
  height: 100%;
}

.xc-image__frame--cover .xc-image__media { object-fit: cover; }
.xc-image__frame--contain .xc-image__media { object-fit: contain; }

.xc-image__state {
  color: var(--neutral-400);
  font-size: 12px;
}

.xc-image__state--loading {
  width: 112px;
  height: 32px;
  background: var(--neutral-200);
  animation: xc-image-pulse 1.1s ease-in-out infinite alternate;
}

.xc-image__caption {
  border: 1px solid var(--neutral-200);
  border-top: 0;
  padding: 8px 12px;
  color: var(--neutral-600);
  font-size: 12px;
  line-height: 18px;
}

@keyframes xc-image-pulse {
  from { opacity: 0.45; }
  to { opacity: 1; }
}
</style>
