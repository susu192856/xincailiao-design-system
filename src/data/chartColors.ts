// 数据可视化色板 — 来自 DBS Data Visualisation 规范
// 共 10 个色系，每系 7 个深浅层级（0 最浅，6 最深）
// 修改色值后，ColorsPage、ChartPage 和 tokens.css 同步生效

export interface ColorFamily {
  key: string;
  name: string;
  shades: string[];
}

export const chartColorFamilies: ColorFamily[] = [
  {
    key: "amber",
    name: "Amber 琥珀",
    shades: ["#F3B348", "#E09E37", "#C4892E", "#A57526", "#8A5F1E", "#6A4B15", "#4E360D"],
  },
  {
    key: "orange",
    name: "Orange 橙",
    shades: ["#F2A479", "#EF8A54", "#EE7A40", "#D56B36", "#CA5F2D", "#B14B21", "#993C18"],
  },
  {
    key: "coral",
    name: "Coral 珊瑚",
    shades: ["#F1A08D", "#EF856C", "#ED6B4D", "#D4563B", "#BD4D34", "#A4432D", "#822310"],
  },
  {
    key: "red",
    name: "Red 红",
    shades: ["#F19D9B", "#EE817E", "#EC6762", "#E05650", "#D34841", "#C83D35", "#A92216"],
  },
  {
    key: "pink",
    name: "Pink 粉",
    shades: ["#F19AAC", "#EE7D96", "#D45772", "#C84D66", "#B03C54", "#98293C", "#9E1F2C"],
  },
  {
    key: "magenta",
    name: "Magenta 品红",
    shades: ["#E697D9", "#E377D0", "#BD50AA", "#BC48A7", "#BC39A2", "#982982", "#7A1A66"],
  },
  {
    key: "purple",
    name: "Purple 紫",
    shades: ["#BAA7F9", "#A78DF8", "#9374F7", "#7F59F6", "#6B40F4", "#5827F3", "#4412E2"],
  },
  {
    key: "indigo",
    name: "Indigo 靛蓝",
    shades: ["#A5B4F9", "#8A9EF8", "#728AF7", "#5673F6", "#3754DD", "#2B47D1", "#2036A0"],
  },
  {
    key: "blue",
    name: "Blue 蓝",
    shades: ["#8AC8FA", "#6EBAF9", "#55A9F8", "#459BF8", "#377ECA", "#2A64A1", "#1C4872"],
  },
  {
    key: "green",
    name: "Green 绿",
    shades: ["#7DCEB3", "#69CEA8", "#5DC79B", "#50B086", "#40906E", "#317156", "#21523F"],
  },
];
