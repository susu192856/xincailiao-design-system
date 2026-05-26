import PageHeader from "../../../components/docs/PageHeader";
import { SectionHeading } from "../../../components/docs/ComponentDoc";
import { Checkbox } from "../../../components/ui/Checkbox";

export default function CheckboxPage() {
  return (
    <div className="space-y-16">
      <PageHeader title="复选框 Checkbox" description="用于多选场景，支持选中、未选中和禁用状态。" />

      <section>
        <SectionHeading eyebrow="Demo" title="基本用法" />
        <div className="flex flex-col gap-4 rounded-sm border border-[var(--neutral-200)] bg-white p-6">
          <Checkbox label="数据空间" />
          <Checkbox label="材库" defaultChecked />
          <Checkbox label="AI 应用" disabled />
          <Checkbox label="智能选材" disabled defaultChecked />
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Props" title="属性" />
        <div className="overflow-hidden rounded-none border border-[var(--neutral-200)]">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-[var(--neutral-50)] text-sm font-semibold text-[var(--neutral-900)]">
              <tr className="border-b border-[var(--neutral-200)]">
                <th className="px-6 py-3 font-semibold">属性</th>
                <th className="px-6 py-3 font-semibold">类型</th>
                <th className="px-6 py-3 font-semibold">说明</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--neutral-200)] bg-white">
              <tr><td className="px-6 py-4 font-mono text-xs">label</td><td className="px-6 py-4 text-sm">string</td><td className="px-6 py-4 text-sm">标签文字</td></tr>
              <tr><td className="px-6 py-4 font-mono text-xs">defaultChecked</td><td className="px-6 py-4 text-sm">boolean</td><td className="px-6 py-4 text-sm">默认选中</td></tr>
              <tr><td className="px-6 py-4 font-mono text-xs">disabled</td><td className="px-6 py-4 text-sm">boolean</td><td className="px-6 py-4 text-sm">禁用</td></tr>
              <tr><td className="px-6 py-4 font-mono text-xs">indeterminate</td><td className="px-6 py-4 text-sm">boolean</td><td className="px-6 py-4 text-sm">半选状态（未实现 UI）</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
