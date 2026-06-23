# 新材道组件规范框架与缺口审计

更新日期：2026-06-22

## 1. 审计结论

按规范站侧边栏的信息架构，当前规范基线为 **29 个组件 + 7 个基础规范**，合计 36 个菜单入口：

- `figma/components.manifest.json`：29 个
- `src/components/ui/`：29 个 React 组件
- `packages/vue-ui/src/components/`：29 个 Vue 组件
- `docs/components/`：29 份组件文档
- 侧栏与路由：29 个组件入口
- `npm run verify`：通过 29 个组件合同检查
- 侧栏基础规范：首页、布局、颜色、字体、间距、阴影、圆角

正确口径为：

> 29 个组件 + 7 个基础规范。

首页在严格意义上属于规范总览，但在本项目中按侧边栏的信息架构归入 7 个基础规范入口。

## 2. 每个组件必须具备的规范框架

后续 29 个组件统一采用以下结构。缺少任一核心项，均视为组件规范未完成。

| 模块 | 必须回答的问题 | 建议产物 |
|---|---|---|
| 定位 | 组件解决什么问题？何时使用？何时不用？ | 一句话定义、适用与禁用场景 |
| 来源边界 | 是业务组件、定制基础组件，还是原生框架能力？ | 组件归属和权威来源 |
| 结构 Anatomy | 由哪些区域组成？哪些必选、哪些可选？ | 标注图或结构清单 |
| 变体 Variant | 结构差异是什么？不能把颜色当结构变体 | 变体矩阵 |
| 语义 Tone | neutral、product、brand、success 等何时使用？ | 色彩语义映射 |
| 尺寸 Size | 高度、内边距、图标、字号、最小宽度是多少？ | 精确 Token/数值表 |
| 状态 State | 默认、悬停、聚焦、按下、选中、禁用、只读、错误、加载、空态是否适用？ | 状态矩阵 |
| 交互 | 鼠标、键盘、焦点、关闭、提交、异步反馈如何工作？ | 交互规则 |
| 内容 | 文案长度、截断、换行、空值、数字格式如何处理？ | 内容规则 |
| 布局与响应式 | 官网、后台、移动端如何变化？ | 场景差异与断点行为 |
| 组合 | 可以和哪些组件组合？组合顺序和间距是什么？ | 组合范式 |
| 可访问性 | 语义角色、ARIA、焦点顺序、对比度、触控尺寸是什么？ | A11y 清单 |
| Token | 使用哪些语义 Token？禁止哪些硬编码值？ | Token 引用表 |
| 示例 | 至少一个基础、一个真实业务、一个边界、一个错误示例 | 正反例 |
| 多端交付 | Figma 属性、React API、Vue API、文档命名是否一致？ | 对齐矩阵 |

## 3. 统一状态基线

不是每个组件都需要所有状态，但必须逐项判断是否适用，不能使用“后台场景必须考虑全部状态”这类泛化句替代。

| 状态组 | 状态 |
|---|---|
| 基础交互 | default、hover、focus-visible、active/pressed |
| 选择 | selected、checked、indeterminate、current |
| 可用性 | disabled、readOnly、permission-locked |
| 校验 | required、error、warning、success |
| 异步 | loading、submitting、processing、retry |
| 数据 | empty、no-result、no-permission、load-failed |
| 展开 | open、closed、expanded、collapsed |
| 内容边界 | overflow、truncated、wrapped、max-count |
| 响应式 | desktop、compact、mobile |

通用要求：

- 所有可交互组件必须定义 `focus-visible`，不能只写 hover。
- 禁用和只读必须分开；只读内容通常仍可聚焦和复制。
- 异步操作必须防止重复提交，并说明失败后的恢复方式。
- 浮层组件必须定义打开态、关闭方式、焦点返回和层级。
- 状态不能只依赖颜色表达。

## 4. 29 个已确认组件的规范缺口

完成度说明：

- **A**：框架较完整，只需精修或对齐。
- **B**：有基本规则，但缺少关键状态、交互或业务示例。
- **C**：文档多为清单或占位描述，无法直接指导设计与开发。

