import {
  Archive,
  ArrowClockwise,
  ArrowCounterClockwise,
  ArrowLeft,
  ArrowRight,
  ArrowsClockwise,
  ArrowsIn,
  ArrowsOut,
  ChartBar,
  ChatCircle,
  Check,
  CheckCircle,
  Clipboard,
  ClipboardText,
  Copy,
  Database,
  DotsThree,
  DownloadSimple,
  Empty,
  Eye,
  EyeSlash,
  File,
  FileArrowDown,
  FileArrowUp,
  Flag,
  Folder,
  Funnel,
  GearSix,
  GitMerge,
  GridFour,
  House,
  Info,
  ImageSquare,
  Link,
  LinkBreak,
  Lock,
  LockOpen,
  MagnifyingGlass,
  MapPin,
  Monitor,
  PaperPlaneRight,
  Pause,
  PencilSimple,
  Play,
  Plus,
  Printer,
  Prohibit,
  PushPin,
  QrCode,
  Repeat,
  Resize,
  SealCheck,
  ShareNetwork,
  ShieldCheck,
  SignOut,
  SortAscending,
  SpinnerGap,
  Stack,
  Star,
  Trash,
  UploadSimple,
  Users,
  VideoCamera,
  WarningCircle,
  X,
  XCircle,
} from "@phosphor-icons/react";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import { useState } from "react";
import DocsTable from "../../components/docs/DocsTable";
import { SectionHeading } from "../../components/docs/ComponentDoc";
import PageHeader from "../../components/docs/PageHeader";
import { Icon as SystemIcon, Button } from "../../components/ui";

type CommonIconItem = {
  name: string;
  zhName: string;
  icon: PhosphorIcon;
};

type DecorativeIconItem = {
  name: string;
  zhName: string;
  svg: string;
};

const iconSizes = [
  { size: 12, usage: "极弱辅助、紧凑状态" },
  { size: 16, usage: "按钮、表单、内联信息" },
  { size: 20, usage: "导航、列表、工具栏" },
  { size: 24, usage: "卡片标题、模块入口" },
  { size: 32, usage: "空状态、功能入口" },
  { size: 48, usage: "品牌展示、主视觉提示" },
];

const customIconStandards = [
  {
    index: "01",
    title: "尺寸",
    callout: "Figma 直接使用 24 × 24px",
    value: "有效绘图区 20 × 20px",
    description: "在 Figma 中使用 24 × 24px 画布，四周各保留 2px 安全距离。图形至少有一个方向接近绿色绘图区边界，避免留白叠加后在 16px 页面中显得过小。",
  },
  {
    index: "02",
    title: "描边",
    callout: "24px 画布使用 1.5px 描边",
    value: "圆头端点 · 圆角连接",
    description: "设计 24px 图标时直接使用 1.5px 描边；输出到 20px 或 16px 时统一检查，并按小尺寸规范调整为 1px 描边。同一图标不要混用多种线宽，端点和转折保持圆润。",
  },
  {
    index: "03",
    title: "视差",
    callout: "不同形态分别校正",
    value: "默认圆角约 1.5px",
    description: "正方形、长形、圆形和三角形的视觉面积不同，需要在同一画布中分别微调大小与位置。普通转角可用约 1.5px 圆角，较大的外框统一使用约 2px 圆角；只有语义需要时才使用斜线。",
  },
  {
    index: "04",
    title: "命名",
    callout: "组件 PencilSimple",
    value: "SVG ic-pencil-simple.svg",
    description: "Figma 中保留可编辑描边的源组件；交付给页面的 SVG 副本需将描边轮廓化，避免不同环境出现线宽差异。代码组件使用 PascalCase，SVG 文件使用 ic-kebab-case.svg，Figma 组件使用 Icon / Name。",
  },
];

const iconCreationPaths = [
  {
    index: "A",
    title: "通过 Codex 对话生成",
    suitable: "适合规则明确、几何简单、需要快速补齐的功能图标。",
    steps: [
      "说明图标语义、使用场景、目标尺寸和参考图标。",
      "Codex 先查找可复用图标；确认缺失后生成 SVG 与组件代码。",
      "在页面中检查 16 / 20 / 24px、浅深背景和相邻图标对比。",
      "设计师确认形态后，将最终图标同步到 Figma 组件库。",
    ],
    handoff: "对话输入建议：语义 + 场景 + 参考图标 + 禁止出现的特征。",
  },
  {
    index: "B",
    title: "Figma 设计后交给 Codex 接入",
    suitable: "适合业务专属、形态复杂或需要设计师精细校正的图标。",
    steps: [
      "设计师在 24 × 24px 画布中完成源组件，并保留可编辑描边版本。",
      "复制交付版本，将描边轮廓化后导出 SVG，检查没有背景层和多余蒙版。",
      "提供 Figma 节点或 SVG 文件，并说明中文名、组件名和使用场景。",
      "Codex 统一 viewBox、currentColor、可访问名称并接入页面，再回传预览确认。",
    ],
    handoff: "交付内容：Figma 源组件 + 轮廓化 SVG + 中英文名称 + 使用场景。",
  },
];

