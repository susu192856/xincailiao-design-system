import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import { Avatar } from "../../../components/ui/Avatar";
import { Badge } from "../../../components/ui/Badge";
import { Button } from "../../../components/ui/Button";
import { Tag } from "../../../components/ui/Tag";

export default function BadgePage() {
  return (
    <div className="space-y-16">
      <PageHeader title="徽标数" description="徽标数用于提示待处理数量、消息数量和轻量状态，常见于后台导航、消息入口、任务列表和人员协作场景。" />

      <section>
        <SectionHeading eyebrow="Variants" title="徽标类型" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <ExampleCard title="数量">
            <div className="flex flex-wrap items-center gap-5">
              <Badge count={8} tone="product" />
              <Badge count={128} tone="product" />
              <Badge count={0} tone="neutral" showZero />
              <Badge count={3} tone="danger" />
            </div>
            <p className="mt-4 text-xs leading-5 text-[var(--text-tertiary)]">默认超过 99 显示 99+，0 值默认隐藏，统计场景可显示 0。</p>
          </ExampleCard>
          <ExampleCard title="圆点">
            <div className="flex flex-wrap items-center gap-5">
              <Badge dot tone="brand" />
              <Badge dot tone="product" />
              <Badge dot tone="warning" />
              <Badge dot tone="success" />
              <Badge dot tone="neutral" />
            </div>
            <p className="mt-4 text-xs leading-5 text-[var(--text-tertiary)]">圆点适合状态提醒，不承载具体数量。</p>
          </ExampleCard>
          <ExampleCard title="依附元素">
            <div className="flex flex-wrap items-center gap-8">
              <Badge count={12} tone="product">
                <Button variant="ghost" tone="neutral">消息</Button>
              </Badge>
              <Badge dot tone="danger">
                <Avatar name="王工" />
              </Badge>
            </div>
            <p className="mt-4 text-xs leading-5 text-[var(--text-tertiary)]">依附元素时徽标固定在右上角，避免遮挡文字主体。</p>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Backend States" title="后台使用场景" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="侧栏待办">
            <div className="w-72 bg-white p-3">
              {[
                ["数据审批", 8, "product"],
                ["异常任务", 2, "danger"],
                ["消息通知", 0, "neutral"],
              ].map(([label, count, tone]) => (
                <div key={label} className="flex items-center justify-between px-3 py-2">
                  <span className="text-sm text-[var(--text-body)]">{label}</span>
                  <Badge count={count as number} tone={tone as "product" | "danger" | "neutral"} showZero={label === "消息通知"} />
                </div>
              ))}
            </div>
          </ExampleCard>
          <ExampleCard title="任务状态">
            <div className="grid grid-cols-1 gap-3 bg-white md:grid-cols-2">
              <div className="flex items-center justify-between bg-[var(--neutral-50)] p-3">
                <Tag variant="product" size="sm">待处理</Tag>
                <Badge count={16} tone="product" />
              </div>
              <div className="flex items-center justify-between bg-[var(--neutral-50)] p-3">
                <Tag variant="warning" size="sm">待复核</Tag>
                <Badge count={4} tone="warning" />
              </div>
              <div className="flex items-center justify-between bg-[var(--neutral-50)] p-3">
                <Tag variant="error" size="sm">异常</Tag>
                <Badge count={1} tone="danger" />
              </div>
              <div className="flex items-center justify-between bg-[var(--neutral-50)] p-3">
                <Tag variant="success" size="sm">已完成</Tag>
                <Badge count={0} tone="success" showZero />
              </div>
            </div>
          </ExampleCard>
          <ExampleCard title="表格行提醒">
            <div className="divide-y divide-[var(--neutral-100)] bg-white">
              {[
                ["Al-6061 材料数据", "字段缺失", 3],
                ["钛合金相图数据", "待审核", 1],
                ["复合材料性能数据", "正常", 0],
              ].map(([name, status, count]) => (
                <div key={name} className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm text-[var(--text-primary)]">{name}</p>
                    <p className="mt-1 text-xs text-[var(--text-tertiary)]">{status}</p>
                  </div>
                  <Badge count={count as number} tone={count ? "danger" : "neutral"} showZero={count === 0} />
                </div>
              ))}
            </div>
          </ExampleCard>
          <ExampleCard title="人员协作">
            <div className="flex flex-wrap items-center gap-7 bg-white">
              <Badge count={5} tone="product">
                <Avatar name="数据运营" />
              </Badge>
              <Badge count={1} tone="warning">
                <Avatar name="审核员" />
              </Badge>
              <Badge dot tone="success">
                <Avatar name="管理员" status="online" />
              </Badge>
            </div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Guidelines" title="最佳实践" />
        <SpecList
          items={[
            "徽标数只表达数量或轻量提醒，不替代标签、Toast、Alert 或 Modal。",
            "后台功能入口优先使用产品蓝；危险和异常数量使用错误色；品牌红只用于极少数关键提醒。",
            "数量超过 99 时显示 99+，避免破坏导航宽度；统计语义需要显示 0 时使用 showZero。",
            "圆点适合提醒“有更新”，数量徽标适合提醒“有多少待处理”。",
          ]}
        />
      </section>
    </div>
  );
}
