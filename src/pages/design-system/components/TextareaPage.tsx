import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import DocsTable from "../../../components/docs/DocsTable";
import { Textarea } from "../../../components/ui/Textarea";

export default function TextareaPage() {
  return (
    <div className="space-y-16">
      <PageHeader title="文本域" description="文本域用于多行文本录入，适合备注、审核意见、数据来源说明、JSON 配置和长描述字段。" />

      <section>
        <SectionHeading eyebrow="Variants" title="文本域类型" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="基础输入">
            <div className="space-y-4">
              <Textarea label="数据来源说明" placeholder="请输入数据来源、采集方式和处理过程" required />
              <Textarea label="备注" placeholder="请输入备注信息" helperText="建议不超过 200 字，保留必要业务上下文。" />
            </div>
          </ExampleCard>
          <ExampleCard title="状态输入">
            <div className="space-y-4">
              <Textarea label="审核意见" error="驳回时必须填写审核意见" placeholder="请输入驳回原因" />
              <Textarea label="系统生成摘要" readOnly value="该材料数据由企业上传，经平台解析后生成结构化字段。" />
              <Textarea label="禁用状态" disabled value="当前流程节点不可编辑。" />
            </div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Sizes" title="文本域尺寸" />
        <ExampleCard title="Small / Medium / Large">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Textarea size="sm" label="Small" placeholder="表格行备注" />
            <Textarea size="md" label="Medium" placeholder="默认备注输入" />
            <Textarea size="lg" label="Large" placeholder="长说明、规则配置或数据治理说明" />
          </div>
        </ExampleCard>
      </section>

      <section>
        <SectionHeading eyebrow="Backend States" title="后台典型场景" description="文本域在后台并不只用于备注，还常用于审批流、规则配置、数据治理说明和异常原因记录。" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="审批与流程">
            <div className="space-y-4">
              <Textarea label="审批意见" placeholder="请输入通过或驳回理由" />
              <Textarea label="异常说明" error="异常关闭前必须填写处理说明" placeholder="说明异常原因与处理结果" />
            </div>
          </ExampleCard>
          <ExampleCard title="配置与结构化内容">
            <div className="space-y-4">
              <Textarea
                label="JSON 配置"
                size="lg"
                defaultValue={'{\n  "visibility": "team",\n  "auditRequired": true\n}'}
                helperText="代码类内容建议使用等宽字体容器或独立代码编辑器。"
                className="font-mono text-xs leading-5"
              />
              <Textarea label="只读记录" readOnly value="2026-06-04 13:08 由系统完成数据解析并生成字段映射。" />
            </div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Props" title="属性" />
        <DocsTable>
          <thead className="bg-[var(--neutral-50)] text-sm font-semibold text-[var(--neutral-900)]">
            <tr className="border-b border-[var(--neutral-200)]">
              <th className="px-6 py-3 font-semibold">属性</th>
              <th className="px-6 py-3 font-semibold">类型</th>
              <th className="px-6 py-3 font-semibold">默认值</th>
              <th className="px-6 py-3 font-semibold">说明</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--neutral-200)] bg-white">
            <tr><td className="px-6 py-4 font-mono text-xs">label</td><td className="px-6 py-4">string</td><td className="px-6 py-4">-</td><td className="px-6 py-4">标签文字</td></tr>
            <tr><td className="px-6 py-4 font-mono text-xs">size</td><td className="px-6 py-4">sm | md | lg</td><td className="px-6 py-4">md</td><td className="px-6 py-4">推荐使用的新尺寸 API</td></tr>
            <tr><td className="px-6 py-4 font-mono text-xs">inputSize</td><td className="px-6 py-4">sm | md | lg</td><td className="px-6 py-4">md</td><td className="px-6 py-4">兼容旧 API，后续推荐迁移到 size</td></tr>
            <tr><td className="px-6 py-4 font-mono text-xs">helperText</td><td className="px-6 py-4">string</td><td className="px-6 py-4">-</td><td className="px-6 py-4">帮助文字</td></tr>
            <tr><td className="px-6 py-4 font-mono text-xs">error</td><td className="px-6 py-4">string</td><td className="px-6 py-4">-</td><td className="px-6 py-4">错误提示，并驱动错误边框</td></tr>
            <tr><td className="px-6 py-4 font-mono text-xs">readOnly</td><td className="px-6 py-4">boolean</td><td className="px-6 py-4">false</td><td className="px-6 py-4">只读展示，用于审核后字段或系统记录</td></tr>
            <tr><td className="px-6 py-4 font-mono text-xs">disabled</td><td className="px-6 py-4">boolean</td><td className="px-6 py-4">false</td><td className="px-6 py-4">禁用状态，用于当前节点不可操作</td></tr>
          </tbody>
        </DocsTable>
      </section>

      <section>
        <SectionHeading eyebrow="Guidelines" title="使用建议" />
        <SpecList
          items={[
            "文本域应优先用于需要上下文的多行内容，不要替代短文本输入框。",
            "后台审批、驳回、异常关闭等场景必须提供错误或必填提示。",
            "只读和禁用要区分：只读表示可查看不可编辑，禁用表示当前流程不可操作。",
            "长配置或代码内容应控制高度并允许滚动，避免撑开表单页面。",
            "Figma 和前端组件需要覆盖 helperText、error、readOnly、disabled、required、代码类内容高度限制等状态，用于审批和配置页面复用。",
          ]}
        />
      </section>
    </div>
  );
}
