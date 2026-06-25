import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import { Input } from "../../../components/ui/Input";
import { Tag } from "../../../components/ui/Tag";
import { Tree } from "../../../components/ui/Tree";

const materialNodes = [
  {
    key: "materials",
    label: "材料分类",
    children: [
      { key: "metal", label: "金属材料", children: [{ key: "titanium", label: "钛合金" }, { key: "aluminum", label: "铝合金" }] },
      { key: "polymer", label: "高分子材料" },
      { key: "ceramic", label: "无机非金属" },
    ],
  },
  {
    key: "datasets",
    label: "数据资产",
    children: [
      { key: "standard", label: "标准数据集" },
      { key: "experiment", label: "实验批次" },
      { key: "model", label: "模型结果" },
    ],
  },
];

const permissionNodes = [
  {
    key: "org",
    label: "组织权限",
    children: [
      { key: "admin", label: "管理员" },
      { key: "operator", label: "数据运营" },
      { key: "guest", label: "外部访客", disabled: true },
    ],
  },
  {
    key: "audit",
    label: "审计范围",
    children: [{ key: "log", label: "操作日志" }, { key: "contract", label: "合约记录" }],
  },
];

export default function TreePage() {
  return (
    <div className="space-y-16">
      <PageHeader title="树" description="树组件用于展示目录、组织、权限、材料分类和数据资产层级关系，帮助用户定位复杂结构。" />

      <section>
        <SectionHeading eyebrow="Variants" title="层级结构" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="材料目录树">
            <Tree nodes={materialNodes} defaultExpandedKeys={["materials", "metal"]} defaultSelectedKey="titanium" />
          </ExampleCard>
          <ExampleCard title="权限树">
            <Tree
              checkable
              nodes={permissionNodes}
              defaultExpandedKeys={["org"]}
              defaultSelectedKey="operator"
              defaultCheckedKeys={["operator", "log"]}
            />
            <p className="mt-4 text-xs leading-5 text-[var(--text-tertiary)]">禁用节点表示当前角色不可选或无授权。</p>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Backend States" title="后台常见组合" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="带搜索的目录树">
            <div className="space-y-3">
              <Input size="sm" placeholder="搜索材料分类或数据集" />
              <Tree nodes={materialNodes} defaultExpandedKeys={["materials"]} />
            </div>
          </ExampleCard>
          <ExampleCard title="树节点说明">
            <div className="space-y-3 text-sm text-[var(--text-secondary)]">
              <div className="flex items-center justify-between rounded-sm bg-[var(--neutral-50)] px-3 py-2">
                <span>当前选中</span>
                <Tag variant="product" size="sm">产品蓝浅背景</Tag>
              </div>
              <div className="flex items-center justify-between rounded-sm bg-[var(--neutral-50)] px-3 py-2">
                <span>不可选择</span>
                <Tag variant="neutral" size="sm">禁用灰</Tag>
              </div>
              <div className="flex items-center justify-between rounded-sm bg-[var(--neutral-50)] px-3 py-2">
                <span>存在子级</span>
                <Tag variant="neutral" size="sm">展开箭头</Tag>
              </div>
              <div className="flex items-center justify-between rounded-sm bg-[var(--neutral-50)] px-3 py-2">
                <span>权限勾选</span>
                <Tag variant="neutral" size="sm">checkable</Tag>
              </div>
            </div>
          </ExampleCard>
          <ExampleCard title="加载与空状态" description="目录数据来自接口时，需要保留容器高度，避免页面跳动。">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Tree nodes={[]} loading className="w-full" />
              <Tree nodes={[]} emptyText="暂无目录数据" className="w-full" />
            </div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Guidelines" title="最佳实践" />
        <SpecList
          items={[
            "层级超过 4 级时应提供搜索或筛选，避免用户逐层展开。",
            "当前选中项使用产品蓝浅背景，避免和侧栏主导航混淆。",
            "禁用节点需要说明无权限、不可选或流程条件未满足的原因。",
            "权限树可开启 checkable，目录树默认只做选中与展开。",
            "异步加载必须提供 loading 和 empty，避免用户误判权限为空。",
            "树适合目录和权限，不适合承载大量横向字段。",
          ]}
        />
      </section>
    </div>
  );
}
