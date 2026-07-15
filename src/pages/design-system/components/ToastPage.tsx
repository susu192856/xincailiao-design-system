import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import { Button } from "../../../components/ui/Button";
import { Tag } from "../../../components/ui/Tag";
import { Toast, ToastContainer, toast } from "../../../components/ui/Toast";

const previewItems = [
  ["成功", "保存成功", "材料数据已同步至数据空间。", "success"],
  ["错误", "提交失败", "字段校验未通过，请检查后重试。", "error"],
  ["警告", "即将超时", "当前会话将在 5 分钟后过期。", "warning"],
  ["信息", "任务已创建", "系统将在后台继续处理解析任务。", "info"],
  ["处理中", "正在解析", "系统正在处理上传文件，请勿重复提交。", "loading"],
] as const;

export default function ToastPage() {
  return (
    <div className="space-y-16">
      <PageHeader title="提示反馈" description="提示反馈用于操作后的轻量结果告知，自动消失，不打断用户当前流程。" />

      <section>
        <SectionHeading
          eyebrow="Variants"
          title="反馈类型"
          description="按用户是否需要处理选择反馈类型；Toast 仅承载轻量、非阻断反馈，不替代确认弹窗、字段校验或任务进度。"
        />
        <div className="mt-5 overflow-hidden border border-[var(--neutral-200)] bg-white">
          <div className="grid grid-cols-[88px_minmax(0,1fr)] border-b border-[var(--neutral-200)] bg-[var(--neutral-50)] px-5 py-3 text-xs font-medium text-[var(--text-secondary)] md:grid-cols-[112px_minmax(0,1fr)_220px]">
            <span>类型</span>
            <span>使用时机</span>
            <span className="hidden md:block">出现位置与行为</span>
          </div>
          {[
            ["成功", "保存、发布、导入等操作已完成，用户无需继续处理。", "顶部居中，自动消失。"],
            ["错误", "当前操作失败，需要说明原因或提供后续入口。", "顶部居中；复杂错误跳转至对应字段或失败项。"],
            ["警告", "即将超时、权限到期或风险提醒，用户仍可继续操作。", "顶部居中，保留足够阅读时间。"],
            ["信息", "后台任务已创建、解析已开始、配置已更新等过程性告知。", "顶部居中；多条任务反馈可使用右下角队列。"],
            ["处理中", "短时任务已启动的确认反馈。", "顶部居中；长任务改用任务中心或进度条。"],
          ].map(([type, usage, placement]) => (
            <div key={type} className="grid grid-cols-[88px_minmax(0,1fr)] border-b border-[var(--neutral-200)] px-5 py-3 text-sm last:border-b-0 md:grid-cols-[112px_minmax(0,1fr)_220px]">
              <span className="font-semibold text-[var(--neutral-900)]">{type}</span>
              <span className="leading-6 text-[var(--text-secondary)]">{usage}</span>
              <span className="hidden leading-6 text-[var(--text-tertiary)] md:block">{placement}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs leading-5 text-[var(--text-tertiary)]">默认强提示只放一行结果语，不放描述；有后续处理、失败原因或明确动作时，才使用描述和文字按钮。自动消失的 Toast 默认不显示关闭按钮。</p>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {previewItems.map(([name, title, description, variant]) => (
            <ExampleCard key={variant} title={`${name}提示`}>
              <Toast tone={variant} title={title} description={description} />
            </ExampleCard>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Demo" title="真实组件触发" />
        <ExampleCard title="操作反馈" description="真实触发使用一行结果语；应用根节点应放置提示容器（ToastContainer）。">
          <div className="flex flex-wrap gap-3">
            <Button tone="product" onClick={() => toast({ variant: "success", title: "保存成功" })}>
              成功提示
            </Button>
            <Button tone="danger" onClick={() => toast({ variant: "error", title: "操作失败" })}>
              错误提示
            </Button>
            <Button variant="outline" tone="neutral" onClick={() => toast({ tone: "warning", title: "即将超时" })}>
              警告提示
            </Button>
            <Button variant="outline" tone="product" onClick={() => toast({ tone: "info", title: "任务已创建" })}>
              信息提示
            </Button>
            <Button variant="outline" tone="product" onClick={() => toast({ tone: "loading", title: "正在解析" })}>
              处理中
            </Button>
          </div>
          <ToastContainer />
        </ExampleCard>
      </section>

      <section>
        <SectionHeading eyebrow="Interaction" title="带操作反馈" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="导入完成">
            <Toast
              tone="success"
              title="导入完成"
              description="共导入 128 条材料数据，3 条需要补充字段。"
              action={<Button variant="text" tone="product" size="sm">查看详情</Button>}
            />
          </ExampleCard>
          <ExampleCard title="批量操作失败">
            <Toast
              tone="error"
              title="批量删除失败"
              description="部分数据已发布至数据空间，需先撤回后再删除。"
              action={<Button variant="text" tone="danger" size="sm">查看失败项</Button>}
            />
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Placement" title="出现位置" description="默认置于页面顶部居中，确保反馈可被快速感知但不覆盖工作内容；同屏多条队列可放在右下角。" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="右下角队列">
            <div className="relative min-h-48 overflow-hidden bg-[var(--neutral-50)] p-4">
              <div className="absolute bottom-4 right-4 flex w-72 flex-col gap-3">
                <Toast tone="success" title="保存成功" description="配置已更新。" />
                <Toast tone="info" title="任务已创建" description="后台将继续执行。" />
              </div>
            </div>
          </ExampleCard>
          <ExampleCard title="顶部居中">
            <div className="relative min-h-48 overflow-hidden bg-[var(--neutral-50)] p-4">
              <div className="absolute left-1/2 top-4 w-72 -translate-x-1/2">
                <Toast tone="warning" title="权限即将过期" description="请在 2 天内完成续期。" />
              </div>
            </div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Backend States" title="后台反馈场景" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="bg-white p-5">
            <Tag variant="success" size="sm">保存 / 发布成功</Tag>
            <p className="mt-3 text-sm leading-6 text-[var(--text-tertiary)]">用户无需停留处理，轻提示（toast）自动消失。</p>
          </div>
          <div className="bg-white p-5">
            <Tag variant="error" size="sm">提交失败</Tag>
            <p className="mt-3 text-sm leading-6 text-[var(--text-tertiary)]">错误需明确原因；复杂错误跳转至表单字段。</p>
          </div>
          <div className="bg-white p-5">
            <Tag variant="warning" size="sm">权限或风险提醒</Tag>
            <p className="mt-3 text-sm leading-6 text-[var(--text-tertiary)]">不会阻断流程，但提示用户注意后果。</p>
          </div>
          <div className="bg-white p-5">
            <Tag variant="product" size="sm">后台任务信息</Tag>
            <p className="mt-3 text-sm leading-6 text-[var(--text-tertiary)]">用于解析、训练、导入等异步任务反馈。</p>
          </div>
          <div className="bg-white p-5">
            <Tag variant="product" size="sm">处理中</Tag>
            <p className="mt-3 text-sm leading-6 text-[var(--text-tertiary)]">用于短时任务启动反馈，长任务应进入任务中心。</p>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Guidelines" title="最佳实践" />
        <SpecList
          items={[
            "Toast 只承载轻量反馈，不应用来展示长说明或复杂决策。",
            "成功反馈自动消失；错误反馈应说明原因和下一步。",
            "危险操作确认应使用 Modal，不要只用 Toast 提醒。",
            "同一时间避免堆叠过多提示，批量任务优先合并为一条结果提示。",
            "处理中 Toast 只能表示任务已开始，不替代进度条或任务列表。",
            "需要后续处理时可提供一个文字按钮，按钮文案必须是明确动作。",
          ]}
        />
      </section>
    </div>
  );
}
