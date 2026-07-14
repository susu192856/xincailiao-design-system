<template>
  <span class="xc-avatar" :class="[`xc-avatar--${size}`, `xc-avatar--${shape}`, { 'xc-avatar--disabled': disabled }]" :aria-disabled="disabled || undefined">
    <span class="xc-avatar__body" :style="bodyStyle" :title="name" :aria-label="name">
      <img v-if="resolvedVariant === 'image'" class="xc-avatar__image" :class="{ 'xc-avatar__image--square': shape === 'square' }" :src="displaySource" :alt="name" @error="onImageError" />
      <span v-else-if="resolvedVariant === 'initial'">{{ initial }}</span>
      <svg v-else viewBox="0 0 24 24" width="50%" height="50%" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/></svg>
    </span>
    <span v-if="status" class="xc-avatar__status" :class="`xc-avatar__status--${status}`" :aria-label="status" />
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";
import avatar01 from "../../../../src/assets/avatar/avatar-01.jpg";
import avatar02 from "../../../../src/assets/avatar/avatar-02.jpg";
import avatar03 from "../../../../src/assets/avatar/avatar-03.jpg";
import avatar04 from "../../../../src/assets/avatar/avatar-04.jpg";
import avatar05 from "../../../../src/assets/avatar/avatar-05.jpg";
import avatar06 from "../../../../src/assets/avatar/avatar-06.jpg";
import avatar07 from "../../../../src/assets/avatar/avatar-07.jpg";
import avatar08 from "../../../../src/assets/avatar/avatar-08.jpg";
import avatar09 from "../../../../src/assets/avatar/avatar-09.jpg";
import avatar10 from "../../../../src/assets/avatar/avatar-10.jpg";

type AvatarSize = "sm" | "md" | "lg" | "xl";
type AvatarStatus = "online" | "busy" | "offline";
type AvatarVariant = "default" | "image" | "initial";
type AvatarShape = "circle" | "square";

const props = withDefaults(
  defineProps<{
    name: string;
    src?: string;
    fallbackKey?: string;
    variant?: AvatarVariant;
    shape?: AvatarShape;
    size?: AvatarSize;
    status?: AvatarStatus;
    disabled?: boolean;
  }>(),
  {
    size: "md",
    shape: "circle",
    disabled: false,
  },
);

const initial = computed(() => {
  const normalized = props.name.trim();
  if (!normalized) return "?";
  if (/^[\u3400-\u9fff]/.test(normalized)) return Array.from(normalized).slice(-2).join("");
  return normalized.split(/\s+/).filter(Boolean).slice(0, 2).map((word) => word[0]).join("").toUpperCase();
});
const resolvedVariant = computed<AvatarVariant>(() => props.variant ?? (props.src ? "image" : "default"));
const initialColors = ["var(--data-green-3)", "var(--data-orange-2)", "var(--data-amber-2)", "var(--data-blue-3)", "var(--data-purple-3)"];
const defaultAvatarImages = [avatar01, avatar02, avatar03, avatar04, avatar05, avatar06, avatar07, avatar08, avatar09, avatar10];
const assignedAvatar = computed(() => {
  const key = (props.fallbackKey || props.name).trim();
  const score = Array.from(key).reduce((total, character) => Math.imul(total, 31) + (character.codePointAt(0) ?? 0), 0);
  return defaultAvatarImages[(score >>> 0) % defaultAvatarImages.length];
});
const displaySource = computed(() => resolvedVariant.value === "image" && props.src ? props.src : assignedAvatar.value);
function onImageError(event: Event) {
  const image = event.currentTarget as HTMLImageElement;
  if (image.src !== assignedAvatar.value) image.src = assignedAvatar.value;
}
const bodyStyle = computed(() => {
  if (resolvedVariant.value !== "initial") return undefined;
  const score = Array.from(props.name.trim()).reduce((total, character) => total + (character.codePointAt(0) ?? 0), 0);
  return { backgroundColor: initialColors[score % initialColors.length], color: "white" };
});
</script>

<style scoped>
.xc-avatar {
  position: relative;
  display: inline-flex;
  flex: 0 0 auto;
}

.xc-avatar--disabled {
  opacity: var(--disabled-opacity);
}

.xc-avatar__body {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: var(--neutral-100);
  color: var(--neutral-700);
  font-weight: 500;
}

.xc-avatar--circle .xc-avatar__body { border-radius: var(--radius-full); }
.xc-avatar--square .xc-avatar__body { border-radius: var(--radius-sm); }

.xc-avatar--sm .xc-avatar__body {
  width: 28px;
  height: 28px;
  font-size: 12px;
}

.xc-avatar--md .xc-avatar__body {
  width: 36px;
  height: 36px;
  font-size: 14px;
}

.xc-avatar--lg .xc-avatar__body {
  width: 48px;
  height: 48px;
  font-size: 16px;
}

.xc-avatar--xl .xc-avatar__body {
  width: 64px;
  height: 64px;
  font-size: 20px;
}

.xc-avatar__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.xc-avatar__image--square {
  transform: scale(1.18);
}

.xc-avatar__status {
  position: absolute;
  right: -2px;
  top: -2px;
  width: 10px;
  height: 10px;
  border: 2px solid #fff;
  border-radius: var(--radius-full);
}

.xc-avatar__status--online {
  background: var(--success-dot);
}

.xc-avatar__status--busy {
  background: var(--warning-dot);
}

.xc-avatar__status--offline {
  background: var(--neutral-400);
}
</style>
