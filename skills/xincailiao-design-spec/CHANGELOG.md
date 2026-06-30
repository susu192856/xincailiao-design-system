# Changelog

## 0.2.3 — 2026-06-30

- Textarea 规范并入输入框页面，补齐 Input / Textarea 的构成、尺寸、状态、结构、属性和使用边界；旧路由保留跳转兼容。
- 图标设计规范收敛为单一示例，明确设计尺寸、描边、安全区和命名规则。
- 菜单、功能和状态图标统一按实际 20px 图形与 36px 展示背景呈现，并补充交互热区原则。
- 清理功能图标库中的重复或不准确条目。
- “提示”功能图标由 `Info` 调整为圆形问号 `Question`。

## 0.2.2 — 2026-06-29

- 补齐 Chart 的 Vue 3 源码、组件导出和结构化合同，32 个规范组件现均有 Vue 实现。
- Chart 新增加载播报、空数据提示、绘图区无障碍名称、明细表插槽和窄屏内部滚动规则。
- 同步网页 Markdown、Skill 合同与 Figma manifest，移除 Chart 的“spec-only”交付例外。

## 0.2.1 — 2026-06-26

- 组件范围从 29 扩展至 31：新纳入 DatePicker 和 Upload。
- 31 个组件全部补齐 figmaProperties，Figma 组件创建条件已就绪。
- figma/tokens.json 通过 npm run export 重新生成，与 tokens.css 语义色、数据色完全对齐。
- figma/sync-state.json 更新为追踪全部 31 个组件的成熟度和同步状态。
- 验证脚本更新：verify:design-system 和 verify:maturity 适配 31 组件口径。
- verify:components、verify:visual、verify:design-system、verify:maturity、verify:vue-ui 和 build 全链路通过。

## 0.2.0 — 2026-06-22

- 固定 29 个组件 + 7 个基础规范范围。
- 按基础、操作输入、数据内容、导航组织、反馈浮层路由。
- 引用结构化 Token 和组件合同资产。
- 增加移动规则、规则治理和完整输出自检。
- 统一 variant、tone、size 与交互状态语义。
- 新增 draft、review、stable 成熟度规则；Figma 只同步 stable 资产。
- Figma v2.0 成为唯一正式设计库目标。

## 0.1.0

- 初始新材道设计规范 Skill。
