/**
 * 后台页面模板 (Dashboard Page Template)
 *
 * 使用方式：
 * 1. 复制此文件到目标页面路径
 * 2. 替换 PageHeader 标题和 Table/Form 内容
 * 3. 按产品线配置调整主色调（参考 assets/product-lines.json）
 */

import { Breadcrumb } from "../components/ui/Breadcrumb";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Table } from "../components/ui/Table";
import { Pagination } from "../components/ui/Pagination";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { Empty } from "../components/ui/Empty";

/* ============================================================
   列表管理页模板
   ============================================================ */
export function ListPage() {
  const breadcrumbItems = [
    { label: "首页", href: "/" },
    { label: "数据管理", href: "/data" },
    { label: "数据列表" },
  ];

  const columns = [
    { key: "name", title: "名称", dataIndex: "name" },
    { key: "status", title: "状态", dataIndex: "status" },
    { key: "createdAt", title: "创建时间", dataIndex: "createdAt" },
    { key: "actions", title: "操作", dataIndex: "actions" },
  ];

  const data: any[] = []; // 替换为实际数据

  const toolbar = (
    <div className="flex items-center justify-between">
      <div className="flex" style={{ gap: "var(--spacing-md)" }}>
        <Input placeholder="搜索名称..." size="md" style={{ width: 240 }} />
        <Select
          options={[
            { label: "全部状态", value: "" },
            { label: "启用", value: "active" },
            { label: "禁用", value: "disabled" },
          ]}
          size="md"
          style={{ width: 160 }}
        />
      </div>
      <Button variant="solid" tone="product">
        新增
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--neutral-50)]">
      {/* Topbar */}
      <header
        className="flex items-center justify-between bg-white border-b border-[var(--neutral-200)] px-[var(--spacing-lg)]"
        style={{ height: "var(--layout-backend-topbar-height)" }}
      >
        <div className="flex items-center" style={{ gap: "var(--spacing-md)" }}>
          <span style={{ fontSize: "var(--type-body-l-size)", fontWeight: "var(--type-body-l-weight-semibold)", color: "var(--neutral-900)" }}>
            新材道后台
          </span>
        </div>
        <div className="flex items-center" style={{ gap: "var(--spacing-md)" }}>
          {/* 通知、用户头像等 */}
        </div>
      </header>

      <div className="flex">
        {/* Sidebar — 使用 Menu 组件，此处简化为占位 */}
        <aside
          className="bg-white border-r border-[var(--neutral-200)]"
          style={{ width: "var(--layout-backend-sidebar-expanded)", minHeight: "calc(100vh - var(--layout-backend-topbar-height))" }}
        >
          {/* <Menu orientation="vertical" items={menuItems} /> */}
        </aside>

        {/* Main content */}
        <main className="flex-1" style={{ padding: "var(--spacing-lg)" }}>
          {/* 面包屑 */}
          <Breadcrumb items={breadcrumbItems} />

          {/* 页面标题 */}
          <div
            className="flex items-center justify-between"
            style={{
              marginTop: "var(--spacing-md)",
              marginBottom: "var(--spacing-lg)",
            }}
          >
            <h3
              style={{
                fontSize: "var(--type-heading-h3-size)",
                lineHeight: "var(--type-heading-h3-line-height)",
                fontWeight: "var(--type-heading-h3-weight)",
                color: "var(--neutral-900)",
              }}
            >
              数据列表
            </h3>
          </div>

          {/* 内容卡片 */}
          <Card variant="basic">
            <div style={{ padding: "var(--spacing-lg)" }}>
              {toolbar}
              <div style={{ marginTop: "var(--spacing-lg)" }}>
                {data.length > 0 ? (
                  <>
                    <Table columns={columns} data={data} density="regular" />
                    <div style={{ marginTop: "var(--spacing-md)", display: "flex", justifyContent: "flex-end" }}>
                      <Pagination page={1} total={100} pageSize={20} showSizeChanger />
                    </div>
                  </>
                ) : (
                  <Empty type="no-data" title="暂无数据" description="点击右上角「新增」按钮创建第一条记录" />
                )}
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}

