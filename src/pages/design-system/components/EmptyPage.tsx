import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import { Button } from "../../../components/ui/Button";
import { Empty } from "../../../components/ui/Empty";
import { Tag } from "../../../components/ui/Tag";

export default function EmptyPage() {
  return (
    <div className="space-y-16">
      <PageHeader title="空状态" description="空状态用于说明内容为何不可见，并在必要时提供清晰、可执行的下一步。" />

      <section>
        <SectionHeading
          eyebrow="Illustrations"
          title="五类基础空状态"
          description="基础插图提取自既有 Figma（设计工具）空状态页并固定映射。通栏展示用于同时核对插图、文案和操作，不将插图作为独立装饰使用。"
        />
        <div className="grid grid-cols-1 gap-5">
          <ExampleCard title="暂无数据">
            <Empty variant="noData" title="暂无材料数据" description="当前空间还没有可用的数据资产。" className="min-h-72" />
          </ExampleCard>
          <ExampleCard title="搜索无结果">
            <Empty
              variant="noResult"
              title="没有匹配结果"
              description="请减少筛选条件，或检查材料牌号、数据来源是否输入正确。"
              action={<Button variant="outline" size="md">重置筛选</Button>}
              className="min-h-72"
            />
          </ExampleCard>
          <ExampleCard title="权限不足">
            <Empty
              variant="noPermission"
              title="暂无访问权限"
              description="当前账号无权查看该数据空间，请联系空间管理员申请权限。"
              action={<Button variant="outline" tone="product" size="md">申请权限</Button>}
              className="min-h-72"
            />
          </ExampleCard>
          <ExampleCard title="页面不存在">
            <Empty
              variant="notFound"
              title="页面不存在"
              description="页面地址可能已失效，请返回上一页或回到首页。"
              action={<Button variant="outline" size="md">返回上一页</Button>}
              className="min-h-72"
            />
          </ExampleCard>
          <ExampleCard title="网络异常">
            <Empty
              variant="network"
              title="网络连接异常"
              description="请检查网络连接后重试；如果问题持续出现，请联系系统管理员。"
              action={<Button variant="outline" tone="danger" size="md">重新加载</Button>}
              className="min-h-72"
            />
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="First Use"
          title="首次创建"
          description="首次使用不是异常状态。仅当用户可以立即创建内容时展示主操作，并使用独立插图与普通无数据状态区分。"
        />
        <ExampleCard title="首次创建数据集">
          <Empty
            variant="firstUse"
            title="还没有数据集"
            description="创建第一个数据集后，可进行字段治理、关联和发布。"
            action={<Button size="md">新建数据集</Button>}
            className="min-h-72"
          />
        </ExampleCard>
      </section>

      <section>
        <SectionHeading eyebrow="Other States" title="其他不可用状态" description="处理中与功能未开通不属于基础空状态，仅在对应业务条件成立时使用。" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="处理中">
            <Empty
              variant="processing"
              title="数据解析中"
              description="系统正在解析上传文件，完成后会自动生成字段预览。"
              action={<Button variant="outline" tone="product" size="md">查看任务中心</Button>}
              className="min-h-64"
            />
          </ExampleCard>
          <ExampleCard title="功能未开通">
            <Empty
              variant="disabled"
              title="当前空间未开启该能力"
              description="该功能需要管理员完成模块授权后才能使用。"
              action={<Button variant="outline" size="md">查看开通说明</Button>}
              className="min-h-64"
            />
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Density" title="容器适配" description="状态含义不因容器变化；仅调整留白和说明长度，不替换插图或改写操作逻辑。" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="border border-[var(--neutral-200)] bg-white p-5">
            <Tag variant="neutral" size="sm">紧凑区域</Tag>
            <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">表格与侧栏优先保证状态、原因可读；空间不足时可省略描述，不省略标题。</p>
          </div>
          <div className="border border-[var(--neutral-200)] bg-white p-5">
            <Tag variant="product" size="sm">标准模块</Tag>
            <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">卡片与图表保留标题和一行说明；存在明确恢复路径时再增加操作。</p>
          </div>
          <div className="border border-[var(--neutral-200)] bg-white p-5">
            <Tag variant="neutral" size="sm">全页状态</Tag>
            <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">增加垂直留白但不放大插图；主操作只用于首次创建或明确的恢复动作。</p>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Guidelines" title="最佳实践" />
        <SpecList
          items={[
            "先判断状态：无数据、无结果、无权限、页面不存在、网络异常和首次创建不得混用。",
            "标题说明发生了什么；描述解释原因；仅在存在明确下一步时提供操作。",
            "搜索无结果优先重置筛选，首次创建提供创建入口，无权限说明申请路径。",
            "插图与状态固定映射，不能按个人偏好替换；插图内不嵌入标题或说明文字。",
            "容器变小时优先缩短描述和留白，不缩放到难以识别，也不随意更换布局模式。",
            "处理中、功能未开通和权限不足是三种不同条件，需要分别表达。",
          ]}
        />
      </section>
    </div>
  );
}