| # | 组件 | 完成度 | 当前最主要缺口 | 必须补充的状态/Token/示例 |
|---:|---|:---:|---|---|
| 1 | Button | B | 页面规则丰富，但 Markdown、代码和 Skill 对圆角、主按钮数量的口径不一致 | focus-visible、长文案、按钮组溢出；组件高度/水平 padding Token；危险确认与移动端底部操作示例 |
| 2 | Icon | B | 图标来源较清晰，但缺少图标按钮、状态图标和装饰图标的完整边界 | clickable/disabled/focus；icon-size、stroke Token；无文字按钮和仅装饰图标正反例 |
| 3 | Input | B | 聚焦色存在冲突；缺少清空、前后缀、字符限制和输入类型规则 | filled、clearable、readonly、error、loading；control-height、field-border、focus-ring Token；搜索、金额、长值示例 |
| 4 | Textarea | B | `rows` 文档仍为占位类型，未定义自动高度和计数规则 | resize、max-length、counter、readonly、overflow；textarea-min-height Token；审核意见和超长文本示例 |
| 5 | Form | C | manifest 描述 `layout/state`，React 实际是 FormGrid/FormStateBanner 组合，合同不一致 | submitting、save-failed、permission-locked、dirty；field-gap、section-gap、label-width Token；创建、编辑、只读审批示例 |
| 6 | DescriptionList | B | manifest 有媒体和附件状态，但 Markdown states 未覆盖；空值与敏感值规则不足 | masked、attachment、media、overflow；label-width、row-gap Token；审批详情、材料参数、附件示例 |
| 7 | Collapse | B | manifest 把业务场景当 variant，React 只支持 outlined/plain | keyboard open/close、focus、nested、loading；trigger-height Token；高级筛选和历史记录示例 |
| 8 | Select | C | 文档声称 searchable/open/multiple，但 React 是原生 select，无法展示完整下拉合同 | open、searching、multiple、clearable、no-result；dropdown-height、option-height、overlay Token；长列表、多选、远程加载示例 |
| 9 | Tree | C | 4 个 Props 是占位类型；缺少键盘导航、半选、拖拽与异步加载规则 | hover、focus、checked、indeterminate、load-failed、drag；node-height/indent Token；组织、目录、权限树示例 |
| 10 | Transfer | C | 4 个 Props 是占位类型；选择、批量移动和搜索结果规则不足 | partial-selected、moving、search-empty、disabled；panel-width、item-height Token；角色授权和字段配置示例 |
| 11 | Table | C | manifest/API 的 density 命名不一致；文档仍有占位 Props；缺少排序、固定列和编辑合同 | sorting、filtering、editing、expanded、sticky、load-failed；row-height、cell-padding、column-min-width Token；批量操作和宽表格示例 |
| 12 | Card | B | manifest 有 metric/list-item/lg，但 React 仅 plain/outlined/muted、sm/md | keyboard interactive、selected、loading、empty；card-padding、status-line Token；指标卡、入口卡、列表卡反例 |
| 13 | Menu | C | manifest 使用 orientation，React 使用 mode；缺少子菜单展开、溢出和移动端规则 | expanded、focus、overflow、collapsed-tooltip；menu-item-height/indent Token；后台侧栏、顶部导航、多级菜单示例 |
| 14 | Tabs | B | manifest 有 lg 和 activeKey，React 使用 sm/md 与 value；未定义键盘方向键行为 | focus、overflow-scroll、loading-panel；tab-height/gap/indicator Token；详情分区、局部视图、错误使用示例 |
| 15 | Modal | B | 缺少焦点锁定、Esc、遮罩关闭、滚动和嵌套禁则 | opening、submitting、load-failed、long-content；modal-width、header/footer、overlay Token；确认、危险确认、表单弹窗示例 |
| 16 | Drawer | C | 3 个 Props 是占位类型；缺少焦点管理和移动端全屏规则 | opening、submitting、long-content、mobile-fullscreen；drawer-width、overlay Token；详情、筛选、审批流示例 |
| 17 | Radio | B | 缺少 RadioGroup 的方向、标签、键盘与卡片组选中规则 | focus、group-error、disabled-checked；control-size/gap Token；配置单选和卡片选择示例 |
| 18 | Checkbox | B | `indeterminate` 文档仍是占位说明；缺少组级全选合同 | focus、indeterminate、group-error；control-size/gap Token；表格全选、树选择、权限组示例 |
| 19 | Tag | C | manifest 定义 variant=solid/soft/outline + tone，但 React 用 `variant` 承载颜色且无 tone，严重冲突 | hover/focus/selected/overflow；tag-height/gap Token；分类、状态、筛选条件三类示例 |
| 20 | Avatar | C | manifest 有 initials/badge/xl/disabled，React 仅 name/src/sm-md-lg/status | loading、image-error、anonymous、organization、badge；avatar-size/status-dot Token；人员、组织、系统头像示例 |
| 21 | Badge | C | count/max/dot/showZero 都是占位类型；位置和最大数字规则不足 | zero、overflow-count、hidden、status；badge-offset/min-size Token；通知数量、在线状态和错误叠加反例 |
| 22 | Image | C | loading/error 文档与真实 API 需要对齐；缺少预览、懒加载和无权限规则 | loading、load-failed、no-permission、preview；aspect-ratio、placeholder Token；材料图片、证书、图谱示例 |
| 23 | Breadcrumb | B | maxItems 为占位类型；缺少首页、当前页链接与移动端折叠规则 | focus、collapsed-open、overflow；separator-gap Token；二级、三级、超长路径示例 |
| 24 | Switch | B | 缺少异步开关、失败回滚和危险开关确认规则 | loading、error-reverted、disabled-checked；track/thumb Token；即时设置、权限开关和不适用表单示例 |
| 25 | Pagination | C | 5 个 Props 为占位类型；缺少零页、非法跳转、小屏行为和分页重置规则 | focus、loading、empty、mobile-compact；page-size/control-gap Token；表格、卡片列表、移动端示例 |
| 26 | Tooltip | B | hover/focus 已提及，但缺少延迟、可访问描述、触屏替代和视口碰撞规则 | delayed-open、collision-flip、disabled-trigger；tooltip-max-width/delay Token；截断文本和图标解释示例 |
| 27 | Popover | B | 缺少点击外部关闭、焦点进入/返回、复杂内容上限 | open、focus-inside、loading、collision-flip；popover-width/padding Token；字段解释、快捷操作示例 |
| 28 | Toast | C | manifest/Markdown 使用 tone/placement，React 使用 variant/container position；默认时长文档 3 秒、代码 4 秒 | queued、persistent、action、error-announcement；toast-width/duration/gap Token；保存成功、失败重试、批量结果示例 |
| 29 | Empty | C | manifest 使用连字符命名，React 使用 camelCase；错误、处理中、禁用等语义混入 Empty | no-data、no-result、no-permission、error、first-use；empty-spacing/icon-size Token；表格、搜索、权限、首次使用示例 |

