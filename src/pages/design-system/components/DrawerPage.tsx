import { useState, type ReactNode } from "react";
import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading, SpecList, SubsectionHeading } from "../../../components/docs/ComponentDoc";
import { Button } from "../../../components/ui/Button";
import { DescriptionList } from "../../../components/ui/DescriptionList";
import { Drawer, type DrawerProps } from "../../../components/ui/Drawer";
import { Tag } from "../../../components/ui/Tag";

const applicationBasicDetails = [
  { label: "连接器类型", value: "云连接器" },
  { label: "部署方式", value: "部署方式" },
  { label: "供应商名称", value: "上海实力科技有限公司" },
  { label: "申请时间", value: "2024-10-23 12:22:33" },
  { label: "当前状态", value: <Tag size="sm" variant="success">已通过</Tag> },
];

const applicantDetails = [
  { label: "申请主体", value: "北京新材道数智科技有限公司" },
  { label: "联系人", value: "万物" },
  { label: "联系电话", value: "19938894929" },
];

const reviewDetails = [
  { label: "审核时间", value: "2024-01-16 12:30:22" },
  { label: "审核人", value: "管理员A" },
  { label: "审核意见", value: "申请材料完整，业务需求明确，统一通过" },
];

function DetailSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <SubsectionHeading title={title} />
      {children}
    </section>
  );
}

function ApplicationDetails() {
  return (
    <div className="space-y-8">
      <DetailSection title="基本信息">
        <DescriptionList className="!gap-y-4 bg-transparent" items={applicationBasicDetails} columns={1} bordered={false} size="sm" labelWidth={96} />
      </DetailSection>
      <DetailSection title="申请人信息">
        <DescriptionList className="!gap-y-4 bg-transparent" items={applicantDetails} columns={1} bordered={false} size="sm" labelWidth={96} />
      </DetailSection>
      <DetailSection title="申请理由">
        <p className="text-sm leading-6 text-[var(--text-primary)]">用于CRM系统与数据平台的集成，实现客户数据的实时同步</p>
      </DetailSection>
      <DetailSection title="审核记录">
        <DescriptionList className="!gap-y-4 bg-transparent" items={reviewDetails} columns={1} bordered={false} size="sm" labelWidth={96} />
      </DetailSection>
    </div>
  );
}

type DrawerSizePreset = {
  size: NonNullable<DrawerProps["size"]>;
  name: string;
  width: string;
  usage: string;
  title: string;
  description: string;
  columns: 1 | 2;
  details: Array<{ label: string; value: ReactNode }>;
};

const drawerSizePresets: DrawerSizePreset[] = [
  {
    size: "sm",
    name: "小尺寸",
    width: "宽度 400px",
    usage: "申请概览、简单设置",
    title: "申请概览 - 编号1003",
    description: "用于快速核对申请状态和申请主体。",
    columns: 1,
    details: [
      { label: "连接器类型", value: "云连接器" },
      { label: "当前状态", value: <Tag size="sm" variant="success">已通过</Tag> },
      { label: "申请主体", value: "北京新材道数智科技有限公司" },
    ],
  },
  {
    size: "md",
    name: "中尺寸",
    width: "宽度 480px",
    usage: "详情摘要、短表单",
    title: "申请详情 - 编号1003",
    description: "默认用于单列展示申请基础信息。",
    columns: 1,
    details: [
      { label: "连接器类型", value: "云连接器" },
      { label: "部署方式", value: "部署方式" },
      { label: "供应商名称", value: "上海实力科技有限公司" },
      { label: "申请时间", value: "2024-10-23 12:22:33" },
      { label: "当前状态", value: <Tag size="sm" variant="success">已通过</Tag> },
    ],
  },
  {
    size: "lg",
    name: "大尺寸",
    width: "宽度 640px",
    usage: "较复杂配置、分组详情",
    title: "申请详情 - 编号1003",
    description: "适用于并列核对申请人信息和审核结果。",
    columns: 2,
    details: [
      { label: "申请主体", value: "北京新材道数智科技有限公司" },
      { label: "联系人", value: "万物" },
      { label: "联系电话", value: "19938894929" },
      { label: "审核时间", value: "2024-01-16 12:30:22" },
      { label: "审核人", value: "管理员A" },
      { label: "审核意见", value: "申请材料完整，统一通过" },
    ],
  },
  {
    size: "xl",
    name: "超大尺寸",
    width: "宽度 800px",
    usage: "宽字段详情的尺寸上限",
    title: "申请详情 - 编号1003",
    description: "用于在保留主页面上下文时集中核对完整申请信息。",
    columns: 2,
    details: [
      ...applicationBasicDetails,
      ...applicantDetails,
      { label: "申请理由", value: "用于CRM系统与数据平台的集成，实现客户数据的实时同步" },
      ...reviewDetails,
    ],
  },
];

type DrawerExample = "detail" | "history" | "right" | "left" | null;

