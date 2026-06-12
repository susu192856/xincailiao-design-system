import { DotsThree, HouseSimple, LockKey, Path, WarningCircle } from "@phosphor-icons/react";
import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import { Breadcrumb } from "../../../components/ui/Breadcrumb";
import { Tag } from "../../../components/ui/Tag";

export default function BreadcrumbPage() {
  return (
    <div className="space-y-16">
      <PageHeader title="面包屑" description="面包屑用于表达当前位置与页面层级，适合后台详情页、数据目录、材料详情和多级业务流程。" />

      <section>
        <SectionHeading eyebrow="Variants" title="层级结构" description="一级页面通常不放面包屑，二级及更深层级在内容标题上方展示路径，帮助用户判断当前位置和返回路径。" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="二级页面" description="用于列表页、管理页和模块首页。">
            <div className="space-y-4">
              <Breadcrumb items={[{ label: "首页", href: "/" }, { label: "材料数据", current: true }]} />
              <div className="rounded-sm bg-[var(--neutral-50)] p-4">
                <h3 className="text-base font-semibold text-[var(--neutral-900)]">材料数据</h3>
                <p className="mt-2 text-sm text-[var(--neutral-600)]">统一接入、治理和查看材料数据资产。</p>
              </div>
            </div>
          </ExampleCard>
          <ExampleCard title="三级详情" description="用于材料详情、流程详情和审批详情。">
            <div className="space-y-4">
              <Breadcrumb
                items={[
                  { label: "首页", href: "/" },
                  { label: "材料数据", href: "#" },
                  { label: "TC4 钛合金", current: true },
                ]}
              />
              <div className="rounded-sm bg-[var(--neutral-50)] p-4">
                <h3 className="text-base font-semibold text-[var(--neutral-900)]">TC4 钛合金</h3>
                <p className="mt-2 text-sm text-[var(--neutral-600)]">成分、工艺、组织、性能与来源记录。</p>
              </div>
            </div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="States" title="后台常见状态" description="面包屑不是装饰导航，必须在复杂后台路径中稳定、简短、可判断。" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <ExampleCard title="长路径折叠">
            <div className="space-y-4">
              <div className="flex h-10 items-center rounded-sm bg-[var(--neutral-50)] px-3">
                <Breadcrumb
                  maxItems={4}
                  items={[
                    { label: "首页", href: "/" },
                    { label: "数据空间", href: "#" },
                    { label: "项目空间", href: "#" },
                    { label: "材料目录", href: "#" },
                    { label: "热处理数据", href: "#" },
                    { label: "详情", current: true },
                  ]}
                />
              </div>
              <p className="text-xs leading-5 text-[var(--neutral-600)]">超过四级时保留首页、最近层级和当前页，中间层级折叠。</p>
            </div>
          </ExampleCard>
          <ExampleCard title="权限不可达">
            <div className="space-y-4">
              <Breadcrumb
                items={[
                  { label: "首页", href: "/" },
                  { label: "数据空间", href: "#" },
                  { label: "权限配置", disabled: true },
                  { label: "成员详情", current: true },
                ]}
              />
              <Tag icon={<LockKey size={13} weight="regular" />}>权限受限</Tag>
            </div>
          </ExampleCard>
          <ExampleCard title="流程节点">
            <div className="space-y-4">
              <Breadcrumb
                items={[
                  { label: "数据治理", href: "#" },
                  { label: "解析任务", href: "#" },
                  { label: "异常处理", current: true },
                ]}
              />
              <Tag variant="warning" icon={<WarningCircle size={13} weight="regular" />}>
                待处理
              </Tag>
            </div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Composition" title="页面组合示例" description="面包屑应服务内容结构，不放在全局顶栏内挤占产品名称、搜索、通知和用户入口。" />
        <div className="rounded-sm bg-white p-6">
          <div className="overflow-hidden rounded-sm border border-[var(--neutral-200)]">
            <div className="flex h-12 items-center justify-between border-b border-[var(--neutral-200)] bg-[var(--neutral-50)] px-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-[var(--neutral-900)]">
                <HouseSimple size={16} weight="regular" />
                新材料可信数据空间
              </div>
              <DotsThree size={18} weight="regular" className="text-[var(--neutral-500)]" />
            </div>
            <div className="p-5">
              <Breadcrumb
                items={[
                  { label: "首页", href: "/" },
                  { label: "数据资产", href: "#" },
                  { label: "材料详情", current: true },
                ]}
              />
              <div className="mt-4 flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-[var(--neutral-50)] text-[var(--neutral-700)]">
                  <Path size={18} weight="regular" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--neutral-900)]">材料详情</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--neutral-600)]">当前页标题和面包屑分离，用户能同时看清页面主题与来源路径。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Guidelines" title="使用建议" />
        <SpecList
          items={[
            "一级页面通常不需要面包屑，避免与侧栏和页面标题重复。",
            "二级和三级页面将面包屑放在内容标题上方，不放入顶部状态栏。",
            "当前页不可点击，颜色使用 neutral-900，历史层级使用 neutral-500。",
            "长路径需要折叠，Figma 组件需包含二级、三级、长路径、禁用四类状态。",
          ]}
        />
      </section>
    </div>
  );
}
