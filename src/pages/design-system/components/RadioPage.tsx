import PageHeader from "../../../components/docs/PageHeader";
import { SectionHeading } from "../../../components/docs/ComponentDoc";
import { Radio } from "../../../components/ui/Radio";

export default function RadioPage() {
  return (
    <div className="space-y-16">
      <PageHeader title="单选框 Radio" description="用于单选场景，同一组中只能选择一个选项。" />

      <section>
        <SectionHeading eyebrow="Demo" title="基本用法" description="同一 name 的 Radio 自动形成互斥组。" />
        <div className="flex flex-col gap-4 rounded-sm border border-[var(--neutral-200)] bg-white p-6">
          <Radio name="demo" label="数据空间" defaultChecked />
          <Radio name="demo" label="材库" />
          <Radio name="demo" label="AI 应用" disabled />
          <Radio name="demo2" label="禁用选项" disabled />
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
              <tr><td className="px-6 py-4 font-mono text-xs">name</td><td className="px-6 py-4 text-sm">string</td><td className="px-6 py-4 text-sm">互斥组名称（同一组用相同 name）</td></tr>
              <tr><td className="px-6 py-4 font-mono text-xs">label</td><td className="px-6 py-4 text-sm">string</td><td className="px-6 py-4 text-sm">标签文字</td></tr>
              <tr><td className="px-6 py-4 font-mono text-xs">defaultChecked</td><td className="px-6 py-4 text-sm">boolean</td><td className="px-6 py-4 text-sm">默认选中</td></tr>
              <tr><td className="px-6 py-4 font-mono text-xs">disabled</td><td className="px-6 py-4 text-sm">boolean</td><td className="px-6 py-4 text-sm">禁用</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