## 5. 7 个基础规范入口

| # | 基础规范 | 当前作用 | 仍需补充的重点 |
|---:|---|---|---|
| 1 | 首页 | 规范定位、品牌原则和入口总览 | 明确版本、适用产品线、规范成熟度和更新状态 |
| 2 | 布局 | 官网、门户和后台页面骨架 | 补断点、栅格、移动端、安全区和页面级响应式规则 |
| 3 | 颜色 | 品牌色、产品色、语义色、数据色和分类色 | 补对比度、暗色背景、禁用透明度及数据可视化组合规则 |
| 4 | 字体 | Display、Heading、Body、Caption 层级 | 补字体族、数字字体、链接、截断和多语言规则 |
| 5 | 间距 | 4px 基础节奏和间距等级 | 补组件内外间距语义、密度模式和响应式缩放规则 |
| 6 | 阴影 | 页面层级和浮层高度表达 | 补与 Z-index 的配套关系、遮罩和暗色背景规则 |
| 7 | 圆角 | 组件与场景的圆角等级 | 裁决 2px/4px 默认冲突，并建立组件圆角映射表 |

补充说明：

- Z-index 已有 Token 和文档，但当前未作为侧边栏独立基础规范入口。
- Chart、Alert、Dropdown、Skeleton 等可作为未来组件扩展项评估，但不计入当前 29 个组件。

## 6. 已发现的冲突

| 冲突 | 来源 A | 来源 B | 建议裁决 |
|---|---|---|---|
| 规范数量口径 | 旧描述为 38 个组件 | 侧边栏实际为 29 个组件 + 7 个基础规范 | 统一使用 29 + 7 的信息架构口径 |
| Figma README 数量 | 文案写 26 个 | manifest 实际 29 个 | README 改为从 manifest 自动生成或不写固定数量 |
| Button 圆角 | Skill 写 `--radius-md` 4px | 组件源码和专业审计以 `--radius-sm` 2px 为默认 | 以 Token 决策记录确认后统一 |
| 输入聚焦色 | 共享 Skill 写 product-blue-500 | Input/Select/Textarea 源码使用 neutral-900 | 明确“焦点环”和“边框”的两个 Token，不再用单一颜色描述 |
| 主按钮数量 | “每个视图最多一个 solid” | 页面示例按区域出现多个 solid | 改为“每个独立操作区域最多一个主操作” |
| Tag API | manifest：variant + tone | React：variant 直接表示颜色 | 优先重构合同或修改 manifest，不能维持双重语义 |
| Avatar 尺寸/API | manifest：sm/md/lg/xl、initials、badge | React：sm/md/lg、name/src/status | 明确以代码为现状还是以 manifest 为目标 |
| Form API | manifest：layout/state/actions | React：组合式子组件 | 选择“配置式”或“组合式”作为正式合同 |
| Select 能力 | manifest：searchable/multiple/open | React：原生 select | 如果这些能力是正式需求，需要升级实现；否则收缩 manifest |
| Table density | manifest：compact/regular | React：compact/standard/comfortable | 统一命名并补精确行高 |
| Toast 时长 | Skill：3 秒 | React 默认：4 秒 | 建立 duration Token，并按消息长度/操作性定义 |
| Empty 命名 | manifest：no-data 等 | React：noData 等 | Figma 可读名与代码值建立明确映射 |
| 颜色硬编码规则 | Skill 禁止所有硬编码 | tokens.css 自身及少数示例需要定义原始值 | 改为“业务组件禁止硬编码；Token 源文件允许定义原始值” |

