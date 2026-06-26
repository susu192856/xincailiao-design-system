# 操作与输入组件

组件：Button、Icon、Input、Textarea、Form、Select、Radio、Checkbox、Switch。

## 共用规则

- 控件高度按 sm/md/lg 等组件 Token 对齐。
- 表单标签默认上置；宽后台配置页可左置，移动端回退上置。
- placeholder 不能替代字段标签。
- 错误状态同时提供文字说明。
- readonly 可查看复制；disabled 不可操作且通常不提交。
- 表单操作区次要操作在左、主操作在右。
- task 黑色用于提交、确认、发布、创建等任务推进。
- product 蓝色用于分析、生成、连接、筛选、导出等产品能力。
- brand 红色用于官网、门户营销、预约演示、立即体验等品牌转化，不进入常规后台操作组。
- task、product、brand 构成三色三角，三者是平级主操作语义，按页面类型和操作意图选择。
- 同一操作组禁止 task、product、brand 中任意两个 solid 并列；task 已为主操作时，product 降为 outline 或 text，brand 必须移出该操作组。
- 应用平台或 AI 能力页没有任务提交时，product 可作为唯一 solid；提交配置、保存流程仍使用 task。
- neutral 用于取消、返回和关闭。

## 选择策略

- Button 触发动作；Link 负责导航。
- Input 单行，Textarea 多行，Select 从既有选项选择。
- Textarea 的 sm/md/lg 最小高度为 80/96/120px；帮助或错误信息必须与控件关联，字数限制使用 maxLength + showCount。
- Radio 用于少量互斥选择，Checkbox 用于多选，Switch 用于即时生效。
- 需要提交后才生效的二元字段使用 Radio/Checkbox，不使用 Switch。

## 边界

- Select 当前稳定合同只支持原生单选；搜索、远程选项与多选标签属于后续复合选择器。
- Select 左置标签在小于 640px 时回退为上置，移动端控件触控高度至少 44px。
- 纯图标按钮必须有可访问名称和 Tooltip。
- 每个独立操作区域最多一个 solid 主操作。
