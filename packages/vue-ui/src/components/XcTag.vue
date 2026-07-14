<template>
  <span class="xc-tag" :class="tagClasses" :aria-disabled="disabled || undefined">
    <span v-if="dot" class="xc-tag__dot" :style="{ backgroundColor: dotColor }" aria-hidden="true" />
    <slot v-else name="icon" />
    <span class="xc-tag__label"><slot /></span>
    <button v-if="closable && !dot" class="xc-tag__close" type="button" :disabled="disabled" aria-label="移除标签" @click.stop="emit('close')">×</button>
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";

type TagAppearance = "soft" | "outline" | "solid";
type TagTone = "neutral" | "brand" | "product" | "success" | "warning" | "danger" | "error" | "info" | "amber" | "orange" | "pink" | "magenta" | "purple" | "indigo" | "blue" | "green";
type LegacyTagVariant = Exclude<TagTone, "danger">;
type TagSize = "sm" | "md";

const props = withDefaults(
  defineProps<{
    variant?: TagAppearance | LegacyTagVariant;
    tone?: TagTone;
    size?: TagSize;
    disabled?: boolean;
    closable?: boolean;
    dot?: boolean;
  }>(),
  {
    variant: "soft",
    size: "md",
    disabled: false,
    closable: false,
    dot: false,
  },
);

const emit = defineEmits<{ close: [] }>();

const appearance = computed<TagAppearance>(() =>
  ["soft", "outline", "solid"].includes(props.variant) ? props.variant as TagAppearance : "soft",
);
const resolvedTone = computed<TagTone>(() =>
  props.tone ?? (["soft", "outline", "solid"].includes(props.variant) ? "neutral" : props.variant as LegacyTagVariant),
);
const categoryTones: TagTone[] = ["amber", "orange", "pink", "magenta", "purple", "indigo", "blue", "green"];
const effectiveAppearance = computed<TagAppearance>(() => categoryTones.includes(resolvedTone.value) ? "soft" : appearance.value);
const dotColors: Record<TagTone, string> = {
  neutral: "var(--neutral-400)", brand: "var(--brand-600)", product: "var(--product-blue-500)",
  success: "var(--success-dot)", warning: "var(--warning-dot)", danger: "var(--error-dot)",
  error: "var(--error-dot)", info: "var(--info-dot)", orange: "var(--category-orange-text)",
  blue: "var(--category-blue-text)", green: "var(--category-green-text)", purple: "var(--category-purple-text)",
  amber: "var(--category-amber-text)", indigo: "var(--category-indigo-text)", pink: "var(--category-pink-text)",
  magenta: "var(--category-magenta-text)",
};
const dotColor = computed(() => dotColors[resolvedTone.value]);
const tagClasses = computed(() => [
  `xc-tag--${effectiveAppearance.value}`,
  `xc-tag--tone-${resolvedTone.value}`,
  `xc-tag--${props.size}`,
  { "xc-tag--disabled": props.disabled, "xc-tag--dot": props.dot },
]);
</script>

<style scoped>
.xc-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  font-weight: 400;
  line-height: 1;
  white-space: nowrap;
  max-width: 100%;
}

.xc-tag__label { min-width: 0; overflow: hidden; text-overflow: ellipsis; }
.xc-tag--disabled { opacity: 0.5; }
.xc-tag--dot { height: 20px; padding: 0; border-color: transparent; background: transparent; font-size: 14px; }
.xc-tag__dot { width: 6px; height: 6px; flex: 0 0 auto; border-radius: 50%; }
.xc-tag__close { position: relative; display: inline-flex; flex: 0 0 auto; align-items: center; justify-content: center; border: 0; background: transparent; color: currentColor; cursor: pointer; }
.xc-tag__close::after { position: absolute; inset: 0; content: ""; }
.xc-tag--sm .xc-tag__close { width: 16px; height: 16px; margin-right: -6px; }
.xc-tag--md .xc-tag__close { width: 20px; height: 20px; margin-right: -8px; }
.xc-tag__close:focus-visible { outline: 2px solid var(--neutral-900); outline-offset: 1px; }
.xc-tag__close:disabled { cursor: not-allowed; }
@media (max-width: 767px) { .xc-tag__close::after { top: 50%; left: 50%; width: 44px; height: 44px; transform: translate(-50%, -50%); } }

