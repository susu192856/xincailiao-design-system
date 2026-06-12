<template>
  <span class="xc-tooltip" :class="{ 'xc-tooltip--open': open }">
    <slot />
    <span class="xc-tooltip__bubble" :class="`xc-tooltip__bubble--${placement}`" role="tooltip">
      {{ content }}
      <span class="xc-tooltip__arrow" aria-hidden="true" />
    </span>
  </span>
</template>

<script setup lang="ts">
type TooltipPlacement = "top" | "right" | "bottom" | "left";

withDefaults(
  defineProps<{
    content: string;
    placement?: TooltipPlacement;
    open?: boolean;
  }>(),
  {
    placement: "top",
    open: false,
  },
);
</script>

<style scoped>
.xc-tooltip {
  position: relative;
  display: inline-flex;
}

.xc-tooltip__bubble {
  position: absolute;
  z-index: var(--z-tooltip);
  width: max-content;
  max-width: 240px;
  border-radius: var(--radius-sm);
  background: var(--neutral-900);
  box-shadow: var(--shadow-md);
  color: #fff;
  font-size: 12px;
  line-height: 20px;
  opacity: 0;
  padding: 6px 10px;
  pointer-events: none;
  transition: opacity 0.15s ease;
}

.xc-tooltip:hover .xc-tooltip__bubble,
.xc-tooltip:focus-within .xc-tooltip__bubble,
.xc-tooltip--open .xc-tooltip__bubble {
  opacity: 1;
}

.xc-tooltip__bubble--top {
  bottom: 100%;
  left: 50%;
  margin-bottom: 8px;
  transform: translateX(-50%);
}

.xc-tooltip__bubble--right {
  left: 100%;
  top: 50%;
  margin-left: 8px;
  transform: translateY(-50%);
}

.xc-tooltip__bubble--bottom {
  left: 50%;
  top: 100%;
  margin-top: 8px;
  transform: translateX(-50%);
}

.xc-tooltip__bubble--left {
  right: 100%;
  top: 50%;
  margin-right: 8px;
  transform: translateY(-50%);
}

.xc-tooltip__arrow {
  position: absolute;
  width: 8px;
  height: 8px;
  background: var(--neutral-900);
  transform: rotate(45deg);
}

.xc-tooltip__bubble--top .xc-tooltip__arrow {
  left: 50%;
  top: 100%;
  transform: translate(-50%, -50%) rotate(45deg);
}

.xc-tooltip__bubble--right .xc-tooltip__arrow {
  right: 100%;
  top: 50%;
  transform: translate(50%, -50%) rotate(45deg);
}

.xc-tooltip__bubble--bottom .xc-tooltip__arrow {
  bottom: 100%;
  left: 50%;
  transform: translate(-50%, 50%) rotate(45deg);
}

.xc-tooltip__bubble--left .xc-tooltip__arrow {
  left: 100%;
  top: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
}
</style>
