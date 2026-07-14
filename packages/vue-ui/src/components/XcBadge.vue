<template>
  <span v-if="$slots.default" class="xc-badge__wrap">
    <slot />
    <span v-if="visible" class="xc-badge" :class="badgeClasses">{{ dot ? "" : displayValue }}</span>
  </span>
  <span v-else-if="visible" class="xc-badge" :class="badgeClasses">{{ dot ? "" : displayValue }}</span>
</template>

<script setup lang="ts">
import { computed } from "vue";

type BadgeTone = "neutral" | "product" | "error" | "info" | "danger" | "success" | "warning";
type BadgeSize = "sm" | "md";

const props = withDefaults(
  defineProps<{
    count?: number;
    dot?: boolean;
    max?: number;
    tone?: BadgeTone;
    size?: BadgeSize;
    showZero?: boolean;
  }>(),
  {
    dot: false,
    max: 99,
    tone: "error",
    size: "md",
    showZero: false,
  },
);

const visible = computed(() => props.dot || props.count !== 0 || props.showZero);
const displayValue = computed(() => {
  if (typeof props.count !== "number") return "";
  return props.count > props.max ? `${props.max}+` : String(props.count);
});
const badgeClasses = computed(() => [`xc-badge--${props.tone}`, `xc-badge--${props.size}`, { "xc-badge--dot": props.dot }]);
</script>

<style scoped>
.xc-badge__wrap {
  position: relative;
  display: inline-flex;
}

.xc-badge {
  display: inline-flex;
  min-width: 20px;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
  color: #fff;
  font-weight: 400;
  line-height: 1;
}

.xc-badge__wrap > .xc-badge {
  position: absolute;
  right: -8px;
  top: -8px;
}

.xc-badge--sm {
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  font-size: 10px;
}

.xc-badge--md {
  height: 20px;
  padding: 0 6px;
  font-size: 12px;
}

.xc-badge--dot {
  width: 8px;
  min-width: 8px;
  height: 8px;
  padding: 0;
}

.xc-badge--neutral { background: var(--neutral-700); }
.xc-badge--product { background: var(--product-blue-500); }
.xc-badge--error, .xc-badge--danger { background: var(--error-solid); }
.xc-badge--info { background: var(--info-dot); }
.xc-badge--success { background: var(--success-solid); }
.xc-badge--warning { background: var(--warning-solid); }
.xc-badge--dot.xc-badge--error, .xc-badge--dot.xc-badge--danger { background: var(--error-dot); }
.xc-badge--dot.xc-badge--success { background: var(--success-dot); }
.xc-badge--dot.xc-badge--warning { background: var(--warning-dot); }
</style>
