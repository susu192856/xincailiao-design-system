import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import DocsTable from "../../../components/docs/DocsTable";
import { Checkbox } from "../../../components/ui/Checkbox";
import { Tag } from "../../../components/ui/Tag";

const anatomyRows = [
  ["控件区", "16px（sm=14px）方形，未选中 neutral-300 边框，选中后填充 neutral-900 并显示白色对勾；半选显示白色横杠。"],
  ["标签文字", "14px / Regular / text-body；说明选项含义，点击可切换；不可省略。"],
  ["描述文字", "12px / Regular / text-tertiary；补充选项影响范围或前提条件。"],
  ["错误信息", "12px / Regular / error-text；必选未选或组合不合法时出现，位置统一在控件下方。"],
  ["禁用态", "整体 opacity=var(--disabled-opacity)；禁用项仍可见，让用户知道该项存在。"],
];

const stateRows = [
  ["未选", "neutral-300 边框 + 白色背景", "可点击选择；多项配置初始状态。"],
  ["选中", "neutral-900 填充 + 边框 + 白色对勾", "确认选项被选中；视觉优先级最高。"],
  ["半选", "neutral-900 填充 + 边框 + 白色横杠", "表达部分选择，用于表格全选和分组头。"],
  ["禁用未选", "opacity=0.48 + neutral-300 边框", "当前条件不满足，保留可见性。"],
  ["禁用选中", "opacity=0.48 + neutral-900 填充 + 对勾", "已被强制选中但不可更改的场景。"],
  ["错误", "error-text 边框 + error-text 文字", "必选未选或组合不合法，必须配合文案说明。"],
];

const checkboxProps = [
  ["label", "string", "—", "选项名称，必须提供；点击标签可切换选中。"],
  ["description", "string", "—", "补充影响范围、前提条件或权限说明。"],
  ["helperText", "string", "—", "辅助说明，不影响交互状态。"],
  ["error", "string", "—", "错误说明，驱动 error 边框和 aria-invalid。"],
  ["indeterminate", "boolean", "false", "半选态，仅用于表格全选或分组头。"],
  ["size", "sm | md", "md", "sm=14px，用于表格行内；md=16px，用于表单和设置。"],
  ["disabled", "boolean", "false", "禁用不可操作，保留可见性。"],
  ["checked / defaultChecked", "boolean", "—", "受控或非受控选中状态。"],
];

