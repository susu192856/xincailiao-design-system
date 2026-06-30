import { SectionHeading, SpecList } from "../../components/docs/ComponentDoc";
import DocsTable from "../../components/docs/DocsTable";
import PageHeader from "../../components/docs/PageHeader";
import { Button } from "../../components/ui/Button";

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

        <div className="overflow-x-auto rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white">
          <div className="grid grid-cols-12 gap-4 border-b border-[var(--neutral-200)] bg-[var(--neutral-50)] px-6 py-3 text-sm font-semibold text-[var(--text-secondary)]">
            <div className="col-span-2">阴影名称</div>
            <div className="col-span-2">高度/模糊</div>
            <div className="col-span-3">CSS 值</div>
            <div className="col-span-5">使用场景</div>
          </div>
          {shadows.map((shadow, idx) => (
            <div
              key={idx}
              className="grid grid-cols-12 items-center gap-4 border-b border-[var(--neutral-100)] px-6 py-3.5 text-sm last:border-b-0"
            >
              <div className="col-span-2 font-token text-sm text-[var(--text-primary)]">{shadow.name}</div>
              <div className="col-span-2 text-[var(--text-primary)]">
                <div className="text-sm">高度: {shadow.elevation}</div>
                <div className="text-sm text-[var(--text-primary)]">模糊: {shadow.blur}</div>
              </div>
              <div
                className="col-span-3 text-sm text-[var(--text-primary)]"
                title={shadow.value}
              >
                {shadow.value.length > 40 ? shadow.value.substring(0, 40) + "..." : shadow.value}
              </div>
              <div className="col-span-5 text-[var(--text-primary)]">{shadow.usage}</div>
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
              <p className="mb-1 text-sm font-semibold text-[var(--text-primary)]">{shadow.name}</p>
              <p className="mb-4 text-xs text-[var(--text-secondary)]">
                {shadow.elevation} · {shadow.blur}
              </p>

              <div className="flex min-h-[200px] items-center justify-center rounded-sm bg-[var(--neutral-50)] p-8">
                <div
                  className="flex h-32 w-40 items-center justify-center rounded-[var(--radius-sm)] bg-white p-6"
                  style={{ boxShadow: shadow.value }}
                >
                  <div className="text-center">
                    <div className="mb-1 text-sm font-medium text-[var(--text-primary)]">示例卡片</div>
                    <div className="text-xs text-[var(--text-secondary)]">悬浮效果</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 border-t border-[var(--neutral-200)] pt-4">
                <p className="mb-1.5 text-xs text-[var(--text-secondary)]">CSS 值：</p>
                <code className="block break-all rounded-[var(--radius-sm)] bg-[var(--neutral-100)] px-2 py-1 font-mono text-sm text-[var(--text-secondary)]">
                  box-shadow: {shadow.value}
                </code>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Usage Matrix"
          title="阴影层级"
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
              <p className="text-xs text-[var(--text-tertiary)]">{item.level}</p>
              <p className="mt-2 text-base font-semibold text-[var(--neutral-900)]">{item.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">{item.usage}</p>
              <p className="mt-4 border-t border-[var(--neutral-200)] pt-3 text-xs leading-relaxed text-[var(--text-tertiary)]">
                {item.rule}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Guidelines" title="最佳实践" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-sm border border-[var(--neutral-200)] bg-white p-5">
            <h3 className="text-sm font-semibold text-[var(--neutral-900)]">交互反馈</h3>
            <p className="mt-2 text-xs leading-5 text-[var(--text-secondary)]">按钮悬停、输入框聚焦等微交互使用 XS / SM，状态切换后自动移除。</p>
          </div>
          <div className="rounded-sm border border-[var(--neutral-200)] bg-white p-5">
            <h3 className="text-sm font-semibold text-[var(--neutral-900)]">浮层与弹窗</h3>
            <p className="mt-2 text-xs leading-5 text-[var(--text-secondary)]">Dropdown、Popover、Tooltip 使用 MD / LG；Modal 和全屏预览使用 XL / 2XL。</p>
          </div>
          <div className="rounded-sm border border-[var(--neutral-200)] bg-white p-5">
            <h3 className="text-sm font-semibold text-[var(--neutral-900)]">静态卡片</h3>
            <p className="mt-2 text-xs leading-5 text-[var(--text-secondary)]">列表卡片和数据模块不默认加阴影，优先用 1px 边框和间距建立层级。</p>
          </div>
        </div>
        <div className="mt-4">
          <SpecList
            items={[
              "同一页面中同类组件使用相同等级阴影。",
              "悬停可提升 1-2 级（如 SM→MD），按下移除或降低。",
              "从无阴影到高层级逐级过渡，避免跨越式跳过中间等级。",
              "深色背景下减少阴影不透明度或使用描边替代。",
            ]}
          />
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Component Mapping"
          title="组件 × 阴影等级"
          description="将阴影等级映射到具体组件，减少设计稿和开发实现中的理解差异。以下为建议映射，同一组件在不同交互状态间可升降 1–2 级。"
        />
        <DocsTable>
          <thead>
            <tr>
              <th>阴影等级</th>
              <th>映射组件</th>
              <th>适用状态</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Shadow/XS", "Button · Input · Select · Switch · Checkbox · Radio", "悬停（Hover）、聚焦（Focus）"],
              ["Shadow/SM", "Card · Tag · Tooltip · 轻量 Popover", "静态卡片悬浮、可选卡片默认态、轻量浮层"],
              ["Shadow/MD", "Dropdown · Popover · Tooltip（强调）", "下拉菜单展开、Popover 信息面板、强调浮层"],
              ["Shadow/LG", "Drawer · 侧边面板 · 通知浮层", "抽屉展开、侧边筛选面板、强调通知卡片"],
              ["Shadow/XL", "Modal · 重要确认弹窗", "模态框、全局通知、重要警告框"],
              ["Shadow/2XL", "全屏预览 · 视频播放器 · 全局打断浮层", "全屏图片预览、全屏媒体播放、系统级打断弹窗"],
            ].map(([level, components, state]) => (
              <tr key={level}>
                <td className="whitespace-nowrap font-token text-sm text-[var(--text-primary)]">{level}</td>
                <td className="text-sm text-[var(--text-secondary)]">{components}</td>
                <td className="text-sm text-[var(--text-secondary)]">{state}</td>
              </tr>
            ))}
          </tbody>
        </DocsTable>
      </section>

      <section>
        <SectionHeading
          eyebrow="Usage Scenarios"
          title="卡片场景示例"
          description="阴影最常见的应用场景是卡片、浮层和模态窗口。不同等级应对应不同交互状态和信息优先级。"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="overflow-hidden rounded-sm border border-[var(--neutral-200)] bg-white">
            <div className="border-b border-[var(--neutral-200)] bg-[var(--neutral-50)] px-5 py-3">
              <h3 className="text-base font-semibold text-[var(--text-primary)]">默认卡片（Shadow/SM）</h3>
            </div>
            <div className="p-5">
              <div className="rounded-[var(--radius-sm)] bg-white p-6" style={{ boxShadow: shadows[1].value }}>
                <h4 className="mb-2 text-base font-semibold text-[var(--text-primary)]">标题文字</h4>
                <p className="mb-4 text-sm text-[var(--text-secondary)]">
                  这是一个普通卡片的示例，使用 Shadow/SM 提供轻微的悬浮感，适合静态卡片、列表项等场景。
                </p>
                <div className="flex gap-3">
                  <Button variant="ghost" size="sm">次要操作</Button>
                  <Button size="sm">主要操作</Button>
                </div>
              </div>
              <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                <span className="font-semibold text-[var(--text-primary)]">使用：</span>列表卡片、信息展示卡、无需强调的模块
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-sm border border-[var(--neutral-200)] bg-white">
            <div className="border-b border-[var(--neutral-200)] bg-[var(--neutral-50)] px-5 py-3">
              <h3 className="text-base font-semibold text-[var(--text-primary)]">悬停卡片（Shadow/MD）</h3>
            </div>
            <div className="p-5">
              <div
                className="cursor-pointer rounded-[var(--radius-sm)] bg-white p-6 transition-shadow hover:shadow-lg"
                style={{ boxShadow: shadows[2].value }}
              >
                <h4 className="mb-2 text-base font-semibold text-[var(--text-primary)]">可点击卡片</h4>
                <p className="mb-4 text-sm text-[var(--text-secondary)]">
                  鼠标悬停时从 Shadow/SM 提升到 Shadow/MD，提供视觉反馈，增强交互感知。
                </p>
                <div className="flex items-center gap-2 text-xs text-[var(--product-blue-500)]">
                  <span>查看详情</span>
                  <span>→</span>
                </div>
              </div>
              <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                <span className="font-semibold text-[var(--text-primary)]">使用：</span>可点击卡片、产品列表、文章预览
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-sm border border-[var(--neutral-200)] bg-white">
            <div className="border-b border-[var(--neutral-200)] bg-[var(--neutral-50)] px-5 py-3">
              <h3 className="text-base font-semibold text-[var(--text-primary)]">强调卡片（Shadow/LG）</h3>
            </div>
            <div className="p-5">
              <div className="rounded-[var(--radius-sm)] bg-white p-6" style={{ boxShadow: shadows[3].value }}>
                <div className="mb-3 flex items-start gap-3">
                  <div className="flex h-5 w-5 shrink-0 items-center text-[var(--error-text)]">
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
                    <h4 className="mb-1 text-base font-semibold text-[var(--text-primary)]">提示</h4>
                    <p className="text-sm text-[var(--text-secondary)]">
                      材质字段包含不合规值，请按材料目录规范修正后重新提交。
                    </p>
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="ghost" size="sm">稍后处理</Button>
                  <Button size="sm">查看详情</Button>
                </div>
              </div>
              <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                <span className="font-semibold text-[var(--text-primary)]">使用：</span>通知卡片、重要提示、推荐内容
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-sm border border-[var(--neutral-200)] bg-white">
            <div className="border-b border-[var(--neutral-200)] bg-[var(--neutral-50)] px-5 py-3">
              <h3 className="text-base font-semibold text-[var(--text-primary)]">模态框（Shadow/XL）</h3>
            </div>
            <div className="p-5">
              <div className="rounded-[var(--radius-sm)] bg-white p-6" style={{ boxShadow: shadows[4].value }}>
                <h4 className="mb-3 pb-3 text-base font-semibold text-[var(--text-primary)]">
                  确认发布数据资产
                </h4>
                <p className="mb-4 text-sm text-[var(--text-secondary)]">
                  发布后该资产将进入可流通状态，权限和字段配置不可回退。请确认已完成数据校验。
                </p>
                <div className="flex justify-end gap-3">
                  <Button variant="ghost" size="sm">取消</Button>
                  <Button size="sm">确认发布</Button>
                </div>
              </div>
              <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                <span className="font-semibold text-[var(--text-primary)]">使用：</span>模态框、抽屉、全局弹窗
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
