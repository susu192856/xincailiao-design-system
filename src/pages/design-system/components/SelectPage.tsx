import { Link } from "react-router-dom";
import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import DocsTable from "../../../components/docs/DocsTable";
import { Select } from "../../../components/ui/Select";
import { DatePicker } from "../../../components/ui/DatePicker";

const materialOptions = [
  { label: "金属材料", value: "metal" },
  { label: "高分子材料", value: "polymer" },
  { label: "无机非金属", value: "ceramic" },
];

const searchableOptions = [
  { label: "TC4 钛合金", value: "tc4" },
  { label: "TA15 钛合金", value: "ta15" },
  { label: "GH4169 高温合金", value: "gh4169" },
  { label: "7075 铝合金", value: "7075" },
];

const anatomyRows = [
  ["字段容器", "组织标签、触发器、下拉面板和辅助信息；正式字段必须保持完整语义。"],
  ["触发器", "显示占位、当前值或已选数量；高度、边框与 Input 使用同一套 Token。"],
  ["展开图标", "使用 16px / Regular 的 CaretDown，仅提示可展开，不承担字段名称。"],
  ["选项面板", "基础单选使用系统原生面板；可搜索和多选使用自定义面板，宽度与触发器一致、最大高度 240px。"],
  ["选项状态", "支持默认、悬停、选中、聚焦和禁用；不能只依赖颜色表达。"],
  ["辅助与错误", "使用 12px Regular；错误同时提供边框和具体修正信息。"],
];

const selectProps = [
  ["options", "SelectOption[]", "—", "固定选项列表；每项包含 label、value，可选 disabled。"],
  ["value / defaultValue", "string | string[]", "—", "单选使用 string，多选使用 string[]。"],
  ["searchable", "boolean", "false", "启用选项内搜索，适合中等规模本地数据。"],
  ["multiple", "boolean", "false", "启用多选与标签移除；选项仍应保持可管理规模。"],
  ["loading", "boolean", "false", "锁定触发器并显示加载状态。"],
  ["labelPosition", "top | left", "top", "主编辑区可用 left；窄容器自动回到上下结构。"],
  ["size", "sm | md | lg", "md", "桌面高度 28 / 32 / 36px，移动端至少 44px。"],
  ["error / helperText", "string", "—", "错误或帮助信息通过 aria-describedby 与控件关联。"],
];

