<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    open: boolean;
    title: string;
    description?: string;
    placement?: "left" | "right";
    size?: "sm" | "md" | "lg" | "xl";
    closeable?: boolean;
    maskClosable?: boolean;
  }>(),
  {
    placement: "right",
    size: "md",
    closeable: true,
    maskClosable: true,
  },
);

const emit = defineEmits<{
  close: [];
}>();

const sizeMap = {
  sm: "400px",
  md: "480px",
  lg: "640px",
  xl: "800px",
};

function handleMaskClick(event: MouseEvent) {
  if (props.maskClosable && event.target === event.currentTarget) {
    emit("close");
  }
}
</script>

<template>
  <div v-if="open" class="xc-drawer" :class="`xc-drawer--${placement}`" @mousedown="handleMaskClick">
    <section class="xc-drawer__panel" :style="{ width: sizeMap[size] }" role="dialog" aria-modal="true">
      <header class="xc-drawer__header">
        <h2 class="xc-drawer__title">{{ title }}</h2>
        <button v-if="closeable" class="xc-drawer__close" type="button" aria-label="关闭" @click="emit('close')">
          ×
        </button>
      </header>
      <div class="xc-drawer__body" data-drawer-scroll-region>
        <p v-if="description" class="xc-drawer__description">{{ description }}</p>
        <slot />
      </div>
      <footer v-if="$slots.footer" class="xc-drawer__footer">
        <slot name="footer" />
      </footer>
    </section>
  </div>
</template>

<style scoped>
.xc-drawer {
  position: fixed;
  inset: 0;
  z-index: var(--z-modal);
  display: flex;
  background: rgb(0 0 0 / 30%);
}

.xc-drawer--right {
  justify-content: flex-end;
}

.xc-drawer--left {
  justify-content: flex-start;
}

.xc-drawer__panel {
  display: flex;
  max-width: 100%;
  height: 100%;
  flex-direction: column;
  border-right: 1px solid var(--neutral-200);
  border-left: 1px solid var(--neutral-200);
  background: #fff;
}

@media (min-width: 640px) {
  .xc-drawer__panel {
    max-width: calc(100vw - 48px);
  }
}

.xc-drawer__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 56px;
  flex: none;
  padding: 12px 24px;
  background: var(--neutral-50);
}

.xc-drawer__title {
  margin: 0;
  color: var(--neutral-900);
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
}

.xc-drawer__description {
  margin: 0 0 20px;
  color: var(--neutral-600);
  font-size: 14px;
  line-height: 24px;
}

.xc-drawer__close {
  display: flex;
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--neutral-600);
  cursor: pointer;
}

.xc-drawer__close:hover {
  background: var(--neutral-100);
  color: var(--neutral-900);
}

.xc-drawer__body {
  min-height: 0;
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}

.xc-drawer__footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  border-top: 1px solid var(--neutral-200);
  min-height: 54px;
  flex: none;
  padding: 11px 28px;
}
</style>
