import PageHeader from "../../../components/docs/PageHeader";
import { SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import { chartColorFamilies } from "../../../data/chartColors";

export default function ChartPage() {
  return (
    <div className="space-y-16">
      <PageHeader
        title="图表"
        description="数据色搭配方案与图表使用规范。颜色与 ColorsPage 共用同一数据源，修改 src/data/chartColors.ts 一处即可全局联动。"
      />

      <section>
        <SectionHeading
          eyebrow="Color Palette"
          title="数据色板"
          description="共 10 个色系，每系 7 个深浅层级（0 最浅，6 最深）。设计师在 Figma 中按需选取图表配色。"
        />
        <div className="mt-6 space-y-5">
          {chartColorFamilies.reduce<React.ReactNode[]>((rows, family, i) => {
            if (i % 2 !== 0) return rows;
            const left = family;
            const right = chartColorFamilies[i + 1];
            rows.push(
              <div key={left.key} className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                {[left, right].filter(Boolean).map((f) => f && (
                  <div key={f.key} className="rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-tertiary)]">{f.name}</p>
                      <p className="font-mono text-[10px] text-[var(--text-tertiary)]">{f.key}</p>
                    </div>
                    <div className="mt-3 flex h-10 overflow-hidden rounded-sm">
                      {f.shades.map((c) => (
                        <span key={c} className="flex-1" style={{ backgroundColor: c }} />
                      ))}
                    </div>
                    <div className="mt-2 grid grid-cols-7 gap-1 font-mono text-[9px] text-[var(--text-tertiary)]">
                      {f.shades.map((c) => (
                        <span key={c} className="truncate text-center" title={c}>
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            );
            return rows;
          }, [] as React.ReactNode[])}
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Guidelines" title="最佳实践" />
        <SpecList items={[
          "数据色与语义色（success/warning/error/info）是两套独立色板，色相相近也不得互相替代。",
          "单系列图表只用一种颜色；多系列逐步启用分类色，颜色必须配合标签、图例和数值。",
          "柱状图从零基线开始；阈值线、异常点使用语义色标注，不占用数据色。",
          "环图段数较多时配合图例确保辨识。",
          "设计师在 Figma 中按需从色板选取，前端通过 tokens.css 的 --data-{family}-{index} 变量获取颜色。",
          "修改色值只需编辑 src/data/chartColors.ts，ColorsPage 和 ChartPage 自动同步。",
        ]} />
      </section>
    </div>
  );
}
