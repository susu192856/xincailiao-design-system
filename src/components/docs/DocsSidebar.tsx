import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowsLeftRight,
  ArrowsOutLineHorizontal,
  CaretDown,
  ChartBar,
  ChatCentered,
  CheckSquare,
  Circle,
  CirclesFour,
  ClipboardText,
  Cube,
  CursorText,
  Empty,
  FileText,
  HouseSimple,
  ImageSquare,
  Layout,
  List,
  ListBullets,
  Palette,
  Path,
  Question,
  Rectangle,
  Rows,
  Seal,
  SidebarSimple,
  Smiley,
  Square,
  Table,
  Tag,
  TextT,
  ToggleRight,
  TreeStructure,
  UserCircle,
} from "@phosphor-icons/react";
import xincailiaoLogo from "../../assets/xincailiao-logo-horizontal.png";

interface MenuItem {
  title: string;
  items: {
    name: string;
    path: string;
    icon?: ReactNode;
  }[];
}

type DocsSidebarProps = {
  className?: string;
  onNavigate?: () => void;
};

export default function DocsSidebar({ className = "", onNavigate }: DocsSidebarProps) {
  const location = useLocation();

  const menuData: MenuItem[] = [
    {
      title: "基础规范",
      items: [
        { name: "首页", path: "/", icon: <HouseSimple size={16} weight="regular" /> },
        { name: "布局", path: "/layout", icon: <Layout size={16} weight="regular" /> },
        { name: "颜色", path: "/design-system/colors", icon: <Palette size={16} weight="regular" /> },
        { name: "字体", path: "/typography", icon: <TextT size={16} weight="regular" /> },
        { name: "间距", path: "/spacing", icon: <ArrowsOutLineHorizontal size={16} weight="regular" /> },
        { name: "阴影", path: "/shadow", icon: <Cube size={16} weight="regular" /> },
        { name: "圆角", path: "/radius", icon: <Circle size={16} weight="regular" /> },
      ],
    },
    {
      title: "操作与输入",
      items: [
        { name: "按钮", path: "/components/button", icon: <Square size={16} weight="regular" /> },
        { name: "图标", path: "/components/icon", icon: <Smiley size={16} weight="regular" /> },
        { name: "输入框", path: "/components/input", icon: <CursorText size={16} weight="regular" /> },
        { name: "文本域", path: "/components/textarea", icon: <TextT size={16} weight="regular" /> },
        { name: "表单", path: "/components/form", icon: <ClipboardText size={16} weight="regular" /> },
        { name: "选择器", path: "/components/select", icon: <CaretDown size={16} weight="regular" /> },
        { name: "单选框", path: "/components/radio", icon: <CirclesFour size={16} weight="regular" /> },
        { name: "复选框", path: "/components/checkbox", icon: <CheckSquare size={16} weight="regular" /> },
        { name: "开关", path: "/components/switch", icon: <ToggleRight size={16} weight="regular" /> },
      ],
    },
    {
      title: "数据与内容",
      items: [
        { name: "表格", path: "/components/table", icon: <Table size={16} weight="regular" /> },
        { name: "分页码", path: "/components/pagination", icon: <ChartBar size={16} weight="regular" /> },
        { name: "描述列表", path: "/components/description-list", icon: <ListBullets size={16} weight="regular" /> },
        { name: "卡片", path: "/components/card", icon: <Rectangle size={16} weight="regular" /> },
        { name: "标签", path: "/components/tag", icon: <Tag size={16} weight="regular" /> },
        { name: "头像", path: "/components/avatar", icon: <UserCircle size={16} weight="regular" /> },
        { name: "徽标数", path: "/components/badge", icon: <Seal size={16} weight="regular" /> },
        { name: "图片", path: "/components/image", icon: <ImageSquare size={16} weight="regular" /> },
        { name: "空状态", path: "/components/empty", icon: <Empty size={16} weight="regular" /> },
      ],
    },
    {
      title: "导航与组织",
      items: [
        { name: "菜单", path: "/components/menu", icon: <List size={16} weight="regular" /> },
        { name: "菜单标签页", path: "/components/tabs", icon: <FileText size={16} weight="regular" /> },
        { name: "面包屑", path: "/components/breadcrumb", icon: <Path size={16} weight="regular" /> },
        { name: "折叠面板", path: "/components/collapse", icon: <Rows size={16} weight="regular" /> },
        { name: "树", path: "/components/tree", icon: <TreeStructure size={16} weight="regular" /> },
        { name: "穿梭框", path: "/components/transfer", icon: <ArrowsLeftRight size={16} weight="regular" /> },
      ],
    },
    {
      title: "反馈与浮层",
      items: [
        { name: "弹窗", path: "/components/modal", icon: <ChatCentered size={16} weight="regular" /> },
        { name: "抽屉", path: "/components/drawer", icon: <SidebarSimple size={16} weight="regular" /> },
        { name: "文字提示", path: "/components/tooltip", icon: <Question size={16} weight="regular" /> },
        { name: "气泡弹窗", path: "/components/popover", icon: <ChatCentered size={16} weight="regular" /> },
        { name: "提示反馈", path: "/components/toast", icon: <ChatCentered size={16} weight="regular" /> },
      ],
    },
  ];

  return (
    <aside className={["h-screen w-64 overflow-y-auto border-r border-[var(--neutral-200)] bg-[var(--neutral-50)]", className].join(" ")}>
      <div className="border-b border-[var(--neutral-200)] p-5">
        <Link to="/" className="flex items-center gap-3 text-[var(--neutral-900)] hover:text-[var(--brand-600)] transition-colors">
          <img src={xincailiaoLogo} alt="新材道" className="h-7 w-auto object-contain" />
          <span className="text-base font-semibold leading-tight">新材道设计规范</span>
        </Link>
      </div>

      <nav className="p-4">
        {menuData.map((section) => (
          <div key={section.title} className="mb-5">
            {section.title ? (
              <h2 className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
                {section.title}
              </h2>
            ) : null}
            <ul className="space-y-1">
              {section.items.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={onNavigate}
                      className={`
                        flex min-h-9 items-center gap-3 rounded-[var(--radius-sm)] px-3 py-2 text-sm transition-colors
                        ${
                          isActive
                            ? "bg-[var(--neutral-900)] !text-white [&_svg]:!text-white"
                            : "text-[var(--neutral-700)] hover:bg-[var(--neutral-100)]"
                        }
                      `}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
