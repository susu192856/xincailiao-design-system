import { ArrowLeft, Code, ImageSquare, Palette } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading } from "../../../components/docs/ComponentDoc";
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
      <PageHeader title="详情与描述列表" description="详情页延续表单的横向扫描逻辑：同一页面统一采用左右标签，不因局部分组密度改变字段格式。" note={<>关联页面：数据先通过 <Link to="/components/input" className="font-medium text-[var(--product-blue-500)]">输入框</Link> 采集，再由 <Link to="/components/form" className="font-medium text-[var(--product-blue-500)]">表单</Link> 组合提交，最终进入只读详情视图。</>} />

      <section>
        <SectionHeading
          eyebrow="Overview"
          title="基本属性"
          description="成组展示多个只读字段，一般用于详情页、审核摘要和数据资产信息。参考 Arco Design（设计系统）的分类方式，先区分简单展示与带边框展示，再按内容密度选择排列模式。"
        />
        <div className="border border-[var(--neutral-200)] bg-white p-6">
          <div className="space-y-8">
            <div>
              <div className="mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-[var(--text-primary)]">简单展示</h3>
                  <p className="mt-1 text-xs leading-5 text-[var(--text-tertiary)]">无外边框，以更充足的字段间距组织内容，适合卡片内部、页面摘要和轻量信息组。</p>
                </div>
              </div>
              <DescriptionList bordered={false} columns={2} size="sm" items={materialItems.slice(0, 4)} />
            </div>
            <div>
              <div className="mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-[var(--text-primary)]">带边框展示</h3>
                  <p className="mt-1 text-xs leading-5 text-[var(--text-tertiary)]">浅灰标签区与白色内容区建立键值层级，适合独立详情模块和对比阅读。</p>
                </div>
              </div>
              <DescriptionList columns={2} size="sm" items={materialItems.slice(0, 4)} />
            </div>
          </div>
          <div className="mt-8 border-l-2 border-[var(--neutral-900)] bg-[var(--neutral-50)] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-tertiary)]">规则摘要</p>
            <div className="mt-4 grid gap-5 md:grid-cols-3 md:gap-0 md:divide-x md:divide-[var(--neutral-200)]">
              {[
                ["组件构成", "分组标题（可选）· 字段标签 · 字段值 · 状态或操作（可选）"],
                ["排列模式", "水平、垂直、行内水平、行内垂直；同一信息组保持一致"],
                ["尺寸与响应式", "Small 单行参考高度 44px，用于密集信息；Medium 为 54px，用于常规详情；折行时自然增高"],
              ].map(([title, content]) => (
                <div key={title} className="border-t border-[var(--neutral-200)] pt-4 md:border-t-0 md:px-5 md:pt-0 md:first:pl-0 md:last:pr-0">
                  <h3 className="text-xs font-semibold text-[var(--text-primary)]">{title}</h3>
                  <p className="mt-2 text-xs leading-5 text-[var(--text-secondary)]">{content}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-4 text-xs leading-5 text-[var(--text-tertiary)]">
            标题用于概括整组信息，由页面分组标题承载，不写入每个 DescriptionList 字段网格。分类方式参考{
            } <a href="https://arco.design/docs/spec/descriptions" target="_blank" rel="noreferrer" className="text-[var(--product-blue-500)] underline underline-offset-4">Arco Design 描述列表</a>，视觉与尺寸继续使用本设计系统 Token。
          </p>
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Complete Detail Page"
          title="详情页模式"
          description="这是描述列表（DescriptionList）的上层页面模式，用于说明标题、状态、字段分组和操作栏如何组合；它们不是描述列表组件本身的接口（API）。"
        />
        <div className="overflow-hidden rounded-[var(--radius-md)] border border-[var(--neutral-200)] bg-white">
          {/* 详情页头部 */}
          <div className="border-b border-[var(--neutral-200)] px-6 py-4">
            <div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">GH4169 高温合金</h3>
              <p className="mt-1 text-xs text-[var(--text-tertiary)]">材料编码：MAT-2026-0618-002 · 更新于 2026-06-30</p>
            </div>
          </div>

          {/* 分组一：基础信息 */}
          <div className="relative px-6 py-4 after:absolute after:bottom-0 after:left-6 after:right-6 after:h-px after:bg-[var(--neutral-100)]">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-tertiary)]">基础信息</h3>
            <DescriptionList
              bordered={false}
              columns={2}
              size="sm"
              items={fullDetailItems.slice(0, 5)}
            />
          </div>

          {/* 分组二：力学性能 */}
          <div className="relative px-6 py-4 after:absolute after:bottom-0 after:left-6 after:right-6 after:h-px after:bg-[var(--neutral-100)]">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-tertiary)]">力学性能</h3>
            <DescriptionList
              bordered={false}
              columns={2}
              size="sm"
              layout="inline"
              items={fullDetailItems.slice(5, 9)}
            />
          </div>

          {/* 分组三：检测与文件 */}
          <div className="relative px-6 py-4 after:absolute after:bottom-0 after:left-6 after:right-6 after:h-px after:bg-[var(--neutral-100)]">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-tertiary)]">检测与文件</h3>
            <DescriptionList
              bordered={false}
              layout="inline"
              labelWidth={88}
              columns={2}
              size="sm"
              items={fullDetailItems.slice(9, 13)}
            />
          </div>

          {/* 分组四：治理说明（长文本跨列） */}
          <div className="relative px-6 py-4 after:absolute after:bottom-0 after:left-6 after:right-6 after:h-px after:bg-[var(--neutral-100)]">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-tertiary)]">治理记录</h3>
            <DescriptionList
              bordered={false}
              columns={2}
              size="sm"
              items={fullDetailItems.slice(13)}
            />
          </div>

          {/* 详情页底部操作栏 */}
          <div className="mt-4 flex items-center justify-between gap-3 px-6 pb-4">
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
        <SectionHeading eyebrow="Variants" title="展示结构与使用边界" description="左右与上下结构都是组件能力，但同一详情页面只能选择一种扫描方向；上下结构适用于独立的参数摘要，不与左右结构在同页混用。" />
        <div className="space-y-5">
          <ExampleCard title="标准网格 · 2 列左右结构" description="详情页默认使用 2 列，标签固定宽度并右对齐，延续编辑表单的扫描路径。">
            <DescriptionList items={materialItems} columns={2} />
          </ExampleCard>
          <ExampleCard title="长标签 · 统一扩展宽度" description="同一信息组出现长业务标签时，整体扩展标签宽度，不单独调整某一字段。">
            <DescriptionList
              layout="inline"
              labelWidth={152}
              columns={2}
              items={[
                { label: "可信数据空间名称", value: "新材料可信数据空间" },
                { label: "数据共享等级", value: <Tag variant="product" size="sm">内部共享</Tag> },
                { label: "数据授权方式", value: "合约授权 / 审计追踪" },
                { label: "授权有效周期", value: "2026-06-01 至 2026-12-31" },
              ]}
            />
          </ExampleCard>
          <ExampleCard title="独立参数摘要 · 4 列上下结构" description="用于单独的指标摘要模块，不作为详情页局部空间不足时的回退方式；不承载状态标签和长文本。">
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
              <div className="flex aspect-[4/3] items-center justify-center rounded-[var(--radius-md)] border border-dashed border-[var(--neutral-300)] bg-[var(--neutral-50)]">
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
                    <p className="text-sm font-medium leading-5 text-[var(--text-primary)]">{name}</p>
                    <p className="mt-1 text-xs text-[var(--text-tertiary)]">{type}</p>
                  </div>
                  <Tag variant={status === "待确认" ? "warning" : "neutral"} size="sm" className="self-center">{status}</Tag>
                </div>
              ))}
            </div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="States" title="后台常见状态" />
        <div className="space-y-5">
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
          <ExampleCard title="带边框折行与跨列" description="值折行时整行随内容增高，浅灰标签背景同步撑满行高并保持顶部对齐。">
            <DescriptionList
              columns={2}
              items={[
                { label: "数据治理说明", value: "该数据集经过字段标准化、单位换算、异常值识别和责任部门复核，可用于模型训练和业务分析。", span: 2 },
                { label: "数据资源标识", value: "urn:xincailiao:trusted-data-space:material-dataset:GH4169:BATCH-2026-0618", span: 2 },
                { label: "权限说明", value: "外部访问需要经过数据空间合约授权，并记录审计日志。", span: 2 },
              ]}
            />
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Guidelines" title="最佳实践" description="先阅读不可违反的核心规则，再按角色查看实施要求；低频内容规则默认收起。" />
        <div className="space-y-5">
          <div className="border-l-2 border-[var(--neutral-900)] bg-[var(--neutral-50)] p-5">
            <div className="flex items-center gap-2">
              <span className="border border-[var(--warning-border)] bg-[var(--warning-bg)] px-2 py-0.5 text-xs font-semibold text-[var(--warning-text)]">重点必读</span>
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">所有角色必读</h3>
            </div>
            <ol className="mt-4 grid gap-3 md:grid-cols-2">
              {[
                "同一详情页统一使用 2 列左右结构，不因字段数量或局部空间切换扫描方向。",
                "标签和值统一使用 14px；标签宽度按信息组统一设置，不能逐项变化。",
                "左右与上下结构不可在同一详情页混用；窄屏时由整页统一降级。",
                "值允许折行且不能产生横向溢出；折行后标签背景必须与内容行等高。",
              ].map((item, index) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-[var(--text-secondary)]">
                  <span className="shrink-0 font-semibold tabular-nums text-[var(--text-primary)]">0{index + 1}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {[
              {
                label: "视觉执行要点",
                description: "用于确定视觉类型、密度与页面扫描路径。",
                icon: <Palette size={16} weight="regular" aria-hidden="true" />,
                iconClass: "bg-[var(--product-blue-50)] text-[var(--product-blue-600)]",
                items: [
                  "无边框样式使用 12px 标签值间距、20–24px 纵向留白和 40px 列间距。",
                  "带边框样式使用浅灰标签背景、白色内容背景和 1px 行分隔线。",
                  "Small 单行参考高度 44px；Medium 54px，同页保持同一尺寸。",
                  "长标签按同组最长项统一扩展到 120–160px；长文本优先跨列。",
                  "分组线左右缩进 24px；底部操作区与最后一组保持 16px 间距。",
                ],
              },
              {
                label: "开发必看",
                description: "用于保证语义、响应式与内容边界一致。",
                icon: <Code size={16} weight="regular" aria-hidden="true" />,
                iconClass: "bg-[var(--neutral-100)] text-[var(--text-primary)]",
                items: [
                  "使用 DescriptionList 的 dl / dt / dd 语义，不用普通 div 模拟键值关系。",
                  "labelWidth 包含单元格内边距；同一实例只传一个统一值。",
                  "无空格链接和标识使用安全换行；值容器必须 min-width: 0。",
                  "折行由内容自然撑高，带边框标签区与内容区保持 stretch 等高。",
                  "窄屏按组件断点整体切换单列，不根据单个字段宽度改变 layout。",
                ],
              },
            ].map((group) => (
              <div key={group.label} className="border border-[var(--neutral-200)] bg-white p-5">
                <div className="flex items-start gap-3">
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center ${group.iconClass}`}>{group.icon}</div>
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--text-primary)]">{group.label}</h3>
                    <p className="mt-1 text-xs leading-5 text-[var(--text-tertiary)]">{group.description}</p>
                  </div>
                </div>
                <ul className="mt-4 space-y-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-2 text-sm leading-6 text-[var(--text-secondary)]">
                      <span className="mt-2 h-1 w-1 shrink-0 bg-[var(--neutral-400)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <details className="group border border-[var(--neutral-200)] bg-white">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-semibold text-[var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--neutral-900)]">
              <span>补充规则 · 内容与业务场景</span>
              <span className="text-xs font-normal text-[var(--text-tertiary)] group-open:hidden">展开查看</span>
              <span className="hidden text-xs font-normal text-[var(--text-tertiary)] group-open:inline">收起</span>
            </summary>
            <div className="hidden gap-3 border-t border-[var(--neutral-200)] px-5 py-4 text-sm leading-6 text-[var(--text-secondary)] group-open:grid md:grid-cols-2">
              <p>空值统一显示“未填写”或“--”；敏感字段按业务规则脱敏并保留可辨识格式。</p>
              <p>图文资料作为同一信息组：图片或附件在左侧，关键字段在右侧紧随。</p>
              <p>完整详情页按“标题 → 分组描述列表 → 底部操作栏”组织，不重复展示同一状态。</p>
              <p>空值、脱敏和折行等边界示例使用上下通栏卡片，避免文档分栏干扰组件宽度。</p>
            </div>
          </details>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Link
          to="/components/form"
          className="group flex items-center gap-3 rounded-[var(--radius-md)] border border-[var(--neutral-200)] bg-white p-5 transition-all hover:border-[var(--neutral-300)] hover:bg-[var(--neutral-50)]"
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
          className="group flex items-center gap-3 rounded-[var(--radius-md)] border border-[var(--neutral-200)] bg-white p-5 transition-all hover:border-[var(--neutral-300)] hover:bg-[var(--neutral-50)]"
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
