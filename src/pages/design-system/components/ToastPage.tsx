import { useState } from "react";
import PageHeader from "../../../components/docs/PageHeader";
import { SectionHeading } from "../../../components/docs/ComponentDoc";
import { Button } from "../../../components/ui/Button";
import { ToastContainer, toast } from "../../../components/ui/Toast";

export default function ToastPage() {
  const [showContainer, setShowContainer] = useState(false);

  return (
    <div className="space-y-16">
      <PageHeader title="消息提示 Toast" description="用于操作后的轻量反馈，自动消失，不打断用户操作流程。" />

      <section>
        <SectionHeading eyebrow="Demo" title="基本用法" description="点击按钮触发不同类型的 Toast。需要先在页面中放置 ToastContainer。" />
        <div className="flex flex-wrap gap-3 rounded-sm border border-[var(--neutral-200)] bg-white p-6">
          <Button tone="product" onClick={() => { setShowContainer(true); toast({ variant: "success", title: "保存成功", description: "数据已同步至数据空间" }); }}>
            成功提示
          </Button>
          <Button tone="danger" onClick={() => { setShowContainer(true); toast({ variant: "error", title: "操作失败", description: "请检查网络连接后重试" }); }}>
            错误提示
          </Button>
          <Button onClick={() => { setShowContainer(true); toast({ variant: "warning", title: "即将超时", description: "您的会话将在 5 分钟后过期" }); }}>
            警告提示
          </Button>
          <Button variant="outline" tone="product" onClick={() => { setShowContainer(true); toast({ variant: "info", title: "新版本可用", description: "v2.3.0 已发布，点此更新" }); }}>
            信息提示
          </Button>
        </div>
        {showContainer && <ToastContainer />}
      </section>

      <section>
        <SectionHeading eyebrow="Usage" title="使用方式" />
        <div className="rounded-sm border border-[var(--neutral-200)] bg-white p-6">
          <p className="mb-3 text-sm text-[var(--neutral-700)]">
            在应用根节点放置 <code className="rounded-sm bg-[var(--neutral-100)] px-1.5 py-0.5 font-mono text-xs">{"<ToastContainer />"}</code>，
            然后在任意位置调用 <code className="rounded-sm bg-[var(--neutral-100)] px-1.5 py-0.5 font-mono text-xs">toast()</code> 触发提示。
          </p>
          <pre className="overflow-x-auto rounded-sm bg-[var(--neutral-50)] p-4 text-xs leading-6 text-[var(--neutral-700)]">
{`// 在页面中放置容器
<ToastContainer />

// 触发提示
toast({
  variant: "success", // success | error | warning | info
  title: "保存成功",
  description: "数据已同步"
})`}
          </pre>
        </div>
      </section>
    </div>
  );
}
