import PageHeader from "../../../components/docs/PageHeader";
import { ExampleCard, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import { Button } from "../../../components/ui/Button";
import { Image } from "../../../components/ui/Image";
import { Tag } from "../../../components/ui/Tag";
import ratioExampleSrc from "../../../assets/image/ratio-example.png";

const micrographSrc =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='320' viewBox='0 0 480 320'%3E%3Crect width='480' height='320' fill='%23F7F8FA'/%3E%3Cg stroke='%23B8C0CC' stroke-width='1.2' fill='none' opacity='0.8'%3E%3Cpath d='M35 260C90 210 120 245 170 198S260 174 306 120 398 96 450 45'/%3E%3Cpath d='M22 74C70 92 115 70 150 104s88 40 130 10 92-15 150 24'/%3E%3Cpath d='M60 42l42 52-28 61 54 41-22 62M210 34l54 44-16 62 58 42-22 86M355 36l36 52-34 55 48 52-30 76'/%3E%3C/g%3E%3Cg fill='%231A1D21' opacity='0.78'%3E%3Ccircle cx='102' cy='94' r='5'/%3E%3Ccircle cx='247' cy='140' r='5'/%3E%3Ccircle cx='390' cy='88' r='5'/%3E%3C/g%3E%3Ccircle cx='306' cy='120' r='5' fill='%23FF112D'/%3E%3C/svg%3E";

const phaseDiagramSrc =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='360' viewBox='0 0 640 360'%3E%3Crect width='640' height='360' fill='%23FFFFFF'/%3E%3Cg stroke='%23E6E9EE' stroke-width='1'%3E%3Cpath d='M70 300H580M70 240H580M70 180H580M70 120H580M70 60H580M150 40V300M250 40V300M350 40V300M450 40V300M550 40V300'/%3E%3C/g%3E%3Cg stroke='%231A1D21' stroke-width='2' fill='none'%3E%3Cpath d='M70 300H590M70 300V35'/%3E%3Cpath d='M95 280C160 210 210 205 280 150S415 85 555 72'/%3E%3Cpath d='M110 90C190 145 250 165 315 175S430 230 545 280'/%3E%3C/g%3E%3Ccircle cx='360' cy='124' r='5' fill='%23FF112D'/%3E%3Ctext x='85' y='55' fill='%23768185' font-size='16' font-family='Arial'>T</text%3E%3Ctext x='560' y='322' fill='%23768185' font-size='16' font-family='Arial'>C</text%3E%3C/svg%3E";

export default function ImagePage() {
  return (
    <div className="space-y-16">
      <PageHeader title="图片" description="图片组件用于产品展示、材料图像、相图、头像和数据预览场景，必须保证比例稳定、加载状态清晰、异常状态可识别。" />

      <section>
        <SectionHeading eyebrow="Ratios" title="图片比例" description="图片比例由 Codex（代码协作工具）维护的本规范统一定义，验收后同步到 Figma（设计工具）；业务组件选择固定比例，不跟随原图尺寸自由伸缩。" />
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {[
            ["1:1", "头像、方形缩略图"], ["2:1", "重要横向视觉"], ["3:1", "页面 Banner"], ["3:2", "新闻与卡片横图"],
            ["16:9", "视频、截图、相图"], ["4:3", "通用卡片配图"], ["3:4", "竖版卡片与资料"], ["2:3", "海报与竖版封面"],
          ].map(([ratio, usage]) => (
            <ExampleCard key={ratio} title={ratio}>
              <Image ratio={ratio as "1:1" | "2:1" | "3:1" | "3:2" | "16:9" | "4:3" | "3:4" | "2:3"} src={ratioExampleSrc} alt={`${ratio} 图片比例示例`} />
              <p className="mt-3 text-xs leading-5 text-[var(--text-tertiary)]">{usage}</p>
            </ExampleCard>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Placeholder" title="默认图与占位" description="默认图只解决未配置图片时的临时展示，不能代替业务配图。" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <ExampleCard title="未配置图片 — 默认图"><Image ratio="4:3" placeholder="default" alt="系统默认图片" /></ExampleCard>
          <ExampleCard title="加载中 — 缓冲层"><Image loadingState ratio="4:3" alt="图片加载中" /></ExampleCard>
          <ExampleCard title="加载失败 — 错误态"><Image isError fallbackText="图片加载失败" ratio="4:3" /></ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="States" title="状态展示" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <ExampleCard title="加载中">
            <Image loadingState ratio="video" alt="加载中" />
          </ExampleCard>
          <ExampleCard title="加载失败">
            <Image isError fallbackText="材料图片加载失败" ratio="video" />
          </ExampleCard>
          <ExampleCard title="带图注">
            <Image
              ratio="video"
              src={phaseDiagramSrc}
              alt="Al-Mg 合金相图"
              fit="contain"
              caption="Al-Mg 合金相图，红点表示当前推荐工艺窗口。"
            />
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Backend States" title="后台图片场景" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ExampleCard title="材料详情图组">
            <div className="grid grid-cols-3 gap-3 bg-white">
              <div className="min-w-0 space-y-2">
                <Image ratio="square" src={micrographSrc} alt="组织图" />
                <Tag variant="neutral" size="sm">组织图</Tag>
              </div>
              <div className="min-w-0 space-y-2">
                <Image ratio="square" src={phaseDiagramSrc} fit="contain" alt="相图" />
                <Tag variant="product" size="sm">相图</Tag>
              </div>
              <div className="min-w-0 space-y-2">
                <Image ratio="square" isError fallbackText="缺少图片" />
                <Tag variant="warning" size="sm">缺失文件</Tag>
              </div>
            </div>
          </ExampleCard>
          <ExampleCard title="数据审核附件">
            <div className="space-y-3 bg-white">
              <div className="flex items-center justify-between gap-4">
                <div className="flex min-w-0 items-center gap-4">
                  <Image ratio="square" src={micrographSrc} alt="附件缩略图" className="w-20 shrink-0" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[var(--text-primary)]">热处理组织图.png</p>
                    <p className="mt-1 text-xs text-[var(--text-tertiary)]">上传于 2026-06-04 · 2.4MB</p>
                  </div>
                </div>
                <Button className="shrink-0" variant="outline" tone="neutral" size="sm">查看原图</Button>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex min-w-0 items-center gap-4">
                  <Image ratio="square" isError fallbackText="文件失效" className="w-20 shrink-0" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[var(--text-primary)]">来源证明.pdf</p>
                    <p className="mt-1 text-xs text-[var(--text-tertiary)]">文件链接已失效，需要重新上传。</p>
                  </div>
                </div>
                <Button className="shrink-0" variant="outline" tone="product" size="sm">重新上传</Button>
              </div>
            </div>
          </ExampleCard>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Guidelines" title="最佳实践" />
        <SpecList
          items={[
            "所有图片必须有固定比例容器，避免列表、详情页和弹窗加载时产生布局跳动。",
            "同一业务列表只能使用一种图片比例；比例切换属于模板变化，不根据单张原图临时调整。",
            "未配置图片可暂用系统默认图，加载中使用缓冲层；请求失败必须显示错误态，三者语义不能混用。",
            "默认图不承载业务含义，上线前应尽可能替换为真实配图；默认图也必须遵循当前容器比例和裁切规则。",
            "材料显微图、相图、测试曲线等专业图片使用完整展示（contain），确保信息完整可读。",
            "官网封面和列表缩略图使用填满容器（cover），但不得裁掉关键产品、Logo、图表坐标轴。",
            "加载失败需要显示明确占位和原因，不要只显示浏览器裂图。",
          ]}
        />
      </section>
    </div>
  );
}