## 7. 需要补充的 Token

现有 Token 已覆盖颜色、字体、基础间距、圆角、阴影、Z-index 和大框架布局，但组件级尺寸不足。

### P0：组件共用 Token

- 控件高度：`control-height-sm/md/lg/xl/2xl`
- 焦点：`focus-ring-color`、`focus-ring-width`、`focus-ring-offset`
- 字段：`field-border-default/hover/focus/error/disabled`
- 图标：`icon-size-xs/sm/md/lg/xl`
- 触控目标：`touch-target-min`
- 动效：`motion-duration-fast/normal/slow`、`motion-easing-standard`
- 遮罩：`overlay-bg`
- 禁用：`disabled-opacity`

### P1：复杂组件 Token

- Table：行高、单元格 padding、表头高度、最小列宽
- Form：字段间距、分组间距、标签宽度、操作区高度
- Modal/Drawer：宽度、头部/底部高度、内容最大高度
- Menu/Tabs：项目高度、缩进、间距、指示条
- Tooltip/Popover/Toast：最大宽度、padding、显示延迟、持续时间
- Tree/Transfer：节点高度、层级缩进、面板宽度
- Avatar/Badge/Tag：尺寸、状态点、偏移、最小宽度
- Image：常用宽高比和占位尺寸

### P2：场景 Token

- 官网与后台的密度模式
- 响应式断点
- 数据可视化轴线、网格、标签和序列 Token
- 移动端安全区、底部操作区和全屏浮层 Token

## 8. 每个组件至少需要的示例

每个组件页面建议固定为四组示例：

1. **基础示例**：默认变体、尺寸和核心结构。
2. **真实业务示例**：必须来自新材道官网、材库、数据空间、材小模或后台任务。
3. **边界示例**：长文案、空数据、加载失败、无权限、小屏或大数据量。
4. **错误示例**：明确展示一个常见误用及原因。

复杂组件额外需要组合示例：

- Form：Input + Select + Radio + Checkbox + Actions
- Table：Filter + Batch actions + Table + Empty/Loading + Pagination
- Modal/Drawer：Form/DescriptionList + Footer actions
- Tree/Transfer：Search + Selection + Empty/Loading
- Menu/Tabs/Breadcrumb：完整页面导航层级
- Toast/Alert/Empty：反馈层级选择对照

## 9. 建议执行顺序

### 第一阶段：先统一真相源

1. 将 29 个组件和 7 个基础规范定义为当前正式范围。
2. 将 `figma/components.manifest.json` 定为组件注册表。
3. 对齐 manifest、React、Vue、Markdown 和 Figma 命名。
4. 裁决本报告第 6 节的合同冲突。

### 第二阶段：补 P0 组件

优先完成 Button、Input、Select、Form、Table、Checkbox、Radio、Switch、Modal、Drawer。

这些组件决定后台页面的大部分一致性，也是当前冲突最多、业务组合最复杂的部分。

### 第三阶段：补状态与业务案例

为每个组件补齐适用状态、键盘交互、响应式、内容边界及四类示例。

### 第四阶段：建立规范验收

组件完成的最低验收条件：

- 组件注册表有唯一条目。
- Figma、React、Vue 和文档合同一致。
- 不存在占位 Props 描述。
- 有明确 Token 引用。
- 有适用状态矩阵。
- 有键盘和焦点规则。
- 有至少四类示例。
- `npm run verify` 和 `npm run build` 通过。

## 10. 当前基线状态

- 组件交付链路：29/29 通过。
- 规范范围：29 个组件 + 7 个基础规范。
- 规范完整度：菜单入口齐全，但组件规则与基础规范仍需按本报告补齐。
- 当前最大风险：组件合同在 manifest、Skill 和实际 React API 之间漂移。
- 下一项建议：先裁决组件合同冲突，并从 Button、Input、Select、Form、Table 开始补齐 P0 规则。
