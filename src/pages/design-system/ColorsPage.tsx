import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "@phosphor-icons/react";
import ColorScaleGrid from "../../components/docs/ColorScaleGrid";
import CopyableColorValue from "../../components/docs/CopyableColorValue";
import { SectionHeading, SubsectionHeading } from "../../components/docs/ComponentDoc";
import DocsTable from "../../components/docs/DocsTable";
import { chartColorFamilies } from "../../data/chartColors";
import PageHeader from "../../components/docs/PageHeader";
import { Tag, type TagVariant } from "../../components/ui/Tag";
import { Button } from "../../components/ui/Button";

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
  dot: string;
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
    <article className="min-w-0">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: color.dot }} />
          <h3 className="truncate text-base font-semibold text-[var(--text-primary)]">{color.label}</h3>
        </div>
        <span
          className="shrink-0 rounded-[var(--radius-sm)] border px-2 py-1 text-xs font-semibold"
          style={{ backgroundColor: color.background, borderColor: color.border, color: color.text }}
        >
          {color.sample}
        </span>
      </div>
      <p className="mt-2 text-xs leading-5 text-[var(--text-secondary)]">{color.usage}</p>
      <div className="mt-4 grid grid-cols-2 gap-x-2 gap-y-3">
        {[
          { role: "前景色", value: color.text, foreground: "#FFFFFF" },
          { role: "圆点色", value: color.dot, foreground: "#FFFFFF" },
          { role: "浅背景", value: color.background, foreground: "#1A1A1A" },
          { role: "边框", value: color.border, foreground: "#1A1A1A" },
        ].map((item) => (
          <div key={item.role} className="min-w-0">
            <p className="mb-1 text-[10px] leading-4 text-[var(--text-tertiary)]">{item.role}</p>
            <div
              className="flex h-7 items-center justify-center rounded-[var(--radius-sm)] border border-black/5 px-1"
              style={{ backgroundColor: item.value }}
            >
              <CopyableColorValue
                value={item.value}
                className="justify-center font-data text-[10px] font-semibold"
                style={{ color: item.foreground }}
              />
            </div>
          </div>
        ))}
      </div>
    </article>
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
    { name: "product-blue-600", hex: "#0058C2", label: "悬停（Hover）" },
    { name: "product-blue-700", hex: "#00449A", label: "按下（Active）" },
    { name: "product-blue-800", hex: "#00306F", label: "深色重点" },
    { name: "product-blue-900", hex: "#001D47", label: "深色背景" },
  ];

  const neutralColors: ColorToken[] = [
    { name: "neutral-50", hex: "#F7F8FA", label: "页面底色/大面积背景", alias: "page-bg" },
    { name: "neutral-100", hex: "#F1F3F5", label: "卡片背景/浅容器", alias: "card-bg / row-divider" },
    { name: "neutral-200", hex: "#E6E9EE", label: "分割线/弱边框", alias: "border / divider" },
    { name: "neutral-300", hex: "#D5DAE1", label: "输入框边框 / 禁用（Disabled）", alias: "field-border" },
    { name: "neutral-400", hex: "#B8C0CC", label: "边框、骨架和非文字装饰", alias: "decorative" },
    { name: "neutral-500", hex: "#97A0AD", label: "禁用文字或非必要信息", alias: "text-disabled" },
    { name: "neutral-600", hex: "#6F7785", label: "三级说明文字", alias: "text-tertiary" },
    { name: "neutral-700", hex: "#4B5563", label: "次级正文、导航和标注", alias: "text-secondary" },
    { name: "neutral-800", hex: "#2B313A", label: "主正文和高频界面文字", alias: "text-body" },
    { name: "neutral-900", hex: "#1A1A1A", label: "标题/主按钮/深背景", alias: "text-primary" },
  ];

  const semanticColors: SemanticColor[] = [
    { name: "success", text: "#007A20", dot: "#00B42A", background: "#E8FFEA", border: "#AFF0B5", label: "成功状态", usage: "用于保存成功、流程完成、校验通过等正向反馈。", sample: "操作成功" },
    { name: "warning", text: "#A64B00", dot: "#FF7D00", background: "#FFF7E8", border: "#FFE4BA", label: "警告提示", usage: "用于风险提示、临界状态、需要用户关注但未阻断的情况。", sample: "需要关注" },
    { name: "error", text: "#D93636", dot: "#F53F3F", background: "#FFECE8", border: "#FDCDC5", label: "错误状态", usage: "用于失败、校验错误和系统异常等状态反馈，不承担危险按钮的操作色。", sample: "操作失败" },
    { name: "info", text: "#0057A8", dot: "#3491FA", background: "#E8F7FF", border: "#C3E7FE", label: "信息提示", usage: "用于系统提示、链接信息、普通通知和可交互提示。", sample: "系统通知" },
  ];

  const categoryColors = [
    ["琥珀分类", "amber", "#FDF4E5", "#FADFB2", "#45310F", "data-amber"],
    ["橙色分类", "orange", "#FDF2EC", "#FAD9C7", "#823618", "data-orange"],
    ["粉色分类", "pink", "#FDF1F3", "#F9D5DC", "#861E29", "data-pink"],
    ["品红分类", "magenta", "#FCF0FA", "#F5D3EF", "#691A58", "data-magenta"],
    ["紫色分类", "purple", "#F5F3FE", "#E2DAFC", "#3C13BE", "data-purple"],
    ["靛蓝分类", "indigo", "#F2F5FE", "#D9E0FC", "#1F3188", "data-indigo"],
    ["蓝色分类", "blue", "#EFF7FE", "#CEE8FD", "#1C4062", "data-blue"],
    ["绿色分类", "green", "#EDF8F4", "#C8EADF", "#204838", "data-green"],
    ["中性分类", "neutral", "#F7F8FA", "#E6E9EE", "#4B5563", "neutral"],
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
      usage: "链接、分析、生成、连接、下载和功能型操作使用产品蓝；单选框（Radio）、复选框（Checkbox）、开关（Switch）的选中状态也使用产品蓝。",
    },
    {
      semantic: "品牌强调",
      color: "#FF112D",
      display: "brand-600",
      variable: "color/action/brand",
      context: "品牌关键节点",
      usage: "Logo、品牌签名和关键转化小面积使用；危险按钮通过 danger 语义复用该色阶，但不作为后台常规操作色。",
    },
  ];

  return (
    <div className="space-y-20">
      <PageHeader
        title="色彩系统"
        description="色彩系统以中性灰建立信息秩序，以任务色（Task）黑色推进提交、确认、发布和创建，以产品色（Product）蓝色承载分析、生成、连接、筛选和导出。品牌转化与危险操作按页面类型复用同一红色色阶，但分别使用品牌（Brand）与危险（Danger）语义。"
      />

      <section>
        <SectionHeading
          eyebrow="Three-Color System"
          title="三色三角"
          description="新材道产品界面的色彩体系由红、蓝、黑三种颜色构成。这不是三套可选配色方案，而是三种颜色的角色分工——红色负责品牌宣告，蓝色承载产品功能，黑色推进关键任务并建立结构秩序。"
        />
        <div className="overflow-hidden rounded-[var(--radius-md)] border border-[var(--neutral-200)] bg-white">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {[
              {
                name: "品牌红",
                token: "brand-600 · #FF112D",
                color: "var(--brand-600)",
                role: "品牌签名",
                summary: "宣告“这是新材道”。",
                usage: "出现于官网首页、门户首页、展会、品宣封面、Logo。红色是信号色，不是环境色——少量最强，大面积即是噪音。",
              },
              {
                name: "产品蓝",
                token: "product-blue-500 · #006DEA",
                color: "var(--product-blue-500)",
                role: "产品功能语言",
                summary: "标记可交互、可操作的元素。",
                usage: "出现于功能按钮、链接、分析生成能力、数据图表，以及单选框（Radio）、复选框（Checkbox）、开关（Switch）的选中状态。所有表单控件的聚焦态（Focus）使用中性黑，避免把状态蓝与键盘焦点混为一体。",
              },
              {
                name: "任务黑",
                token: "neutral-900 · #1A1A1A",
                color: "var(--neutral-900)",
                role: "任务推进与结构骨架",
                summary: "表达确定性并贯穿所有场景。",
                usage: "用于提交、确认、保存和发布等结果型操作，也用于正文、标题、导航以及所有表单控件的边框与聚焦态（Focus）建立结构秩序。黑色强调确定性，不与产品蓝的选中状态混用。",
              },
            ].map((tone) => (
              <article
                key={tone.name}
                className="relative min-w-0 border-b border-[var(--neutral-200)] p-5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
              >
                <span className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: tone.color }} />
                <div className="mt-1 flex items-center gap-3">
                  <span
                    className="h-10 w-10 shrink-0 rounded-[var(--radius-sm)] border border-black/5"
                    style={{ backgroundColor: tone.color }}
                  />
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold text-[var(--text-primary)]">{tone.name}</h3>
                    <p className="mt-0.5 font-token text-xs text-[var(--text-tertiary)]">{tone.token}</p>
                  </div>
                </div>
                <div className="mt-5 border-t border-[var(--neutral-100)] pt-4">
                  <p className="text-sm leading-6 text-[var(--text-secondary)]">
                    <strong className="text-[var(--text-primary)]">角色：{tone.role}</strong>
                    ——{tone.summary}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-[var(--text-tertiary)]">{tone.usage}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-3 border-t border-[var(--neutral-200)] bg-[var(--neutral-50)] px-5 py-4 md:grid-cols-[120px_minmax(0,1fr)] md:items-start">
            <div>
              <p className="text-sm font-semibold text-[var(--text-primary)]">使用决策</p>
              <div className="mt-2 flex h-1.5 overflow-hidden rounded-[1px]" aria-hidden="true">
                <span className="flex-1 bg-[var(--brand-600)]" />
                <span className="flex-1 bg-[var(--product-blue-500)]" />
                <span className="flex-1 bg-[var(--neutral-900)]" />
              </div>
            </div>
            <p className="text-sm leading-6 text-[var(--text-secondary)]">
              用户在官网（红+黑）认识品牌；进入后台/应用平台（蓝+黑），蓝色承载产品能力和选择状态，黑色承担任务型主操作、输入字段框架和结构骨架；红色退到顶栏 Logo。黑色输入框架与蓝色状态反馈共同形成稳重且易识别的交互语言。
            </p>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Color Scales"
          title="色阶系统"
          description="色阶用于背景、悬停、按下、标签、弱强调等状态。优先使用已有设计变量（Token），不临时创造相近色。"
        />
        <div className="space-y-10">
          <div>
            <SubsectionHeading eyebrow="Brand" title="品牌红色阶" tone="brand" />
            <div className="bg-white p-4">
              <ColorScaleGrid colors={brandColors} compact />
            </div>
          </div>

          <div>
            <SubsectionHeading eyebrow="Product" title="产品蓝色阶" tone="product" />
            <div className="bg-white p-4">
              <ColorScaleGrid colors={productColors} compact />
            </div>
          </div>

          <div>
            <SubsectionHeading eyebrow="Neutral" title="中性灰色阶" />
            <div className="bg-white p-4">
              <ColorScaleGrid colors={neutralColors} compact />
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

      <section id="task-product-choice" className="scroll-mt-6">
        <SectionHeading
          eyebrow="Decision Guide"
          title="任务黑与产品蓝 — 如何选择"
          description="这是新材道色彩模型中最需要判断力的一层：两个都可以用在按钮上，但承担的「语气」不同。以下场景帮助快速决策。"
        />
        <div className="bg-white">
          <DocsTable>
            <thead>
              <tr>
                <th>如果你要……</th>
                <th>用这个</th>
                <th>示例</th>
                <th>理由</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["提交表单 / 确认发布 / 保存配置", "黑色（Task）", <Button size="sm" tone="task" className="pointer-events-none">提交</Button>, "改变业务流程的结果——用户需要感到'这件事定了'。"],
                ["下一步 / 继续 / 完成", "黑色（Task）", <Button size="sm" tone="task" className="pointer-events-none">下一步</Button>, "推进流程前进，不是辅助操作。"],
                ["查看详情 / 了解更多 / 跳转链接", "蓝色（Product）", <Button size="sm" variant="text" tone="product" className="pointer-events-none">查看详情</Button>, "引导探索，不改变数据状态。独立承担当前区域的唯一入口时可使用实色；与提交、确认等任务主操作并列时，降为描边型或文字型。"],
                ["筛选 / 搜索 / 下载 / 导出", "蓝色（Product）", <Button size="sm" variant="outline" tone="product" className="pointer-events-none">导出</Button>, "产品功能操作，不改变业务结果。"],
                ["新建 / 创建 / 生成", "黑色（Task）", <Button size="sm" tone="task" className="pointer-events-none">新建</Button>, "新增是一条业务流程的起点，需要明确触发。"],
                ["取消 / 返回 / 关闭（不改变数据）", "中性弱按钮", <Button size="sm" variant="ghost" tone="neutral" className="pointer-events-none">取消</Button>, "优先使用弱化型（ghost）或文字型（text）；需要保持明显的次级入口时才使用描边型（outline）。"],
                ["删除 / 不可逆操作", "危险语义（Danger）", <Button size="sm" tone="danger" className="pointer-events-none">删除</Button>, "视觉复用品牌红色阶，只在后台或应用平台出现；保留 danger 语义并配合二次确认，不与品牌 CTA 同屏。"],
              ].map(([scenario, choice, example, reason]) => (
                <tr key={scenario as string}>
                  <td>{scenario as string}</td>
                  <td className="whitespace-nowrap font-semibold text-[var(--text-primary)]">{choice as string}</td>
                  <td>{example as ReactNode}</td>
                  <td>{reason as string}</td>
                </tr>
              ))}
            </tbody>
          </DocsTable>
        </div>
        <div className="mt-4 rounded-[var(--radius-md)] border border-[var(--neutral-200)] bg-white px-5 py-4 text-sm leading-6 text-[var(--text-secondary)]">
          <p>
            <strong className="text-[var(--text-primary)]">组合底线：</strong>
            颜色语义（tone）决定按钮表达什么，按钮类型（variant）决定它在操作组中的视觉层级；同一操作组只能有一个实色按钮（solid）。
          </p>
          <p className="mt-2">
            <strong className="text-[var(--text-primary)]">简单记法：</strong>
            黑色（Task）= "我决定了一件事"；蓝色（Product）= "我想看看 / 用用这个功能"。如果按钮同时改变数据又引导探索（少数情况），优先按"是否改变业务结果"来判断。
          </p>
        </div>
        <Link
          to="/components/button#tone-composition"
          className="group mt-4 flex min-h-[80px] items-center gap-4 rounded-[var(--radius-md)] border border-l-4 border-[var(--product-blue-200)] border-l-[var(--product-blue-500)] bg-[var(--product-blue-50)] px-5 py-4 transition-colors hover:border-[var(--product-blue-400)] hover:border-l-[var(--product-blue-600)] hover:bg-[var(--product-blue-100)]"
        >
          <div className="min-w-0 flex-1">
            <p className="text-base font-semibold text-[var(--text-primary)]">进入按钮配色与组合规范</p>
            <p className="mt-1 text-sm leading-5 text-[var(--text-secondary)]">查看实色、描边、弱化和文字按钮如何组成一个主次明确的操作组。</p>
          </div>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--product-blue-500)]">
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" style={{ color: "#FFFFFF" }} />
          </span>
        </Link>
      </section>

      <section>
        <SectionHeading
          eyebrow="Semantic Colors"
          title="语义色"
          description="语义色用于状态反馈。错误、失败和校验异常继续使用 error 色；危险按钮保留 danger 语义，但视觉复用品牌红色阶。两者的业务含义不能互换。"
        />
        <div className="overflow-hidden rounded-[var(--radius-md)] border border-[var(--neutral-200)] bg-white">
          <div className="grid grid-cols-1 gap-x-10 gap-y-8 p-5 md:grid-cols-2 md:p-6">
            {semanticColors.map((color) => (
              <SemanticCard key={color.name} color={color} />
            ))}
          </div>
          <p className="border-t border-[var(--neutral-200)] bg-[var(--neutral-50)] px-5 py-3 text-xs leading-5 text-[var(--text-secondary)]">
            状态信息必须配合明确文字、图标或状态标签，不以颜色作为唯一信息载体。
          </p>
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Category Tag Colors"
          title="分类标签色"
          description="8 种有色分类标签与数据可视化共用色相来源，只承担类别区分，不表达成功、警告或错误。珊瑚和红色保留给图表、品牌及错误语义，不用于分类标签。背景由色系 0 阶按 14% 与白色混合，边框按 42% 混合，文字由 6 阶混入 18% 中性黑。无需颜色区分时使用 neutral。"
        />
        <DocsTable>
          <thead>
            <tr><th>类别</th><th>颜色语义（tone）</th><th>色相来源</th><th>背景</th><th>边框</th><th>文字</th></tr>
          </thead>
          <tbody>
            {categoryColors.map(([label, tone, background, border, text, source]) => (
              <tr key={tone}>
                <td><Tag variant={tone as TagVariant} size="sm">{label}</Tag></td>
                <td className="font-token">{tone}</td>
                <td className="font-token">{source === "neutral" ? "neutral-50 / 200 / 700" : `${source}-0 / 6`}</td>
                <td><ColorChip color={background} /></td>
                <td><ColorChip color={border} /></td>
                <td><ColorChip color={text} /></td>
              </tr>
            ))}
          </tbody>
        </DocsTable>
      </section>

      <section>
        <SectionHeading
          eyebrow="Data Visualization"
          title="数据可视化"
          description="数据色板参考社区数据可视化资源的色系组织方式，共 10 个色系，每系 7 个深浅层级。设计师在设计文件中按需选取图表配色。"
        />

        <div className="mt-8 overflow-hidden rounded-[var(--radius-md)] border border-[var(--neutral-200)] bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {chartColorFamilies.map((family) => (
              <div key={family.key} className="min-w-0 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-tertiary)]">{family.name}</p>
                <div className="mt-3 flex h-10 overflow-hidden rounded-[var(--radius-sm)]">
                  {family.shades.map((color) => <span key={color} className="flex-1" style={{ backgroundColor: color }} />)}
                </div>
                <div className="mt-2 grid grid-cols-7 font-mono text-xs text-[var(--text-tertiary)]">
                  {family.shades.map((color) => <span key={color} className="min-w-0 truncate text-center" title={color}>{color}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-[var(--radius-md)] border border-[var(--neutral-200)] bg-white p-5">
          <h3 className="text-base font-semibold text-[var(--text-primary)]">使用原则</h3>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-[var(--text-secondary)]">
            <li><strong className="text-[var(--text-primary)]">序列数 ≤ 6：</strong>从 10 个色系中选取不同色系，相邻系列避免使用同一色系的近似层级。</li>
            <li><strong className="text-[var(--text-primary)]">序列数 ≥ 7：</strong>配合线型、点型、透明度或图例分组，不只依赖颜色区分。</li>
            <li><strong className="text-[var(--text-primary)]">面积图 / 饼图：</strong>颜色超过 6 类时应合并为"其他"，避免大量颜色削弱可读性。</li>
            <li><strong className="text-[var(--text-primary)]">风险与阈值：</strong>优先使用错误强调色（<span className="font-token">--error-text</span>）或警告强调色（<span className="font-token">--warning-text</span>）标注异常和阈值线，不占用普通数据序列的颜色。</li>
            <li><strong className="text-[var(--text-primary)]">品牌红在图表中：</strong>仅用于标注关键阈值、异常结果或业务重点，不作为普通序列色。</li>
          </ul>
        </div>

        <div className="mt-5">
          <Link
            to="/components/chart"
            className="group flex items-center gap-4 rounded-[var(--radius-md)] border border-[var(--neutral-200)] bg-white p-5 transition-all hover:border-[var(--neutral-300)] hover:bg-[var(--neutral-50)]"
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
