import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Tours from './pages/Tours';
import Demos from './pages/Demos';
import Tooltips from './pages/Tooltips';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="tours" element={<Tours />} />
        <Route path="demos" element={<Demos />} />
        <Route path="tooltips" element={<Tooltips />} />
      </Route>
    </Routes>
  );
}

export default App;
