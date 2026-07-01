import { ArrowLeft, ImageSquare } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import { DescriptionList } from "../../../components/ui/DescriptionList";
import { Tag } from "../../../components/ui/Tag";
import { Button } from "../../../components/ui/Button";

const materialItems = [
  { label: "材料名称", value: "TC4 钛合金" },
  { label: "材料牌号", value: "Ti-6Al-4V" },
  { label: "数据来源", value: "材库 / 标准导入" },
  { label: "治理状态", value: <Tag variant="success" size="sm">已校验</Tag> },
  { label: "更新时间", value: "2026-06-04" },
  { label: "责任部门", value: "材料数据运营组" },
];

const fullDetailItems = [
  { label: "材料名称", value: "GH4169 高温合金" },
  { label: "材料牌号", value: "Inconel 718" },
  { label: "数据来源", value: "实验室采集" },
  { label: "治理状态", value: <Tag variant="success" size="sm">已校验</Tag> },
  { label: "验证结论", value: "符合入网标准", span: 2 as const },
  { label: "最大抗拉强度", value: "≥ 1280 MPa" },
  { label: "屈服强度", value: "≥ 1030 MPa" },
  { label: "断后伸长率", value: "≥ 12%" },
  { label: "使用温度", value: "-253°C 至 650°C" },
  { label: "试验批次", value: "BATCH-2026-0618" },
  { label: "检测机构", value: "华东材料实验室" },
  { label: "检测报告", value: <span className="text-[var(--product-blue-500)] underline underline-offset-4">拉伸测试报告.pdf</span> },
  { label: "认证证书", value: <span className="text-[var(--product-blue-500)] underline underline-offset-4">AS9100D 认证.pdf</span> },
  { label: "数据治理说明", value: "该数据集经字段标准化、单位换算、异常值识别和双人复核，可用于模型训练和业务分析。", span: 2 as const },
];

