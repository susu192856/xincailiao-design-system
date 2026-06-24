import { DotsThree, Info, ShieldCheck } from "@phosphor-icons/react";
import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import { Button, Popover, Tag } from "../../../components/ui";

const placements = ["top", "right", "bottom", "left"] as const;

export default function PopoverPage() {
  return (
    <div className="space-y-16">
      <PageHeader title="气泡弹窗" description="气泡弹窗用于承载轻量说明、快捷信息和少量操作，适合不打断流程的局部补充。" />

      <section>
        <SectionHeading title="基础结构" eyebrow="Usage" description="Popover 比 Tooltip 承载更多信息，但仍然不是弹窗。内容应短、聚焦、靠近触发对象。" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <ExampleCard title="字段详情">
            <div className="flex min-h-40 items-center">
              <Popover
                open
                title="数据来源"
                content="该字段来自可信数据空间授权目录，已完成字段映射和权限校验。"
              >
                <Button variant="outline" tone="neutral" icon={<Info size={16} weight="regular" />}>查看来源</Button>
              </Popover>
            </div>
          </ExampleCard>
          <ExampleCard title="权限说明">
            <div className="flex min-h-40 items-center">
              <Popover
                open
                placement="right"
                title="权限边界"
                content="当前角色可查看目录、筛选数据和导出脱敏结果，不可发布或删除数据集。"
              >
                <Tag variant="product" size="sm" icon={<ShieldCheck size={14} weight="regular" />}>只读权限</Tag>
              </Popover>
            </div>
          </ExampleCard>
          <ExampleCard title="快捷操作">
            <div className="flex min-h-40 items-center">
              <Popover
                open
                title="批量任务"
                content="已选中 12 条材料数据，可进行字段补齐或导出校验报告。"
                footer={<><Button variant="text" tone="neutral" size="sm">取消</Button><Button tone="product" size="sm">导出</Button></>}
              >
                <Button variant="ghost" tone="neutral" icon={<DotsThree size={18} weight="regular" />} aria-label="更多操作" />
              </Popover>
            </div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading title="出现位置" eyebrow="Placement" description="根据触发点位置选择方向，避免遮挡关键数据。后台表格内优先使用 right 或 bottom。" />
        <ExampleCard title="四向位置">
          <div className="grid grid-cols-2 gap-8 py-10 md:grid-cols-4">
            {placements.map((placement) => (
              <div key={placement} className="flex min-h-32 items-center justify-center bg-[var(--neutral-50)]">
                <Popover
                  open
                  placement={placement}
                  title={`${placement} 方向`}
                  content="气泡需要靠近触发对象，同时避开主要阅读路径。"
                >
                  <Button variant="outline" tone="neutral">{placement}</Button>
                </Popover>
              </div>
            ))}
          </div>
        </ExampleCard>
      </section>

      <section>
        <SectionHeading title="业务场景" eyebrow="Scenarios" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="数据空间审计信息">
            <div className="bg-[var(--neutral-50)] p-4">
              <div className="flex items-center justify-between bg-white p-4">
                <div>
                  <p className="text-sm font-semibold text-[var(--neutral-900)]">合同数据流转记录</p>
                  <p className="mt-1 text-sm text-[var(--neutral-600)]">最近同步：2026-06-08 14:32</p>
                </div>
                <Popover
                  open
                  placement="left"
                  title="链上存证"
                  content="流转过程已记录存证编号、发起方、接收方和授权时间，可用于审计追踪。"
                >
                  <Button variant="outline" tone="neutral" size="sm">查看存证</Button>
                </Popover>
              </div>
            </div>
          </ExampleCard>
          <ExampleCard title="AI 推荐解释">
            <div className="bg-[var(--neutral-50)] p-4">
              <div className="bg-white p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[var(--neutral-900)]">推荐材料：GH4169</p>
                    <p className="mt-1 text-sm text-[var(--neutral-600)]">综合匹配度 92%，高温强度满足目标区间。</p>
                  </div>
                  <Popover
                    open
                    title="推荐依据"
                    content="模型综合考虑成分、工艺、组织和性能四类变量，并过滤了不可用供应状态。"
                  >
                    <Button variant="text" tone="product" size="sm">解释</Button>
                  </Popover>
                </div>
              </div>
            </div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading title="最佳实践" eyebrow="Guidelines" />
        <SpecList
          items={[
            "用于局部补充信息和少量快捷操作，不用于复杂表单、长内容或强确认流程。",
            "带操作的 Popover 必须支持点击外部关闭和 Esc 关闭；前端实现需补齐焦点管理。",
            "需要阻断任务、二次确认或危险操作时，应升级为 Modal。",
            "信息量超过三行、需要滚动或有多个区域时，应改用 Drawer 或独立页面。",
            "Figma 组件需要包含四向位置、无标题、有标题、带 footer、信息说明和操作菜单状态。",
            "视觉上使用白底、neutral-200 边框、轻阴影和 2px 圆角，品牌红仅用于关键状态点。",
          ]}
        />
      </section>
    </div>
  );
}
