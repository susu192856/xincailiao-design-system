<template>
  <span class="xc-tag" :class="tagClasses">
    <slot name="icon" />
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";

type TagVariant = "neutral" | "brand" | "product" | "success" | "warning" | "error";
type TagSize = "sm" | "md";

const props = withDefaults(
  defineProps<{
    variant?: TagVariant;
    size?: TagSize;
  }>(),
  {
    variant: "neutral",
    size: "md",
  },
);

const tagClasses = computed(() => [`xc-tag--${props.variant}`, `xc-tag--${props.size}`]);
</script>

<style scoped>
.xc-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  font-weight: 400;
  line-height: 1;
  white-space: nowrap;
}

.xc-tag--sm {
  height: 22px;
  padding: 0 8px;
  font-size: 12px;
}

.xc-tag--md {
  height: 26px;
  padding: 0 10px;
  font-size: 13px;
}

.xc-tag--neutral {
  border-color: var(--neutral-200);
  background: var(--neutral-50);
  color: var(--neutral-700);
}

.xc-tag--brand {
  border-color: var(--brand-200);
  background: var(--brand-50);
  color: var(--brand-700);
}

.xc-tag--product {
  border-color: var(--product-blue-200);
  background: var(--product-blue-50);
  color: var(--product-blue-700);
}

.xc-tag--success {
  border-color: var(--success-tag);
  background: var(--success-bg);
  color: var(--success-text);
}

.xc-tag--warning {
  border-color: var(--warning-tag);
  background: var(--warning-bg);
  color: var(--warning-text);
}

.xc-tag--error {
  border-color: var(--error-tag);
  background: var(--error-bg);
  color: var(--error-text);
}
</style>
