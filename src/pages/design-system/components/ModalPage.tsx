import { useState } from "react";
import { CheckCircle, ClockCounterClockwise, ShieldWarning, WarningCircle } from "@phosphor-icons/react";
import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import { Button } from "../../../components/ui/Button";
import { Modal } from "../../../components/ui/Modal";
import { Tag } from "../../../components/ui/Tag";

export default function ModalPage() {
  const [open, setOpen] = useState<"publish" | "danger" | "warning" | "success" | "detail" | "locked" | null>(null);

  return (
    <div className="space-y-16">
      <PageHeader title="弹窗" description="弹窗用于承载高优先级确认、重要信息和短流程操作，应避免替代常规页面承载复杂任务。" />

      <section>
        <SectionHeading eyebrow="Usage" title="基础弹窗" description="弹窗由标题、描述、内容区、底部操作组成。按钮顺序固定为取消在左、确认在右。" />
        <ExampleCard title="确认发布数据资产" description="短流程确认，适合发布、提交、授权、归档等不可静默完成的动作。">
          <Button onClick={() => setOpen("publish")}>打开弹窗</Button>
          <Modal
            open={open === "publish"}
            title="确认发布数据资产"
            description="发布后该数据资产将进入可检索状态，请确认字段、权限和流转记录已完成校验。"
            onClose={() => setOpen(null)}
            footer={
              <>
                <Button variant="ghost" onClick={() => setOpen(null)}>
                  取消
                </Button>
                <Button onClick={() => setOpen(null)}>确认发布</Button>
              </>
            }
          >
            <div className="grid grid-cols-[88px_1fr] gap-y-3 text-sm">
              <span className="text-[var(--text-tertiary)]">数据集</span>
              <span className="text-[var(--text-body)]">高温合金数据集</span>
              <span className="text-[var(--text-tertiary)]">权限范围</span>
              <span className="text-[var(--text-body)]">组织内可见</span>
              <span className="text-[var(--text-tertiary)]">状态</span>
              <Tag size="sm" variant="warning">待发布</Tag>
            </div>
          </Modal>
        </ExampleCard>
      </section>

      <section>
        <SectionHeading eyebrow="Size" title="尺寸与关闭策略" description="小尺寸用于确认，中尺寸用于信息核对，大尺寸可承载短详情。关键流程可关闭遮罩点击，避免误关。" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="大尺寸短详情">
            <Button variant="outline" onClick={() => setOpen("detail")}>查看流转记录</Button>
            <Modal
              open={open === "detail"}
              size="xl"
              title="数据资产流转记录"
              description="用于在不离开当前列表的情况下快速核对关键状态。复杂审计详情应进入独立页面。"
              icon={<ClockCounterClockwise size={18} weight="regular" />}
              onClose={() => setOpen(null)}
              footerAlign="between"
              footer={
                <>
                  <Button variant="text" tone="product" onClick={() => setOpen(null)}>打开详情页</Button>
                  <Button onClick={() => setOpen(null)}>关闭</Button>
                </>
              }
            >
              <div className="grid gap-3 text-sm text-[var(--text-secondary)] md:grid-cols-3">
                {["接入完成", "字段治理", "发布存证"].map((item, index) => (
                  <div key={item} className="bg-[var(--neutral-50)] p-4">
                    <p className="text-xs text-[var(--text-tertiary)]">STEP 0{index + 1}</p>
                    <p className="mt-2 font-normal text-[var(--text-primary)]">{item}</p>
                    <p className="mt-2 leading-6 text-[var(--text-tertiary)]">记录操作人、时间、状态与结果摘要。</p>
                  </div>
                ))}
              </div>
            </Modal>
          </ExampleCard>
          <ExampleCard title="不可遮罩关闭">
            <Button variant="outline" tone="danger" onClick={() => setOpen("locked")}>打开关键确认</Button>
            <Modal
              open={open === "locked"}
              size="sm"
              title="确认撤回发布"
              description="该操作会影响正在引用此数据资产的下游任务，请完成二次确认。"
              tone="warning"
              icon={<WarningCircle size={18} weight="regular" />}
              maskClosable={false}
              onClose={() => setOpen(null)}
              footer={
                <>
                  <Button variant="ghost" onClick={() => setOpen(null)}>取消</Button>
                  <Button loading tone="danger">撤回中</Button>
                </>
              }
            >
              <p className="text-sm leading-6 text-[var(--text-tertiary)]">遮罩点击不会关闭弹窗，适合高风险或提交中的流程。</p>
            </Modal>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="States" title="语义状态" description="危险、警告、成功弹窗使用语义色图标辅助判断，正文和按钮文案必须说明后果。" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <ExampleCard title="危险确认">
            <Button tone="danger" onClick={() => setOpen("danger")}>删除数据集</Button>
            <Modal
              open={open === "danger"}
              title="删除数据集"
              description="删除后将无法恢复，相关引用和审计记录会保留。"
              tone="danger"
              icon={<ShieldWarning size={18} weight="regular" />}
              onClose={() => setOpen(null)}
              footer={
                <>
                  <Button variant="ghost" onClick={() => setOpen(null)}>取消</Button>
                  <Button tone="danger" onClick={() => setOpen(null)}>确认删除</Button>
                </>
              }
            >
              <p className="text-sm leading-6 text-[var(--text-tertiary)]">建议在高风险操作中增加二次确认或输入名称校验。</p>
            </Modal>
          </ExampleCard>
          <ExampleCard title="警告提示">
            <Button variant="outline" tone="danger" onClick={() => setOpen("warning")}>查看冲突</Button>
            <Modal
              open={open === "warning"}
              title="字段存在冲突"
              description="当前字段标准和目标空间规则不一致，继续提交可能影响解析结果。"
              tone="warning"
              icon={<WarningCircle size={18} weight="regular" />}
              onClose={() => setOpen(null)}
              footer={
                <>
                  <Button variant="ghost" onClick={() => setOpen(null)}>返回修改</Button>
                  <Button tone="neutral" onClick={() => setOpen(null)}>继续提交</Button>
                </>
              }
            >
              <div className="rounded-sm bg-[var(--neutral-50)] p-3 text-sm text-[var(--text-secondary)]">冲突字段：材料牌号、热处理温度、组织类型</div>
            </Modal>
          </ExampleCard>
          <ExampleCard title="成功反馈">
            <Button variant="outline" onClick={() => setOpen("success")}>查看成功态</Button>
            <Modal
              open={open === "success"}
              title="发布成功"
              description="数据资产已进入组织内可检索状态。"
              tone="success"
              icon={<CheckCircle size={18} weight="regular" />}
              onClose={() => setOpen(null)}
              footer={<Button onClick={() => setOpen(null)}>完成</Button>}
            >
              <p className="text-sm leading-6 text-[var(--text-tertiary)]">后续可在数据空间中查看流转记录和访问日志。</p>
            </Modal>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Patterns" title="后台场景" description="弹窗适合短确认和短表单；长表单、复杂详情、流程审核更适合页面或抽屉。" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="短表单确认">
            <div className="space-y-3 rounded-sm bg-[var(--neutral-50)] p-4">
              <div className="h-8 rounded-sm border border-[var(--neutral-200)] bg-white" />
              <div className="h-8 rounded-sm border border-[var(--neutral-200)] bg-white" />
              <div className="flex justify-end gap-2 pt-2">
                <Button size="sm" variant="ghost">取消</Button>
                <Button size="sm">保存</Button>
              </div>
            </div>
          </ExampleCard>
          <ExampleCard title="信息确认">
            <div className="space-y-3 rounded-sm bg-[var(--neutral-50)] p-4 text-sm text-[var(--text-secondary)]">
              <div className="flex justify-between"><span>数据空间</span><span>新材料可信数据空间</span></div>
              <div className="flex justify-between"><span>授权对象</span><span>材料研发组</span></div>
              <div className="flex justify-between"><span>有效期</span><span>30 天</span></div>
            </div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Guidelines" title="最佳实践" />
        <SpecList
          items={[
            "弹窗用于打断式确认，普通信息展示优先使用页面区域或抽屉。",
            "危险操作必须明确说明后果，并使用危险按钮或二次确认。",
            "提交中或高风险流程可关闭遮罩点击，避免用户误关导致状态不确定。",
            "按钮顺序保持取消在左、确认在右，减少误操作。",
          ]}
        />
      </section>
    </div>
  );
}
