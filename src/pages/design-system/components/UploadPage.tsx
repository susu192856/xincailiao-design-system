import { useState } from "react";
import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import { Upload } from "../../../components/ui/Upload";
import type { UploadFile } from "../../../components/ui/Upload";

export default function UploadPage() {
  const [files, setFiles] = useState<UploadFile[]>([
    { id: "1", name: "材料数据表-2026Q2.xlsx", size: 2457600, status: "done" },
    { id: "2", name: "性能参数汇总.pdf", size: 1024000, status: "done" },
  ]);

  return (
    <div className="space-y-16">
      <PageHeader title="文件上传" description="用于文件选择与上传，支持拖拽、多文件、格式和大小限制。" />

      <section>
        <SectionHeading eyebrow="Variants" title="基础用法" />
        <div className="grid grid-cols-1 gap-5">
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
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
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
        <SectionHeading eyebrow="Backend Scenarios" title="后台业务场景" />
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-[var(--neutral-100)] px-3 py-1 text-xs text-[var(--neutral-600)]">材料数据导入</span>
            <span className="rounded-full bg-[var(--neutral-100)] px-3 py-1 text-xs text-[var(--neutral-600)]">检测报告上传</span>
            <span className="rounded-full bg-[var(--neutral-100)] px-3 py-1 text-xs text-[var(--neutral-600)]">图片附件上传</span>
            <span className="rounded-full bg-[var(--neutral-100)] px-3 py-1 text-xs text-[var(--neutral-600)]">批量导入 Excel</span>
          </div>
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
            "仅支持前端文件选择和预览，实际上传需结合后端接口。",
            "Figma 组件需包含默认、拖拽悬停、已选文件列表、错误和禁用状态。",
          ]}
        />
      </section>
    </div>
  );
}
