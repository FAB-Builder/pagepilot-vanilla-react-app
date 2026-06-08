import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Tours from './pages/Tours';
import Demos from './pages/Demos';
import Tooltips from './pages/Tooltips';
import LeadForm from './pages/pages/LeadForm';
import FetchPages from './pages/pages/FetchPages';
import { PAGES_DEFAULT } from './pages/pages/subModules';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="tours" element={<Tours />} />
        <Route path="demos" element={<Demos />} />
        <Route path="tooltips" element={<Tooltips />} />
        {/* Pages module — redirects to its first sub-module */}
        <Route path="pages" element={<Navigate to={PAGES_DEFAULT} replace />} />
        <Route path="pages/lead-form" element={<LeadForm />} />
        <Route path="pages/fetch-pages" element={<FetchPages />} />
      </Route>
    </Routes>
  );
}

export default App;
