import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import DocsTable from "../../../components/docs/DocsTable";
import { Switch } from "../../../components/ui/Switch";
import { Tag } from "../../../components/ui/Tag";

const anatomyRows = [
  ["轨道", "圆角通栏，sm=36×20px / md=44×24px；关闭态 neutral-300，开启态 product-blue-500。"],
  ["滑块", "白色圆形，sm=16px / md=20px；开启时向右平移，无额外描边。"],
  ["标签文字", "14px / Regular / text-body；说明开关控制的能力。"],
  ["描述文字", "12px / Regular / text-tertiary；补充开关影响范围或风险提示。"],
  ["错误信息", "12px / Regular / error-text；高风险开关需在错误态中说明原因。"],
];

const stateRows = [
  ["关闭", "neutral-300 轨道 + 左侧白色滑块", "功能未激活。"],
  ["开启", "product-blue-500 轨道 + 右侧白色滑块", "功能已激活，即时生效。"],
  ["禁用关闭", "opacity=0.48", "条件不满足，不可开启。"],
  ["禁用开启", "opacity=0.48", "已被强制开启但不可关闭。"],
  ["错误", "neutral-200 轨道 + error-text 外环 + error-text 说明", "高风险开关需要二次确认解释。"],
];

const switchProps = [
  ["label", "string", "—", "开关名称，必须提供。"],
  ["description", "string", "—", "补充影响范围或前置条件。"],
  ["helperText", "string", "—", "辅助说明。"],
  ["error", "string", "—", "错误说明，驱动 error 环和 aria-invalid。"],
  ["size", "sm | md", "md", "sm=表格行内/紧凑区，md=设置页/表单默认。"],
  ["disabled", "boolean", "false", "禁用不可操作，保留可见性。"],
  ["checked / defaultChecked", "boolean", "—", "受控或非受控开关状态。"],
];

