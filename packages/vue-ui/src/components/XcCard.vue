<template>
  <section class="xc-card" :class="cardClasses" :aria-disabled="disabled || undefined">
    <header v-if="$slots.header || title || description" class="xc-card__header">
      <slot name="header">
        <h3 v-if="title" class="xc-card__title">{{ title }}</h3>
        <p v-if="description" class="xc-card__description">{{ description }}</p>
      </slot>
    </header>

    <div class="xc-card__content">
      <slot />
    </div>

    <footer v-if="$slots.footer" class="xc-card__footer">
      <slot name="footer" />
    </footer>
    <div v-if="loading" class="xc-card__loading">加载中</div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";

type CardSize = "sm" | "md" | "lg";
type CardVariant = "plain" | "outlined" | "muted";
type CardStatus = "default" | "product" | "brand" | "success" | "warning" | "error";

const props = withDefaults(
  defineProps<{
    title?: string;
    description?: string;
    size?: CardSize;
    /** @deprecated Use size. */
    padding?: CardSize;
    variant?: CardVariant;
    status?: CardStatus;
    interactive?: boolean;
    selected?: boolean;
    disabled?: boolean;
    loading?: boolean;
    divided?: boolean;
  }>(),
  {
    padding: "md",
    variant: "plain",
    status: "default",
    interactive: false,
    selected: false,
    disabled: false,
    loading: false,
    divided: false,
  },
);

const cardClasses = computed(() => [
  `xc-card--${props.size ?? props.padding}`,
  `xc-card--${props.variant}`,
  `xc-card--status-${props.status}`,
  {
    "xc-card--divided": props.divided,
    "xc-card--interactive": props.interactive && !props.disabled,
    "xc-card--selected": props.selected,
    "xc-card--disabled": props.disabled,
    "xc-card--loading": props.loading,
  },
]);
</script>

<style scoped>
.xc-card {
  position: relative;
  border-radius: var(--radius-sm);
  background: #fff;
  color: var(--neutral-800);
}

.xc-card--outlined {
  border: 1px solid var(--neutral-200);
}

.xc-card--muted {
  background: var(--neutral-50);
}

.xc-card--sm {
  padding: 16px;
}

.xc-card--md {
  padding: 24px;
}

.xc-card--lg {
  padding: 32px;
}

.xc-card__header {
  margin-bottom: 16px;
}

.xc-card__title {
  margin: 0;
  color: var(--neutral-900);
  font-size: 18px;
  font-weight: 600;
  line-height: 28px;
}

.xc-card__description {
  margin: 6px 0 0;
  color: var(--neutral-600);
  font-size: 14px;
  line-height: 22px;
}

.xc-card__content {
  min-width: 0;
}

.xc-card__footer {
  margin-top: 20px;
}

.xc-card--divided .xc-card__footer {
  border-top: 1px solid var(--neutral-200);
  padding-top: 16px;
}

.xc-card--status-product::before,
.xc-card--status-brand::before,
.xc-card--status-success::before,
.xc-card--status-warning::before,
.xc-card--status-error::before {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  content: "";
}

.xc-card--status-product::before { background: var(--product-blue-500); }
.xc-card--status-brand::before { background: var(--brand-600); }
.xc-card--status-success::before { background: var(--success-text); }
.xc-card--status-warning::before { background: var(--warning-text); }
.xc-card--status-error::before { background: var(--error-text); }

.xc-card--interactive {
  cursor: pointer;
  transition: background-color 0.16s ease;
}

.xc-card--interactive:hover {
  background: var(--neutral-50);
}

.xc-card--selected {
  box-shadow: inset 0 0 0 1px var(--neutral-900);
}

.xc-card--disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.xc-card--loading {
  overflow: hidden;
}

.xc-card__loading {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.72);
  color: var(--neutral-500);
  font-size: 14px;
}
</style>
