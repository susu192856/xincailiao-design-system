import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, RuleCallout, SectionCard, SectionHeading } from "../../../components/docs/ComponentDoc";
import CodeBlock from "../../../components/docs/CodeBlock";
import { Switch } from "../../../components/ui/Switch";

const sizeRows = [
  {
    title: "小尺寸（Small）· 36×20px",
    scene: "表格行内、紧凑设置、工具栏",
    desc: "用于信息密度较高的区域，标签保持 14px Regular，不承载长说明。",
    size: "sm" as const,
  },
  {
    title: "中尺寸（Medium）· 44×24px",
    scene: "设置页、表单、功能配置",
    desc: "用于常规设置和配置页面，可搭配说明文字，是后台页面默认尺寸。",
    size: "md" as const,
  },
];

const stateSamples = [
  { label: "关闭" },
  { label: "开启", defaultChecked: true },
  { label: "关闭禁用", disabled: true },
  { label: "开启禁用", defaultChecked: true, disabled: true },
];

export default function SwitchPage() {
  return (
    <div className="space-y-16">
      <PageHeader
        title="开关"
        description="开关用于立即开启或关闭一项设置。状态切换后直接生效，不用于需要提交确认的选择和高风险决策。"
        status="stable"
      />

      <section>
        <SectionHeading
          eyebrow="Sizes"
          title="开关尺寸"
          description="开关保留小尺寸（Small）和中尺寸（Medium）两档。尺寸改变轨道与滑块，不改变文字层级。"
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {sizeRows.map((item) => (
            <ExampleCard key={item.title} title={item.title} description={item.scene}>
              <div className="space-y-4">
                <Switch label={item.title} size={item.size} defaultChecked />
                <p className="text-sm leading-6 text-[var(--text-secondary)]">{item.desc}</p>
              </div>
            </ExampleCard>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="States"
          title="开关状态"
          description="关闭使用中性灰轨道；开启使用产品蓝轨道；禁用状态转为中性灰并不可交互。"
        />
        <SectionCard className="flex flex-wrap gap-x-8 gap-y-4">
          {stateSamples.map((item) => (
            <div key={item.label} className="pointer-events-none min-w-0">
              <Switch {...item} />
            </div>
          ))}
        </SectionCard>
        <div className="mt-5">
          <CodeBlock
            lang="tsx"
            label="开关（Switch）"
            code={`<Switch label="开启消息通知" />
<Switch label="允许数据自动同步" defaultChecked />
<Switch label="外部组织访问" disabled />`}
          />
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Scenarios"
          title="业务示例"
          description="三个示例分别展示个人偏好、后台自动化和受权限限制的即时设置。"
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <ExampleCard title="通知偏好" description="中尺寸（Medium）· 低风险 · 切换后立即生效">
            <div className="flex flex-col gap-4">
              <Switch label="任务完成通知" description="任务完成后推送站内消息。" defaultChecked />
              <Switch label="审批结果邮件" description="审批结束后发送邮件提醒。" />
            </div>
          </ExampleCard>
          <ExampleCard title="自动化设置" description="中尺寸（Medium）· 后台任务 · 明确运行频率">
            <div className="flex flex-col gap-4">
              <Switch label="允许数据自动同步" description="开启后每 10 分钟同步一次。" defaultChecked />
              <Switch label="自动生成质量报告" description="数据更新后重新生成报告。" />
            </div>
          </ExampleCard>
          <ExampleCard title="权限限制" description="中尺寸（Medium）· 保留禁用项 · 说明恢复条件">
            <div className="flex flex-col gap-4">
              <Switch label="外部组织访问" description="完成访问审批后可开启。" disabled />
              <Switch label="开放外部下载" description="获得空间管理员权限后可开启。" disabled />
            </div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Rules"
          title="使用边界"
          description="先判断切换后是否立即生效，以及失败时能否安全回滚，再决定是否使用开关。"
        />
        <RuleCallout title="快速判断">
          只有“开启 / 关闭”两种状态，切换后立即生效且结果可安全撤回时使用开关。
        </RuleCallout>
        <SectionCard className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div><strong className="text-sm text-[var(--text-primary)]">开关</strong><p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">即时启停，可安全撤回。</p></div>
          <div><strong className="text-sm text-[var(--text-primary)]">复选框</strong><p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">显式确认，随表单一起提交。</p></div>
          <div><strong className="text-sm text-[var(--text-primary)]">单选框</strong><p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">从多个互斥结果中选择一个。</p></div>
          <div><strong className="text-sm text-[var(--text-primary)]">按钮 + 确认</strong><p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">高风险、不可逆或需要二次确认。</p></div>
        </SectionCard>
        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
          <ExampleCard title="设计与内容" description="标签描述设置本身，不写“是 / 否”。">
            <ul className="space-y-2 text-sm leading-6 text-[var(--text-secondary)]">
              <li>使用“消息通知”“自动同步”等可独立理解的设置名称。</li>
              <li>开启使用产品蓝；关闭与禁用使用中性灰。</li>
              <li>说明文字解释生效结果、频率或恢复条件。</li>
              <li>整行标签可点击，焦点环不能被容器裁切。</li>
            </ul>
          </ExampleCard>
          <ExampleCard title="开发与反馈" description="切换后立即保存，并处理等待和失败。">
            <ul className="space-y-2 text-sm leading-6 text-[var(--text-secondary)]">
              <li>使用 role=switch，并同步 aria-checked。</li>
              <li>Space 切换；保存期间锁定重复操作并显示进行中。</li>
              <li>保存失败时回滚原状态，并在控件附近说明原因。</li>
              <li>禁用设置保留可见，同时提供不可用原因。</li>
            </ul>
          </ExampleCard>
          <ExampleCard title="窄屏与长文案" description="轨道保持顶部对齐，标签和说明自然换行。">
            <div className="max-w-xs space-y-4">
              <Switch label="允许系统在材料数据更新后自动重新生成完整质量报告" description="开启后可能增加后台任务耗时，可随时关闭。" defaultChecked />
              <Switch label="允许外部组织下载报告" description="完成访问审批并获得空间管理员授权后可开启。" disabled />
            </div>
          </ExampleCard>
        </div>
      </section>
    </div>
  );
}
