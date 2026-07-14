import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, RuleCallout, SectionCard, SectionHeading } from "../../../components/docs/ComponentDoc";
import CodeBlock from "../../../components/docs/CodeBlock";
import { Radio } from "../../../components/ui/Radio";

const sizeRows = [
  {
    title: "Small · 14px",
    scene: "表格行内、紧凑筛选、密集列表",
    desc: "用于空间受限但仍需要互斥选择的区域，文字保持 14px Regular，不承载长描述。",
    size: "sm" as const,
  },
  {
    title: "Medium · 16px",
    scene: "表单默认、设置项、审批配置",
    desc: "用于常规表单和配置页面，可搭配说明文字或错误信息，是后台页面默认尺寸。",
    size: "md" as const,
  },
];

const stateSamples = [
  { label: "未选" },
  { label: "已选", defaultChecked: true },
  { label: "未选禁用", disabled: true },
  { label: "已选禁用", defaultChecked: true, disabled: true },
];

export default function RadioPage() {
  return (
    <div className="space-y-16">
      <PageHeader
        title="单选框"
        description="单选框用于从一组选项中选择唯一结果。它强调互斥关系，不用于多选、即时启停或长列表搜索。"
        status="stable"
      />

      <section>
        <SectionHeading
          eyebrow="Sizes"
          title="单选框尺寸"
          description="单选框仅保留小尺寸（Small）和中尺寸（Medium）两档。尺寸改变的是控件圆点，不改变文字层级。"
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {sizeRows.map((item) => (
            <ExampleCard key={item.title} title={item.title} description={item.scene}>
              <div className="space-y-4">
                <Radio name={`radio-size-${item.size}`} label={item.title} size={item.size} defaultChecked />
                <p className="text-sm leading-6 text-[var(--text-secondary)]">{item.desc}</p>
              </div>
            </ExampleCard>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="States"
          title="单选框状态"
          description="未选使用白色填充和中性灰描边；选中使用产品蓝填充和白色圆点；禁用状态转为中性灰并不可交互。"
        />
        <SectionCard className="flex flex-wrap gap-x-8 gap-y-4">
          {stateSamples.map((item) => (
            <div key={item.label} className="pointer-events-none min-w-0">
              <Radio name={`radio-state-${item.label}`} {...item} />
            </div>
          ))}
        </SectionCard>
        <div className="mt-5">
          <CodeBlock
            lang="tsx"
            label="Radio"
            code={`<fieldset>
  <legend>发布方式</legend>
  <Radio name="publishMode" value="draft" label="保存草稿" />
  <Radio name="publishMode" value="review" label="提交审核" defaultChecked />
  <Radio name="publishMode" value="publish" label="直接发布" disabled />
</fieldset>`}
          />
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Scenarios"
          title="业务示例"
          description="三个示例分别展示提交后生效、需要比较后果和选择后即时生效的典型任务。"
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <ExampleCard title="标准表单" description="中尺寸（Medium）· 纵向排列 · 提交后生效">
            <fieldset className="flex flex-col gap-3">
              <legend className="sr-only">发布方式</legend>
              <Radio name="publish-mode" value="draft" label="保存草稿" description="提交后仅当前编辑者可见。" />
              <Radio name="publish-mode" value="review" label="提交审核" description="提交后进入审核队列，通过后发布。" defaultChecked />
              <Radio name="publish-mode" value="publish" label="直接发布" description="获得发布权限后可选择。" disabled />
            </fieldset>
          </ExampleCard>
          <ExampleCard title="权限决策" description="中尺寸（Medium）· 纵向排列 · 说明选择后果">
            <fieldset className="flex flex-col gap-3">
              <legend className="sr-only">数据可见范围</legend>
              <Radio name="scope" value="team" label="仅当前团队可见" description="团队外成员无法查看或下载。" />
              <Radio name="scope" value="space" label="数据空间内可见" description="空间成员可查看，下载仍受权限控制。" defaultChecked />
              <Radio name="scope" value="public" label="公开共享" description="完成数据合规审批后可选择。" disabled />
            </fieldset>
          </ExampleCard>
          <ExampleCard title="即时筛选" description="小尺寸（Small）· 横向排列 · 选择后立即刷新">
            <div role="radiogroup" aria-label="处理状态" className="flex flex-wrap gap-x-4 gap-y-3">
              <Radio name="compact-filter" value="all" label="全部" size="sm" defaultChecked />
              <Radio name="compact-filter" value="pending" label="待处理" size="sm" />
              <Radio name="compact-filter" value="done" label="已完成" size="sm" />
            </div>
            <p className="mt-4 text-xs leading-5 text-[var(--text-tertiary)]">无需再次提交；选择后立即更新当前列表。</p>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Rules"
          title="使用边界"
          description="先判断选项是否互斥、是否需要同时比较，再决定使用单选框或其他选择控件。"
        />
        <RuleCallout title="快速判断">
          只有一项可以成立，并且用户需要直接比较全部选项时使用单选框。
        </RuleCallout>
        <SectionCard className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div><strong className="text-sm text-[var(--text-primary)]">单选框</strong><p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">2–5 个固定互斥项，需要展开比较。</p></div>
          <div><strong className="text-sm text-[var(--text-primary)]">复选框</strong><p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">可以同时选择零项、一项或多项。</p></div>
          <div><strong className="text-sm text-[var(--text-primary)]">开关</strong><p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">开启或关闭后立即生效。</p></div>
          <div><strong className="text-sm text-[var(--text-primary)]">选择器</strong><p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">选项较多、需要搜索或远程加载。</p></div>
        </SectionCard>
        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
          <ExampleCard title="设计与内容" description="决定排列、文案和状态呈现。">
            <ul className="space-y-2 text-sm leading-6 text-[var(--text-secondary)]">
              <li>默认纵向排列；仅短标签和紧凑筛选使用横向排列。</li>
              <li>标签保持 Regular，不通过加粗表达选中。</li>
              <li>说明文字与标签左侧对齐；禁用项说明恢复条件。</li>
              <li>整行标签可点击，焦点环不能被容器裁切。</li>
            </ul>
          </ExampleCard>
          <ExampleCard title="开发与无障碍" description="建立真实分组、键盘操作和表单值。">
            <ul className="space-y-2 text-sm leading-6 text-[var(--text-secondary)]">
              <li>同组共享 name，每个选项提供唯一 value。</li>
              <li>业务表单使用 fieldset/legend；工具栏使用 radiogroup 与可访问名称。</li>
              <li>Tab 进入或离开组，方向键切换，Space 选中当前项。</li>
              <li>必选校验和错误信息属于整个单选组。</li>
            </ul>
          </ExampleCard>
          <ExampleCard title="窄屏与长文案" description="内容换行，控件保持顶部对齐且不被压缩。">
            <div role="radiogroup" aria-label="数据共享范围示例" className="max-w-xs space-y-3">
              <Radio name="long-copy" value="project" label="仅向当前项目中已通过数据权限审核的成员开放" description="成员离开项目后自动失去访问权限，已有导出记录仍保留在审计日志中。" defaultChecked />
              <Radio name="long-copy" value="public" label="公开共享" description="移除受限字段并完成合规审批后可选择。" disabled />
            </div>
          </ExampleCard>
        </div>
      </section>

    </div>
  );
}
