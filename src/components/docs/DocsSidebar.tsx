import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

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
        { name: "首页", path: "/", icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 14V6l6-4.5L14 6v8H2z"/></svg> },
        { name: "布局", path: "/layout", icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="12" height="12" rx="1"/><path d="M2 7h12M7 2v12"/></svg> },
        { name: "颜色", path: "/design-system/colors", icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="8" cy="8" r="6"/><path d="M8 2c3 0 4 2 4 3s-1 2-2 2c-1 0-2 1-2 2 0 1.5 1 2 0 3"/></svg> },
        { name: "字体", path: "/typography", icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 3h10M8 3v10M5 13h6"/></svg> },
        { name: "图标", path: "/icon", icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="8" cy="8" r="6"/><path d="M5.5 9.5S6.5 11 8 11s2.5-1.5 2.5-1.5"/><circle cx="5.5" cy="6.5" r="0.5"/><circle cx="10.5" cy="6.5" r="0.5"/></svg> },
        { name: "间距", path: "/spacing", icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 8h10M6 5l-3 3 3 3M10 5l3 3-3 3"/></svg> },
        { name: "阴影", path: "/shadow", icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2.5" y="2.5" width="11" height="11" rx="1.5"/><path d="M2.5 5.5h11"/><path d="M5 2.5v11"/></svg> },
        { name: "圆角", path: "/radius", icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="8" cy="8" r="6"/><path d="M8 2v12M2 8h12"/></svg> },
      ],
    },
    {
      title: "组件",
      items: [
        { name: "按钮", path: "/components/button", icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="10" height="10" rx="1"/></svg> },
        { name: "输入框", path: "/components/input", icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="10" height="10" rx="1"/><path d="M7 5v6M9 5v6"/></svg> },
        {
          name: "选择器",
          path: "/components/select",
          icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 6l4 4 4-4"/></svg>,
        },
        { name: "表格", path: "/components/table", icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="12" height="12" rx="1"/><path d="M2 6h12M6 2v12"/></svg> },
        {
          name: "卡片",
          path: "/components/card",
          icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1.5" y="3.5" width="13" height="9" rx="1"/><path d="M1.5 6.5h13"/></svg>,
        },
        {
          name: "弹窗",
          path: "/components/modal",
          icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="12" height="9" rx="1"/><path d="M5 15l3-3 3 3"/></svg>,
        },
        { name: "标签", path: "/components/tag", icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 2l5.5 1L14 9.5 9.5 14 3 8.5 2 2z"/><circle cx="5" cy="5" r="1"/></svg> },
        { name: "Tabs", path: "/components/tabs", icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 2h5l4 4v8H4V2z"/><path d="M9 2v4h4M6 8h4M6 11h3"/></svg> },
        {
          name: "分页",
          path: "/components/pagination",
          icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 13V8M8 13V5M14 13v-3"/><rect x="1" y="12" width="14" height="2" fill="currentColor"/></svg>,
        },
        { name: "开关", path: "/components/switch", icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="4" width="14" height="8" rx="4"/><circle cx="8" cy="8" r="2"/></svg> },
        { name: "复选框", path: "/components/checkbox", icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="12" height="12" rx="1.5"/><path d="M5 8L7 10L11 6"/></svg> },
        { name: "单选框", path: "/components/radio", icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="8" cy="8" r="6"/><circle cx="8" cy="8" r="3"/></svg> },
        { name: "文本域", path: "/components/textarea", icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="12" height="10" rx="1"/><path d="M5 11V7M5 7H8M5 7L10 11"/></svg> },
        { name: "消息提示", path: "/components/toast", icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 2C4.5 2 2 4.5 2 8C2 11.5 4.5 14 8 14C11.5 14 14 11.5 14 8"/><path d="M8 5.5V8.5M8 10V10.5"/></svg> },
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
