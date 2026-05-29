<template>
  <section class="xc-card" :class="cardClasses">
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
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";

type CardPadding = "sm" | "md" | "lg";

const props = withDefaults(
  defineProps<{
    title?: string;
    description?: string;
    padding?: CardPadding;
    divided?: boolean;
  }>(),
  {
    padding: "md",
    divided: false,
  },
);

const cardClasses = computed(() => [
  `xc-card--${props.padding}`,
  {
    "xc-card--divided": props.divided,
  },
]);
</script>

<style scoped>
.xc-card {
  border-radius: var(--radius-sm);
  background: #fff;
  color: var(--neutral-800);
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
</style>
