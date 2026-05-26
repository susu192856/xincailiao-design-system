import { Route, Routes } from "react-router-dom";
import DocsLayout from "../components/docs/DocsLayout";
import ColorsPage from "../pages/design-system/ColorsPage";
import ButtonPage from "../pages/design-system/components/ButtonPage";
import CardPage from "../pages/design-system/components/CardPage";
import InputPage from "../pages/design-system/components/InputPage";
import ModalPage from "../pages/design-system/components/ModalPage";
import PaginationPage from "../pages/design-system/components/PaginationPage";
import SelectPage from "../pages/design-system/components/SelectPage";
import TablePage from "../pages/design-system/components/TablePage";
import TabsPage from "../pages/design-system/components/TabsPage";
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
      <Route path="/components/input" element={<DocsLayout />}>
        <Route index element={<InputPage />} />
      </Route>
      <Route path="/components/select" element={<DocsLayout />}>
        <Route index element={<SelectPage />} />
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
      <Route path="/components/tabs" element={<DocsLayout />}>
        <Route index element={<TabsPage />} />
      </Route>
      <Route path="/components/pagination" element={<DocsLayout />}>
        <Route index element={<PaginationPage />} />
      </Route>
      <Route path="/templates/list" element={<DocsLayout />}>
        <Route index element={<ListTemplatePage />} />
      </Route>
    </Routes>
  );
}
