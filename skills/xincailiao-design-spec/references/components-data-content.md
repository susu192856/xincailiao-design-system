# 数据与内容组件

组件：Table、Pagination、DescriptionList、Card、Tag、Empty、Image、Avatar、Badge。

## Table 组合

- 推荐组合：筛选区 → 工具栏/批量操作 → Table → Empty/Loading → Pagination。
- 文本左对齐，可比较数字右对齐，操作列右对齐。
- 列过多时横向滚动，不压缩到不可读。
- 选中行只使用一个主要视觉信号，避免背景、标签和文字同时抢色。

## 内容容器

- DescriptionList 用于详情字段和值，不手写 table 代替。
- Card 表达独立信息单元，不把整个页面切成无意义卡片。
- Empty 区分无数据、无结果、无权限、错误和首次使用。

## 标签与身份

- Tag 的 `variant` 是 soft/outline/solid，`tone` 是颜色语义。
- 分类标签与状态标签不得混为一谈。
- Avatar 必须提供名称；图片失败时回退为首字或默认身份。
- Badge 只表达数量或轻量提醒，不替代状态标签和 Toast。

## 媒体

- Image 必须定义比例、加载、失败、空图和替代文本。
- 业务图片使用 cover，图谱、证书和文件预览按内容选择 contain。

