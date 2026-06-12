import { CheckCircle, Clock, Database, WarningCircle } from "@phosphor-icons/react";
import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import { Button } from "../../../components/ui/Button";
import { Tag } from "../../../components/ui/Tag";

export default function TagPage() {
  return (
    <div className="space-y-16">
      <PageHeader title="标签" description="标签用于表达分类、状态、属性和轻量提示，帮助用户快速识别数据对象的关键属性。" />

      <section>
        <SectionHeading eyebrow="Variants" title="标签类型" description="标签颜色必须承载语义：品牌红用于关键节点，产品蓝用于功能和模块，语义色用于状态反馈。" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="分类与属性">
            <div className="flex flex-wrap gap-3">
              <Tag>默认标签</Tag>
              <Tag variant="brand">关键节点</Tag>
              <Tag variant="product">数据空间</Tag>
              <Tag icon={<Database size={13} weight="regular" />}>材料数据</Tag>
            </div>
          </ExampleCard>
          <ExampleCard title="状态标签">
            <div className="flex flex-wrap gap-3">
              <Tag variant="success" icon={<CheckCircle size={13} weight="regular" />}>已发布</Tag>
              <Tag variant="warning" icon={<Clock size={13} weight="regular" />}>待确认</Tag>
              <Tag variant="error" icon={<WarningCircle size={13} weight="regular" />}>异常数据</Tag>
              <Tag disabled>不可用</Tag>
            </div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="States" title="尺寸与交互" description="后台表格内优先使用 Small 标签；可移除标签用于筛选条件和已选项，不用于普通状态展示。" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <ExampleCard title="尺寸">
            <div className="flex flex-wrap items-center gap-3">
              <Tag size="sm">Small</Tag>
              <Tag size="md">Medium</Tag>
              <Tag size="md" variant="brand">品牌红浅色阶</Tag>
            </div>
          </ExampleCard>
          <ExampleCard title="可关闭标签">
            <div className="flex flex-wrap gap-3">
              <Tag closable>热处理</Tag>
              <Tag variant="product" closable>数据空间</Tag>
              <Tag variant="brand" closable>关键结论</Tag>
            </div>
          </ExampleCard>
          <ExampleCard title="表格密度">
            <div className="space-y-2">
              {[
                ["TC4 钛合金", "已治理", "success"],
                ["GH4169", "待确认", "warning"],
                ["6061 铝合金", "异常", "error"],
              ].map(([name, state, variant]) => (
                <div key={name} className="flex items-center justify-between rounded-sm bg-[var(--neutral-50)] px-3 py-2 text-sm">
                  <span className="text-[var(--neutral-800)]">{name}</span>
                  <Tag size="sm" variant={variant as "success" | "warning" | "error"}>{state}</Tag>
                </div>
              ))}
            </div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Composition" title="后台筛选组合" description="筛选条件标签需要支持清除、换行和批量清空；不要把所有字段都标签化。" />
        <div className="rounded-sm bg-white p-6">
          <div className="rounded-sm border border-[var(--neutral-200)] p-4">
            <div className="mb-3 text-sm font-semibold text-[var(--neutral-900)]">已选条件</div>
            <div className="flex flex-wrap gap-2">
              <Tag closable>材料类型：钛合金</Tag>
              <Tag closable>状态：已治理</Tag>
              <Tag variant="product" closable>空间：组织内</Tag>
              <Button variant="text" size="sm" className="h-auto px-0 py-0 text-[var(--neutral-500)]">清空</Button>
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Guidelines" title="使用建议" />
        <SpecList
          items={[
            "品牌红标签仅用于关键节点、激活状态、决策结果和重点提示。",
            "状态标签必须和文字语义配合，不只依赖颜色。",
            "同一列表中标签数量应控制，避免干扰主数据阅读。",
            "Figma 组件需包含六种语义色、两种尺寸、图标、禁用、可关闭状态。",
          ]}
        />
      </section>
    </div>
  );
}
