import {
  ArrowRight,
  CheckCircle,
  DownloadSimple,
  PencilSimple,
  Plus,
  Trash,
  WarningCircle,
  X,
} from "@phosphor-icons/react";
import PageHeader from "../../../components/docs/PageHeader";
import { SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
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
          <p key={item} className="text-xs leading-[var(--type-caption-line-height)] text-[var(--text-tertiary)]">
            {item}
          </p>
        ))}
      </div>
      {usage ? (
        <p className="mt-2 text-xs leading-[var(--type-caption-line-height)] text-[var(--text-secondary)]">
          <span className="font-semibold text-[var(--text-primary)]">使用场景：</span>
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
    <div className="rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-6">
      <h3 className="mb-5 text-base font-semibold leading-[var(--type-body-l-line-height)] text-[var(--text-primary)]">{title}</h3>
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
    <ul className="space-y-3 text-sm leading-[var(--type-body-m-line-height)] text-[var(--text-secondary)]">
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
          eyebrow="Variants"
          title="按钮类型"
          description="按钮分为主要、次要、弱按钮、文字、危险五种类型。所有按钮统一使用 2px 圆角，悬停和按下状态保持明确但克制。"
        />

        <div className="mb-8">
          <h3 className="mb-4 text-lg font-semibold text-[var(--text-primary)]">主要按钮（Solid）</h3>
          <div className="rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-6">
            <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2 xl:grid-cols-3">
              <div>
                <p className="mb-3 text-sm font-semibold text-[var(--text-primary)]">黑色 - 任务主行动</p>
                <ButtonStack>
                  <Button tone="task">提交审核</Button>
                  <Button tone="task" icon={<Plus className="h-4 w-4" weight="regular" />}>新建项目</Button>
                  <Button tone="task" disabled>禁用状态</Button>
                </ButtonStack>
                <TokenNote
                  items={[
                    "默认: neutral-900 (#1A1A1A)",
                    "悬停: neutral-800 (#2B313A)",
                    "按下: neutral-700 (#4B5563)",
                  ]}
                  usage="提交、确认、发布、创建等推进当前任务的操作"
                />
              </div>

              <div>
                <p className="mb-3 text-sm font-semibold text-[var(--text-primary)]">蓝色 - 产品能力操作</p>
                <ButtonStack>
                  <Button tone="product">运行分析</Button>
                  <Button tone="product">
                    生成报告
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
                  usage="分析、生成、连接等能力型页面的唯一主操作；普通工具栏中使用 outline 或 text"
                />
              </div>

              <div>
                <p className="mb-3 text-sm font-semibold text-[var(--text-primary)]">红色 - 品牌强调</p>
                <ButtonStack>
                  <Button tone="brand">预约演示</Button>
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
          <h3 className="mb-4 text-lg font-semibold text-[var(--text-primary)]">次要按钮（Outline）</h3>
          <div className="rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-6">
            <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2 xl:grid-cols-3">
              <div>
                <p className="mb-3 text-sm font-semibold text-[var(--text-primary)]">中性描边</p>
                <ButtonStack>
                  <Button variant="outline" tone="neutral">返回列表</Button>
                  <Button variant="outline" tone="neutral" icon={<PencilSimple className="h-4 w-4" weight="regular" />}>
                    编辑内容
                  </Button>
                  <Button variant="outline" tone="neutral" disabled>
                    禁用状态
                  </Button>
                </ButtonStack>
                <TokenNote items={[]} usage="与黑色主按钮搭配，承担辅助但仍可见的操作" />
              </div>

              <div>
                <p className="mb-3 text-sm font-semibold text-[var(--text-primary)]">产品描边</p>
                <ButtonStack>
                  <Button variant="outline" tone="product">
                    筛选数据
                  </Button>
                  <Button variant="outline" tone="product" icon={<DownloadSimple className="h-4 w-4" weight="regular" />}>
                    导出数据
                  </Button>
                  <Button variant="outline" tone="product" disabled>
                    禁用状态
                  </Button>
                </ButtonStack>
                <TokenNote items={[]} usage="与产品功能主按钮搭配，适合后台辅助操作" />
              </div>

              <div>
                <p className="mb-3 text-sm font-semibold text-[var(--text-primary)]">品牌描边</p>
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
          <h3 className="mb-4 text-lg font-semibold text-[var(--text-primary)]">弱按钮（Ghost）</h3>
          <div className="rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-6">
            <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2 xl:grid-cols-3">
              <div>
                <p className="mb-3 text-sm font-semibold text-[var(--text-primary)]">中性弱按钮（推荐）</p>
                <ButtonStack>
                  <Button variant="ghost" tone="neutral">取消</Button>
                  <Button variant="ghost" tone="neutral">关闭</Button>
                  <Button variant="ghost" tone="neutral" disabled>
                    禁用状态
                  </Button>
                </ButtonStack>
              </div>
              <div>
                <p className="mb-3 text-sm font-semibold text-[var(--text-primary)]">产品弱按钮</p>
                <ButtonStack>
                  <Button variant="ghost" tone="product">
                    刷新数据
                  </Button>
                  <Button variant="ghost" tone="product">切换视图</Button>
                  <Button variant="ghost" tone="product" disabled>
                    禁用状态
                  </Button>
                </ButtonStack>
              </div>
              <div>
                <p className="mb-3 text-sm font-semibold text-[var(--text-primary)]">品牌弱按钮</p>
                <ButtonStack>
                  <Button variant="ghost" tone="brand">
                    查看权益
                  </Button>
                  <Button variant="ghost" tone="brand">品牌故事</Button>
                  <Button variant="ghost" tone="brand" disabled>
                    禁用状态
                  </Button>
                </ButtonStack>
              </div>
            </div>
            <div className="mt-5 rounded-[var(--radius-sm)] border border-[var(--warning-border)] bg-[var(--warning-bg)] p-4">
              <p className="text-xs leading-6 text-[var(--text-secondary)]">
                <span className="font-semibold text-[var(--text-primary)]">设计说明：</span>
                neutral 弱按钮用于“取消”“关闭”等退出操作；product 与 brand 弱按钮仍需使用符合各自语义的能力或品牌文案。
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="mb-4 text-lg font-semibold text-[var(--text-primary)]">文字按钮（Text）</h3>
          <div className="rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-6">
            <div className="grid grid-cols-1 gap-x-8 gap-y-8 text-left md:grid-cols-2 xl:grid-cols-3">
              <div>
                <p className="mb-3 text-sm font-semibold text-[var(--text-primary)]">中性文字</p>
                <ButtonStack>
                  <Button variant="text" tone="neutral">返回列表</Button>
                  <Button variant="text" tone="neutral">稍后处理</Button>
                  <Button variant="text" tone="neutral" disabled>
                    禁用状态
                  </Button>
                </ButtonStack>
              </div>
              <div>
                <p className="mb-3 text-sm font-semibold text-[var(--text-primary)]">产品文字</p>
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
                <p className="mb-3 text-sm font-semibold text-[var(--text-primary)]">品牌文字</p>
                <ButtonStack>
                  <Button variant="text" tone="brand">
                    品牌故事
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
          <h3 className="mb-4 text-lg font-semibold text-[var(--text-primary)]">危险按钮（Danger）</h3>
          <div className="rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-6">
            <ButtonGroup>
              <Button tone="danger" icon={<Trash className="h-4 w-4" weight="regular" />}>
                永久删除
              </Button>
              <Button variant="outline" tone="danger">
                撤销审批
              </Button>
              <Button variant="text" tone="danger">
                移除成员
              </Button>
            </ButtonGroup>
            <div className="mt-4 rounded-[var(--radius-sm)] border border-[var(--error-border)] bg-[var(--error-bg)] p-4">
              <p className="text-xs leading-6 text-[var(--text-secondary)]">
                <span className="font-semibold text-[var(--text-primary)]">颜色规范：</span>
                小字与描边使用 `--error-text`；实心按钮使用更鲜明的 `--error-solid`（#F53F3F）。两者语义一致，但面积与对比需求不同。
              </p>
              <p className="mt-1 text-xs leading-6 text-[var(--text-secondary)]">
                <span className="font-semibold text-[var(--text-primary)]">使用场景：</span>
                永久删除、撤销审批、停用账号等不可逆或高风险操作，必须添加二次确认。
              </p>
            </div>
            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="bg-white p-4 ring-1 ring-[var(--neutral-200)]">
                <ButtonGroup>
                  <Button tone="warning" icon={<WarningCircle className="h-4 w-4" weight="regular" />}>
                    继续执行
                  </Button>
                  <Button variant="outline" tone="warning">
                    查看风险
                  </Button>
                  <Button variant="text" tone="warning">
                    稍后处理
                  </Button>
                </ButtonGroup>
                <p className="mt-3 border-t border-[var(--neutral-200)] pt-3 text-xs leading-6 text-[var(--text-secondary)]">
                  <span className="font-semibold text-[var(--text-primary)]">警告按钮：</span>
                  用于临界状态、风险确认、需要用户关注但尚未造成错误的操作，不用于普通提醒。
                </p>
              </div>
              <div className="bg-white p-4 ring-1 ring-[var(--neutral-200)]">
                <ButtonGroup>
                  <Button tone="success" icon={<CheckCircle className="h-4 w-4" weight="regular" />}>
                    标记完成
                  </Button>
                  <Button variant="outline" tone="success">
                    查看结果
                  </Button>
                  <Button variant="text" tone="success">
                    继续配置
                  </Button>
                </ButtonGroup>
                <p className="mt-3 border-t border-[var(--neutral-200)] pt-3 text-xs leading-6 text-[var(--text-secondary)]">
                  <span className="font-semibold text-[var(--text-primary)]">成功按钮：</span>
                  仅用于明确的正向状态操作。普通提交仍使用 task，产品能力仍使用 product。
                </p>
              </div>
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
                  <p className="text-sm font-semibold text-[var(--text-primary)]">Large - 40px</p>
                  <p className="text-xs text-[var(--text-tertiary)]">常规尺寸</p>
                </div>
                <ButtonGroup>
                  <Button size="lg" variant="outline" tone="neutral" className="!h-10 px-6 text-base">
                    查看方案
                  </Button>
                  <Button size="lg" tone="brand" className="!h-10 px-6 text-base">
                    预约演示
                  </Button>
                </ButtonGroup>
                <p className="mt-2 text-xs text-[var(--text-tertiary)]">内间距: 24px 水平 / 10px 垂直 · 字号: 16px</p>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">X-Large - 48px</p>
                  <p className="text-xs text-[var(--text-tertiary)]">强调尺寸</p>
                </div>
                <ButtonGroup>
                  <Button size="xl" variant="outline" tone="neutral">了解产品</Button>
                  <Button size="xl" tone="brand">
                    开始体验
                  </Button>
                </ButtonGroup>
                <p className="mt-2 text-xs text-[var(--text-tertiary)]">内间距: 32px 水平 / 12px 垂直 · 字号: 18px</p>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">2XL - 56px</p>
                  <p className="text-xs text-[var(--text-tertiary)]">超大尺寸</p>
                </div>
                <ButtonGroup>
                  <Button size="2xl" variant="outline" tone="neutral">查看案例</Button>
                  <Button size="2xl" tone="brand">
                    预约咨询
                  </Button>
                </ButtonGroup>
                <p className="mt-2 text-xs text-[var(--text-tertiary)]">内间距: 40px 水平 / 14px 垂直 · 字号: 20px</p>
              </div>
            </div>
            <div className="mt-5 rounded-[var(--radius-sm)] bg-[var(--neutral-50)] p-4 text-xs leading-6 text-[var(--text-secondary)]">
              官网转化区同样只保留一个 solid。品牌活动使用品牌红，事务型入口使用 task 黑色；同一组不并列两个实心主按钮。
            </div>
          </SpecCard>

          <SpecCard title="后台 / 管理端">
            <div className="space-y-5">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">Small - 28px</p>
                  <p className="text-xs text-[var(--text-tertiary)]">最小尺寸</p>
                </div>
                <ButtonGroup>
                  <Button size="sm" tone="task">新建数据</Button>
                  <Button size="sm" variant="outline" tone="product">
                    导出
                  </Button>
                </ButtonGroup>
                <p className="mt-2 text-xs text-[var(--text-tertiary)]">高度: 28px · 字号: 14px · 用于表格行内、紧凑工具栏</p>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">Medium - 32px</p>
                  <p className="text-xs text-[var(--text-tertiary)]">标准尺寸（推荐）</p>
                </div>
                <ButtonGroup>
                  <Button size="md" tone="task">确认提交</Button>
                  <Button size="md" variant="outline" tone="task">
                    保存草稿
                  </Button>
                </ButtonGroup>
                <p className="mt-2 text-xs text-[var(--text-tertiary)]">高度: 32px · 字号: 14px · 用于表单、筛选、常规提交</p>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">Large - 36px</p>
                  <p className="text-xs text-[var(--text-tertiary)]">最大尺寸</p>
                </div>
                <ButtonGroup>
                  <Button size="lg" tone="task">确认操作</Button>
                  <Button size="lg" variant="outline" tone="product" icon={<ArrowRight className="h-5 w-5" weight="regular" />} iconPosition="right">
                    预览结果
                  </Button>
                </ButtonGroup>
                <p className="mt-2 text-xs text-[var(--text-tertiary)]">高度: 36px · 字号: 14px · 用于弹窗主操作、页面级关键操作</p>
              </div>
            </div>
            <div className="mt-5 bg-[var(--neutral-50)] p-4 text-xs leading-6 text-[var(--text-secondary)]">
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
          <SpecCard title="任务主按钮状态">
            <ButtonStack>
              <Button tone="task">默认</Button>
              <Button tone="task" className="bg-[var(--color-action-task-hover)] shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]">悬停</Button>
              <Button tone="task" className="bg-[var(--color-action-task-active)]">按下</Button>
              <Button tone="task" loading>加载</Button>
              <Button tone="task" disabled>禁用</Button>
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
              <Button variant="outline" tone="neutral">默认</Button>
              <Button variant="outline" tone="neutral" className="bg-[var(--neutral-50)] shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]">
                悬停
              </Button>
              <Button variant="outline" tone="neutral" className="bg-[var(--neutral-100)]">
                按下
              </Button>
              <Button variant="outline" tone="neutral" loading>
                加载
              </Button>
              <Button variant="outline" tone="neutral" disabled>
                禁用
              </Button>
            </ButtonStack>
          </SpecCard>

          <SpecCard title="弱按钮状态">
            <ButtonStack>
              <Button variant="ghost" tone="neutral">默认</Button>
              <Button variant="ghost" tone="neutral" className="bg-[var(--neutral-200)]">
                悬停
              </Button>
              <Button variant="ghost" tone="neutral" className="bg-[var(--neutral-300)]">
                按下
              </Button>
              <Button variant="ghost" tone="neutral" loading>
                加载
              </Button>
              <Button variant="ghost" tone="neutral" disabled>
                禁用
              </Button>
            </ButtonStack>
          </SpecCard>

          <SpecCard title="危险操作状态">
            <ButtonStack>
              <Button tone="danger">默认</Button>
              <Button tone="danger" className="bg-[var(--error-solid-hover)] shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]">
                悬停
              </Button>
              <Button tone="danger" className="bg-[var(--error-solid-active)]">
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
                <p className="mb-2 text-xs text-[var(--text-tertiary)]">间距 12px (gap-3) - 推荐</p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="ghost" tone="neutral">取消</Button>
                  <Button tone="task">确定</Button>
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs text-[var(--text-tertiary)]">间距 8px (gap-2) - 紧凑场景</p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="ghost" tone="neutral" size="sm">
                    取消
                  </Button>
                  <Button tone="task" size="sm">
                    保存
                  </Button>
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs text-[var(--text-tertiary)]">间距 16px (gap-4) - 官网场景</p>
                <div className="flex flex-wrap gap-4">
                  <Button variant="ghost" tone="neutral" size="xl">
                    取消
                  </Button>
                  <Button tone="task" size="xl">开始使用</Button>
                </div>
              </div>
            </div>
          </SpecCard>

          <SpecCard title="垂直排列（移动端）">
            <div className="space-y-6">
              <div>
                <p className="mb-2 text-xs text-[var(--text-tertiary)]">间距 14px (space-y-3.5)</p>
                <div className="space-y-3.5">
                  <Button tone="brand" size="lg" className="w-full">
                    预约演示
                  </Button>
                  <Button variant="outline" tone="brand" size="lg" className="w-full">
                    查看方案
                  </Button>
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs text-[var(--text-tertiary)]">间距 8px (space-y-2)</p>
                <div className="space-y-2.5">
                  <Button tone="task" className="w-full">
                    确认提交
                  </Button>
                  <Button variant="outline" tone="neutral" className="w-full">
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
                <p className="mb-2 text-xs text-[var(--text-tertiary)]">图标前置 - 标准操作</p>
                <ButtonGroup>
                  <Button tone="task" icon={<Plus className="h-4 w-4" weight="regular" />}>新建</Button>
                  <Button variant="outline" tone="product" icon={<DownloadSimple className="h-4 w-4" weight="regular" />}>
                    下载
                  </Button>
                </ButtonGroup>
              </div>
              <div>
                <p className="mb-2 text-xs text-[var(--text-tertiary)]">图标后置 - 表示方向或延伸</p>
                <ButtonGroup>
                  <Button tone="brand" icon={<ArrowRight className="h-4 w-4" weight="regular" />} iconPosition="right">
                    预约演示
                  </Button>
                  <Button variant="text" tone="product" icon={<ArrowRight className="h-4 w-4" weight="regular" />} iconPosition="right">
                    了解更多
                  </Button>
                </ButtonGroup>
              </div>
              <div>
                <p className="mb-2 text-xs text-[var(--text-tertiary)]">纯图标按钮 - 工具栏 / 表格操作</p>
                <p className="mb-3 text-xs leading-5 text-[var(--text-tertiary)]">
                  仅保留图标本身，适合编辑、下载、关闭、删除等高频操作；必须配置 title 或 aria-label。
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    aria-label="编辑"
                    title="编辑"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-sm)] bg-white text-[var(--text-secondary)] transition-colors hover:bg-[var(--neutral-100)] hover:text-[var(--text-primary)] md:h-8 md:w-8"
                  >
                    <PencilSimple className="h-4 w-4" weight="regular" />
                  </button>
                  <button
                    type="button"
                    aria-label="下载"
                    title="下载"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-sm)] bg-white text-[var(--text-secondary)] transition-colors hover:bg-[var(--neutral-100)] hover:text-[var(--text-primary)] md:h-8 md:w-8"
                  >
                    <DownloadSimple className="h-4 w-4" weight="regular" />
                  </button>
                  <button
                    type="button"
                    aria-label="关闭"
                    title="关闭"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--neutral-100)] text-[var(--text-primary)] transition-colors hover:bg-[var(--neutral-200)] md:h-8 md:w-8"
                  >
                    <X className="h-4 w-4" weight="regular" />
                  </button>
                  <button
                    type="button"
                    aria-label="删除"
                    title="删除"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-sm)] bg-white text-[var(--error-text)] transition-colors hover:bg-[var(--error-bg)] md:h-8 md:w-8"
                  >
                    <Trash className="h-4 w-4" weight="regular" />
                  </button>
                  <button
                    type="button"
                    disabled
                    aria-label="禁用编辑"
                    title="禁用编辑"
                    className="inline-flex h-11 w-11 cursor-not-allowed items-center justify-center rounded-[var(--radius-sm)] bg-white text-[var(--neutral-400)] md:h-8 md:w-8"
                  >
                    <PencilSimple className="h-4 w-4" weight="regular" />
                  </button>
                </div>
                <div className="mt-3 grid grid-cols-1 gap-2 text-xs leading-5 text-[var(--text-tertiary)] sm:grid-cols-3">
                  <p><span className="font-semibold text-[var(--text-primary)]">尺寸：</span>32×32px，图标 16px。</p>
                  <p><span className="font-semibold text-[var(--text-primary)]">状态：</span>默认、悬停、禁用必须可区分。</p>
                  <p><span className="font-semibold text-[var(--text-primary)]">来源：</span>Phosphor regular，线性风格。</p>
                </div>
              </div>
            </div>
          </SpecCard>

          <SpecCard title="图标尺寸规范">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm" tone="product" icon={<DownloadSimple className="h-3.5 w-3.5" weight="regular" />}>
                  导出
                </Button>
                <span className="text-xs text-[var(--text-tertiary)]">14px 图标</span>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button tone="product" icon={<DownloadSimple className="h-4 w-4" weight="regular" />}>
                  导出数据
                </Button>
                <span className="text-xs text-[var(--text-tertiary)]">16px 图标（推荐）</span>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="lg" tone="product" icon={<DownloadSimple className="h-5 w-5" weight="regular" />}>
                  导出报告
                </Button>
                <span className="text-xs text-[var(--text-tertiary)]">20px 图标</span>
              </div>
            </div>

            <div className="mt-5 rounded-[var(--radius-sm)] border border-[var(--warning-border)] bg-[var(--warning-bg)] p-4">
              <p className="text-xs leading-6 text-[var(--text-secondary)]">
                <span className="font-semibold text-[var(--text-primary)]">图标间距：</span>
                图标与文字间距为 8px (gap-2)，保持视觉平衡。
              </p>
              <p className="mt-1 text-xs leading-6 text-[var(--text-secondary)]">
                <span className="font-semibold text-[var(--text-primary)]">纯图标按钮：</span>
                应提供 tooltip 或 aria-label，避免用户猜测。
              </p>
            </div>
          </SpecCard>
        </div>
      </section>
