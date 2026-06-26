import { Routes, Route, useSearchParams, useNavigate, Navigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Tours from './pages/Tours';
import Demos from './pages/Demos';
import Tooltips from './pages/Tooltips';
import FetchPages from './pages/pages/fetch-pages';
import TemplateVariables from './pages/pages/template-variables';
import EditorCss from './pages/pages/editor-css';
import ExternalSections from './pages/pages/external-sections';
import { PAGES_DEFAULT } from './pages/pages/subModules';
import ContextHelpMenu from './pages/context-help-menu';
import Webinar from './pages/webinar';
import Forms from './pages/forms';
import AppBanner from './pages/AppBanner';
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
        <Route path="pages/editor-css" element={<EditorCss />} />
        <Route path="pages/external-sections" element={<ExternalSections />} />
        <Route path="context-help-menu" element={<ContextHelpMenu />} />
        <Route path="webinar" element={<Webinar />} />
        <Route path="forms" element={<Forms />} />
        <Route path="app-banner" element={<AppBanner />} />
        {/* Unknown slug → send the user back home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