export default function CheckboxPage() {
  return (
    <div className="space-y-16">
      <PageHeader
        title="复选框"
        description="复选框用于多项选择、表格批量操作、字段权限配置和协议确认，支持未选、选中、半选和禁用状态。"
        note={<>关联页面：单个选项开关使用 <Link to="/components/switch" className="font-medium text-[var(--product-blue-500)]">开关</Link>；互斥单选使用 <Link to="/components/radio" className="font-medium text-[var(--product-blue-500)]">单选框</Link>。</>}
      />

      <section>
        <SectionHeading
          eyebrow="Anatomy"
          title="复选框结构"
          description="控件、标签、描述和错误信息使用基础规范 Token 统一控制尺寸与颜色；半选态通过 indeterminate 属性驱动，不由外部 CSS 覆盖。"
        />
        <div>
          <ExampleCard title="构成样式">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Checkbox label="允许查看材料数据" description="可进入详情页查看结构化字段。" defaultChecked />
              <Checkbox label="允许下载报告" description="下载行为会进入审计日志。" />
            </div>
            <div className="mt-6 border-t border-[var(--neutral-200)] pt-6">
              <DocsTable>
                <thead className="bg-[var(--neutral-50)] text-sm font-semibold text-[var(--text-primary)]">
                  <tr className="border-b border-[var(--neutral-200)]">
                    <th className="px-6 py-3 font-semibold">构成</th>
                    <th className="px-6 py-3 font-semibold">视觉与使用规则</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--neutral-100)] bg-white">
                  {anatomyRows.map(([name, rule]) => (
                    <tr key={name}>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-[var(--text-primary)]">{name}</td>
                      <td className="px-6 py-4 text-sm leading-6 text-[var(--text-secondary)]">{rule}</td>
                    </tr>
                  ))}
                </tbody>
              </DocsTable>
            </div>
          </ExampleCard>
        </div>
      </section>

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
              <Checkbox label="半选状态" indeterminate helperText="表达当前页或分组部分选择。" />
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
        <SectionHeading eyebrow="States" title="状态说明" description="每个状态不可只依赖颜色；错误和禁用必须有文字或上下文说明原因。" />
        <DocsTable>
          <thead className="bg-[var(--neutral-50)] text-sm font-semibold text-[var(--text-primary)]">
            <tr className="border-b border-[var(--neutral-200)]">
              <th className="px-6 py-3 font-semibold">状态</th>
              <th className="px-6 py-3 font-semibold">Token</th>
              <th className="px-6 py-3 font-semibold">说明</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--neutral-100)] bg-white">
            {stateRows.map(([state, token, rule]) => (
              <tr key={state}>
                <td className="px-6 py-4 text-sm font-semibold text-[var(--text-primary)]">{state}</td>
                <td className="px-6 py-4 text-sm text-[var(--text-secondary)]">{token}</td>
                <td className="px-6 py-4 text-sm leading-6 text-[var(--text-secondary)]">{rule}</td>
              </tr>
            ))}
          </tbody>
        </DocsTable>
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
        <SectionHeading eyebrow="Do / Don't" title="正确与错误示例" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="flex overflow-hidden rounded-[var(--radius-sm)]"><div className="flex min-w-0 flex-1 flex-col"><ExampleCard className="h-full flex-1" title="正确：多选项用复选框"><div className="flex flex-col gap-3"><Checkbox label="成分" defaultChecked /><Checkbox label="工艺" /><Checkbox label="性能" /></div></ExampleCard><div className="h-0.5 w-full shrink-0 bg-[var(--success-solid)]" /></div></div>
          <div className="flex overflow-hidden rounded-[var(--radius-sm)]"><div className="flex min-w-0 flex-1 flex-col"><ExampleCard className="h-full flex-1" title="错误：互斥选项用复选框"><div className="flex flex-col gap-3"><Checkbox label="通过" /><Checkbox label="驳回" /></div><p className="mt-2 text-xs leading-5 text-[var(--text-tertiary)]">互斥选择应使用 Radio；用户可能同时勾选两个对立的选项。</p></ExampleCard><div className="h-0.5 w-full shrink-0 bg-[var(--error-solid)]" /></div></div>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="flex overflow-hidden rounded-[var(--radius-sm)]"><div className="flex min-w-0 flex-1 flex-col"><ExampleCard className="h-full flex-1" title="正确：禁用保留可见性"><Checkbox label="外部组织访问" description="审批通过后自动启用。" disabled /></ExampleCard><div className="h-0.5 w-full shrink-0 bg-[var(--success-solid)]" /></div></div>
          <div className="flex overflow-hidden rounded-[var(--radius-sm)]"><div className="flex min-w-0 flex-1 flex-col"><ExampleCard className="h-full flex-1" title="错误：删除不可用选项"><p className="text-sm text-[var(--text-secondary)]">用户看不到"外部组织访问"选项，无法理解权限边界。</p></ExampleCard><div className="h-0.5 w-full shrink-0 bg-[var(--error-solid)]" /></div></div>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Guidelines" title="最佳实践" />
        <SpecList
          items={[
            "复选框用于多项选择；单项开关类设置优先使用 Switch。",
            "表格批量选择必须支持半选状态，表达当前页或当前分组的部分选择。",
            "后台字段权限建议保留描述文本，说明选项影响范围。",
            "禁用项需要保留标签，让用户知道该项存在但当前不可操作。",
            "协议确认类复选框应放在提交按钮上方，文案必须明确责任和后果。",
            "错误态必须展示文字原因，不只依赖红色边框。",
            "选中态使用 neutral-900 填充，与任务按钮和焦点环保持一致。",
            "复选框间距使用 selection-control-gap（8px），确保点击区域充足。",
          ]}
        />
      </section>

      <section>
        <SectionHeading eyebrow="API" title="属性与实现边界" />
        <DocsTable>
          <thead className="bg-[var(--neutral-50)] text-sm font-semibold text-[var(--text-primary)]">
            <tr className="border-b border-[var(--neutral-200)]">
              <th className="px-6 py-3 font-semibold">属性</th>
              <th className="px-6 py-3 font-semibold">类型</th>
              <th className="px-6 py-3 font-semibold">默认值</th>
              <th className="px-6 py-3 font-semibold">规则</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--neutral-100)] bg-white">
            {checkboxProps.map(([name, type, defaultValue, rule]) => (
              <tr key={name}>
                <td className="px-6 py-4 text-sm text-[var(--text-primary)]">{name}</td>
                <td className="px-6 py-4 text-sm text-[var(--text-secondary)]">{type}</td>
                <td className="px-6 py-4 text-sm text-[var(--text-secondary)]">{defaultValue}</td>
                <td className="px-6 py-4 text-sm leading-6 text-[var(--text-secondary)]">{rule}</td>
              </tr>
            ))}
          </tbody>
        </DocsTable>
      </section>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Link to="/components/switch" className="group flex items-center gap-3 rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-5 transition-all hover:border-[var(--neutral-300)] hover:bg-[var(--neutral-50)]">
          <ArrowLeft size={18} weight="regular" className="text-[var(--text-tertiary)]" />
          <div><div className="text-xs text-[var(--text-tertiary)]">上一步</div><h3 className="mt-1 text-sm font-semibold text-[var(--text-primary)]">开关</h3></div>
        </Link>
        <Link to="/components/radio" className="group flex items-center justify-between gap-3 rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-5 transition-all hover:border-[var(--neutral-300)] hover:bg-[var(--neutral-50)]">
          <div><div className="text-xs text-[var(--text-tertiary)]">下一步</div><h3 className="mt-1 text-sm font-semibold text-[var(--text-primary)]">单选框</h3></div>
          <ArrowRight size={18} weight="regular" className="text-[var(--text-tertiary)]" />
        </Link>
      </div>
    </div>
  );
}
