<template>
  <span class="xc-tag" :class="tagClasses">
    <slot name="icon" />
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";

type TagAppearance = "soft" | "outline" | "solid";
type TagTone = "neutral" | "brand" | "product" | "success" | "warning" | "danger" | "error" | "info";
type LegacyTagVariant = Exclude<TagTone, "danger">;
type TagSize = "sm" | "md";

const props = withDefaults(
  defineProps<{
    variant?: TagAppearance | LegacyTagVariant;
    tone?: TagTone;
    size?: TagSize;
  }>(),
  {
    variant: "soft",
    size: "md",
  },
);

const appearance = computed<TagAppearance>(() =>
  ["soft", "outline", "solid"].includes(props.variant) ? props.variant as TagAppearance : "soft",
);
const resolvedTone = computed<TagTone>(() =>
  props.tone ?? (["soft", "outline", "solid"].includes(props.variant) ? "neutral" : props.variant as LegacyTagVariant),
);
const tagClasses = computed(() => [
  `xc-tag--${appearance.value}`,
  `xc-tag--tone-${resolvedTone.value}`,
  `xc-tag--${props.size}`,
]);
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

.xc-tag--tone-neutral {
  border-color: var(--neutral-200);
  background: var(--neutral-50);
  color: var(--neutral-700);
}

.xc-tag--tone-brand {
  border-color: var(--brand-200);
  background: var(--brand-50);
  color: var(--brand-700);
}

.xc-tag--tone-product {
  border-color: var(--product-blue-200);
  background: var(--product-blue-50);
  color: var(--product-blue-700);
}

.xc-tag--tone-success {
  border-color: var(--success-tag);
  background: var(--success-bg);
  color: var(--success-text);
}

.xc-tag--tone-warning {
  border-color: var(--warning-tag);
  background: var(--warning-bg);
  color: var(--warning-text);
}

.xc-tag--tone-danger,
.xc-tag--tone-error {
  border-color: var(--error-tag);
  background: var(--error-bg);
  color: var(--error-text);
}

.xc-tag--tone-info {
  border-color: var(--info-border);
  background: var(--info-bg);
  color: var(--info-text);
}

.xc-tag--outline {
  background: #fff;
}

.xc-tag--solid {
  color: #fff;
}

.xc-tag--solid.xc-tag--tone-neutral { border-color: var(--neutral-900); background: var(--neutral-900); }
.xc-tag--solid.xc-tag--tone-brand { border-color: var(--brand-600); background: var(--brand-600); }
.xc-tag--solid.xc-tag--tone-product { border-color: var(--product-blue-500); background: var(--product-blue-500); }
.xc-tag--solid.xc-tag--tone-success { border-color: var(--success-text); background: var(--success-text); }
.xc-tag--solid.xc-tag--tone-warning { border-color: var(--warning-text); background: var(--warning-text); }
.xc-tag--solid.xc-tag--tone-danger,
.xc-tag--solid.xc-tag--tone-error { border-color: var(--error-text); background: var(--error-text); }
.xc-tag--solid.xc-tag--tone-info { border-color: var(--info-text); background: var(--info-text); }
</style>
