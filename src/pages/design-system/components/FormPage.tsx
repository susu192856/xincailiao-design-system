import { MagnifyingGlass } from "@phosphor-icons/react";
import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import { Button } from "../../../components/ui/Button";
import { Checkbox } from "../../../components/ui/Checkbox";
import { Form, FormActions, FormGrid, FormSection, FormStateBanner } from "../../../components/ui/Form";
import { Input } from "../../../components/ui/Input";
import { Radio } from "../../../components/ui/Radio";
import { Select } from "../../../components/ui/Select";
import { Switch } from "../../../components/ui/Switch";
import { Textarea } from "../../../components/ui/Textarea";

export default function FormPage() {
  return (
    <div className="space-y-16">
      <PageHeader title="表单" description="表单用于承载字段录入、校验反馈、权限配置和业务提交，是后台产品最高频的组合组件。" />
      <section>
        <SectionHeading eyebrow="Layout" title="表单布局" description="表单不只是字段集合，还需要表达编辑密度、分组关系、状态反馈和提交路径。后台默认左对齐，官网预约类表单可适当放大尺寸。" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="标准编辑表单" description="适用于材料数据、模型参数和后台配置的新增 / 编辑页面。">
            <Form>
              <FormSection>
                <FormGrid columns={2}>
                  <Input label="材料名称" placeholder="请输入材料名称" required />
                  <Select label="材料分类" placeholder="请选择分类" options={[{ label: "钛合金", value: "ti" }, { label: "铝合金", value: "al" }, { label: "高温合金", value: "heat" }]} required />
                  <Input label="屈服强度" suffix="MPa" placeholder="请输入数值" />
                  <Input label="数据来源" placeholder="实验采集 / 企业上传" />
                </FormGrid>
                <div className="mt-4">
                  <Textarea label="说明" placeholder="请输入数据来源、加工方式或备注" helperText="说明文本用于审计和后续数据治理，不建议为空。" />
                </div>
              </FormSection>
              <FormActions>
                <Button variant="ghost">取消</Button>
                <Button>保存</Button>
              </FormActions>
            </Form>
          </ExampleCard>
          <ExampleCard title="筛选表单" description="适用于表格、列表、数据看板上方的高频查询区域。">
            <Form density="compact">
              <FormGrid columns={3}>
                <Input size="sm" placeholder="搜索材料名称" prefix={<MagnifyingGlass className="h-4 w-4" />} />
                <Select size="sm" placeholder="数据状态" options={[{ label: "全部状态", value: "all" }, { label: "待审核", value: "review" }, { label: "已发布", value: "published" }]} />
                <Select size="sm" placeholder="权限范围" options={[{ label: "全部权限", value: "all" }, { label: "团队可见", value: "team" }, { label: "公开流通", value: "public" }]} />
              </FormGrid>
              <div className="flex flex-wrap items-center gap-5">
                <Checkbox label="仅看我负责的数据" size="sm" />
                <Switch label="显示异常数据" size="sm" />
              </div>
              <FormActions align="start" className="pt-0">
                <Button size="sm" tone="product">筛选</Button>
                <Button size="sm" variant="ghost">重置</Button>
              </FormActions>
            </Form>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Backend Patterns" title="后台组合场景" description="后台表单经常与权限、流程、校验和只读结果混合出现，设计上要明确哪些字段可编辑、哪些字段只是系统记录。" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="审批表单">
            <Form>
              <FormStateBanner tone="warning" title="待审批" description="核心字段已锁定，只允许填写审批结论和意见。" />
              <Input label="数据资产名称" value="TC4 高温拉伸性能数据集" readOnly />
              <FormGrid columns={2}>
                <Select label="审批结论" placeholder="请选择审批结论" options={[{ label: "通过", value: "pass" }, { label: "驳回", value: "reject" }]} required />
                <Select label="下一节点" defaultValue="owner" options={[{ label: "数据负责人", value: "owner" }, { label: "空间管理员", value: "admin" }]} />
              </FormGrid>
              <Textarea label="审批意见" placeholder="请输入审批说明" error="驳回时必须填写审批意见" />
              <FormActions>
                <Button variant="ghost">返回</Button>
                <Button tone="product">提交审批</Button>
              </FormActions>
            </Form>
          </ExampleCard>
          <ExampleCard title="权限配置表单">
            <Form>
              <FormGrid columns={2}>
                <Select label="可见范围" defaultValue="team" options={[{ label: "仅自己", value: "private" }, { label: "所在团队", value: "team" }, { label: "全组织", value: "org" }]} />
                <Select label="流通方式" defaultValue="contract" options={[{ label: "合约授权", value: "contract" }, { label: "人工审批", value: "audit" }, { label: "外部公开（不可选）", value: "public", disabled: true }]} />
              </FormGrid>
              <div className="space-y-3 rounded-sm bg-[var(--neutral-50)] p-4">
                <Checkbox label="记录操作日志和审计时间线" description="用于流程追踪和链上存证感的视觉表达。" defaultChecked />
                <Checkbox label="允许下游业务系统调用" description="开启后可被 AI 应用和业务系统读取。" />
              </div>
              <FormActions>
                <Button variant="outline">保存草稿</Button>
                <Button>确认配置</Button>
              </FormActions>
            </Form>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="States" title="表单状态" description="状态要同时体现在页面提示、字段可编辑性和按钮权限上，避免用户只能从按钮是否置灰来猜测当前流程。" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <ExampleCard title="草稿">
            <Form density="compact">
              <FormStateBanner title="草稿可编辑" description="允许保存草稿，提交前再进行完整校验。" />
              <Input size="sm" label="材料名称" defaultValue="TC4 数据集" />
              <Input size="sm" label="批次编号" placeholder="请输入批次编号" error="提交前必须填写批次编号" />
              <FormActions align="between">
                <Button size="sm" variant="ghost">取消</Button>
                <Button size="sm">保存草稿</Button>
              </FormActions>
            </Form>
          </ExampleCard>
          <ExampleCard title="审核中">
            <Form density="compact">
              <FormStateBanner tone="warning" title="审核中" description="核心字段只读，仅允许补充审批意见。" />
              <Input size="sm" label="材料名称" value="TC4 数据集" readOnly />
              <Textarea inputSize="sm" label="补充说明" placeholder="请输入补充说明" />
              <FormActions>
                <Button size="sm" tone="product">追加说明</Button>
              </FormActions>
            </Form>
          </ExampleCard>
          <ExampleCard title="已归档">
            <Form density="compact">
              <FormStateBanner tone="neutral" title="已归档" description="所有字段不可编辑，仅保留查看、复制、导出等低风险操作。" />
              <Input size="sm" label="材料名称" value="TC4 数据集" disabled />
              <Select size="sm" label="流通方式" defaultValue="contract" disabled options={[{ label: "合约授权", value: "contract" }]} />
              <FormActions>
                <Button size="sm" variant="outline">导出</Button>
              </FormActions>
            </Form>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Density" title="密度与对齐" description="同一套表单组件需要适配官网线索收集、后台编辑页、弹窗和筛选工具栏。密度变化只调整高度、间距和列数，不改变状态语义。" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="标准密度">
            <Form>
              <FormGrid columns={2}>
                <Input label="企业名称" placeholder="请输入企业名称" />
                <Input label="联系人" placeholder="请输入联系人" />
                <Select label="应用场景" placeholder="请选择" options={[{ label: "数据空间", value: "space" }, { label: "材库", value: "library" }, { label: "AI 应用", value: "ai" }]} />
                <Input label="联系电话" placeholder="请输入联系电话" />
              </FormGrid>
            </Form>
          </ExampleCard>
          <ExampleCard title="紧凑密度">
            <Form density="compact">
              <FormGrid columns={4}>
                <Input size="sm" placeholder="材料名称" />
                <Select size="sm" placeholder="状态" options={[{ label: "全部", value: "all" }, { label: "异常", value: "error" }]} />
                <Select size="sm" placeholder="来源" options={[{ label: "全部", value: "all" }, { label: "实验采集", value: "lab" }]} />
                <Input size="sm" placeholder="负责人" />
              </FormGrid>
              <div className="flex flex-wrap gap-5">
                <Radio name="density-filter" label="全部" defaultChecked size="sm" />
                <Radio name="density-filter" label="仅异常" size="sm" />
              </div>
            </Form>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Wide Pages"
          title="宽页面表单"
          description="当表单区域超过 1000px 时，不建议继续使用单列上下结构。应按信息密度拆成 2-4 列，或使用左右 label 减少纵向滚动。"
        />
        <div className="grid grid-cols-1 gap-5">
          <ExampleCard title="数据配置页 - 左右 label">
            <div className="rounded-sm bg-[var(--neutral-50)] p-5">
              <Form className="max-w-[960px]">
                <FormSection title="基础参数" description="适用于数据接入、解析规则、模型参数等字段多、页面宽的后台配置页。">
                  <FormGrid columns={2} className="gap-x-8 gap-y-4">
                    <Input labelPosition="left" labelWidth={112} label="数据集名称" placeholder="请输入数据集名称" />
                    <Select labelPosition="left" labelWidth={112} label="数据来源" placeholder="请选择来源" options={[{ label: "实验采集", value: "lab" }, { label: "企业上传", value: "company" }]} />
                    <Input labelPosition="left" labelWidth={112} label="材料牌号" placeholder="例如 TC4" />
                    <Select labelPosition="left" labelWidth={112} label="治理状态" defaultValue="review" options={[{ label: "待复核", value: "review" }, { label: "已校验", value: "checked" }]} />
                    <Input labelPosition="left" labelWidth={112} label="最小温度" suffix="°C" placeholder="0" />
                    <Input labelPosition="left" labelWidth={112} label="最大温度" suffix="°C" placeholder="1200" />
                  </FormGrid>
                </FormSection>
                <FormActions>
                  <Button variant="ghost">取消</Button>
                  <Button>保存配置</Button>
                </FormActions>
              </Form>
            </div>
          </ExampleCard>

          <ExampleCard title="宽页面排列规则">
            <div className="grid grid-cols-1 gap-4 text-sm leading-6 text-[var(--neutral-700)] md:grid-cols-3">
              <div className="bg-[var(--neutral-50)] p-4">
                <h3 className="mb-2 font-semibold text-[var(--neutral-900)]">字段宽度</h3>
                <p>正式录入输入框建议 280px-360px；长文本、说明、地址类字段可跨列，最大不超过 720px。</p>
              </div>
              <div className="bg-[var(--neutral-50)] p-4">
                <h3 className="mb-2 font-semibold text-[var(--neutral-900)]">列数选择</h3>
                <p>1000px 以上容器优先 2 列；筛选工具栏可 3-4 列；审批和配置类字段多时使用分组标题。</p>
              </div>
              <div className="bg-[var(--neutral-50)] p-4">
                <h3 className="mb-2 font-semibold text-[var(--neutral-900)]">按钮位置</h3>
                <p>编辑表单操作按钮右对齐，次要操作在左、主操作在右；筛选工具栏按钮可紧跟筛选项左对齐。</p>
              </div>
            </div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Guidelines" title="最佳实践" />
        <SpecList items={["后台表单默认左对齐，避免居中排版影响扫描效率。", "必填、错误、禁用、只读状态必须在字段层面表达清楚。", "提交按钮放右侧，取消或返回放左侧；筛选工具栏按钮可左对齐。", "宽页面表单不要无限拉长输入框，常规输入建议 280px-360px，说明类字段可跨列。", "1000px 以上宽容器优先 2 列或左右 label，筛选工具栏可使用 3-4 列紧凑布局。", "审批、归档和权限锁定状态不要只依赖禁用按钮，需要在字段和说明文字中表达原因。", "Figma 表单组件需沉淀 label、helper、error、required、disabled、readonly、density、actions、labelPosition 等状态和插槽。", "开发落地优先复用 Form、FormSection、FormGrid、FormActions 组合，避免每个页面重新拼表单间距。"]} />
      </section>
    </div>
  );
}
