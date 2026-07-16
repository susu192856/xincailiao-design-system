/**
 * DBS 浅色图表视觉配方。
 *
 * 这些值来自 DBS 图表组件本身，而不是从通用数据色谱中近似挑选。
 * 网页、代码合同与后续 Figma 导入应共同引用本文件定义的语义。
 */
export const dbsChartStyles = {
  surface: "#FFFFFF",
  text: {
    primary: "#172733",
    secondary: "#6E7880",
  },
  grid: "#DDE3E7",
  baseline: "#C7CFD5",
  skeleton: "#DDE3E7",
  bar: {
    primary: "#8657FF",
    secondary: "#76CAFF",
    trend: "#F392DD",
    horizontalSecondary: "#AC8CFF",
    bidirectionalSingle: "#6B8BFF",
    negative: "#E54B2E",
    positive: "#12CA98",
  },
  donut: {
    series: ["#5ED1B1", "#FF7E65", "#A1B5FF", "#E54C71", "#F392DD", "#FFB024"],
    hover: "#FFC866",
    lowValue: "#5ED1B1",
    remainder: "#DDE3E7",
  },
  semiDonut: {
    series: ["#34D1A6", "#FFB024", "#FF8446", "#F24949", "#00B383", "#DDE3E7"],
    hover: "#00926B",
  },
  line: {
    series: ["#009DFF", "#12CA98", "#AC8CFF", "#CC3DAB", "#0080D0", "#723DFD"],
    twoSeries: ["#009DFF", "#723DFD"],
    trend: "#909090",
  },
  area: {
    primary: "#28ACFF",
    secondaryFill: "#6D45FD",
    secondaryLine: "#723DFD",
    trend: "#CC47AE",
    unavailable: "#DCDCDC",
  },
  stackedArea: {
    twoSeries: ["#50BCFF", "#4E74FF"],
    fourSeries: ["#5ED1B1", "#009DFF", "#5F23FD", "#6B8BFF"],
    trend: "#909090",
  },
  geometry: {
    lineWidth: 2,
    dotSize: 8,
    sliceSeparator: 2,
    barRadius: 0,
    cardRadius: 8,
  },
  source: {
    theme: "light",
    bar: "DBS 01 Bar Chart & Grouped Bar Chart / Examples 5707:26244 / 5707:26350",
    line: "DBS 05 Line Chart / Examples 4200:177990",
    area: "DBS 06 Area Chart / Examples 4329:241100",
    stackedArea: "DBS 07 Stacked Area Chart / Examples 4345:180305",
    donut: "DBS 08 Donut & Semi-donut Chart / Examples 4350:200621",
  },
} as const;

export type DbsBarState = "default" | "trend" | "benchmark" | "skeleton";
export type DbsDonutState = "default" | "hover" | "low-value" | "no-data" | "skeleton";
export type DbsCurveState = "default" | "dots" | "smooth" | "trend" | "missing" | "skeleton";
