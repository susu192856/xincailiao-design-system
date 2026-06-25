import { ChartLine, Database, FileText, LockKey, Plus, WarningCircle } from "@phosphor-icons/react";
import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import { Badge } from "../../../components/ui/Badge";
import { Button } from "../../../components/ui/Button";
import { Card, CardActions, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/Card";
import { Tag } from "../../../components/ui/Tag";

export default function CardPage() {
  return (
    <div className="space-y-16">
      <PageHeader title="卡片" description="卡片用于承载一组完整信息，适合数据资产、功能入口、状态摘要和模块化内容。" />

      <section>
        <SectionHeading eyebrow="Variants" title="卡片类型" description="卡片只用于独立信息单元，不作为页面大分区的默认容器。后台场景优先保持白底、浅灰信息区和明确操作层级。" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <Card variant="outlined" status="brand">
            <CardHeader>
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-sm bg-[var(--neutral-50)] text-[var(--text-secondary)]">
                <Database size={18} weight="regular" />
              </div>
              <CardTitle>数据资产卡片</CardTitle>
              <CardDescription>承载材料数据资产摘要和状态。</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Tag variant="brand">关键节点</Tag>
              <Tag>已治理</Tag>
            </CardContent>
          </Card>
          <Card variant="outlined" status="product">
            <CardHeader>
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-sm bg-[var(--neutral-50)] text-[var(--text-secondary)]">
                <FileText size={18} weight="regular" />
              </div>
              <CardTitle>功能入口卡片</CardTitle>
              <CardDescription>用于工作台、首页和能力入口。</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button size="sm" icon={<Plus size={15} weight="regular" />}>
                进入模块
              </Button>
            </CardFooter>
          </Card>
          <Card variant="outlined" status="product">
            <CardHeader>
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-[var(--neutral-50)] text-[var(--text-secondary)]">
                  <ChartLine size={18} weight="regular" />
                </div>
                <Badge count={12} tone="product" size="sm" />
              </div>
              <CardTitle>状态摘要卡片</CardTitle>
              <CardDescription>用于指标、任务和流程概览。</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="font-data text-3xl font-semibold text-[var(--text-primary)]">128</div>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">本周新增数据集</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="States" title="卡片状态" description="后台卡片需要表达可点击、已选中、加载、空数据和权限限制，不依赖大阴影或大面积色块。" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Card variant="outlined" interactive selected status="product">
            <CardHeader>
              <CardTitle>选中数据集</CardTitle>
              <CardDescription>用于数据集选择、批量配置和可切换方案。</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-3">
              {["成分", "工艺", "性能"].map((item) => (
                <div key={item} className="rounded-sm bg-[var(--neutral-50)] p-3 text-sm text-[var(--text-secondary)]">
                  {item}
                </div>
              ))}
            </CardContent>
          </Card>
          <Card variant="outlined" loading status="product">
            <CardHeader>
              <CardTitle>加载状态</CardTitle>
              <CardDescription>数据计算或接口等待时保留卡片结构。</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-24 rounded-sm bg-[var(--neutral-50)]" />
            </CardContent>
          </Card>
          <Card variant="muted" status="warning">
            <CardHeader>
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-sm bg-white text-[var(--text-tertiary)]">
                <WarningCircle size={18} weight="regular" />
              </div>
              <CardTitle>空数据状态</CardTitle>
              <CardDescription>卡片内暂无内容时提供下一步入口，不留空白容器。</CardDescription>
            </CardHeader>
            <CardFooter className="border-none pt-0">
              <Button size="sm" variant="outline">
                创建数据集
              </Button>
            </CardFooter>
          </Card>
          <Card variant="muted" disabled>
            <CardHeader>
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-sm bg-white text-[var(--text-tertiary)]">
                <LockKey size={18} weight="regular" />
              </div>
              <CardTitle>权限限制</CardTitle>
              <CardDescription>用户能看到模块存在，但不能进入高权限操作。</CardDescription>
            </CardHeader>
            <CardContent>
              <Tag>仅管理员可配置</Tag>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Header Actions" title="标题与操作区" description="后台卡片标题区常包含状态、辅助操作和唯一主操作，操作数量需要保持克制。" />
        <ExampleCard title="带操作区卡片">
          <Card variant="outlined" status="product">
            <CardHeader className="flex items-start justify-between gap-4">
              <div>
                <CardTitle>数据治理任务</CardTitle>
                <CardDescription>展示解析、清洗、标准化和发布的当前进度。</CardDescription>
              </div>
              <CardActions>
                <Button size="sm" variant="ghost">导出</Button>
                <Button size="sm" tone="product">新建任务</Button>
              </CardActions>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-3 md:grid-cols-4">
              {[
                ["解析中", "12"],
                ["待复核", "8"],
                ["已发布", "128"],
                ["异常", "3"],
              ].map(([label, value], index) => (
                <div key={label} className="rounded-sm bg-[var(--neutral-50)] p-3">
                  <div className="font-data text-xl font-semibold text-[var(--text-primary)]">{value}</div>
                  <p className="mt-1 text-xs text-[var(--text-tertiary)]">{label}</p>
                  {index === 3 ? <div className="mt-2 h-1 w-5 bg-[var(--brand-600)]" /> : null}
                </div>
              ))}
            </CardContent>
          </Card>
        </ExampleCard>
      </section>

      <section>
        <SectionHeading eyebrow="Status" title="状态语义" description="卡片顶部 2px 状态线只用于状态识别，不替代标题和标签说明。" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <Card variant="outlined" size="sm" status="success">
            <CardTitle>成功</CardTitle>
            <CardDescription>任务完成、数据已发布。</CardDescription>
          </Card>
          <Card variant="outlined" size="sm" status="warning">
            <CardTitle>警告</CardTitle>
            <CardDescription>待审核、需补充、存在风险。</CardDescription>
          </Card>
          <Card variant="outlined" size="sm" status="error">
            <CardTitle>异常</CardTitle>
            <CardDescription>解析失败、权限异常、流程中断。</CardDescription>
          </Card>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Composition" title="后台组合示例" description="卡片可组合成工作台，但每张卡片必须有清晰边界、标题和状态，不把整页切成过多装饰块。" />
        <div className="rounded-sm bg-white p-6">
          <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
            <Card variant="outlined">
              <CardHeader>
                <CardTitle>材料数据概览</CardTitle>
                <CardDescription>用于工作台首页的关键指标承载。</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-3 gap-3">
                {[
                  ["数据集", "1,284"],
                  ["待治理", "36"],
                  ["异常任务", "8"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-sm bg-[var(--neutral-50)] p-4">
                    <div className="font-data text-2xl font-semibold text-[var(--text-primary)]">{value}</div>
                    <p className="mt-1 text-xs text-[var(--text-tertiary)]">{label}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card variant="outlined">
              <CardHeader>
                <CardTitle>近期任务</CardTitle>
                <CardDescription>显示需要用户处理的高频事项。</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {["解析失败", "权限申请", "模型推荐"].map((item, index) => (
                  <div key={item} className="flex items-center justify-between rounded-sm bg-[var(--neutral-50)] px-3 py-2 text-sm">
                    <span className="text-[var(--text-secondary)]">{item}</span>
                    <Badge count={index + 1} tone={index === 0 ? "brand" : "neutral"} size="sm" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Guidelines" title="最佳实践" />
        <SpecList
          items={[
            "卡片不是页面分区的默认样式，只用于承载独立、可重复或可操作的信息单元。",
            "卡片内标题、描述、操作应形成清晰层级，不堆叠过多边框。",
            "后台数据卡片保持克制，不使用大阴影和大圆角。",
            "卡片操作按钮应控制数量，主操作不超过一个，状态说明优先用标签和短文案。",
            "状态线只能作为快速识别辅助，具体状态仍需通过标题、标签或说明文字表达。",
            "禁用卡片保留结构和信息，但降低透明度并禁止交互。",
          ]}
        />
      </section>
    </div>
  );
}
