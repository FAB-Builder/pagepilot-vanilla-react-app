import { Routes, Route, useSearchParams, useNavigate, Navigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Tours from './pages/Tours';
import Demos from './pages/Demos';
import Tooltips from './pages/Tooltips';
import FetchPages from './pages/pages/fetch-pages';
import TemplateVariables from './pages/pages/template-variables';
import EditorCss from './pages/pages/editor-css';
import LinkPageToMenu from './pages/pages/link-page-to-menu';
import ExternalSections from './pages/pages/external-sections';
import { PAGES_DEFAULT } from './pages/pages/subModules';
import ContextHelpMenu from './pages/context-help-menu';
import Webinar from './pages/webinar';
import Forms from './pages/forms';
import AppBanner from './pages/AppBanner';
import ButtonBlock from './pages/blocks/button';
import HeadingBlock from './pages/blocks/heading';
import TextBlock from './pages/blocks/text';
import ListBlock from './pages/blocks/list';
import TableBlock from './pages/blocks/table';
import MarkdownBlock from './pages/blocks/markdown';
import QuillBlock from './pages/blocks/quill';
import ButtonGroupBlock from './pages/blocks/button-group';
import AccordionBlock from './pages/blocks/accordion';
import TabsBlock from './pages/blocks/tabs';
import StepperBlock from './pages/blocks/stepper';
import ImageBlock from './pages/blocks/image';
import LogoBlock from './pages/blocks/logo';
import VideoBlock from './pages/blocks/video';
import AvatarBlock from './pages/blocks/avatar';
import ContainerBlock from './pages/blocks/container';
import ColumnsBlock from './pages/blocks/columns';
import FlexColumnsBlock from './pages/blocks/flex-columns';
import GridBlock from './pages/blocks/grid';
import CarouselBlock from './pages/blocks/carousel';
import PaginationBlock from './pages/blocks/pagination';
import MarqueeBlock from './pages/blocks/marquee';
import DividerBlock from './pages/blocks/divider';
import SpacerBlock from './pages/blocks/spacer';
import HtmlBlock from './pages/blocks/html';
import { BLOCKS_DEFAULT } from './pages/blocks/subModules';
import { useEffect } from 'react';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    document.querySelector('main')?.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

const baseName = "/pagepilot-vanilla-react-app"

function App() {

  const [searchParams] = useSearchParams() // <-- get the "path"
  const navigate = useNavigate()

  useEffect(() => {
    // check is there any redirect?
    if (searchParams?.get('path')?.includes(baseName)) {
      const redirectUrl = searchParams?.get('path')?.replace(baseName,"");

      if (redirectUrl) {
        navigate(redirectUrl) // redirect
      }
    }
  }, [])

  return (
    <Routes>
      <Route element={<><ScrollToTop /><Layout /></>}>
        <Route index element={<Home />} />
        <Route path="tours" element={<Tours />} />
        <Route path="demos" element={<Demos />} />
        <Route path="tooltips" element={<Tooltips />} />
        {/* Pages module — redirects to its first sub-module */}
        <Route path="pages" element={<Navigate to={PAGES_DEFAULT} replace />} />
        <Route path="pages/fetch-pages" element={<FetchPages />} />
        <Route path="pages/template-variables" element={<TemplateVariables />} />
        <Route path="pages/link-page-to-menu" element={<LinkPageToMenu />} />
        <Route path="pages/editor-css" element={<EditorCss />} />
        <Route path="pages/external-sections" element={<ExternalSections />} />
        <Route path="context-help-menu" element={<ContextHelpMenu />} />
        <Route path="webinar" element={<Webinar />} />
        <Route path="forms" element={<Forms />} />
        <Route path="app-banner" element={<AppBanner />} />
        {/* Blocks module — redirects to its first sub-module */}
        <Route path="blocks" element={<Navigate to={BLOCKS_DEFAULT} replace />} />
        <Route path="blocks/heading" element={<HeadingBlock />} />
        <Route path="blocks/text" element={<TextBlock />} />
        <Route path="blocks/list" element={<ListBlock />} />
        <Route path="blocks/table" element={<TableBlock />} />
        <Route path="blocks/markdown" element={<MarkdownBlock />} />
        <Route path="blocks/quill" element={<QuillBlock />} />
        <Route path="blocks/button" element={<ButtonBlock />} />
        <Route path="blocks/button-group" element={<ButtonGroupBlock />} />
        <Route path="blocks/accordion" element={<AccordionBlock />} />
        <Route path="blocks/tabs" element={<TabsBlock />} />
        <Route path="blocks/stepper" element={<StepperBlock />} />
        <Route path="blocks/image" element={<ImageBlock />} />
        <Route path="blocks/logo" element={<LogoBlock />} />
        <Route path="blocks/video" element={<VideoBlock />} />
        <Route path="blocks/avatar" element={<AvatarBlock />} />
        <Route path="blocks/container" element={<ContainerBlock />} />
        <Route path="blocks/columns" element={<ColumnsBlock />} />
        <Route path="blocks/flex-columns" element={<FlexColumnsBlock />} />
        <Route path="blocks/grid" element={<GridBlock />} />
        <Route path="blocks/carousel" element={<CarouselBlock />} />
        <Route path="blocks/pagination" element={<PaginationBlock />} />
        <Route path="blocks/marquee" element={<MarqueeBlock />} />
        <Route path="blocks/divider" element={<DividerBlock />} />
        <Route path="blocks/spacer" element={<SpacerBlock />} />
        <Route path="blocks/html" element={<HtmlBlock />} />
        {/* Unknown slug → send the user back home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
