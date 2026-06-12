<template>
  <span class="xc-icon" :class="[`xc-icon--${tone}`, `xc-icon--${size}`, { 'xc-icon--decorative': decorative }]" :aria-label="label" :aria-hidden="!label">
    <slot>
      <span class="xc-icon__mark" />
    </slot>
  </span>
</template>

<script setup lang="ts">
type IconTone = "neutral" | "muted" | "product" | "brand" | "danger" | "warning" | "success";
type IconSize = 12 | 16 | 20 | 24 | 32 | 48;

withDefaults(
  defineProps<{
    size?: IconSize;
    tone?: IconTone;
    decorative?: boolean;
    label?: string;
  }>(),
  {
    size: 20,
    tone: "neutral",
    decorative: false,
  },
);
</script>

<style scoped>
.xc-icon {
  display: inline-flex;
  width: 1em;
  height: 1em;
  align-items: center;
  justify-content: center;
  color: var(--neutral-900);
  line-height: 1;
}

.xc-icon--16 { font-size: 16px; }
.xc-icon--20 { font-size: 20px; }
.xc-icon--24 { font-size: 24px; }
.xc-icon--32 { font-size: 32px; }
.xc-icon--12 { font-size: 12px; }
.xc-icon--48 { font-size: 48px; }

.xc-icon--muted { color: var(--neutral-500); }
.xc-icon--product { color: var(--product-blue-500); }
.xc-icon--brand { color: var(--brand-600); }
.xc-icon--danger { color: var(--error-text); }
.xc-icon--warning { color: var(--warning-text); }
.xc-icon--success { color: var(--success-text); }

.xc-icon__mark {
  display: block;
  width: 70%;
  height: 70%;
  border: 1.5px solid currentColor;
  border-radius: var(--radius-sm);
}

.xc-icon--decorative .xc-icon__mark {
  position: relative;
}

.xc-icon--decorative .xc-icon__mark::after {
  position: absolute;
  right: -2px;
  top: 50%;
  width: 5px;
  height: 2px;
  background: var(--brand-600);
  content: "";
}
</style>
