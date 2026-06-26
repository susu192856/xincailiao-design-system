# Changelog

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
