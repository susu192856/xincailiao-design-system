<template>
  <button
    :type="type"
    class="xc-button"
    :class="buttonClasses"
    :disabled="disabled || loading"
    :aria-busy="loading"
  >
    <span v-if="loading" class="xc-button__spinner" aria-hidden="true" />
    <slot v-else-if="iconPosition === 'left'" name="icon" />
    <span v-if="$slots.default" class="xc-button__label">
      <slot />
    </span>
    <slot v-if="!loading && iconPosition === 'right'" name="icon" />
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

type ButtonVariant = "solid" | "outline" | "ghost" | "text";
type ButtonTone = "neutral" | "product" | "brand" | "danger";
type ButtonSize = "sm" | "md" | "lg" | "xl" | "2xl";
type ButtonType = "button" | "submit" | "reset";

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariant;
    tone?: ButtonTone;
    size?: ButtonSize;
    disabled?: boolean;
    loading?: boolean;
    iconPosition?: "left" | "right";
    type?: ButtonType;
  }>(),
  {
    variant: "solid",
    tone: "neutral",
    size: "md",
    disabled: false,
    loading: false,
    iconPosition: "left",
    type: "button",
  },
);

const buttonClasses = computed(() => [
  `xc-button--${props.variant}`,
  `xc-button--${props.tone}`,
  `xc-button--${props.size}`,
  {
    "xc-button--loading": props.loading,
  },
]);
</script>

<style scoped>
.xc-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 0;
  border-radius: var(--radius-sm);
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease;
}

.xc-button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.xc-button--sm {
  height: 28px;
  padding: 0 12px;
  font-size: 14px;
}

.xc-button--md {
  height: 32px;
  padding: 0 16px;
  font-size: 14px;
}

.xc-button--lg {
  height: 36px;
  padding: 0 20px;
  font-size: 14px;
}

.xc-button--xl {
  min-height: 48px;
  padding: 12px 32px;
  font-size: 18px;
}

.xc-button--2xl {
  min-height: 56px;
  padding: 14px 40px;
  font-size: 20px;
}

.xc-button--solid.xc-button--neutral {
  background: var(--neutral-900);
  color: #fff;
}

.xc-button--solid.xc-button--neutral:hover:not(:disabled) {
  background: var(--neutral-800);
}

.xc-button--solid.xc-button--product {
  background: var(--product-blue-500);
  color: #fff;
}

.xc-button--solid.xc-button--product:hover:not(:disabled) {
  background: var(--product-blue-600);
}

.xc-button--solid.xc-button--brand {
  background: var(--brand-600);
  color: #fff;
}

.xc-button--solid.xc-button--brand:hover:not(:disabled) {
  background: var(--brand-700);
}

.xc-button--solid.xc-button--danger {
  background: var(--error-text);
  color: #fff;
}

.xc-button--solid.xc-button--danger:hover:not(:disabled) {
  background: #dc2626;
}

.xc-button--outline {
  border: 1px solid currentColor;
  background: #fff;
}

.xc-button--outline.xc-button--neutral,
.xc-button--text.xc-button--neutral {
  color: var(--neutral-900);
}

.xc-button--outline.xc-button--product,
.xc-button--text.xc-button--product {
  color: var(--product-blue-500);
}

.xc-button--outline.xc-button--brand,
.xc-button--text.xc-button--brand {
  color: var(--brand-600);
}

.xc-button--outline.xc-button--danger,
.xc-button--text.xc-button--danger {
  color: var(--error-text);
}

.xc-button--outline.xc-button--neutral:hover:not(:disabled),
.xc-button--text.xc-button--neutral:hover:not(:disabled) {
  background: var(--neutral-50);
}

.xc-button--outline.xc-button--product:hover:not(:disabled),
.xc-button--text.xc-button--product:hover:not(:disabled) {
  background: var(--product-blue-50);
}

.xc-button--outline.xc-button--brand:hover:not(:disabled),
.xc-button--text.xc-button--brand:hover:not(:disabled) {
  background: var(--brand-50);
}

.xc-button--outline.xc-button--danger:hover:not(:disabled),
.xc-button--text.xc-button--danger:hover:not(:disabled) {
  background: var(--error-bg);
}

.xc-button--ghost.xc-button--neutral {
  background: var(--neutral-100);
  color: var(--neutral-900);
}

.xc-button--ghost.xc-button--neutral:hover:not(:disabled) {
  background: var(--neutral-200);
}

.xc-button--ghost.xc-button--product {
  background: var(--product-blue-50);
  color: var(--product-blue-500);
}

.xc-button--ghost.xc-button--product:hover:not(:disabled) {
  background: var(--product-blue-100);
}

.xc-button--ghost.xc-button--brand {
  background: var(--brand-50);
  color: var(--brand-600);
}

.xc-button--ghost.xc-button--brand:hover:not(:disabled) {
  background: var(--brand-100);
}

.xc-button--ghost.xc-button--danger {
  background: var(--error-bg);
  color: var(--error-text);
}

.xc-button--ghost.xc-button--danger:hover:not(:disabled) {
  background: var(--error-tag);
}

.xc-button--text {
  background: transparent;
}

.xc-button__spinner {
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 999px;
  animation: xc-button-spin 0.7s linear infinite;
}

@keyframes xc-button-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
