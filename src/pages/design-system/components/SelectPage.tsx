import { Link } from "react-router-dom";
import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionCard, SectionHeading } from "../../../components/docs/ComponentDoc";
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

const tagOptions = [
  { label: "高温", value: "heat" },
  { label: "疲劳", value: "fatigue" },
  { label: "航空", value: "aviation" },
  { label: "耐腐蚀", value: "corrosion" },
  { label: "轻量化", value: "lightweight" },
  { label: "高强度", value: "strength" },
  { label: "可焊接", value: "weldable" },
];

const anatomyRows = [
  ["必填标识", "使用红色 * 表示必选；左右标签时放在标签文字前，上下标签时放在标签文字后。"],
  ["标签文字", "说明选择对象，不由选项值或占位文字替代；左右结构固定宽度并右对齐。"],
  ["触发器", "承载当前选择结果并控制面板开合；与 Input 共用高度、边框和状态 Token。"],
  ["当前值 / 占位", "有结果时显示选中值或已选数量，无结果时使用 neutral-400 的动作提示。"],
  ["展开图标", "使用 16px / Regular 的 CaretDown，仅表达可展开；面板打开时方向翻转。"],
  ["辅助或错误文字", "使用 12px Regular；错误需同时显示错误边框和具体修正信息。"],
];

const anatomyMarkerClass = "absolute z-10 hidden h-5 w-5 items-center justify-center rounded-full border border-[var(--product-blue-500)] bg-[var(--product-blue-500)] font-data text-[10px] font-medium text-white shadow-sm sm:flex";

const selectProps = [
  ["options", "SelectOption[]", "—", "固定选项列表；每项包含 label、value，可选 disabled。"],
  ["value / defaultValue", "string | string[]", "—", "单选使用 string，多选使用 string[]。"],
  ["searchable", "boolean", "false", "启用选项内搜索，适合中等规模本地数据。"],
  ["multiple", "boolean", "false", "启用多选与标签移除。"],
  ["loading", "boolean", "false", "锁定触发器并显示加载状态。"],
  ["labelPosition", "top | left", "top", "主编辑区可用 left；窄容器自动回到上下结构。"],
  ["size", "sm | md | lg", "md", "桌面高度 28 / 32 / 36px，移动端至少 44px。"],
  ["error / helperText", "string", "—", "错误或帮助信息通过 aria-describedby 与控件关联。"],
];

function DateFieldPreview({ range = false }: { range?: boolean }) {
  return (
    <div className="flex h-8 items-center rounded-[var(--radius-sm)] border border-[var(--field-border-default)] bg-white px-3 text-sm text-[var(--text-primary)]">
      {range ? <><span>2026-07-01</span><span className="mx-3 text-[var(--text-tertiary)]">→</span><span>2026-07-31</span></> : <span>2026-07-02</span>}
    </div>
  );
}

