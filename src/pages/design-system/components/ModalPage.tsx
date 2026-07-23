import { useState } from "react";
import { CheckCircle, ShieldWarning, WarningCircle } from "@phosphor-icons/react";
import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import DocsTable from "../../../components/docs/DocsTable";
import { Button } from "../../../components/ui/Button";
import { DescriptionList } from "../../../components/ui/DescriptionList";
import { Modal, type ModalProps } from "../../../components/ui/Modal";
import { Tag } from "../../../components/ui/Tag";

const publishDetails = [
  { label: "数据集", value: "高温合金数据集" },
  { label: "权限范围", value: "组织内可见" },
  { label: "状态", value: <Tag size="sm" variant="warning">待发布</Tag> },
];

const informationDetails = [
  { label: "数据集", value: "高温合金数据集" },
  { label: "当前版本", value: "V2.4" },
];

type DialogSizePreset = {
  size: NonNullable<ModalProps["size"]>;
  name: string;
  width: string;
  usage: string;
  title: string;
  description: string;
  columns: 1 | 2;
  details: Array<{ label: string; value: string }>;
};

const dialogSizePresets: DialogSizePreset[] = [
  {
    size: "sm",
    name: "小尺寸",
    width: "宽度 384px",
    usage: "确认、警告和简短提示",
    title: "确认归档数据集",
    description: "归档后数据集将不再出现在默认列表中。",
    columns: 1,
    details: [
      { label: "数据集", value: "高温合金数据集" },
      { label: "影响范围", value: "仅影响当前工作区" },
    ],
  },
  {
    size: "md",
    name: "中尺寸",
    width: "宽度 504px",
    usage: "默认表单与信息核对",
    title: "核对发布信息",
    description: "发布前请核对数据集、权限范围和当前版本。",
    columns: 1,
    details: [
      { label: "数据集", value: "高温合金数据集" },
      { label: "权限范围", value: "组织内可见" },
      { label: "当前版本", value: "V2.4" },
    ],
  },
  {
    size: "lg",
    name: "大尺寸",
    width: "宽度 720px",
    usage: "多字段短表单",
    title: "批量发布数据资产",
    description: "本次将同时发布三个数据资产，请确认负责人和发布范围。",
    columns: 2,
    details: [
      { label: "资产数量", value: "3 个" },
      { label: "负责人", value: "材料研发组" },
      { label: "发布范围", value: "组织内可见" },
      { label: "生效时间", value: "发布后立即生效" },
    ],
  },
  {
    size: "xl",
    name: "超大尺寸",
    width: "宽度 960px",
    usage: "详情核对的尺寸上限",
    title: "数据资产详情核对",
    description: "适用于在提交前集中核对多组只读信息；更复杂的浏览任务应进入独立页面。",
    columns: 2,
    details: [
      { label: "资产名称", value: "航空高温合金性能数据集" },
      { label: "资产编号", value: "DATA-2026-0715" },
      { label: "所属空间", value: "新材料可信数据空间" },
      { label: "数据规模", value: "12.8 万条" },
      { label: "负责人", value: "材料研发组" },
      { label: "最近更新", value: "2026-07-15 14:30" },
    ],
  },
];

