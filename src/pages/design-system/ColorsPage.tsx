import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "@phosphor-icons/react";
import ColorScaleGrid from "../../components/docs/ColorScaleGrid";
import CopyableColorValue from "../../components/docs/CopyableColorValue";
import { SectionHeading, SubsectionHeading } from "../../components/docs/ComponentDoc";
import DocsTable from "../../components/docs/DocsTable";
import { chartColorFamilies } from "../../data/chartColors";
import PageHeader from "../../components/docs/PageHeader";

type ColorToken = {
  name: string;
  hex: string;
  label: string;
  alias?: string;
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


function SemanticCard({ color }: { color: SemanticColor }) {
  return (
    <div className="overflow-hidden rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white">
      <div className="p-5">
        <div className="flex items-start justify-between gap-5">
          <div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">{color.label}</h3>
          </div>
        </div>
        <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{color.usage}</p>

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
    { name: "neutral-50", hex: "#F7F8FA", label: "页面底色/大面积背景", alias: "page-bg" },
    { name: "neutral-100", hex: "#F1F3F5", label: "卡片背景/浅容器", alias: "card-bg / row-divider" },
    { name: "neutral-200", hex: "#E6E9EE", label: "分割线/弱边框", alias: "border / divider" },
    { name: "neutral-300", hex: "#D5DAE1", label: "输入框边框/Disabled", alias: "field-border" },
    { name: "neutral-400", hex: "#B8C0CC", label: "边框、骨架和非文字装饰", alias: "decorative" },
    { name: "neutral-500", hex: "#97A0AD", label: "禁用文字或非必要信息", alias: "text-disabled" },
    { name: "neutral-600", hex: "#6F7785", label: "三级说明文字", alias: "text-tertiary" },
    { name: "neutral-700", hex: "#4B5563", label: "次级正文、导航和标注", alias: "text-secondary" },
    { name: "neutral-800", hex: "#2B313A", label: "主正文和高频界面文字", alias: "text-body" },
    { name: "neutral-900", hex: "#1A1A1A", label: "标题/主按钮/深背景", alias: "text-primary" },
  ];

  const semanticColors: SemanticColor[] = [
    { name: "success", text: "#009A29", background: "#E8FFEA", border: "#AFF0B5", label: "成功状态", usage: "用于保存成功、流程完成、校验通过等正向反馈。", sample: "操作成功" },
    { name: "warning", text: "#FF7D00", background: "#FFF7E8", border: "#FFE4BA", label: "警告提示", usage: "用于风险提示、临界状态、需要用户关注但未阻断的情况。", sample: "需要关注" },
    { name: "error", text: "#F53F3F", background: "#FFECE8", border: "#FDCDC5", label: "错误 / 危险", usage: "用于删除、失败、不可逆风险操作，不等同于品牌红。", sample: "操作失败" },
    { name: "info", text: "#3491FA", background: "#E8F7FF", border: "#C3E7FE", label: "信息提示", usage: "用于系统提示、链接信息、普通通知和可交互提示。", sample: "系统通知" },
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
          eyebrow="Three-Color System"
          title="三色三角"
          description="新材道产品界面的色彩体系由红、蓝、黑三种颜色构成。这不是三套可选配色方案，而是三种颜色的角色分工——红色负责宣告，蓝色负责交互，黑色负责让所有界面看起来像一家人。"
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <div className="rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white overflow-hidden">
            <div className="h-1 bg-[var(--brand-600)]" />
            <div className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="h-4 w-4 rounded-sm" style={{ backgroundColor: "var(--brand-600)" }} />
                <h3 className="text-base font-semibold text-[var(--text-primary)]">品牌红</h3>
              </div>
              <p className="text-sm text-[var(--text-secondary)] mb-3">brand-600 · #FF112D</p>
              <p className="text-sm leading-6 text-[var(--text-secondary)]"><strong className="text-[var(--text-primary)]">角色：品牌签名</strong>——宣告"这是新材道"。</p>
              <p className="mt-2 text-xs leading-5 text-[var(--text-tertiary)]">出现于官网首页、门户首页、展会、品宣封面、Logo。红色是信号色，不是环境色——少量最强，大面积即是噪音。</p>
            </div>
          </div>
          <div className="rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white overflow-hidden">
            <div className="h-1 bg-[var(--product-blue-500)]" />
            <div className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="h-4 w-4 rounded-sm" style={{ backgroundColor: "var(--product-blue-500)" }} />
                <h3 className="text-base font-semibold text-[var(--text-primary)]">产品蓝</h3>
              </div>
              <p className="text-sm text-[var(--text-secondary)] mb-3">product-blue-500 · #006DEA</p>
              <p className="text-sm leading-6 text-[var(--text-secondary)]"><strong className="text-[var(--text-primary)]">角色：产品功能语言</strong>——标记可交互、可操作的元素。</p>
              <p className="mt-2 text-xs leading-5 text-[var(--text-tertiary)]">出现于所有产品的按钮、链接、选中态、数据图表。产品之间的区分不靠换颜色，靠各自独有的界面核心元素。</p>
            </div>
          </div>
          <div className="rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white overflow-hidden">
            <div className="h-1 bg-[var(--neutral-900)]" />
            <div className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="h-4 w-4 rounded-sm" style={{ backgroundColor: "var(--neutral-900)" }} />
                <h3 className="text-base font-semibold text-[var(--text-primary)]">结构黑</h3>
              </div>
              <p className="text-sm text-[var(--text-secondary)] mb-3">neutral-900 · #1A1A1A</p>
              <p className="text-sm leading-6 text-[var(--text-secondary)]"><strong className="text-[var(--text-primary)]">角色：结构骨架</strong>——贯穿所有场景。</p>
              <p className="mt-2 text-xs leading-5 text-[var(--text-tertiary)]">唯一同时出现在官网和后台的颜色。官网的正文和导航是黑的，后台的标题和核心按钮也是黑的——用户不会主动注意它，但抽掉它界面就会感到结构空洞。</p>
            </div>
          </div>
        </div>
        <div className="mt-5 rounded-[var(--radius-sm)] border border-[var(--info-border)] bg-[var(--info-bg)] px-5 py-4 text-sm leading-6 text-[var(--text-secondary)]">
          <strong className="text-[var(--text-primary)]">使用决策：</strong>
          用户在官网（红+黑）认识品牌；进入后台/应用平台（蓝+黑），蓝色接管功能交互，黑色承担主操作按钮级结构骨架；红色退到顶栏 Logo。黑色始终在两端存在——这就是品牌连续性。
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
            <SubsectionHeading eyebrow="Brand" title="品牌红色阶" tone="brand" />
            <div className="overflow-x-auto bg-white p-4">
              <ColorScaleGrid colors={brandColors} className="min-w-[980px]" />
            </div>
          </div>

          <div>
            <SubsectionHeading eyebrow="Product" title="产品蓝色阶" tone="product" />
            <div className="overflow-x-auto bg-white p-4">
              <ColorScaleGrid colors={productColors} className="min-w-[980px]" />
            </div>
          </div>

          <div>
            <SubsectionHeading eyebrow="Neutral" title="中性灰色阶" />
            <div className="overflow-x-auto bg-white p-4">
              <ColorScaleGrid colors={neutralColors} className="min-w-[980px]" />
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Core Color Rules"
          title="使用场景与规则"
          description="只维护一套语义色系统。官网、门户和后台共享相同变量，通过页面密度与业务场景选择轻重，不再维护两套基础色板。"
        />
        <DocsTable>
          <thead>
            <tr>
              <th>语义</th>
              <th>变量</th>
              <th>默认值</th>
              <th>主要场景</th>
              <th>使用说明</th>
            </tr>
          </thead>
          <tbody>
            {coreColorRules.map((rule) => (
              <tr key={rule.semantic}>
                <td>{rule.semantic}</td>
                <td className="font-token">{rule.variable}</td>
                <td><ColorChip color={rule.color} label={rule.display} /></td>
                <td>{rule.context}</td>
                <td>{rule.usage}</td>
              </tr>
            ))}
          </tbody>
        </DocsTable>
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
          eyebrow="Data Visualization"
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
                  <div className="mt-2 flex justify-between font-mono text-xs text-[var(--text-tertiary)]">
                    {left.shades.map((c) => <span key={c} className="truncate">{c}</span>)}
                  </div>
                </div>
                {right ? (
                  <div className="rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-tertiary)]">{right.name}</p>
                    <div className="mt-3 flex h-10 overflow-hidden rounded-sm">
                      {right.shades.map((c) => <span key={c} className="flex-1" style={{ backgroundColor: c }} />)}
                    </div>
                    <div className="mt-2 flex justify-between font-mono text-xs text-[var(--text-tertiary)]">
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
            className="group flex items-center gap-4 rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-5 transition-all hover:border-[var(--neutral-300)] hover:bg-[var(--neutral-50)]"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--neutral-100)] text-[var(--text-secondary)]">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="7" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="14" y="3" width="7" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="3" y="15" width="7" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="14" y="12" width="7" height="9" rx="1" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">图表规范</h3>
              <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">查看数据色搭配方案和图表使用规范</p>
            </div>
            <ArrowRight className="h-5 w-5 shrink-0 text-[var(--text-primary)]" />
          </Link>
        </div>
      </section>
    </div>
  );
}
