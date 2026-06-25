import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import { Select } from "../../../components/ui/Select";

const materialOptions = [
  { label: "金属材料", value: "metal" },
  { label: "高分子材料", value: "polymer" },
  { label: "无机非金属", value: "ceramic" },
];

export default function SelectPage() {
  return (
    <div className="space-y-16">
      <PageHeader title="选择器" description="选择器用于从固定枚举中选择单一值，适合状态、类型、分类和筛选条件。当前稳定合同仅覆盖原生单选；搜索、多选标签和远程加载属于后续复合选择器能力。" />

      <section>
        <SectionHeading eyebrow="Scope" title="使用边界" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {[
            ["Select", "固定枚举、单选、选项数量适中", "材料类型、审批节点、权限范围"],
            ["Radio", "2–5 个选项且需要直接比较", "是否公开、审核结论"],
            ["复合选择器", "搜索、远程数据、多选标签", "人员选择、材料牌号检索"],
          ].map(([title, usage, example]) => (
            <div key={title} className="rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-5">
              <h3 className="text-base font-semibold text-[var(--text-primary)]">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{usage}</p>
              <p className="mt-3 text-xs leading-[var(--type-caption-line-height)] text-[var(--text-tertiary)]">{example}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Variants" title="选择器类型" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <ExampleCard title="基础选择">
            <div className="space-y-4">
              <Select label="材料类型" placeholder="请选择材料类型" options={materialOptions} required />
              <Select label="数据状态" defaultValue="review" options={[{ label: "待审核", value: "review" }, { label: "已发布", value: "published" }]} />
            </div>
          </ExampleCard>
          <ExampleCard title="状态选择">
            <div className="space-y-4">
              <Select label="错误状态" placeholder="请选择" options={materialOptions} error="请选择材料类型" />
              <Select label="禁用状态" options={materialOptions} defaultValue="metal" disabled />
            </div>
          </ExampleCard>
          <ExampleCard title="后台枚举">
            <div className="space-y-4">
              <Select label="数据权限" defaultValue="team" options={[{ label: "仅自己可见", value: "private" }, { label: "团队可见", value: "team" }, { label: "公开流通", value: "public" }]} />
              <Select label="加载状态" placeholder="正在加载枚举" loading options={[]} />
              <Select label="不可选项" defaultValue="active" options={[{ label: "启用", value: "active" }, { label: "停用", value: "inactive" }, { label: "已归档（不可选）", value: "archived", disabled: true }]} />
            </div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Sizes" title="选择器尺寸" />
        <ExampleCard title="Small / Medium / Large">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <Select size="sm" label="Small - 28px" options={materialOptions} defaultValue="metal" />
              <p className="mt-2 text-xs leading-5 text-[var(--text-tertiary)]">用于表格筛选、行内编辑、紧凑工具栏。</p>
            </div>
            <div>
              <Select size="md" label="Medium - 32px" options={materialOptions} defaultValue="polymer" />
              <p className="mt-2 text-xs leading-5 text-[var(--text-tertiary)]">后台表单默认尺寸，字号 14px。</p>
            </div>
            <div>
              <Select size="lg" label="Large - 36px" options={materialOptions} defaultValue="ceramic" />
              <p className="mt-2 text-xs leading-5 text-[var(--text-tertiary)]">用于官网线索表单和低密度弹窗。</p>
            </div>
          </div>
        </ExampleCard>
      </section>

      <section>
        <SectionHeading
          eyebrow="Label Rules"
          title="名称与布局"
          description="选择器与输入框采用同一套 label 规则。正式录入字段必须有名称；筛选工具栏可以省略名称，用 placeholder 承担提示。"
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="上下结构">
            <div className="max-w-[360px] space-y-4">
              <Select label="材料类型" placeholder="请选择材料类型" options={materialOptions} />
              <Select label="数据状态" defaultValue="review" options={[{ label: "待审核", value: "review" }, { label: "已发布", value: "published" }]} />
            </div>
          </ExampleCard>
          <ExampleCard title="左右结构">
            <div className="max-w-[640px] space-y-4">
              <Select labelPosition="left" labelWidth={112} label="材料类型" placeholder="请选择材料类型" options={materialOptions} />
              <Select labelPosition="left" labelWidth={112} label="审批节点" defaultValue="owner" options={[{ label: "数据负责人", value: "owner" }, { label: "空间管理员", value: "admin" }]} />
              <Select labelPosition="left" labelWidth={112} label="流通方式" defaultValue="contract" options={[{ label: "合约授权", value: "contract" }, { label: "人工审批", value: "audit" }]} />
            </div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Backend States" title="后台筛选与权限状态" description="选择器在 B 端页面中经常承担状态筛选、权限配置、数据分类和批量操作条件，不同状态需要被明确区分。" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="表格筛选组合">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <Select size="sm" placeholder="数据状态" options={[{ label: "全部状态", value: "all" }, { label: "待审核", value: "review" }, { label: "已发布", value: "published" }]} />
              <Select size="sm" placeholder="数据来源" options={[{ label: "全部来源", value: "all" }, { label: "企业上传", value: "company" }, { label: "实验采集", value: "lab" }]} />
              <Select size="sm" placeholder="权限范围" options={[{ label: "全部权限", value: "all" }, { label: "团队可见", value: "team" }, { label: "公开流通", value: "public" }]} />
            </div>
            <p className="mt-4 text-xs leading-5 text-[var(--text-tertiary)]">筛选项数量多时应分组折叠，避免把主表格向下挤压。</p>
          </ExampleCard>
          <ExampleCard title="权限配置">
            <div className="space-y-3">
              <Select label="可见范围" defaultValue="team" options={[{ label: "仅自己", value: "private" }, { label: "所在团队", value: "team" }, { label: "全组织", value: "org" }]} />
              <Select label="审批节点" defaultValue="owner" options={[{ label: "数据负责人", value: "owner" }, { label: "空间管理员", value: "admin" }, { label: "外部访客（不可选）", value: "guest", disabled: true }]} />
            </div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Interaction" title="键盘与响应式" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="键盘操作">
            <div className="space-y-3 text-sm leading-6 text-[var(--text-secondary)]">
              <p><strong className="text-[var(--text-primary)]">Tab：</strong>进入或离开选择器。</p>
              <p><strong className="text-[var(--text-primary)]">Space / Enter：</strong>打开原生选项列表。</p>
              <p><strong className="text-[var(--text-primary)]">方向键：</strong>移动当前选项；Esc 关闭列表。</p>
              <p>错误说明通过 aria-describedby 与控件关联，加载时使用 aria-busy。</p>
            </div>
          </ExampleCard>
          <ExampleCard title="移动端回退">
            <div className="max-w-[360px]">
              <Select labelPosition="left" labelWidth={112} label="材料类型" placeholder="请选择材料类型" options={materialOptions} />
              <p className="mt-3 text-xs leading-[var(--type-caption-line-height)] text-[var(--text-tertiary)]">桌面为左右结构；小于 640px 自动回退为上下结构，控件触控高度至少 44px。</p>
            </div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Do / Don't" title="正确与错误示例" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="rounded-[var(--radius-sm)] border border-[var(--success-border)] bg-white p-5">
            <p className="text-sm font-semibold text-[var(--success-text)]">正确：选项明确且互斥</p>
            <Select className="mt-4" label="数据权限" placeholder="请选择权限范围" options={[{ label: "仅自己可见", value: "private" }, { label: "团队可见", value: "team" }, { label: "公开流通", value: "public" }]} />
          </div>
          <div className="rounded-[var(--radius-sm)] border border-[var(--error-border)] bg-white p-5">
            <p className="text-sm font-semibold text-[var(--error-text)]">错误：用 Select 冒充搜索或多选</p>
            <Select className="mt-4" label="材料牌号" placeholder="请选择" options={[{ label: "数千条牌号无法直接浏览", value: "too-many", disabled: true }]} />
            <p className="mt-3 text-xs leading-[var(--type-caption-line-height)] text-[var(--text-secondary)]">大量远程选项应使用可搜索的复合选择器。</p>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Dropdown" title="下拉面板与长选项" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="rounded-sm border border-[var(--neutral-200)] bg-white p-6">
            <h3 className="mb-3 text-sm font-semibold text-[var(--text-primary)]">面板样式</h3>
            <p className="mb-3 text-sm leading-6 text-[var(--text-tertiary)]">
              下拉面板宽度与选择器同宽。选项高度 36px，hover 态使用 neutral-50 背景。
              选项过多时面板最大高度 240px，超出滚动。
            </p>
            <div className="max-w-[320px]">
              <Select label="展开态示例" defaultValue="metal" options={materialOptions} />
              <div className="mt-1 overflow-hidden rounded-sm border border-[var(--neutral-200)] bg-white shadow-[0_8px_20px_rgba(26,29,33,0.08)]">
                {[
                  ["metal", "金属材料", "已选中"],
                  ["polymer", "高分子材料", "Hover"],
                  ["ceramic", "无机非金属", ""],
                  ["archived", "已归档分类", "禁用"],
                ].map(([value, label, state]) => (
                  <div
                    key={value}
                    className={[
                      "flex h-9 items-center justify-between px-3 text-sm",
                      state === "已选中" ? "bg-[var(--product-blue-50)] text-[var(--product-blue-700)]" : "",
                      state === "Hover" ? "bg-[var(--neutral-50)] text-[var(--text-primary)]" : "",
                      state === "禁用" ? "cursor-not-allowed text-[var(--neutral-400)]" : "text-[var(--text-secondary)]",
                    ].join(" ")}
                  >
                    <span>{label}</span>
                    {state ? <span className="text-xs text-[var(--neutral-400)]">{state}</span> : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="rounded-sm border border-[var(--neutral-200)] bg-white p-6">
            <h3 className="mb-3 text-sm font-semibold text-[var(--text-primary)]">长选项处理</h3>
            <p className="mb-3 text-sm leading-6 text-[var(--text-tertiary)]">
              选项文案建议 ≤ 12 汉字。超长文本使用省略号截断，悬停显示完整内容。
            </p>
            <div className="truncate rounded-sm bg-[var(--neutral-50)] p-3 text-xs text-[var(--text-secondary)]" title="新材料可信数据空间基础服务平台">
              新材料可信数据空间基础服务平台
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Guidelines" title="最佳实践" />
        <SpecList
          items={[
            "选项数量较少且语义固定时使用选择器，开放输入不要强行做成选择器。",
            "默认选项必须可解释，避免用不明确的“全部”覆盖实际状态。",
            "表格筛选区域优先使用 Small 或 Medium，减少工具栏高度。",
            "Small / Medium / Large 高度分别为 28px / 32px / 36px，选择文本统一 14px、常规字重。",
            "正式录入字段使用 label；筛选工具栏可省略 label，但 placeholder 必须说明筛选维度。",
            "宽表单可使用左右结构，label 推荐 96px–120px 宽，与输入框保持一致。",
            "错误状态需要搭配文字说明，保证状态可理解。",
            "后台权限、状态、分类等枚举需要有禁用项和加载态，避免用户误以为系统无响应。",
            "当前 Select 稳定合同只覆盖单选；搜索、远程加载和多选标签不得以静态示例冒充已实现能力。",
          ]}
        />
      </section>
    </div>
  );
}