<section>
        <SectionHeading
          eyebrow="Button Semantics"
          title="按钮语义模型"
          description="按钮层级由 variant 决定，操作意图由 tone 决定。黑色 task 推进当前任务，蓝色 product 调用产品能力；它们不是主次色关系。"
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <SpecCard title="视觉层级（variant）">
            <div className="space-y-3 text-sm text-[var(--text-secondary)]">
              <p>
                <span className="font-semibold text-[var(--text-primary)]">solid：</span>
                主行动按钮，承载页面或区域内最关键操作。
              </p>
              <p>
                <span className="font-semibold text-[var(--text-primary)]">outline：</span>
                次要按钮，与主按钮搭配使用，保留操作可见性但降低视觉权重。
              </p>
              <p>
                <span className="font-semibold text-[var(--text-primary)]">ghost：</span>
                弱按钮，常用于取消、关闭、轻量退出。
              </p>
              <p>
                <span className="font-semibold text-[var(--text-primary)]">text：</span>
                文字按钮，用于低优先级操作、链接跳转、辅助入口。
              </p>
            </div>
          </SpecCard>
          <SpecCard title="业务色彩（tone）">
            <div className="space-y-3 text-sm text-[var(--text-secondary)]">
              <p>
                <span className="font-semibold text-[var(--text-primary)]">task：</span>
                任务主行动，用于提交、确认、发布、创建等改变业务流程的操作。
              </p>
              <p>
                <span className="font-semibold text-[var(--text-primary)]">neutral：</span>
                中性退出或辅助操作，用于取消、返回、关闭；neutral + solid 仅作旧代码兼容。
              </p>
              <p>
                <span className="font-semibold text-[var(--text-primary)]">product：</span>
                产品能力操作，用于分析、生成、连接、筛选、导出和跳转等可重复或可撤回功能。
              </p>
              <p>
                <span className="font-semibold text-[var(--text-primary)]">brand：</span>
                官网营销、品牌强调、关键转化，不用于常规后台操作。
              </p>
              <p>
                <span className="font-semibold text-[var(--text-primary)]">danger：</span>
                删除、取消、不可逆风险操作，使用错误语义色，不混用品牌红。
              </p>
            </div>
          </SpecCard>
        </div>
      </section>
