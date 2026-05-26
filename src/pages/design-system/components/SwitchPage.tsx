import PageHeader from "../../../components/docs/PageHeader";
import { SectionHeading } from "../../../components/docs/ComponentDoc";
import { Switch } from "../../../components/ui/Switch";

export default function SwitchPage() {
  return (
    <div className="space-y-16">
      <PageHeader title="开关 Switch" description="用于切换开关状态，常用于功能启停、权限开关、设置项等二选一场景。" />

      <section>
        <SectionHeading eyebrow="Demo" title="基本用法" description="Switch 支持 sm / md 两种尺寸，带可选 label。" />
        <div className="flex flex-col gap-5 rounded-sm border border-[var(--neutral-200)] bg-white p-6">
          <Switch label="开启消息通知" />
          <Switch label="允许数据同步" defaultChecked />
          <Switch label="暗色模式" disabled />
          <Switch size="sm" label="紧凑模式" />
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
              <tr><td className="px-6 py-4 font-mono text-xs">size</td><td className="px-6 py-4 text-sm">sm | md</td><td className="px-6 py-4 text-sm">md</td><td className="px-6 py-4 text-sm">尺寸</td></tr>
              <tr><td className="px-6 py-4 font-mono text-xs">defaultChecked</td><td className="px-6 py-4 text-sm">boolean</td><td className="px-6 py-4 text-sm">false</td><td className="px-6 py-4 text-sm">默认选中</td></tr>
              <tr><td className="px-6 py-4 font-mono text-xs">disabled</td><td className="px-6 py-4 text-sm">boolean</td><td className="px-6 py-4 text-sm">false</td><td className="px-6 py-4 text-sm">禁用</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Note" title="颜色语义" />
        <div className="rounded-sm border border-[var(--neutral-200)] bg-white p-6">
          <p className="text-sm leading-6 text-[var(--neutral-600)]">
            Switch 开启态使用 <strong>产品蓝 #006DEA</strong>，表示功能已激活。不使用纯黑避免「黑色=关闭」的歧义。
            关闭态使用 <strong>neutral-300 (#D5DAE1)</strong>，表示功能未启用。
          </p>
        </div>
      </section>
    </div>
  );
}
