# 反馈与浮层组件

组件：Modal、Drawer、Tooltip、Popover、Toast。

- Tooltip 只承载短文本；带操作内容使用 Popover。
- Popover 承载轻量说明和少量快捷操作；复杂任务升级 Modal/Drawer。
- Modal 用于阻断式确认和必须聚焦的短任务。
- Drawer 用于详情、筛选、配置和短编辑；长流程进入独立页面。
- Toast 用于非阻断操作结果，不承载必须确认的信息。

## 浮层共用规则

- 使用 overlay、shadow 和 z-index Token。
- 打开后管理焦点，关闭后焦点返回触发元素。
- 支持 Escape；是否允许遮罩关闭必须明确。
- 移动端 Modal/Drawer 可全屏，但保留标题和操作区。
- Figma 必须提供静态打开态，不能只靠原型点击查看。