export default function DescriptionListPage() {
  return (
    <div className="space-y-16">
      <PageHeader title="详情与描述列表" description="详情页延续表单的横向扫描逻辑：常规字段默认采用左右标签，密集参数和窄屏才切换为上下结构。" note={<>关联页面：数据先通过 <Link to="/components/input" className="font-medium text-[var(--product-blue-500)]">输入框</Link> 采集，再由 <Link to="/components/form" className="font-medium text-[var(--product-blue-500)]">表单</Link> 组合提交，最终进入只读详情视图。</>} />

      <section>
        <SectionHeading
          eyebrow="Complete Detail Page"
          title="详情页模式"
          description="这是 DescriptionList 的上层页面模式，用于说明标题、状态、字段分组和操作栏如何组合；它们不是 DescriptionList 组件本身的 API。"
        />
        <div className="overflow-hidden rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white">
          {/* 详情页头部 */}
          <div className="flex items-start justify-between gap-4 border-b border-[var(--neutral-200)] px-6 py-4">
            <div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">GH4169 高温合金</h3>
              <p className="mt-1 text-xs text-[var(--text-tertiary)]">材料编码：MAT-2026-0618-002 · 更新于 2026-06-30</p>
            </div>
            <Tag variant="success" size="sm">已校验</Tag>
          </div>

          {/* 分组一：基础信息 */}
          <div className="border-b border-[var(--neutral-100)] px-6 py-4">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-tertiary)]">基础信息</h3>
            <DescriptionList
              bordered={false}
              columns={2}
              size="sm"
              items={fullDetailItems.slice(0, 5)}
            />
          </div>

          {/* 分组二：力学性能 */}
          <div className="border-b border-[var(--neutral-100)] px-6 py-4">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-tertiary)]">力学性能</h3>
            <DescriptionList
              bordered={false}
              columns={4}
              size="sm"
              layout="stacked"
              items={fullDetailItems.slice(5, 9)}
            />
          </div>

          {/* 分组三：检测与文件 */}
          <div className="border-b border-[var(--neutral-100)] px-6 py-4">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-tertiary)]">检测与文件</h3>
            <DescriptionList
              bordered={false}
              layout="inline"
              labelWidth={80}
              columns={2}
              size="sm"
              items={fullDetailItems.slice(9, 13)}
            />
          </div>

          {/* 分组四：治理说明（长文本跨列） */}
          <div className="border-b border-[var(--neutral-100)] px-6 py-4">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-tertiary)]">治理记录</h3>
            <DescriptionList
              bordered={false}
              columns={2}
              size="sm"
              items={fullDetailItems.slice(13)}
            />
          </div>

          {/* 详情页底部操作栏 */}
          <div className="flex items-center justify-between gap-3 px-6 py-3">
            <Button variant="ghost" size="sm">返回列表</Button>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">导出报告</Button>
              <Button size="sm">编辑</Button>
            </div>
          </div>
        </div>
        <p className="mt-3 text-xs leading-5 text-[var(--text-tertiary)]">
          页面模式 = 标题 + 状态标签 + 分组的描述列表 + 底部操作栏；DescriptionList 组件本身只负责标签和值的只读呈现。
        </p>
      </section>

      <section>
        <SectionHeading eyebrow="Variants" title="展示结构与混用边界" description="同一详情页允许常规信息使用左右结构、密集参数使用上下结构，但必须按信息分组切换，不能在同一字段组内随意交替。" />
        <div className="space-y-5">
          <ExampleCard title="标准网格 · 2 列左右结构" description="详情页默认使用 2 列，标签固定宽度并右对齐，延续编辑表单的扫描路径。">
            <DescriptionList items={materialItems} columns={2} />
          </ExampleCard>
          <ExampleCard title="长标签 · 统一扩展宽度" description="同一信息组出现长业务标签时，整体扩展标签宽度，不单独调整某一字段。">
            <DescriptionList
              layout="inline"
              labelWidth={112}
              columns={2}
              items={[
                { label: "数据空间", value: "新材料可信数据空间" },
                { label: "数据等级", value: <Tag variant="product" size="sm">内部共享</Tag> },
                { label: "授权方式", value: "合约授权 / 审计追踪" },
                { label: "有效周期", value: "2026-06-01 至 2026-12-31" },
              ]}
            />
          </ExampleCard>
          <ExampleCard title="高密度参数 · 4 列上下结构" description="单元格横向空间不足时，按整个参数分组切换为上下结构；不承载状态标签和长文本。">
            <DescriptionList
              columns={4}
              size="sm"
              layout="stacked"
              items={[
                { label: "抗拉强度", value: "≥ 1280 MPa" },
                { label: "屈服强度", value: "≥ 1030 MPa" },
                { label: "延伸率", value: "≥ 12%" },
                { label: "断面收缩", value: "≥ 15%" },
                { label: "硬度", value: "≥ 363 HB" },
                { label: "密度", value: "8.24 g/cm³" },
                { label: "熔点", value: "1260°C" },
                { label: "导热系数", value: "14.7 W/m·K" },
              ]}
            />
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
              <div className="flex aspect-[4/3] items-center justify-center rounded-[var(--radius-sm)] border border-dashed border-[var(--neutral-300)] bg-[var(--neutral-50)]">
                <div className="text-center">
                  <div className="mx-auto mb-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--neutral-100)] text-[var(--text-tertiary)]">
                    <ImageSquare size={16} weight="regular" aria-hidden="true" />
                  </div>
                  <p className="text-xs text-[var(--neutral-400)]">显微组织图</p>
                </div>
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
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
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
            <p className="mt-4 text-xs leading-5 text-[var(--text-tertiary)]">空值统一显示 "未填写"，避免用户误以为页面加载失败。</p>
          </ExampleCard>
          <ExampleCard title="脱敏数据">
            <DescriptionList
              columns={2}
              size="sm"
              items={[
                { label: "联系人", value: "王**" },
                { label: "手机号", value: "138****6721" },
                { label: "统一编号", value: "MAT-****-0618" },
                { label: "部门", value: "材料数据运营组" },
              ]}
            />
            <p className="mt-4 text-xs leading-5 text-[var(--text-tertiary)]">脱敏字段保留部分信息以供辨识，其余用 * 代替，禁止直接暴露敏感原文。</p>
          </ExampleCard>
          <ExampleCard title="长文本与跨列">
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
            "常规详情字段默认使用 2 列左右结构；性能参数等密集数值可整组切换为 4 列上下结构。",
            "标签使用 14px Regular、text-tertiary，固定宽度后右对齐；值使用 text-primary，状态值可使用 Tag。",
            "长文本使用 span 跨列，不要塞入 3 列以上的字段网格。",
            "左右结构默认 label 88px、间隔 8px；同组长标签统一扩展到 96–120px，不逐项设置不同宽度。",
            "图文资料作为同一信息组：图片/附件在左（160px），关键字段在右紧随。",
            "空值统一显示 '未填写' 或 '--'，不直接留空；敏感字段按业务规则脱敏，保留格式前缀。",
            "完整详情页结构：标题 → 状态标签 → 分组描述列表 → 底部操作栏。",
            "分组区块纵向内边距统一 py-4，区块标题使用 text-xs uppercase + 字间距 0.16em。",
            "同页允许按信息组混用左右和上下结构，但同一分组内保持一致；窄屏统一降级为上下结构。",
            "示例与导航图标统一来自 @phosphor-icons/react，常规图标使用 16px regular。",
          ]}
        />
      </section>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Link
          to="/components/form"
          className="group flex items-center gap-3 rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-5 transition-all hover:border-[var(--neutral-300)] hover:bg-[var(--neutral-50)]"
        >
          <ArrowLeft size={18} weight="regular" className="text-[var(--text-tertiary)]" />
          <div>
            <div className="text-xs text-[var(--text-tertiary)]">上一步</div>
            <h3 className="mt-1 text-sm font-semibold text-[var(--text-primary)]">表单</h3>
            <p className="mt-0.5 text-xs text-[var(--text-tertiary)]">多字段组合、布局、状态与提交路径</p>
          </div>
        </Link>
        <Link
          to="/components/input"
          className="group flex items-center gap-3 rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-5 transition-all hover:border-[var(--neutral-300)] hover:bg-[var(--neutral-50)]"
        >
          <ArrowLeft size={18} weight="regular" className="text-[var(--text-tertiary)]" />
          <div>
            <div className="text-xs text-[var(--text-tertiary)]">链条起始</div>
            <h3 className="mt-1 text-sm font-semibold text-[var(--text-primary)]">输入框</h3>
            <p className="mt-0.5 text-xs text-[var(--text-tertiary)]">单个字段的结构、尺寸与状态规则</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
