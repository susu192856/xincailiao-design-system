import {
  Archive,
  ArrowClockwise,
  ArrowCounterClockwise,
  ArrowLeft,
  ArrowRight,
  ArrowSquareOut,
  ArrowsOutLineHorizontal,
  ArrowsClockwise,
  ArrowsCounterClockwise,
  ArrowsIn,
  ArrowsOut,
  Bell,
  CaretDown,
  ChartBar,
  ChatCircle,
  Check,
  CheckCircle,
  CheckSquare,
  Circle,
  Clipboard,
  ClipboardText,
  Copy,
  CreditCard,
  Cube,
  CursorText,
  Database,
  DotsThree,
  DownloadSimple,
  Empty,
  Eye,
  FileArchive,
  FileArrowDown,
  FileArrowUp,
  FileText,
  Flag,
  Folder,
  Funnel,
  GearSix,
  GitBranch,
  GitMerge,
  GridFour,
  House,
  Info,
  Link,
  LinkBreak,
  Lock,
  LockOpen,
  MagnifyingGlass,
  MagnifyingGlassMinus,
  MapPin,
  Monitor,
  Palette,
  PaperPlaneRight,
  Pause,
  PencilSimple,
  Play,
  Plus,
  Printer,
  Prohibit,
  PushPin,
  QrCode,
  Question,
  Repeat,
  Resize,
  RocketLaunch,
  SealCheck,
  Scissors,
  ShareNetwork,
  ShieldCheck,
  ShieldWarning,
  SignOut,
  SlidersHorizontal,
  Smiley,
  SortAscending,
  Square,
  SpinnerGap,
  Stack,
  Star,
  Table,
  Tag,
  TextT,
  Trash,
  UploadSimple,
  UserGear,
  Users,
  WarningCircle,
  WarningOctagon,
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
  svg: string;
};

type DecorativeIconItem = {
  name: string;
  zhName: string;
  svg: string;
};

const iconSizes = [
  { size: "12px", usage: "极弱辅助图标、表格内紧凑状态" },
  { size: "16px", usage: "默认内联图标、按钮图标、表单图标" },
  { size: "20px", usage: "导航图标、列表项图标、工具栏图标" },
  { size: "24px", usage: "卡片标题图标、模块入口图标" },
  { size: "32px", usage: "空状态、功能入口、轻量插图图标" },
  { size: "48px", usage: "营销模块、品牌展示、空状态主图标" },
];

const iconWeights = [
  { weight: "thin", usage: "不建议常规使用，仅用于大尺寸装饰" },
  { weight: "light", usage: "适合官网轻量视觉或大尺寸图标" },
  { weight: "regular", usage: "默认推荐，用于绝大多数界面" },
  { weight: "bold", usage: "用于重点强调、强提示、选中态" },
  { weight: "fill", usage: "用于状态确认、收藏、选中、实心反馈" },
  { weight: "duotone", usage: "用于官网展示、空状态、品牌化表达" },
];