export default function ModalPage() {
  const [open, setOpen] = useState<"publish" | "information" | "standard" | "locked" | null>(null);
  const [sizePreview, setSizePreview] = useState<DialogSizePreset["size"] | null>(null);
  const activeSizePreview = dialogSizePresets.find((preset) => preset.size === sizePreview);

  return (
    <div className="space-y-16">
      <PageHeader title="对话框" description="对话框用于承载高优先级确认、重要信息和短流程操作，应避免替代常规页面承载复杂任务。" />

      <section>
        <SectionHeading eyebrow="Usage" title="基础结构" description="基础对话框分为带操作区与无操作区两种。两者都保留点击触发的真实交互，同时展示展开形态供设计与开发复用。" />
        <div className="space-y-5">
        <ExampleCard
          title="基础对话框｜带操作按钮"
          description="用于确认、提交、授权和保存等需要用户完成操作的任务，底部提供取消与主要操作。点击按钮体验焦点、遮罩与退出。"
          interactive
          code={`const [open, setOpen] = useState(false);\n\n<Button onClick={() => setOpen(true)}>发布数据</Button>\n<Modal\n  open={open}\n  title="确认发布数据资产"\n  onClose={() => setOpen(false)}\n  footer={<Button onClick={() => setOpen(false)}>确认发布</Button>}\n>\n  <DescriptionList items={publishDetails} />\n</Modal>`}
        >
          <div className="mb-5">
            <Button onClick={() => setOpen("publish")}>打开带按钮对话框</Button>
          </div>
          <Modal
            inline
            open
            size="md"
            title="确认发布数据资产"
            description="发布后该数据资产将进入可检索状态，请确认字段、权限和流转记录已完成校验。"
            maskClosable={false}
            footer={
              <>
                <Button variant="ghost">取消</Button>
                <Button>确认发布</Button>
              </>
            }
          >
            <DescriptionList className="!gap-y-3 bg-transparent" items={publishDetails} columns={1} bordered={false} size="sm" labelWidth={88} />
          </Modal>
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
            <DescriptionList className="!gap-y-3 bg-transparent" items={publishDetails} columns={1} bordered={false} size="sm" labelWidth={88} />
          </Modal>
        </ExampleCard>
        <ExampleCard title="基础对话框｜无操作按钮" description="用于只读说明或轻量信息查看，不显示底部操作区，通过右上角或点击对话框外灰色区域关闭。">
          <div className="mb-5">
            <Button variant="outline" onClick={() => setOpen("information")}>打开无按钮对话框</Button>
          </div>
          <Modal
            inline
            open
            size="md"
            title="数据资产说明"
            description="此对话框仅用于查看当前数据资产的基础信息。"
            maskClosable={false}
          >
            <DescriptionList className="!gap-y-3 bg-transparent" items={informationDetails} columns={1} bordered={false} size="sm" labelWidth={88} />
          </Modal>
          <Modal
            open={open === "information"}
            size="md"
            title="数据资产说明"
            description="此对话框仅用于查看当前数据资产的基础信息。"
            onClose={() => setOpen(null)}
          >
            <DescriptionList className="!gap-y-3 bg-transparent" items={informationDetails} columns={1} bordered={false} size="sm" labelWidth={88} />
          </Modal>
        </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Size" title="宽度与高度规范" description="先按任务复杂度选择宽度档位，再由实际内容自然决定高度。" />
        <div className="overflow-hidden rounded-[var(--radius-md)] border border-[var(--neutral-200)] bg-white">
          <div className="border-b border-[var(--neutral-200)] bg-[var(--neutral-50)] px-5 py-4">
            <p className="text-sm font-semibold text-[var(--text-primary)]">选择对话框宽度</p>
            <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">以下数值为桌面端推荐宽度，点击任一档位可查看真实内容示例。</p>
          </div>
          <div className="grid divide-y divide-[var(--neutral-200)] md:grid-cols-4 md:divide-x md:divide-y-0">
            {dialogSizePresets.map((preset) => (
              <button
                key={preset.size}
                type="button"
                aria-label={`查看${preset.name}对话框示例`}
                onClick={() => setSizePreview(preset.size)}
                className="group min-h-[168px] bg-white p-5 text-left transition-colors hover:bg-[var(--product-blue-50)] focus-visible:relative focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--product-blue-500)]"
              >
                <span className="block text-sm text-[var(--text-tertiary)]">{preset.name}</span>
                <span className="mt-3 block font-mono text-xl font-semibold text-[var(--text-primary)] group-hover:text-[var(--product-blue-600)]">{preset.width}</span>
                <span className="mt-2 block min-h-12 text-sm leading-6 text-[var(--text-secondary)]">{preset.usage}</span>
                <span className="mt-3 block text-sm text-[var(--product-blue-600)]">打开示例 →</span>
              </button>
            ))}
          </div>
          <div className="grid border-t border-[var(--neutral-200)] bg-[var(--neutral-50)] md:grid-cols-2 md:divide-x md:divide-[var(--neutral-200)]">
            <div className="px-5 py-4">
              <p className="text-sm font-semibold text-[var(--text-primary)]">宽度规则</p>
              <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">桌面端使用 384 / 504 / 720 / 960px 四档；窄屏保留左右各 24px 安全边距后自动收缩。</p>
            </div>
            <div className="border-t border-[var(--neutral-200)] px-5 py-4 md:border-t-0">
              <p className="text-sm font-semibold text-[var(--text-primary)]">高度规则</p>
              <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">不设置统一最小高度；最大高度取 864px 与“视口高度减 48px”中的较小值，仅内容区滚动。</p>
            </div>
          </div>
        </div>
        {activeSizePreview ? (
          <Modal
            open
            size={activeSizePreview.size}
            title={activeSizePreview.title}
            description={activeSizePreview.description}
            onClose={() => setSizePreview(null)}
            footer={
              <>
                <Button variant="ghost" onClick={() => setSizePreview(null)}>取消</Button>
                <Button onClick={() => setSizePreview(null)}>确认</Button>
              </>
            }
          >
            <DescriptionList
              className="!gap-y-3"
              items={activeSizePreview.details}
              columns={activeSizePreview.columns}
              bordered={false}
              size="sm"
              labelWidth={88}
            />
          </Modal>
        ) : null}
      </section>

      <section>
        <SectionHeading eyebrow="Behavior" title="退出方式" description="根据任务风险选择允许自由退出，或要求用户通过明确按钮完成决策。" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="可随时退出" description="适用于普通查看和轻量操作，可通过右上角关闭、取消按钮或点击对话框外灰色区域退出。">
            <Button variant="outline" onClick={() => setOpen("standard")}>查看普通关闭</Button>
            <Modal
              open={open === "standard"}
              size="sm"
              title="查看发布说明"
              description="当前操作不会修改数据，可以通过右上角关闭、取消按钮或点击对话框外灰色区域退出。"
              onClose={() => setOpen(null)}
              footer={
                <>
                  <Button variant="ghost" onClick={() => setOpen(null)}>取消</Button>
                  <Button onClick={() => setOpen(null)}>知道了</Button>
                </>
              }
            />
          </ExampleCard>
          <ExampleCard title="决策对话框" description="适用于高风险操作，要求用户在两个明确选项中做出决定，因此不能通过右上角或点击外部区域跳过。">
            <Button variant="outline" tone="neutral" onClick={() => setOpen("locked")}>查看决策对话框</Button>
            <Modal
              open={open === "locked"}
              size="sm"
              variant="decision"
              title="确认撤回发布"
              tone="warning"
              icon={<WarningCircle size={20} weight="regular" />}
              closeable={false}
              maskClosable={false}
              onClose={() => setOpen(null)}
              footer={
                <>
                  <Button variant="ghost" onClick={() => setOpen(null)}>暂不撤回</Button>
                  <Button tone="danger" onClick={() => setOpen(null)}>确认撤回</Button>
                </>
              }
            >
              <div className="text-sm leading-6">
                <p className="text-[var(--text-primary)]">撤回后，该数据资产将立即停止对外提供检索与访问。</p>
                <p className="mt-2 text-[var(--text-secondary)]">下游任务可能受到影响，撤回记录会保留在操作日志中。</p>
              </div>
            </Modal>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="States" title="决策与结果反馈" description="决策对话框要求用户在明确选项中做出选择；结果反馈只告知操作结果。两者共享居中图标和标题结构，但按钮数量与文案不同。" />
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          <ExampleCard title="决策对话框｜展开形态" description="用于删除、撤回、覆盖或继续提交等需要明确选择的场景；真实使用时仍由业务按钮触发。">
            <Modal
              inline
              open
              size="sm"
              variant="decision"
              title="删除数据集"
              tone="danger"
              icon={<ShieldWarning size={20} weight="regular" />}
              closeable={false}
              maskClosable={false}
              footer={
                <>
                  <Button variant="ghost">暂不删除</Button>
                  <Button tone="danger">确认删除</Button>
                </>
              }
            >
              <div className="text-sm leading-6">
                <p className="text-[var(--text-primary)]">删除后将无法恢复。</p>
                <p className="mt-2 text-[var(--text-secondary)]">相关引用和审计记录仍会保留。</p>
              </div>
            </Modal>
          </ExampleCard>
          <ExampleCard title="结果反馈对话框｜展开形态" description="用于成功、失败或完成结果的集中反馈；通常只保留一个确认按钮，不要求用户二选一。">
            <Modal
              inline
              open
              size="sm"
              variant="decision"
              title="发布成功"
              tone="success"
              icon={<CheckCircle size={20} weight="regular" />}
              closeable={false}
              maskClosable={false}
              footer={<Button>完成</Button>}
            >
              <div className="text-sm leading-6">
                <p className="text-[var(--text-primary)]">数据资产已进入组织内可检索状态。</p>
                <p className="mt-2 text-[var(--text-secondary)]">后续可在数据空间中查看流转记录和访问日志。</p>
              </div>
            </Modal>
          </ExampleCard>
        </div>
        <p className="mt-4 text-sm leading-6 text-[var(--text-secondary)]">警告状态沿用决策对话框结构，将图标和主按钮切换为警告语义，并使用“返回修改 / 继续提交”等具体选择。</p>
      </section>

      <section>
        <SectionHeading eyebrow="Guidelines" title="最佳实践" />
        <SpecList
          items={[
            "对话框用于打断式确认，普通信息展示优先使用页面区域或抽屉。",
            "危险操作必须明确说明后果，并使用危险按钮或二次确认。",
            "提交中或高风险流程可关闭遮罩点击，避免用户误关导致状态不确定。",
            "按钮顺序保持取消在左、确认在右，减少误操作。",
          ]}
        />
      </section>

      <section>
        <SectionHeading eyebrow="API" title="属性与实现边界" description="远程数据、权限过滤和跨字段校验由业务层管理。" />
        <DocsTable>
          <thead>
            <tr><th>属性</th><th>类型</th><th>默认值</th><th>说明</th></tr>
          </thead>
          <tbody>
            {[
              ["open", "boolean", "—", "受控打开状态。"],
              ["title", "ReactNode | string", "—", "对话框标题。"],
              ["description", "ReactNode | string", "—", "辅助说明文字。"],
              ["children", "ReactNode", "—", "对话框主体内容。"],
              ["footer", "ReactNode", "—", "底部操作区；未传入时无底部。"],
              ["onClose", "() => void", "—", "关闭回调。"],
              ["size", "sm | md | lg | xl", "md", "对话框最大宽度。"],
              ["variant", "default | decision", "default", "default 承载信息与交互；decision 承载决策与风险确认。"],
              ["tone", "neutral | danger | warning | success", "neutral", "语义颜色；影响顶部条和图标。"],
              ["icon", "ReactNode", "—", "标题上方图标。"],
              ["closeable", "boolean", "true", "是否显示关闭按钮。"],
              ["maskClosable", "boolean", "true", "点击遮罩是否关闭。"],
              ["footerAlign", "start | end | between", "end", "底部按钮对齐方式。"],
              ["inline", "boolean", "false", "内联模式；不渲染背景遮罩。"],
              ["className", "string", "—", "外层容器自定义 class。"],
            ].map(([name, type, defaultValue, desc]) => (
              <tr key={name}>
                <td className="font-token">{name}</td>
                <td className="font-token text-[var(--text-secondary)]">{type}</td>
                <td className="font-token text-[var(--text-secondary)]">{defaultValue}</td>
                <td className="text-[var(--text-secondary)]">{desc}</td>
              </tr>
            ))}
          </tbody>
        </DocsTable>
      </section>
    </div>
  );
}
