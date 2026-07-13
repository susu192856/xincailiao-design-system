import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, RuleCallout, SectionCard, SectionHeading } from "../../../components/docs/ComponentDoc";
import CodeBlock from "../../../components/docs/CodeBlock";
import { Checkbox } from "../../../components/ui/Checkbox";

const sizeRows = [
  {
    title: "Small · 14px",
    scene: "表格行内、批量选择、紧凑筛选",
    desc: "用于信息密度较高的区域，控件缩小但文字仍保持 14px Regular。",
    size: "sm" as const,
  },
  {
    title: "Medium · 16px",
    scene: "表单默认、权限配置、协议确认",
    desc: "用于常规表单与配置页面，可搭配说明文字，是后台页面默认尺寸。",
    size: "md" as const,
  },
];

const stateSamples = [
  { label: "未选" },
  { label: "已选", defaultChecked: true },
  { label: "半选", checked: false, indeterminate: true, readOnly: true },
  { label: "未选禁用", disabled: true },
  { label: "已选禁用", defaultChecked: true, disabled: true },
];

export default function CheckboxPage() {
  return (
    <div className="space-y-16">
      <PageHeader
        title="复选框"
        description="复选框用于从一组选项中选择零项、一项或多项，也用于批量选择和明确确认。互斥选择使用单选框，即时启停使用开关。"
        status="stable"
      />

      <section>
        <SectionHeading
          eyebrow="Sizes"
          title="复选框尺寸"
          description="复选框保留 Small 和 Medium 两档。尺寸改变控件方框，不改变文字层级。"
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {sizeRows.map((item) => (
            <ExampleCard key={item.title} title={item.title} description={item.scene}>
              <div className="space-y-4">
                <Checkbox label={item.title} size={item.size} defaultChecked />
                <p className="text-sm leading-6 text-[var(--text-secondary)]">{item.desc}</p>
              </div>
            </ExampleCard>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="States"
          title="复选框状态"
          description="未选使用白色填充和中性灰描边；选中与半选使用产品蓝填充和白色符号；禁用状态转为中性灰。"
        />
        <SectionCard className="flex flex-wrap gap-x-8 gap-y-4">
          {stateSamples.map((item) => (
            <div key={item.label} className="pointer-events-none min-w-0">
              <Checkbox {...item} />
            </div>
          ))}
        </SectionCard>
        <div className="mt-5">
          <CodeBlock
            lang="tsx"
            label="Checkbox"
            code={`<Checkbox label="允许查看材料数据" />
<Checkbox label="允许下载报告" defaultChecked />
<Checkbox label="全选当前页" checked={false} indeterminate readOnly />
<Checkbox label="允许配置合约" disabled />`}
          />
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Scenarios"
          title="业务示例"
          description="每个选项都应能独立理解；权限、风险或操作后果不明确时，在选项下方补充说明。"
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <ExampleCard title="权限多选" description="多个权限可以同时存在，适合使用默认尺寸。">
            <div className="flex flex-col gap-3">
              <Checkbox label="允许查看材料数据" description="可进入详情页查看结构化字段。" defaultChecked />
              <Checkbox label="允许下载报告" description="下载行为会进入审计日志。" />
              <Checkbox label="允许配置合约" description="仅空间管理员可配置。" disabled />
            </div>
          </ExampleCard>
          <ExampleCard title="表格批量选择" description="父级半选用于表达当前页只选中了部分数据。">
            <div className="space-y-2">
              <Checkbox label="全选当前页" size="sm" checked={false} indeterminate readOnly />
              <div className="h-px bg-[var(--neutral-200)]" />
              <Checkbox label="TC4 钛合金数据集" size="sm" defaultChecked />
              <Checkbox label="铝合金疲劳性能数据" size="sm" />
              <Checkbox label="内部敏感数据" size="sm" disabled />
            </div>
          </ExampleCard>
          <ExampleCard title="协议确认" description="提交前需要明确确认，文案直接说明责任和后果。">
            <div className="flex flex-col gap-3">
              <Checkbox label="我已确认数据来源合法" description="确认后将记录当前账号和操作时间。" defaultChecked />
              <Checkbox label="允许用于模型训练" description="可随时在数据权限设置中撤回。" />
            </div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Rules"
          title="使用边界"
          description="复选框表达可并存的选择或显式确认，不用于互斥决策和即时生效的设置。"
        />
        <RuleCallout title="使用规则">
          多项可同时选择时使用 Checkbox；同组选项互斥时使用 Radio；设置切换后立即生效时使用 Switch。父级仅在部分子项选中时显示半选，不把半选作为可提交的第三种业务值。
        </RuleCallout>
        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="键盘与状态" description="每个复选框独立进入焦点，Space 切换当前项。">
            <ul className="space-y-2 text-sm leading-6 text-[var(--text-secondary)]">
              <li>Tab 按页面顺序移动焦点，Space 选中或取消。</li>
              <li>焦点、选中、半选和禁用不能只依赖颜色区分。</li>
              <li>禁用选项保持可见，并说明权限或前置条件。</li>
            </ul>
          </ExampleCard>
          <ExampleCard title="窄屏与长文案" description="文字自然换行，方框保持顶部对齐且不被压缩。">
            <div className="max-w-xs space-y-3">
              <Checkbox label="允许已通过数据权限审核的项目成员下载完整材料数据报告" description="下载行为会记录在审计日志中，并受项目数据使用协议约束。" defaultChecked />
              <Checkbox label="允许向项目外部共享" description="当前角色无此权限，暂不可选择。" disabled />
            </div>
          </ExampleCard>
        </div>
      </section>
    </div>
  );
}