export default function DrawerPage() {
  const [open, setOpen] = useState<DrawerExample>(null);
  const [sizePreview, setSizePreview] = useState<DrawerSizePreset["size"] | null>(null);
  const activeSizePreview = drawerSizePresets.find((preset) => preset.size === sizePreview);

  return (
    <div className="space-y-16">
      <PageHeader title="抽屉" description="抽屉用于在不离开当前页面的情况下承载详情、筛选、配置和短流程编辑，适合需要保留主页面上下文的侧向任务。" />

      <section>
        <SectionHeading eyebrow="Usage" title="基础结构" description="基础抽屉分为带操作区与无操作区两种。标题区只说明当前对象，补充描述和业务内容统一放在内容区。" />
        <div className="space-y-5">
          <ExampleCard
            title="基础抽屉｜带操作按钮"
            description="用于编辑、配置或需要继续进入详情页的任务，底部操作区固定显示。点击按钮体验打开、关闭与操作区。"
            interactive
            code={`const [open, setOpen] = useState(false);\n\n<Button onClick={() => setOpen(true)}>查看申请</Button>\n<Drawer\n  open={open}\n  title="申请详情"\n  onClose={() => setOpen(false)}\n  footer={<Button onClick={() => setOpen(false)}>确认</Button>}\n>\n  <ApplicationDetails />\n</Drawer>`}
          >
            <div className="mb-5">
              <Button onClick={() => setOpen("detail")}>打开带按钮抽屉</Button>
            </div>
            <Drawer
              inline
              open
              size="md"
              title="申请详情 - 编号1003"
              description="查看云连接器申请的基础信息、申请人信息和审核记录。内容超出可视区域后仅中部滚动。"
              maskClosable={false}
              footer={
                <>
                  <Button variant="ghost" size="sm">关闭</Button>
                  <Button size="sm" tone="product">审批</Button>
                </>
              }
            >
              <ApplicationDetails />
            </Drawer>
            <Drawer
              open={open === "detail"}
              size="md"
              title="申请详情 - 编号1003"
              description="查看云连接器申请的基础信息、申请人信息和审核记录。内容超出可视区域后仅中部滚动。"
              onClose={() => setOpen(null)}
              footer={
                <>
                  <Button variant="ghost" onClick={() => setOpen(null)}>关闭</Button>
                  <Button onClick={() => setOpen(null)}>审批</Button>
                </>
              }
            >
              <ApplicationDetails />
            </Drawer>
          </ExampleCard>

          <ExampleCard title="基础抽屉｜无操作按钮" description="用于只读详情、说明和流转记录，不显示底部操作区，通过右上角或点击遮罩关闭。">
            <div className="mb-5">
              <Button variant="outline" onClick={() => setOpen("history")}>打开无按钮抽屉</Button>
            </div>
            <Drawer inline open size="md" title="申请详情 - 编号1003" description="查看已完成申请的全部字段和审核结果。内容超出可视区域后仅中部滚动。" maskClosable={false}>
              <ApplicationDetails />
            </Drawer>
            <Drawer open={open === "history"} size="md" title="申请详情 - 编号1003" description="查看已完成申请的全部字段和审核结果。内容超出可视区域后仅中部滚动。" onClose={() => setOpen(null)}>
              <ApplicationDetails />
            </Drawer>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Size" title="宽度与高度规范" description="先按内容复杂度选择宽度档位，再让抽屉高度跟随视口并保持内容区独立滚动。" />
        <div className="overflow-hidden rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white">
          <div className="border-b border-[var(--neutral-200)] bg-[var(--neutral-50)] px-5 py-4">
            <p className="text-sm font-semibold text-[var(--text-primary)]">选择抽屉宽度</p>
            <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">以下为桌面端推荐宽度，点击任一档位可查看真实内容示例。</p>
          </div>
          <div className="grid divide-y divide-[var(--neutral-200)] md:grid-cols-4 md:divide-x md:divide-y-0">
            {drawerSizePresets.map((preset) => (
              <button
                key={preset.size}
                type="button"
                aria-label={`查看${preset.name}抽屉示例`}
                onClick={() => setSizePreview(preset.size)}
                className="group min-h-[168px] bg-white p-5 text-left transition-colors hover:bg-[var(--product-blue-50)] focus-visible:relative focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--product-blue-500)]"
              >
                <span className="block text-sm text-[var(--text-tertiary)]">{preset.name}</span>
                <span className="mt-3 block font-mono text-xl font-semibold text-[var(--text-primary)] group-hover:text-[var(--product-blue-600)]">{preset.width}</span>
                <span className="mt-2 block min-h-12 text-sm leading-6 text-[var(--text-secondary)]">{preset.usage}</span>
                <span className="mt-3 block text-sm text-[var(--product-blue-600)]">打开示例 →</span>
              </button>
            ))}
          </div>
          <div className="grid border-t border-[var(--neutral-200)] bg-[var(--neutral-50)] md:grid-cols-2 md:divide-x md:divide-[var(--neutral-200)]">
            <div className="px-5 py-4">
              <p className="text-sm font-semibold text-[var(--text-primary)]">宽度规则</p>
              <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">桌面端使用 400 / 480 / 640 / 800px 四档；至少保留 48px 主页面上下文，空间不足时自动收缩。</p>
            </div>
            <div className="border-t border-[var(--neutral-200)] px-5 py-4 md:border-t-0">
              <p className="text-sm font-semibold text-[var(--text-primary)]">高度与响应式</p>
              <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">抽屉占满视口高度，标题区和操作区固定，仅内容区滚动；移动端允许收缩为全宽。</p>
            </div>
          </div>
        </div>
        {activeSizePreview ? (
          <Drawer
            open
            size={activeSizePreview.size}
            title={activeSizePreview.title}
            description={activeSizePreview.description}
            onClose={() => setSizePreview(null)}
            footer={
              <>
                <Button variant="ghost" onClick={() => setSizePreview(null)}>取消</Button>
                <Button onClick={() => setSizePreview(null)}>确认</Button>
              </>
            }
          >
            <DescriptionList className="!gap-y-3 bg-transparent" items={activeSizePreview.details} columns={activeSizePreview.columns} bordered={false} size="sm" labelWidth={88} />
          </Drawer>
        ) : null}
      </section>

      <section>
        <SectionHeading eyebrow="Behavior" title="方向与退出方式" description="右侧是后台任务的默认方向；左侧仅用于临时导航或工具。关闭方式应根据是否存在未保存内容决定。" />
        <div className="overflow-hidden rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white">
          <div className="grid divide-y divide-[var(--neutral-200)] md:grid-cols-2 md:divide-x md:divide-y-0">
            <div className="p-5 md:p-6">
              <h3 className="text-base font-semibold text-[var(--text-primary)]">右侧抽屉｜默认</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">用于详情、筛选、配置和短编辑，保持用户对主页面位置的感知。</p>
              <Button className="mt-5" variant="outline" onClick={() => setOpen("right")}>查看右侧抽屉</Button>
            </div>
            <div className="p-5 md:p-6">
              <h3 className="text-base font-semibold text-[var(--text-primary)]">左侧抽屉｜限制使用</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">仅用于临时导航、目录或低频工具，不替代产品的主侧栏。</p>
              <Button className="mt-5" variant="outline" onClick={() => setOpen("left")}>查看左侧抽屉</Button>
            </div>
          </div>
          <div className="grid border-t border-[var(--neutral-200)] bg-[var(--neutral-50)] md:grid-cols-2 md:divide-x md:divide-[var(--neutral-200)]">
            <div className="px-5 py-4">
              <p className="text-sm font-semibold text-[var(--text-primary)]">无未保存内容</p>
              <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">允许通过右上角、Esc 或点击遮罩退出，关闭后焦点返回触发按钮。</p>
            </div>
            <div className="border-t border-[var(--neutral-200)] px-5 py-4 md:border-t-0">
              <p className="text-sm font-semibold text-[var(--text-primary)]">存在未保存内容</p>
              <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">禁用点击遮罩退出；用户点击关闭时由业务层提示保存或放弃修改。</p>
            </div>
          </div>
        </div>
        <Drawer open={open === "right"} title="申请详情 - 编号1003" description="查看云连接器申请的完整信息。" maskClosable={false} onClose={() => setOpen(null)} footer={<><Button variant="ghost" onClick={() => setOpen(null)}>关闭</Button><Button onClick={() => setOpen(null)}>审批</Button></>}>
          <ApplicationDetails />
        </Drawer>
        <Drawer open={open === "left"} placement="left" size="sm" title="快捷工具" description="临时访问当前工作区的低频工具。" onClose={() => setOpen(null)}>
          <div className="space-y-2">
            {["字段说明", "数据字典", "流转记录"].map((item) => <div key={item} className="rounded-[var(--radius-sm)] bg-[var(--neutral-50)] px-4 py-3 text-sm text-[var(--text-primary)]">{item}</div>)}
          </div>
        </Drawer>
      </section>

      <section>
        <SectionHeading eyebrow="Guidelines" title="最佳实践" />
        <SpecList
          items={[
            "抽屉用于保持当前页面上下文，适合详情预览、筛选、配置和短编辑。",
            "标题只说明对象或任务，补充描述、状态和业务信息统一放在内容区。",
            "底部操作区固定在抽屉底部，取消在左、确认在右；只读内容可省略操作区。",
            "抽屉宽度超过 800px、需要多步骤或主任务发生切换时，应改用独立页面。",
            "避免在窄抽屉中放置宽表格；优先改为描述列表、分组字段或详情页。",
          ]}
        />
      </section>
    </div>
  );
}
