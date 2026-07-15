import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import { Button } from "../../../components/ui/Button";
import { Toast, ToastContainer, toast, type ToastVariant } from "../../../components/ui/Toast";

const feedbackTones: Array<{ tone: Exclude<ToastVariant, "loading">; label: string; message: string }> = [
  { tone: "success", label: "成功", message: "保存成功" },
  { tone: "info", label: "信息", message: "任务已创建" },
  { tone: "warning", label: "警告", message: "权限即将到期" },
  { tone: "error", label: "错误", message: "提交失败" },
];

export default function ToastPage() {
  return (
    <div className="space-y-16">
      <PageHeader title="消息反馈" description="消息反馈用于告知操作结果、系统通知和页面状态。根据影响范围与阅读时长，分为顶部轻提示、通知提示和页面提示。" />

      <section>
        <SectionHeading eyebrow="Overview" title="类型与位置" description="“全局反馈”只适合描述浮层消息，无法覆盖页面内容中的常驻提示，因此统一使用“消息反馈”作为页面名称。" />
        <div className="overflow-hidden rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white">
          <div className="grid grid-cols-[112px_minmax(0,1fr)] border-b border-[var(--neutral-200)] bg-[var(--neutral-50)] px-5 py-3 text-xs font-medium text-[var(--text-secondary)] md:grid-cols-[144px_120px_minmax(0,1fr)_220px]">
            <span>反馈类型</span>
            <span className="hidden md:block">组件</span>
            <span>适用场景</span>
            <span className="hidden md:block">位置与持续时间</span>
          </div>
          {[
            ["顶部轻提示", "Toast", "操作已完成或任务已开始，用户无需进一步处理。", "顶部居中 80px；默认 4 秒消失。"],
            ["通知提示", "Notification", "系统主动推送的重要消息，需要标题、说明或后续查看。", "右上角 24px；手动关闭或约 6 秒消失。"],
            ["页面提示", "Alert", "与当前页面内容直接相关的说明、警告或错误。", "标题下或内容区顶部；默认常驻。"],
          ].map(([type, component, usage, behavior]) => (
            <div key={type} className="grid grid-cols-[112px_minmax(0,1fr)] border-b border-[var(--neutral-200)] px-5 py-4 text-sm last:border-b-0 md:grid-cols-[144px_120px_minmax(0,1fr)_220px]">
              <span className="font-semibold text-[var(--text-primary)]">{type}</span>
              <span className="hidden font-mono text-[var(--text-tertiary)] md:block">{component}</span>
              <span className="leading-6 text-[var(--text-secondary)]">{usage}</span>
              <span className="hidden leading-6 text-[var(--text-tertiary)] md:block">{behavior}</span>
            </div>
          ))}
        </div>

        <div className="mt-5 overflow-hidden rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white">
          <div className="border-b border-[var(--neutral-200)] bg-[var(--neutral-50)] px-5 py-4">
            <p className="text-sm font-semibold text-[var(--text-primary)]">位置说明</p>
            <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">示意三类消息在桌面端页面中的默认位置，不代表它们可以同时出现。</p>
          </div>
          <div className="relative hidden min-h-[360px] overflow-hidden bg-[var(--neutral-100)] md:block">
            <div className="absolute left-1/2 top-20 -translate-x-1/2">
              <Toast tone="success" title="保存成功" closable={false} />
            </div>
            <div className="absolute right-6 top-6 w-[360px]">
              <Toast presentation="notification" tone="info" title="数据治理任务已完成" description="高温合金数据集已完成字段校验，可进入发布审批。" onClose={() => {}} />
            </div>
            <div className="absolute bottom-6 left-1/2 w-[min(560px,calc(100%-48px))] -translate-x-1/2">
              <Toast presentation="alert" tone="warning" title="当前数据集仍有 3 个字段未填写，提交前请完成补充。" onClose={() => {}} />
            </div>
          </div>
          <div className="grid gap-4 bg-[var(--neutral-100)] p-4 md:hidden">
            <Toast tone="success" title="保存成功" closable={false} />
            <Toast presentation="notification" tone="info" title="数据治理任务已完成" description="高温合金数据集已完成字段校验，可进入发布审批。" onClose={() => {}} />
            <Toast presentation="alert" tone="warning" title="当前数据集仍有 3 个字段未填写，提交前请完成补充。" onClose={() => {}} />
          </div>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Toast" title="顶部轻提示" description="用于操作后的即时结果反馈，不打断当前任务。默认只使用一行结果语，不展示关闭按钮。" />
        <ExampleCard title="语义状态" description="成功、信息、警告和错误必须同时使用图标与明确文案，不能只依赖颜色。">
          <div className="grid gap-4 rounded-[var(--radius-sm)] bg-[var(--neutral-50)] p-6 sm:grid-cols-2 xl:grid-cols-4">
            {feedbackTones.map((item) => (
              <div key={item.tone}>
                <p className="mb-3 text-xs text-[var(--text-tertiary)]">{item.label}</p>
                <Toast tone={item.tone} title={item.message} closable={false} />
              </div>
            ))}
          </div>
        </ExampleCard>
        <ExampleCard className="mt-5" title="真实触发" description="容器固定在页面顶部居中 80px；相同操作短时间重复触发时应合并，避免堆叠。">
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => toast({ tone: "success", title: "保存成功" })}>成功提示</Button>
            <Button variant="outline" onClick={() => toast({ tone: "info", title: "任务已创建" })}>信息提示</Button>
            <Button variant="outline" onClick={() => toast({ tone: "warning", title: "权限即将到期" })}>警告提示</Button>
            <Button tone="danger" onClick={() => toast({ tone: "error", title: "提交失败" })}>错误提示</Button>
            <Button variant="outline" onClick={() => toast({ tone: "loading", title: "正在解析文件" })}>处理中</Button>
          </div>
          <ToastContainer />
        </ExampleCard>
      </section>

      <section>
        <SectionHeading eyebrow="Notification" title="通知提示" description="用于系统主动推送、异步任务结果和需要稍后查看的信息。通常包含标题与描述，并允许用户手动关闭。" />
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          {[
            ["success", "数据导入完成", "共导入 128 条材料数据，3 条需要补充字段。"],
            ["info", "治理任务已创建", "系统将在后台继续处理，完成后会再次通知。"],
            ["warning", "权限即将到期", "当前数据空间权限将在 2 天后到期，请及时续期。"],
            ["error", "批量发布失败", "部分数据缺少负责人，请补充后重新发布。"],
          ].map(([tone, title, description]) => (
            <ExampleCard key={tone} title={`${title}示例`}>
              <div className="flex min-h-40 items-start justify-center rounded-[var(--radius-sm)] bg-[var(--neutral-50)] p-6">
                <Toast presentation="notification" tone={tone as ToastVariant} title={title} description={description} onClose={() => {}} />
              </div>
            </ExampleCard>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Alert" title="页面提示" description="与当前页面或模块内容直接相关，通常放在标题下方或内容区顶部。默认常驻，可根据业务提供关闭入口。" />
        <ExampleCard title="页面内语义提示" description="提示宽度跟随内容区域，不使用浮层阴影；错误和警告应同时说明原因或下一步。">
          <div className="space-y-3">
            <Toast presentation="alert" tone="info" title="当前页面展示最近 30 天的数据。" onClose={() => {}} />
            <Toast presentation="alert" tone="success" title="字段校验已完成，可以提交发布审批。" closable={false} />
            <Toast presentation="alert" tone="warning" title="当前数据集仍有 3 个字段未填写，请补充后提交。" onClose={() => {}} />
            <Toast presentation="alert" tone="error" title="数据加载失败，请检查网络后重试。" onClose={() => {}} />
          </div>
        </ExampleCard>
      </section>

      <section>
        <SectionHeading eyebrow="Guidelines" title="最佳实践" />
        <SpecList
          items={[
            "顶部轻提示只告知即时结果，默认一行、自动消失且不显示关闭按钮。",
            "通知提示用于系统主动推送的重要消息，标题说明结果，描述补充对象或下一步。",
            "页面提示与当前内容保持邻近，默认常驻，不应遮挡用户正在操作的区域。",
            "需要用户确认或二选一时使用对话框；依附具体控件的确认使用气泡弹窗。",
            "同一时间避免出现多种反馈争夺注意力，重复消息应合并或更新原消息。",
            "错误反馈不能只写“失败”，必须说明原因、影响或恢复方式。",
          ]}
        />
      </section>
    </div>
  );
}
