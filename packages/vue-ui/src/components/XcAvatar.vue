<template>
  <span class="xc-avatar" :class="`xc-avatar--${size}`">
    <span class="xc-avatar__body" :title="name" :aria-label="name">
      <img v-if="src" class="xc-avatar__image" :src="src" :alt="name" />
      <span v-else>{{ initial }}</span>
    </span>
    <span v-if="status" class="xc-avatar__status" :class="`xc-avatar__status--${status}`" :aria-label="status" />
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";

type AvatarSize = "sm" | "md" | "lg" | "xl";
type AvatarStatus = "online" | "busy" | "offline";

const props = withDefaults(
  defineProps<{
    name: string;
    src?: string;
    size?: AvatarSize;
    status?: AvatarStatus;
  }>(),
  {
    size: "md",
  },
);

const initial = computed(() => props.name.trim().slice(0, 1).toUpperCase());
</script>

<style scoped>
.xc-avatar {
  position: relative;
  display: inline-flex;
  flex: 0 0 auto;
}

.xc-avatar__body {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: var(--radius-sm);
  background: var(--neutral-100);
  color: var(--neutral-700);
  font-weight: 500;
}

.xc-avatar--sm .xc-avatar__body {
  width: 28px;
  height: 28px;
  font-size: 12px;
}

.xc-avatar--md .xc-avatar__body {
  width: 36px;
  height: 36px;
  font-size: 14px;
}

.xc-avatar--lg .xc-avatar__body {
  width: 48px;
  height: 48px;
  font-size: 16px;
}

.xc-avatar--xl .xc-avatar__body {
  width: 64px;
  height: 64px;
  font-size: 20px;
}

.xc-avatar__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.xc-avatar__status {
  position: absolute;
  right: -2px;
  bottom: -2px;
  width: 10px;
  height: 10px;
  border: 2px solid #fff;
  border-radius: var(--radius-full);
}

.xc-avatar__status--online {
  background: var(--success-text);
}

.xc-avatar__status--busy {
  background: var(--warning-text);
}

.xc-avatar__status--offline {
  background: var(--neutral-400);
}
</style>
