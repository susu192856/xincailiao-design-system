import { useState } from "react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import DocsTable from "../../../components/docs/DocsTable";
import { Upload } from "../../../components/ui/Upload";
import type { UploadFile } from "../../../components/ui/Upload";

const anatomyRows = [
  ["拖拽区", "2px 虚线边框 + neutral-50 背景；hover 时 product-blue-400 边框 + product-blue-50 背景；error 时 error-text 边框 + error-bg 背景。"],
  ["上传图标", "CloudArrowUp，h-8 w-8 / text-tertiary；仅视觉引导，aria-hidden=true。"],
  ["引导文案", "14px / text-secondary；点击或拖拽触发文件选择。"],
  ["格式与大小提示", "12px / text-tertiary；明确支持格式和大小上限。"],
  ["文件列表", "文本列表（linear）或卡片网格（card）；每种文件状态有对应图标和操作。"],
];

const stateRows = [
  ["默认", "neutral-300 虚线边框", "等待用户操作或拖入文件。"],
  ["拖入悬停", "product-blue-400 虚线边框 + product-blue-50 背景", "视觉确认目标区域。"],
  ["已上传", "neutral-200 实线边框 + 文件名/大小/删除按钮", "允许删除。"],
  ["上传失败", "error-text 边框 + error-text 错误原因", "明确失败原因和解决方式。"],
  ["禁用", "cursor-not-allowed + neutral-200 边框 + neutral-50 背景", "当前条件不允许上传。"],
];

const uploadProps = [
  ["label", "string", "—", "上传区域的标题。"],
  ["helperText", "string", "—", "补充格式、大小、用途说明。"],
  ["error", "string", "—", "全局错误信息。"],
  ["accept", "string", "—", "限制可选文件类型，如 .pdf,.xlsx。"],
  ["multiple", "boolean", "false", "是否允许多文件。"],
  ["maxFiles", "number", "—", "最大文件数。"],
  ["maxSize", "number", "—", "单文件最大字节数。"],
  ["disabled", "boolean", "false", "禁用上传。"],
  ["files", "UploadFile[]", "—", "受控文件列表。"],
  ["onChange", "(files) => void", "—", "文件列表变化回调。"],
  ["onRemove", "(file) => void", "—", "删除文件回调。"],
  ["listType", "text | card", "text", "文件展示模式。"],
];

export default function UploadPage() {
  const [files, setFiles] = useState<UploadFile[]>([
    { id: "1", name: "材料数据表-2026Q2.xlsx", size: 2457600, status: "done" },
    { id: "2", name: "性能参数汇总.pdf", size: 1024000, status: "done" },
  ]);

  return (
    <div className="space-y-16">
      <PageHeader
        title="文件上传"
        description="用于文件选择与上传，支持拖拽、多文件、格式和大小限制。"
        note={<>关联页面：上传组件在 <Link to="/components/form" className="font-medium text-[var(--product-blue-500)]">表单</Link> 中常与输入框和选择器组合使用。</>}
      />

      <section>
        <SectionHeading eyebrow="Anatomy" title="上传结构" description="拖拽区提供明确的视觉引导；文件列表支持文本行和卡片网格两种模式。" />
        <div>
          <ExampleCard title="构成样式">
            <Upload label="上传文件" helperText="支持 PDF、Excel、图片格式" accept=".pdf,.xlsx,.xls,.png,.jpg" />
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
        <SectionHeading eyebrow="Variants" title="基础用法" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="默认上传">
            <Upload label="上传文件" helperText="支持 PDF、Excel、图片格式" accept=".pdf,.xlsx,.xls,.png,.jpg" />
          </ExampleCard>
          <ExampleCard title="多文件上传">
            <Upload
              label="批量上传材料数据"
              multiple
              maxFiles={5}
              helperText="最多 5 个文件"
              files={files}
              onChange={setFiles}
            />
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="States" title="状态" />
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
        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="限制大小">
            <Upload label="上传文件" maxSize={2 * 1024 * 1024} helperText="单文件不超过 2MB" />
          </ExampleCard>
          <ExampleCard title="禁用">
            <Upload label="上传文件" disabled helperText="当前不可上传" />
          </ExampleCard>
          <ExampleCard title="错误">
            <Upload label="上传文件" error="文件格式不符合要求，请重新选择" />
          </ExampleCard>
          <ExampleCard title="卡片列表">
            <Upload
              label="材料图片"
              listType="card"
              multiple
              accept=".png,.jpg,.jpeg"
              files={[
                { id: "a", name: "样品照片-01.png", size: 512000, status: "done" },
                { id: "b", name: "检测报告.jpg", size: 890000, status: "done" },
                { id: "c", name: "超大文件.pdf", size: 10485760, status: "error", errorMessage: "文件大小超过 5MB 限制" },
              ]}
            />
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Do / Don't" title="正确与错误示例" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="flex overflow-hidden rounded-[var(--radius-sm)]"><div className="flex min-w-0 flex-1 flex-col"><ExampleCard className="h-full flex-1" title="正确：明确格式和大小限制"><Upload label="上传检测报告" accept=".pdf,.xlsx" maxSize={5 * 1024 * 1024} helperText="支持 PDF、Excel，单文件不超过 5MB。" /></ExampleCard><div className="h-0.5 w-full shrink-0 bg-[var(--success-solid)]" /></div></div>
          <div className="flex overflow-hidden rounded-[var(--radius-sm)]"><div className="flex min-w-0 flex-1 flex-col"><ExampleCard className="h-full flex-1" title="错误：无任何限制说明"><Upload label="上传文件" /><p className="mt-2 text-xs leading-5 text-[var(--text-tertiary)]">用户不知支持什么格式，失败后才被告知——应提前说明。</p></ExampleCard><div className="h-0.5 w-full shrink-0 bg-[var(--error-solid)]" /></div></div>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Guidelines" title="最佳实践" />
        <SpecList
          items={[
            "上传区应明确支持的文件格式和大小限制，避免用户上传失败后才获知规则。",
            "批量上传需限制最大文件数，超出时截断并提示。",
            "文件列表支持文本列表和卡片网格两种展示模式。",
            "上传失败应显示具体原因（格式错误、大小超限、网络异常）。",
            "拖拽上传区有键盘支持（Enter/Space 触发），role=button 且可聚焦。",
            "仅支持前端文件选择和预览，实际上传需结合后端接口。",
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
            {uploadProps.map(([name, type, defaultValue, rule]) => (
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
        <Link to="/components/form" className="group flex items-center justify-between gap-3 rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-5 transition-all hover:border-[var(--neutral-300)] hover:bg-[var(--neutral-50)]">
          <div><div className="text-xs text-[var(--text-tertiary)]">下一步</div><h3 className="mt-1 text-sm font-semibold text-[var(--text-primary)]">表单</h3></div>
          <ArrowRight size={18} weight="regular" className="text-[var(--text-tertiary)]" />
        </Link>
      </div>
    </div>
  );
}