.xc-tag--sm {
  height: 22px;
  padding: 0 8px;
  font-size: 12px;
}

.xc-tag--md {
  height: 26px;
  padding: 0 10px;
  font-size: 13px;
}

.xc-tag--tone-neutral {
  border-color: var(--neutral-200);
  background: var(--neutral-50);
  color: var(--neutral-700);
}

.xc-tag--tone-brand {
  border-color: var(--brand-200);
  background: var(--brand-50);
  color: var(--brand-700);
}

.xc-tag--tone-product {
  border-color: var(--product-blue-200);
  background: var(--product-blue-50);
  color: var(--product-blue-700);
}

.xc-tag--tone-success {
  border-color: var(--success-tag);
  background: var(--success-bg);
  color: var(--success-text);
}

.xc-tag--tone-warning {
  border-color: var(--warning-tag);
  background: var(--warning-bg);
  color: var(--warning-text);
}

.xc-tag--tone-danger,
.xc-tag--tone-error {
  border-color: var(--error-tag);
  background: var(--error-bg);
  color: var(--error-text);
}

.xc-tag--tone-info {
  border-color: var(--info-border);
  background: var(--info-bg);
  color: var(--info-text);
}

.xc-tag--tone-orange { border-color: var(--category-orange-border); background: var(--category-orange-bg); color: var(--category-orange-text); }
.xc-tag--tone-blue { border-color: var(--category-blue-border); background: var(--category-blue-bg); color: var(--category-blue-text); }
.xc-tag--tone-green { border-color: var(--category-green-border); background: var(--category-green-bg); color: var(--category-green-text); }
.xc-tag--tone-pink { border-color: var(--category-pink-border); background: var(--category-pink-bg); color: var(--category-pink-text); }
.xc-tag--tone-magenta { border-color: var(--category-magenta-border); background: var(--category-magenta-bg); color: var(--category-magenta-text); }
.xc-tag--tone-purple { border-color: var(--category-purple-border); background: var(--category-purple-bg); color: var(--category-purple-text); }
.xc-tag--tone-amber { border-color: var(--category-amber-border); background: var(--category-amber-bg); color: var(--category-amber-text); }
.xc-tag--tone-indigo { border-color: var(--category-indigo-border); background: var(--category-indigo-bg); color: var(--category-indigo-text); }

.xc-tag--outline {
  background: #fff;
}

.xc-tag--solid {
  color: #fff;
}

.xc-tag--solid.xc-tag--tone-neutral { border-color: var(--neutral-900); background: var(--neutral-900); }
.xc-tag--solid.xc-tag--tone-brand { border-color: var(--brand-600); background: var(--brand-600); }
.xc-tag--solid.xc-tag--tone-product { border-color: var(--product-blue-500); background: var(--product-blue-500); }
.xc-tag--solid.xc-tag--tone-success { border-color: var(--success-text); background: var(--success-text); }
.xc-tag--solid.xc-tag--tone-warning { border-color: var(--warning-text); background: var(--warning-text); }
.xc-tag--solid.xc-tag--tone-danger,
.xc-tag--solid.xc-tag--tone-error { border-color: var(--error-text); background: var(--error-text); }
.xc-tag--solid.xc-tag--tone-info { border-color: var(--info-text); background: var(--info-text); }
.xc-tag--solid.xc-tag--tone-orange { border-color: var(--category-orange-text); background: var(--category-orange-text); }
.xc-tag--solid.xc-tag--tone-blue { border-color: var(--category-blue-text); background: var(--category-blue-text); }
.xc-tag--solid.xc-tag--tone-green { border-color: var(--category-green-text); background: var(--category-green-text); }
.xc-tag--solid.xc-tag--tone-pink { border-color: var(--category-pink-text); background: var(--category-pink-text); }
.xc-tag--solid.xc-tag--tone-magenta { border-color: var(--category-magenta-text); background: var(--category-magenta-text); }
.xc-tag--solid.xc-tag--tone-purple { border-color: var(--category-purple-text); background: var(--category-purple-text); }
.xc-tag--solid.xc-tag--tone-amber { border-color: var(--category-amber-text); background: var(--category-amber-text); }
.xc-tag--solid.xc-tag--tone-indigo { border-color: var(--category-indigo-text); background: var(--category-indigo-text); }
</style>
