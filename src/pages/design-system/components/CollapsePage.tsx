import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import { Button } from "../../../components/ui/Button";
import { Collapse } from "../../../components/ui/Collapse";
import { Input } from "../../../components/ui/Input";
import { Select } from "../../../components/ui/Select";
import { Tag } from "../../../components/ui/Tag";

const parameterContent = (
  <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
    {[
      ["元素含量", "Al 5.8% / V 4.1%"],
      ["数据来源", "标准导入 + 实验复核"],
      ["标准范围", "GB/T 3620.1"],
    ].map(([label, value]) => (
      <div key={label} className="bg-[var(--neutral-50)] px-3 py-2">
        <p className="text-xs text-[var(--neutral-500)]">{label}</p>
        <p className="mt-1 text-sm text-[var(--neutral-900)]">{value}</p>
      </div>
    ))}
  </div>
);

export default function CollapsePage() {
  return (
    <div className="space-y-16">
      <PageHeader title="折叠面板" description="折叠面板用于收纳高级筛选、配置分组、长表单和材料参数说明，降低复杂后台页面的首屏压力。" />

      <section>
        <SectionHeading eyebrow="Variants" title="基础类型" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="多项展开" description="适合材料参数、数据治理结果、审计信息等可并行阅读的内容。">
            <Collapse
              defaultOpenKeys={["composition"]}
              items={[
                { key: "composition", title: "成分参数", extra: <Tag size="sm" variant="product">3 项</Tag>, children: parameterContent },
                { key: "process", title: "工艺参数", extra: <Tag size="sm" variant="neutral">可扩展</Tag>, children: "热处理、轧制、成形等工艺条件以结构化字段展示，必要时附带数据来源。" },
                { key: "property", title: "性能参数", children: "强度、韧性、硬度等性能数据可放入独立面板，避免详情页字段过长。" },
              ]}
            />
          </ExampleCard>
          <ExampleCard title="手风琴" description="一次只展开一组，适合流程说明、权限说明和帮助内容。">
            <Collapse
              accordion
              defaultOpenKeys={["audit"]}
              items={[
                { key: "audit", title: "审计轨迹", children: "展示数据修改人、修改时间、审批节点和存证结果。" },
                { key: "permission", title: "权限说明", children: "展示当前角色可见字段、可操作按钮和数据导出范围。" },
                { key: "disabled", title: "合约配置", children: "当前角色无权配置。", disabled: true },
              ]}
            />
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Backend States" title="后台组合状态" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="高级筛选收纳" description="列表页默认只露出高频筛选，更多条件放入折叠面板。">
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <Input size="sm" placeholder="材料名称 / 牌号" />
                <Select size="sm" placeholder="治理状态" options={[{ label: "已校验", value: "checked" }, { label: "待复核", value: "pending" }]} />
                <Button size="sm" className="w-full md:w-auto md:min-w-20">查询</Button>
              </div>
              <Collapse
                size="sm"
                items={[
                  {
                    key: "advanced",
                    title: (
                      <span className="flex items-center gap-2">
                        更多筛选
                        <Tag size="sm" variant="neutral">6 项</Tag>
                      </span>
                    ),
                    extra: <Tag size="sm" variant="neutral">高级</Tag>,
                    children: (
                      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                        <Input size="sm" placeholder="数据来源" />
                        <Input size="sm" placeholder="创建部门" />
                        <Select size="sm" placeholder="权限范围" options={[{ label: "团队可见", value: "team" }, { label: "空间可见", value: "space" }]} />
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          </ExampleCard>
          <ExampleCard title="配置分组与禁用状态" description="流程未满足、权限不足的配置项保留可见但禁用。">
            <Collapse
              defaultOpenKeys={["base", "rule"]}
              items={[
                { key: "base", title: "基础信息", children: "数据集名称、所属空间、责任部门和归档周期。" },
                { key: "rule", title: "校验规则", extra: <Tag size="sm" variant="success">已启用</Tag>, children: "字段完整性、单位换算、异常值识别和重复数据检查。" },
                { key: "chain", title: "链上存证", children: "该配置仅空间管理员可编辑。", disabled: true },
              ]}
            />
            <p className="mt-3 text-xs leading-5 text-[var(--neutral-500)]">禁用项需要保留标题，让用户知道存在该能力，同时在说明或 tooltip 中解释原因。</p>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Interaction" title="交互状态与 Figma 原型" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="状态拆解" description="折叠面板在设计稿和组件库中必须拆出 closed、open、disabled 和 with-extra 状态。">
            <div className="space-y-3 text-sm">
              {[
                ["Closed", "默认收起，只显示标题、数量或状态。"],
                ["Open", "展开后显示内容区，内容区与标题保持 12px-16px 内边距。"],
                ["Disabled", "保留标题但不可点击，需要在说明或 tooltip 中解释原因。"],
                ["With extra", "右侧只放数量、状态或轻量说明，不放主要操作按钮。"],
              ].map(([state, description]) => (
                <div key={state} className="grid grid-cols-[96px_1fr] gap-4 border-b border-[var(--neutral-100)] py-2 last:border-b-0">
                  <p className="font-medium text-[var(--neutral-900)]">{state}</p>
                  <p className="text-[var(--neutral-600)]">{description}</p>
                </div>
              ))}
            </div>
          </ExampleCard>
          <ExampleCard title="后台筛选交互" description="筛选区按钮使用后台 28px/32px 尺寸，不因折叠内容增加而改变主操作位置。">
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_1fr_auto]">
                <Input size="sm" placeholder="材料名称 / 牌号" />
                <Select size="sm" placeholder="治理状态" options={[{ label: "已校验", value: "checked" }]} />
                <Button size="sm" className="min-w-20">查询</Button>
              </div>
              <div className="bg-[var(--neutral-50)] p-3 text-xs leading-5 text-[var(--neutral-600)]">
                查询按钮高度 28px，宽度至少 80px；更多筛选展开后，查询与重置仍放在筛选行末尾或底部右侧。
              </div>
            </div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Guidelines" title="最佳实践" />
        <SpecList
          items={[
            "折叠面板适合收纳次级信息，不应用来隐藏主流程必须填写的关键字段。",
            "高级筛选默认可折叠，但常用筛选项应始终外露。",
            "后台筛选中的查询按钮使用 sm 或 md 尺寸，最小宽度 80px，避免被输入框挤压。",
            "长表单按业务语义分组：基础信息、规则配置、权限范围、审计记录。",
            "禁用面板必须说明条件原因，例如无权限、流程未到达或数据未校验。",
            "标题右侧可放数量、状态或简短操作，但不能承载主按钮。",
            "Figma 组件需包含 closed、open、disabled、accordion、extra、nested content、filter group 等变体。",
          ]}
        />
      </section>
    </div>
  );
}
