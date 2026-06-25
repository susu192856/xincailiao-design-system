import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "@phosphor-icons/react";
import ColorScaleGrid from "../../components/docs/ColorScaleGrid";
import CopyableColorValue from "../../components/docs/CopyableColorValue";
import { SectionHeading } from "../../components/docs/ComponentDoc";
import { chartColorFamilies } from "../../data/chartColors";
import PageHeader from "../../components/docs/PageHeader";

type ColorToken = {
  name: string;
  hex: string;
  label: string;
};

type SemanticColor = {
  name: string;
  label: string;
  text: string;
  background: string;
  border: string;
  usage: string;
  sample: string;
};

function ColorChip({ color, label }: { color: string; label?: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="h-8 w-8 border border-[var(--neutral-200)] bg-white" style={{ backgroundColor: color }} />
      <CopyableColorValue value={color} display={label ?? color} className="whitespace-nowrap" />
    </div>
  );
}


function CoreRuleRow({
  semantic,
  variable,
  color,
  display,
  context,
  usage,
}: {
  semantic: string;
  variable: string;
  color: string;
  display: string;
  context: string;
  usage: string;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 border-b border-[var(--neutral-100)] px-5 py-4 text-sm last:border-b-0 lg:grid-cols-[150px_190px_190px_180px_minmax(0,1fr)] lg:items-center">
      <div>
        <h3 className="font-semibold text-[var(--neutral-900)]">{semantic}</h3>
      </div>
      <div className="font-mono text-xs text-[var(--text-tertiary)]">{variable}</div>
      <div>
        <p className="mb-2 text-xs font-semibold text-[var(--text-tertiary)] lg:hidden">默认值</p>
        <ColorChip color={color} label={display} />
      </div>
      <p className="text-sm font-medium text-[var(--text-secondary)]">{context}</p>
      <p className="text-sm leading-6 text-[var(--text-secondary)]">{usage}</p>
    </div>
  );
}

