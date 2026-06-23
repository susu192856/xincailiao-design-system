# 导航与组织组件

组件：Menu、Tabs、Breadcrumb、Collapse、Tree、Transfer。

- Menu 负责系统或页面级导航。
- Tabs 负责同一区域内的平级内容切换。
- Breadcrumb 表达当前位置，不替代返回按钮。
- Collapse 收纳次级信息，不隐藏主流程关键字段。
- Tree 用于层级导航或选择；选中与勾选必须分开表达。
- Transfer 用于两个集合间移动数据，不用于简单多选。

## 响应式

- 窄屏侧栏转为抽屉。
- Tabs 允许横向滚动，不压缩文字。
- Breadcrumb 折叠中间层级。
- Transfer 在窄屏改为上下结构。
- Tree 保留层级缩进，但限制深度和长标签。

## 可访问性

- Tabs 支持方向键和明确 tab/tabpanel 关系。
- Collapse 标题使用 button，并表达 expanded 状态。
- Menu 和 Tree 提供可见焦点与键盘选择。

