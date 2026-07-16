import { ArrowLeft, ArrowRight, ArrowsClockwise, CaretDown, CaretUp, DownloadSimple, Plus, Trash } from "@phosphor-icons/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading } from "../../../components/docs/ComponentDoc";
import CodeBlock from "../../../components/docs/CodeBlock";
import DocsTable from "../../../components/docs/DocsTable";
import { Button } from "../../../components/ui/Button";
import { Checkbox } from "../../../components/ui/Checkbox";
import { Form, FormActions, FormGrid, FormSection, FormStateBanner } from "../../../components/ui/Form";
import { Input } from "../../../components/ui/Input";
import { Radio } from "../../../components/ui/Radio";
import { Select } from "../../../components/ui/Select";
import { Textarea } from "../../../components/ui/Textarea";
import { Upload } from "../../../components/ui/Upload";
import type { UploadFile } from "../../../components/ui/Upload";

export default function FormPage() {
  const [advancedFiltersOpen, setAdvancedFiltersOpen] = useState(true);
  const [attachmentFiles, setAttachmentFiles] = useState<UploadFile[]>([
    { id: "form-attachment-1", name: "TC4-拉伸试验报告.pdf", size: 1_048_576, status: "done" },
  ]);
  const [imageFiles, setImageFiles] = useState<UploadFile[]>([
    { id: "form-image-1", name: "试样断口-正面.jpg", size: 624_640, status: "done" },
    { id: "form-image-2", name: "试样断口-侧面.jpg", size: 589_824, status: "done" },
  ]);

  return (
    <div className="space-y-16">
      <PageHeader title="表单" description="表单用于承载字段录入、校验反馈、权限配置和业务提交，是后台产品最高频的组合组件。" note={<>关联页面：单个字段的结构、尺寸与状态见 <Link to="/components/input" className="font-medium text-[var(--product-blue-500)]">输入框</Link>；提交后的只读结果由 <Link to="/components/description-list" className="font-medium text-[var(--product-blue-500)]">详情与描述列表</Link> 承载。</>} />
      <section>
        <SectionHeading eyebrow="Layout" title="表单布局" description="长表单通常纵向拥挤、横向富裕，桌面端主编辑区默认使用左右标签；窄容器和移动端自动回到上下结构。" />
        <div className="grid grid-cols-1 gap-5">
          <ExampleCard title="标准编辑表单 · 左右标签" description="适用于材料数据、模型参数和后台配置的新增 / 编辑页面。同一分组统一标签宽度。">
            <Form>
              <FormSection>
                <FormGrid columns={2}>
                  <Input labelPosition="left" labelWidth={88} label="材料名称" placeholder="请输入材料名称" required />
                  <Select labelPosition="left" labelWidth={88} label="材料分类" placeholder="请选择分类" options={[{ label: "钛合金", value: "ti" }, { label: "铝合金", value: "al" }, { label: "高温合金", value: "heat" }]} required />
                  <Input labelPosition="left" labelWidth={88} label="屈服强度" suffix="MPa" placeholder="请输入数值" />
                  <Input labelPosition="left" labelWidth={88} label="数据来源" placeholder="实验采集 / 企业上传" />
                  <Textarea labelPosition="left" labelWidth={88} label="说明" placeholder="请输入数据来源、加工方式或备注" helperText="说明文本用于审计和后续数据治理，不建议为空。" maxLength={300} showCount />
                </FormGrid>
              </FormSection>
              <FormActions>
                <Button variant="ghost">取消</Button>
                <Button>保存</Button>
              </FormActions>
            </Form>
          </ExampleCard>
          <ExampleCard title="表格页筛选与操作区" description="搜索框永远放第一位，用于跨字段搜索且通常不加左侧标签。不含标签时：普通筛选默认 220px，短枚举 180px，长文本、编号和名称使用 240px 或 280px，日期范围不小于 320px。筛选 / 重置固定在最后一行右侧；表格操作位于下方独立工具栏。">
            <div className="space-y-6">
              <div>
                <h3 className="mb-3 text-sm font-semibold text-[var(--text-primary)]">一行筛选</h3>
                <Form density="compact" className="max-w-[940px]">
                  <div className="grid grid-cols-1 gap-3 lg:grid-cols-[220px_220px_220px_auto]">
                    <Input aria-label="跨字段搜索" placeholder="搜索材料、编号、名称" />
                    <Select labelPosition="left" labelWidth={64} label="数据状态" placeholder="全部" options={[{ label: "全部状态", value: "all" }, { label: "待审核", value: "review" }, { label: "已发布", value: "published" }]} />
                    <Select labelPosition="left" labelWidth={64} label="权限范围" placeholder="全部" options={[{ label: "全部权限", value: "all" }, { label: "团队可见", value: "team" }, { label: "公开流通", value: "public" }]} />
                    <div className="flex items-center justify-end gap-2"><Button tone="product">筛选</Button><Button variant="ghost">重置</Button></div>
                  </div>
                </Form>
              </div>
              <div className="border-t border-[var(--neutral-200)] pt-5">
                <h3 className="mb-3 text-sm font-semibold text-[var(--text-primary)]">两行筛选</h3>
                <Form density="compact" className="max-w-[940px]">
                  <FormGrid columns={3}>
                    <Input aria-label="跨字段搜索" placeholder="搜索材料、编号、名称" />
                    <Input labelPosition="left" labelWidth={64} label="材料名称" placeholder="请输入" />
                    <Select labelPosition="left" labelWidth={64} label="状态" placeholder="全部" options={[{ label: "全部", value: "all" }, { label: "异常", value: "error" }]} />
                    <Select labelPosition="left" labelWidth={64} label="来源" placeholder="全部" options={[{ label: "全部", value: "all" }, { label: "实验采集", value: "lab" }]} />
                    <Input labelPosition="left" labelWidth={64} label="负责人" placeholder="请输入" />
                  </FormGrid>
                  <div className="flex items-center justify-end gap-2">
                    <Button tone="product">筛选</Button><Button variant="ghost">重置</Button>
                  </div>
                </Form>
              </div>
              <div className="border-t border-[var(--neutral-200)] pt-5">
                <div className="mb-3 flex items-center justify-between"><h3 className="text-sm font-semibold text-[var(--text-primary)]">三行筛选 · 可展开</h3><Button variant="text" iconPosition="right" icon={advancedFiltersOpen ? <CaretUp size={16} weight="regular" aria-hidden="true" /> : <CaretDown size={16} weight="regular" aria-hidden="true" />} onClick={() => setAdvancedFiltersOpen((open) => !open)} aria-expanded={advancedFiltersOpen}>{advancedFiltersOpen ? "收起" : "展开"}</Button></div>
                <Form density="compact" className="max-w-[940px]">
                  <FormGrid columns={3}>
                    <Input aria-label="跨字段搜索" placeholder="搜索材料、编号、名称" />
                    <Input labelPosition="left" labelWidth={64} label="材料名称" placeholder="请输入" />
                    <Select labelPosition="left" labelWidth={64} label="状态" placeholder="全部" options={[{ label: "全部", value: "all" }, { label: "异常", value: "error" }]} />
                    <Select labelPosition="left" labelWidth={64} label="来源" placeholder="全部" options={[{ label: "全部", value: "all" }, { label: "实验采集", value: "lab" }]} />
                    {advancedFiltersOpen ? <>
                      <Input labelPosition="left" labelWidth={64} label="负责人" placeholder="请输入" />
                      <Input labelPosition="left" labelWidth={64} label="批次编号" placeholder="请输入" />
                      <Select labelPosition="left" labelWidth={64} label="治理状态" placeholder="全部" options={[{ label: "全部", value: "all" }, { label: "待复核", value: "review" }]} />
                    </> : null}
                  </FormGrid>
                  <div className="flex items-center justify-end gap-2">
                    <Button tone="product">筛选</Button><Button variant="ghost">重置</Button>
                  </div>
                </Form>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--neutral-200)] pt-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Button icon={<Plus size={16} weight="regular" aria-hidden="true" />}>新增</Button>
                  <Button variant="outline" tone="danger" icon={<Trash size={16} weight="regular" aria-hidden="true" />}>删除</Button>
                  <Button variant="ghost" icon={<ArrowsClockwise size={16} weight="regular" aria-hidden="true" />}>同步</Button>
                </div>
                <span className="text-xs text-[var(--text-tertiary)]">共 128 条数据 · 已选择 0 条</span>
              </div>
              <p className="text-xs leading-5 text-[var(--text-tertiary)]">多条件筛选保留紧凑可见标签，避免选中后失去字段语义；只有语义明确的独立全局搜索可以省略标签，并提供 aria-label。筛选项换行时，筛选/重置位于最后一行右侧。</p>
            </div>
          </ExampleCard>
        </div>
      </section>

      <CodeBlock
        lang="tsx"
        label="表单布局"
        code={`<Form>
  <FormSection title="基础信息">
    <FormGrid columns={2}>
      <Input label="数据集名称" required />
      <Select label="数据来源" options={sourceOptions} />
    </FormGrid>
  </FormSection>
  <FormActions>
    <Button variant="ghost">取消</Button>
    <Button>保存配置</Button>
  </FormActions>
</Form>`}
      />

      <section>
        <SectionHeading eyebrow="Backend Patterns" title="后台组合场景" description="后台表单经常与权限、流程、校验和只读结果混合出现，设计上要明确哪些字段可编辑、哪些字段只是系统记录。" />
        <div className="space-y-5">
          <ExampleCard title="审批表单">
            <Form className="max-w-[640px]">
              <FormStateBanner tone="warning" title="待审批" description="核心字段已锁定，只允许填写审批结论和意见。" />
              <Input labelPosition="left" labelWidth={88} label="数据资产名称" value="TC4 高温拉伸性能数据集" readOnly />
              <FormGrid columns={1}>
                <Select labelPosition="left" labelWidth={88} label="审批结论" placeholder="请选择审批结论" options={[{ label: "通过", value: "pass" }, { label: "驳回", value: "reject" }]} required />
                <Select labelPosition="left" labelWidth={88} label="下一节点" defaultValue="owner" options={[{ label: "数据负责人", value: "owner" }, { label: "空间管理员", value: "admin" }]} />
              </FormGrid>
              <Textarea labelPosition="left" labelWidth={88} label="审批意见" placeholder="请输入审批说明" error="驳回时必须填写审批意见" maxLength={200} showCount />
              <FormActions>
                <Button variant="ghost">返回</Button>
                <Button tone="task">提交审批</Button>
              </FormActions>
            </Form>
          </ExampleCard>
          <ExampleCard title="权限配置表单">
            <Form className="max-w-[640px]">
              <FormGrid columns={1}>
                <Select labelPosition="left" labelWidth={88} label="可见范围" defaultValue="team" options={[{ label: "仅自己", value: "private" }, { label: "所在团队", value: "team" }, { label: "全组织", value: "org" }]} />
                <Select labelPosition="left" labelWidth={88} label="流通方式" defaultValue="contract" options={[{ label: "合约授权", value: "contract" }, { label: "人工审批", value: "audit" }, { label: "外部公开（不可选）", value: "public", disabled: true }]} />
              </FormGrid>
              <div className="block md:flex md:items-start md:gap-3">
                <div className="mb-1.5 w-auto shrink-0 pt-1.5 text-sm font-normal text-[var(--text-secondary)] md:mb-0 md:w-[88px] md:text-right">附加权限</div>
                <div className="min-w-0 flex-1 space-y-3 rounded-[var(--radius-sm)] bg-[var(--neutral-50)] p-4">
                  <Checkbox label="记录操作日志和审计时间线" description="用于流程追踪和链上存证感的视觉表达。" defaultChecked />
                  <Checkbox label="允许下游业务系统调用" description="开启后可被人工智能（AI）应用和业务系统读取。" />
                </div>
              </div>
              <FormActions>
                <Button variant="outline">保存草稿</Button>
                <Button>确认配置</Button>
              </FormActions>
            </Form>
          </ExampleCard>
          <ExampleCard title="资料与图片上传" description="用于检测报告、原始数据、证明材料及样品图片的组合录入。">
            <Form className="max-w-[880px]">
              <p className="text-xs leading-5 text-[var(--text-tertiary)]">此处直接复用 <Link to="/components/upload" className="font-medium text-[var(--product-blue-500)]">文件上传组件</Link>，组件样式、状态与规则调整会自动同步。</p>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Upload
                  label="检测报告与数据附件"
                  accept=".pdf,.xlsx,.xls,.csv"
                  multiple
                  maxFiles={5}
                  maxSize={10 * 1024 * 1024}
                  helperText="用于检测报告、原始数据和补充证明材料。"
                  files={attachmentFiles}
                  onChange={setAttachmentFiles}
                />
                <Upload
                  label="样品与试验图片"
                  accept=".png,.jpg,.jpeg"
                  multiple
                  maxFiles={6}
                  maxSize={5 * 1024 * 1024}
                  helperText="建议上传能说明样品状态和试验结果的图片。"
                  files={imageFiles}
                  onChange={setImageFiles}
                />
              </div>
              <FormActions>
                <Button variant="ghost">取消</Button>
                <Button>保存资料</Button>
              </FormActions>
            </Form>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="States" title="表单状态" description="状态要同时体现在页面提示、字段可编辑性和按钮权限上。同一任务的操作按钮相邻并右对齐；只有两端承担不同语义的工具栏才使用左右分散。" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <ExampleCard title="草稿">
            <Form>
              <FormStateBanner title="草稿可编辑" description="允许保存草稿，提交前再进行完整校验。" />
              <Input label="材料名称" defaultValue="TC4 数据集" />
              <Input label="批次编号" placeholder="请输入批次编号" helperText="保存草稿时允许为空，正式提交时必填。" />
              <FormActions>
                <Button variant="ghost">取消</Button>
                <Button>保存草稿</Button>
              </FormActions>
            </Form>
          </ExampleCard>
          <ExampleCard title="审核中">
            <Form>
              <FormStateBanner tone="warning" title="审核中" description="核心字段只读，仅允许补充审批意见。" />
              <Input label="材料名称" value="TC4 数据集" readOnly />
              <Textarea label="补充说明" placeholder="请输入补充说明" />
              <FormActions>
                <Button tone="product">追加说明</Button>
              </FormActions>
            </Form>
          </ExampleCard>
          <ExampleCard title="已归档">
            <Form>
              <FormStateBanner tone="neutral" title="已归档" description="所有字段不可编辑，仅保留查看、复制、导出等低风险操作。" />
              <Input label="材料名称" value="TC4 数据集" disabled />
              <Select label="流通方式" defaultValue="contract" disabled options={[{ label: "合约授权", value: "contract" }]} />
              <FormActions>
                <Button variant="outline" tone="product" icon={<DownloadSimple size={16} weight="regular" aria-hidden="true" />}>导出</Button>
              </FormActions>
            </Form>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Density" title="密度、结构与混用边界" description="同一项目允许左右和上下结构共存，但必须由容器角色决定。同一表单分组（FormSection）内的同级字段保持一致，不能逐字段随意混用。" />
        <div className="grid grid-cols-1 gap-5">
          <ExampleCard title="主编辑区 · 左右结构">
            <Form className="max-w-[456px]">
              <FormGrid columns={1}>
                <Input labelPosition="left" labelWidth={88} label="企业名称" placeholder="请输入企业名称" />
                <Input labelPosition="left" labelWidth={88} label="联系人" placeholder="请输入联系人" />
                <Select labelPosition="left" labelWidth={88} label="应用场景" placeholder="请选择" options={[{ label: "数据空间", value: "space" }, { label: "材库", value: "library" }, { label: "人工智能（AI）应用", value: "ai" }]} />
                <Input labelPosition="left" labelWidth={88} label="联系电话" placeholder="请输入联系电话" />
              </FormGrid>
            </Form>
          </ExampleCard>
          <ExampleCard title="筛选工具栏 · 左右标签">
            <Form density="compact" className="max-w-[840px]">
              <FormGrid columns={3}>
                <Input size="sm" labelPosition="left" labelWidth={64} label="材料名称" placeholder="请输入" />
                <Select size="sm" labelPosition="left" labelWidth={64} label="状态" placeholder="全部" options={[{ label: "全部", value: "all" }, { label: "异常", value: "error" }]} />
                <Select size="sm" labelPosition="left" labelWidth={64} label="来源" placeholder="全部" options={[{ label: "全部", value: "all" }, { label: "实验采集", value: "lab" }]} />
                <Input size="sm" labelPosition="left" labelWidth={64} label="负责人" placeholder="请输入" />
                <div className="block md:flex md:items-center md:gap-3">
                  <span id="density-filter-label" className="mb-1.5 block text-sm font-normal text-[var(--text-secondary)] md:mb-0 md:w-16 md:shrink-0 md:text-right">数据范围</span>
                  <div role="radiogroup" aria-labelledby="density-filter-label" className="flex flex-wrap items-center gap-5">
                    <Radio name="density-filter" label="全部" defaultChecked size="sm" />
                    <Radio name="density-filter" label="仅异常" size="sm" />
                  </div>
                </div>
              </FormGrid>
            </Form>
            <div className="mt-5 border-l-2 border-[var(--success-solid)] bg-[var(--neutral-50)] p-4">
              <h4 className="text-sm font-semibold text-[var(--text-primary)]">宽度与换行规则</h4>
              <div className="mt-3 grid grid-cols-1 gap-3 text-xs leading-5 text-[var(--text-secondary)] md:grid-cols-3">
                <div><strong className="block text-[var(--text-primary)]">控件宽度</strong>紧凑筛选建议 160–240px。</div>
                <div><strong className="block text-[var(--text-primary)]">单行数量</strong>容器足够时优先每行 3 个。</div>
                <div><strong className="block text-[var(--text-primary)]">换行顺序</strong>次级条件按阅读顺序续排。</div>
              </div>
            </div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Wide Pages"
          title="宽页面表单"
          description="当表单区域超过 1000px 时，优先使用左右标签与 2 列栅格。标签默认宽 88px、右对齐、间隔 12px；同组长标签统一扩展到 96–120px。"
        />
        <div className="grid grid-cols-1 gap-5">
          <ExampleCard title="数据配置页 - 左右标签（label）">
            <div className="rounded-[var(--radius-sm)] bg-[var(--neutral-50)] p-5">
              <Form className="max-w-[960px]">
                <FormSection title="基础参数" description="适用于数据接入、解析规则、模型参数等字段多、页面宽的后台配置页。" className="p-6">
                  <FormGrid columns={2} className="gap-x-8 gap-y-4">
                    <Input labelPosition="left" labelWidth={88} label="数据集名称" placeholder="请输入数据集名称" required />
                    <Select labelPosition="left" labelWidth={88} label="数据来源" placeholder="请选择来源" options={[{ label: "实验采集", value: "lab" }, { label: "企业上传", value: "company" }]} />
                    <Input labelPosition="left" labelWidth={88} label="材料牌号" placeholder="例如 TC4" />
                    <Select labelPosition="left" labelWidth={88} label="治理状态" defaultValue="review" options={[{ label: "待复核", value: "review" }, { label: "已校验", value: "checked" }]} />
                    <Input labelPosition="left" labelWidth={88} label="最小温度" suffix="°C" placeholder="0" />
                    <Input labelPosition="left" labelWidth={88} label="最大温度" suffix="°C" placeholder="1200" />
                  </FormGrid>
                </FormSection>
                <FormActions>
                  <Button variant="ghost">取消</Button>
                  <Button>保存配置</Button>
                </FormActions>
              </Form>
            </div>
            <div className="mt-6 border-t border-[var(--neutral-200)] pt-5">
              <h3 className="mb-4 text-sm font-semibold text-[var(--text-primary)]">宽页面排列规则</h3>
              <div className="grid grid-cols-1 gap-4 text-sm leading-6 text-[var(--text-secondary)] md:grid-cols-3">
                <div className="bg-[var(--neutral-50)] p-4"><h4 className="mb-2 font-semibold text-[var(--text-primary)]">字段宽度</h4><p>标签与控件间隔 12px；常规输入建议 360px，长字段最大 480px；紧凑筛选控件建议 160–240px。</p></div>
                <div className="bg-[var(--neutral-50)] p-4"><h4 className="mb-2 font-semibold text-[var(--text-primary)]">列数选择</h4><p>1000px 以上容器优先 2 列左右结构；紧凑筛选工具栏优先每行 3 个，空间充足时最多 4 个。</p></div>
                <div className="bg-[var(--neutral-50)] p-4"><h4 className="mb-2 font-semibold text-[var(--text-primary)]">按钮位置</h4><p>编辑表单操作右对齐；筛选/重置位于筛选末行右侧；表格操作独立成栏。</p></div>
              </div>
            </div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="API" title="属性与实现边界" />
        <div className="space-y-6">
          <div>
            <h3 className="mb-3 text-sm font-semibold text-[var(--text-primary)]">Form</h3>
            <DocsTable>
              <thead className="bg-[var(--neutral-50)] text-sm font-semibold text-[var(--text-primary)]"><tr className="border-b border-[var(--neutral-200)]"><th className="px-6 py-3 font-semibold">属性</th><th className="px-6 py-3 font-semibold">类型</th><th className="px-6 py-3 font-semibold">默认值</th><th className="px-6 py-3 font-semibold">规则</th></tr></thead>
              <tbody className="divide-y divide-[var(--neutral-100)] bg-white">
                {[
                  ["density", "standard | compact", "standard", "标准表单 space-y-6；紧凑筛选 space-y-4。"],
                  ["className", "string", "—", "透传至 <form>。"],
                ].map(([name, type, defaultValue, rule]) => <tr key={name}><td className="px-6 py-4 text-sm text-[var(--text-primary)]">{name}</td><td className="px-6 py-4 text-sm text-[var(--text-secondary)]">{type}</td><td className="px-6 py-4 text-sm text-[var(--text-secondary)]">{defaultValue}</td><td className="px-6 py-4 text-sm leading-6 text-[var(--text-secondary)]">{rule}</td></tr>)}
              </tbody>
            </DocsTable>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-[var(--text-primary)]">FormGrid</h3>
            <DocsTable>
              <thead className="bg-[var(--neutral-50)] text-sm font-semibold text-[var(--text-primary)]"><tr className="border-b border-[var(--neutral-200)]"><th className="px-6 py-3 font-semibold">属性</th><th className="px-6 py-3 font-semibold">类型</th><th className="px-6 py-3 font-semibold">默认值</th><th className="px-6 py-3 font-semibold">规则</th></tr></thead>
              <tbody className="divide-y divide-[var(--neutral-100)] bg-white">
                {[
                  ["columns", "1 | 2 | 3 | 4", "1", "响应式栅格；每行字段数按容器宽度自适应。"],
                  ["className", "string", "—", "可覆盖 gap 等栅格属性。"],
                ].map(([name, type, defaultValue, rule]) => <tr key={name}><td className="px-6 py-4 text-sm text-[var(--text-primary)]">{name}</td><td className="px-6 py-4 text-sm text-[var(--text-secondary)]">{type}</td><td className="px-6 py-4 text-sm text-[var(--text-secondary)]">{defaultValue}</td><td className="px-6 py-4 text-sm leading-6 text-[var(--text-secondary)]">{rule}</td></tr>)}
              </tbody>
            </DocsTable>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-[var(--text-primary)]">FormSection / FormActions / FormStateBanner</h3>
            <DocsTable>
              <thead className="bg-[var(--neutral-50)] text-sm font-semibold text-[var(--text-primary)]"><tr className="border-b border-[var(--neutral-200)]"><th className="px-6 py-3 font-semibold">组件</th><th className="px-6 py-3 font-semibold">属性</th><th className="px-6 py-3 font-semibold">默认值</th><th className="px-6 py-3 font-semibold">规则</th></tr></thead>
              <tbody className="divide-y divide-[var(--neutral-100)] bg-white">
                {[
                  ["FormSection", "title / description", "—", "表单区块标题和说明；替代自由 <h3>。"],
                  ["FormActions", "align", "end", "按钮对齐：start / end / between。"],
                  ["FormStateBanner", "tone / title / description", "neutral", "表单全局状态提示，tone 可选 neutral/product/success/warning/danger。"],
                ].map(([component, attrs, defaultValue, rule]) => <tr key={component}><td className="px-6 py-4 text-sm font-semibold text-[var(--text-primary)]">{component}</td><td className="px-6 py-4 text-sm text-[var(--text-secondary)]">{attrs}</td><td className="px-6 py-4 text-sm text-[var(--text-secondary)]">{defaultValue}</td><td className="px-6 py-4 text-sm leading-6 text-[var(--text-secondary)]">{rule}</td></tr>)}
              </tbody>
            </DocsTable>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Link to="/components/input" className="group flex items-center gap-3 rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-5 transition-all hover:border-[var(--neutral-300)] hover:bg-[var(--neutral-50)]">
          <ArrowLeft size={18} weight="regular" className="text-[var(--text-tertiary)]" />
          <div><div className="text-xs text-[var(--text-tertiary)]">上一步</div><h3 className="mt-1 text-sm font-semibold text-[var(--text-primary)]">输入框</h3></div>
        </Link>
        <Link to="/components/description-list" className="group flex items-center justify-between gap-3 rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-5 transition-all hover:border-[var(--neutral-300)] hover:bg-[var(--neutral-50)]">
          <div><div className="text-xs text-[var(--text-tertiary)]">下一步</div><h3 className="mt-1 text-sm font-semibold text-[var(--text-primary)]">详情与描述列表</h3></div>
          <ArrowRight size={18} className="text-[var(--text-tertiary)]" />
        </Link>
      </div>
    </div>
  );
}
