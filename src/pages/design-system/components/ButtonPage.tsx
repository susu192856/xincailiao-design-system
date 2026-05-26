import {
  ArrowRight,
  DownloadSimple,
  FloppyDisk,
  PencilSimple,
  Plus,
  Trash,
  X,
} from "@phosphor-icons/react";
import PageHeader from "../../../components/docs/PageHeader";
import { SectionHeading } from "../../../components/docs/ComponentDoc";
import { Button } from "../../../components/ui/Button";

function TokenNote({
  items,
  usage,
}: {
  items: string[];
  usage?: string;
}) {
  return (
    <div className="mt-4 border-t border-[var(--neutral-200)] pt-3">
      <div className="space-y-1">
        {items.map((item) => (
          <p key={item} className="text-xs text-[var(--neutral-600)]">
            {item}
          </p>
        ))}
      </div>
      {usage ? (
        <p className="mt-2 text-xs text-[var(--neutral-700)]">
          <span className="font-semibold text-[var(--neutral-900)]">使用场景：</span>
          {usage}
        </p>
      ) : null}
    </div>
  );
}

function SpecCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white p-6 md:p-7">
      <h3 className="mb-5 text-base font-semibold text-[var(--neutral-900)]">{title}</h3>
      {children}
    </div>
  );
}

function ButtonStack({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col items-start gap-3.5 [&>button]:min-w-[112px]">{children}</div>;
}

function ButtonGroup({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap items-center gap-x-4 gap-y-3">{children}</div>;
}

function DotList({ items, tone = "product" }: { items: string[]; tone?: "product" | "danger" }) {
  const color = tone === "danger" ? "text-[var(--error-text)]" : "text-[var(--product-blue-500)]";

  return (
    <ul className="space-y-3 text-sm text-[var(--neutral-700)]">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2">
          <span className={`${color} font-semibold`}>•</span>
          <span dangerouslySetInnerHTML={{ __html: item }} />
        </li>
      ))}
    </ul>
  );
}

