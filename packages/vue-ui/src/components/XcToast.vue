<template>
  <div class="xc-toast" :class="[`xc-toast--${tone}`, `xc-toast--${presentation}`, { 'xc-toast--with-description': description }]" :role="tone === 'error' ? 'alert' : 'status'" :data-presentation="presentation">
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
type ToastPresentation = "toast" | "notification" | "alert";

withDefaults(
  defineProps<{
    tone?: ToastTone;
    title: string;
    description?: string;
    closable?: boolean;
    presentation?: ToastPresentation;
  }>(),
  {
    tone: "info",
    closable: true,
    presentation: "toast",
  },
);

defineEmits<{
  close: [];
}>();
</script>

<style scoped>
.xc-toast {
  display: flex;
  width: fit-content;
  min-width: 220px;
  max-width: min(100%, 360px);
  align-items: flex-start;
  gap: 10px;
  border: 0;
  border-radius: 4px;
  background: #fff;
  box-shadow: var(--shadow-md);
  padding: 10px 12px;
  color: var(--neutral-900);
  font-size: 14px;
  line-height: 22px;
}

.xc-toast--notification {
  width: min(100%, 360px);
  padding: 16px;
  box-shadow: var(--shadow-lg);
}

.xc-toast--alert {
  align-items: center;
  width: 100%;
  max-width: none;
  padding: 8px 12px;
  box-shadow: none;
}

.xc-toast--toast {
  align-items: center;
}

.xc-toast--toast .xc-toast__mark,
.xc-toast--alert .xc-toast__mark {
  margin-top: 0;
}

.xc-toast--alert.xc-toast--info,
.xc-toast--alert.xc-toast--loading {
  border-color: var(--info-border);
  background: var(--info-bg);
}

.xc-toast--alert.xc-toast--success {
  border-color: var(--success-border);
  background: var(--success-bg);
}

.xc-toast--alert.xc-toast--warning {
  border-color: var(--warning-border);
  background: var(--warning-bg);
}

.xc-toast--alert.xc-toast--error {
  border-color: var(--error-border);
  background: var(--error-bg);
}

.xc-toast__mark {
  width: 8px;
  height: 8px;
  flex: 0 0 auto;
  margin-top: 3px;
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
  color: var(--neutral-900);
  font-weight: 400;
}

.xc-toast--notification .xc-toast__title,
.xc-toast--with-description .xc-toast__title {
  font-weight: 600;
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