const createSvg = (name: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256" data-phosphor-icon="${name}"><title>${name}</title><path d="M216,48V208H40V48ZM56,192H200V64H56Z"/></svg>`;

const createDecorativeSvg = (title: string, content: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 54 54" fill="none" role="img" aria-label="${title}"><title>${title}</title>${content.replaceAll('stroke-width="3"', 'stroke-width="2"')}</svg>`;

const makeCommonIcon = (name: string, zhName: string, icon: PhosphorIcon): CommonIconItem => ({
  name,
  zhName,
  icon,
  svg: createSvg(name),
});

const shortIconName = (name: string) => {
  const aliases: Record<string, string> = {
    ArrowsOutLineHorizontal: "Spacing",
    MagnifyingGlass: "Search",
    PencilSimple: "Edit",
    DownloadSimple: "Download",
    UploadSimple: "Upload",
    WarningCircle: "Warning",
    CheckCircle: "Check",
    ChatCircle: "Chat",
    CreditCard: "Card",
    ClipboardText: "Clipboard",
    ArrowsCounterClockwise: "Undo",
    ArrowClockwise: "Refresh",
    SlidersHorizontal: "Filter",
  };

  if (aliases[name]) return aliases[name];
  return name.length > 16 ? `${name.slice(0, 13)}...` : name;
};

const uniqueLabels = (labels: string[]) => Array.from(new Set(labels.map((label) => label.trim()).filter(Boolean)));

const normalizeFunctionIconLabel = (label: string) => {
  const aliases: Record<string, string> = {
    查看: "查看/预览",
    预览: "查看/预览",
    详情: "查看/预览",
    新增: "新增/创建",
    创建: "新增/创建",
    清空: "关闭/取消",
    关闭: "关闭/取消",
    取消: "关闭/取消",
    批量删除: "删除",
    克隆: "复制",
    取消置顶: "置顶",
    取消收藏: "收藏",
    取消标记: "标记",
    取消星标: "星标",
    打开: "",
    放大: "",
    前进: "",
    退出全屏: "",
    配置: "",
    自定义: "",
    固定: "",
    取消固定: "",
    修改: "",
    另存为: "",
    升级: "",
    扫描: "",
    测试: "",
    执行: "",
    拉取: "",
    数据导入: "",
    取消关联: "",
  };

  return aliases[label] ?? label;
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
  makeCommonIcon("Stack", "告警中心", Stack),
  makeCommonIcon("Folder", "项目管理", Folder),
  makeCommonIcon("ClipboardText", "订单管理", ClipboardText),
];

const functionIconLabels = uniqueLabels([
  "新增",
  "编辑",
  "删除",
  "查看",
  "搜索",
  "筛选",
  "刷新",
  "重置",
  "上传",
  "下载",
  "导入",
  "导出",
  "复制",
  "保存",
  "提交",
  "关闭",
  "确认",
  "取消",
  "展开",
  "收起",
  "排序",
  "清空",
  "全屏",
  "缩小",
  "拖拽",
  "移动",
  "定位",
  "返回",
  "跳转",
  "更多",
  "设置",
  "置顶",
  "取消置顶",
  "收藏",
  "取消收藏",
  "标记",
  "取消标记",
  "星标",
  "取消星标",
  "创建",
  "批量删除",
  "预览",
  "详情",
  "克隆",
  "粘贴",
  "剪切",
  "撤销",
  "重做",
  "完成",
  "继续",
  "下一步",
  "上一步",
  "发布",
  "撤回",
  "下架",
  "归档",
  "取消归档",
  "启用",
  "禁用",
  "停用",
  "恢复",
  "锁定",
  "解锁",
  "授权",
  "取消授权",
  "分配",
  "移交",
  "认领",
  "释放",
  "审批",
  "通过",
  "驳回",
  "退回",
  "转交",
  "加签",
  "抄送",
  "催办",
  "撤回审批",
  "批量导入",
  "批量导出",
  "模板下载",
  "文件上传",
  "文件夹",
  "附件",
  "图片",
  "视频",
  "压缩包",
  "打印",
  "分享",
  "发送",
  "转发",
  "复制链接",
  "打开链接",
  "扫码",
  "二维码",
  "同步",
  "异步",
  "更新",
  "回滚",
  "重试",
  "校验",
  "验证",
  "检测",
  "运行",
  "停止",
  "暂停",
  "启动",
  "重启",
  "调度",
  "定时",
  "订阅",
  "取消订阅",
  "推送",
  "合并",
  "拆分",
  "关联",
  "取消关联",
  "绑定",
  "解绑",
  "连接",
  "断开",
  "接入",
  "退出",
  "提交审核",
  "重新提交",
  "数据导出",
  "数据同步",
  "数据清洗",
  "数据加工",
  "数据转换",
  "数据映射",
  "数据匹配",
  "数据合并",
  "数据拆分",
  "数据去重",
  "数据校验",
  "数据标注",
  "数据脱敏",
  "数据加密",
  "数据解密",
  "数据备份",
  "数据恢复",
  "数据归档",
  "数据预览",
  "字段配置",
  "字段映射",
  "字段排序",
  "表头设置",
  "列设置",
  "显示列",
  "隐藏列",
  "冻结列",
  "批量操作",
  "批量编辑",
  "批量启用",
  "批量禁用",
  "批量发布",
  "批量下架",
  "批量审核",
  "批量分配",
  "批量下载",
  "批量上传",
  "批量同步",
  "导入记录",
  "导出记录",
  "操作记录",
  "变更记录",
  "审批记录",
  "登录记录",
  "访问记录",
  "异常记录",
  "任务记录",
  "运行记录",
  "版本记录",
  "刷新缓存",
  "清除缓存",
  "生成",
  "重新生成",
  "复制副本",
  "查看原文",
  "查看日志",
  "查看结果",
  "查看进度",
  "查看报告",
  "生成报告",
  "下载报告",
  "导出报告",
  "预警",
  "告警",
  "告警确认",
  "告警处理",
  "告警关闭",
  "风险提示",
  "异常提示",
  "成功",
  "失败",
  "错误",
  "警告",
  "提示",
  "帮助",
  "信息",
  "说明",
  "问号",
  "感叹号",
  "加载中",
  "空状态",
  "无数据",
  "无权限",
  "不可用",
].map(normalizeFunctionIconLabel));

const resolveFunctionIcon = (label: string): { name: string; icon: PhosphorIcon } => {
  if (label.includes("搜索")) return { name: "MagnifyingGlass", icon: MagnifyingGlass };
  if (label.includes("筛选")) return { name: "Funnel", icon: Funnel };
  if (label.includes("排序")) return { name: "SortAscending", icon: SortAscending };
  if (label.includes("刷新") || label.includes("重试") || label.includes("重新")) return { name: "ArrowClockwise", icon: ArrowClockwise };
  if (label.includes("重置") || label.includes("撤销")) return { name: "ArrowCounterClockwise", icon: ArrowCounterClockwise };
  if (label.includes("重做") || label.includes("同步") || label.includes("异步")) return { name: "ArrowsClockwise", icon: ArrowsClockwise };
  if (label.includes("上传")) return { name: "UploadSimple", icon: UploadSimple };
  if (label.includes("下载")) return { name: "DownloadSimple", icon: DownloadSimple };
  if (label.includes("导入")) return { name: "FileArrowUp", icon: FileArrowUp };
  if (label.includes("导出")) return { name: "FileArrowDown", icon: FileArrowDown };
  if (label === "粘贴") return { name: "Clipboard", icon: Clipboard };
  if (label === "剪切") return { name: "Scissors", icon: Scissors };
  if (label.includes("复制")) return { name: "Copy", icon: Copy };
  if (label.includes("保存")) return { name: "CheckSquare", icon: CheckSquare };
  if (label.includes("提交") || label.includes("发送") || label.includes("转发") || label.includes("推送")) return { name: "PaperPlaneRight", icon: PaperPlaneRight };
  if (label.includes("关闭") || label.includes("取消") || label.includes("清空")) return { name: "XCircle", icon: XCircle };
  if (label.includes("确认") || label.includes("通过") || label.includes("完成") || label.includes("成功")) return { name: "CheckCircle", icon: CheckCircle };
  if (label.includes("展开") || label.includes("全屏")) return { name: "ArrowsOut", icon: ArrowsOut };
  if (label.includes("收起") || label.includes("缩小")) return { name: "ArrowsIn", icon: ArrowsIn };
  if (label.includes("拖拽") || label.includes("移动")) return { name: "Resize", icon: Resize };
  if (label.includes("定位")) return { name: "MapPin", icon: MapPin };
  if (label.includes("返回") || label.includes("上一步")) return { name: "ArrowLeft", icon: ArrowLeft };
  if (label.includes("下一步") || label.includes("跳转")) return { name: "ArrowRight", icon: ArrowRight };
  if (label.includes("更多")) return { name: "DotsThree", icon: DotsThree };
  if (label.includes("设置") || label.includes("字段") || label.includes("表头") || label.includes("列设置")) return { name: "GearSix", icon: GearSix };
  if (label.includes("置顶")) return { name: "PushPin", icon: PushPin };
  if (label.includes("收藏") || label.includes("星标")) return { name: "Star", icon: Star };
  if (label.includes("标记")) return { name: "Flag", icon: Flag };
  if (label.includes("新增") || label.includes("创建")) return { name: "Plus", icon: Plus };
  if (label.includes("编辑") || label.includes("标注")) return { name: "PencilSimple", icon: PencilSimple };
  if (label.includes("删除") || label.includes("下架") || label.includes("清除")) return { name: "Trash", icon: Trash };
  if (label.includes("查看") || label.includes("预览") || label.includes("详情")) return { name: "Eye", icon: Eye };
  if (label.includes("审批") || label.includes("记录")) return { name: "ClipboardText", icon: ClipboardText };
  if (label.includes("发布")) return { name: "RocketLaunch", icon: RocketLaunch };
  if (label.includes("撤回") || label.includes("退回") || label.includes("回滚") || label.includes("恢复")) return { name: "ArrowsCounterClockwise", icon: ArrowsCounterClockwise };
  if (label.includes("归档") || label.includes("压缩包")) return { name: "Archive", icon: Archive };
  if (label.includes("启用") || label.includes("启动") || label.includes("运行")) return { name: "Play", icon: Play };
  if (label.includes("停用") || label.includes("停止") || label.includes("禁用")) return { name: "Prohibit", icon: Prohibit };
  if (label.includes("暂停")) return { name: "Pause", icon: Pause };
  if (label.includes("锁定") || label.includes("加密")) return { name: "Lock", icon: Lock };
  if (label.includes("解锁") || label.includes("解密")) return { name: "LockOpen", icon: LockOpen };
  if (label.includes("授权") || label.includes("权限") || label.includes("无权限")) return { name: "ShieldCheck", icon: ShieldCheck };
  if (label.includes("分配") || label.includes("移交") || label.includes("认领") || label.includes("释放") || label.includes("转交") || label.includes("抄送")) return { name: "UserGear", icon: UserGear };
  if (label.includes("驳回") || label.includes("失败") || label.includes("错误") || label.includes("异常")) return { name: "XCircle", icon: XCircle };
  if (label.includes("催办") || label.includes("订阅") || label.includes("告警") || label.includes("预警")) return { name: "Bell", icon: Bell };
  if (label.includes("文件夹")) return { name: "Folder", icon: Folder };
  if (label.includes("附件") || label.includes("图片") || label.includes("视频") || label.includes("模板")) return { name: "FileText", icon: FileText };
  if (label.includes("打印")) return { name: "Printer", icon: Printer };
  if (label.includes("分享")) return { name: "ShareNetwork", icon: ShareNetwork };
  if (label.includes("链接") || label.includes("关联") || label.includes("绑定") || label.includes("连接") || label.includes("接入")) return { name: "Link", icon: Link };
  if (label.includes("解绑") || label.includes("断开")) return { name: "LinkBreak", icon: LinkBreak };
  if (label.includes("扫码") || label.includes("二维码")) return { name: "QrCode", icon: QrCode };
  if (label.includes("更新")) return { name: "Repeat", icon: Repeat };
  if (label.includes("校验") || label.includes("验证") || label.includes("检测")) return { name: "SealCheck", icon: SealCheck };
  if (label.includes("调度") || label.includes("定时") || label.includes("任务")) return { name: "ChartBar", icon: ChartBar };
  if (label.includes("合并")) return { name: "GitMerge", icon: GitMerge };
  if (label.includes("拆分")) return { name: "GitBranch", icon: GitBranch };
  if (label.includes("数据")) return { name: "Database", icon: Database };
  if (label.includes("批量")) return { name: "Stack", icon: Stack };
  if (label.includes("风险") || label.includes("警告") || label.includes("感叹号")) return { name: "WarningCircle", icon: WarningCircle };
  if (label.includes("提示") || label.includes("信息") || label.includes("说明") || label.includes("帮助") || label.includes("问号")) return { name: "Info", icon: Info };
  if (label.includes("加载")) return { name: "SpinnerGap", icon: SpinnerGap };
  if (label.includes("空状态") || label.includes("无数据") || label.includes("不可用")) return { name: "Empty", icon: Empty };
  if (label.includes("退出")) return { name: "SignOut", icon: SignOut };
  return { name: "Square", icon: Square };
};

const functionIcons: CommonIconItem[] = functionIconLabels.map((label) => {
  const resolved = resolveFunctionIcon(label);
  return makeCommonIcon(resolved.name, label, resolved.icon);
});

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

export default function IconPage() {
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null);
  const [copiedDecorativeIcon, setCopiedDecorativeIcon] = useState<string | null>(null);

  const copySvg = (item: CommonIconItem) => {
    navigator.clipboard.writeText(item.svg);
    setCopiedIcon(item.zhName);
    setTimeout(() => setCopiedIcon(null), 2000);
  };

  const downloadCommonSvg = (item: CommonIconItem) => {
    const blob = new Blob([item.svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${item.zhName}-${item.name}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

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
        description="本设计系统统一采用 Phosphor Icons，作为官网、门户和后台产品的基础图标库，保证图标风格一致、线性克制、识别清晰。"
      />

      <section>
        <SectionHeading
          eyebrow="Icon Source"
          title="图标库说明"
          description="基础功能图标统一来自 Phosphor Icons；装饰性图标作为新材道自有视觉资产补充，用于品牌表达和模块识别。"
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          <div className="bg-white p-5">
            <div className="mb-2 text-xs font-semibold text-[var(--neutral-500)]">图标库名称</div>
            <a
              href="https://phosphoricons.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-[var(--product-blue-500)] hover:text-[var(--product-blue-600)]"
            >
              Phosphor Icons
            </a>
            <p className="mt-3 text-[10px] leading-relaxed text-[var(--neutral-500)]">
              访问说明：如官网无法正常打开或图标加载失败，可使用魔法访问。
            </p>
          </div>
          {[
            ["React 包名", "@phosphor-icons/react"],
            ["默认尺寸", "16px / 20px / 24px"],
            ["默认颜色", "neutral-700"],
            ["激活态颜色", "white"],
            ["强调色", "product-blue-500 或 brand-600，按业务场景谨慎使用"],
          ].map(([label, value]) => (
            <div key={label} className="bg-white p-5">
              <div className="mb-2 text-xs font-semibold text-[var(--neutral-500)]">{label}</div>
              <div className="font-mono text-sm text-[var(--neutral-900)]">{value}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Icon Sizes"
          title="图标尺寸规范"
          description="图标尺寸与使用场景绑定。后台产品优先 16px / 20px，官网展示和空状态可使用更大尺寸。"
        />
        <DocsTable>
          <thead className="bg-[var(--neutral-50)] text-sm font-semibold text-[var(--neutral-900)]">
            <tr className="border-b border-[var(--neutral-200)]">
              <th className="px-6 py-3 font-semibold">尺寸</th>
              <th className="px-6 py-3 font-semibold">使用场景</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--neutral-200)] bg-white">
            {iconSizes.map((item) => (
              <tr key={item.size}>
                <td className="whitespace-nowrap px-6 py-4 font-mono text-xs text-[var(--neutral-600)]">
                  {item.size}
                </td>
                <td className="px-6 py-4 text-sm text-[var(--neutral-700)]">{item.usage}</td>
              </tr>
            ))}
          </tbody>
        </DocsTable>
      </section>

      <section>
        <SectionHeading
          eyebrow="Icon Weights"
          title="图标权重规范"
          description="默认使用 regular 权重，避免同一区域混用过多粗细。大尺寸展示可使用 light 或 duotone。"
        />
        <DocsTable>
          <thead className="bg-[var(--neutral-50)] text-sm font-semibold text-[var(--neutral-900)]">
            <tr className="border-b border-[var(--neutral-200)]">
              <th className="px-6 py-3 font-semibold">权重</th>
              <th className="px-6 py-3 font-semibold">使用建议</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--neutral-200)] bg-white">
            {iconWeights.map((item) => (
              <tr key={item.weight}>
                <td className="whitespace-nowrap px-6 py-4 font-mono text-xs text-[var(--neutral-600)]">
                  {item.weight}
                </td>
                <td className="px-6 py-4 text-sm text-[var(--neutral-700)]">{item.usage}</td>
              </tr>
            ))}
          </tbody>
        </DocsTable>
      </section>

      <section>
        <SectionHeading eyebrow="Principles" title="图标使用原则" />
        <div className="bg-white p-6">
          <ol className="list-decimal space-y-3 pl-5 text-sm leading-relaxed text-[var(--neutral-700)]">
            <li>默认使用 regular 权重</li>
            <li>同一区域内不要混用过多权重</li>
            <li>后台产品优先使用 16px / 20px</li>
            <li>官网展示模块可使用 24px / 32px</li>
            <li>图标颜色优先使用中性灰，不要滥用品牌红</li>
            <li>图标必须服务于识别和操作，不作为纯装饰堆叠</li>
          </ol>
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Usage Examples"
          title="图标使用示例"
          description="图标必须辅助识别和操作。状态图标需要配合文字或标签，不应只依赖颜色传达信息。"
        />
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="bg-white p-5">
            <h3 className="mb-4 text-base font-semibold text-[var(--neutral-900)]">A. 单独使用</h3>
            <div className="mb-4 flex gap-3">
              <Button variant="ghost" icon={<SystemIcon as={MagnifyingGlass} size={20} weight="regular" tone="neutral" label="搜索" />} aria-label="搜索" className="h-10 w-11 min-w-11 px-0 md:w-10 md:min-w-10" />
              <Button variant="ghost" icon={<SystemIcon as={GearSix} size={20} weight="regular" tone="neutral" label="设置" />} aria-label="设置" className="h-10 w-11 min-w-11 px-0 md:w-10 md:min-w-10" />
            </div>
            <p className="text-sm leading-relaxed text-[var(--neutral-600)]">
              适用于工具栏、表格操作、卡片入口、状态提示等场景。
            </p>
          </div>
          <div className="bg-white p-5">
            <h3 className="mb-4 text-base font-semibold text-[var(--neutral-900)]">B. 图标 + 文字</h3>
            <div className="mb-4 space-y-3">
              <Button icon={<SystemIcon as={Plus} size={16} weight="regular" label="新增" />} iconPosition="left">新建数据</Button>
              <Button variant="outline" icon={<SystemIcon as={DownloadSimple} size={16} weight="regular" tone="neutral" label="导出" />}>导出报告</Button>
              <Button variant="text" tone="product" icon={<SystemIcon as={FileText} size={16} weight="regular" tone="product" label="详情" />}>查看详情</Button>
            </div>
            <p className="text-sm leading-relaxed text-[var(--neutral-600)]">
              适用于按钮、菜单、列表项、导航入口等场景。
            </p>
          </div>
          <div className="bg-white p-5">
            <h3 className="mb-4 text-base font-semibold text-[var(--neutral-900)]">C. 状态图标</h3>
            <div className="mb-4 space-y-3 text-sm">
              <div className="flex items-center gap-2 text-[var(--neutral-700)]">
                <SystemIcon as={CheckCircle} size={20} weight="regular" tone="success" label="成功" />
                成功：操作已完成
              </div>
              <div className="flex items-center gap-2 text-[var(--neutral-700)]">
                <SystemIcon as={WarningCircle} size={20} weight="regular" tone="warning" label="警告" />
                警告：请检查配置
              </div>
              <div className="flex items-center gap-2 text-[var(--neutral-700)]">
                <SystemIcon as={XCircle} size={20} weight="regular" tone="danger" label="错误" />
                错误：提交失败
              </div>
              <div className="flex items-center gap-2 text-[var(--neutral-700)]">
                <SystemIcon as={Info} size={20} weight="regular" tone="product" label="信息" />
                信息：系统提示
              </div>
            </div>
            <p className="text-sm leading-relaxed text-[var(--neutral-600)]">
              状态图标必须和文字或状态标签配合使用，避免只依赖颜色传达信息。
            </p>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Common Icons" title="常用图标库" />
        <div className="mb-6 space-y-2 text-sm leading-relaxed text-[var(--neutral-600)]">
          <p>
            这里展示的是设计系统沉淀后的高频常用图标，不是 Phosphor Icons
            的完整图标库。完整图标请前往{" "}
            <a
              href="https://phosphoricons.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--product-blue-500)] hover:text-[var(--product-blue-600)]"
            >
              Phosphor Icons
            </a>{" "}
            官网检索。
          </p>
        </div>
        <div className="space-y-10">
          <div>
            <div className="mb-4 flex items-end justify-between gap-4 border-b border-[var(--neutral-200)] pb-3">
              <div>
                <h3 className="text-lg font-semibold text-[var(--neutral-900)]">菜单图标</h3>
                <p className="mt-1 text-xs leading-relaxed text-[var(--neutral-500)]">
                  用于左侧导航、顶部入口和后台模块菜单，保持 20px 尺寸与 regular 权重。
                </p>
              </div>
              <span className="text-xs text-[var(--neutral-500)]">{menuIcons.length} 个</span>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-6">
              {menuIcons.map((item) => {
                const Icon = item.icon;
                const isCopied = copiedIcon === item.zhName;
                return (
                  <div key={item.zhName} className="group relative bg-white p-3">
                    <div className="absolute right-2 top-2 z-10 flex gap-1 opacity-100 md:opacity-0 md:transition-opacity md:group-hover:opacity-100">
                      <button
                        type="button"
                        onClick={() => copySvg(item)}
                        title={isCopied ? "已复制" : "复制 SVG"}
                        aria-label={isCopied ? "已复制" : "复制 SVG"}
                        className="flex h-11 w-11 items-center justify-center rounded-sm bg-white text-[var(--neutral-600)] hover:text-[var(--neutral-900)] md:h-7 md:w-7"
                      >
                        {isCopied ? <Check size={14} weight="regular" /> : <Copy size={14} weight="regular" />}
                      </button>
                      <button
                        type="button"
                        onClick={() => downloadCommonSvg(item)}
                        title="下载 SVG"
                        aria-label="下载 SVG"
                        className="flex h-11 w-11 items-center justify-center rounded-sm bg-white text-[var(--neutral-600)] hover:text-[var(--neutral-900)] md:h-7 md:w-7"
                      >
                        <DownloadSimple size={14} weight="regular" />
                      </button>
                    </div>
                    <div className="mb-3 flex h-16 items-center justify-center rounded-sm bg-[var(--neutral-50)] text-[var(--neutral-800)]">
                      <Icon size={24} weight="regular" />
                    </div>
                    <div className="text-center">
                      <div className="text-xs font-medium text-[var(--neutral-900)]">{item.zhName}</div>
                      <div className="mt-1 font-mono text-[10px] text-[var(--neutral-500)]" title={item.name}>
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
                <h3 className="text-lg font-semibold text-[var(--neutral-900)]">功能图标</h3>
                <p className="mt-1 text-xs leading-relaxed text-[var(--neutral-500)]">
                  覆盖表单、表格、流程、数据处理、权限、文件和反馈等高频操作；重复语义已自动去重。
                </p>
              </div>
              <span className="text-xs text-[var(--neutral-500)]">{functionIcons.length} 个</span>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
              {functionIcons.map((item) => {
                const Icon = item.icon;
                const isCopied = copiedIcon === item.zhName;
                return (
                  <div key={item.zhName} className="group relative flex items-center gap-3 bg-white p-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-[var(--neutral-50)] text-[var(--neutral-800)]">
                      <Icon size={20} weight="regular" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-xs font-medium text-[var(--neutral-900)]">{item.zhName}</div>
                      <div className="mt-0.5 truncate font-mono text-[10px] text-[var(--neutral-500)]" title={item.name}>
                        {shortIconName(item.name)}
                      </div>
                    </div>
                    <div className="absolute right-2 top-2 z-10 flex gap-1 opacity-100 md:opacity-0 md:transition-opacity md:group-hover:opacity-100">
                      <button
                        type="button"
                        onClick={() => copySvg(item)}
                        title={isCopied ? "已复制" : "复制 SVG"}
                        aria-label={isCopied ? "已复制" : "复制 SVG"}
                        className="flex h-11 w-11 items-center justify-center rounded-sm bg-white text-[var(--neutral-600)] hover:text-[var(--neutral-900)] md:h-6 md:w-6"
                      >
                        {isCopied ? <Check size={13} weight="regular" /> : <Copy size={13} weight="regular" />}
                      </button>
                      <button
                        type="button"
                        onClick={() => downloadCommonSvg(item)}
                        title="下载 SVG"
                        aria-label="下载 SVG"
                        className="flex h-11 w-11 items-center justify-center rounded-sm bg-white text-[var(--neutral-600)] hover:text-[var(--neutral-900)] md:h-6 md:w-6"
                      >
                        <DownloadSimple size={13} weight="regular" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Decorative Icons"
          title="装饰性图标"
          description="装饰性图标用于品牌表达、模块入口、设计原则、空状态和专题页视觉补充。它们不承担直接操作功能。"
        />
        <div className="mb-6 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
          <DocsTable>
            <thead className="bg-[var(--neutral-50)] text-sm font-semibold text-[var(--neutral-900)]">
              <tr className="border-b border-[var(--neutral-200)]">
                <th className="px-6 py-3 font-semibold">规范项</th>
                <th className="px-6 py-3 font-semibold">标准</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--neutral-200)] bg-white">
              {decorativeIconStandards.map((item) => (
                <tr key={item.item}>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-[var(--neutral-900)]">
                    {item.item}
                  </td>
                  <td className="px-6 py-4 text-sm leading-relaxed text-[var(--neutral-700)]">
                    {item.standard}
                  </td>
                </tr>
              ))}
            </tbody>
          </DocsTable>

          <div className="bg-white p-6">
            <div className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--neutral-500)]">
              Style DNA
            </div>
            <div className="grid grid-cols-3 gap-3">
              {decorativeIcons.slice(0, 6).map((item) => (
                <div
                  key={item.name}
                  className="flex h-20 items-center justify-center bg-[var(--neutral-50)]"
                  dangerouslySetInnerHTML={{ __html: item.svg }}
                />
              ))}
            </div>
            <p className="mt-5 text-xs leading-relaxed text-[var(--neutral-600)]">
              同一组装饰性图标需保持 48px 画布、2px 描边和红色点缀比例一致，避免出现插画化、面性填充或过度细节。
            </p>
          </div>
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
                    className="flex h-11 w-11 items-center justify-center rounded-sm bg-white text-[var(--neutral-600)] hover:text-[var(--neutral-900)] md:h-7 md:w-7"
                  >
                    {isCopied ? <Check size={14} weight="regular" /> : <Copy size={14} weight="regular" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => downloadDecorativeSvg(item)}
                    title="下载 SVG"
                    aria-label="下载 SVG"
                    className="flex h-11 w-11 items-center justify-center rounded-sm bg-white text-[var(--neutral-600)] hover:text-[var(--neutral-900)] md:h-7 md:w-7"
                  >
                    <DownloadSimple size={14} weight="regular" />
                  </button>
                </div>
                <div
                  className="mb-3 flex h-24 items-center justify-center bg-[var(--neutral-50)]"
                  dangerouslySetInnerHTML={{ __html: item.svg }}
                />
                <div className="text-center">
                  <div className="font-mono text-xs text-[var(--neutral-900)]">{item.name}</div>
                  <div className="mt-1 text-xs text-[var(--neutral-500)]">{item.zhName}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Workflow" title="如何新增常用图标" />
        <div className="bg-white p-6">
          <ol className="list-decimal space-y-3 pl-5 text-sm leading-relaxed text-[var(--neutral-700)]">
            <li>在 Phosphor Icons 官网搜索需要的图标。</li>
            <li>确认图标语义是否清晰，不要只因为好看而添加。</li>
            <li>记录图标英文名和中文名。</li>
            <li>
              在 Codex 中提出新增需求，例如：“请在 IconPage 的常用图标库中新增
              Database，中文名为数据资产。”
            </li>
            <li>
              Codex 会自动在{" "}
              <span className="font-mono text-xs text-[var(--neutral-900)]">
                src/pages/design-system/IconPage.tsx
              </span>{" "}
              中添加图标。
            </li>
            <li>页面检查无误后，在 Figma 设计组件库中同步新增同名图标组件。</li>
            <li>保持 Codex 里的常用图标库和 Figma 里的图标组件库名称一致。</li>
          </ol>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Governance" title="常用图标库管理原则" />
        <div className="bg-white p-6">
          <ul className="space-y-3 text-sm leading-relaxed text-[var(--neutral-700)]">
            <li>• Phosphor Icons 是完整图标源。</li>
            <li>• 设计系统中的“常用图标库”是公司沉淀后的高频图标集合。</li>
            <li>• 不建议把 Phosphor 全量图标搬进设计系统页面。</li>
            <li>• 常用图标库应控制规模，优先维护 80–150 个高频图标。</li>
            <li>• 新增图标前，应先检查常用图标库是否已有相同语义图标。</li>
            <li>• 同一语义只保留一个主推荐图标，避免 Home / House / Buildings 等多图标混用。</li>
            <li>
              • 对业务高频图标可以按分类管理，例如：基础导航、数据操作、文件文档、状态反馈、系统设置、图表分析、用户组织、工业材料业务。
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
