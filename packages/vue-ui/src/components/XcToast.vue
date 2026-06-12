<template>
  <div class="xc-toast" :class="`xc-toast--${tone}`" role="status">
    <span class="xc-toast__mark" aria-hidden="true" />
    <div class="xc-toast__content">
      <p class="xc-toast__title">{{ title }}</p>
      <p v-if="description" class="xc-toast__description">{{ description }}</p>
    </div>
    <button v-if="closable" class="xc-toast__close" type="button" aria-label="关闭" @click="$emit('close')">×</button>
  </div>
</template>

<script setup lang="ts">
type ToastTone = "success" | "error" | "warning" | "info" | "loading";

withDefaults(
  defineProps<{
    tone?: ToastTone;
    title: string;
    description?: string;
    closable?: boolean;
  }>(),
  {
    tone: "info",
    closable: true,
  },
);

defineEmits<{
  close: [];
}>();
</script>

<style scoped>
.xc-toast {
  display: flex;
  width: min(100%, 360px);
  align-items: flex-start;
  gap: 10px;
  border: 1px solid var(--neutral-200);
  border-radius: var(--radius-sm);
  background: #fff;
  box-shadow: var(--shadow-lg);
  padding: 12px 14px;
  color: var(--neutral-900);
  font-size: 14px;
  line-height: 22px;
}

.xc-toast__mark {
  width: 8px;
  height: 8px;
  flex: 0 0 auto;
  margin-top: 7px;
  border-radius: var(--radius-full);
  background: var(--info-text);
}

.xc-toast--success .xc-toast__mark {
  background: var(--success-text);
}

.xc-toast--error .xc-toast__mark {
  background: var(--error-text);
}

.xc-toast--warning .xc-toast__mark {
  background: var(--warning-text);
}

.xc-toast--loading .xc-toast__mark {
  border: 2px solid var(--product-blue-200);
  border-top-color: var(--product-blue-500);
  background: transparent;
  animation: xc-toast-spin 0.7s linear infinite;
}

.xc-toast__content {
  flex: 1;
  min-width: 0;
}

.xc-toast__title,
.xc-toast__description {
  margin: 0;
}

.xc-toast__title {
  font-weight: 500;
}

.xc-toast__description {
  margin-top: 2px;
  color: var(--neutral-600);
  font-size: 13px;
  line-height: 20px;
}

.xc-toast__close {
  width: 22px;
  height: 22px;
  border: 0;
  background: transparent;
  color: var(--neutral-500);
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
}

@keyframes xc-toast-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
