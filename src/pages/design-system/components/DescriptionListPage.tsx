import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import { DescriptionList } from "../../../components/ui/DescriptionList";
import { Tag } from "../../../components/ui/Tag";

const materialItems = [
  { label: "材料名称", value: "TC4 钛合金" },
  { label: "材料牌号", value: "Ti-6Al-4V" },
  { label: "数据来源", value: "材库 / 标准导入" },
  { label: "治理状态", value: <Tag variant="success" size="sm">已校验</Tag> },
  { label: "更新时间", value: "2026-06-04" },
  { label: "责任部门", value: "材料数据运营组" },
];

export default function DescriptionListPage() {
  return (
    <div className="space-y-16">
      <PageHeader title="描述列表" description="描述列表用于展示对象属性、材料参数、审批信息和详情页字段，强调标签和值之间的稳定对齐。" />

      <section>
        <SectionHeading eyebrow="Variants" title="展示类型" />
        <div className="space-y-5">
          <ExampleCard title="详情字段 · 2 列" description="详情页默认使用 2 列，兼顾阅读宽度和字段密度。">
            <DescriptionList items={materialItems} columns={2} />
          </ExampleCard>
          <ExampleCard title="左右字段 · 详情页摘要" description="宽详情页或抽屉详情中，标签固定宽度，值区域保持左对齐，便于快速扫读。">
            <DescriptionList
              layout="inline"
              labelWidth={92}
              columns={2}
              items={[
                { label: "数据空间", value: "新材料可信数据空间" },
                { label: "数据等级", value: <Tag variant="product" size="sm">内部共享</Tag> },
                { label: "授权方式", value: "合约授权 / 审计追踪" },
                { label: "有效周期", value: "2026-06-01 至 2026-12-31" },
              ]}
            />
          </ExampleCard>
          <ExampleCard title="高密度字段 · 3 列" description="材料参数、模型参数等密集字段可使用 3 列，但不建议承载长文本。">
            <DescriptionList items={materialItems} columns={3} />
          </ExampleCard>
          <ExampleCard title="无边框信息组" description="适合卡片内部的轻量属性展示，减少边框噪音。">
            <DescriptionList
              bordered={false}
              columns={3}
              items={[
                { label: "流程节点", value: "空间管理员审核" },
                { label: "权限范围", value: "团队可见" },
                { label: "链上存证", value: <Tag variant="product" size="sm">已存证</Tag> },
              ]}
            />
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Media" title="图文资料信息组" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="材料图片 + 字段" description="材料图、显微组织图和检测附件应与关键字段形成同一信息组，避免图片和参数分离。">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-[160px_1fr]">
              <div className="flex aspect-[4/3] items-center justify-center bg-[var(--neutral-50)] text-xs text-[var(--neutral-400)]">
                显微组织图
              </div>
              <DescriptionList
                bordered={false}
                layout="inline"
                labelWidth={76}
                columns={1}
                size="sm"
                items={[
                  { label: "样品编号", value: "MAT-TC4-0421" },
                  { label: "倍率", value: "500x" },
                  { label: "来源", value: "实验室上传" },
                  { label: "状态", value: <Tag variant="success" size="sm">已复核</Tag> },
                ]}
              />
            </div>
          </ExampleCard>
          <ExampleCard title="附件列表" description="报告、协议、图谱等文件型信息使用轻量列表展示，保留名称、类型和状态。">
            <div className="divide-y divide-[var(--neutral-100)] bg-white">
              {[
                ["拉伸测试报告.pdf", "检测报告", "已归档"],
                ["组织结构图谱.png", "图像资料", "已复核"],
                ["数据授权合约.docx", "合约文件", "待确认"],
              ].map(([name, type, status]) => (
                <div key={name} className="grid grid-cols-[1fr_auto] gap-4 py-3">
                  <div>
                    <p className="text-sm leading-5 text-[var(--text-primary)]">{name}</p>
                    <p className="mt-1 text-xs text-[var(--text-tertiary)]">{type}</p>
                  </div>
                  <Tag variant={status === "待确认" ? "warning" : "neutral"} size="sm">{status}</Tag>
                </div>
              ))}
            </div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="States" title="后台常见状态" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="空值与未填写">
            <DescriptionList
              columns={2}
              emptyText="未填写"
              size="sm"
              items={[
                { label: "检测机构", value: "华东材料实验室" },
                { label: "数据编号" },
                { label: "审核人", value: "李明" },
                { label: "归档时间" },
              ]}
            />
            <p className="mt-4 text-xs leading-5 text-[var(--text-tertiary)]">空值统一显示 “--”，避免用户误以为页面加载失败。</p>
          </ExampleCard>
          <ExampleCard title="长文本说明">
            <DescriptionList
              columns={2}
              items={[
                { label: "数据治理说明", value: "该数据集经过字段标准化、单位换算、异常值识别和责任部门复核，可用于模型训练和业务分析。", span: 2 },
                { label: "权限说明", value: "外部访问需要经过数据空间合约授权，并记录审计日志。", span: 2 },
              ]}
            />
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Guidelines" title="最佳实践" />
        <SpecList
          items={[
            "详情页默认使用 2 列，参数密集场景可使用 3 列。",
            "标签使用 neutral-500，值使用 neutral-900，状态值可使用 Tag。",
            "宽详情页可使用左右字段布局，label 建议 76px-112px，值区域自适应。",
            "图文资料需要作为同一信息组呈现：图片/附件在左或上，关键字段紧随其后。",
            "空值统一显示 “--”，不要留空或直接隐藏字段。",
            "审核备注、治理说明等长文本字段使用 span 跨列展示。",
            "长文本使用 1 列或跨列展示，不要塞入 3 列字段网格。",
          ]}
        />
      </section>
    </div>
  );
}
