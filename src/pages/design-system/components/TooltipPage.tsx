import { Info, Question, WarningCircle } from "@phosphor-icons/react";
import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import { Button, Tag, Tooltip } from "../../../components/ui";

const placements = ["top", "right", "bottom", "left"] as const;

export default function TooltipPage() {
  return (
    <div className="space-y-16">
      <PageHeader title="文字提示" description="文字提示用于解释图标、字段或被截断内容，只承载短文本，不打断当前操作。" />

      <section>
        <SectionHeading title="基础用法" eyebrow="Usage" description="Tooltip 是最轻量的解释层。内容应控制在一到两行，不能放按钮、表单或复杂信息。" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <ExampleCard title="图标解释">
            <div className="flex min-h-28 items-center gap-4">
              <Tooltip content="字段来自数据空间授权目录" open>
                <button className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] text-[var(--neutral-700)] hover:bg-[var(--neutral-100)]" type="button" aria-label="说明">
                  <Info size={18} weight="regular" />
                </button>
              </Tooltip>
            </div>
          </ExampleCard>
          <ExampleCard title="禁用原因">
            <div className="flex min-h-28 items-center gap-4">
              <Tooltip content="当前账号没有发布权限，请联系管理员。" open placement="bottom">
                <span>
                  <Button disabled>发布数据</Button>
                </span>
              </Tooltip>
            </div>
          </ExampleCard>
          <ExampleCard title="风险说明">
            <div className="flex min-h-28 items-center gap-4">
              <Tooltip content="该操作会影响下游模型训练结果。" open placement="right">
                <Tag variant="warning" size="sm" icon={<WarningCircle size={14} weight="regular" />}>需复核</Tag>
              </Tooltip>
            </div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading title="出现位置" eyebrow="Placement" description="默认优先向上展示；当顶部空间不足时，再选择右、下、左。Figma 组件需要保留四个静态打开态。" />
        <ExampleCard title="四向位置">
          <div className="grid grid-cols-2 gap-8 py-8 md:grid-cols-4">
            {placements.map((placement) => (
              <div key={placement} className="flex min-h-24 items-center justify-center bg-[var(--neutral-50)]">
                <Tooltip content={`${placement} 方向提示`} placement={placement} open>
                  <Button variant="outline" tone="neutral">{placement}</Button>
                </Tooltip>
              </div>
            ))}
          </div>
        </ExampleCard>
      </section>

      <section>
        <SectionHeading title="后台常见场景" eyebrow="Scenarios" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="表格字段说明" description="用于字段口径、计算公式、权限来源等短解释。">
            <div className="bg-[var(--neutral-50)] p-4">
              <div className="grid grid-cols-[1fr_120px_120px] border-b border-[var(--neutral-200)] pb-2 text-xs text-[var(--neutral-500)]">
                <div className="flex items-center gap-1">
                  数据资产
                  <Tooltip content="完成标准化、清洗和权限绑定的数据集合。" open placement="right">
                    <Question size={14} weight="regular" />
                  </Tooltip>
                </div>
                <div>状态</div>
                <div>更新时间</div>
              </div>
              <div className="grid grid-cols-[1fr_120px_120px] py-3 text-sm text-[var(--neutral-800)]">
                <div>镍基合金样本集</div>
                <div><Tag variant="success" size="sm">已发布</Tag></div>
                <div>2026-06-08</div>
              </div>
            </div>
          </ExampleCard>
          <ExampleCard title="文本省略说明" description="长字段被截断时，可用 Tooltip 展示完整内容。">
            <div className="w-full bg-[var(--neutral-50)] p-4">
              <Tooltip content="面向航空发动机热端部件的高温合金材料数据集，已完成工艺与性能字段校准。" open>
                <p className="max-w-xs truncate text-sm text-[var(--neutral-800)]">
                  面向航空发动机热端部件的高温合金材料数据集，已完成工艺与性能字段校准。
                </p>
              </Tooltip>
            </div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading title="使用建议" eyebrow="Guidelines" />
        <SpecList
          items={[
            "只放短文本，不放按钮、链接、表单和多段说明；需要操作时使用 Popover。",
            "用于解释图标、字段口径、禁用原因、截断文本和轻量风险说明。",
            "不要用 Tooltip 承载必须被用户阅读的信息，关键阻断或确认应使用 Modal。",
            "触发方式必须同时支持 hover 与 keyboard focus，不能只依赖鼠标。",
            "背景使用 neutral-900，文字使用白色，圆角 2px，避免大阴影和装饰色。",
            "Figma 组件需要包含 top、right、bottom、left、short text、long text 和 disabled trigger 状态。",
          ]}
        />
      </section>
    </div>
  );
}