const createDecorativeSvg = (title: string, content: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 54 54" fill="none" role="img" aria-label="${title}"><title>${title}</title>${content.replaceAll('stroke-width="3"', 'stroke-width="2"')}</svg>`;

const makeCommonIcon = (name: string, zhName: string, icon: PhosphorIcon): CommonIconItem => ({
  name,
  zhName,
  icon,
});

const shortIconName = (name: string) => {
  const aliases: Record<string, string> = {
    MagnifyingGlass: "Search",
    PencilSimple: "Edit",
    DownloadSimple: "Download",
    UploadSimple: "Upload",
    WarningCircle: "Warning",
    CheckCircle: "Check",
    ChatCircle: "Chat",
    ClipboardText: "Clipboard",
    ArrowClockwise: "Refresh",
    PaperPlaneRight: "Submit",
  };

  if (aliases[name]) return aliases[name];
  return name.length > 16 ? `${name.slice(0, 13)}...` : name;
};

const menuIcons: CommonIconItem[] = [
  makeCommonIcon("House", "首页", House),
  makeCommonIcon("GridFour", "工作台", GridFour),
  makeCommonIcon("Database", "数据管理", Database),
  makeCommonIcon("Users", "用户管理", Users),
  makeCommonIcon("ShieldCheck", "权限管理", ShieldCheck),
  makeCommonIcon("GearSix", "系统设置", GearSix),
  makeCommonIcon("ChartBar", "报表分析", ChartBar),
  makeCommonIcon("Monitor", "监控中心", Monitor),
  makeCommonIcon("Stack", "图层管理", Stack),
  makeCommonIcon("Folder", "项目管理", Folder),
  makeCommonIcon("ClipboardText", "订单管理", ClipboardText),
  makeCommonIcon("GitMerge", "合并", GitMerge),
];

const statusIcons = [
  { name: "CheckCircle", zhName: "操作完成", icon: CheckCircle, tone: "success" as const },
  { name: "WarningCircle", zhName: "检查配置", icon: WarningCircle, tone: "warning" as const },
  { name: "XCircle", zhName: "提交失败", icon: XCircle, tone: "danger" as const },
  { name: "Info", zhName: "系统提示", icon: Info, tone: "product" as const },
];

const functionIcons: CommonIconItem[] = [
  makeCommonIcon("Plus", "新增/创建", Plus),
  makeCommonIcon("PencilSimple", "编辑", PencilSimple),
  makeCommonIcon("Trash", "删除", Trash),
  makeCommonIcon("Eye", "查看/预览", Eye),
  makeCommonIcon("EyeSlash", "不可见", EyeSlash),
  makeCommonIcon("MagnifyingGlass", "搜索", MagnifyingGlass),
  makeCommonIcon("Funnel", "筛选", Funnel),
  makeCommonIcon("ArrowClockwise", "刷新", ArrowClockwise),
  makeCommonIcon("ArrowCounterClockwise", "重置", ArrowCounterClockwise),
  makeCommonIcon("UploadSimple", "上传", UploadSimple),
  makeCommonIcon("DownloadSimple", "下载", DownloadSimple),
  makeCommonIcon("FileArrowUp", "导入", FileArrowUp),
  makeCommonIcon("FileArrowDown", "导出", FileArrowDown),
  makeCommonIcon("Copy", "复制", Copy),
  makeCommonIcon("ShareNetwork", "分享", ShareNetwork),
  makeCommonIcon("PaperPlaneRight", "提交", PaperPlaneRight),
  makeCommonIcon("X", "关闭", X),
  makeCommonIcon("XCircle", "取消", XCircle),
  makeCommonIcon("CheckCircle", "确认/完成", CheckCircle),
  makeCommonIcon("SortAscending", "排序", SortAscending),
  makeCommonIcon("ArrowsOut", "放大", ArrowsOut),
  makeCommonIcon("ArrowsIn", "缩小", ArrowsIn),
  makeCommonIcon("Resize", "拖拽", Resize),
  makeCommonIcon("MapPin", "定位", MapPin),
  makeCommonIcon("ArrowLeft", "返回", ArrowLeft),
  makeCommonIcon("ArrowRight", "跳转", ArrowRight),
  makeCommonIcon("DotsThree", "更多", DotsThree),
  makeCommonIcon("GearSix", "设置", GearSix),
  makeCommonIcon("PushPin", "置顶", PushPin),
  makeCommonIcon("Star", "收藏", Star),
  makeCommonIcon("Flag", "标记", Flag),
  makeCommonIcon("Clipboard", "粘贴", Clipboard),
  makeCommonIcon("ArrowsClockwise", "重做", ArrowsClockwise),
  makeCommonIcon("Archive", "归档", Archive),
  makeCommonIcon("Prohibit", "禁用", Prohibit),
  makeCommonIcon("Lock", "锁定", Lock),
  makeCommonIcon("LockOpen", "解锁", LockOpen),
  makeCommonIcon("ShieldCheck", "授权", ShieldCheck),
  makeCommonIcon("ClipboardText", "审批", ClipboardText),
  makeCommonIcon("ChatCircle", "消息", ChatCircle),
  makeCommonIcon("Folder", "文件夹", Folder),
  makeCommonIcon("File", "文件", File),
  makeCommonIcon("ImageSquare", "图片", ImageSquare),
  makeCommonIcon("VideoCamera", "视频", VideoCamera),
  makeCommonIcon("Archive", "压缩包", Archive),
  makeCommonIcon("Printer", "打印", Printer),
  makeCommonIcon("QrCode", "二维码", QrCode),
  makeCommonIcon("ArrowsClockwise", "同步", ArrowsClockwise),
  makeCommonIcon("Repeat", "更新", Repeat),
  makeCommonIcon("SealCheck", "验证", SealCheck),
  makeCommonIcon("Pause", "暂停", Pause),
  makeCommonIcon("Play", "启动", Play),
  makeCommonIcon("LinkBreak", "解绑", LinkBreak),
  makeCommonIcon("Link", "连接", Link),
  makeCommonIcon("SignOut", "退出", SignOut),
  makeCommonIcon("Info", "提示", Info),
  makeCommonIcon("SpinnerGap", "加载中", SpinnerGap),
  makeCommonIcon("Empty", "不可用", Empty),
];

const decorativeIconStandards = [
  { item: "制作画布", standard: "48px × 48px，图形主体控制在 32px–36px 内，四周保留约 6px 安全边距。" },
  { item: "线条风格", standard: "黑色线性几何轮廓，默认描边 2px，端点尽量使用方形或平直收口。" },
  { item: "品牌点缀", standard: "每个图标仅保留 1 个红色点缀，使用 brand-600 (#FF112D)，面积控制在整体 5% 以内，不作为状态色使用。" },
  { item: "使用场景", standard: "用于首页、设计原则、空状态、模块入口、品牌展示等低频表达，不作为功能操作图标。" },
  { item: "输出格式", standard: "优先输出 SVG，保持可编辑、可缩放；进入 Figma 后需保持图层命名和同尺寸画板。" },
];

const decorativeIcons: DecorativeIconItem[] = [
  {
    name: "MaterialDiamond",
    zhName: "材料晶格",
    svg: createDecorativeSvg("MaterialDiamond", '<path d="M27 9L45 27L27 45L9 27L27 9Z" stroke="#1A1A1A" stroke-width="3"/><path d="M30 27H42" stroke="#FF112D" stroke-width="3"/>'),
  },
  {
    name: "DataPulse",
    zhName: "数据脉冲",
    svg: createDecorativeSvg("DataPulse", '<path d="M9 31H18L24 18L32 39L38 27H45" stroke="#1A1A1A" stroke-width="3"/><path d="M39 27H46" stroke="#FF112D" stroke-width="3"/>'),
  },
  {
    name: "SystemGrid",
    zhName: "系统网格",
    svg: createDecorativeSvg("SystemGrid", '<rect x="14" y="12" width="26" height="30" stroke="#1A1A1A" stroke-width="3"/><path d="M14 22H40" stroke="#1A1A1A" stroke-width="3"/><path d="M24 22V42" stroke="#1A1A1A" stroke-width="3"/><rect x="18" y="16" width="4" height="4" fill="#FF112D"/>'),
  },
  {
    name: "FocusSpark",
    zhName: "焦点识别",
    svg: createDecorativeSvg("FocusSpark", '<path d="M27 9V18M27 36V45M9 27H18M36 27H45M14.5 14.5L20.5 20.5M33.5 33.5L39.5 39.5M39.5 14.5L33.5 20.5M20.5 33.5L14.5 39.5" stroke="#1A1A1A" stroke-width="3"/><rect x="24" y="24" width="6" height="6" fill="#FF112D"/>'),
  },
  {
    name: "SupplyChain",
    zhName: "供应链",
    svg: createDecorativeSvg("SupplyChain", '<rect x="10" y="12" width="12" height="12" stroke="#1A1A1A" stroke-width="3"/><rect x="32" y="12" width="12" height="12" stroke="#1A1A1A" stroke-width="3"/><rect x="10" y="32" width="12" height="12" stroke="#1A1A1A" stroke-width="3"/><rect x="32" y="32" width="12" height="12" stroke="#1A1A1A" stroke-width="3"/><path d="M22 18H32M16 24V32M38 24V32M22 38H32" stroke="#1A1A1A" stroke-width="3"/><rect x="25" y="25" width="4" height="4" fill="#FF112D"/>'),
  },
  {
    name: "DesignPen",
    zhName: "设计标注",
    svg: createDecorativeSvg("DesignPen", '<path d="M15 12L35 17L40 32L28 43L20 35L15 12Z" stroke="#1A1A1A" stroke-width="3"/><path d="M28 43L24 31L35 17" stroke="#1A1A1A" stroke-width="3"/><rect x="39" y="19" width="6" height="4" fill="#FF112D"/>'),
  },
  {
    name: "SecurityShield",
    zhName: "安全可信",
    svg: createDecorativeSvg("SecurityShield", '<path d="M27 10L41 16V27C41 36 35 42 27 45C19 42 13 36 13 27V16L27 10Z" stroke="#1A1A1A" stroke-width="3"/><rect x="25" y="25" width="4" height="5" fill="#FF112D"/>'),
  },
  {
    name: "FactoryLine",
    zhName: "生产线",
    svg: createDecorativeSvg("FactoryLine", '<path d="M10 39H45" stroke="#1A1A1A" stroke-width="3"/><path d="M14 39V23L25 31V23L36 31V39" stroke="#1A1A1A" stroke-width="3"/><path d="M17 20V13H23V24" stroke="#1A1A1A" stroke-width="3"/><rect x="30" y="33" width="5" height="6" fill="#FF112D"/>'),
  },
  {
    name: "DashboardPanel",
    zhName: "数据看板",
    svg: createDecorativeSvg("DashboardPanel", '<rect x="11" y="13" width="32" height="28" stroke="#1A1A1A" stroke-width="3"/><path d="M11 23H43M22 23V41" stroke="#1A1A1A" stroke-width="3"/><path d="M28 34L33 29L39 35" stroke="#1A1A1A" stroke-width="3"/><rect x="15" y="17" width="4" height="4" fill="#FF112D"/>'),
  },
  {
    name: "Equipment",
    zhName: "设备管理",
    svg: createDecorativeSvg("Equipment", '<rect x="13" y="16" width="28" height="22" stroke="#1A1A1A" stroke-width="3"/><path d="M19 38V45M35 38V45M21 24H33M21 30H28" stroke="#1A1A1A" stroke-width="3"/><rect x="34" y="27" width="4" height="4" fill="#FF112D"/>'),
  },
  {
    name: "MaterialCube",
    zhName: "材料单元",
    svg: createDecorativeSvg("MaterialCube", '<path d="M27 10L42 18V36L27 44L12 36V18L27 10Z" stroke="#1A1A1A" stroke-width="3"/><path d="M12 18L27 27L42 18M27 27V44" stroke="#1A1A1A" stroke-width="3"/><rect x="33" y="19" width="4" height="4" fill="#FF112D"/>'),
  },
  {
    name: "SearchMaterial",
    zhName: "材料检索",
    svg: createDecorativeSvg("SearchMaterial", '<circle cx="24" cy="24" r="13" stroke="#1A1A1A" stroke-width="3"/><path d="M34 34L44 44" stroke="#1A1A1A" stroke-width="3"/><path d="M18 24H30M24 18V30" stroke="#1A1A1A" stroke-width="3"/><rect x="32" y="16" width="4" height="4" fill="#FF112D"/>'),
  },
  {
    name: "ModelFlow",
    zhName: "模型流程",
    svg: createDecorativeSvg("ModelFlow", '<rect x="10" y="13" width="12" height="12" stroke="#1A1A1A" stroke-width="3"/><rect x="32" y="29" width="12" height="12" stroke="#1A1A1A" stroke-width="3"/><path d="M22 19H30C34 19 36 21 36 25V29" stroke="#1A1A1A" stroke-width="3"/><rect x="33" y="14" width="5" height="5" fill="#FF112D"/>'),
  },
  {
    name: "DocumentSpec",
    zhName: "规范文档",
    svg: createDecorativeSvg("DocumentSpec", '<path d="M16 10H34L42 18V44H16V10Z" stroke="#1A1A1A" stroke-width="3"/><path d="M34 10V19H42M22 27H36M22 34H33" stroke="#1A1A1A" stroke-width="3"/><rect x="22" y="17" width="4" height="4" fill="#FF112D"/>'),
  },
  {
    name: "LayerStack",
    zhName: "产品分层",
    svg: createDecorativeSvg("LayerStack", '<path d="M27 10L44 19L27 28L10 19L27 10Z" stroke="#1A1A1A" stroke-width="3"/><path d="M14 27L27 34L40 27M14 35L27 42L40 35" stroke="#1A1A1A" stroke-width="3"/><rect x="39" y="18" width="4" height="4" fill="#FF112D"/>'),
  },
  {
    name: "PrecisionTarget",
    zhName: "精准匹配",
    svg: createDecorativeSvg("PrecisionTarget", '<circle cx="27" cy="27" r="16" stroke="#1A1A1A" stroke-width="3"/><circle cx="27" cy="27" r="7" stroke="#1A1A1A" stroke-width="3"/><path d="M27 6V14M27 40V48M6 27H14M40 27H48" stroke="#1A1A1A" stroke-width="3"/><rect x="25" y="25" width="4" height="4" fill="#FF112D"/>'),
  },
  {
    name: "DataSpace",
    zhName: "数据空间",
    svg: createDecorativeSvg("DataSpace", '<path d="M12 18L27 10L42 18V36L27 44L12 36V18Z" stroke="#1A1A1A" stroke-width="3"/><path d="M18 25H36M18 32H36M27 10V44" stroke="#1A1A1A" stroke-width="3"/><rect x="33" y="16" width="5" height="5" fill="#FF112D"/>'),
  },
  {
    name: "QualityCheck",
    zhName: "质量校验",
    svg: createDecorativeSvg("QualityCheck", '<rect x="12" y="12" width="30" height="30" stroke="#1A1A1A" stroke-width="3"/><path d="M19 28L25 34L36 21" stroke="#1A1A1A" stroke-width="3"/><rect x="16" y="16" width="5" height="5" fill="#FF112D"/>'),
  },
  {
    name: "ConnectNode",
    zhName: "节点连接",
    svg: createDecorativeSvg("ConnectNode", '<circle cx="16" cy="18" r="6" stroke="#1A1A1A" stroke-width="3"/><circle cx="38" cy="18" r="6" stroke="#1A1A1A" stroke-width="3"/><circle cx="27" cy="38" r="6" stroke="#1A1A1A" stroke-width="3"/><path d="M22 21L32 21M19 24L24 34M35 24L30 34" stroke="#1A1A1A" stroke-width="3"/><rect x="25" y="16" width="4" height="4" fill="#FF112D"/>'),
  },
  {
    name: "IndustrialOrder",
    zhName: "工业秩序",
    svg: createDecorativeSvg("IndustrialOrder", '<path d="M11 15H43M11 27H43M11 39H43" stroke="#1A1A1A" stroke-width="3"/><path d="M18 11V43M30 11V43" stroke="#1A1A1A" stroke-width="3"/><rect x="35" y="29" width="5" height="5" fill="#FF112D"/>'),
  },
];

function CustomIconRuleDiagram({
  index,
  callout,
  value,
}: {
  index: string;
  callout: string;
  value: string;
}) {
  const markerId = `annotation-arrow-${index}`;

  return (
    <div className="relative h-40 overflow-hidden border-b border-[var(--neutral-200)] bg-[var(--neutral-50)]">
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(var(--neutral-200) 1px, transparent 1px), linear-gradient(90deg, var(--neutral-200) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />
      {index === "01" ? (
        <div className="absolute left-5 top-1/2 h-28 w-28 -translate-y-1/2 border border-[var(--product-blue-300)] bg-[var(--product-blue-100)] p-[10px]">
          <div className="flex h-full w-full items-center justify-center overflow-hidden border border-[var(--success-border)] bg-[var(--success-bg)] text-[var(--text-body)]">
            <PencilSimple size={82} weight="regular" className="shrink-0" aria-hidden="true" />
          </div>
          <span className="absolute left-1 top-1 text-[9px] font-semibold text-[var(--product-blue-700)]">安全区</span>
          <span className="absolute bottom-4 left-[calc(50%+10px)] -translate-x-1/2 text-[9px] font-semibold text-[var(--success-text)]">绘制区</span>
        </div>
      ) : index === "03" ? (
        <div className="absolute left-5 top-1/2 grid h-24 w-44 -translate-y-1/2 grid-cols-4 items-center gap-2 border border-dashed border-[var(--neutral-400)] bg-white px-3 text-[var(--text-body)]">
          <VideoCamera size={30} weight="regular" aria-label="长方形：视频" />
          <Stack size={28} weight="regular" aria-label="正方形：图层" />
          <DownloadSimple size={28} weight="regular" aria-label="三角形：下载" />
          <MagnifyingGlass size={28} weight="regular" aria-label="圆形：搜索" />
        </div>
      ) : (
        <div className="absolute left-[18%] top-1/2 flex h-24 w-24 -translate-y-1/2 items-center justify-center border border-dashed border-[var(--neutral-400)] bg-white text-[var(--text-body)]">
          <PencilSimple size={56} weight="regular" aria-hidden="true" />
        </div>
      )}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 360 176"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <marker id={markerId} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="var(--product-blue-500)" />
          </marker>
        </defs>
        <path
          d={index === "03" ? "M302 52 H246 L192 88" : "M302 52 H246 L146 88"}
          fill="none"
          stroke="var(--product-blue-500)"
          strokeWidth="1.5"
          markerEnd={`url(#${markerId})`}
        />
      </svg>
      <div className="absolute right-4 top-5 min-w-32 border border-[var(--product-blue-200)] bg-white px-3 py-2 shadow-sm">
        <div className="text-xs font-semibold text-[var(--product-blue-600)]">{callout}</div>
        <div className="mt-1 text-xs text-[var(--text-secondary)]">{value}</div>
      </div>
      <div className="absolute bottom-3 right-3 text-[10px] font-semibold tracking-[0.14em] text-[var(--text-tertiary)]">
        24 × 24px FIGMA 画布
      </div>
    </div>
  );
}

function UsageExamplesSection() {
  const examples = [
    {
      index: "01",
      title: "独立图标",
      context: "空间有限、语义明确的快捷操作",
      preview: (
        <div className="flex gap-2">
          <Button size="md" variant="ghost" icon={<SystemIcon as={MagnifyingGlass} size={16} weight="regular" tone="neutral" label="搜索" />} aria-label="搜索" title="搜索" className="w-11 px-0 md:w-8" />
          <Button size="md" variant="ghost" icon={<SystemIcon as={GearSix} size={16} weight="regular" tone="neutral" label="设置" />} aria-label="设置" title="设置" className="w-11 px-0 md:w-8" />
        </div>
      ),
      rule: "使用 Button 的 md 规格：桌面端按钮背景框为 32 × 32px；触屏点击热区最小为 44 × 44px。内部搭配 16px 图标，并提供 Tooltip、title 或 aria-label。",
    },
    {
      index: "02",
      title: "图标 + 文字",
      context: "按钮、菜单、列表项与关键操作入口",
      preview: (
        <div className="flex flex-wrap gap-2">
          <Button size="md" icon={<SystemIcon as={Plus} size={16} weight="regular" tone="inherit" label="新增" />} iconPosition="left">新建数据</Button>
          <Button size="md" variant="outline" icon={<SystemIcon as={DownloadSimple} size={16} weight="regular" tone="inherit" label="导出" />}>导出报告</Button>
        </div>
      ),
      rule: "示例直接使用设计系统 Button 组件的 md 规格与 16px 左侧图标；图标补充语义，按钮文案承担主要表达。",
    },
  ];

  return (
    <section>
      <SectionHeading
        eyebrow="Usage Examples"
        title="图标使用示例"
        description="根据操作空间和理解成本，在独立图标与图标加文字两种方式中选择。状态图标统一收录在上方常用图标库中。"
      />
      <div className="mb-5 flex flex-wrap items-center gap-x-6 gap-y-2 border-l-2 border-[var(--product-blue-500)] bg-[var(--product-blue-50)] px-5 py-4 text-sm text-[var(--text-secondary)]">
        <span className="font-semibold text-[var(--text-primary)]">使用原则</span>
        <span>辅助识别，不替代清晰文案</span>
        <span>同组保持尺寸与权重一致</span>
        <span>交互图标必须提供可访问名称</span>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {examples.map((example) => (
          <article key={example.index} className="flex min-h-64 flex-col border border-[var(--neutral-200)] bg-white p-5">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <div className="mb-2 text-xs font-semibold tracking-[0.16em] text-[var(--product-blue-500)]">{example.index}</div>
                <h3 className="text-base font-semibold text-[var(--text-primary)]">{example.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-[var(--text-tertiary)]">{example.context}</p>
              </div>
            </div>
            <div className="mb-5 flex min-h-24 items-center bg-[var(--neutral-50)] p-4">{example.preview}</div>
            <p className="mt-auto border-t border-[var(--neutral-100)] pt-4 text-sm leading-relaxed text-[var(--text-secondary)]">{example.rule}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function IconCreationWorkflowsSection() {
  return (
    <section>
      <SectionHeading
        eyebrow="Two Workflows"
        title="两种图标新增方式"
        description="两条路径最终都要经过同一套小尺寸检查和页面预览，差别只在图标由谁先完成。"
      />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {iconCreationPaths.map((path) => (
          <article key={path.index} className="border border-[var(--neutral-200)] bg-white p-5 md:p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-[var(--product-blue-50)] text-sm font-semibold text-[var(--product-blue-600)]">{path.index}</div>
              <div>
                <h3 className="text-base font-semibold text-[var(--text-primary)]">{path.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">{path.suitable}</p>
              </div>
            </div>
            <ol className="mt-5 space-y-3 border-t border-[var(--neutral-100)] pt-5">
              {path.steps.map((step, stepIndex) => (
                <li key={step} className="flex gap-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                  <span className="font-mono text-xs text-[var(--product-blue-500)]">{String(stepIndex + 1).padStart(2, "0")}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <div className="mt-5 bg-[var(--neutral-50)] px-4 py-3 text-xs leading-5 text-[var(--text-tertiary)]">{path.handoff}</div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function IconPage() {
  const [copiedDecorativeIcon, setCopiedDecorativeIcon] = useState<string | null>(null);

  const copyDecorativeSvg = (item: DecorativeIconItem) => {
    navigator.clipboard.writeText(item.svg);
    setCopiedDecorativeIcon(item.name);
    setTimeout(() => setCopiedDecorativeIcon(null), 2000);
  };

  const downloadDecorativeSvg = (item: DecorativeIconItem) => {
    const blob = new Blob([item.svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${item.name}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-20">
      <PageHeader
        title="图标系统"
        description="新材道优先复用 Phosphor Icons 作为基础功能图标来源，但不受限于其完整图库；当业务语义没有合适图标时，可按统一规则设计自定义功能图标，并以自有装饰性图标补充品牌表达与模块识别。"
      />

      <section>
        <SectionHeading
          eyebrow="Icon Sizes"
          title="图标尺寸"
          description="以编辑图标为统一样本，直观比较不同尺寸的实际视觉比例。这里的尺寸指 SVG 画布的宽高，包含 Phosphor Icons 图形自带的安全留白；后台产品优先使用 16px / 20px 画布，展示场景可使用更大尺寸。"
        />
        <div className="grid grid-cols-2 gap-px overflow-hidden border border-[var(--neutral-200)] bg-[var(--neutral-200)] md:grid-cols-3 xl:grid-cols-6">
          {iconSizes.map((item) => (
            <article key={item.size} className="flex min-h-56 flex-col bg-white">
              <div className="flex min-h-32 flex-1 items-center justify-center bg-[var(--neutral-50)] text-[var(--text-body)]">
                <PencilSimple size={item.size} weight="regular" aria-hidden="true" />
              </div>
              <div className="border-t border-[var(--neutral-100)] p-4">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-xl font-semibold tabular-nums text-[var(--text-primary)]">{item.size}</span>
                  <span className="text-xs font-medium text-[var(--text-tertiary)]">px</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-[var(--text-secondary)]">{item.usage}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Custom Icon Design"
          title="图标设计规范"
          description="这套规范覆盖从提出需求、制作图标到页面接入的全过程。设计师可直接按 24px 画布操作，无需换算 SVG 内部坐标。"
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {customIconStandards.map((item) => (
            <article key={item.index} className="overflow-hidden border border-[var(--neutral-200)] bg-white">
              <CustomIconRuleDiagram index={item.index} callout={item.callout} value={item.value} />
              <div className="p-5">
                <div className="mb-3 flex items-center gap-3">
                  <span className="text-xs font-semibold tracking-[0.16em] text-[var(--product-blue-500)]">{item.index}</span>
                  <span className="h-px flex-1 bg-[var(--neutral-200)]" />
                </div>
                <h3 className="text-sm font-semibold text-[var(--text-primary)]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{item.description}</p>
              </div>
            </article>
          ))}
        </div>

      </section>

      <section>
        <SectionHeading eyebrow="Common Icons" title="常用图标库" />
        <div className="mb-6 space-y-2 text-sm leading-relaxed text-[var(--text-secondary)]">
          <p>
            这里展示的是设计系统沉淀后的高频常用图标，不是 Phosphor Icons
            的完整图标库。完整图标请
            {" "}
            <a
              href="https://phosphoricons.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--product-blue-500)] hover:text-[var(--product-blue-600)]"
            >
              前往 Phosphor Icons 官网检索
            </a>
            。
          </p>
        </div>
        <div className="space-y-10">
          <div>
            <div className="mb-4 flex items-end justify-between gap-4 border-b border-[var(--neutral-200)] pb-3">
              <div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">菜单图标</h3>
                <p className="mt-1 text-xs leading-relaxed text-[var(--text-tertiary)]">
                  用于左侧导航、顶部入口和后台模块菜单，保持 20px 尺寸与 regular 权重。
                </p>
              </div>
              <span className="text-xs text-[var(--text-tertiary)]">{menuIcons.length} 个</span>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-6">
              {menuIcons.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.zhName} className="group relative bg-white p-3">
                    <div className="mb-3 flex h-16 items-center justify-center rounded-sm bg-[var(--neutral-50)] text-[var(--text-body)]">
                      <Icon size={24} weight="regular" />
                    </div>
                    <div className="text-center">
                      <div className="text-xs font-medium text-[var(--text-primary)]">{item.zhName}</div>
                      <div className="mt-1 font-mono text-xs text-[var(--text-tertiary)]" title={item.name}>
                        {shortIconName(item.name)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-end justify-between gap-4 border-b border-[var(--neutral-200)] pb-3">
              <div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">功能图标</h3>
                <p className="mt-1 text-xs leading-relaxed text-[var(--text-tertiary)]">
                  覆盖表单、表格、流程、数据处理、权限、文件和反馈等高频操作；按显式白名单维护，一个语义只保留一个推荐图标。
                </p>
              </div>
              <span className="text-xs text-[var(--text-tertiary)]">{functionIcons.length} 个</span>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
              {functionIcons.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.zhName} className="group relative flex items-center gap-3 bg-white p-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-[var(--neutral-50)] text-[var(--text-body)]">
                      <Icon size={20} weight="regular" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-xs font-medium text-[var(--text-primary)]">{item.zhName}</div>
                      <div className="mt-0.5 truncate font-mono text-xs text-[var(--text-tertiary)]" title={item.name}>
                        {shortIconName(item.name)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-end justify-between gap-4 border-b border-[var(--neutral-200)] pb-3">
              <div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">状态图标</h3>
                <p className="mt-1 text-xs leading-relaxed text-[var(--text-tertiary)]">
                  用于结果反馈、风险提示和系统状态；必须与文字配合，不以颜色作为唯一信息载体。
                </p>
              </div>
              <span className="text-xs text-[var(--text-tertiary)]">{statusIcons.length} 个</span>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {statusIcons.map((item) => (
                <div key={item.name} className="flex items-center gap-3 bg-white p-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-[var(--neutral-50)]">
                    <SystemIcon as={item.icon} size={20} weight="regular" tone={item.tone} label={item.zhName} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-xs font-medium text-[var(--text-primary)]">{item.zhName}</div>
                    <div className="mt-0.5 truncate font-mono text-xs text-[var(--text-tertiary)]" title={item.name}>{item.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <UsageExamplesSection />

      <section>
        <SectionHeading
          eyebrow="Decorative Icons"
          title="装饰性图标"
          description="装饰性图标用于品牌表达、模块入口、设计原则、空状态和专题页视觉补充。它们不承担直接操作功能。"
        />
        <div className="mb-6">
          <DocsTable>
            <thead className="bg-[var(--neutral-50)] text-sm font-semibold text-[var(--text-primary)]">
              <tr className="border-b border-[var(--neutral-200)]">
                <th className="px-6 py-3 font-semibold">规范项</th>
                <th className="px-6 py-3 font-semibold">标准</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--neutral-100)] bg-white">
              {decorativeIconStandards.map((item) => (
                <tr key={item.item}>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-[var(--text-primary)]">
                    {item.item}
                  </td>
                  <td className="px-6 py-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {item.standard}
                  </td>
                </tr>
              ))}
            </tbody>
          </DocsTable>

        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-5">
          {decorativeIcons.map((item) => {
            const isCopied = copiedDecorativeIcon === item.name;
            return (
              <div key={item.name} className="group relative bg-white p-3">
                <div className="absolute right-2 top-2 z-10 flex gap-1 opacity-100 md:opacity-0 md:transition-opacity md:group-hover:opacity-100">
                  <button
                    type="button"
                    onClick={() => copyDecorativeSvg(item)}
                    title={isCopied ? "已复制" : "复制 SVG"}
                    aria-label={isCopied ? "已复制" : "复制 SVG"}
                    className="flex h-11 w-11 items-center justify-center rounded-sm bg-white text-[var(--text-tertiary)] hover:text-[var(--text-primary)] md:h-7 md:w-7"
                  >
                    {isCopied ? <Check size={14} weight="regular" /> : <Copy size={14} weight="regular" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => downloadDecorativeSvg(item)}
                    title="下载 SVG"
                    aria-label="下载 SVG"
                    className="flex h-11 w-11 items-center justify-center rounded-sm bg-white text-[var(--text-tertiary)] hover:text-[var(--text-primary)] md:h-7 md:w-7"
                  >
                    <DownloadSimple size={14} weight="regular" />
                  </button>
                </div>
                <div
                  className="mb-3 flex h-24 items-center justify-center bg-[var(--neutral-50)]"
                  dangerouslySetInnerHTML={{ __html: item.svg }}
                />
                <div className="text-center">
                  <div className="font-mono text-xs text-[var(--text-primary)]">{item.name}</div>
                  <div className="mt-1 text-xs text-[var(--text-tertiary)]">{item.zhName}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Governance" title="维护与交付原则" />
        <div className="bg-white p-6">
          <ul className="space-y-3 text-sm leading-relaxed text-[var(--text-secondary)]">
            <li>• <strong className="text-[var(--text-primary)]">Codex 维护：</strong>常用图标使用显式白名单，每项同时维护中文语义、Phosphor 组件名和组件引用；删除图标时同步删除对应导入，不保留隐藏候选项或占位 SVG。</li>
            <li>• <strong className="text-[var(--text-primary)]">前端使用：</strong>基础功能图标从 <code className="font-mono text-xs">@phosphor-icons/react</code> 引入，通过 <code className="font-mono text-xs">SystemIcon</code> 或业务组件传入；颜色跟随 <code className="font-mono text-xs">currentColor</code>，交互图标必须提供可访问名称。</li>
            <li>• <strong className="text-[var(--text-primary)]">Figma 导入：</strong>Phosphor 图标优先从官方 Figma 资源取得；自定义图标仅在确认 24 × 24px 画布、轮廓化描边、无背景层和多余蒙版、名称一致后导入。本页面不会自动执行 Figma 导入。</li>
            <li>• <strong className="text-[var(--text-primary)]">新增前检查：</strong>先检索 Phosphor Icons 和当前白名单；只有没有准确语义时才新增自定义图标，并在 16 / 20 / 24px 页面环境中完成视觉检查。</li>
          </ul>
        </div>
      </section>

      <IconCreationWorkflowsSection />
    </div>
  );
}
