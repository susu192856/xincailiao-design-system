import PageHeader from "../../components/docs/PageHeader";
import { SectionHeading } from "../../components/docs/ComponentDoc";

export default function TypographyPage() {
  const typographyTokens = [
    {
      token: "Type/Display/L",
      size: "56px",
      lineHeight: "64px",
      ratio: "1.1 ~ 1.2",
      weight: "700 Bold",
      usage: "Banner 标题",
    },
    {
      token: "Type/Heading/H1",
      size: "40px",
      lineHeight: "48px",
      ratio: "1.2",
      weight: "600 Semibold",
      usage: "一级页面标题",
    },
    {
      token: "Type/Heading/H2",
      size: "32px",
      lineHeight: "40px",
      ratio: "1.2 ~ 1.3",
      weight: "600 Semibold",
      usage: "模块主标题",
    },
    {
      token: "Type/Heading/H3",
      size: "24px",
      lineHeight: "32px",
      ratio: "1.3",
      weight: "500 Medium",
      usage: "卡片标题/区块标题",
    },
    {
      token: "Type/Heading/H4",
      size: "20px",
      lineHeight: "28px",
      ratio: "1.4",
      weight: "500 Medium",
      usage: "产品页面标题",
    },
    {
      token: "Type/Heading/H5",
      size: "18px",
      lineHeight: "26px",
      ratio: "1.4 ~ 1.5",
      weight: "500 Medium",
      usage: "二级内模块",
    },
    {
      token: "Type/Body/L",
      size: "16px",
      lineHeight: "24px",
      ratio: "1.5",
      weight: "400 Regular",
      usage: "官网正文/产品主文",
    },
    {
      token: "Type/Body/M",
      size: "14px",
      lineHeight: "22px",
      ratio: "1.5 ~ 1.6",
      weight: "400 Regular",
      usage: "后台正文/表单/Table",
    },
    {
      token: "Type/Body/S",
      size: "13px",
      lineHeight: "20px",
      ratio: "1.5",
      weight: "400 Regular",
      usage: "辅助信息/次要提示",
    },
    {
      token: "Type/Caption",
      size: "12px",
      lineHeight: "18px",
      ratio: "1.5",
      weight: "400 Regular",
      usage: "标签/Caption/时间",
    },
  ];

  return (
    <div className="space-y-20">
      <PageHeader title="字体" description="规范的字体系统，确保信息清晰易读" />

      <section>
        <SectionHeading
          eyebrow="Font Family"
          title="字体家族"
          description="字体系统以系统默认中文字体为基础，保证加载稳定、阅读清晰；关键数字使用等宽数字字体强化数据感。"
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="bg-white p-5">
            <h3 className="mb-3.5 text-base font-semibold text-[var(--neutral-900)]">苹果系统字体</h3>
            <p className="mb-1 text-sm text-[var(--neutral-900)]">PingFang SC</p>
            <p className="text-sm text-[var(--neutral-600)]">苹方</p>
          </div>

          <div className="bg-white p-5">
            <h3 className="mb-3.5 text-base font-semibold text-[var(--neutral-900)]">
              Windows系统字体
            </h3>
            <p className="mb-1 text-sm text-[var(--neutral-900)]">Microsoft YaHei</p>
            <p className="text-sm text-[var(--neutral-600)]">微软雅黑</p>
          </div>

          <div className="bg-white p-5">
            <h3 className="mb-3.5 text-base font-semibold text-[var(--neutral-900)]">
              备用字体（免费商用）
            </h3>
            <p className="mb-1 text-sm text-[var(--neutral-900)]">Source Han Sans CN</p>
            <p className="text-sm text-[var(--neutral-600)]">思源黑体</p>
          </div>

          <div className="bg-white p-5">
            <h3 className="mb-3.5 text-base font-semibold text-[var(--neutral-900)]">
              特殊数字字体（免费商用）
            </h3>
            <p className="mb-1 font-mono text-sm text-[var(--neutral-900)]">D-DIN-Pro</p>
            <p className="font-mono text-sm text-[var(--neutral-600)]">123456789*#</p>
          </div>
        </div>
        <div className="mt-5 bg-white p-5">
          <h3 className="mb-3.5 text-sm font-semibold text-[var(--neutral-900)]">
            字体栈（Font Stack）配置建议
          </h3>
          <div className="space-y-3.5 text-xs text-[var(--neutral-700)]">
            <div>
              <p className="mb-1 font-mono text-[var(--neutral-900)]">
                font-family: "PingFang SC", "Microsoft YaHei", "Source Han Sans CN",
                sans-serif;
              </p>
              <p className="text-[var(--neutral-600)]">
                中文字体栈：优先使用系统默认字体（macOS 苹方 / Windows 微软雅黑），思源黑体作为免费商用备选方案
              </p>
            </div>
            <div>
              <p className="mb-1 font-mono text-[var(--neutral-900)]">
                font-family: "D-DIN-Pro", "Helvetica Neue", Arial, sans-serif;
              </p>
              <p className="text-[var(--neutral-600)]">
                数字字体栈：关键数据使用 D-DIN-Pro，确保数字清晰易读且具有专业感
              </p>
            </div>
            <div className="border-t border-[var(--neutral-200)] pt-4">
              <p className="font-medium text-[var(--neutral-700)]">
                优先使用电脑系统默认字体可避免字体加载闪烁（FOIT/FOUT），提升首屏渲染速度，在不同平台保持一致的阅读体验。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Type Scale"
          title="字号与行高"
          description="统一的字体规范体系覆盖官网展示、产品界面、后台系统等全场景。Display 用于大屏视觉冲击，Heading 建立信息层级，Body 保证内容可读性。"
        />

        <div className="overflow-hidden rounded-none border border-[var(--neutral-200)] bg-white">
          <div className="grid grid-cols-12 gap-4 border-b border-[var(--neutral-200)] bg-[var(--neutral-50)] px-6 py-3 text-sm font-semibold text-[var(--neutral-900)]">
            <div className="col-span-2">Token</div>
            <div className="col-span-2">字号</div>
            <div className="col-span-2">行高</div>
            <div className="col-span-2">行高比例</div>
            <div className="col-span-2">字重</div>
            <div className="col-span-2">用途</div>
          </div>
          {typographyTokens.map((item, idx) => (
            <div
              key={idx}
              className="grid grid-cols-12 items-center gap-4 border-b border-[var(--neutral-200)] px-6 py-3.5 text-sm last:border-b-0"
            >
              <div className="col-span-2 font-mono text-xs text-[var(--neutral-700)]">{item.token}</div>
              <div className="col-span-2 text-[var(--neutral-700)]">{item.size}</div>
              <div className="col-span-2 text-[var(--neutral-700)]">{item.lineHeight}</div>
              <div className="col-span-2 text-[var(--neutral-700)]">{item.ratio}</div>
              <div className="col-span-2 text-[var(--neutral-700)]">{item.weight}</div>
              <div className="col-span-2 text-[var(--neutral-700)]">{item.usage}</div>
            </div>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="bg-white p-5">
            <h3 className="mb-3.5 text-base font-semibold text-[var(--neutral-900)]">
              一、Web（官网/门户）
            </h3>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between border-b border-[var(--neutral-100)] pb-2.5">
                <span className="text-sm font-semibold text-[var(--neutral-700)]">场景</span>
                <span className="text-sm font-semibold text-[var(--neutral-700)]">建议 Token</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--neutral-700)]">Banner 标题</span>
                <span className="font-mono text-xs text-[var(--neutral-900)]">Display/L</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--neutral-700)]">页面主标题</span>
                <span className="font-mono text-xs text-[var(--neutral-900)]">H1</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--neutral-700)]">模块标题</span>
                <span className="font-mono text-xs text-[var(--neutral-900)]">H2</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--neutral-700)]">卡片标题</span>
                <span className="font-mono text-xs text-[var(--neutral-900)]">H3</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--neutral-700)]">正文内容</span>
                <span className="font-mono text-xs text-[var(--neutral-900)]">Body/L</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--neutral-700)]">辅助信息</span>
                <span className="font-mono text-xs text-[var(--neutral-900)]">Body/S</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-5">
            <h3 className="mb-3.5 text-base font-semibold text-[var(--neutral-900)]">
              二、Product（后台/B端）
            </h3>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between border-b border-[var(--neutral-100)] pb-2.5">
                <span className="text-sm font-semibold text-[var(--neutral-700)]">场景</span>
                <span className="text-sm font-semibold text-[var(--neutral-700)]">建议 Token</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--neutral-700)]">页面标题</span>
                <span className="font-mono text-xs text-[var(--neutral-900)]">H4</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--neutral-700)]">模块标题</span>
                <span className="font-mono text-xs text-[var(--neutral-900)]">H5</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--neutral-700)]">Table 内容</span>
                <span className="font-mono text-xs text-[var(--neutral-900)]">Body/M</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--neutral-700)]">Form Label</span>
                <span className="font-mono text-xs text-[var(--neutral-900)]">Body/M</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--neutral-700)]">Form Placeholder</span>
                <span className="font-mono text-xs text-[var(--neutral-900)]">Body/S</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--neutral-700)]">数据注释</span>
                <span className="font-mono text-xs text-[var(--neutral-900)]">Caption</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-5">
            <h3 className="mb-3.5 text-base font-semibold text-[var(--neutral-900)]">
              三、Dashboard（数据可视化）
            </h3>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between border-b border-[var(--neutral-100)] pb-2.5">
                <span className="text-sm font-semibold text-[var(--neutral-700)]">场景</span>
                <span className="text-sm font-semibold text-[var(--neutral-700)]">建议 Token</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--neutral-700)]">KPI数字</span>
                <span className="font-mono text-xs text-[var(--neutral-900)]">Display/L</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--neutral-700)]">图表标题</span>
                <span className="font-mono text-xs text-[var(--neutral-900)]">H5</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--neutral-700)]">图例</span>
                <span className="font-mono text-xs text-[var(--neutral-900)]">Body/S</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--neutral-700)]">坐标轴</span>
                <span className="font-mono text-xs text-[var(--neutral-900)]">Caption</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Line Height"
          title="行高规范"
          description="标题行高控制视觉冲击，正文行高控制阅读效率。官网更强调呼吸感，后台更强调密度和稳定扫描。"
        />
        <div className="bg-white p-5">
          <div className="mb-5 space-y-5 text-sm text-[var(--neutral-700)]">
            <div>
              <p className="mb-2 font-semibold text-[var(--neutral-900)]">标题类（Display / H1 / H2 / H3）</p>
              <p className="mb-2">行高倍率：1.2 ～ 1.3</p>
              <p className="text-[var(--neutral-600)]">
                标题字号较大，紧凑的行高能增强视觉冲击力，避免视觉松散。多行标题时保持紧密感。
              </p>
            </div>

            <div>
              <p className="mb-2 font-semibold text-[var(--neutral-900)]">正文类（Body / Caption）</p>
              <div className="ml-5 space-y-2.5">
                <div>
                  <p className="font-medium text-[var(--neutral-900)]">官网/门户：1.6 ～ 1.8</p>
                  <p className="text-[var(--neutral-600)]">
                    宽松的行间距提供"呼吸感"，降低长文阅读疲劳，适合营销型内容。
                  </p>
                </div>
                <div>
                  <p className="font-medium text-[var(--neutral-900)]">后台系统：1.5</p>
                  <p className="text-[var(--neutral-600)]">
                    在保证可读性的前提下提高信息密度，减少滚动操作，提升操作效率。
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-[var(--neutral-200)] pt-4">
              <p className="text-[var(--neutral-600)]">
                <span className="font-semibold text-[var(--neutral-900)]">计算公式：</span>行高 = 字号 ×
                行高倍率。例如：16px 字号 × 1.5 倍率 = 24px 行高
              </p>
            </div>
          </div>

          <div className="border-t border-[var(--neutral-300)] pt-4">
            <p className="mb-3.5 text-xs font-semibold text-[var(--neutral-900)]">示例对比</p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <p className="mb-2.5 text-xs">
                  <span className="text-base font-bold text-green-600">✓</span>
                  <span className="ml-1 text-[var(--neutral-500)]">标题：行高 1.2（紧凑）</span>
                </p>
                <div className="rounded-[2px] bg-[var(--neutral-50)] p-3.5">
                  <h3
                    className="text-2xl font-semibold text-[var(--neutral-900)]"
                    style={{ lineHeight: "1.2" }}
                  >
                    新材料可信数据空间
                    <br />
                    构建产业数字化生态
                  </h3>
                </div>
              </div>
              <div>
                <p className="mb-2.5 text-xs">
                  <span className="text-base font-bold text-red-600">✗</span>
                  <span className="ml-1 text-[var(--neutral-500)]">标题：行高 1.8（过于松散）</span>
                </p>
                <div className="rounded-[2px] bg-[var(--neutral-50)] p-3.5">
                  <h3
                    className="text-2xl font-semibold text-[var(--neutral-900)]"
                    style={{ lineHeight: "1.8" }}
                  >
                    新材料可信数据空间
                    <br />
                    构建产业数字化生态
                  </h3>
                </div>
              </div>
              <div>
                <p className="mb-2.5 text-xs">
                  <span className="text-base font-bold text-green-600">✓</span>
                  <span className="ml-1 text-[var(--neutral-500)]">正文：行高 1.6（舒适）</span>
                </p>
                <div className="rounded-[2px] bg-[var(--neutral-50)] p-3.5">
                  <p className="text-sm text-[var(--neutral-900)]" style={{ lineHeight: "1.6" }}>
                    新材道致力于构建新材料领域的可信数据空间，通过整合产业链上下游数据资源，为材料研发提供支持。
                  </p>
                </div>
              </div>
              <div>
                <p className="mb-2.5 text-xs">
                  <span className="text-base font-bold text-red-600">✗</span>
                  <span className="ml-1 text-[var(--neutral-500)]">正文：行高 1.2（过于紧凑）</span>
                </p>
                <div className="rounded-[2px] bg-[var(--neutral-50)] p-3.5">
                  <p className="text-sm text-[var(--neutral-900)]" style={{ lineHeight: "1.2" }}>
                    新材道致力于构建新材料领域的可信数据空间，通过整合产业链上下游数据资源，为材料研发提供支持。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Readability"
          title="可读性规范"
          description="通过行长控制、段落节奏和容器宽度，降低复杂材料数据、说明文字和长段落的阅读负担。"
        />

        <div>
          <h3 className="mb-3.5 text-base font-semibold text-[var(--neutral-900)]">
            行长限制（Line Length）
          </h3>
          <div className="bg-white p-5">
            <p className="mb-4 text-sm text-[var(--neutral-700)]">
              过长的行宽会增加视线换行的负担，降低阅读效率。研究表明，最佳行长能够显著提升阅读速度和理解度。
            </p>
            <div className="mb-5 space-y-3.5 text-sm text-[var(--neutral-700)]">
              <div>
                <p className="mb-1 font-semibold text-[var(--neutral-900)]">中文长段落</p>
                <p>
                  每行控制在 <span className="font-mono text-[var(--neutral-900)]">32～45</span> 个汉字（约{" "}
                  <span className="font-mono text-[var(--neutral-900)]">500px～700px</span>
                  ），适用于文章、博客等阅读型内容
                </p>
              </div>
              <div>
                <p className="mb-1 font-semibold text-[var(--neutral-900)]">后台表单/说明文字</p>
                <p>
                  内容容器最大宽度 <span className="font-mono text-[var(--neutral-900)]">≤ 700px</span>
                  ，确保用户视线聚焦，减少眼动距离
                </p>
              </div>
              <div>
                <p className="mb-1 font-semibold text-[var(--neutral-900)]">卡片/模块内文本</p>
                <p>
                  根据容器宽度自适应，但建议不超过{" "}
                  <span className="font-mono text-[var(--neutral-900)]">60</span> 个字符（中英文混合）
                </p>
              </div>
            </div>

            <div className="border-t border-[var(--neutral-300)] pt-4">
              <p className="mb-3.5 text-xs font-semibold text-[var(--neutral-900)]">示例对比</p>
              <div className="space-y-3.5">
                <div>
                  <p className="mb-2.5 text-xs">
                    <span className="text-base font-bold text-green-600">✓</span>
                    <span className="ml-1 text-[var(--neutral-500)]">推荐行长（~700px）</span>
                  </p>
                  <div className="max-w-[700px] rounded-[2px] bg-[var(--neutral-50)] p-3.5">
                    <p className="text-sm leading-relaxed text-[var(--neutral-900)]">
                      新材道致力于构建新材料领域的可信数据空间，通过整合产业链上下游数据资源，为材料研发、生产制造和应用提供全方位的数据支持和智能化解决方案，推动新材料产业数字化转型升级。
                    </p>
                  </div>
                </div>
                <div>
                  <p className="mb-2.5 text-xs">
                    <span className="text-base font-bold text-red-600">✗</span>
                    <span className="ml-1 text-[var(--neutral-500)]">行长过长（影响阅读）</span>
                  </p>
                  <div className="rounded-[2px] bg-[var(--neutral-50)] p-3.5">
                    <p className="text-sm leading-relaxed text-[var(--neutral-900)]">
                      新材道致力于构建新材料领域的可信数据空间，通过整合产业链上下游数据资源，为材料研发、生产制造和应用提供全方位的数据支持和智能化解决方案，推动新材料产业数字化转型升级。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Guidelines" title="最佳实践" />
        <div className="bg-white p-5">
          <ul className="space-y-3 text-sm text-[var(--neutral-700)]">
            <li className="flex items-start gap-3">
              <span className="shrink-0 font-semibold text-[var(--neutral-400)]">•</span>
              <div>
                <span className="font-semibold text-[var(--neutral-900)]">避免过多字重层级：</span>
                一个界面中建议使用不超过 3 种字重，保持视觉简洁
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="shrink-0 font-semibold text-[var(--neutral-400)]">•</span>
              <div>
                <span className="font-semibold text-[var(--neutral-900)]">确保对比度：</span>
                文字与背景的对比度应≥4.5:1（正文）或≥3:1（大字号），符合 WCAG AA
                标准
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="shrink-0 font-semibold text-[var(--neutral-400)]">•</span>
              <div>
                <span className="font-semibold text-[var(--neutral-900)]">数字优先使用 D-DIN-Pro：</span>
                关键数据、金额、统计数字等使用等宽数字字体，提升专业感和易读性
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="shrink-0 font-semibold text-[var(--neutral-400)]">•</span>
              <div>
                <span className="font-semibold text-[var(--neutral-900)]">响应式字号：</span>
                移动端适当减小字号（建议为桌面端的
                85%～90%），但最小不低于 12px
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
