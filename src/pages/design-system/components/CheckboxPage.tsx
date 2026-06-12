import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import DocsTable from "../../../components/docs/DocsTable";
import { Checkbox } from "../../../components/ui/Checkbox";
import { Tag } from "../../../components/ui/Tag";

export default function CheckboxPage() {
  return (
    <div className="space-y-16">
      <PageHeader title="复选框" description="复选框用于多项选择、表格批量操作、字段权限配置和协议确认，支持未选、选中、半选和禁用状态。" />

      <section>
        <SectionHeading eyebrow="Variants" title="基础状态" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <ExampleCard title="权限多选">
            <div className="flex flex-col gap-4">
              <Checkbox label="允许查看材料数据" description="可进入详情页查看结构化字段。" defaultChecked />
              <Checkbox label="允许下载报告" description="下载行为会进入审计日志。" />
              <Checkbox label="允许编辑字段" />
              <Checkbox label="允许配置合约" description="仅空间管理员可配置。" disabled />
            </div>
          </ExampleCard>
          <ExampleCard title="状态反馈">
            <div className="flex flex-col gap-4">
              <Checkbox label="默认状态" />
              <Checkbox label="选中状态" defaultChecked />
              <Checkbox label="错误状态" error="发布前必须确认数据来源合法。" />
              <Checkbox label="禁用选中" defaultChecked disabled />
            </div>
          </ExampleCard>
          <ExampleCard title="表格批量选择">
            <div className="space-y-3">
              <Checkbox label="全选当前页" indeterminate helperText="部分记录已选中时使用半选状态。" />
              <div className="h-px bg-[var(--neutral-200)]" />
              <Checkbox label="TC4 钛合金数据集" defaultChecked />
              <Checkbox label="铝合金疲劳性能数据" defaultChecked />
              <Checkbox label="内部敏感数据" disabled />
            </div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Backend States"
          title="后台组合状态"
          description="复选框在后台最常出现于批量选择、字段权限、导入任务和风险确认。每个状态都要让用户清楚当前选择范围和操作后果。"
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <ExampleCard title="字段权限配置" description="用于数据空间、材库字段级授权。">
            <div className="space-y-3">
              <Checkbox label="成分字段" defaultChecked />
              <Checkbox label="工艺字段" defaultChecked />
              <Checkbox label="性能字段" />
              <Checkbox label="审计字段" description="审计字段由系统维护。" disabled />
            </div>
          </ExampleCard>
          <ExampleCard title="导入与解析任务" description="高风险选项需要明确影响范围。">
            <div className="space-y-3">
              <Checkbox label="重新解析" />
              <Checkbox label="覆盖旧版本" error="覆盖会影响已发布数据，请二次确认。" />
              <Checkbox label="同步到数据空间" description="成功后生成审计记录。" defaultChecked />
              <Checkbox label="发布给外部组织" description="当前流程未通过审批。" disabled />
            </div>
          </ExampleCard>
          <ExampleCard title="协议与风险确认" description="不可逆操作前使用，位置应靠近提交按钮。">
            <div className="space-y-3">
              <Checkbox label="我已确认数据来源合法" helperText="未确认前主按钮应保持禁用。" />
              <Checkbox label="我了解该操作将记录审计日志" defaultChecked />
              <Tag variant="warning" size="sm">高风险操作前使用</Tag>
            </div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Figma States" title="Figma 状态拆分" />
        <DocsTable>
          <thead className="bg-[var(--neutral-50)] text-sm font-semibold text-[var(--neutral-900)]">
            <tr className="border-b border-[var(--neutral-200)]">
              <th className="px-6 py-3 font-semibold">状态</th>
              <th className="px-6 py-3 font-semibold">视觉</th>
              <th className="px-6 py-3 font-semibold">使用场景</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--neutral-200)] bg-white">
            <tr><td className="px-6 py-4 font-mono text-xs">unchecked</td><td className="px-6 py-4">白底、中性灰边框</td><td className="px-6 py-4">默认未选择</td></tr>
            <tr><td className="px-6 py-4 font-mono text-xs">checked</td><td className="px-6 py-4">neutral-900 填充，白色勾选</td><td className="px-6 py-4">明确选择项</td></tr>
            <tr><td className="px-6 py-4 font-mono text-xs">indeterminate</td><td className="px-6 py-4">neutral-900 填充，白色横线</td><td className="px-6 py-4">表格部分选择、树节点部分选择</td></tr>
            <tr><td className="px-6 py-4 font-mono text-xs">error</td><td className="px-6 py-4">错误边框与错误文案</td><td className="px-6 py-4">协议未勾选、必选项未确认</td></tr>
            <tr><td className="px-6 py-4 font-mono text-xs">disabled</td><td className="px-6 py-4">整体透明度降低</td><td className="px-6 py-4">无权限、流程节点不可操作</td></tr>
          </tbody>
        </DocsTable>
      </section>

      <section>
        <SectionHeading eyebrow="Usage" title="使用建议" />
        <SpecList
          items={[
            "复选框用于多项选择；单项开关类设置优先使用 Switch。",
            "表格批量选择必须支持半选状态，表达当前页或当前分组的部分选择。",
            "后台字段权限建议保留描述文本，说明选项影响范围。",
            "禁用项需要保留标签，让用户知道该项存在但当前不可操作。",
            "协议确认类复选框应放在提交按钮上方，文案必须明确责任和后果。",
            "错误态必须展示文字原因，不只依赖红色边框。",
            "Figma 组件需包含 unchecked、checked、indeterminate、error、disabled、disabled checked 等状态。",
          ]}
        />
      </section>
    </div>
  );
}
