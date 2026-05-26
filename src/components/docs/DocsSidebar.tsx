import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HouseSimple, Layout, Palette, TextT, Smiley, ArrowsOutLineHorizontal, Cube, Circle,
  Square, CursorText, CaretDown, Table, Cards, ChatCentered, Tag, FileText, ChartBar,
  ToggleRight, CheckSquare, CirclesFour, Note, BellSimple,
} from "@phosphor-icons/react";

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
        { name: "首页", path: "/", icon: <HouseSimple size={16} weight="regular" /> },
        { name: "布局", path: "/layout", icon: <Layout size={16} weight="regular" /> },
        { name: "颜色", path: "/design-system/colors", icon: <Palette size={16} weight="regular" /> },
        { name: "字体", path: "/typography", icon: <TextT size={16} weight="regular" /> },
        { name: "图标", path: "/icon", icon: <Smiley size={16} weight="regular" /> },
        { name: "间距", path: "/spacing", icon: <ArrowsOutLineHorizontal size={16} weight="regular" /> },
        { name: "阴影", path: "/shadow", icon: <Cube size={16} weight="regular" /> },
        { name: "圆角", path: "/radius", icon: <Circle size={16} weight="regular" /> },
      ],
    },
    {
      title: "组件",
      items: [
        { name: "按钮", path: "/components/button", icon: <Square size={16} weight="regular" /> },
        { name: "输入框", path: "/components/input", icon: <CursorText size={16} weight="regular" /> },
        {
          name: "选择器",
          path: "/components/select",
          icon: <CaretDown size={16} weight="regular" />,
        },
        { name: "表格", path: "/components/table", icon: <Table size={16} weight="regular" /> },
        {
          name: "卡片",
          path: "/components/card",
          icon: <Cards size={16} weight="regular" />,
        },
        {
          name: "弹窗",
          path: "/components/modal",
          icon: <ChatCentered size={16} weight="regular" />,
        },
        { name: "标签", path: "/components/tag", icon: <Tag size={16} weight="regular" /> },
        { name: "Tabs", path: "/components/tabs", icon: <FileText size={16} weight="regular" /> },
        {
          name: "分页",
          path: "/components/pagination",
          icon: <ChartBar size={16} weight="regular" />,
        },
        { name: "开关", path: "/components/switch", icon: <ToggleRight size={16} weight="regular" /> },
        { name: "复选框", path: "/components/checkbox", icon: <CheckSquare size={16} weight="regular" /> },
        { name: "单选框", path: "/components/radio", icon: <CirclesFour size={16} weight="regular" /> },
        { name: "文本域", path: "/components/textarea", icon: <Note size={16} weight="regular" /> },
        { name: "消息提示", path: "/components/toast", icon: <BellSimple size={16} weight="regular" /> },
      ],
    },
  ];

  return (
    <aside className="sticky top-0 h-screen w-64 overflow-y-auto border-r border-[var(--neutral-200)] bg-[var(--neutral-50)]">
      <div className="border-b border-[var(--neutral-200)] p-5">
        <h1 className="text-base font-semibold text-[var(--neutral-900)]">2026-新材道设计规范</h1>
      </div>

      <nav className="p-4">
        {menuData.map((section) => (
          <div key={section.title} className="mb-5">
            <h2 className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-[var(--neutral-500)]">
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
