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
type ButtonTone = "task" | "neutral" | "product" | "brand" | "danger" | "success" | "warning";
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
    tone: "task",
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
  gap: var(--button-gap);
  border: 0;
  border-radius: var(--radius-sm);
  font-weight: 400;
  line-height: var(--type-body-m-line-height);
  white-space: nowrap;
  cursor: pointer;
  transition:
    background-color var(--motion-duration-fast) var(--motion-easing-standard),
    border-color var(--motion-duration-fast) var(--motion-easing-standard),
    color var(--motion-duration-fast) var(--motion-easing-standard);
}

.xc-button:focus-visible {
  outline: var(--focus-ring-width) solid var(--focus-ring-color);
  outline-offset: var(--focus-ring-offset);
}

.xc-button:disabled {
  cursor: not-allowed;
  opacity: var(--disabled-opacity);
}

.xc-button--sm {
  height: var(--control-height-sm);
  padding: 0 var(--button-padding-x-sm);
  font-size: var(--type-body-m-size);
}

.xc-button--md {
  height: var(--control-height-md);
  padding: 0 var(--button-padding-x-md);
  font-size: var(--type-body-m-size);
}

.xc-button--lg {
  height: var(--control-height-lg);
  padding: 0 var(--button-padding-x-lg);
  font-size: var(--type-body-m-size);
}

.xc-button--xl {
  min-height: var(--control-height-xl);
  padding: 12px var(--button-padding-x-xl);
  font-size: var(--type-heading-h5-size);
  line-height: var(--type-heading-h5-line-height);
}

.xc-button--2xl {
  min-height: var(--control-height-2xl);
  padding: 14px var(--button-padding-x-2xl);
  font-size: var(--type-heading-h4-size);
  line-height: var(--type-heading-h4-line-height);
}

.xc-button--solid.xc-button--task {
  background: var(--color-action-task-default);
  color: white;
}

.xc-button--solid.xc-button--task:hover:not(:disabled) {
  background: var(--color-action-task-hover);
}

.xc-button--solid.xc-button--task:active:not(:disabled) {
  background: var(--color-action-task-active);
}

/* 兼容旧调用：neutral + solid 在一个迁移周期内保持原黑色外观。 */
.xc-button--solid.xc-button--neutral {
  background: var(--neutral-900);
  color: white;
}

.xc-button--solid.xc-button--neutral:hover:not(:disabled) {
  background: var(--neutral-800);
}

.xc-button--solid.xc-button--product {
  background: var(--product-blue-500);
  color: white;
}

.xc-button--solid.xc-button--product:hover:not(:disabled) {
  background: var(--product-blue-600);
}

.xc-button--solid.xc-button--brand {
  background: var(--brand-600);
  color: white;
}

.xc-button--solid.xc-button--brand:hover:not(:disabled) {
  background: var(--brand-700);
}

.xc-button--solid.xc-button--danger {
  background: var(--error-solid);
  color: white;
}

.xc-button--solid.xc-button--danger:hover:not(:disabled) {
  background: var(--error-solid-hover);
}

.xc-button--solid.xc-button--danger:active:not(:disabled) {
  background: var(--error-solid-active);
}

.xc-button--solid.xc-button--success {
  background: var(--success-solid);
  color: white;
}

.xc-button--solid.xc-button--success:hover:not(:disabled) {
  background: var(--success-solid-hover);
}

.xc-button--solid.xc-button--success:active:not(:disabled) {
  background: var(--success-solid-active);
}

.xc-button--solid.xc-button--warning {
  background: var(--warning-solid);
  color: white;
}

.xc-button--solid.xc-button--warning:hover:not(:disabled) {
  background: var(--warning-solid-hover);
}

.xc-button--solid.xc-button--warning:active:not(:disabled) {
  background: var(--warning-solid-active);
}

.xc-button--outline {
  border: 1px solid currentColor;
  background: white;
}

.xc-button--outline.xc-button--neutral,
.xc-button--text.xc-button--neutral {
  color: var(--neutral-900);
}

.xc-button--outline.xc-button--task,
.xc-button--text.xc-button--task {
  color: var(--color-action-task-default);
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

.xc-button--outline.xc-button--success,
.xc-button--text.xc-button--success {
  color: var(--success-text);
}

.xc-button--outline.xc-button--warning,
.xc-button--text.xc-button--warning {
  color: var(--warning-text);
}

.xc-button--outline.xc-button--neutral:hover:not(:disabled),
.xc-button--text.xc-button--neutral:hover:not(:disabled) {
  background: var(--neutral-50);
}

.xc-button--outline.xc-button--task:hover:not(:disabled),
.xc-button--text.xc-button--task:hover:not(:disabled) {
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

.xc-button--outline.xc-button--success:hover:not(:disabled),
.xc-button--text.xc-button--success:hover:not(:disabled) {
  background: var(--success-bg);
}

.xc-button--outline.xc-button--warning:hover:not(:disabled),
.xc-button--text.xc-button--warning:hover:not(:disabled) {
  background: var(--warning-bg);
}

.xc-button--ghost.xc-button--neutral {
  background: var(--neutral-100);
  color: var(--neutral-900);
}

.xc-button--ghost.xc-button--task {
  background: var(--neutral-100);
  color: var(--color-action-task-default);
}

.xc-button--ghost.xc-button--task:hover:not(:disabled) {
  background: var(--neutral-200);
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

.xc-button--ghost.xc-button--success {
  background: var(--success-bg);
  color: var(--success-text);
}

.xc-button--ghost.xc-button--success:hover:not(:disabled) {
  background: var(--success-tag);
}

.xc-button--ghost.xc-button--warning {
  background: var(--warning-bg);
  color: var(--warning-text);
}

.xc-button--ghost.xc-button--warning:hover:not(:disabled) {
  background: var(--warning-tag);
}

.xc-button--text {
  background: transparent;
}

.xc-button__spinner {
  width: var(--icon-size-sm);
  height: var(--icon-size-sm);
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 999px;
  animation: xc-button-spin var(--motion-duration-slow) linear infinite;
}

@keyframes xc-button-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
