import { Route, Routes } from "react-router-dom";
import DocsLayout from "../components/docs/DocsLayout";
import ColorsPage from "../pages/design-system/ColorsPage";
import ButtonPage from "../pages/design-system/components/ButtonPage";
import CardPage from "../pages/design-system/components/CardPage";
import ComponentPlaceholderPage from "../pages/design-system/components/ComponentPlaceholderPage";
import InputPage from "../pages/design-system/components/InputPage";
import ModalPage from "../pages/design-system/components/ModalPage";
import PaginationPage from "../pages/design-system/components/PaginationPage";
import SelectPage from "../pages/design-system/components/SelectPage";
import TablePage from "../pages/design-system/components/TablePage";
import TabsPage from "../pages/design-system/components/TabsPage";
import SwitchPage from "../pages/design-system/components/SwitchPage";
import CheckboxPage from "../pages/design-system/components/CheckboxPage";
import RadioPage from "../pages/design-system/components/RadioPage";
import TextareaPage from "../pages/design-system/components/TextareaPage";
import ToastPage from "../pages/design-system/components/ToastPage";

import TagPage from "../pages/design-system/components/TagPage";
import HomePage from "../pages/design-system/HomePage";
import IconPage from "../pages/design-system/IconPage";
import LayoutPage from "../pages/design-system/LayoutPage";
import RadiusPage from "../pages/design-system/RadiusPage";
import ShadowPage from "../pages/design-system/ShadowPage";
import SpacingPage from "../pages/design-system/SpacingPage";
import ListTemplatePage from "../pages/design-system/templates/ListTemplatePage";
import TypographyPage from "../pages/design-system/TypographyPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<DocsLayout />}>
        <Route index element={<HomePage />} />
      </Route>
      <Route path="/design-system" element={<DocsLayout />}>
        <Route path="colors" element={<ColorsPage />} />
      </Route>
      <Route path="/layout" element={<DocsLayout />}>
        <Route index element={<LayoutPage />} />
      </Route>
      <Route path="/icon" element={<DocsLayout />}>
        <Route index element={<IconPage />} />
      </Route>
      <Route path="/radius" element={<DocsLayout />}>
        <Route index element={<RadiusPage />} />
      </Route>
      <Route path="/shadow" element={<DocsLayout />}>
        <Route index element={<ShadowPage />} />
      </Route>
      <Route path="/spacing" element={<DocsLayout />}>
        <Route index element={<SpacingPage />} />
      </Route>
      <Route path="/typography" element={<DocsLayout />}>
        <Route index element={<TypographyPage />} />
      </Route>
      <Route path="/components/button" element={<DocsLayout />}>
        <Route index element={<ButtonPage />} />
      </Route>
      <Route path="/components/icon" element={<DocsLayout />}>
        <Route index element={<IconPage />} />
      </Route>
      <Route path="/components/input" element={<DocsLayout />}>
        <Route index element={<InputPage />} />
      </Route>
      <Route path="/components/form" element={<DocsLayout />}>
        <Route
          index
          element={
            <ComponentPlaceholderPage
              title="表单"
              description="表单组件用于承载字段录入、校验反馈、提交操作和业务流程配置，后续将统一输入框、选择器、开关、单选框、复选框等表单控件的组合规范。"
            />
          }
        />
      </Route>
      <Route path="/components/description-list" element={<DocsLayout />}>
        <Route
          index
          element={
            <ComponentPlaceholderPage
              title="描述列表"
              description="描述列表用于展示对象属性、材料参数、审批信息和详情页字段，强调标签和值之间的稳定对齐与高密度可读性。"
            />
          }
        />
      </Route>
      <Route path="/components/collapse" element={<DocsLayout />}>
        <Route
          index
          element={
            <ComponentPlaceholderPage
              title="折叠面板"
              description="折叠面板用于收纳可展开内容，适合高级筛选、配置分组、长表单和材料参数说明等场景。"
            />
          }
        />
      </Route>
      <Route path="/components/select" element={<DocsLayout />}>
        <Route index element={<SelectPage />} />
      </Route>
      <Route path="/components/tree" element={<DocsLayout />}>
        <Route
          index
          element={
            <ComponentPlaceholderPage
              title="树"
              description="树组件用于承载目录、组织、权限、材料分类和数据资产层级关系，后续将补齐选择、展开、搜索和异步加载规范。"
            />
          }
        />
      </Route>
      <Route path="/components/transfer" element={<DocsLayout />}>
        <Route
          index
          element={
            <ComponentPlaceholderPage
              title="穿梭框"
              description="穿梭框用于在两个集合之间移动条目，适合权限分配、字段选择、数据集配置和批量对象选择。"
            />
          }
        />
      </Route>
      <Route path="/components/table" element={<DocsLayout />}>
        <Route index element={<TablePage />} />
      </Route>
      <Route path="/components/card" element={<DocsLayout />}>
        <Route index element={<CardPage />} />
      </Route>
      <Route path="/components/modal" element={<DocsLayout />}>
        <Route index element={<ModalPage />} />
      </Route>
      <Route path="/components/tag" element={<DocsLayout />}>
        <Route index element={<TagPage />} />
      </Route>
      <Route path="/components/avatar" element={<DocsLayout />}>
        <Route
          index
          element={
            <ComponentPlaceholderPage
              title="头像"
              description="头像用于展示用户、组织或角色身份，后续将补齐尺寸、占位、组合头像和权限身份场景。"
            />
          }
        />
      </Route>
      <Route path="/components/badge" element={<DocsLayout />}>
        <Route
          index
          element={
            <ComponentPlaceholderPage
              title="徽标数"
              description="徽标数用于展示消息数量、待处理任务和状态计数，应保持克制，避免替代状态标签或重要警告。"
            />
          }
        />
      </Route>
      <Route path="/components/image" element={<DocsLayout />}>
        <Route
          index
          element={
            <ComponentPlaceholderPage
              title="图片"
              description="图片组件用于产品展示、材料图像、头像和预览场景，后续将补齐比例、占位、加载失败和预览规范。"
            />
          }
        />
      </Route>
      <Route path="/components/breadcrumb" element={<DocsLayout />}>
        <Route
          index
          element={
            <ComponentPlaceholderPage
              title="面包屑"
              description="面包屑用于表达页面层级和当前位置，适合后台管理、数据目录、材料详情和多级业务流程。"
            />
          }
        />
      </Route>
      <Route path="/components/tabs" element={<DocsLayout />}>
        <Route index element={<TabsPage />} />
      </Route>
      <Route path="/components/pagination" element={<DocsLayout />}>
        <Route index element={<PaginationPage />} />
      </Route>
      <Route path="/components/switch" element={<DocsLayout />}>
        <Route index element={<SwitchPage />} />
      </Route>
      <Route path="/components/checkbox" element={<DocsLayout />}>
        <Route index element={<CheckboxPage />} />
      </Route>
      <Route path="/components/radio" element={<DocsLayout />}>
        <Route index element={<RadioPage />} />
      </Route>
      <Route path="/components/textarea" element={<DocsLayout />}>
        <Route index element={<TextareaPage />} />
      </Route>
      <Route path="/components/toast" element={<DocsLayout />}>
        <Route index element={<ToastPage />} />
      </Route>
      <Route path="/components/empty" element={<DocsLayout />}>
        <Route
          index
          element={
            <ComponentPlaceholderPage
              title="空状态"
              description="空状态用于数据为空、搜索无结果、权限不足和首次使用引导，后续将补齐图标、文案、操作按钮和业务语义规范。"
            />
          }
        />
      </Route>
      <Route path="/templates/list" element={<DocsLayout />}>
        <Route index element={<ListTemplatePage />} />
      </Route>
    </Routes>
  );
}