export default function SelectPage() {
  return (
    <div className="space-y-16">
      <PageHeader title="选择器" description="选择器用于从固定枚举或受约束范围中选择值，涵盖单选、多选、可搜索选择与日期选择。先判断选项规模和比较方式，再统一应用标签、宽度、状态和可访问性规则。" note={<>关联页面：选择器与 <Link to="/components/input" className="font-medium text-[var(--product-blue-500)]">输入框</Link> 共用字段结构，由 <Link to="/components/form" className="font-medium text-[var(--product-blue-500)]">表单</Link> 组织提交，提交后的选中结果由 <Link to="/components/description-list" className="font-medium text-[var(--product-blue-500)]">详情与描述列表</Link> 只读呈现。</>} />

      <section>
        <SectionHeading eyebrow="Anatomy" title="选择器结构" description="选择器不是带箭头的输入框；触发器、选项面板、选中状态和反馈信息共同构成完整组件。" />
        <ExampleCard title="构成样式">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Select labelPosition="left" labelWidth={88} label="材料类型" placeholder="请选择材料类型" options={materialOptions} required helperText="固定枚举使用基础单选。" />
            <Select labelPosition="left" labelWidth={88} label="材料牌号" placeholder="搜索并选择牌号" searchable options={searchableOptions} helperText="选项较多但仍为本地数据时启用搜索。" />
          </div>
          <div className="mt-6 border-t border-[var(--neutral-200)] pt-6">
            <DocsTable>
              <thead className="bg-[var(--neutral-50)]"><tr><th className="px-6 py-3 font-semibold">构成</th><th className="px-6 py-3 font-semibold">视觉与使用规则</th></tr></thead>
              <tbody className="divide-y divide-[var(--neutral-100)]">{anatomyRows.map(([name, rule]) => <tr key={name}><td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-[var(--text-primary)]">{name}</td><td className="px-6 py-4 text-sm leading-6 text-[var(--text-secondary)]">{rule}</td></tr>)}</tbody>
            </DocsTable>
          </div>
        </ExampleCard>
      </section>

      <section>
        <SectionHeading eyebrow="Variants" title="选择器类型" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="基础选择">
            <div className="space-y-4">
              <Select labelPosition="left" labelWidth={88} label="材料类型" placeholder="请选择材料类型" options={materialOptions} required />
              <Select labelPosition="left" labelWidth={88} label="数据状态" defaultValue="review" options={[{ label: "待审核", value: "review" }, { label: "已发布", value: "published" }]} />
            </div>
          </ExampleCard>
          <ExampleCard title="可搜索选择">
            <div className="space-y-4">
              <Select labelPosition="left" labelWidth={88} label="材料牌号" placeholder="输入牌号关键词" searchable options={searchableOptions} helperText="打开后在面板顶部搜索，不允许自由录入。" />
              <Select labelPosition="left" labelWidth={88} label="数据标签" placeholder="请选择标签" multiple options={[{ label: "高温", value: "heat" }, { label: "疲劳", value: "fatigue" }, { label: "航空", value: "aviation" }]} helperText="多选结果使用标签展示，并允许逐项移除。" />
            </div>
          </ExampleCard>
          <ExampleCard title="状态与加载">
            <div className="space-y-4">
              <Select labelPosition="left" labelWidth={88} label="错误状态" placeholder="请选择" options={materialOptions} error="请选择材料类型" />
              <Select labelPosition="left" labelWidth={88} label="加载状态" placeholder="正在加载枚举" loading options={[]} />
              <Select labelPosition="left" labelWidth={88} label="禁用状态" options={materialOptions} defaultValue="metal" disabled helperText="在上下文中说明不可操作原因。" />
            </div>
          </ExampleCard>
          <ExampleCard title="后台枚举">
            <div className="space-y-4">
              <Select labelPosition="left" labelWidth={88} label="数据权限" defaultValue="team" options={[{ label: "仅自己可见", value: "private" }, { label: "团队可见", value: "team" }, { label: "公开流通", value: "public" }]} />
              <Select labelPosition="left" labelWidth={88} label="不可选项" defaultValue="active" options={[{ label: "启用", value: "active" }, { label: "停用", value: "inactive" }, { label: "已归档（不可选）", value: "archived", disabled: true }]} helperText="保留不可选项有助于解释历史状态。" />
            </div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Sizes" title="尺寸与宽度" description="尺寸控制高度，宽度由字段内容和容器角色决定；不得随通栏卡片无限拉伸。" />
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
        <div className="mt-5 border-l-2 border-[var(--success-solid)] bg-white p-5 shadow-[var(--shadow-xs)]">
          <h3 className="text-base font-semibold text-[var(--text-primary)]">字段宽度规则</h3>
          <div className="mt-4 grid grid-cols-1 gap-4 text-sm leading-6 text-[var(--text-secondary)] md:grid-cols-3">
            <div className="bg-[var(--neutral-50)] p-4"><strong className="block text-[var(--text-primary)]">常规选择 · 240–360px</strong>单个表单枚举根据选项长度确定宽度。</div>
            <div className="bg-[var(--neutral-50)] p-4"><strong className="block text-[var(--text-primary)]">紧凑筛选 · 160–240px</strong>多条件筛选优先每行 3 个并保留标签。</div>
            <div className="bg-[var(--neutral-50)] p-4"><strong className="block text-[var(--text-primary)]">长选项 · 最大 480px</strong>超出后截断并提供完整内容提示，不继续拉长控件。</div>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Label Rules"
          title="名称与布局"
          description="选择器与输入框采用同一套 label 规则。正式录入和多条件筛选必须保留可见名称；只有语义明确的独立全局搜索可以省略标签。"
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="上下标签 · 局部场景">
            <div className="max-w-[360px] space-y-4">
              <Select label="材料类型" placeholder="请选择材料类型" options={materialOptions} />
              <Select label="数据状态" defaultValue="review" options={[{ label: "待审核", value: "review" }, { label: "已发布", value: "published" }]} />
            </div>
          </ExampleCard>
          <ExampleCard title="左右标签 · 项目配置">
            <div className="max-w-[448px] space-y-4">
              <Select labelPosition="left" labelWidth={88} label="材料类型" placeholder="请选择材料类型" options={materialOptions} />
              <Select labelPosition="left" labelWidth={88} label="审批节点" defaultValue="owner" options={[{ label: "数据负责人", value: "owner" }, { label: "空间管理员", value: "admin" }]} />
              <Select labelPosition="left" labelWidth={88} label="流通方式" defaultValue="contract" options={[{ label: "合约授权", value: "contract" }, { label: "人工审批", value: "audit" }]} />
            </div>
          </ExampleCard>
        </div>
        <div className="mt-5 rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-5">
          <h3 className="text-sm font-semibold text-[var(--text-primary)]">标签结构规则</h3>
          <div className="mt-4"><SpecList items={["主编辑区默认左右标签，统一使用 88px 标签宽度；长标签按组扩展到 96–120px。", "弹窗、移动端、窄卡片和独立重点字段使用上下标签。", "同一 FormSection 内的同级字段保持同一种标签结构，不逐项混用。", "必填标记在上下标签中后置，在左右标签中前置。"]} /></div>
        </div>
      </section>

      <section id="date-picker" className="scroll-mt-6">
        <SectionHeading eyebrow="Date Picker" title="日期选择" description="用于选择单个日期，支持清除、最小/最大日期限制，适用于表单和筛选场景。" />
        <div className="space-y-5">
          <ExampleCard title="日期选择尺寸">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <DatePicker size="sm" label="Small · 28px" placeholder="选择日期" />
              <DatePicker size="md" label="Medium · 32px" placeholder="选择日期" />
              <DatePicker size="lg" label="Large · 36px" placeholder="选择日期" />
            </div>
          </ExampleCard>
          <ExampleCard title="常见状态">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <DatePicker className="max-w-[448px]" labelPosition="left" labelWidth={88} label="发布日期" placeholder="请选择日期" />
              <DatePicker className="max-w-[448px]" labelPosition="left" labelWidth={88} label="已选日期" defaultValue="2026-06-24" />
              <DatePicker className="max-w-[448px]" labelPosition="left" labelWidth={88} label="禁用日期" disabled placeholder="不可选" />
              <DatePicker className="max-w-[448px]" labelPosition="left" labelWidth={88} label="有效期至" error="请选择有效日期" />
              <DatePicker className="max-w-[448px]" labelPosition="left" labelWidth={88} label="区间限制" helperText="仅可选取 2026-06-01 至 2026-12-31" min="2026-06-01" max="2026-12-31" />
            </div>
          </ExampleCard>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <ExampleCard title="筛选日期范围">
              <div className="grid max-w-[448px] grid-cols-1 gap-3">
                <DatePicker size="sm" labelPosition="left" labelWidth={88} label="开始日期" />
                <DatePicker size="sm" labelPosition="left" labelWidth={88} label="结束日期" />
              </div>
            </ExampleCard>
            <ExampleCard title="详情页只读替代">
              <span className="text-sm text-[var(--text-tertiary)]">生效日期</span>
              <p className="mt-1 text-sm text-[var(--text-body)]">2026-06-24</p>
            </ExampleCard>
          </div>
          <div className="border-l-2 border-[var(--neutral-900)] bg-white p-5 shadow-[var(--shadow-xs)]">
            <h3 className="text-base font-semibold text-[var(--text-primary)]">日期选择规则</h3>
            <div className="mt-4"><SpecList items={["日期选择用于精确到天的日期录入，不承担时间或复杂日期范围选择。", "表单和多条件筛选均保留可见标签，placeholder 不替代字段名称。", "通过 min / max 限制可选范围，避免用户选择无效日期。", "非必填日期允许清除；移动端使用系统原生日期选择器。"]} /></div>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Interaction" title="键盘、焦点与响应式" description="原生单选与搜索/多选使用不同交互实现，但必须提供一致的焦点反馈和可访问名称。" />
        <div className="overflow-hidden rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white">
          <div className="grid grid-cols-1 divide-y divide-[var(--neutral-200)] md:grid-cols-2 md:divide-x md:divide-y-0">
            <div className="p-5">
              <h3 className="text-base font-semibold text-[var(--text-primary)]">键盘操作</h3>
              <div className="mt-4 space-y-3 text-sm leading-6 text-[var(--text-secondary)]">
                <p><strong className="text-[var(--text-primary)]">Tab：</strong>进入或离开选择器。</p>
                <p><strong className="text-[var(--text-primary)]">Space / Enter：</strong>打开选项面板；搜索模式自动聚焦搜索框。</p>
                <p><strong className="text-[var(--text-primary)]">方向键：</strong>移动当前选项；Enter 选择；Esc 关闭面板。</p>
                <p><strong className="text-[var(--text-primary)]">状态关联：</strong>错误使用 aria-invalid，说明使用 aria-describedby，加载使用 aria-busy。</p>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-base font-semibold text-[var(--text-primary)]">移动端回退</h3>
              <div className="mt-4 max-w-[448px]">
                <Select labelPosition="left" labelWidth={88} label="材料类型" placeholder="请选择材料类型" options={materialOptions} />
                <p className="mt-3 text-xs leading-[var(--type-caption-line-height)] text-[var(--text-tertiary)]">桌面为左右结构；小于 640px 自动回退为上下结构，控件触控高度至少 44px。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Do / Don't" title="正确与错误示例" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="flex overflow-hidden rounded-[var(--radius-sm)]">
            <div className="flex min-w-0 flex-1 flex-col">
              <ExampleCard className="h-full flex-1" title="正确：选项明确且互斥">
                <div className="mt-4">
                  <Select labelPosition="left" labelWidth={120} label="数据权限" placeholder="请选择权限范围" options={[{ label: "仅自己可见", value: "private" }, { label: "团队可见", value: "team" }, { label: "公开流通", value: "public" }]} />
                </div>
              </ExampleCard>
              <div className="h-0.5 w-full shrink-0 bg-[var(--success-solid)]" />
            </div>
          </div>
          <div className="flex overflow-hidden rounded-[var(--radius-sm)]">
            <div className="flex min-w-0 flex-1 flex-col">
              <ExampleCard className="h-full flex-1" title="错误：把开放输入当作固定枚举">
                <div className="mt-4">
                  <Select labelPosition="left" labelWidth={120} label="自定义材料名称" placeholder="请选择" options={[{ label: "用户实际需要录入新名称", value: "wrong", disabled: true }]} />
                  <p className="mt-3 text-xs leading-[var(--type-caption-line-height)] text-[var(--text-secondary)]">允许创建新值时应使用 Input；海量远程实体则使用带请求状态的复合选择器。</p>
                </div>
              </ExampleCard>
              <div className="h-0.5 w-full shrink-0 bg-[var(--error-solid)]" />
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
            "正式录入和多条件筛选使用可见 label；placeholder 只承担格式或动作提示。",
            "宽表单使用左右结构，label 默认 88px；同组长标签统一扩展到 96–120px。",
            "错误状态需要搭配文字说明，保证状态可理解。",
            "后台权限、状态、分类等枚举需要有禁用项和加载态，避免用户误以为系统无响应。",
            "searchable 用于中等规模本地选项；真正的远程搜索需要业务层处理请求、分页、空态和失败重试。",
            "multiple 仅用于选项规模可控的多选；大量标签或复杂实体选择应使用独立复合选择器。",
            "基础单选使用系统原生面板；可搜索和多选使用自定义面板，最大高度 240px，超出后滚动。",
            "选项文案建议不超过 12 个汉字；超长内容截断显示，并提供完整内容提示。",
          ]}
        />
      </section>

      <section>
        <SectionHeading eyebrow="API" title="属性与实现边界" description="页面示例只使用组件已实现的能力；远程数据、权限过滤和提交逻辑由业务层管理。" />
        <DocsTable>
          <thead className="bg-[var(--neutral-50)]"><tr><th className="px-6 py-3 font-semibold">属性</th><th className="px-6 py-3 font-semibold">类型</th><th className="px-6 py-3 font-semibold">默认值</th><th className="px-6 py-3 font-semibold">说明</th></tr></thead>
          <tbody className="divide-y divide-[var(--neutral-100)]">{selectProps.map(([name, type, value, desc]) => <tr key={name}><td className="px-6 py-4 text-sm font-normal text-[var(--text-primary)]">{name}</td><td className="px-6 py-4 text-sm text-[var(--text-secondary)]">{type}</td><td className="px-6 py-4 text-sm text-[var(--text-secondary)]">{value}</td><td className="px-6 py-4 text-sm leading-6 text-[var(--text-secondary)]">{desc}</td></tr>)}</tbody>
        </DocsTable>
      </section>
    </div>
  );
}
