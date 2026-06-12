# @xincailiao/vue-ui

新材道设计系统的 Vue 3 源码组件包，用于给前端项目提供可直接参考和逐步接入的组件实现。

当前包仍是源码级起点，不是已经发布到 npm 的稳定版本。组件 API 以 `variant`、`tone`、`size`、`disabled`、`loading`、`class` 为核心命名，和网页规范站保持一致。

## 当前组件

- `XcAvatar`
- `XcBadge`
- `XcBreadcrumb`
- `XcButton`
- `XcCard`
- `XcCheckbox`
- `XcCollapse`
- `XcDescriptionList`
- `XcEmpty`
- `XcForm`
- `XcIcon`
- `XcImage`
- `XcInput`
- `XcMenu`
- `XcModal`
- `XcPagination`
- `XcRadio`
- `XcSelect`
- `XcSwitch`
- `XcTag`
- `XcTabs`
- `XcTable`
- `XcTextarea`
- `XcToast`
- `XcTransfer`
- `XcTree`

## 使用方式

在同一仓库或支持 workspace/source import 的 Vue 3 项目中使用：

```ts
import {
  XcAvatar,
  XcBadge,
  XcBreadcrumb,
  XcButton,
  XcCard,
  XcCheckbox,
  XcCollapse,
  XcDescriptionList,
  XcEmpty,
  XcForm,
  XcIcon,
  XcImage,
  XcInput,
  XcMenu,
  XcModal,
  XcPagination,
  XcRadio,
  XcSelect,
  XcSwitch,
  XcTable,
  XcTabs,
  XcTag,
  XcTextarea,
  XcToast,
  XcTransfer,
  XcTree,
} from "@xincailiao/vue-ui";
import "@xincailiao/vue-ui/styles.css";
```

```vue
<template>
  <XcCard title="材料数据" description="用于承载一组相关业务内容">
    <XcInput v-model="keyword" label="搜索材料" placeholder="输入材料牌号或关键词" />
    <XcSelect v-model="category" label="数据类型" :options="categoryOptions" placeholder="请选择" />

    <div class="actions">
      <XcButton tone="neutral">确认</XcButton>
      <XcButton variant="outline" tone="product">筛选数据</XcButton>
      <XcTag variant="brand">关键节点</XcTag>
    </div>
  </XcCard>
</template>

<script setup lang="ts">
import { ref } from "vue";

const keyword = ref("");
const category = ref("");
const categoryOptions = [
  { label: "材料牌号", value: "grade" },
  { label: "性能数据", value: "property" },
  { label: "工艺参数", value: "process" },
];
</script>
```

## Token 来源

组件样式通过 `src/styles.css` 引入仓库根目录的 `src/styles/tokens.css`。后续如果要发布为独立 npm 包，应增加构建流程，把 token CSS 一起打包或复制到包内。

## 维护原则

- 先复用 `src/styles/tokens.css`，不要在组件内建立新的颜色体系。
- 组件层级和色彩语义分开：例如按钮的 `variant` 表示层级，`tone` 表示业务色彩。
- 新增组件前先确认网页规范页中的语义、状态、尺寸和 Figma 命名是否一致。
