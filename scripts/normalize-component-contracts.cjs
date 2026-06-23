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

const groups = {
  "操作与输入": ["Button", "Icon", "Input", "Textarea", "Form", "Select", "Radio", "Checkbox", "Switch"],
  "数据与内容": ["Table", "Pagination", "DescriptionList", "Card", "Tag", "Empty", "Image", "Avatar", "Badge"],
  "导航与组织": ["Menu", "Tabs", "Breadcrumb", "Collapse", "Tree", "Transfer"],
  "反馈与浮层": ["Modal", "Drawer", "Tooltip", "Popover", "Toast"],
};

const propCatalog = {
  variant: ["string", "组件的结构或视觉层级；不得承载业务颜色语义。"],
  tone: ["string", "组件的操作或业务颜色语义；Button 中 task 推进任务，product 调用产品能力。"],
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
  open: ["boolean", "浮层或面板的受控打开状态。"],
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
  data: ["array", "组件数据源。"],
  rows: ["number | array", "文本域行数或表格行数据。"],
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
  alt: ["string", "图片替代文本。"],
  variant: ["string", "组件的结构或视觉层级；不得承载业务颜色语义。"],
  checked: ["boolean", "选择控件的选中状态。"],
  indeterminate: ["boolean", "复选框半选状态。"],
  count: ["number", "徽标数字。"],
  max: ["number", "徽标最大显示数字。"],
  dot: ["boolean", "仅显示状态点。"],
  showZero: ["boolean", "数字为零时是否显示。"],
  src: ["string", "图片资源地址。"],
  name: ["string", "可访问名称或表单名称。"],
  status: ["string", "状态语义。"],
  ratio: ["string", "媒体宽高比。"],
  fit: ["'cover' | 'contain'", "媒体填充方式。"],
  caption: ["ReactNode | string", "图片说明。"],
  maxItems: ["number", "面包屑折叠前的最大条目数。"],
  selectedKey: ["string", "当前选中的节点。"],
  defaultExpandedKeys: ["string[]", "默认展开节点。"],
  checkedKeys: ["string[]", "当前选中的树节点。"],
  targetKeys: ["string[]", "穿梭框右侧条目键值。"],
  showSearch: ["boolean", "是否显示本地搜索。"],
  activeKey: ["string", "当前激活项；React canonical 字段为 value。"],
  value: ["string", "当前受控值。"],
  defaultValue: ["string", "默认值。"],
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
    tones: ["neutral", "product", "brand", "danger", "warning", "success", "info", "teal", "violet", "slate", "cyan"],
  },
  Avatar: {
    props: ["name", "src", "size", "status", "disabled"],
    variants: ["image", "initial"],
    sizes: ["sm", "md", "lg", "xl"],
    states: ["default", "online", "busy", "offline", "disabled", "image-error"],
  },
  Image: {
    props: ["src", "alt", "ratio", "fit", "loading", "error", "caption"],
  },
  Breadcrumb: {
    props: ["items", "maxItems"],
  },
  Toast: {
    props: ["tone", "title", "description", "action", "closable", "duration", "position"],
    variants: ["basic", "with-description", "with-action"],
  },
  Empty: {
    props: ["variant", "title", "description", "action"],
    variants: ["noData", "noResult", "noPermission", "firstUse", "error", "processing", "disabled"],
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
    usage: "用于高密度结构化数据；文本左对齐、可比较数字右对齐、操作右对齐。",
    avoid: "不要强行压缩大量列；优先保留列宽并允许横向滚动。",
  },
  Modal: {
    anatomy: ["遮罩", "标题区", "内容区", "底部操作区", "关闭入口"],
    usage: "用于阻断式确认和必须聚焦处理的任务。",
    avoid: "不要嵌套多个弹窗，也不要用弹窗承载长时间浏览内容。",
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
  component.status = ["draft", "review", "stable"].includes(previousStatus) ? previousStatus : "review";
  component.contract = { ...defaultRules(component), ...(componentRules[component.name] || {}) };
  component.propDefinitions = (component.props || []).map((prop) => {
    const [type, description] = propCatalog[prop] || ["unknown", `${prop} 的组件合同字段；实现与文档必须保持一致。`];
    return { name: prop, type, description };
  });
  component.delivery = previousDelivery || {
    desktopReviewed: false,
    mobileReviewed: false,
    buildVerified: false,
  };
  component.figma = previousFigma || {
    targetFileKey: "KjkKSAd9eufpg9eFR9xZVX",
    syncStatus: "blocked-by-maturity",
    nodeId: null,
  };
}

manifest.version = "0.2.0";
manifest.updatedAt = "2026-06-22";
manifest.scope = {
  foundations: ["首页", "布局", "颜色", "字体", "间距", "阴影", "圆角"],
  componentCount: 29,
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
console.log(`Normalized ${manifest.components.length} component contracts.`);
