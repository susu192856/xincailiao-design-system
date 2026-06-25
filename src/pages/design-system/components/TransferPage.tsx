import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import { Tag } from "../../../components/ui/Tag";
import { Transfer } from "../../../components/ui/Transfer";

const fieldItems = [
  { key: "composition", label: "成分字段", description: "元素含量、单位、来源" },
  { key: "process", label: "工艺字段", description: "热处理、轧制、时效" },
  { key: "property", label: "性能字段", description: "强度、韧性、硬度" },
  { key: "audit", label: "审计字段", description: "存证、修改记录" },
  { key: "secret", label: "敏感字段", description: "供应商价格、内部备注", disabled: true },
];

const roleItems = [
  { key: "viewer", label: "查看数据", description: "读取材料数据和图谱关系" },
  { key: "download", label: "下载报告", description: "导出 PDF / Excel" },
  { key: "edit", label: "编辑字段", description: "修改标准化后的字段内容" },
  { key: "approve", label: "审批发布", description: "确认数据进入共享空间" },
  { key: "contract", label: "合约配置", description: "配置流通规则", disabled: true },
];

export default function TransferPage() {
  return (
    <div className="space-y-16">
      <PageHeader title="穿梭框" description="穿梭框用于在两个集合之间移动对象，适合权限分配、字段选择、数据集配置和批量对象选择。" />

      <section>
        <SectionHeading eyebrow="Variants" title="典型场景" />
        <div className="space-y-5">
          <ExampleCard title="字段授权" description="数据空间与材库常需要按角色配置可见字段。">
            <Transfer
              showSearch
              sourceTitle="未授权字段"
              targetTitle="已授权字段"
              defaultTargetKeys={["composition", "property"]}
              items={fieldItems}
            />
          </ExampleCard>
          <ExampleCard title="角色权限配置" description="权限项需要写清楚动作结果，不要只显示抽象编号。">
            <Transfer
              sourceTitle="可配置权限"
              targetTitle="当前角色权限"
              defaultTargetKeys={["viewer"]}
              items={roleItems}
            />
            <div className="mt-4 flex flex-wrap gap-2">
              <Tag variant="product" size="sm">功能权限</Tag>
              <Tag variant="neutral" size="sm">禁用项不可迁移</Tag>
              <Tag variant="warning" size="sm">高风险权限需二次确认</Tag>
            </div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Backend States" title="后台常见状态" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="带搜索的穿梭框" description="选项超过 20 条时，列表上方应提供搜索或分类筛选。">
            <Transfer
              showSearch
              sourceTitle="字段库"
              targetTitle="展示字段"
              defaultTargetKeys={["composition"]}
              items={fieldItems}
            />
          </ExampleCard>
          <ExampleCard title="空状态与禁用动作" description="没有可选对象时，保留面板结构，让用户明确当前集合为空。">
            <Transfer
              sourceTitle="可选数据集"
              targetTitle="已选数据集"
              emptyText="暂无可配置数据"
              items={[]}
            />
            <p className="mt-3 text-xs leading-5 text-[var(--text-tertiary)]">未选中任何项时，移动按钮保持禁用，避免误触和无效操作。</p>
          </ExampleCard>
          <ExampleCard title="整体禁用" description="流程未到达或角色权限不足时，保留已选配置但禁止迁移。">
            <Transfer
              disabled
              sourceTitle="可配置权限"
              targetTitle="当前角色权限"
              defaultTargetKeys={["viewer", "download"]}
              items={roleItems}
            />
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Guidelines" title="最佳实践" />
        <SpecList
          items={[
            "穿梭框只用于集合迁移，不用于普通多选；少量选项优先用 CheckboxGroup。",
            "列表项必须提供上下文，例如字段说明、权限影响或数据集来源。",
            "权限、字段、数据集配置场景必须支持 disabled 项和 empty 状态。",
            "选项较多时开启 showSearch；选项超过 100 条时应考虑表格选择器或弹窗选择器。",
            "整体禁用用于流程未到达或角色权限不足，不能只隐藏组件。",
          ]}
        />
      </section>
    </div>
  );
}
