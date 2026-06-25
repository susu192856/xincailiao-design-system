import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import { Button } from "../../../components/ui/Button";
import { Empty } from "../../../components/ui/Empty";
import { Tag } from "../../../components/ui/Tag";

export default function EmptyPage() {
  return (
    <div className="space-y-16">
      <PageHeader title="空状态" description="空状态用于数据为空、搜索无结果、权限不足和首次使用引导，帮助用户明确原因与下一步。" />

      <section>
        <SectionHeading eyebrow="Variants" title="业务状态" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="暂无数据">
            <Empty variant="noData" title="暂无材料数据" description="当前空间还没有可用的数据资产。" />
          </ExampleCard>
          <ExampleCard title="首次创建">
            <Empty
              variant="firstUse"
              title="还没有数据集"
              description="创建第一个数据集后，可进行字段治理、关联和发布。"
              action={<Button size="md">新建数据集</Button>}
            />
          </ExampleCard>
          <ExampleCard title="搜索无结果">
            <Empty
              variant="noResult"
              title="没有匹配结果"
              description="请减少筛选条件，或检查材料牌号、数据来源是否输入正确。"
              action={<Button variant="outline" size="md">重置筛选</Button>}
            />
          </ExampleCard>
          <ExampleCard title="权限不足">
            <Empty
              variant="noPermission"
              title="暂无访问权限"
              description="当前账号无权查看该数据空间，请联系空间管理员申请权限。"
              action={<Button variant="outline" tone="product" size="md">申请权限</Button>}
            />
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Failure" title="异常空状态" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="加载失败">
            <Empty
              variant="error"
              title="数据加载失败"
              description="服务暂时不可用，请稍后重试；如果问题持续出现，请联系系统管理员。"
              action={<Button variant="outline" tone="danger" size="md">重新加载</Button>}
            />
          </ExampleCard>
          <ExampleCard title="局部模块为空">
            <Empty
              variant="noData"
              title="暂无图表数据"
              description="当前筛选条件下没有可用于图表分析的数据。"
              className="min-h-56 py-8"
            />
          </ExampleCard>
          <ExampleCard title="处理中">
            <Empty
              variant="processing"
              title="数据解析中"
              description="系统正在解析上传文件，完成后会自动生成字段预览。"
              action={<Button variant="outline" tone="product" size="md">查看任务中心</Button>}
            />
          </ExampleCard>
          <ExampleCard title="功能不可用">
            <Empty
              variant="disabled"
              title="当前空间未开启该能力"
              description="该功能需要管理员完成模块授权后才能使用。"
              action={<Button variant="outline" size="md">查看开通说明</Button>}
            />
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Density" title="容器适配" description="空状态应跟随模块高度。表格、图表、侧栏面板和全页空状态的留白不能混用。" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <ExampleCard title="表格空状态">
            <Empty variant="noResult" title="无匹配数据" description="调整筛选条件后再试。" className="min-h-40 py-6" />
          </ExampleCard>
          <ExampleCard title="图表空状态">
            <Empty variant="noData" title="暂无指标数据" description="当前时间范围内无数据。" className="min-h-56" />
          </ExampleCard>
          <ExampleCard title="全页首次使用">
            <Empty
              variant="firstUse"
              title="开始构建数据资产"
              description="创建数据集后可进入治理和发布流程。"
              action={<Button size="md">新建数据集</Button>}
              className="min-h-72"
            />
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Backend States" title="后台空状态规则" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="bg-white p-5">
            <Tag variant="neutral" size="sm">暂无数据</Tag>
            <p className="mt-3 text-sm leading-6 text-[var(--text-tertiary)]">说明当前列表为空，不一定需要行动按钮。</p>
          </div>
          <div className="bg-white p-5">
            <Tag variant="product" size="sm">首次使用</Tag>
            <p className="mt-3 text-sm leading-6 text-[var(--text-tertiary)]">需要提供创建入口，让用户知道下一步。</p>
          </div>
          <div className="bg-white p-5">
            <Tag variant="warning" size="sm">无结果</Tag>
            <p className="mt-3 text-sm leading-6 text-[var(--text-tertiary)]">优先引导重置筛选，不直接引导创建。</p>
          </div>
          <div className="bg-white p-5">
            <Tag variant="error" size="sm">无权限</Tag>
            <p className="mt-3 text-sm leading-6 text-[var(--text-tertiary)]">说明申请路径，但不暴露敏感数据。</p>
          </div>
          <div className="bg-white p-5">
            <Tag variant="product" size="sm">处理中</Tag>
            <p className="mt-3 text-sm leading-6 text-[var(--text-tertiary)]">展示任务状态和入口，不让用户重复提交。</p>
          </div>
          <div className="bg-white p-5">
            <Tag variant="neutral" size="sm">不可用</Tag>
            <p className="mt-3 text-sm leading-6 text-[var(--text-tertiary)]">说明功能边界或开通路径，避免误判为错误。</p>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Guidelines" title="最佳实践" />
        <SpecList
          items={[
            "空状态文案必须包含原因和下一步，避免只写“暂无数据”。",
            "搜索无结果优先提示调整条件或重置筛选，不直接引导新建。",
            "权限不足需说明申请路径，不暴露资源名称、字段值或敏感原因。",
            "首次创建场景可放主按钮；普通空列表不一定需要按钮。",
            "模块级空状态高度应跟随容器，不要撑开整个页面。",
            "处理中状态必须给出任务入口或等待说明，避免用户重复提交。",
            "功能未开通和权限不足要分开表达，前者是能力边界，后者是访问控制。",
          ]}
        />
      </section>
    </div>
  );
}