/* ============================================================
   表单页模板
   ============================================================ */
export function FormPage() {
  const breadcrumbItems = [
    { label: "首页", href: "/" },
    { label: "数据管理", href: "/data" },
    { label: "新增数据" },
  ];

  return (
    <div className="min-h-screen bg-[var(--neutral-50)]">
      {/* Topbar — 同 ListPage */}
      <header
        className="flex items-center bg-white border-b border-[var(--neutral-200)] px-[var(--spacing-lg)]"
        style={{ height: "var(--layout-backend-topbar-height)" }}
      >
        <span style={{ fontSize: "var(--type-body-l-size)", fontWeight: "var(--type-body-l-weight-semibold)", color: "var(--neutral-900)" }}>
          新材道后台
        </span>
      </header>

      <div className="flex">
        <aside
          className="bg-white border-r border-[var(--neutral-200)]"
          style={{ width: "var(--layout-backend-sidebar-expanded)", minHeight: "calc(100vh - var(--layout-backend-topbar-height))" }}
        />

        <main className="flex-1" style={{ padding: "var(--spacing-lg)" }}>
          <Breadcrumb items={breadcrumbItems} />

          <div style={{ marginTop: "var(--spacing-md)", marginBottom: "var(--spacing-lg)" }}>
            <h3
              style={{
                fontSize: "var(--type-heading-h3-size)",
                fontWeight: "var(--type-heading-h3-weight)",
                color: "var(--neutral-900)",
              }}
            >
              新增数据
            </h3>
          </div>

          {/* 表单卡片 — 固定宽度居中 */}
          <Card variant="basic" style={{ maxWidth: 800 }}>
            <div style={{ padding: "var(--spacing-lg)" }}>
              {/* <Form layout="single-column" labelPosition="left" labelWidth={120}>
                <Form.Item label="名称" required>
                  <Input placeholder="请输入名称" />
                </Form.Item>
                ...
              </Form> */}

              {/* 表单按钮 */}
              <div
                className="flex justify-end"
                style={{
                  marginTop: "var(--spacing-xl)",
                  paddingTop: "var(--spacing-lg)",
                  borderTop: "1px solid var(--neutral-200)",
                  gap: "var(--spacing-md)",
                }}
              >
                <Button variant="outline" tone="neutral">
                  取消
                </Button>
                <Button variant="solid" tone="product">
                  提交
                </Button>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}

/* ============================================================
   详情页模板
   ============================================================ */
export function DetailPage() {
  const breadcrumbItems = [
    { label: "首页", href: "/" },
    { label: "数据管理", href: "/data" },
    { label: "数据详情" },
  ];

  return (
    <div className="min-h-screen bg-[var(--neutral-50)]">
      {/* Topbar + Sidebar 同上，省略 */}
      <main className="flex-1" style={{ padding: "var(--spacing-lg)" }}>
        <Breadcrumb items={breadcrumbItems} />

        <div
          className="flex items-center justify-between"
          style={{ marginTop: "var(--spacing-md)", marginBottom: "var(--spacing-lg)" }}
        >
          <h3
            style={{
              fontSize: "var(--type-heading-h3-size)",
              fontWeight: "var(--type-heading-h3-weight)",
              color: "var(--neutral-900)",
            }}
          >
            数据详情
          </h3>
          <div style={{ gap: "var(--spacing-md)", display: "flex" }}>
            <Button variant="outline" tone="neutral">
              编辑
            </Button>
            <Button variant="solid" tone="danger">
              删除
            </Button>
          </div>
        </div>

        {/* 详情分段展示 */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-lg)" }}>
          <Card variant="basic">
            <div style={{ padding: "var(--spacing-lg)" }}>
              <h5
                style={{
                  fontSize: "var(--type-heading-h5-size)",
                  fontWeight: "var(--type-heading-h5-weight)",
                  color: "var(--neutral-900)",
                  marginBottom: "var(--spacing-lg)",
                }}
              >
                基本信息
              </h5>
              {/* <DescriptionList items={[...]} columns={2} /> */}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
