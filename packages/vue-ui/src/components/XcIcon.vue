<template>
  <span
    class="xc-icon"
    :class="[`xc-icon--${tone}`, `xc-icon--${size}`, { 'xc-icon--disabled': disabled }]"
    :role="!decorative && label ? 'img' : undefined"
    :aria-label="!decorative ? label : undefined"
    :aria-hidden="decorative || !label ? true : undefined"
    :data-weight="weight"
  >
    <slot>
      <span class="xc-icon__mark" />
    </slot>
    <span v-if="redMark" class="xc-icon__red-mark" aria-hidden="true" />
  </span>
</template>

<script setup lang="ts">
type IconTone = "neutral" | "muted" | "product" | "brand" | "danger" | "warning" | "success";
type IconSize = 12 | 16 | 20 | 24 | 32 | 48;

withDefaults(
  defineProps<{
    size?: IconSize;
    tone?: IconTone;
    weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
    decorative?: boolean;
    disabled?: boolean;
    label?: string;
    redMark?: boolean;
  }>(),
  {
    size: 20,
    tone: "neutral",
    weight: "regular",
    decorative: false,
    disabled: false,
    redMark: false,
  },
);
</script>

<style scoped>
.xc-icon {
  display: inline-flex;
  width: 1em;
  height: 1em;
  align-items: center;
  justify-content: center;
  color: var(--neutral-900);
  line-height: 1;
}

.xc-icon--12 { width: var(--icon-size-xs); height: var(--icon-size-xs); font-size: var(--icon-size-xs); }
.xc-icon--16 { width: var(--icon-size-sm); height: var(--icon-size-sm); font-size: var(--icon-size-sm); }
.xc-icon--20 { width: var(--icon-size-md); height: var(--icon-size-md); font-size: var(--icon-size-md); }
.xc-icon--24 { width: var(--icon-size-lg); height: var(--icon-size-lg); font-size: var(--icon-size-lg); }
.xc-icon--32 { width: var(--icon-size-xl); height: var(--icon-size-xl); font-size: var(--icon-size-xl); }
.xc-icon--48 { width: var(--control-height-xl); height: var(--control-height-xl); font-size: var(--control-height-xl); }

.xc-icon--muted { color: var(--neutral-500); }
.xc-icon--product { color: var(--product-blue-500); }
.xc-icon--brand { color: var(--brand-600); }
.xc-icon--danger { color: var(--error-text); }
.xc-icon--warning { color: var(--warning-text); }
.xc-icon--success { color: var(--success-text); }

.xc-icon__mark {
  display: block;
  width: 70%;
  height: 70%;
  border: 1.5px solid currentColor;
  border-radius: var(--radius-sm);
}

.xc-icon--disabled {
  cursor: not-allowed;
  opacity: var(--disabled-opacity);
}

.xc-icon__red-mark {
  position: absolute;
  right: 0;
  top: 50%;
  width: 6px;
  height: 2px;
  background: var(--brand-600);
  content: "";
  transform: translateY(-50%);
}
</style>