function SemanticCard({ color }: { color: SemanticColor }) {
  return (
    <div className="overflow-hidden rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white">
      <div className="h-1.5" style={{ backgroundColor: color.text }} />
      <div className="p-5">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--text-tertiary)]">{color.name}</p>
            <h3 className="mt-1.5 text-lg font-semibold text-[var(--text-primary)]">{color.label}</h3>
          </div>
          <span className="rounded-full px-2.5 py-1 text-xs font-semibold" style={{ backgroundColor: color.background, color: color.text }}>
            {color.sample}
          </span>
        </div>
        <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{color.usage}</p>

        <div className="mt-5 overflow-hidden rounded-sm border border-[var(--neutral-200)]">
          {[
            ["文字 / 图标", color.text],
            ["浅背景", color.background],
            ["边框", color.border],
          ].map(([role, value]) => (
            <div key={role} className="grid grid-cols-[100px_1fr] items-center border-b border-[var(--neutral-100)] px-3 py-2.5 text-xs last:border-b-0">
              <span className="text-[var(--text-tertiary)]">{role}</span>
              <div className="flex items-center justify-end gap-2">
                <span className="h-5 w-5 rounded-sm border border-black/5" style={{ backgroundColor: value }} />
                <CopyableColorValue value={value} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-sm border px-3.5 py-3 text-sm leading-6" style={{ backgroundColor: color.background, borderColor: color.border }}>
          <span className="font-semibold" style={{ color: color.text }}>{color.sample}</span>
          <span className="ml-2 text-[var(--text-secondary)]">状态信息必须配合明确文字，不只依赖颜色。</span>
        </div>
      </div>
    </div>
  );
}

export default function ColorsPage() {
  const brandColors: ColorToken[] = [
    { name: "brand-50", hex: "#FFF2F3", label: "最浅背景" },
    { name: "brand-100", hex: "#FFE4E7", label: "浅背景" },
    { name: "brand-200", hex: "#FFCCD2", label: "辅助强调" },
    { name: "brand-300", hex: "#FF9AA6", label: "装饰描边" },
    { name: "brand-400", hex: "#FF6677", label: "悬停辅助" },
    { name: "brand-500", hex: "#FF3D52", label: "悬停" },
    { name: "brand-600", hex: "#FF112D", label: "品牌主色" },
    { name: "brand-700", hex: "#D90E26", label: "点击" },
    { name: "brand-800", hex: "#B30C1F", label: "深色文字" },
    { name: "brand-900", hex: "#8C0918", label: "极深装饰" },
  ];

  const productColors: ColorToken[] = [
    { name: "product-blue-50", hex: "#EDF5FF", label: "页面浅背景" },
    { name: "product-blue-100", hex: "#D9EBFF", label: "信息背景" },
    { name: "product-blue-200", hex: "#B8D8FF", label: "弱强调" },
    { name: "product-blue-300", hex: "#8BBEFF", label: "浅交互态" },
    { name: "product-blue-400", hex: "#5A9FFF", label: "辅助功能" },
    { name: "product-blue-500", hex: "#006DEA", label: "功能主色" },
    { name: "product-blue-600", hex: "#0058C2", label: "Hover" },
    { name: "product-blue-700", hex: "#00449A", label: "Active" },
    { name: "product-blue-800", hex: "#00306F", label: "深色重点" },
    { name: "product-blue-900", hex: "#001D47", label: "深色背景" },
  ];

  const neutralColors: ColorToken[] = [
    { name: "neutral-50", hex: "#F7F8FA", label: "页面底色/大面积背景" },
    { name: "neutral-100", hex: "#F1F3F5", label: "卡片背景/浅容器" },
    { name: "neutral-200", hex: "#E6E9EE", label: "分割线/弱边框" },
    { name: "neutral-300", hex: "#D5DAE1", label: "输入框边框/Disabled" },
    { name: "neutral-400", hex: "#B8C0CC", label: "边框、骨架和非文字装饰" },
    { name: "neutral-500", hex: "#97A0AD", label: "禁用文字或非必要信息，不用于正常小字" },
    { name: "neutral-600", hex: "#6F7785", label: "三级说明文字，白底对比度 4.51:1" },
    { name: "neutral-700", hex: "#4B5563", label: "次级正文、导航和标注" },
    { name: "neutral-800", hex: "#2B313A", label: "主正文和高频界面文字" },
    { name: "neutral-900", hex: "#1A1A1A", label: "标题/主按钮/深背景" },
  ];

  const semanticColors: SemanticColor[] = [
    { name: "success", text: "#009A29", background: "#E8FFEA", border: "#AFF0B5", label: "成功状态", usage: "用于保存成功、流程完成、校验通过等正向反馈。", sample: "操作成功" },
    { name: "warning", text: "#CC9213", background: "#FFFCE8", border: "#FDF4BF", label: "警告提示", usage: "用于风险提示、临界状态、需要用户关注但未阻断的情况。", sample: "需要关注" },
    { name: "error", text: "#CB272D", background: "#FFECE8", border: "#FDCDC5", label: "错误 / 危险", usage: "用于删除、失败、不可逆风险操作，不等同于品牌红。", sample: "操作失败" },
    { name: "info", text: "#206CCF", background: "#E8F7FF", border: "#C3E7FE", label: "信息提示", usage: "用于系统提示、链接信息、普通通知和可交互提示。", sample: "系统通知" },
  ];

  const coreColorRules = [
    {
      semantic: "页面背景",
      color: "#F7F8FA",
      display: "neutral-50",
      variable: "color/bg/page",
      context: "页面底层",
      usage: "默认页面底色；品牌首页可按版块使用白色，但不形成另一套色板。",
    },
    {
      semantic: "容器/卡片",
      color: "#FFFFFF",
      display: "#FFFFFF",
      variable: "color/bg/surface",
      context: "内容容器",
      usage: "卡片、弹窗、表单等容器统一使用白色，保持内容聚焦。",
    },
    {
      semantic: "弱背景/表头",
      color: "#F1F3F5",
      display: "neutral-100",
      variable: "color/bg/subtle",
      context: "分组与表头",
      usage: "用于表头、字段区和弱分组；营销页面需要更轻时使用 neutral-50。",
    },
    {
      semantic: "标题文字",
      color: "#1A1A1A",
      display: "neutral-900",
      variable: "color/text/title",
      context: "标题/关键数据",
      usage: "一级标题、模块标题和关键数据标题统一使用 neutral-900。",
    },
    {
      semantic: "主要正文",
      color: "#2B313A",
      display: "neutral-800",
      variable: "color/text/primary",
      context: "正文/表单值",
      usage: "正文、表格主要内容与表单值使用 neutral-800。",
    },
    {
      semantic: "辅助文字",
      color: "#4B5563",
      display: "neutral-700",
      variable: "color/text/secondary",
      context: "描述/标注",
      usage: "页面描述、次级正文和高频标注使用 neutral-700；neutral-600 仅用于三级说明。",
    },
    {
      semantic: "标准边框",
      color: "#D5DAE1",
      display: "neutral-300",
      variable: "color/border/default",
      context: "控件边框",
      usage: "输入框和高密度容器使用 neutral-300；纯分割线使用 neutral-200。",
    },
    {
      semantic: "任务主行动",
      color: "#1A1A1A",
      display: "neutral-900",
      variable: "color/action/task/default",
      context: "任务推进",
      usage: "提交、确认、发布、创建等改变业务流程的操作使用黑色。",
    },
    {
      semantic: "产品功能",
      color: "#006DEA",
      display: "product-blue-500",
      variable: "color/action/product",
      context: "链接/功能操作",
      usage: "链接、筛选、下载、焦点和产品功能使用产品蓝。",
    },
    {
      semantic: "品牌强调",
      color: "#FF112D",
      display: "brand-600",
      variable: "color/action/brand",
      context: "品牌关键节点",
      usage: "Logo、品牌签名和关键转化小面积使用，不作为错误色或后台常规操作色。",
    },
  ];

  return (
    <div className="space-y-20">
      <PageHeader
        title="色彩系统"
        description="色彩系统以中性灰建立信息秩序，以 task 黑色推进提交、确认、发布和创建等任务，以 product 蓝色承载分析、生成、连接、筛选和导出等产品能力。品牌红仅用于品牌识别与关键转化，错误与风险使用独立语义色。"
      />

      <section>
        <SectionHeading
          eyebrow="Core Color Rules"
          title="核心色彩与使用规则"
          description="只维护一套语义色系统。官网、门户和后台共享相同变量，通过页面密度与业务场景选择轻重，不再维护两套基础色板。"
        />
        <div className="overflow-hidden bg-white">
          <div className="hidden grid-cols-[150px_190px_190px_180px_minmax(0,1fr)] bg-[var(--neutral-50)] px-5 py-3 text-xs font-semibold text-[var(--text-secondary)] lg:grid">
            <div>语义</div>
            <div>变量</div>
            <div>默认值</div>
            <div>主要场景</div>
            <div>使用说明</div>
          </div>
          {coreColorRules.map((rule) => (
            <CoreRuleRow key={rule.semantic} {...rule} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Action Decision"
          title="黑色与产品蓝的使用决策"
          description="黑色和蓝色共同属于后台操作体系，但表达不同意图：黑色推进任务，蓝色调用产品能力。它们不是主色与次色的关系。"
        />
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[400px_minmax(0,1fr)]">
          <div className="rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-6">
            <h3 className="text-base font-semibold text-[var(--text-primary)]">按顺序判断</h3>
            <ol className="mt-5 space-y-4">
              {[
                ["危险且不可逆", "danger", "删除、撤销审批、永久停用"],
                ["提交或改变业务流程", "task · 黑色", "提交、确认、发布、创建"],
                ["调用可重复或可撤回能力", "product · 蓝色", "分析、生成、连接、筛选、导出"],
                ["退出或不产生改变", "neutral", "取消、返回、关闭"],
              ].map(([question, tone, examples], index) => (
                <li key={question} className="grid grid-cols-[28px_1fr] gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--neutral-900)] font-mono text-xs text-white">{index + 1}</span>
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{question} → {tone}</p>
                    <p className="mt-1 text-sm text-[var(--text-secondary)]">{examples}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="overflow-x-auto rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white">
            <div className="min-w-[620px]">
              <div className="grid grid-cols-[130px_1fr_1fr] border-b border-[var(--neutral-200)] bg-[var(--neutral-50)] px-5 py-3 text-xs font-semibold text-[var(--text-secondary)]">
                <span>场景</span><span>黑色 task</span><span>蓝色 product</span>
              </div>
              {[
                ["表单", "提交、保存修改", "保存草稿用 outline"],
                ["表格工具栏", "新建数据", "筛选、导出、下载用 outline/text"],
                ["分析面板", "通常不出现", "运行分析、生成结果可用 solid"],
                ["普通弹窗", "确认、完成", "辅助能力用 outline"],
                ["危险确认", "不使用", "不使用，改用 danger"],
                ["导航链接", "不使用", "使用 text"],
              ].map(([scene, task, product]) => (
                <div key={scene} className="grid grid-cols-[130px_1fr_1fr] border-b border-[var(--neutral-100)] px-5 py-4 text-sm last:border-b-0">
                  <strong className="text-[var(--text-primary)]">{scene}</strong>
                  <span className="text-[var(--text-secondary)]">{task}</span>
                  <span className="text-[var(--text-secondary)]">{product}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-5 rounded-[var(--radius-sm)] border border-[var(--warning-border)] bg-[var(--warning-bg)] px-5 py-4 text-sm leading-6 text-[var(--text-secondary)]">
          <strong className="text-[var(--text-primary)]">唯一主操作原则：</strong>
          同一按钮组最多一个 solid。黑色 task solid 已存在时，蓝色 product 必须降为 outline 或 text；能力型页面没有任务提交时，蓝色 product 才可以成为唯一 solid。
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Color Scales"
          title="色阶系统"
          description="色阶用于背景、悬停、按下、标签、弱强调等状态。优先使用已有 token，不临时创造相近色。"
        />
        <div className="space-y-10">
          <div>
            <div className="mb-4 flex items-end justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-tertiary)]">Brand</p>
                <h3 className="mt-2 text-lg font-semibold text-[var(--neutral-900)]">品牌红色阶</h3>
              </div>
              <span className="h-2 w-2 bg-[var(--brand-600)]" />
            </div>
            <div className="overflow-x-auto bg-white p-4">
              <ColorScaleGrid colors={brandColors} className="min-w-[980px]" />
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-end justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-tertiary)]">Product</p>
                <h3 className="mt-2 text-lg font-semibold text-[var(--neutral-900)]">产品蓝色阶</h3>
              </div>
              <span className="h-2 w-2 bg-[var(--product-blue-500)]" />
            </div>
            <div className="overflow-x-auto bg-white p-4">
              <ColorScaleGrid colors={productColors} className="min-w-[980px]" />
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-end justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-tertiary)]">Neutral</p>
                <h3 className="mt-2 text-lg font-semibold text-[var(--neutral-900)]">中性灰色阶</h3>
              </div>
              <span className="h-2 w-2 bg-[var(--neutral-900)]" />
            </div>
            <div className="overflow-x-auto bg-white p-4">
              <ColorScaleGrid colors={neutralColors} className="min-w-[980px]" />
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Semantic Colors"
          title="语义色"
          description="语义色用于状态反馈。尤其注意：错误/危险使用 error，不使用品牌红，避免品牌识别和风险提示混淆。"
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {semanticColors.map((color) => (
            <SemanticCard key={color.name} color={color} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="数据可视化"
          title="数据可视化"
          description="数据色板参考社区数据可视化资源的色系组织方式，共 10 个色系，每系 7 个深浅层级。设计师在设计文件中按需选取图表配色。"
        />

        <div className="mt-8 space-y-5">
          {chartColorFamilies.reduce<ReactNode[]>((rows, family, i) => {
            if (i % 2 !== 0) return rows;
            const left = family;
            const right = chartColorFamilies[i + 1];
            rows.push(
              <div key={left.key} className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                <div className="rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-tertiary)]">{left.name}</p>
                  <div className="mt-3 flex h-10 overflow-hidden rounded-sm">
                    {left.shades.map((c) => <span key={c} className="flex-1" style={{ backgroundColor: c }} />)}
                  </div>
                  <div className="mt-2 flex justify-between font-mono text-[10px] text-[var(--text-tertiary)]">
                    {left.shades.map((c) => <span key={c} className="truncate">{c}</span>)}
                  </div>
                </div>
                {right ? (
                  <div className="rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-tertiary)]">{right.name}</p>
                    <div className="mt-3 flex h-10 overflow-hidden rounded-sm">
                      {right.shades.map((c) => <span key={c} className="flex-1" style={{ backgroundColor: c }} />)}
                    </div>
                    <div className="mt-2 flex justify-between font-mono text-[10px] text-[var(--text-tertiary)]">
                      {right.shades.map((c) => <span key={c} className="truncate">{c}</span>)}
                    </div>
                  </div>
                ) : null}
              </div>
            );
            return rows;
          }, [] as ReactNode[])}
        </div>

        <div className="mt-8">
          <Link
            to="/components/chart"
            className="group flex items-center gap-4 rounded-[var(--radius-sm)] border-2 border-[var(--product-blue-300)] bg-[var(--product-blue-50)] p-5 transition-all hover:border-[var(--product-blue-500)] hover:bg-[var(--product-blue-100)] hover:shadow-[var(--shadow-md)]"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--product-blue-500)] text-white shadow-[var(--shadow-sm)]">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="7" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="14" y="3" width="7" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="3" y="15" width="7" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="14" y="12" width="7" height="9" rx="1" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-semibold text-[var(--neutral-900)]">图表规范</h3>
              <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">查看数据色搭配方案和图表使用规范</p>
            </div>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--product-blue-500)] text-white transition-transform group-hover:translate-x-0.5">
              <ArrowRight className="h-5 w-5" />
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
