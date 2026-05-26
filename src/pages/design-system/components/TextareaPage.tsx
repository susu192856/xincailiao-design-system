import PageHeader from "../../../components/docs/PageHeader";
import { SectionHeading } from "../../../components/docs/ComponentDoc";
import { Textarea } from "../../../components/ui/Textarea";
import { Button } from "../../../components/ui/Button";

export default function TextareaPage() {
  return (
    <div className="space-y-16">
      <PageHeader title="文本域 Textarea" description="用于多行文本输入，支持 label、helper text 和 error 态。" />

      <section>
        <SectionHeading eyebrow="Demo" title="基本用法" />
        <div className="flex flex-col gap-6 rounded-sm border border-[var(--neutral-200)] bg-white p-6">
          <Textarea label="备注" placeholder="请输入备注信息..." />
          <Textarea label="配置内容" helperText="支持 JSON 格式" defaultValue='{"enabled": true}' />
          <Textarea label="错误示例" error="输入内容不符合规范" />
          <Textarea label="禁用" disabled value="只读内容" />
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
                <th className="px-6 py-3 font-semibold">默认值</th>
                <th className="px-6 py-3 font-semibold">说明</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--neutral-200)] bg-white">
              <tr><td className="px-6 py-4 font-mono text-xs">label</td><td className="px-6 py-4 text-sm">string</td><td className="px-6 py-4 text-sm">—</td><td className="px-6 py-4 text-sm">标签文字</td></tr>
              <tr><td className="px-6 py-4 font-mono text-xs">inputSize</td><td className="px-6 py-4 text-sm">sm | md | lg</td><td className="px-6 py-4 text-sm">md</td><td className="px-6 py-4 text-sm">尺寸</td></tr>
              <tr><td className="px-6 py-4 font-mono text-xs">helperText</td><td className="px-6 py-4 text-sm">string</td><td className="px-6 py-4 text-sm">—</td><td className="px-6 py-4 text-sm">帮助文字</td></tr>
              <tr><td className="px-6 py-4 font-mono text-xs">error</td><td className="px-6 py-4 text-sm">string</td><td className="px-6 py-4 text-sm">—</td><td className="px-6 py-4 text-sm">错误提示</td></tr>
              <tr><td className="px-6 py-4 font-mono text-xs">disabled</td><td className="px-6 py-4 text-sm">boolean</td><td className="px-6 py-4 text-sm">false</td><td className="px-6 py-4 text-sm">禁用</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