function CalendarPanelPreview({ range = false }: { range?: boolean }) {
  const days = ["30", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"];
  return (
    <div className="mt-1 rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-3 shadow-[var(--shadow-lg)]">
      <div className="mb-3 flex items-center justify-between text-sm font-medium text-[var(--text-primary)]"><span>‹</span><span>2026 年 7 月</span><span>›</span></div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-[var(--text-tertiary)]">{["一","二","三","四","五","六","日"].map((day) => <span key={day}>{day}</span>)}</div>
      <div className="mt-1 grid grid-cols-7 gap-1 text-center text-xs">{days.map((day) => <span key={day} className={range && ["1","2","3","4","5","6","7"].includes(day) ? "bg-[var(--product-blue-50)] py-1 text-[var(--product-blue-600)]" : day === "2" ? "bg-[var(--neutral-900)] py-1 text-white" : "py-1 text-[var(--text-secondary)]"}>{day}</span>)}</div>
    </div>
  );
}

export default function SelectPage() {
  return (
    <div className="space-y-16">
      <PageHeader
        title="选择器"
        description="选择器用于从固定范围中选择值，覆盖常规选择、多选和日期选择。以下内容按构成、尺寸、状态、类型、布局、展开面板和最佳实践组织。"
        note={<>关联页面：选择器与 <Link to="/components/input" className="font-medium text-[var(--product-blue-500)]">输入框</Link> 共用字段结构，由 <Link to="/components/form" className="font-medium text-[var(--product-blue-500)]">表单</Link> 组织提交。</>}
      />

      <section>
        <SectionHeading eyebrow="01 · Anatomy" title="选择器结构" description="标签说明选择对象，触发器展示选择结果并控制选项面板；选择器只接受预设选项，不承担自由文本录入。" />
        <SectionCard className="md:p-6">
          <div className="relative mx-auto max-w-[448px] py-2 sm:pl-6">
            <span aria-hidden="true" className={`${anatomyMarkerClass} left-[28px] -top-2`}>1</span>
            <span aria-hidden="true" className={`${anatomyMarkerClass} left-[68px] -top-2`}>2</span>
            <span aria-hidden="true" className={`${anatomyMarkerClass} left-[116px] top-1`}>3</span>
            <span aria-hidden="true" className={`${anatomyMarkerClass} left-[168px] -top-2`}>4</span>
            <span aria-hidden="true" className={`${anatomyMarkerClass} right-0 top-1`}>5</span>
            <span aria-hidden="true" className={`${anatomyMarkerClass} bottom-0 left-[116px]`}>6</span>
            <Select labelPosition="left" labelWidth={88} label="材料类型" defaultValue="polymer" options={materialOptions} required helperText="固定枚举使用常规单选。" />
          </div>
          <div className="mt-6 grid grid-cols-1 gap-3 border-t border-[var(--neutral-200)] pt-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {anatomyRows.map(([name, rule], index) => (
              <div key={name} className="rounded-[var(--radius-sm)] bg-[var(--neutral-50)] p-4">
                <div className="flex items-start gap-2"><span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[var(--product-blue-500)] bg-[var(--product-blue-500)] font-data text-[10px] font-medium text-white">{index + 1}</span><h3 className="text-sm font-semibold text-[var(--text-primary)]">{name}</h3></div>
                <p className="mt-1.5 text-xs leading-5 text-[var(--text-secondary)]">{rule}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 border-t border-[var(--neutral-200)] pt-5">
            <h4 className="mb-3 text-sm font-semibold text-[var(--text-primary)]">宽度规则</h4>
            <div className="grid grid-cols-1 gap-4 text-sm leading-6 text-[var(--text-secondary)] md:grid-cols-3">
              <div className="bg-[var(--neutral-50)] p-4"><strong className="block text-[var(--text-primary)]">常规选择 · 360px</strong>名称、状态和单值枚举的推荐宽度。</div>
              <div className="bg-[var(--neutral-50)] p-4"><strong className="block text-[var(--text-primary)]">长选项 · 最大 480px</strong>超出后应拆分栅格，不继续拉长触发器。</div>
              <div className="bg-[var(--neutral-50)] p-4"><strong className="block text-[var(--text-primary)]">紧凑筛选 · 160–240px</strong>多条件筛选优先每行 3 个并保留标签。</div>
            </div>
          </div>
        </SectionCard>
      </section>

      <section>
        <SectionHeading eyebrow="02 · Sizes" title="尺寸" description="尺寸控制控件高度，不改变文字层级和状态语义。" />
        <ExampleCard title="Small / Medium / Large">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <Select size="sm" label="Small · 28px" defaultValue="metal" options={materialOptions} helperText="表格筛选、紧凑工具栏。" />
            <Select size="md" label="Medium · 32px" defaultValue="polymer" options={materialOptions} helperText="后台表单默认尺寸。" />
            <Select size="lg" label="Large · 36px" defaultValue="ceramic" options={materialOptions} helperText="低密度表单和弹窗。" />
          </div>
        </ExampleCard>
      </section>

      <section>
        <SectionHeading eyebrow="03 · States" title="状态" description="状态必须通过边框、背景、文字和可操作性共同表达。" />
        <div className="pointer-events-none rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-5">
          <div className="space-y-4">
            {["基础","错误","Hover","禁用","加载"].map((state) => <div key={state} className="grid grid-cols-1 items-start gap-3 border-b border-[var(--neutral-100)] pb-4 md:grid-cols-[88px_minmax(0,360px)]"><span className="pt-1.5 text-sm font-medium text-[var(--text-secondary)]">{state}</span>{state === "错误" ? <Select labelPosition="left" labelWidth={72} label="材料类型" placeholder="请选择" options={materialOptions} error="请选择材料类型" /> : state === "禁用" ? <Select labelPosition="left" labelWidth={72} label="材料类型" defaultValue="metal" options={materialOptions} disabled /> : state === "加载" ? <Select labelPosition="left" labelWidth={72} label="材料类型" placeholder="正在加载" options={[]} loading /> : <Select labelPosition="left" labelWidth={72} label="材料类型" defaultValue={state === "Hover" ? "metal" : undefined} placeholder="请选择" options={materialOptions} className={state === "Hover" ? "!border-[var(--field-border-hover)]" : ""} />}</div>)}
            <div className="grid grid-cols-1 items-start gap-3 md:grid-cols-[88px_minmax(0,360px)]"><span className="pt-1.5 text-sm font-medium text-[var(--text-secondary)]">展开</span><div className="pb-[132px]"><Select labelPosition="left" labelWidth={72} label="材料类型" defaultValue="polymer" options={materialOptions} defaultOpen /></div></div>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="04 · Types" title="类型" description="按值的数量和日期语义选择组件，不用外观相似的控件互相替代。" />
        <div className="pointer-events-none space-y-4 rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-5">
          <div className="grid grid-cols-1 items-start gap-3 border-b border-[var(--neutral-100)] pb-4 md:grid-cols-[88px_minmax(0,360px)]"><span className="pt-1.5 text-sm font-medium text-[var(--text-secondary)]">常规选择</span><Select labelPosition="left" labelWidth={72} label="材料类型" defaultValue="metal" options={materialOptions} /></div>
          <div className="grid grid-cols-1 items-start gap-3 border-b border-[var(--neutral-100)] pb-4 md:grid-cols-[88px_minmax(0,360px)]"><span className="pt-1.5 text-sm font-medium text-[var(--text-secondary)]">多选</span><Select labelPosition="left" labelWidth={72} label="数据标签" multiple defaultValue={["heat","aviation"]} options={tagOptions} /></div>
          <div className="grid grid-cols-1 items-start gap-3 border-b border-[var(--neutral-100)] pb-4 md:grid-cols-[88px_minmax(0,360px)]"><span className="pt-1.5 text-sm font-medium text-[var(--text-secondary)]">单日期</span><div className="grid grid-cols-[72px_1fr] items-center gap-3"><span className="text-right text-sm text-[var(--text-secondary)]">发布日期</span><DateFieldPreview /></div></div>
          <div className="grid grid-cols-1 items-start gap-3 md:grid-cols-[88px_minmax(0,360px)]"><span className="pt-1.5 text-sm font-medium text-[var(--text-secondary)]">起止日期</span><div className="grid grid-cols-[72px_1fr] items-center gap-3"><span className="text-right text-sm text-[var(--text-secondary)]">日期范围</span><DateFieldPreview range /></div></div>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="05 · Layout" title="布局" description="同一字段组保持一种标签布局；桌面主编辑区优先左右布局，窄容器使用上下布局。" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="左右布局"><div className="max-w-[448px] space-y-4"><Select labelPosition="left" labelWidth={88} label="材料类型" placeholder="请选择" options={materialOptions} /><Select labelPosition="left" labelWidth={88} label="数据状态" defaultValue="published" options={[{label:"待审核",value:"review"},{label:"已发布",value:"published"}]} /></div></ExampleCard>
          <ExampleCard title="上下布局"><div className="max-w-[360px] space-y-4"><Select label="材料类型" placeholder="请选择" options={materialOptions} /><DatePicker label="发布日期" defaultValue="2026-07-02" /></div></ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="06 · Panels" title="展开面板样式与选项状态" description="Select 面板直接展开比较；日期选择使用系统原生面板，规范约束其触发器、已选值和起止关系。" />
        <div className="pointer-events-none grid grid-cols-1 gap-5 lg:grid-cols-3">
          <ExampleCard title="默认"><div className="pb-[132px]"><Select label="材料类型" defaultValue="polymer" defaultOpen options={materialOptions} /></div></ExampleCard>
          <ExampleCard title="搜索"><div className="pb-[196px]"><Select label="材料牌号" searchable defaultValue="ta15" defaultOpen options={searchableOptions} /></div></ExampleCard>
          <ExampleCard title="多标签 · 超过 6 行滚动"><div className="pb-[212px]"><Select label="数据标签" multiple defaultValue={["heat", "aviation"]} defaultOpen options={tagOptions} /></div></ExampleCard>
        </div>
        <div className="pointer-events-none mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="单日期"><DateFieldPreview /><CalendarPanelPreview /></ExampleCard>
          <ExampleCard title="起止日期"><DateFieldPreview range /><CalendarPanelPreview range /></ExampleCard>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-3 rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-5 text-sm text-[var(--text-secondary)] md:grid-cols-3">
          <p><strong className="block text-[var(--text-primary)]">宽度</strong>跟随触发器，限制在 180–480px。</p>
          <p><strong className="block text-[var(--text-primary)]">高度</strong>每行至少 32px，最多完整显示 6 行。</p>
          <p><strong className="block text-[var(--text-primary)]">状态</strong>Hover 使用中性灰；选中使用产品蓝浅底与蓝色文字。</p>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Guidelines" title="最佳实践" />
        <div className="grid grid-cols-1 gap-3 rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-5 text-sm leading-6 text-[var(--text-secondary)] md:grid-cols-2">
          {["固定枚举使用选择器；允许创建新值时改用 Input。","默认值必须可解释，不使用含义模糊的“全部”。","搜索用于中等规模本地选项；远程实体需要业务层处理请求、分页和失败状态。","多选仅用于规模可控的标签；大量实体使用独立复合选择器。","面板最多完整显示 6 行，第 7 项起仅选项区滚动。","起止日期使用单一范围控件，在同一面板内完成双日期选择。"].map((rule,index) => <p key={rule}><span className="mr-2 font-data text-xs text-[var(--text-tertiary)]">{String(index+1).padStart(2,"0")}</span>{rule}</p>)}
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="API" title="属性与实现边界" description="远程数据、权限过滤和跨字段日期校验由业务层管理。" />
        <DocsTable>
          <thead className="bg-[var(--neutral-50)]"><tr><th className="px-6 py-3 font-semibold">属性</th><th className="px-6 py-3 font-semibold">类型</th><th className="px-6 py-3 font-semibold">默认值</th><th className="px-6 py-3 font-semibold">说明</th></tr></thead>
          <tbody className="divide-y divide-[var(--neutral-100)]">{selectProps.map(([name,type,value,desc]) => <tr key={name}><td className="px-6 py-4 text-sm text-[var(--text-primary)]">{name}</td><td className="px-6 py-4 text-sm text-[var(--text-secondary)]">{type}</td><td className="px-6 py-4 text-sm text-[var(--text-secondary)]">{value}</td><td className="px-6 py-4 text-sm leading-6 text-[var(--text-secondary)]">{desc}</td></tr>)}</tbody>
        </DocsTable>
      </section>
    </div>
  );
}
