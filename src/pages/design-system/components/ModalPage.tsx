import { useState } from "react";
import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import { Button } from "../../../components/ui/Button";
import { Modal } from "../../../components/ui/Modal";

export default function ModalPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-16">
      <PageHeader title="弹窗" description="弹窗用于承载高优先级确认、重要信息和短流程操作，应避免替代常规页面承载复杂任务。" />

      <section>
        <SectionHeading eyebrow="Usage" title="基础弹窗" />
        <ExampleCard title="确认操作">
          <Button onClick={() => setOpen(true)}>打开弹窗</Button>
          <Modal
            open={open}
            title="确认发布数据资产"
            description="发布后该数据资产将进入可检索状态，请确认字段、权限和流转记录已完成校验。"
            onClose={() => setOpen(false)}
            footer={
              <>
                <Button variant="ghost" onClick={() => setOpen(false)}>取消</Button>
                <Button onClick={() => setOpen(false)}>确认发布</Button>
              </>
            }
          >
            <div className="space-y-2 text-sm text-[var(--neutral-600)]">
              <p>数据集：高温合金数据集</p>
              <p>权限范围：组织内可见</p>
              <p>状态：待发布</p>
            </div>
          </Modal>
        </ExampleCard>
      </section>

      <section>
              <section>
        <SectionHeading eyebrow="Variants" title="弹窗变体" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="rounded-sm border border-[var(--neutral-200)] bg-white p-6">
            <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-sm border border-[var(--neutral-200)]">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="12" height="12" rx="1"/><path d="M10 2v12"/></svg>
            </div>
            <h3 className="mb-2 text-sm font-semibold text-[var(--neutral-900)]">对话框 Modal（当前实现）</h3>
            <p className="text-sm leading-6 text-[var(--neutral-600)]">
              居中弹窗，适用于确认信息、短表单、通知等需要用户关注但不需要全屏跳转的场景。
              宽度默认 max-w-lg (512px)，可根据内容调整。
            </p>
          </div>
          <div className="rounded-sm border border-[var(--neutral-200)] bg-white p-6">
            <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-sm border border-[var(--neutral-200)]">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="8" y="2" width="6" height="12" rx="1"/><path d="M2 2h6v12H2z" fill="var(--neutral-100)" stroke="currentColor"/></svg>
            </div>
            <h3 className="mb-2 text-sm font-semibold text-[var(--neutral-900)]">抽屉 Drawer（待实现）</h3>
            <p className="text-sm leading-6 text-[var(--neutral-600)]">
              从右侧滑入的面板，适用于详情预览、配置面板、审核流程等需要保留上下文场景。
              宽度建议 480px / 640px，支持遮罩层点击关闭。
            </p>
          </div>
        </div>
      </section>
      <SectionHeading eyebrow="Guidelines" title="使用建议" />
        <SpecList
          items={[
            "弹窗用于打断式确认，普通信息展示优先使用页面区域或抽屉。",
            "危险操作必须明确说明后果，并使用危险按钮或二次确认。",
            "按钮顺序保持取消在左、确认在右，减少误操作。",
            "弹窗内容应简短，不承载长表单和复杂多步骤流程。",
          ]}
        />
      </section>
    </div>
  );
}
