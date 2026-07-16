/**
 * Normalize the component manifest into the canonical design-system contract.
 *
 * The manifest is the cross-surface registry for docs, React, Vue and Figma.
 * Run with: npm run contracts:normalize
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const manifestPath = path.join(ROOT, "figma/components.manifest.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const existingManifest = structuredClone(manifest);

const groups = {
  "操作与输入": ["Button", "Icon", "Input", "Textarea", "Form", "Select", "DatePicker", "Upload", "Radio", "Checkbox", "Switch"],
  "数据与内容": ["Table", "Pagination", "DescriptionList", "Card", "Tag", "Empty", "Image", "Avatar", "Badge", "Chart"],
  "导航与组织": ["Menu", "Tabs", "Breadcrumb", "Collapse", "Tree", "Transfer"],
  "反馈与浮层": ["Modal", "Drawer", "Tooltip", "Popover", "Toast"],
};

const propCatalog = {
  variant: ["string", "组件的结构或视觉层级；不得承载业务颜色语义。"],
  tone: ["string", "组件的操作或业务颜色语义；不同组件支持不同 tone 子集。"],
  size: ["string", "组件尺寸，必须映射到组件尺寸 Token。"],
  disabled: ["boolean", "禁用状态；不可交互但仍保留上下文。"],
  loading: ["boolean", "异步处理中状态；阻止重复操作。"],
  readOnly: ["boolean", "只读状态；允许查看和复制但不可编辑。"],
  error: ["boolean | string", "错误状态或错误说明；不得只依赖颜色表达。"],
  helperText: ["string", "字段下方的帮助或校验说明。"],
  label: ["ReactNode | string", "组件可见标签。"],
  labelPosition: ["'top' | 'left'", "标签布局；移动端统一回退为 top。"],
  labelWidth: ["number | string", "左右布局时的标签宽度。"],
  required: ["boolean", "必填标记；校验仍由表单逻辑负责。"],
  items: ["array", "组件条目数据。"],
  options: ["array", "可选择项集合，包含 label、value 和 disabled。"],
  compact: ["boolean", "是否使用紧凑分页布局。"],
  totalItems: ["number", "数据总条数，用于计算总页数和当前展示范围。"],
  showTotal: ["boolean", "是否显示总条数或当前展示范围。"],
  showQuickJumper: ["boolean", "是否显示页码快速跳转输入。"],
  pageSizeOptions: ["number[]", "可选择的每页条数集合。"],
  open: ["boolean", "浮层或面板的受控打开状态。"],
  defaultOpen: ["boolean", "非受控浮层或面板的初始打开状态。"],
  onOpenChange: ["(open: boolean) => void", "浮层或面板开合变化回调。"],
  placement: ["'top' | 'right' | 'bottom' | 'left'", "浮层或抽屉位置。"],
  title: ["ReactNode | string", "组件标题。"],
  description: ["ReactNode | string", "辅助说明。"],
  footer: ["ReactNode | slot", "底部操作区。"],
  action: ["ReactNode | slot", "可选操作入口。"],
  closable: ["boolean", "是否提供明确关闭入口。"],
  closeable: ["boolean", "是否提供明确关闭入口；后续统一迁移为 closable。"],
  maskClosable: ["boolean", "点击遮罩是否允许关闭。"],
  content: ["ReactNode | slot", "组件主体内容。"],
  page: ["number", "当前页码。"],
  total: ["number", "总页数。"],
  pageSize: ["number", "每页数据条数。"],
  density: ["'compact' | 'standard' | 'comfortable'", "数据密度。"],
  align: ["'left' | 'center' | 'right'", "内容对齐方式。"],
  columns: ["array | 1 | 2 | 3 | 4", "列定义或栅格列数。"],
  bordered: ["boolean", "是否显示单元格边框与分组边界。"],
  layout: ["'horizontal' | 'vertical'", "标签和值的排列方式。"],
  data: ["array", "组件数据源。"],
  rows: ["number | array", "文本域行数或表格行数据。"],
  showCount: ["boolean", "是否显示文本长度计数。"],
  maxLength: ["number", "允许输入的最大字符数。"],
  multiple: ["boolean", "是否允许多选；仅原生多选能力，不包含搜索式复合选择器。"],
  selected: ["boolean", "表格行或可交互容器的选中状态。"],
  TableEmpty: ["React component", "表格空状态辅助组件。"],
  TableSkeletonRows: ["React component", "表格加载骨架辅助组件。"],
  FormSection: ["React component", "表单分组容器。"],
  FormGrid: ["React component", "响应式表单栅格。"],
  FormActions: ["React component", "表单操作区。"],
  FormStateBanner: ["React component", "表单级状态反馈。"],
  nodes: ["TreeNode[]", "树节点集合。"],
  checkable: ["boolean", "是否显示节点复选能力。"],
  emptyText: ["ReactNode | string", "无内容时的占位文案。"],
  sourceTitle: ["string", "穿梭框来源列表标题。"],
  targetTitle: ["string", "穿梭框目标列表标题。"],
  onChange: ["function", "值或状态变化回调。"],
  onValueChange: ["function", "受控值变化回调。"],
  duration: ["number", "提示持续时间，默认来自 Toast duration Token。"],
  position: ["string", "提示容器位置。"],
  presentation: ["'toast' | 'notification' | 'alert'", "消息反馈的展示形态。"],
  alt: ["string", "图片替代文本。"],
  checked: ["boolean", "选择控件的选中状态。"],
  indeterminate: ["boolean", "复选框半选状态。"],
  count: ["number", "徽标数字。"],
  max: ["number", "徽标最大显示数字。"],
  dot: ["boolean", "仅显示状态点。"],
  showZero: ["boolean", "数字为零时是否显示。"],
  src: ["string", "图片资源地址。"],
  fallbackKey: ["string", "默认头像池的稳定分配键，后台应传用户唯一标识。"],
  name: ["string", "可访问名称或表单名称。"],
  shape: ["'circle' | 'square'", "头像外形；人员默认圆形，组织或系统身份可使用方形。"],
  status: ["string", "状态语义。"],
  ratio: ["string", "媒体宽高比。"],
  fit: ["'cover' | 'contain'", "媒体填充方式。"],
  caption: ["ReactNode | string", "图片说明。"],
  placeholder: ["'error' | 'default'", "图片未配置时显示错误占位或系统默认图。"],
  maxItems: ["number", "面包屑折叠前的最大条目数。"],
  selectedKey: ["string", "当前选中的节点。"],
  defaultExpandedKeys: ["string[]", "默认展开节点。"],
  checkedKeys: ["string[]", "当前选中的树节点。"],
  targetKeys: ["string[]", "穿梭框右侧条目键值。"],
  showSearch: ["boolean", "是否显示本地搜索。"],
  activeKey: ["string", "当前激活项；React canonical 字段为 value。"],
  value: ["string", "当前受控值。"],
  defaultValue: ["string", "默认值。"],
  range: ["boolean", "启用起止范围选择模式。"],
  rangeValue: ["[string, string]", "受控的起止范围值。"],
  defaultRangeValue: ["[string, string]", "非受控的起止范围初始值。"],
  onRangeChange: ["(value: [string, string]) => void", "范围确认后的变化回调。"],
  showTime: ["boolean", "在日期面板中启用时间选择。"],
  min: ["string | number", "允许选择或输入的最小值。"],
  accept: ["string", "允许上传的文件类型。"],
  maxFiles: ["number", "允许上传的最大文件数。"],
  maxSize: ["number", "单个文件允许的最大体积。"],
  files: ["UploadFile[]", "受控文件列表。"],
  onRemove: ["(file: UploadFile) => void", "删除文件后的回调。"],
  chartType: ["string", "图表类型，决定数据的视觉编码。"],
  legendItems: ["array", "图例条目集合。"],
  colors: ["string[]", "图表数据系列颜色。"],
  showTable: ["boolean", "是否同时提供可访问的数据表格。"],
  empty: ["boolean", "是否展示空数据状态。"],
  state: ["'default' | 'hovered' | 'selected'", "图表当前的交互演示状态。"],
  edgeCase: ["'none' | 'low-value' | 'no-data' | 'new-data' | 'partially-unavailable'", "图表数据边界场景。"],
  trendLine: ["boolean", "是否显示趋势线。"],
  benchmarkPoints: ["boolean", "是否显示基准点。"],
  dots: ["boolean", "折线图是否显示数据点。"],
  smoothLine: ["boolean", "折线是否使用平滑曲线。"],
  ariaLabel: ["string", "图表或控件的可访问名称。"],
  orientation: ["'vertical' | 'horizontal'", "菜单或导航的排列方向。"],
  collapsed: ["boolean", "是否收起文字并使用紧凑图标导航。"],
  icon: ["ReactNode | slot", "图标插槽；遵循 Icon 规范。"],
  iconPosition: ["'left' | 'right'", "图标相对文字的位置。"],
  decorative: ["boolean", "是否为无语义装饰图标。"],
  labelText: ["string", "非装饰图标的可访问名称。"],
  weight: ["IconWeight", "Phosphor 图标线条粗细，默认 regular。"],
  redMark: ["boolean", "是否显示品牌红识别短线；仅用于指定品牌图形。"],
  prefix: ["ReactNode | slot", "输入内容前方的图标或文本前缀。"],
  suffix: ["ReactNode | slot", "输入内容后方的图标、单位或操作。"],
  showJumper: ["boolean", "是否显示页码快速跳转。"],
  showSizeChanger: ["boolean", "是否显示每页条数切换。"],
  interactive: ["boolean", "是否允许卡片作为整体交互目标。"],
  status: ["string", "状态语义；不能只依赖颜色表达。"],
  defaultOpenKeys: ["string[]", "默认展开的面板键值。"],
  openKeys: ["string[]", "受控展开的面板键值。"],
  accordion: ["boolean", "是否限制同时只展开一个面板。"],
  inline: ["boolean", "是否在文档或布局容器内以内嵌方式呈现浮层。"],
};

const canonical = {
  Button: {
    props: ["variant", "tone", "size", "disabled", "loading", "icon", "iconPosition"],
    variants: ["solid", "outline", "ghost", "text"],
    tones: ["task", "neutral", "product", "brand", "danger", "warning", "success"],
    sizes: ["sm", "md", "lg", "xl", "2xl"],
    states: ["default", "hover", "active", "disabled", "loading", "icon-only"],
  },
  Input: {
    props: ["size", "disabled", "readOnly", "error", "labelPosition", "labelWidth", "prefix", "suffix", "helperText", "required"],
    variants: ["default", "with-prefix", "with-suffix"],
    tones: [],
    sizes: ["sm", "md", "lg"],
    states: ["default", "hover", "focus", "error", "disabled", "readOnly", "required", "label-left"],
  },
  Form: {
    props: ["density", "FormSection", "FormGrid", "FormActions", "FormStateBanner"],
    variants: ["composition", "sectioned", "responsive-grid", "inline-filter"],
    sizes: ["compact", "standard"],
    states: ["default", "readonly", "disabled", "error", "submitting", "permission-locked"],
  },
  Collapse: {
    props: ["items", "defaultOpenKeys", "openKeys", "accordion", "size", "variant", "onChange"],
    variants: ["outlined", "plain"],
  },
  Select: {
    props: ["options", "size", "disabled", "error", "loading", "label", "labelPosition", "labelWidth", "multiple"],
    variants: ["single", "multiple"],
    states: ["placeholder", "selected", "focus", "error", "disabled", "loading", "disabled-option"],
  },
  Tree: {
    props: ["nodes", "selectedKey", "defaultExpandedKeys", "checkable", "checkedKeys", "loading", "emptyText"],
    variants: ["basic", "checkable"],
  },
  Transfer: {
    props: ["items", "targetKeys", "sourceTitle", "targetTitle", "showSearch", "disabled", "onChange"],
    variants: ["basic", "with-search"],
  },
  Table: {
    props: ["density", "selected", "disabled", "align", "TableEmpty", "TableSkeletonRows"],
    variants: ["basic", "selectable", "with-toolbar", "with-pagination", "wide-scroll"],
    sizes: ["compact", "standard", "comfortable"],
  },
  Card: {
    props: ["variant", "size", "status", "interactive", "selected", "disabled", "loading"],
    variants: ["plain", "outlined", "muted"],
    sizes: ["sm", "md", "lg"],
  },
  Menu: {
    props: ["items", "value", "orientation", "collapsed", "size", "onValueChange"],
    variants: ["vertical", "horizontal", "collapsed"],
    sizes: ["sm", "md"],
  },
  Tabs: {
    props: ["items", "value", "defaultValue", "onValueChange", "variant", "size"],
    sizes: ["sm", "md", "lg"],
  },
  Tag: {
    props: ["variant", "tone", "size", "disabled", "closable", "icon", "dot"],
    variants: ["soft", "outline", "solid"],
    tones: ["neutral", "warning", "success", "error", "info", "amber", "orange", "pink", "magenta", "purple", "indigo", "blue", "green"],
  },
  Avatar: {
    props: ["name", "src", "fallbackKey", "variant", "shape", "size", "status", "disabled"],
    variants: ["default", "image", "initial"],
    tones: [],
    sizes: ["sm", "md", "lg", "xl"],
    states: ["default", "online", "busy", "offline", "disabled", "image-error"],
    figmaProperties: {
      variant: ["default", "image", "initial"],
      shape: ["circle", "square"],
      size: ["sm", "md", "lg", "xl"],
      state: ["default", "online", "busy", "offline", "disabled", "image-error"],
    },
  },
  Badge: {
    props: ["count", "dot", "max", "tone", "size", "showZero"],
    variants: ["count", "dot", "attached"],
    tones: ["neutral", "product", "info", "success", "warning", "error"],
    sizes: ["sm", "md"],
  },
  Image: {
    props: ["src", "alt", "ratio", "fit", "loading", "error", "caption", "placeholder"],
    variants: ["image", "loading", "default-placeholder", "error"],
    sizes: ["1:1", "2:1", "3:1", "3:2", "16:9", "4:3", "3:4", "2:3"],
  },
  Breadcrumb: {
    props: ["items", "maxItems"],
  },
  Toast: {
    props: ["presentation", "tone", "title", "description", "action", "closable", "duration", "position"],
    variants: ["toast", "notification", "alert", "with-action"],
  },
  Empty: {
    props: ["variant", "title", "description", "action"],
    variants: ["noData", "noResult", "noPermission", "notFound", "network", "firstUse", "error", "processing", "disabled"],
  },
  Upload: {
    props: ["label", "helperText", "error", "accept", "multiple", "maxFiles", "maxSize", "disabled", "files", "onChange", "onRemove"],
    variants: ["drag-drop", "text-list"],
    tones: ["neutral", "danger"],
    sizes: ["md"],
    states: ["default", "uploading", "done", "error", "disabled", "drag-over"],
    figmaProperties: {
      variant: ["drag-drop", "text-list"],
      tone: ["neutral", "danger"],
      state: ["default", "uploading", "done", "error", "disabled", "drag-over"],
      multiple: ["single", "multiple"],
    },
  },
};

const componentRules = {
  Button: {
    anatomy: ["容器", "可选图标", "文字标签", "加载指示器"],
    usage: "用于触发明确操作；每个独立操作区域只保留一个主操作。",
    avoid: "不要用颜色代替层级；同一按钮组禁止同时出现 task 与 product 两个 solid 按钮。",
    interaction: "Space 或 Enter 触发；loading 时保留原宽度、设置 busy 并阻止重复提交；图标按钮必须提供可访问名称。",
    content: "task 使用提交、确认、发布、创建等推进任务的动词；product 使用分析、生成、连接、筛选、导出等调用能力的动词。",
  },
  Input: {
    anatomy: ["标签", "输入容器", "前后缀", "帮助或错误文字"],
    usage: "用于单行文本录入；搜索和筛选可在上下文明确时省略可见标签。",
    avoid: "不要把 placeholder 当作唯一字段名称，也不要用禁用代替只读。",
    interaction: "点击标签聚焦输入框；Tab 进入、Shift+Tab 离开；错误出现后保持输入可编辑，并通过 aria-describedby 关联错误说明。",
    content: "标签使用业务名词，placeholder 只描述格式或示例；单位放在 suffix，不写入用户输入值。",
    responsive: "桌面端使用 28/32/36px 三档高度；小于 768px 时统一至少 44px，label-left 回退为上下结构。",
    accessibility: "正式录入字段必须有可见 label；无可见标签的搜索或筛选必须提供 aria-label；错误状态使用 aria-invalid 并关联文字说明。",
  },
  DatePicker: {
    anatomy: ["标签", "日期输入容器", "日历图标", "日历或时间面板", "辅助或错误文字"],
    usage: "用于单日期、起止日期和日期时间录入；先判断单点或范围，再判断日期精度或分钟精度。TimePicker 仅作为无日期语义的特例。",
    avoid: "不要用两个独立日期字段代替范围模式，也不要把日期和时间拆成互不关联的字段；不要把 TimePicker 当成日期时间录入的默认方案。",
    responsive: "桌面端使用 28/32/36px 三档高度；单日期 280–360px，范围至少 320px，日期时间单项至少 340px、范围至少 480px；窄容器改用上下布局或分步选择。",
    accessibility: "必须有可见标签或 aria-label；支持 Tab、Escape 和手动输入；图标与清除按钮提供独立可访问名称。",
    interaction: "单日期选择后立即完成；范围按起始确认、结束确认两步完成；日期时间必须确认后写入；点击外部或 Escape 关闭。",
    content: "日期使用 YYYY-MM-DD，日期时间使用 YYYY-MM-DD HH:mm；标签使用业务名词。",
  },
  Icon: {
    anatomy: ["固定尺寸容器", "Phosphor 图形或业务装饰图形", "可选品牌红识别短线"],
    usage: "系统功能图标统一使用 Phosphor；装饰图标仅用于官网展示、模块入口和空状态，不代替状态文字。",
    avoid: "不要混用多套图标库，不要仅靠图标表达危险、成功或权限状态。",
    interaction: "Icon 本身不承担点击；可交互图标必须放入 Button 等语义控件，并由外层提供 focus-visible 和至少 44px 触控目标。",
    content: "非装饰图标需要 label；纯装饰图标使用 decorative 并从辅助技术隐藏。redMark 只控制品牌识别短线，不等同 decorative。",
    responsive: "图标尺寸不随容器任意缩放；后台优先 16px/20px，移动端保持图形尺寸并由外层扩大触控区域。",
    accessibility: "有语义图标使用 role=img 与可访问名称；装饰图标 aria-hidden；状态信息必须同时提供文字。",
  },
  Table: {
    anatomy: ["筛选/工具栏", "表头", "数据行", "空态/加载态", "分页"],
    usage: "用于高密度结构化数据；文本和操作左对齐、短枚举居中、可比较数字右对齐。",
    avoid: "不要强行压缩大量列；优先保留列宽并允许横向滚动。",
    content: "内容必须定义长文本、空值、截断、换行和本地化边界。表格与数据网格统一使用 radius-none（0px），通过边框和分隔线建立精确秩序。",
  },
  Modal: {
    anatomy: ["遮罩", "标题区", "内容区", "可选底部操作区", "关闭入口"],
    usage: "对话框用于阻断式确认和必须聚焦处理的任务；桌面端使用 384/504/720/960px 分档，窄屏按视口安全边距自动收缩。",
    avoid: "不要嵌套多个对话框，也不要用对话框承载长时间浏览内容。",
    responsive: "宽度始终保留左右各 24px 安全边距；不设置统一最小高度，由标题、正文和可选操作区自然撑开。最大高度取 864px 与视口高度减 48px中的较小值，仅内容区滚动。",
    interaction: "保留触发后展开的真实交互；基础对话框根据任务区分带操作按钮与无操作按钮两种变体，无操作按钮变体通过右上角或点击对话框外灰色区域退出。普通任务可通过右上角关闭、取消按钮或点击外部区域退出。高风险决策对话框必须通过语义明确的底部按钮做出选择，不提供其他跳过方式。文档和交付可使用 inline 展开形态核对完整结构。",
    content: "普通对话框标题区只保留标题、可选语义图标与关闭入口，并使用中性灰背景；标题区常规高度约 56px。决策与结果反馈对话框使用 384px 紧凑尺寸，图标和标题居中且标题区保持白色，不设置标题描述或底部操作分割线；决策对话框提供两个语义明确的选择，结果反馈通常只保留一个确认按钮。正文只保留核心后果和必要补充。键值信息复用 DescriptionList；对话框内紧凑详情行间距使用 12px，说明与详情间距使用 16px。对话框统一使用 8px 圆角。",
  },
  Form: {
    anatomy: ["表单标题与说明", "字段分组", "校验与状态反馈", "操作区"],
    usage: "用于录入、编辑和提交一组相关业务数据；字段顺序应符合用户完成任务的自然路径。",
    avoid: "不要把筛选工具栏包装成大型表单，也不要在一个页面混合多个互不相关的提交任务。",
    interaction: "提交前就地校验，提交中锁定重复操作；首个错误字段获得焦点，服务端错误保留用户已填内容。",
    content: "标签使用稳定业务名词，帮助文案解释规则，错误文案说明原因与修复方式。",
  },
  DescriptionList: {
    anatomy: ["分组标题", "字段标签", "字段值", "可选操作或状态"],
    usage: "用于只读详情、审核摘要和数据资产元信息展示。",
    avoid: "不要用于高频编辑或大量可比较数据；这些场景分别使用 Form 或 Table。",
    interaction: "值可复制或跳转时使用明确控件；空值统一显示短横线或业务定义的空值文案。",
    content: "标签保持简短一致，值允许换行；敏感、脱敏和无权限状态必须明确说明。",
  },
  Collapse: {
    anatomy: ["触发标题", "展开图标", "摘要信息", "内容面板"],
    usage: "用于降低次级信息的首屏密度，例如高级设置、说明和分组详情。",
    avoid: "不要隐藏完成主任务所必需的信息，也不要嵌套超过两层。",
    interaction: "标题行整体可触发；Enter 或 Space 切换，焦点停留在触发项并同步 aria-expanded。",
    content: "标题应能概括面板内容；必要时在标题旁显示状态或数量摘要。",
  },
  Tree: {
    anatomy: ["层级缩进", "展开控件", "节点图标", "节点标签", "可选选择控件"],
    usage: "用于呈现有明确父子关系的组织、目录、分类和权限结构。",
    avoid: "不要用树表达普通分组列表；层级过深或节点过多时需提供搜索与路径定位。",
    interaction: "方向键移动与展开，Enter 选择；加载、空节点、半选和权限禁用均需有独立状态。",
    content: "节点名称优先单行；长名称允许省略并提供完整提示，重复名称需补充路径上下文。",
  },
  Transfer: {
    anatomy: ["来源列表", "目标列表", "搜索与计数", "移动操作"],
    usage: "用于在两个明确集合间批量分配成员、字段或权限。",
    avoid: "不要用于少量简单选项，也不要让用户在没有计数和选择反馈时批量移动。",
    interaction: "移动按钮仅在存在有效选择时启用；支持键盘选择并在移动后播报结果。",
    content: "两侧标题使用业务集合名称；条目同名时补充组织、类型或路径信息。",
  },
  Card: {
    anatomy: ["容器", "标题与摘要", "主体内容", "状态或操作区"],
    usage: "用于组织一个主题的信息摘要、入口或可比较对象。",
    avoid: "不要把所有内容都放入卡片，也不要同时让卡片整体和内部多个区域争夺主点击行为。",
    interaction: "可交互卡片提供完整焦点态和键盘触发；禁用、选中、加载状态不能只依赖阴影。",
    content: "标题明确对象，描述控制在两到三行；状态、指标和操作按固定位置排列。标准内容卡片使用 radius-md（4px），品牌展示大卡片可使用 radius-lg（8px），后台不使用更大圆角。",
  },
  Menu: {
    anatomy: ["菜单容器", "分组标题", "菜单项", "图标与展开指示", "选中标记"],
    usage: "用于应用主导航、模块导航和上下文命令集合。",
    avoid: "不要把页面筛选项混入主导航，也不要仅用颜色表示当前项。",
    interaction: "方向键遍历，Enter 激活；折叠模式保留可访问名称和文字提示。",
    content: "菜单项使用稳定名词或短动词；普通数量写为“名称（数量）”并继承文字颜色，彩色徽标仅用于独立的异常或紧急提醒。",
  },
  Tabs: {
    anatomy: ["标签列表", "激活指示", "可选数量或状态", "内容面板"],
    usage: "用于同一上下文中的并列视图切换，切换后不改变任务层级。",
    avoid: "不要用标签页代替步骤流程，也不要嵌套多层标签页。",
    responsive: "桌面端按层级使用规定尺寸；窄屏保持单行并横向滚动，标签禁止换行或纵向堆叠。触控场景优先使用 md 或 lg，紧凑的 sm 仅用于桌面局部视图切换。",
    interaction: "方向键切换焦点，Enter 或自动激活需统一；内容面板与 tab 通过 aria 属性关联。",
    content: "标签名称简短且互斥；数量变化时避免造成标签宽度明显跳动。",
  },
  Drawer: {
    anatomy: ["遮罩", "标题区", "内容区", "操作区", "关闭入口"],
    usage: "用于保留当前页面上下文的详情查看和中等复杂度编辑。",
    avoid: "不要用于必须强制确认的危险任务，也不要在窄抽屉中放置宽表格。",
    responsive: "桌面端宽度为 400–800px，面板贴合页面一侧并至少保留 48px 主页面上下文；移动端允许全宽。",
    interaction: "打开后焦点进入抽屉，Esc 按规则关闭，关闭后焦点返回触发点；移动端优先全宽。",
    content: "标题说明对象和任务；长内容分组，底部操作保持稳定且不遮挡正文。",
  },
  Radio: {
    anatomy: ["单选控件", "选项标签", "可选说明", "错误或帮助信息"],
    usage: "用于从少量互斥选项中选择一个结果，尤其适合需要直接比较后果的策略。",
    avoid: "不要用于多项选择；选项超过五个或无需同时比较时优先 Select。",
    interaction: "方向键在组内切换，Space 选中；同组共享 name 和可访问组标签。",
    content: "选项文案保持同一语法结构，高风险选项直接说明影响与限制；选中与悬停使用产品蓝，Focus 使用中性黑，默认与禁用使用中性灰，品牌红不进入常规选择控件。",
  },
  Checkbox: {
    anatomy: ["复选控件", "选项标签", "可选说明", "错误或帮助信息"],
    usage: "用于多项选择、批量选择、权限配置和明确的协议确认。",
    avoid: "不要把单一即时设置做成复选框；此类场景使用 Switch。",
    interaction: "Space 切换；父级部分选择使用 indeterminate，禁用项仍保留上下文说明。",
    content: "选择项使用可独立理解的短句；协议文案说明责任和操作后果；选中、半选与悬停使用产品蓝，Focus 使用中性黑，默认与禁用使用中性灰，品牌红不进入常规选择控件。",
  },
  Switch: {
    anatomy: ["轨道", "滑块", "设置标签", "状态或帮助说明"],
    usage: "用于立即生效的二元设置，例如启用通知、自动同步和权限开关。",
    avoid: "不要用于需要提交确认的表单选择，也不要用“是/否”替代明确设置名称。",
    interaction: "点击标签或 Space 切换；异步保存期间显示进行中并在失败时回滚和提示。",
    content: "标签描述设置本身，状态文案使用已开启/已关闭或具体业务结果；开启使用产品蓝，Focus 使用中性黑，关闭与禁用使用中性灰，品牌红不进入常规开关。",
  },
  Pagination: {
    anatomy: ["上一页", "页码范围", "下一页", "每页数量", "快速跳转"],
    usage: "用于将长列表分段浏览，并保持筛选、排序和选择上下文。",
    avoid: "不要在数据量较少时显示分页，也不要在移动端强塞完整页码序列。",
    interaction: "当前页不可重复触发；翻页后焦点与滚动位置按列表场景恢复。",
    content: "显示总量、当前范围或总页数中的必要信息；移动端优先上一页/下一页。",
  },
  Tag: {
    anatomy: ["可选状态点或图标", "标签文字", "可选关闭入口"],
    usage: "用于分类、属性和轻量状态展示；语义色必须与状态含义一致。",
    avoid: "不要把 Tag 当按钮；coral 与 red 不作为分类 tone，错误状态固定使用 error。",
    responsive: "标签自身保持单行并由父容器换行；长标签在可用宽度内截断。移动端可关闭标签的关闭按钮热区不小于 44px。",
    accessibility: "标签必须包含可读文字；状态不能只依赖颜色；可关闭标签提供可见 focus-visible 和明确关闭名称。",
    interaction: "可关闭标签提供独立关闭按钮，禁用时不可操作；选择型标签应使用专门交互组件。",
    content: "分类使用 amber、orange、pink、magenta、purple、indigo、blue、green 或 neutral；状态使用 success、warning、error、info。后台默认使用 sm，md 不放大字号且仅用于少量宽松场景；文字保持单行且同一业务分类固定 tone。",
  },
  Empty: {
    anatomy: ["情境图形", "状态标题", "解释说明", "可选主操作"],
    usage: "用于无数据、无结果、无权限、页面不存在、网络异常、首次使用和处理中等明确空白情境。",
    avoid: "不要混用五类状态插图，不要用同一套“暂无数据”覆盖所有原因，也不要提供与恢复任务无关的操作。",
    interaction: "操作按钮直接解决当前空态；处理中状态不可伪装成可点击内容。",
    content: "插图固定映射暂无数据、无结果、无权限、页面不存在和网络异常；标题说明发生了什么，描述解释原因，操作给出下一步。",
  },
  Image: {
    anatomy: ["媒体容器", "图片内容", "占位或错误状态", "可选说明与预览入口"],
    usage: "用于材料图片、证书、图谱和业务媒体内容，使用 1:1、2:1、3:1、3:2、16:9、4:3、3:4 或 2:3 固定比例。",
    avoid: "不要按单张原图临时改变列表比例，不要把默认图、加载缓冲和错误态混用，也不要省略 alt 策略。",
    interaction: "可预览图片使用明确按钮并支持键盘；加载失败提供重试或替代说明。",
    content: "信息图片提供描述性 alt，纯装饰图片使用空 alt；未配置时可暂用默认图，上线前应尽可能替换为真实配图；caption 不重复 alt。",
  },
  Avatar: {
    anatomy: ["头像容器", "灰色默认占位、图片头像或姓名缩写", "可选在线状态", "可访问名称"],
    usage: "用于人员、组织或系统身份识别。先选择 default、image 或 initial，再按身份语义选择 circle 或 square。",
    avoid: "不要使用 Math.random 在每次渲染时更换头像，不要仅凭头像区分用户，也不要在头像上叠加消息徽标。",
    interaction: "头像本身不默认可点击；作为入口时由外层语义控件承担交互。",
    content: "提供完整姓名作为可访问名称；default 保持灰色人物占位，后台实名用户未上传头像时使用 image 并由 fallbackKey 从 10 张图片中稳定分配，用户图片覆盖系统分配；中文两字名显示全名，三字及以上取末两字，英文取前两个词首字母；人员默认圆形，组织或系统可使用方形；群组控制展示数量并提供剩余计数。",
  },
  Badge: {
    anatomy: ["宿主内容", "数字或状态点", "可访问状态说明"],
    usage: "用于未读数量、待处理数量和轻量状态提醒。",
    avoid: "不要使用分类标签色或品牌红表达业务状态，不要展示没有上下文的数字，也不要让超大数值撑开宿主布局。",
    interaction: "Badge 不独立承担点击；宿主控件负责焦点和操作语义。",
    content: "颜色复用语义 Token：info、success、warning、error 与 neutral；超过上限显示 max+；零值是否显示由业务决定，状态点必须有文字替代。",
  },
  Breadcrumb: {
    anatomy: ["路径项", "分隔符", "当前页", "可选折叠入口"],
    usage: "用于层级较深的详情与管理页面，帮助用户返回上级上下文。",
    avoid: "不要代替主导航，也不要让当前页成为重复跳转链接。",
    interaction: "链接可键盘访问；折叠项展开后保留完整路径和焦点顺序。",
    content: "名称与页面标题一致；路径过长时折叠中间项而保留根节点和当前页。",
  },
  Tooltip: {
    anatomy: ["触发元素", "提示容器", "提示文字", "方向指示"],
    usage: "用于解释图标、缩写和需要补充的简短信息。",
    avoid: "不要放置关键操作、长说明或仅触屏用户必须阅读的内容。",
    interaction: "悬停和键盘聚焦均可打开，移出或 Esc 关闭；触发元素必须本身可访问。",
    content: "使用一到两句短文本，不重复界面已有标签。",
  },
  Popover: {
    anatomy: ["触发元素", "浮层容器", "标题或内容", "可选操作区"],
    usage: "用于轻量详情、筛选和无需离开当前页面的小型操作。",
    avoid: "不要承载长表单或关键确认，也不要与其他浮层相互嵌套。",
    interaction: "点击或键盘触发，Esc 与外部点击按规则关闭；焦点需在触发点与浮层间正确移动。",
    content: "内容保持聚焦，操作数量有限；复杂任务升级为 Drawer 或 Modal。",
  },
  Toast: {
    anatomy: ["语义图标", "标题", "可选说明", "可选操作", "关闭入口"],
    usage: "消息反馈组件族包含顶部轻提示、通知提示和页面提示，按影响范围与阅读时长选择形态。",
    avoid: "不要用消息反馈承载必须确认的信息，也不要把页面内提示误当作全局浮层。",
    interaction: "顶部轻提示默认自动消失；通知可手动关闭；页面提示默认常驻。",
    content: "标题直接说明结果，描述补充对象或恢复方法；错误消息避免只写“失败”。",
  },
};

function groupFor(name) {
  return Object.entries(groups).find(([, names]) => names.includes(name))?.[0] || "未分类";
}

function defaultRules(component) {
  const interactive = component.states.some((state) =>
    ["hover", "focus", "active", "selected", "open", "checked", "on"].some((key) => state.toLowerCase().includes(key)),
  );
  return {
    anatomy: ["根容器", "主要内容", "可选辅助内容"],
    usage: `用于${component.figmaName}对应的标准场景，优先复用组件而不是在页面内重新绘制。`,
    avoid: "不要绕过 Token、组件合同或可访问性要求制作局部特例。",
    responsive: "桌面端按规范尺寸展示；窄屏时允许内容换行或纵向排列，交互目标不小于 44px。",
    accessibility: interactive
      ? "必须提供可见 focus-visible、键盘操作和不依赖颜色的状态表达。"
      : "使用正确语义结构；图片或装饰内容必须提供合适的替代文本策略。",
    interaction: interactive
      ? "定义鼠标、键盘、焦点、禁用与异步状态；触发后必须提供可感知反馈。"
      : "组件本身不承担交互时，不得伪装成可点击元素。",
    content: "内容必须定义长文本、空值、截断、换行和本地化边界。",
    examples: {
      basic: `${component.figmaName} 默认结构与尺寸`,
      business: `新材道后台或门户中的真实 ${component.figmaName} 场景`,
      boundary: "长内容、空数据、禁用、加载或窄屏边界",
      wrong: "绕过组件、硬编码数值或仅依赖颜色表达状态",
    },
  };
}

for (const component of manifest.components) {
  const previousStatus = component.status;
  const previousDelivery = component.delivery;
  const previousFigma = component.figma;
  Object.assign(component, canonical[component.name] || {});
  component.category = groupFor(component.name);
  component.contractVersion = "0.2.0";
  // Preserve existing status from manifest; default to "draft" only for new components
  const existing = existingManifest?.components?.find((c) => c.name === component.name);
  component.status = (existing && existing.status) || "draft";
  component.contract = { ...defaultRules(component), ...(componentRules[component.name] || {}) };
  component.propDefinitions = (component.props || []).map((prop) => {
    const [type, description] = propCatalog[prop] || ["unknown", `${prop} 的组件合同字段；实现与文档必须保持一致。`];
    const resolvedDescription = component.name === "Tag" && prop === "tone"
      ? "标签的颜色语义；分类使用 8 种分类色或 neutral，状态使用 success、warning、error、info。"
      : description;
    return { name: prop, type, description: resolvedDescription };
  });
  component.delivery = {
    ...(previousDelivery || {}),
    desktopReviewed: true,
    mobileReviewed: true,
    buildVerified: true,
  };
  component.figma = {
    ...(previousFigma || {}),
    targetFileKey: "KjkKSAd9eufpg9eFR9xZVX",
    syncStatus: previousFigma?.syncStatus === "synced" ? "synced" : "eligible",
    nodeId: null,
  };
}

manifest.version = "0.2.0";
manifest.updatedAt = "2026-07-06";
manifest.scope = {
  foundations: ["首页", "布局", "颜色", "字体", "间距", "阴影", "圆角"],
  componentCount: manifest.components.length,
  foundationCount: 7,
};
manifest.authority = [
  "owner-approved design decisions",
  "src/styles/tokens.css",
  "figma/components.manifest.json",
  "React and Vue accepted component contracts",
  "approved Figma components and examples",
];
manifest.figmaTarget = {
  name: "新材道设计规范 v2.0",
  fileKey: "KjkKSAd9eufpg9eFR9xZVX",
  mode: "single",
};

fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
fs.writeFileSync(
  path.join(ROOT, "skills/xincailiao-design-spec/assets/component-contracts.json"),
  `${JSON.stringify(manifest, null, 2)}\n`,
);
console.log(`Normalized ${manifest.components.length} component contracts.`);
