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
            <div className="space-y-2 text-sm text-zinc-600">
              <p>数据集：高温合金数据集</p>
              <p>权限范围：组织内可见</p>
              <p>状态：待发布</p>
            </div>
          </Modal>
        </ExampleCard>
      </section>

      <section>
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
