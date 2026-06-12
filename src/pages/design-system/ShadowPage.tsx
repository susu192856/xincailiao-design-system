import { SectionHeading } from "../../components/docs/ComponentDoc";
import PageHeader from "../../components/docs/PageHeader";

export default function ShadowPage() {
  const shadows = [
    {
      name: "Shadow/XS",
      value: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      usage: "最小阴影，用于按钮悬停、输入框聚焦等微交互",
      elevation: "1px",
      blur: "2px",
      color: "rgba(0, 0, 0, 0.05)",
    },
    {
      name: "Shadow/SM",
      value: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
      usage: "小阴影，用于卡片、下拉菜单、Tooltip等轻量浮层",
      elevation: "1-3px",
      blur: "3px",
      color: "rgba(0, 0, 0, 0.1)",
    },
    {
      name: "Shadow/MD",
      value: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
      usage: "中等阴影，用于悬浮卡片、弹出框、日期选择器等常规浮层",
      elevation: "4-6px",
      blur: "6px",
      color: "rgba(0, 0, 0, 0.1)",
    },
    {
      name: "Shadow/LG",
      value: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
      usage: "大阴影，用于抽屉、侧边面板、模态框等重要浮层组件",
      elevation: "10-15px",
      blur: "15px",
      color: "rgba(0, 0, 0, 0.1)",
    },
    {
      name: "Shadow/XL",
      value: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      usage: "特大阴影，用于全局通知、图片预览、重要警告框等强调性浮层",
      elevation: "20-25px",
      blur: "25px",
      color: "rgba(0, 0, 0, 0.1)",
    },
    {
      name: "Shadow/2XL",
      value: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      usage: "超大阴影，用于大型模态框、全屏预览、视频播放器等最高层级浮层",
      elevation: "25-50px",
      blur: "50px",
      color: "rgba(0, 0, 0, 0.25)",
    },
  ];

  return (
    <div className="space-y-20">
      <PageHeader title="阴影" description="通过层次化的阴影系统，建立界面的空间层级和视觉深度" />

      <section>
        <SectionHeading
          eyebrow="Shadow Tokens"
          title="阴影规范"
          description="阴影用于表达界面元素的高度和层级关系。从微交互反馈到模态浮层，等级越高越应克制使用。"
        />

        <div className="overflow-hidden rounded-none border border-[var(--neutral-200)] bg-white">
          <div className="grid grid-cols-12 gap-4 border-b border-[var(--neutral-200)] bg-[var(--neutral-50)] px-6 py-3 text-sm font-semibold text-[var(--neutral-900)]">
            <div className="col-span-2">阴影名称</div>
            <div className="col-span-2">高度/模糊</div>
            <div className="col-span-3">CSS 值</div>
            <div className="col-span-5">使用场景</div>
          </div>
          {shadows.map((shadow, idx) => (
            <div
              key={idx}
              className="grid grid-cols-12 items-center gap-4 border-b border-[var(--neutral-200)] px-6 py-3.5 text-sm last:border-b-0"
            >
              <div className="col-span-2 font-mono text-xs text-[var(--neutral-900)]">{shadow.name}</div>
              <div className="col-span-2 text-[var(--neutral-700)]">
                <div className="text-xs">高度: {shadow.elevation}</div>
                <div className="text-xs text-[var(--neutral-600)]">模糊: {shadow.blur}</div>
              </div>
              <div
                className="col-span-3 truncate font-mono text-xs text-[var(--neutral-700)]"
                title={shadow.value}
              >
                {shadow.value.length > 40 ? shadow.value.substring(0, 40) + "..." : shadow.value}
              </div>
              <div className="col-span-5 text-[var(--neutral-700)]">{shadow.usage}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Shadow Preview"
          title="阴影示例"
          description="可视化展示不同等级阴影的空间深度。后台界面优先使用轻阴影，重要浮层才提升层级。"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {shadows.map((shadow, idx) => (
            <div key={idx} className="rounded-sm border border-[var(--neutral-200)] bg-white p-6">
              <p className="mb-1 text-xs font-semibold text-[var(--neutral-900)]">{shadow.name}</p>
              <p className="mb-4 text-xs text-[var(--neutral-600)]">
                {shadow.elevation} · {shadow.blur}
              </p>

              <div className="flex min-h-[200px] items-center justify-center rounded-sm bg-[var(--neutral-50)] p-8">
                <div
                  className="flex h-32 w-40 items-center justify-center rounded-none bg-white p-6"
                  style={{ boxShadow: shadow.value }}
                >
                  <div className="text-center">
                    <div className="mb-1 text-xs font-medium text-[var(--neutral-900)]">示例卡片</div>
                    <div className="text-xs text-[var(--neutral-600)]">悬浮效果</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 border-t border-[var(--neutral-200)] pt-4">
                <p className="mb-1.5 text-xs text-[var(--neutral-600)]">CSS 值：</p>
                <code className="block break-all rounded-none bg-[var(--neutral-100)] px-2 py-1 font-mono text-[10px] text-[var(--neutral-700)]">
                  box-shadow: {shadow.value}
                </code>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Usage Scenarios"
          title="卡片场景示例"
          description="阴影最常见的应用场景是卡片、浮层和模态窗口。不同等级应对应不同交互状态和信息优先级。"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-sm border border-[var(--neutral-200)] bg-white p-5">
            <h3 className="mb-3.5 text-base font-semibold text-[var(--neutral-900)]">
              默认卡片（Shadow/SM）
            </h3>
            <div className="rounded-none bg-white p-6" style={{ boxShadow: shadows[1].value }}>
              <h4 className="mb-2 text-sm font-semibold text-[var(--neutral-900)]">标题文字</h4>
              <p className="mb-4 text-sm text-[var(--neutral-600)]">
                这是一个普通卡片的示例，使用 Shadow/SM 提供轻微的悬浮感，适合静态卡片、列表项等场景。
              </p>
              <div className="flex gap-3">
                <button className="rounded-none border border-[var(--neutral-300)] px-4 py-2 text-xs text-[var(--neutral-700)]">
                  次要操作
                </button>
                <button className="rounded-none bg-[var(--neutral-900)] px-4 py-2 text-xs text-white">
                  主要操作
                </button>
              </div>
            </div>
            <p className="mt-3 text-xs text-[var(--neutral-600)]">
              <span className="font-semibold text-[var(--neutral-900)]">使用：</span>列表卡片、信息展示卡、无需强调的模块
            </p>
          </div>

          <div className="rounded-sm border border-[var(--neutral-200)] bg-white p-5">
            <h3 className="mb-3.5 text-base font-semibold text-[var(--neutral-900)]">
              悬停卡片（Shadow/MD）
            </h3>
            <div
              className="cursor-pointer rounded-none bg-white p-6 transition-shadow hover:shadow-lg"
              style={{ boxShadow: shadows[2].value }}
            >
              <h4 className="mb-2 text-sm font-semibold text-[var(--neutral-900)]">可点击卡片</h4>
              <p className="mb-4 text-sm text-[var(--neutral-600)]">
                鼠标悬停时从 Shadow/SM 提升到 Shadow/MD，提供视觉反馈，增强交互感知。
              </p>
              <div className="flex items-center gap-2 text-xs text-[var(--product-blue-500)]">
                <span>查看详情</span>
                <span>→</span>
              </div>
            </div>
            <p className="mt-3 text-xs text-[var(--neutral-600)]">
              <span className="font-semibold text-[var(--neutral-900)]">使用：</span>可点击卡片、产品列表、文章预览
            </p>
          </div>

          <div className="rounded-sm border border-[var(--neutral-200)] bg-white p-5">
            <h3 className="mb-3.5 text-base font-semibold text-[var(--neutral-900)]">
              强调卡片（Shadow/LG）
            </h3>
            <div className="rounded-none bg-white p-6" style={{ boxShadow: shadows[3].value }}>
              <div className="mb-3 flex items-start gap-3">
                <div className="rounded-sm bg-[var(--warning-bg)] p-2 text-[var(--warning-text)]">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="mb-1 text-sm font-semibold text-[var(--neutral-900)]">重要通知</h4>
                  <p className="text-sm text-[var(--neutral-600)]">
                    使用 Shadow/LG 突出重要信息，吸引用户注意力，适合高优先级内容。
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <button className="rounded-sm border border-[var(--neutral-300)] px-4 py-2 text-xs text-[var(--neutral-700)]">
                  稍后处理
                </button>
                <button className="rounded-sm bg-[var(--neutral-900)] px-4 py-2 text-xs text-white">
                  立即查看
                </button>
              </div>
            </div>
            <p className="mt-3 text-xs text-[var(--neutral-600)]">
              <span className="font-semibold text-[var(--neutral-900)]">使用：</span>通知卡片、重要提示、推荐内容
            </p>
          </div>

          <div className="rounded-sm border border-[var(--neutral-200)] bg-white p-5">
            <h3 className="mb-3.5 text-base font-semibold text-[var(--neutral-900)]">
              模态框（Shadow/XL）
            </h3>
            <div className="rounded-none bg-white p-6" style={{ boxShadow: shadows[4].value }}>
              <h4 className="mb-3 border-b border-[var(--neutral-200)] pb-3 text-sm font-semibold text-[var(--neutral-900)]">
                确认操作
              </h4>
              <p className="mb-4 text-sm text-[var(--neutral-600)]">
                模态框使用 Shadow/XL 创建明显的层级感，与背景形成强对比，引导用户专注当前任务。
              </p>
              <div className="flex justify-end gap-3">
                <button className="rounded-none border border-[var(--neutral-300)] px-4 py-2 text-xs text-[var(--neutral-700)]">
                  取消
                </button>
                <button className="rounded-none bg-[var(--neutral-900)] px-4 py-2 text-xs text-white">
                  确认
                </button>
              </div>
            </div>
            <p className="mt-3 text-xs text-[var(--neutral-600)]">
              <span className="font-semibold text-[var(--neutral-900)]">使用：</span>模态框、抽屉、全局弹窗
            </p>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Principles" title="阴影使用原则" />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="rounded-sm border border-[var(--neutral-200)] bg-white p-5">
            <h3 className="mb-3.5 text-base font-semibold text-[var(--neutral-900)]">官网/门户场景</h3>
            <div className="space-y-3.5 text-sm text-[var(--neutral-700)]">
              <div>
                <p className="mb-1.5 font-semibold text-[var(--neutral-900)]">推荐阴影</p>
                <p>Shadow/SM、Shadow/MD、Shadow/LG（中小等级为主）</p>
              </div>
              <div>
                <p className="mb-1.5 font-semibold text-[var(--neutral-900)]">使用场景</p>
                <ul className="ml-5 list-disc space-y-1">
                  <li>产品卡片、案例展示：Shadow/SM</li>
                  <li>悬停交互、特性展示：Shadow/MD</li>
                  <li>重点模块、CTA按钮：Shadow/LG</li>
                </ul>
              </div>
              <div>
                <p className="mb-1.5 font-semibold text-[var(--neutral-900)]">注意事项</p>
                <p>避免过多使用大阴影，保持页面轻盈感，仅在需要强调的模块使用 Shadow/LG</p>
              </div>
            </div>
          </div>

          <div className="rounded-sm border border-[var(--neutral-200)] bg-white p-5">
            <h3 className="mb-3.5 text-base font-semibold text-[var(--neutral-900)]">后台/B端场景</h3>
            <div className="space-y-3.5 text-sm text-[var(--neutral-700)]">
              <div>
                <p className="mb-1.5 font-semibold text-[var(--neutral-900)]">推荐阴影</p>
                <p>Shadow/XS、Shadow/SM、Shadow/MD（轻量级为主）</p>
              </div>
              <div>
                <p className="mb-1.5 font-semibold text-[var(--neutral-900)]">使用场景</p>
                <ul className="ml-5 list-disc space-y-1">
                  <li>输入框聚焦、按钮悬停：Shadow/XS</li>
                  <li>数据卡片、表格：Shadow/SM</li>
                  <li>下拉菜单、Tooltip：Shadow/MD</li>
                  <li>抽屉、模态框：Shadow/LG/XL</li>
                </ul>
              </div>
              <div>
                <p className="mb-1.5 font-semibold text-[var(--neutral-900)]">注意事项</p>
                <p>优先使用轻量阴影，避免视觉干扰，仅在浮层组件使用 Shadow/LG 以上等级</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Usage Matrix"
          title="阴影层级矩阵"
          description="新材道界面优先通过边框、背景和间距建立层级。阴影只用于交互反馈和浮层，不作为普通卡片的默认装饰。"
        />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
          {[
            {
              level: "无阴影",
              title: "默认承载",
              usage: "普通卡片、表格容器、页面分区",
              rule: "使用 1px 中性边框和白底即可。",
            },
            {
              level: "XS / SM",
              title: "轻反馈",
              usage: "按钮悬停、输入框聚焦、可点击卡片",
              rule: "只在交互状态出现，避免静态堆叠。",
            },
            {
              level: "MD / LG",
              title: "常规浮层",
              usage: "Dropdown、Popover、Tooltip、Drawer",
              rule: "用于脱离页面流的组件，表达覆盖关系。",
            },
            {
              level: "XL / 2XL",
              title: "最高层级",
              usage: "Modal、全屏预览、重要确认浮层",
              rule: "仅用于打断式任务，不进入常规页面模块。",
            },
          ].map((item) => (
            <div key={item.level} className="rounded-sm border border-[var(--neutral-200)] bg-white p-5">
              <p className="font-mono text-xs text-[var(--neutral-500)]">{item.level}</p>
              <p className="mt-2 text-base font-semibold text-[var(--neutral-900)]">{item.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--neutral-700)]">{item.usage}</p>
              <p className="mt-4 border-t border-[var(--neutral-200)] pt-3 text-xs leading-relaxed text-[var(--neutral-600)]">
                {item.rule}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Guidelines" title="最佳实践" />
        <div className="rounded-sm border border-[var(--neutral-200)] bg-white p-5">
          <ul className="space-y-3 text-sm text-[var(--neutral-700)]">
            <li className="flex items-start gap-3">
              <span className="shrink-0 font-semibold text-[var(--product-blue-500)]">•</span>
              <div>
                <span className="font-semibold text-[var(--neutral-900)]">保持一致性：</span>
                同类组件使用相同等级阴影，避免同一页面出现过多阴影等级
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="shrink-0 font-semibold text-[var(--product-blue-500)]">•</span>
              <div>
                <span className="font-semibold text-[var(--neutral-900)]">层级递进：</span>
                从无阴影到 XS/SM/MD，逐级提升，避免跨越式使用（如从无阴影直接跳到 LG）
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="shrink-0 font-semibold text-[var(--product-blue-500)]">•</span>
              <div>
                <span className="font-semibold text-[var(--neutral-900)]">交互反馈：</span>
                悬停状态可提升1-2个等级（如 SM→MD），按下状态可降低或移除阴影
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="shrink-0 font-semibold text-[var(--product-blue-500)]">•</span>
              <div>
                <span className="font-semibold text-[var(--neutral-900)]">浅色背景优先：</span>
                阴影在浅色背景下效果最佳，深色背景下可减少不透明度或使用描边
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="shrink-0 font-semibold text-[var(--product-blue-500)]">•</span>
              <div>
                <span className="font-semibold text-[var(--neutral-900)]">性能考虑：</span>
                避免在列表中大量使用 XL/2XL 阴影，优先使用 SM/MD 确保渲染性能
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