export default function SwitchPage() {
  return (
    <div className="space-y-16">
      <PageHeader
        title="开关"
        description="开关用于即时启停某项能力，常见于功能配置、权限开关、通知设置和自动化任务。"
        note={<>关联页面：需要提交表单后才生效的选项使用 <Link to="/components/checkbox" className="font-medium text-[var(--product-blue-500)]">复选框</Link>。</>}
      />

      <section>
        <SectionHeading eyebrow="Anatomy" title="开关结构" description="开关由轨道、滑块和标签组成，开启态使用 product-blue，与其他选中控件保持一致的品牌语义。" />
        <div>
          <ExampleCard title="构成样式">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Switch label="开启消息通知" description="任务完成后推送站内消息。" />
              <Switch label="允许数据自动同步" description="开启后每 10 分钟同步一次。" defaultChecked />
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
          <ExampleCard title="设置项" description="Switch 表示开关后立即生效，不等待表单提交。">
            <div className="flex flex-col gap-5">
              <Switch label="开启消息通知" description="任务完成后推送站内消息。" />
              <Switch label="允许数据自动同步" description="开启后每 10 分钟同步一次。" defaultChecked />
              <Switch label="外部组织访问" description="当前流程未完成审批。" disabled />
            </div>
          </ExampleCard>
          <ExampleCard title="尺寸对比">
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-[var(--neutral-50)] px-3 py-2">
                <span className="text-sm text-[var(--text-secondary)]">设置页标准开关</span>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between bg-[var(--neutral-50)] px-3 py-2">
                <span className="text-sm text-[var(--text-secondary)]">表格行内开关</span>
                <Switch size="sm" />
              </div>
            </div>
            <p className="mt-4 text-xs leading-5 text-[var(--text-tertiary)]">开启态使用产品蓝，表示功能处于激活状态；不使用品牌红表达普通启用。</p>
          </ExampleCard>
          <ExampleCard title="风险状态">
            <div className="space-y-4">
              <Switch label="自动发布结果" error="该开关影响外部可见性，需要二次确认。" />
              <Switch label="链上存证" helperText="开启后会写入审计链路。" defaultChecked />
              <Switch label="删除后自动清理关联数据" disabled description="高风险能力默认不可直接启用。" />
            </div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="States" title="状态说明" />
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
        <SectionHeading eyebrow="Backend States" title="后台典型场景" description="开关常用于配置中心、权限能力、自动化任务和消息通知。" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <ExampleCard title="数据空间配置" description="规则与可信流通相关开关。">
            <div className="space-y-4">
              <Switch label="开启链上存证" description="记录数据流通关键节点。" defaultChecked />
              <Switch label="允许跨组织流通" description="开启前需要完成合约配置。" />
              <Switch label="开放外部下载" description="当前角色无权限。" disabled />
            </div>
          </ExampleCard>
          <ExampleCard title="AI 任务配置" description="模型推演与决策辅助能力。">
            <div className="space-y-4">
              <Switch label="自动推荐材料方案" defaultChecked />
              <Switch label="异常结果提醒" description="异常时提醒数据负责人。" defaultChecked />
              <Switch label="自动发布结果" error="建议使用确认弹窗后再开启。" />
            </div>
          </ExampleCard>
          <ExampleCard title="开关风险等级">
            <div className="space-y-3">
              <Tag variant="product" size="sm">普通功能可即时切换</Tag>
              <Tag variant="warning" size="sm">影响权限需二次确认</Tag>
              <Tag variant="error" size="sm">危险开关需审批流</Tag>
            </div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Do / Don't" title="正确与错误示例" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="flex overflow-hidden rounded-[var(--radius-sm)]"><div className="flex min-w-0 flex-1 flex-col"><ExampleCard className="h-full flex-1" title="正确：即时生效用 Switch"><Switch label="消息通知" defaultChecked /></ExampleCard><div className="h-0.5 w-full shrink-0 bg-[var(--success-solid)]" /></div></div>
          <div className="flex overflow-hidden rounded-[var(--radius-sm)]"><div className="flex min-w-0 flex-1 flex-col"><ExampleCard className="h-full flex-1" title="错误：需提交保存才生效用 Switch"><Switch label="同意服务条款" /><p className="mt-2 text-xs leading-5 text-[var(--text-tertiary)]">需要用户显式提交确认的选项应使用 Checkbox，避免误触。</p></ExampleCard><div className="h-0.5 w-full shrink-0 bg-[var(--error-solid)]" /></div></div>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Guidelines" title="最佳实践" />
        <SpecList
          items={[
            "Switch 表示即时生效，若需要提交表单后才生效，应使用 Checkbox 或 Select。",
            "开启态使用 product-blue，表示功能激活；品牌红不用于普通开关。",
            "影响权限、发布、外部共享的开关需要二次确认或审批提示。",
            "高风险开关需要显示说明或错误提示，不能只依赖颜色表达风险。",
            "表格行内使用 sm 尺寸，设置页使用 md 尺寸。",
            "开关标签应描述开启后的效果（如'允许自动同步'），而非仅描述功能名词。",
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
            {switchProps.map(([name, type, defaultValue, rule]) => (
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
        <Link to="/components/radio" className="group flex items-center gap-3 rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-5 transition-all hover:border-[var(--neutral-300)] hover:bg-[var(--neutral-50)]">
          <ArrowLeft size={18} weight="regular" className="text-[var(--text-tertiary)]" />
          <div><div className="text-xs text-[var(--text-tertiary)]">上一步</div><h3 className="mt-1 text-sm font-semibold text-[var(--text-primary)]">单选框</h3></div>
        </Link>
        <Link to="/components/checkbox" className="group flex items-center justify-between gap-3 rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-5 transition-all hover:border-[var(--neutral-300)] hover:bg-[var(--neutral-50)]">
          <div><div className="text-xs text-[var(--text-tertiary)]">下一步</div><h3 className="mt-1 text-sm font-semibold text-[var(--text-primary)]">复选框</h3></div>
          <ArrowRight size={18} weight="regular" className="text-[var(--text-tertiary)]" />
        </Link>
      </div>
    </div>
  );
}
