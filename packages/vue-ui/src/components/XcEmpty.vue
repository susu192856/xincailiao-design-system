<template>
  <div class="xc-empty" :class="`xc-empty--${variant}`">
    <div class="xc-empty__icon" aria-hidden="true" />
    <h3 class="xc-empty__title">{{ title }}</h3>
    <p v-if="description" class="xc-empty__description">{{ description }}</p>
    <div v-if="$slots.action" class="xc-empty__action">
      <slot name="action" />
    </div>
  </div>
</template>

<script setup lang="ts">
type EmptyVariant = "noData" | "noResult" | "noPermission" | "notFound" | "network" | "firstUse" | "error" | "processing" | "disabled";

withDefaults(
  defineProps<{
    variant?: EmptyVariant;
    title: string;
    description?: string;
  }>(),
  {
    variant: "noData",
  },
);
</script>

<style scoped>
.xc-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px dashed var(--neutral-200);
  background: #fff;
  padding: 40px 24px;
  text-align: center;
}

.xc-empty__icon {
  width: 32px;
  height: 32px;
  border: 1px solid currentColor;
  border-radius: var(--radius-sm);
  color: var(--neutral-400);
}

.xc-empty--firstUse .xc-empty__icon,
.xc-empty--processing .xc-empty__icon {
  color: var(--product-blue-500);
}

.xc-empty--error .xc-empty__icon {
  color: var(--error-text);
}

.xc-empty--notFound .xc-empty__icon { color: var(--error-text); }
.xc-empty--network .xc-empty__icon { color: var(--warning-text); }

.xc-empty--noPermission .xc-empty__icon {
  color: var(--warning-text);
}

.xc-empty__title {
  margin: 16px 0 0;
  color: var(--neutral-900);
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
}

.xc-empty__description {
  max-width: 360px;
  margin: 8px 0 0;
  color: var(--neutral-500);
  font-size: 14px;
  line-height: 22px;
}

.xc-empty__action {
  margin-top: 20px;
}
</style>
