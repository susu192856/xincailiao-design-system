<template>
  <span class="xc-popover" :class="{ 'xc-popover--open': open }">
    <slot />
    <span class="xc-popover__panel" :class="`xc-popover__panel--${placement}`" role="dialog">
      <span class="xc-popover__arrow" aria-hidden="true" />
      <span v-if="title" class="xc-popover__title">{{ title }}</span>
      <span class="xc-popover__content">{{ content }}</span>
      <span v-if="$slots.footer" class="xc-popover__footer">
        <slot name="footer" />
      </span>
    </span>
  </span>
</template>

<script setup lang="ts">
type PopoverPlacement = "top" | "right" | "bottom" | "left";

withDefaults(
  defineProps<{
    title?: string;
    content: string;
    placement?: PopoverPlacement;
    open?: boolean;
  }>(),
  {
    placement: "bottom",
    open: false,
  },
);
</script>

<style scoped>
.xc-popover {
  position: relative;
  display: inline-flex;
}

.xc-popover__panel {
  position: absolute;
  z-index: var(--z-tooltip);
  width: 288px;
  border: 1px solid var(--neutral-200);
  border-radius: var(--radius-sm);
  background: #fff;
  box-shadow: var(--shadow-lg);
  opacity: 0;
  padding: 16px;
  pointer-events: none;
  text-align: left;
  transition: opacity 0.15s ease;
}

.xc-popover:hover .xc-popover__panel,
.xc-popover:focus-within .xc-popover__panel,
.xc-popover--open .xc-popover__panel {
  opacity: 1;
  pointer-events: auto;
}

.xc-popover__title {
  display: block;
  color: var(--neutral-900);
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
}

.xc-popover__content {
  display: block;
  color: var(--neutral-600);
  font-size: 14px;
  line-height: 24px;
  margin-top: 8px;
}

.xc-popover__footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 14px;
  border-top: 1px solid var(--neutral-200);
  padding-top: 12px;
}

.xc-popover__panel--top {
  bottom: 100%;
  left: 50%;
  margin-bottom: 12px;
  transform: translateX(-50%);
}

.xc-popover__panel--right {
  left: 100%;
  top: 50%;
  margin-left: 12px;
  transform: translateY(-50%);
}

.xc-popover__panel--bottom {
  left: 50%;
  top: 100%;
  margin-top: 12px;
  transform: translateX(-50%);
}

.xc-popover__panel--left {
  right: 100%;
  top: 50%;
  margin-right: 12px;
  transform: translateY(-50%);
}

.xc-popover__arrow {
  position: absolute;
  width: 10px;
  height: 10px;
  border: 1px solid var(--neutral-200);
  background: #fff;
  transform: rotate(45deg);
}

.xc-popover__panel--top .xc-popover__arrow {
  left: 50%;
  top: 100%;
  transform: translate(-50%, -50%) rotate(45deg);
}

.xc-popover__panel--right .xc-popover__arrow {
  right: 100%;
  top: 50%;
  transform: translate(50%, -50%) rotate(45deg);
}

.xc-popover__panel--bottom .xc-popover__arrow {
  bottom: 100%;
  left: 50%;
  transform: translate(-50%, 50%) rotate(45deg);
}

.xc-popover__panel--left .xc-popover__arrow {
  left: 100%;
  top: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
}
</style>