<section>
        <SectionHeading
          eyebrow="Task vs Product"
          title="黑色与蓝色如何共同使用"
          description="先判断操作意图，再决定颜色。每个操作组只能有一个 solid；有黑色任务主行动时，蓝色能力操作必须降为 outline 或 text。"
        />
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[0.9fr_1.4fr]">
          <SpecCard title="操作颜色决策顺序">
            <ol className="space-y-4 text-sm leading-6 text-[var(--text-secondary)]">
              {[
                ["1", "是否不可逆或危险？", "使用 danger，例如删除、撤销审批。"],
                ["2", "是否提交或改变业务流程？", "使用 task，例如提交、确认、发布、创建。"],
                ["3", "是否调用可重复或可撤回的产品能力？", "使用 product，例如分析、生成、连接、筛选、导出。"],
                ["4", "是否取消、返回或关闭？", "使用 neutral，并采用 ghost、outline 或 text。"],
              ].map(([index, question, result]) => (
                <li key={index} className="grid grid-cols-[28px_1fr] gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--neutral-900)] text-xs text-white">{index}</span>
                  <div>
                    <p className="font-semibold text-[var(--text-primary)]">{question}</p>
                    <p>{result}</p>
                  </div>
                </li>
              ))}
            </ol>
          </SpecCard>

          <div className="overflow-x-auto rounded-sm border border-[var(--neutral-200)] bg-white">
            <div className="min-w-[720px]">
              <div className="grid grid-cols-[140px_1fr_1fr] border-b border-[var(--neutral-200)] bg-[var(--neutral-50)] px-5 py-3 text-xs font-semibold text-[var(--text-secondary)]">
                <span>场景</span><span>黑色 task</span><span>蓝色 product</span>
              </div>
              {[
                ["表单底部", "提交、保存修改", "保存草稿使用 outline"],
                ["表格工具栏", "新建数据", "筛选、导出、下载使用 outline/text"],
                ["分析面板", "没有任务提交时不出现", "运行分析、生成结果可使用 solid"],
                ["普通弹窗", "确认、完成", "辅助能力使用 outline"],
                ["危险确认", "不使用", "不使用，主操作改用 danger"],
                ["导航与链接", "不使用", "使用 text"],
              ].map(([scene, task, product]) => (
                <div key={scene} className="grid grid-cols-[140px_1fr_1fr] border-b border-[var(--neutral-100)] px-5 py-4 text-sm last:border-b-0">
                  <strong className="text-[var(--text-primary)]">{scene}</strong>
                  <span className="text-[var(--text-secondary)]">{task}</span>
                  <span className="text-[var(--text-secondary)]">{product}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">
          <SpecCard title="表单：任务推进为主">
            <div className="rounded-sm bg-[var(--neutral-50)] p-4">
              <p className="mb-4 text-sm text-[var(--text-secondary)]">完成材料信息编辑并提交审核。</p>
              <div className="flex flex-wrap justify-end gap-3">
                <Button variant="ghost" tone="neutral">取消</Button>
                <Button variant="outline" tone="task">保存草稿</Button>
                <Button tone="task">提交审核</Button>
              </div>
            </div>
          </SpecCard>
          <SpecCard title="分析面板：产品能力为主">
            <div className="rounded-sm bg-[var(--neutral-50)] p-4">
              <p className="mb-4 text-sm text-[var(--text-secondary)]">根据当前参数重新计算材料性能预测。</p>
              <div className="flex flex-wrap justify-end gap-3">
                <Button variant="ghost" tone="neutral">重置参数</Button>
                <Button tone="product">运行分析</Button>
              </div>
            </div>
          </SpecCard>
          <SpecCard title="弹窗：禁止黑蓝双实心">
            <div className="rounded-sm bg-[var(--neutral-50)] p-4">
              <p className="mb-4 text-sm text-[var(--text-secondary)]">确认发布当前版本？发布后将进入正式流程。</p>
              <div className="flex flex-wrap justify-end gap-3">
                <Button variant="ghost" tone="neutral">取消</Button>
                <Button variant="outline" tone="product">预览版本</Button>
                <Button tone="task">确认发布</Button>
              </div>
            </div>
          </SpecCard>
        </div>

        <div className="mt-5 rounded-[var(--radius-sm)] border border-[var(--warning-border)] bg-[var(--warning-bg)] px-5 py-4 text-sm leading-6 text-[var(--text-secondary)]">
          <strong className="text-[var(--text-primary)]">唯一主操作原则：</strong>
          同一按钮组最多一个 solid。黑色 task solid 已存在时，蓝色 product 必须降为 outline 或 text；能力型页面没有任务提交时，蓝色 product 才可以成为唯一 solid。
        </div>
      </section>

            <section>
        <SectionHeading eyebrow="Guidelines" title="最佳实践" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <SpecCard title="推荐做法">
            <DotList
              items={[
                "<span class='font-semibold text-[var(--text-primary)]'>单一主按钮：</span>每个页面或区域只应有一个主按钮，突出最重要的操作。",
                "<span class='font-semibold text-[var(--text-primary)]'>清晰文案：</span>使用动词开头的简洁文案，如提交订单、新建数据。",
                "<span class='font-semibold text-[var(--text-primary)]'>语义分离：</span>variant 表示层级，tone 表示操作意图；task 推进任务，product 调用能力。",
                "<span class='font-semibold text-[var(--text-primary)]'>按钮顺序：</span>取消/关闭等退出操作放左侧，确定/保存等主操作放右侧。",
                "<span class='font-semibold text-[var(--text-primary)]'>颜色选择：</span>黑色用于提交、确认、发布、创建；蓝色用于分析、生成、连接、筛选、导出。",
                "<span class='font-semibold text-[var(--text-primary)]'>多端适配：</span>官网使用大尺寸增强转化，后台使用小尺寸提升效率。",
              ]}
            />
          </SpecCard>

          <SpecCard title="避免做法">
            <DotList
              tone="danger"
              items={[
                "<span class='font-semibold text-[var(--text-primary)]'>多个主按钮：</span>避免在同一区域放置多个 solid 按钮造成选择困难。",
                "<span class='font-semibold text-[var(--text-primary)]'>颜色混用：</span>禁止在同一操作组中并列黑色 task solid 与蓝色 product solid。",
                "<span class='font-semibold text-[var(--text-primary)]'>语义误用：</span>不要将 product 蓝直接命名为 secondary。",
                "<span class='font-semibold text-[var(--text-primary)]'>过长文案：</span>避免按钮文字超过 4-6 个字，保持简洁。",
                "<span class='font-semibold text-[var(--text-primary)]'>尺寸混用：</span>官网和后台应分别使用对应尺寸规范。",
                "<span class='font-semibold text-[var(--text-primary)]'>纯图标无说明：</span>纯图标按钮必须提供 tooltip 或 aria-label。",
              ]}
            />
          </SpecCard>
        </div>

        <div className="mt-6 bg-[var(--neutral-50)] p-6">
          <h3 className="mb-4 text-base font-semibold text-[var(--text-primary)]">多端应用场景参考</h3>
          <div className="grid grid-cols-1 gap-5 text-sm md:grid-cols-3">
            <div className="bg-white p-4">
              <p className="mb-2 font-semibold text-[var(--text-primary)]">官网营销页</p>
              <ul className="space-y-1 text-[var(--text-secondary)]">
                <li> 使用 Large / X-Large / 2XL 尺寸</li>
                <li> 黑色主按钮 + 中性描边次按钮</li>
                <li> 品牌红用于关键转化或促销强调</li>
                <li> 居中对齐，突出 CTA</li>
              </ul>
            </div>
            <div className="bg-white p-4">
              <p className="mb-2 font-semibold text-[var(--text-primary)]">数据空间 / 材库 / AI 应用</p>
              <ul className="space-y-1 text-[var(--text-secondary)]">
                <li> 使用 28px / 32px 尺寸</li>
                <li> 黑色 task 推进任务，蓝色 product 调用能力</li>
                <li> 同组只有一个 solid，另一操作降为 outline/text</li>
                <li> 数据操作保持紧凑且可预测</li>
                <li> 表格工具栏可使用纯图标按钮</li>
              </ul>
            </div>
            <div className="bg-white p-4">
              <p className="mb-2 font-semibold text-[var(--text-primary)]">移动端应用</p>
              <ul className="space-y-1 text-[var(--text-secondary)]">
                <li> 使用 Large / X-Large 尺寸</li>
                <li> 确保 44px 最小点击区域</li>
                <li> 垂直排列全宽按钮</li>
                <li> 主次按钮配色保持一致</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
