import { useState, type ReactNode } from "react";
import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading } from "../../../components/docs/ComponentDoc";
import { Tabs } from "../../../components/ui/Tabs";

const detailItems = [
  {
    value: "overview",
    label: "概览",
    content: (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[['数据总量', '128 项'], ['待审核', '8 项'], ['异常数据', '3 项']].map(([label, value]) => (
          <div key={label} className="bg-white px-4 py-3">
            <p className="text-xs text-[var(--text-tertiary)]">{label}</p>
            <p className="mt-1 text-sm font-semibold text-[var(--neutral-900)]">{value}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    value: "process",
    label: "工艺参数",
    content: (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="bg-white px-4 py-3 text-sm text-[var(--neutral-900)]">热处理温度：650℃</div>
        <div className="bg-white px-4 py-3 text-sm text-[var(--neutral-900)]">保温时间：4h</div>
      </div>
    ),
  },
  {
    value: "history",
    label: "流转记录（12）",
    content: (
      <div className="space-y-2 bg-white px-4 py-3 text-sm text-[var(--neutral-900)]">
        <p>09:30 数据审核通过</p>
        <p>10:15 已提交发布</p>
      </div>
    ),
  },
];

const statusItems = [
  { value: "all", label: "全部（128）" },
  { value: "pending", label: "待审核（8）" },
  { value: "risk", label: "异常（3）" },
  { value: "archived", label: "已归档（0）" },
];

function RuleGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border border-[var(--neutral-200)] bg-white p-4">
      <h3 className="text-sm font-semibold text-[var(--neutral-900)]">{title}</h3>
      <div className="mt-3 space-y-2 text-sm leading-6 text-[var(--text-secondary)]">{children}</div>
    </div>
  );
}

export default function TabsPage() {
  const [value, setValue] = useState("overview");
  const [scenarioPage, setScenarioPage] = useState("assets");
  const [status, setStatus] = useState("all");
  const [metric, setMetric] = useState("count");
  const [period, setPeriod] = useState("year");

  return (
    <div className="space-y-16">
      <PageHeader title="标签页" description="标签页用于切换同级内容。后台多级使用时必须按影响范围区分一级、二级和三级，不能只靠字号临时区分。" />

      <section>
        <SectionHeading eyebrow="Hierarchy" title="三级层级" description="层级由内容影响范围决定：整页、当前页分组、局部图表。先确定切换范围，再选择视觉样式。" />
        <ExampleCard title="层级样式与使用边界" description="一级不替代顶部主导航；二级不改变页面标题和工具栏；三级只控制当前图表或局部视图。">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-[var(--neutral-900)]">一级 · 整页内容切换</h3>
              <p className="mt-1 text-xs leading-5 text-[var(--text-tertiary)]">16px，用于同一业务页面内的模块切换；同页最多一个，不承担跨产品导航。</p>
              <Tabs value={value} onValueChange={setValue} items={detailItems} variant="page" size="lg" className="mt-3 bg-[var(--neutral-50)]" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[var(--neutral-900)]">二级 · 当前页状态分组</h3>
              <p className="mt-1 text-xs leading-5 text-[var(--text-tertiary)]">14px 短下划线样式，只改变当前模块的数据集合，不改变标题、工具栏和一级标签。</p>
              <Tabs defaultValue="all" className="mt-3" items={statusItems.map((item) => ({ ...item, content: null }))} />
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold text-[var(--neutral-900)]">三级 · 强分段切换</h3>
                <p className="mt-1 text-xs leading-5 text-[var(--text-tertiary)]">28px 高；切换后指标、图形结构或视图模式有明显差异。</p>
                <Tabs defaultValue="count" variant="segment" size="sm" className="mt-3" items={[{ value: "count", label: "数量", content: null }, { value: "capacity", label: "容量", content: null }]} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[var(--neutral-900)]">三级 · 弱文字切换</h3>
                <p className="mt-1 text-xs leading-5 text-[var(--text-tertiary)]">只改变时间粒度、排序或展示口径；当前项为产品蓝，选项之间使用短分隔线。</p>
                <Tabs defaultValue="year" variant="text" size="sm" className="mt-3" items={[{ value: "year", label: "按年", content: null }, { value: "month", label: "按月", content: null }, { value: "week", label: "按周", content: null, disabled: true, disabledReason: "当前数据不支持按周汇总" }]} />
              </div>
            </div>
          </div>
        </ExampleCard>
      </section>

      <section>
        <SectionHeading eyebrow="Scenario" title="后台数据资产场景" description="同屏出现多级标签时，每一级必须控制不同范围；切换一级后，二级筛选与三级图表偏好默认保留。" />
        <ExampleCard title="数据资产运营看板" description={`当前状态保持：状态分组=${statusItems.find((item) => item.value === status)?.label}，指标=${metric === 'count' ? '数量' : '容量'}，粒度=${period === 'year' ? '按年' : '按月'}。`}>
          <div className="bg-[var(--neutral-50)] p-5">
            <div className="bg-[var(--neutral-100)]">
              <Tabs
                value={scenarioPage}
                onValueChange={setScenarioPage}
                variant="page"
                size="lg"
                items={[
                  { value: "assets", label: "数据资产", content: null },
                  { value: "governance", label: "治理任务", content: null },
                  { value: "records", label: "流转记录（12）", content: null },
                ]}
              />
              <div className="bg-white p-5">
                {scenarioPage === "assets" ? (
                  <>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="text-base font-semibold text-[var(--neutral-900)]">材料数据资产</h3>
                      <p className="text-xs text-[var(--text-tertiary)]">一级切换后保留当前筛选</p>
                    </div>
                    <Tabs
                      value={status}
                      onValueChange={setStatus}
                      size="md"
                      className="mt-3"
                      items={statusItems.map((item) => ({ ...item, content: <p className="text-sm text-[var(--text-tertiary)]">当前分组：{item.label}</p> }))}
                    />
                    <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="bg-[var(--neutral-50)] p-4">
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="text-sm font-semibold text-[var(--neutral-900)]">资产类型分布</h3>
                          <Tabs value={metric} onValueChange={setMetric} variant="segment" size="sm" items={[{ value: "count", label: "数量", content: null }, { value: "capacity", label: "容量", content: null }]} />
                        </div>
                        <div className="mt-5 flex h-28 items-end gap-3 border-b border-l border-[var(--neutral-200)] px-4">
                          {[42, 76, 58, 96, 68].map((height, index) => <div key={index} className="flex-1 bg-[var(--product-blue-200)]" style={{ height: metric === "count" ? height : height * 0.72 }} />)}
                        </div>
                      </div>
                      <div className="bg-[var(--neutral-50)] p-4">
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="text-sm font-semibold text-[var(--neutral-900)]">资产增长趋势</h3>
                          <Tabs value={period} onValueChange={setPeriod} variant="text" size="sm" items={[{ value: "year", label: "按年", content: null }, { value: "month", label: "按月", content: null }]} />
                        </div>
                        <div className="mt-5 flex h-28 items-end gap-2 border-b border-l border-[var(--neutral-200)] px-4">
                          {[34, 44, 52, 64, 72, 88].map((height, index) => <div key={index} className="flex-1 bg-[var(--neutral-200)]" style={{ height: period === "year" ? height : height * 0.82 }} />)}
                        </div>
                      </div>
                    </div>
                  </>
                ) : scenarioPage === "governance" ? (
                  <div>
                    <h3 className="text-base font-semibold text-[var(--neutral-900)]">治理任务</h3>
                    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                      {['待领取 6', '处理中 14', '已完成 86'].map((item) => <div key={item} className="bg-[var(--neutral-50)] p-4 text-sm text-[var(--neutral-900)]">{item}</div>)}
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-base font-semibold text-[var(--neutral-900)]">流转记录</h3>
                    <div className="mt-4 divide-y divide-[var(--neutral-200)] bg-[var(--neutral-50)] px-4">
                      {['数据审核通过', '发布至可信空间', '完成链上存证'].map((item, index) => <p key={item} className="py-3 text-sm text-[var(--neutral-900)]">{index + 1}. {item}</p>)}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </ExampleCard>
      </section>

      <section>
        <SectionHeading eyebrow="Behavior" title="切换行为与数据规则" description="产品需在交付前确定状态是否保留、是否写入 URL，以及数量和溢出的处理方式。" />
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          <RuleGroup title="状态保持与 URL">
            <p><strong className="text-[var(--neutral-900)]">一级：</strong>推荐写入 URL，例如 <code>?module=assets</code>，支持刷新、分享和返回。</p>
            <p><strong className="text-[var(--neutral-900)]">二级：</strong>筛选型分组写入查询参数；切换一级时默认保留，业务冲突时才重置并明确提示。</p>
            <p><strong className="text-[var(--neutral-900)]">三级：</strong>仅保留在当前会话，不改变分页和页面滚动位置。</p>
          </RuleGroup>
          <RuleGroup title="数量、上限与溢出">
            <p>数量属于标签名称，统一写作“名称（12）”；为 0 时仍显示“（0）”，不隐藏入口。</p>
            <p>一级推荐 2–6 项，超过 6 项调整信息架构；二级可横向滚动；所有标签禁止折行。</p>
            <div className="mt-2 max-w-[320px] overflow-hidden border border-[var(--neutral-200)] px-2">
              <Tabs defaultValue="all" items={['全部（128）', '待审核（8）', '异常（3）', '已归档（0）', '已发布（56）', '草稿（4）'].map((label, index) => ({ value: String(index), label, content: null }))} />
            </div>
          </RuleGroup>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="States" title="状态、禁用与异常结果" description="标签入口保持稳定，加载、空数据和无权限应显示在内容区，不能通过隐藏标签表达。" />
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          <ExampleCard title="禁用项保持可见" description="悬停可查看禁用原因；禁用不是无权限内容的替代方案。">
            <Tabs defaultValue="valid" items={[{ value: "valid", label: "有效数据", content: null }, { value: "archived", label: "归档数据", content: null }, { value: "deleted", label: "已删除", content: null, disabled: true, disabledReason: "当前角色无删除记录查看权限" }]} />
          </ExampleCard>
          <ExampleCard title="内容区结果状态">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="bg-[var(--neutral-50)] p-3"><p className="text-sm font-medium text-[var(--neutral-900)]">加载中</p><div className="mt-3 h-2 w-20 animate-pulse bg-[var(--neutral-200)]" /></div>
              <div className="bg-[var(--neutral-50)] p-3"><p className="text-sm font-medium text-[var(--neutral-900)]">暂无数据</p><p className="mt-2 text-xs text-[var(--text-tertiary)]">保留当前标签。</p></div>
              <div className="bg-[var(--neutral-50)] p-3"><p className="text-sm font-medium text-[var(--neutral-900)]">无查看权限</p><p className="mt-2 text-xs text-[var(--text-tertiary)]">说明申请路径。</p></div>
            </div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Guidelines" title="最佳实践" description="按产品决策和视觉执行分组，减少与上方示例重复。" />
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          <RuleGroup title="产品经理必定规则">
            <p>Tabs 只能切换同级内容，不能承担流程步骤；流程使用步骤条或状态流转。</p>
            <p>交付时必须写明影响范围、默认项、状态保持、URL、数量更新和权限策略。</p>
            <p>一级不替代主导航；详情页 2–5 项最佳，超过上限优先调整架构。</p>
          </RuleGroup>
          <RuleGroup title="设计师视觉规则">
            <p>一级使用 page，二级使用 line，三级按差异强弱使用 segment 或 text，同层不得混用。</p>
            <p>一级 40px/16px，左右合计 28px；二级使用 32px 短指示线；三级分段整体高 28px。</p>
            <p>激活项使用中性黑或产品蓝；品牌红仅用于异常、风险等语义状态。</p>
          </RuleGroup>
        </div>
      </section>
    </div>
  );
}
