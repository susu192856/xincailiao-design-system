<template>
  <Teleport to="body" :disabled="inline">
    <div v-if="open" class="xc-modal" :class="{ 'xc-modal--inline': inline }" role="presentation">
      <button class="xc-modal__mask" type="button" aria-label="关闭对话框" @click="handleMaskClick" />
      <section class="xc-modal__panel" :class="[`xc-modal__panel--${size}`, { 'xc-modal__panel--decision': variant === 'decision' }]" role="dialog" :aria-modal="!inline">
        <header class="xc-modal__header">
          <span v-if="$slots.icon" class="xc-modal__icon"><slot name="icon" /></span>
          <h2 v-if="title" class="xc-modal__title">{{ title }}</h2>
          <button v-if="closable" class="xc-modal__close" type="button" aria-label="关闭" @click="$emit('close')">×</button>
        </header>
        <div class="xc-modal__body">
          <p v-if="description && variant !== 'decision'" class="xc-modal__description">{{ description }}</p>
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
type ModalVariant = "default" | "decision";

const props = withDefaults(
  defineProps<{
    open?: boolean;
    title?: string;
    description?: string;
    size?: ModalSize;
    variant?: ModalVariant;
    closable?: boolean;
    closeOnMask?: boolean;
    inline?: boolean;
  }>(),
  {
    open: false,
    size: "md",
    variant: "default",
    closable: true,
    closeOnMask: true,
    inline: false,
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

.xc-modal--inline {
  position: relative;
  min-height: 420px;
  overflow: hidden;
  background: var(--neutral-50);
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
  display: flex;
  width: min(100%, 504px);
  max-height: min(864px, calc(100dvh - 48px));
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--neutral-200);
  border-radius: var(--radius-lg);
  background: #fff;
  box-shadow: var(--shadow-xl);
}

.xc-modal__panel--sm {
  width: min(100%, 384px);
}

.xc-modal__panel--lg {
  width: min(100%, 720px);
}

.xc-modal__panel--xl {
  width: min(100%, 960px);
}

.xc-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex: none;
  padding: 12px 28px;
  background: var(--neutral-50);
}

.xc-modal__title {
  margin: 0;
  color: var(--neutral-900);
  font-size: 18px;
  font-weight: 600;
  line-height: 26px;
}

.xc-modal__icon {
  display: inline-flex;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
}

.xc-modal__description {
  margin: 0 0 20px;
  color: var(--neutral-600);
  font-size: 14px;
  line-height: 22px;
}

.xc-modal__close {
  display: inline-flex;
  width: 32px;
  height: 32px;
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
  min-height: 0;
  flex: 1;
  overflow-y: auto;
  padding: 24px 28px;
  background: #fff;
  color: var(--neutral-800);
  font-size: 14px;
  line-height: 22px;
}

.xc-modal__footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  border-top: 1px solid var(--neutral-200);
  min-height: 54px;
  flex: none;
  padding: 11px 28px;
}

.xc-modal__panel--decision .xc-modal__header {
  position: relative;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
  padding: 28px 28px 8px;
  background: #fff;
  text-align: center;
}

.xc-modal__panel--decision .xc-modal__close {
  position: absolute;
  top: 16px;
  right: 16px;
}

.xc-modal__panel--decision .xc-modal__title {
  text-align: center;
}

.xc-modal__panel--decision .xc-modal__body {
  padding: 8px 28px 20px;
  text-align: center;
}

.xc-modal__panel--decision .xc-modal__body p {
  text-wrap: balance;
}

.xc-modal__panel--decision .xc-modal__footer {
  justify-content: center;
  border-top: 0;
  padding: 0 28px 24px;
}
</style>
