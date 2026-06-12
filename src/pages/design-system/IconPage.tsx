import {
  ArrowsOutLineHorizontal,
  CaretDown,
  ChartBar,
  ChatCircle,
  Check,
  CheckCircle,
  Circle,
  Copy,
  CreditCard,
  Cube,
  CursorText,
  DownloadSimple,
  FileText,
  GearSix,
  GridFour,
  House,
  Info,
  MagnifyingGlass,
  Palette,
  PencilSimple,
  Plus,
  Smiley,
  Square,
  Table,
  Tag,
  TextT,
  Trash,
  UploadSimple,
  WarningCircle,
  XCircle,
} from "@phosphor-icons/react";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import { useState } from "react";
import DocsTable from "../../components/docs/DocsTable";
import { SectionHeading } from "../../components/docs/ComponentDoc";
import PageHeader from "../../components/docs/PageHeader";
import { Icon as SystemIcon } from "../../components/ui";

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

const commonIcons: CommonIconItem[] = [
  { name: "House", zhName: "首页", icon: House, svg: createSvg("House") },
  { name: "GridFour", zhName: "布局 / 模块", icon: GridFour, svg: createSvg("GridFour") },
  { name: "Palette", zhName: "颜色", icon: Palette, svg: createSvg("Palette") },
  { name: "TextT", zhName: "字体", icon: TextT, svg: createSvg("TextT") },
  { name: "Smiley", zhName: "图标", icon: Smiley, svg: createSvg("Smiley") },
  { name: "ArrowsOutLineHorizontal", zhName: "间距", icon: ArrowsOutLineHorizontal, svg: createSvg("ArrowsOutLineHorizontal") },
  { name: "Cube", zhName: "阴影 / 组件", icon: Cube, svg: createSvg("Cube") },
  { name: "Circle", zhName: "圆角", icon: Circle, svg: createSvg("Circle") },
  { name: "Square", zhName: "按钮 / 容器", icon: Square, svg: createSvg("Square") },
  { name: "CursorText", zhName: "输入框", icon: CursorText, svg: createSvg("CursorText") },
  { name: "CaretDown", zhName: "选择器", icon: CaretDown, svg: createSvg("CaretDown") },
  { name: "Table", zhName: "表格", icon: Table, svg: createSvg("Table") },
  { name: "CreditCard", zhName: "卡片", icon: CreditCard, svg: createSvg("CreditCard") },
  { name: "ChatCircle", zhName: "弹窗 / 消息", icon: ChatCircle, svg: createSvg("ChatCircle") },
  { name: "Tag", zhName: "标签", icon: Tag, svg: createSvg("Tag") },
  { name: "FileText", zhName: "文档", icon: FileText, svg: createSvg("FileText") },
  { name: "ChartBar", zhName: "图表", icon: ChartBar, svg: createSvg("ChartBar") },
  { name: "GearSix", zhName: "设置", icon: GearSix, svg: createSvg("GearSix") },
  { name: "MagnifyingGlass", zhName: "搜索", icon: MagnifyingGlass, svg: createSvg("MagnifyingGlass") },
  { name: "Plus", zhName: "新增", icon: Plus, svg: createSvg("Plus") },
  { name: "PencilSimple", zhName: "编辑", icon: PencilSimple, svg: createSvg("PencilSimple") },
  { name: "Trash", zhName: "删除", icon: Trash, svg: createSvg("Trash") },
  { name: "DownloadSimple", zhName: "下载", icon: DownloadSimple, svg: createSvg("DownloadSimple") },
  { name: "UploadSimple", zhName: "上传", icon: UploadSimple, svg: createSvg("UploadSimple") },
  { name: "CheckCircle", zhName: "成功", icon: CheckCircle, svg: createSvg("CheckCircle") },
  { name: "WarningCircle", zhName: "警告", icon: WarningCircle, svg: createSvg("WarningCircle") },
  { name: "XCircle", zhName: "错误", icon: XCircle, svg: createSvg("XCircle") },
  { name: "Info", zhName: "信息", icon: Info, svg: createSvg("Info") },
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

export default function IconPage() {
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null);
  const [copiedDecorativeIcon, setCopiedDecorativeIcon] = useState<string | null>(null);

  const copySvg = (item: CommonIconItem) => {
    navigator.clipboard.writeText(item.svg);
    setCopiedIcon(item.name);
    setTimeout(() => setCopiedIcon(null), 2000);
  };

  const downloadCommonSvg = (item: CommonIconItem) => {
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
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
          <div className="bg-white p-5">
            <h3 className="mb-4 text-base font-semibold text-[var(--neutral-900)]">A. 单独使用</h3>
            <div className="mb-4 flex gap-3">
              <button className="flex h-10 w-10 items-center justify-center rounded-none border border-[var(--neutral-300)] text-[var(--neutral-800)]">
                <SystemIcon as={MagnifyingGlass} size={20} weight="regular" tone="neutral" label="搜索" />
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-none border border-[var(--neutral-300)] text-[var(--neutral-800)]">
                <SystemIcon as={GearSix} size={20} weight="regular" tone="neutral" label="设置" />
              </button>
            </div>
            <p className="text-sm leading-relaxed text-[var(--neutral-600)]">
              适用于工具栏、表格操作、卡片入口、状态提示等场景。
            </p>
          </div>
          <div className="bg-white p-5">
            <h3 className="mb-4 text-base font-semibold text-[var(--neutral-900)]">B. 图标 + 文字</h3>
            <div className="mb-4 space-y-3">
              <button className="flex items-center gap-2 bg-[var(--neutral-900)] px-4 py-2 text-sm text-white">
                <SystemIcon as={Plus} size={16} weight="regular" className="text-white" label="新增" />
                新建数据
              </button>
              <button className="flex items-center gap-2 rounded-none border border-[var(--neutral-300)] px-4 py-2 text-sm text-[var(--neutral-700)]">
                <SystemIcon as={DownloadSimple} size={16} weight="regular" tone="neutral" label="导出" />
                导出报告
              </button>
              <button className="flex items-center gap-2 text-sm text-[var(--product-blue-500)]">
                <SystemIcon as={FileText} size={16} weight="regular" tone="product" label="详情" />
                查看详情
              </button>
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
          <div className="bg-white p-5">
            <h3 className="mb-4 text-base font-semibold text-[var(--neutral-900)]">D. 组件状态</h3>
            <div className="mb-4 space-y-3 text-sm">
              {[
                { label: "默认", helper: "neutral / regular", icon: <SystemIcon as={Square} size={20} weight="regular" tone="neutral" label="默认图标" /> },
                { label: "激活", helper: "product / regular", icon: <SystemIcon as={Square} size={20} weight="regular" tone="product" label="激活图标" /> },
                { label: "关键节点", helper: "neutral + redMark", icon: <SystemIcon as={Square} size={20} weight="regular" tone="neutral" redMark label="关键节点图标" /> },
                { label: "禁用", helper: "disabled opacity", icon: <SystemIcon as={Square} size={20} weight="regular" tone="neutral" disabled label="禁用图标" /> },
              ].map((item) => (
                <div key={item.label} className="grid grid-cols-[24px_64px_1fr] items-center gap-3">
                  {item.icon}
                  <span className="font-medium text-[var(--neutral-900)]">{item.label}</span>
                  <span className="text-xs text-[var(--neutral-500)]">{item.helper}</span>
                </div>
              ))}
            </div>
            <p className="text-sm leading-relaxed text-[var(--neutral-600)]">
              组件状态应由 tone、disabled、redMark 明确表达。红色短线只表示关键节点，不替代错误、警告或成功语义。
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
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-6">
          {commonIcons.map((item) => {
            const Icon = item.icon;
            const isCopied = copiedIcon === item.name;
            return (
              <div key={item.name} className="group relative bg-white p-3">
                <div className="absolute right-2 top-2 z-10 flex gap-1 opacity-100 md:opacity-0 md:transition-opacity md:group-hover:opacity-100">
                  <button
                    type="button"
                    onClick={() => copySvg(item)}
                    title={isCopied ? "已复制" : "复制 SVG"}
                    aria-label={isCopied ? "已复制" : "复制 SVG"}
                    className="flex h-7 w-7 items-center justify-center rounded-sm bg-white text-[var(--neutral-600)] hover:text-[var(--neutral-900)]"
                  >
                    {isCopied ? <Check size={14} weight="regular" /> : <Copy size={14} weight="regular" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => downloadCommonSvg(item)}
                    title="下载 SVG"
                    aria-label="下载 SVG"
                    className="flex h-7 w-7 items-center justify-center rounded-sm bg-white text-[var(--neutral-600)] hover:text-[var(--neutral-900)]"
                  >
                    <DownloadSimple size={14} weight="regular" />
                  </button>
                </div>
                <div className="mb-3 flex h-16 items-center justify-center rounded-sm bg-[var(--neutral-50)] text-[var(--neutral-800)]">
                  <Icon size={24} weight="regular" />
                </div>
                <div className="text-center">
                  <div className="font-mono text-xs text-[var(--neutral-900)]">{item.name}</div>
                  <div className="mt-1 text-xs text-[var(--neutral-500)]">{item.zhName}</div>
                </div>
              </div>
            );
          })}
          <div className="bg-white p-4">
            <div className="mb-3 flex h-16 items-center justify-center rounded-sm bg-[var(--neutral-50)] text-[var(--neutral-500)]">
              <Plus size={24} weight="regular" />
            </div>
            <div className="text-center">
              <div className="text-sm font-medium text-[var(--neutral-900)]">增加图标</div>
              <div className="mt-1 text-xs leading-relaxed text-[var(--neutral-500)]">
                手动添加 Phosphor Icons 图标库里没有的图标
              </div>
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
                    className="flex h-7 w-7 items-center justify-center rounded-sm bg-white text-[var(--neutral-600)] hover:text-[var(--neutral-900)]"
                  >
                    {isCopied ? <Check size={14} weight="regular" /> : <Copy size={14} weight="regular" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => downloadDecorativeSvg(item)}
                    title="下载 SVG"
                    aria-label="下载 SVG"
                    className="flex h-7 w-7 items-center justify-center rounded-sm bg-white text-[var(--neutral-600)] hover:text-[var(--neutral-900)]"
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
