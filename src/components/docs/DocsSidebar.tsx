import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BarChart3,
  Box,
  ChevronDown,
  Circle,
  CreditCard,
  FileText,
  Home,
  Layout,
  MessageSquare,
  Palette,
  Smile,
  Space,
  Square,
  Table,
  Tag,
  TextCursor,
  Type,
} from "lucide-react";

interface MenuItem {
  title: string;
  items: {
    name: string;
    path: string;
    icon?: ReactNode;
  }[];
}

/**
 * DocsSidebar 组件
 * 设计规范文档的侧边栏导航
 * 包含基础、组件两个分类
 */
export default function DocsSidebar() {
  const location = useLocation();

  const menuData: MenuItem[] = [
    {
      title: "基础",
      items: [
        { name: "首页", path: "/", icon: <Home className="h-4 w-4" /> },
        { name: "布局", path: "/layout", icon: <Layout className="h-4 w-4" /> },
        { name: "颜色", path: "/design-system/colors", icon: <Palette className="h-4 w-4" /> },
        { name: "字体", path: "/typography", icon: <Type className="h-4 w-4" /> },
        { name: "图标", path: "/icon", icon: <Smile className="h-4 w-4" /> },
        { name: "间距", path: "/spacing", icon: <Space className="h-4 w-4" /> },
        { name: "阴影", path: "/shadow", icon: <Box className="h-4 w-4" /> },
        { name: "圆角", path: "/radius", icon: <Circle className="h-4 w-4" /> },
      ],
    },
    {
      title: "组件",
      items: [
        { name: "按钮", path: "/components/button", icon: <Square className="h-4 w-4" /> },
        { name: "输入框", path: "/components/input", icon: <TextCursor className="h-4 w-4" /> },
        {
          name: "选择器",
          path: "/components/select",
          icon: <ChevronDown className="h-4 w-4" />,
        },
        { name: "表格", path: "/components/table", icon: <Table className="h-4 w-4" /> },
        {
          name: "卡片",
          path: "/components/card",
          icon: <CreditCard className="h-4 w-4" />,
        },
        {
          name: "弹窗",
          path: "/components/modal",
          icon: <MessageSquare className="h-4 w-4" />,
        },
        { name: "标签", path: "/components/tag", icon: <Tag className="h-4 w-4" /> },
        { name: "Tabs", path: "/components/tabs", icon: <FileText className="h-4 w-4" /> },
        {
          name: "分页",
          path: "/components/pagination",
          icon: <BarChart3 className="h-4 w-4" />,
        },
      ],
    },
  ];

  return (
    <aside className="sticky top-0 h-screen w-64 overflow-y-auto border-r border-zinc-200 bg-zinc-50">
      <div className="border-b border-zinc-200 p-5">
        <h1 className="text-base font-semibold text-zinc-900">2026-新材道设计规范</h1>
      </div>

      <nav className="p-4">
        {menuData.map((section) => (
          <div key={section.title} className="mb-5">
            <h2 className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              {section.title}
            </h2>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`
                        flex items-center gap-3 rounded-[2px] px-3 py-2 text-sm transition-colors
                        ${
                          isActive
                            ? "bg-[#1A1A1A] !text-white [&_svg]:!text-white"
                            : "text-zinc-700 hover:bg-zinc-100"
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
