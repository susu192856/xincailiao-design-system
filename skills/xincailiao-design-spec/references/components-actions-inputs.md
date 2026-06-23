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
- 同一操作组禁止 task solid 与 product solid 并列；task 已为主操作时，product 降为 outline 或 text。
- neutral 用于取消、返回和关闭。

## 选择策略

- Button 触发动作；Link 负责导航。
- Input 单行，Textarea 多行，Select 从既有选项选择。
- Radio 用于少量互斥选择，Checkbox 用于多选，Switch 用于即时生效。
- 需要提交后才生效的二元字段使用 Radio/Checkbox，不使用 Switch。

## 边界

- Select 当前支持原生单选/多选；不假装拥有搜索式复合选择器能力。
- 纯图标按钮必须有可访问名称和 Tooltip。
- 每个独立操作区域最多一个 solid 主操作。
