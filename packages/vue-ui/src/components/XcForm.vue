<template>
  <form class="xc-form" :class="[`xc-form--${layout}`, `xc-form--${density}`, `xc-form--${state}`]" @submit.prevent="$emit('submit')">
    <div v-if="title || description" class="xc-form__header">
      <h3 v-if="title" class="xc-form__title">{{ title }}</h3>
      <p v-if="description" class="xc-form__description">{{ description }}</p>
    </div>
    <div class="xc-form__body">
      <slot />
    </div>
    <div v-if="$slots.actions" class="xc-form__actions">
      <slot name="actions" />
    </div>
  </form>
</template>

<script setup lang="ts">
type FormLayout = "vertical" | "horizontal" | "inline" | "sectioned";
type FormDensity = "compact" | "regular";
type FormState = "default" | "readonly" | "disabled" | "error" | "submitting" | "permissionLocked";

withDefaults(
  defineProps<{
    title?: string;
    description?: string;
    layout?: FormLayout;
    density?: FormDensity;
    state?: FormState;
  }>(),
  {
    layout: "vertical",
    density: "regular",
    state: "default",
  },
);

defineEmits<{
  submit: [];
}>();
</script>

<style scoped>
.xc-form {
  background: #fff;
  color: var(--neutral-900);
}

.xc-form__header {
  margin-bottom: 20px;
}

.xc-form__title {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
}

.xc-form__description {
  margin: 6px 0 0;
  color: var(--neutral-600);
  font-size: 14px;
  line-height: 22px;
}

.xc-form__body {
  display: grid;
  gap: 16px;
}

.xc-form--compact .xc-form__body {
  gap: 12px;
}

.xc-form--horizontal .xc-form__body,
.xc-form--sectioned .xc-form__body {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.xc-form--inline .xc-form__body {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
}

.xc-form__actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  border-top: 1px solid var(--neutral-200);
  margin-top: 24px;
  padding-top: 16px;
}

.xc-form--disabled {
  opacity: 0.6;
  pointer-events: none;
}

.xc-form--error {
  border-left: 2px solid var(--error-text);
  padding-left: 16px;
}
</style>
