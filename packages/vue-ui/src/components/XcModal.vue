<template>
  <Teleport to="body">
    <div v-if="open" class="xc-modal" role="presentation">
      <button class="xc-modal__mask" type="button" aria-label="关闭弹窗" @click="handleMaskClick" />
      <section class="xc-modal__panel" :class="`xc-modal__panel--${size}`" role="dialog" aria-modal="true">
        <header class="xc-modal__header">
          <div>
            <h2 v-if="title" class="xc-modal__title">{{ title }}</h2>
            <p v-if="description" class="xc-modal__description">{{ description }}</p>
          </div>
          <button v-if="closable" class="xc-modal__close" type="button" aria-label="关闭" @click="$emit('close')">×</button>
        </header>
        <div class="xc-modal__body">
          <slot />
        </div>
        <footer v-if="$slots.footer" class="xc-modal__footer">
          <slot name="footer" />
        </footer>
      </section>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
type ModalSize = "sm" | "md" | "lg" | "xl";

const props = withDefaults(
  defineProps<{
    open?: boolean;
    title?: string;
    description?: string;
    size?: ModalSize;
    closable?: boolean;
    closeOnMask?: boolean;
  }>(),
  {
    open: false,
    size: "md",
    closable: true,
    closeOnMask: true,
  },
);

const emit = defineEmits<{
  close: [];
}>();

function handleMaskClick() {
  if (props.closeOnMask) emit("close");
}
</script>

<style scoped>
.xc-modal {
  position: fixed;
  inset: 0;
  z-index: var(--z-modal);
  display: grid;
  place-items: center;
  padding: 24px;
}

.xc-modal__mask {
  position: absolute;
  inset: 0;
  border: 0;
  background: rgb(26 29 33 / 48%);
}

.xc-modal__panel {
  position: relative;
  z-index: 1;
  width: min(100%, 520px);
  border: 1px solid var(--neutral-200);
  border-radius: var(--radius-sm);
  background: #fff;
  box-shadow: var(--shadow-xl);
}

.xc-modal__panel--sm {
  width: min(100%, 400px);
}

.xc-modal__panel--lg {
  width: min(100%, 720px);
}

.xc-modal__panel--xl {
  width: min(100%, 960px);
}

.xc-modal__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  padding: 24px 24px 16px;
}

.xc-modal__title {
  margin: 0;
  color: var(--neutral-900);
  font-size: 18px;
  font-weight: 600;
  line-height: 26px;
}

.xc-modal__description {
  margin: 6px 0 0;
  color: var(--neutral-600);
  font-size: 14px;
  line-height: 22px;
}

.xc-modal__close {
  display: inline-flex;
  width: 28px;
  height: 28px;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--neutral-500);
  cursor: pointer;
  font-size: 22px;
  line-height: 1;
}

.xc-modal__close:hover {
  background: var(--neutral-100);
  color: var(--neutral-900);
}

.xc-modal__body {
  padding: 0 24px 24px;
  color: var(--neutral-800);
  font-size: 14px;
  line-height: 22px;
}

.xc-modal__footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  border-top: 1px solid var(--neutral-200);
  padding: 16px 24px;
}
</style>