export default function ButtonPage() {
  return (
    <div className="space-y-16">
      <PageHeader
        title="按钮"
        description="按钮组件用于触发操作和交互。按钮规范需要同时区分视觉层级与业务色彩语义，支持官网、门户、数据空间、材库、AI 应用和后台管理等多端场景。"
      />

      <section>
        <SectionHeading
          eyebrow="Button Semantics"
          title="按钮语义模型"
          description="按钮层级由 variant 决定，颜色语义由 tone 决定。蓝色代表产品功能操作，不等于次按钮；次按钮是一种较低视觉层级，通常使用 outline、ghost 或 text 承载。"
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <SpecCard title="视觉层级（variant）">
            <div className="space-y-3 text-sm text-[var(--neutral-700)]">
              <p>
                <span className="font-semibold text-[var(--neutral-900)]">solid：</span>
                主行动按钮，承载页面或区域内最关键操作。
              </p>
              <p>
                <span className="font-semibold text-[var(--neutral-900)]">outline：</span>
                次要按钮，与主按钮搭配使用，保留操作可见性但降低视觉权重。
              </p>
              <p>
                <span className="font-semibold text-[var(--neutral-900)]">ghost：</span>
                弱按钮，常用于取消、关闭、轻量退出。
              </p>
              <p>
                <span className="font-semibold text-[var(--neutral-900)]">text：</span>
                文字按钮，用于低优先级操作、链接跳转、辅助入口。
              </p>
            </div>
          </SpecCard>
          <SpecCard title="业务色彩（tone）">
            <div className="space-y-3 text-sm text-[var(--neutral-700)]">
              <p>
                <span className="font-semibold text-[var(--neutral-900)]">neutral：</span>
                默认主行动，适用于官网主 CTA、关键确认、稳定专业的核心操作。
              </p>
              <p>
                <span className="font-semibold text-[var(--neutral-900)]">product：</span>
                产品功能操作，用于后台系统中的保存、下载、筛选、链接、焦点行为。
              </p>
              <p>
                <span className="font-semibold text-[var(--neutral-900)]">brand：</span>
                官网营销、品牌强调、关键转化，不用于常规后台操作。
              </p>
              <p>
                <span className="font-semibold text-[var(--neutral-900)]">danger：</span>
                删除、取消、不可逆风险操作，使用错误语义色，不混用品牌红。
              </p>
            </div>
          </SpecCard>
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Variants"
          title="按钮类型"
          description="按钮分为主要、次要、弱按钮、文字、危险五种类型。所有按钮统一使用 2px 圆角，悬停和按下状态保持明确但克制。"
        />

        <div className="mb-8">
          <h3 className="mb-4 text-lg font-semibold text-[var(--neutral-900)]">主要按钮（Solid）</h3>
          <div className="bg-white p-6">
            <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2 xl:grid-cols-3">
              <div>
                <p className="mb-3 text-sm font-semibold text-[var(--neutral-900)]">黑色 - 主行动按钮</p>
                <ButtonStack>
                  <Button>主要操作</Button>
                  <Button icon={<Plus className="h-4 w-4" weight="regular" />}>新建项目</Button>
                  <Button disabled>禁用状态</Button>
                </ButtonStack>
                <TokenNote
                  items={[
                    "默认: neutral-900 (#1A1A1A)",
                    "悬停: neutral-800 (#2B313A)",
                    "按下: neutral-700 (#4B5563)",
                  ]}
                  usage="官网主 CTA、页面最重要操作、关键确认"
                />
              </div>

              <div>
                <p className="mb-3 text-sm font-semibold text-[var(--neutral-900)]">蓝色 - 产品功能操作</p>
                <ButtonStack>
                  <Button tone="product">保存数据</Button>
                  <Button tone="product" icon={<DownloadSimple className="h-4 w-4" weight="regular" />}>
                    下载报告
                  </Button>
                  <Button tone="product" disabled>
                    禁用状态
                  </Button>
                </ButtonStack>
                <TokenNote
                  items={[
                    "默认: product-blue-500 (#006DEA)",
                    "悬停: product-blue-600 (#0058C2)",
                    "按下: product-blue-700 (#00449A)",
                  ]}
                  usage="数据空间、材库、AI 应用和后台系统中的功能操作"
                />
              </div>

              <div>
                <p className="mb-3 text-sm font-semibold text-[var(--neutral-900)]">红色 - 品牌强调</p>
                <ButtonStack>
                  <Button tone="brand">品牌行动</Button>
                  <Button tone="brand" icon={<ArrowRight className="h-4 w-4" weight="regular" />} iconPosition="right">
                    立即体验
                  </Button>
                  <Button tone="brand" disabled>
                    禁用状态
                  </Button>
                </ButtonStack>
                <TokenNote
                  items={[
                    "默认: brand-600 (#FF112D)",
                    "悬停: brand-700 (#D90E26)",
                    "按下: brand-800 (#B30C1F)",
                  ]}
                  usage="官网营销、品牌强调、重点转化，避免在后台中滥用"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="mb-4 text-lg font-semibold text-[var(--neutral-900)]">次要按钮（Outline）</h3>
          <div className="bg-white p-6">
            <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2 xl:grid-cols-3">
              <div>
                <p className="mb-3 text-sm font-semibold text-[var(--neutral-900)]">中性描边</p>
                <ButtonStack>
                  <Button variant="outline">次要操作</Button>
                  <Button variant="outline" icon={<PencilSimple className="h-4 w-4" weight="regular" />}>
                    编辑内容
                  </Button>
                  <Button variant="outline" disabled>
                    禁用状态
                  </Button>
                </ButtonStack>
                <TokenNote items={[]} usage="与黑色主按钮搭配，承担辅助但仍可见的操作" />
              </div>

              <div>
                <p className="mb-3 text-sm font-semibold text-[var(--neutral-900)]">产品描边</p>
                <ButtonStack>
                  <Button variant="outline" tone="product">
                    筛选数据
                  </Button>
                  <Button variant="outline" tone="product" icon={<FloppyDisk className="h-4 w-4" weight="regular" />}>
                    保存草稿
                  </Button>
                  <Button variant="outline" tone="product" disabled>
                    禁用状态
                  </Button>
                </ButtonStack>
                <TokenNote items={[]} usage="与产品功能主按钮搭配，适合后台辅助操作" />
              </div>

              <div>
                <p className="mb-3 text-sm font-semibold text-[var(--neutral-900)]">品牌描边</p>
                <ButtonStack>
                  <Button variant="outline" tone="brand">
                    了解更多
                  </Button>
                  <Button variant="outline" tone="brand" icon={<ArrowRight className="h-4 w-4" weight="regular" />} iconPosition="right">
                    查看方案
                  </Button>
                  <Button variant="outline" tone="brand" disabled>
                    禁用状态
                  </Button>
                </ButtonStack>
                <TokenNote items={[]} usage="与品牌转化按钮搭配，适合官网营销场景" />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="mb-4 text-lg font-semibold text-[var(--neutral-900)]">弱按钮（Ghost）</h3>
          <div className="bg-white p-6">
            <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2 xl:grid-cols-3">
              <div>
                <p className="mb-3 text-sm font-semibold text-[var(--neutral-900)]">中性弱按钮（推荐）</p>
                <ButtonStack>
                  <Button variant="ghost">取消</Button>
                  <Button variant="ghost">关闭</Button>
                  <Button variant="ghost" disabled>
                    禁用状态
                  </Button>
                </ButtonStack>
              </div>
              <div>
                <p className="mb-3 text-sm font-semibold text-[var(--neutral-900)]">产品弱按钮</p>
                <ButtonStack>
                  <Button variant="ghost" tone="product">
                    取消保存
                  </Button>
                  <Button variant="ghost" tone="product">关闭</Button>
                  <Button variant="ghost" tone="product" disabled>
                    禁用状态
                  </Button>
                </ButtonStack>
              </div>
              <div>
                <p className="mb-3 text-sm font-semibold text-[var(--neutral-900)]">品牌弱按钮</p>
                <ButtonStack>
                  <Button variant="ghost" tone="brand">
                    暂不体验
                  </Button>
                  <Button variant="ghost" tone="brand">关闭</Button>
                  <Button variant="ghost" tone="brand" disabled>
                    禁用状态
                  </Button>
                </ButtonStack>
              </div>
            </div>
            <div className="mt-5 bg-amber-50/50 p-4">
              <p className="text-xs leading-6 text-[var(--neutral-700)]">
                <span className="font-semibold text-[var(--neutral-900)]">设计说明：</span>
                弱按钮无边框，使用浅色背景，优先级低于次要按钮，常用于“取消”“关闭”等退出类操作。
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="mb-4 text-lg font-semibold text-[var(--neutral-900)]">文字按钮（Text）</h3>
          <div className="bg-white p-6">
            <div className="grid grid-cols-1 gap-x-8 gap-y-8 text-left md:grid-cols-2 xl:grid-cols-3">
              <div>
                <p className="mb-3 text-sm font-semibold text-[var(--neutral-900)]">中性文字</p>
                <ButtonStack>
                  <Button variant="text">查看详情</Button>
                  <Button variant="text" icon={<ArrowRight className="h-4 w-4" weight="regular" />} iconPosition="right">
                    了解更多
                  </Button>
                  <Button variant="text" disabled>
                    禁用状态
                  </Button>
                </ButtonStack>
              </div>
              <div>
                <p className="mb-3 text-sm font-semibold text-[var(--neutral-900)]">产品文字</p>
                <ButtonStack>
                  <Button variant="text" tone="product">
                    查看全部
                  </Button>
                  <Button variant="text" tone="product" icon={<ArrowRight className="h-4 w-4" weight="regular" />} iconPosition="right">
                    跳转详情
                  </Button>
                  <Button variant="text" tone="product" disabled>
                    禁用状态
                  </Button>
                </ButtonStack>
              </div>
              <div>
                <p className="mb-3 text-sm font-semibold text-[var(--neutral-900)]">品牌文字</p>
                <ButtonStack>
                  <Button variant="text" tone="brand">
                    品牌链接
                  </Button>
                  <Button variant="text" tone="brand" icon={<ArrowRight className="h-4 w-4" weight="regular" />} iconPosition="right">
                    立即体验
                  </Button>
                  <Button variant="text" tone="brand" disabled>
                    禁用状态
                  </Button>
                </ButtonStack>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold text-[var(--neutral-900)]">危险按钮（Danger）</h3>
          <div className="bg-white p-6">
            <ButtonGroup>
              <Button tone="danger" icon={<Trash className="h-4 w-4" weight="regular" />}>
                删除
              </Button>
              <Button variant="outline" tone="danger">
                取消订单
              </Button>
              <Button variant="text" tone="danger">
                移除
              </Button>
            </ButtonGroup>
            <div className="mt-4 bg-red-50 p-4">
              <p className="text-xs leading-6 text-[var(--neutral-700)]">
                <span className="font-semibold text-[var(--neutral-900)]">颜色规范：</span>
                使用语义色 error (#EF4444)，传达风险和警示，不使用品牌红替代。
              </p>
              <p className="mt-1 text-xs leading-6 text-[var(--neutral-700)]">
                <span className="font-semibold text-[var(--neutral-900)]">使用场景：</span>
                删除、取消等不可逆或高风险操作，建议添加二次确认。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Sizes"
          title="按钮尺寸 - 多端适配"
          description="基于 8px 间距系统和字体规范，按钮尺寸区分官网/网页端与后台/管理端。官网强调转化与可点击性；后台按钮最大 36px、中间值 32px、最小值 28px，强调密度与操作效率。"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <SpecCard title="官网 / 网页端">
            <div className="space-y-5">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-semibold text-[var(--neutral-900)]">Large - 40px</p>
                  <p className="text-xs text-[var(--neutral-600)]">常规尺寸</p>
                </div>
                <ButtonGroup>
                  <Button size="lg" className="!h-10 px-6 text-base">
                    开始使用
                  </Button>
                  <Button size="lg" tone="brand" className="!h-10 px-6 text-base">
                    立即购买
                  </Button>
                </ButtonGroup>
                <p className="mt-2 text-xs text-[var(--neutral-600)]">内间距: 24px 水平 / 10px 垂直 · 字号: 16px</p>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-semibold text-[var(--neutral-900)]">X-Large - 48px</p>
                  <p className="text-xs text-[var(--neutral-600)]">强调尺寸</p>
                </div>
                <ButtonGroup>
                  <Button size="xl">开始体验</Button>
                  <Button size="xl" tone="brand">
                    品牌强调
                  </Button>
                </ButtonGroup>
                <p className="mt-2 text-xs text-[var(--neutral-600)]">内间距: 32px 水平 / 12px 垂直 · 字号: 18px</p>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-semibold text-[var(--neutral-900)]">2XL - 56px</p>
                  <p className="text-xs text-[var(--neutral-600)]">超大尺寸</p>
                </div>
                <ButtonGroup>
                  <Button size="2xl">首屏主 CTA</Button>
                  <Button size="2xl" tone="brand">
                    品牌转化
                  </Button>
                </ButtonGroup>
                <p className="mt-2 text-xs text-[var(--neutral-600)]">内间距: 40px 水平 / 14px 垂直 · 字号: 20px</p>
              </div>
            </div>
            <div className="mt-5 bg-[var(--neutral-50)] p-4 text-xs leading-6 text-[var(--neutral-700)]">
              官网主行动优先使用黑色，品牌红用于关键转化或品牌强调，避免满屏红色按钮造成视觉噪音。
            </div>
          </SpecCard>

          <SpecCard title="后台 / 管理端">
            <div className="space-y-5">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-semibold text-[var(--neutral-900)]">Small - 28px</p>
                  <p className="text-xs text-[var(--neutral-600)]">最小尺寸</p>
                </div>
                <ButtonGroup>
                  <Button size="sm">确定</Button>
                  <Button size="sm" tone="product">
                    保存
                  </Button>
                </ButtonGroup>
                <p className="mt-2 text-xs text-[var(--neutral-600)]">高度: 28px · 字号: 14px · 用于表格行内、紧凑工具栏</p>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-semibold text-[var(--neutral-900)]">Medium - 32px</p>
                  <p className="text-xs text-[var(--neutral-600)]">标准尺寸（推荐）</p>
                </div>
                <ButtonGroup>
                  <Button size="md">确认提交</Button>
                  <Button size="md" tone="product">
                    保存草稿
                  </Button>
                </ButtonGroup>
                <p className="mt-2 text-xs text-[var(--neutral-600)]">高度: 32px · 字号: 14px · 用于表单、筛选、常规提交</p>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-semibold text-[var(--neutral-900)]">Large - 36px</p>
                  <p className="text-xs text-[var(--neutral-600)]">最大尺寸</p>
                </div>
                <ButtonGroup>
                  <Button size="lg">确认操作</Button>
                  <Button size="lg" tone="product" icon={<ArrowRight className="h-5 w-5" weight="regular" />} iconPosition="right">
                    查看详情
                  </Button>
                </ButtonGroup>
                <p className="mt-2 text-xs text-[var(--neutral-600)]">高度: 36px · 字号: 14px · 用于弹窗主操作、页面级关键操作</p>
              </div>
            </div>
            <div className="mt-5 bg-[var(--neutral-50)] p-4 text-xs leading-6 text-[var(--neutral-700)]">
              后台场景优先使用 28px / 32px。36px 为后台最大按钮尺寸，仅用于弹窗主操作、页面级关键提交等强调场景。
            </div>
          </SpecCard>
        </div>

      </section>

      <section>
        <SectionHeading
          eyebrow="States"
          title="按钮状态"
          description="按钮状态包括默认、悬停、按下、加载和禁用。主按钮与描边按钮悬停时可以配合 Shadow/XS，文字按钮只通过背景色变化提供反馈。"
        />
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2 xl:grid-cols-3">
          <SpecCard title="中性主按钮状态">
            <ButtonStack>
              <Button>默认</Button>
              <Button className="bg-[var(--neutral-800)] shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]">悬停</Button>
              <Button className="bg-[var(--neutral-700)]">按下</Button>
              <Button loading>加载</Button>
              <Button disabled>禁用</Button>
            </ButtonStack>
          </SpecCard>

          <SpecCard title="产品功能状态">
            <ButtonStack>
              <Button tone="product">默认</Button>
              <Button tone="product" className="bg-[var(--product-blue-600)] shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]">
                悬停
              </Button>
              <Button tone="product" className="bg-[var(--product-blue-700)]">
                按下
              </Button>
              <Button tone="product" loading>
                加载
              </Button>
              <Button tone="product" disabled>
                禁用
              </Button>
            </ButtonStack>
          </SpecCard>

          <SpecCard title="品牌强调状态">
            <ButtonStack>
              <Button tone="brand">默认</Button>
              <Button tone="brand" className="bg-[var(--brand-700)] shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]">
                悬停
              </Button>
              <Button tone="brand" className="bg-[var(--brand-800)]">
                按下
              </Button>
              <Button tone="brand" loading>
                加载
              </Button>
              <Button tone="brand" disabled>
                禁用
              </Button>
            </ButtonStack>
          </SpecCard>

          <SpecCard title="中性描边状态">
            <ButtonStack>
              <Button variant="outline">默认</Button>
              <Button variant="outline" className="bg-[var(--neutral-50)] shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]">
                悬停
              </Button>
              <Button variant="outline" className="bg-[var(--neutral-100)]">
                按下
              </Button>
              <Button variant="outline" loading>
                加载
              </Button>
              <Button variant="outline" disabled>
                禁用
              </Button>
            </ButtonStack>
          </SpecCard>

          <SpecCard title="弱按钮状态">
            <ButtonStack>
              <Button variant="ghost">默认</Button>
              <Button variant="ghost" className="bg-[var(--neutral-200)]">
                悬停
              </Button>
              <Button variant="ghost" className="bg-[var(--neutral-300)]">
                按下
              </Button>
              <Button variant="ghost" loading>
                加载
              </Button>
              <Button variant="ghost" disabled>
                禁用
              </Button>
            </ButtonStack>
          </SpecCard>

          <SpecCard title="危险操作状态">
            <ButtonStack>
              <Button tone="danger">默认</Button>
              <Button tone="danger" className="bg-red-600 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]">
                悬停
              </Button>
              <Button tone="danger" className="bg-red-700">
                按下
              </Button>
              <Button tone="danger" loading>
                加载
              </Button>
              <Button tone="danger" disabled>
                禁用
              </Button>
            </ButtonStack>
          </SpecCard>
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Spacing"
          title="按钮间距与排列"
          description="基于 8px 间距系统，按钮排列遵循“左侧取消/关闭，右侧确定/保存”的原则，确保符合用户操作习惯。"
        />
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2">
          <SpecCard title="水平排列">
            <div className="space-y-6">
              <div>
                <p className="mb-2 text-xs text-[var(--neutral-600)]">间距 12px (gap-3) - 推荐</p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="ghost">取消</Button>
                  <Button>确定</Button>
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs text-[var(--neutral-600)]">间距 8px (gap-2) - 紧凑场景</p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="ghost" size="sm">
                    取消
                  </Button>
                  <Button tone="product" size="sm">
                    保存
                  </Button>
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs text-[var(--neutral-600)]">间距 16px (gap-4) - 官网场景</p>
                <div className="flex flex-wrap gap-4">
                  <Button variant="ghost" size="xl">
                    取消
                  </Button>
                  <Button size="xl">开始使用</Button>
                </div>
              </div>
            </div>
          </SpecCard>

          <SpecCard title="垂直排列（移动端）">
            <div className="space-y-6">
              <div>
                <p className="mb-2 text-xs text-[var(--neutral-600)]">间距 12px (space-y-3)</p>
                <div className="space-y-3.5">
                  <Button tone="brand" size="lg" className="w-full">
                    立即购买
                  </Button>
                  <Button variant="outline" tone="brand" size="lg" className="w-full">
                    加入购物车
                  </Button>
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs text-[var(--neutral-600)]">间距 8px (space-y-2)</p>
                <div className="space-y-2.5">
                  <Button tone="product" className="w-full">
                    确认提交
                  </Button>
                  <Button variant="outline" className="w-full">
                    取消
                  </Button>
                </div>
              </div>
            </div>
          </SpecCard>
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Icons"
          title="图标使用"
          description="按钮图标统一来自 Phosphor Icons，并遵循基础规范中的 regular 权重与 16px / 20px 尺寸。纯图标按钮必须提供 tooltip 或可访问标签，避免用户猜测。"
        />
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2">
          <SpecCard title="图标位置">
            <div className="space-y-6">
              <div>
                <p className="mb-2 text-xs text-[var(--neutral-600)]">图标前置 - 标准操作</p>
                <ButtonGroup>
                  <Button icon={<Plus className="h-4 w-4" weight="regular" />}>新建</Button>
                  <Button tone="product" icon={<DownloadSimple className="h-4 w-4" weight="regular" />}>
                    下载
                  </Button>
                </ButtonGroup>
              </div>
              <div>
                <p className="mb-2 text-xs text-[var(--neutral-600)]">图标后置 - 表示方向或延伸</p>
                <ButtonGroup>
                  <Button tone="brand" icon={<ArrowRight className="h-4 w-4" weight="regular" />} iconPosition="right">
                    查看详情
                  </Button>
                  <Button variant="text" tone="product" icon={<ArrowRight className="h-4 w-4" weight="regular" />} iconPosition="right">
                    了解更多
                  </Button>
                </ButtonGroup>
              </div>
              <div>
                <p className="mb-2 text-xs text-[var(--neutral-600)]">纯图标按钮 - 工具栏 / 表格操作</p>
                <p className="mb-3 text-xs leading-5 text-[var(--neutral-500)]">
                  仅保留图标本身，适合编辑、下载、关闭、删除等高频操作；必须配置 title 或 aria-label。
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" icon={<PencilSimple className="h-4 w-4" weight="regular" />} aria-label="编辑" title="编辑" className="h-9 w-9 min-w-9 px-0" />
                  <Button variant="outline" tone="product" icon={<DownloadSimple className="h-4 w-4" weight="regular" />} aria-label="下载" title="下载" className="h-9 w-9 min-w-9 px-0" />
                  <Button variant="outline" icon={<X className="h-4 w-4" weight="regular" />} aria-label="关闭" title="关闭" className="h-9 w-9 min-w-9 px-0" />
                  <Button variant="outline" tone="danger" icon={<Trash className="h-4 w-4" weight="regular" />} aria-label="删除" title="删除" className="h-9 w-9 min-w-9 px-0" />
                </div>
              </div>
            </div>
          </SpecCard>

          <SpecCard title="图标尺寸规范">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm" tone="product" icon={<Plus className="h-3.5 w-3.5" weight="regular" />}>
                  Small
                </Button>
                <span className="text-xs text-[var(--neutral-600)]">14px 图标</span>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button tone="product" icon={<Plus className="h-4 w-4" weight="regular" />}>
                  Medium
                </Button>
                <span className="text-xs text-[var(--neutral-600)]">16px 图标（推荐）</span>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="lg" tone="product" icon={<Plus className="h-5 w-5" weight="regular" />}>
                  Large
                </Button>
                <span className="text-xs text-[var(--neutral-600)]">20px 图标</span>
              </div>
            </div>

            <div className="mt-5 bg-amber-50/50 p-4">
              <p className="text-xs leading-6 text-[var(--neutral-700)]">
                <span className="font-semibold text-[var(--neutral-900)]">图标间距：</span>
                图标与文字间距为 8px (gap-2)，保持视觉平衡。
              </p>
              <p className="mt-1 text-xs leading-6 text-[var(--neutral-700)]">
                <span className="font-semibold text-[var(--neutral-900)]">纯图标按钮：</span>
                应提供 tooltip 或 aria-label，避免用户猜测。
              </p>
            </div>
          </SpecCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Guidelines" title="使用指南与最佳实践" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <SpecCard title="推荐做法">
            <DotList
              items={[
                "<span class='font-semibold text-[var(--neutral-900)]'>单一主按钮：</span>每个页面或区域只应有一个主按钮，突出最重要的操作。",
                "<span class='font-semibold text-[var(--neutral-900)]'>清晰文案：</span>使用动词开头的简洁文案，如“提交订单”“新建数据”。",
                "<span class='font-semibold text-[var(--neutral-900)]'>语义分离：</span>variant 表示层级，tone 表示业务色彩，避免把蓝色称为次按钮。",
                "<span class='font-semibold text-[var(--neutral-900)]'>按钮顺序：</span>取消/关闭等退出操作放左侧，确定/保存等主操作放右侧。",
                "<span class='font-semibold text-[var(--neutral-900)]'>颜色选择：</span>黑色用于主行动，产品蓝用于功能操作，品牌红用于官网关键转化。",
                "<span class='font-semibold text-[var(--neutral-900)]'>多端适配：</span>官网使用大尺寸增强转化，后台使用小尺寸提升效率。",
              ]}
            />
          </SpecCard>

          <SpecCard title="避免做法">
            <DotList
              tone="danger"
              items={[
                "<span class='font-semibold text-[var(--neutral-900)]'>多个主按钮：</span>避免在同一区域放置多个 solid 按钮造成选择困难。",
                "<span class='font-semibold text-[var(--neutral-900)]'>颜色混用：</span>避免在同一组按钮中混用黑色、蓝色、红色主按钮。",
                "<span class='font-semibold text-[var(--neutral-900)]'>语义误用：</span>不要将 product 蓝直接命名为 secondary。",
                "<span class='font-semibold text-[var(--neutral-900)]'>过长文案：</span>避免按钮文字超过 4-6 个字，保持简洁。",
                "<span class='font-semibold text-[var(--neutral-900)]'>尺寸混用：</span>官网和后台应分别使用对应尺寸规范。",
                "<span class='font-semibold text-[var(--neutral-900)]'>纯图标无说明：</span>纯图标按钮必须提供 tooltip 或 aria-label。",
              ]}
            />
          </SpecCard>
        </div>

        <div className="mt-6 bg-[var(--neutral-50)] p-6">
          <h3 className="mb-4 text-base font-semibold text-[var(--neutral-900)]">多端应用场景参考</h3>
          <div className="grid grid-cols-1 gap-5 text-sm md:grid-cols-3">
            <div className="bg-white p-4">
              <p className="mb-2 font-semibold text-[var(--neutral-900)]">官网营销页</p>
              <ul className="space-y-1 text-[var(--neutral-700)]">
                <li>• 使用 Large / X-Large / 2XL 尺寸</li>
                <li>• 黑色主按钮 + 中性描边次按钮</li>
                <li>• 品牌红用于关键转化或促销强调</li>
                <li>• 居中对齐，突出 CTA</li>
              </ul>
            </div>
            <div className="bg-white p-4">
              <p className="mb-2 font-semibold text-[var(--neutral-900)]">数据空间 / 材库 / AI 应用</p>
              <ul className="space-y-1 text-[var(--neutral-700)]">
                <li>• 使用 28px / 32px 尺寸</li>
                <li>• 黑色主按钮 + 产品蓝功能按钮</li>
                <li>• 数据操作保持紧凑且可预测</li>
                <li>• 表格工具栏可使用纯图标按钮</li>
              </ul>
            </div>
            <div className="bg-white p-4">
              <p className="mb-2 font-semibold text-[var(--neutral-900)]">移动端应用</p>
              <ul className="space-y-1 text-[var(--neutral-700)]">
                <li>• 使用 Large / X-Large 尺寸</li>
                <li>• 确保 44px 最小点击区域</li>
                <li>• 垂直排列全宽按钮</li>
                <li>• 主次按钮配色保持一致</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
