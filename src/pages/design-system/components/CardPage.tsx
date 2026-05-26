import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import { Button } from "../../../components/ui/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/Card";
import { Tag } from "../../../components/ui/Tag";

export default function CardPage() {
  return (
    <div className="space-y-16">
      <PageHeader title="卡片" description="卡片用于承载一组完整信息，适合数据资产、功能入口、状态摘要和模块化内容。" />

      <section>
        <SectionHeading eyebrow="Variants" title="卡片类型" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>数据资产卡片</CardTitle>
              <CardDescription>承载材料数据资产摘要和状态。</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Tag variant="brand">关键节点</Tag>
              <Tag>已治理</Tag>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>功能入口卡片</CardTitle>
              <CardDescription>用于工作台、首页和能力入口。</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button size="sm">进入模块</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>状态摘要卡片</CardTitle>
              <CardDescription>用于指标、任务和流程概览。</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="font-mono text-3xl font-semibold text-[var(--neutral-900)]">128</div>
              <p className="mt-1 text-sm text-[var(--neutral-600)]">本周新增数据集</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Guidelines" title="使用建议" />
        <SpecList
          items={[
            "卡片不是页面分区的默认样式，只用于承载独立、可重复或可操作的信息单元。",
            "卡片内标题、描述、操作应形成清晰层级，不堆叠过多边框。",
            "后台数据卡片保持克制，不使用大阴影和大圆角。",
            "卡片操作按钮应控制数量，主操作不超过一个。",
          ]}
        />
      </section>
    </div>
  );
}
