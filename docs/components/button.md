# 按钮 Button

> 按钮用于触发操作。有 solid / outline / ghost / text 四种层级和 neutral / product / brand / danger 四种色彩语义。

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `variant` | `'solid' | 'outline' | 'ghost' | 'text'` | `'solid'` | 视觉层级 |
| `tone` | `'neutral' | 'product' | 'brand' | 'danger'` | `'neutral'` | 色彩语义 |
| `size` | `'sm' | 'md' | 'lg' | 'xl' | '2xl'` | `'md'` | 尺寸 |
| `disabled` | `boolean` | `false` | 禁用状态 |
| `loading` | `boolean` | `false` | 加载状态 |
| `iconPosition` | `'left' | 'right'` | `'left'` | 图标位置 |

## 使用指南

### 推荐做法

- ✅ 每个区域只放一个主按钮（solid），突出最重要操作
- ✅ 使用动词开头文案，如「提交订单」「新建项目」
- ✅ 黑色用于主行动，产品蓝用于功能，品牌红仅限官网营销

### 避免做法

- ❌ 不要在同一组中混用多种颜色的主按钮
- ❌ 不要把 product 称为「次按钮」——蓝色是业务语义，不是层级
- ❌ 不要在后台常规操作中滥用品牌红

## Vue 3 示例代码

```vue
<template>
  <button
    class="btn"
    :class="[variantClass, toneClass, sizeClass, { loading, disabled: disabled || loading }]"
    :disabled="disabled || loading"
    :type="type"
    @click="$emit('click', $event)"
  >
    <svg v-if="loading" class="spinner" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" stroke-linecap="round" opacity="0.25"/>
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    </svg>
    <slot v-if="iconPosition !== 'right'" name="icon" />
    <span v-if="$slots.default"><slot /></span>
    <slot v-if="iconPosition === 'right'" name="icon" />
  </button>
</template>

<script setup>
defineProps({
  variant: { type: String, default: 'solid' },
  tone: { type: String, default: 'neutral' },
  size: { type: String, default: 'md' },
  disabled: Boolean,
  loading: Boolean,
  iconPosition: { type: String, default: 'left' },
  type: { type: String, default: 'button' },
});
defineEmits(['click']);
</script>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: var(--radius-sm);
  font-weight: 500;
  white-space: nowrap;
  transition: all 0.15s ease;
  cursor: pointer;
  border: none;
  line-height: 1;
}
.btn.disabled { opacity: 0.5; cursor: not-allowed; }
.btn.loading { cursor: wait; }
.spinner { width: 16px; height: 16px; animation: spin 0.6s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

/* 尺寸 */
.size-sm { height: 28px; padding: 0 12px; font-size: 14px; }
.size-md { height: 32px; padding: 0 16px; font-size: 14px; }
.size-lg { height: 36px; padding: 0 20px; font-size: 14px; }

/* 类型: solid */
.variant-solid.tone-neutral { background: var(--neutral-900); color: #fff; }
.variant-solid.tone-neutral:hover { background: var(--neutral-800); }
.variant-solid.tone-product { background: var(--product-blue-500); color: #fff; }
.variant-solid.tone-product:hover { background: var(--product-blue-600); }
.variant-solid.tone-brand { background: var(--brand-600); color: #fff; }
.variant-solid.tone-brand:hover { background: var(--brand-700); }
.variant-solid.tone-danger { background: var(--error-text); color: #fff; }

/* 类型: outline */
.variant-outline {
  background: #fff;
  border: 1px solid var(--neutral-900);
  color: var(--neutral-900);
}
.variant-outline.tone-product { border-color: var(--product-blue-500); color: var(--product-blue-500); }
.variant-outline.tone-brand { border-color: var(--brand-600); color: var(--brand-600); }

/* 类型: ghost */
.variant-ghost.tone-neutral { background: var(--neutral-100); color: var(--neutral-900); }

/* 类型: text */
.variant-text.tone-neutral { background: transparent; color: var(--neutral-900); }
.variant-text.tone-text:hover { background: var(--neutral-50); }
</style>
```

## 依赖 Token

组件使用的设计变量（CSS Custom Properties）：

| Token | 来源 |
|-------|------|
| `--radius-sm` | 圆角 Token |
| `--neutral-900` | 颜色 Token |
| `--neutral-800` | 颜色 Token |
| `--neutral-700` | 颜色 Token |
| `--neutral-600` | 颜色 Token |
| `--neutral-500` | 颜色 Token |
| `--neutral-400` | 颜色 Token |
| `--neutral-300` | 颜色 Token |
| `--neutral-200` | 颜色 Token |
| `--neutral-100` | 颜色 Token |
| `--neutral-50` | 颜色 Token |
| `--product-blue-500` | 颜色 Token |
| `--product-blue-600` | 颜色 Token |
| `--product-blue-700` | 颜色 Token |
| `--brand-600` | 颜色 Token |
| `--brand-700` | 颜色 Token |
| `--brand-800` | 颜色 Token |
| `--error-text` | 语义色 |
| `--error-bg` | 语义色 |
