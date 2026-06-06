import { Routes, Route, useSearchParams, useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Tours from './pages/Tours';
import Demos from './pages/Demos';
import Tooltips from './pages/Tooltips';
import { useEffect } from 'react';

const baseName = "/pagepilot-vanilla-react-app"

function App() {

  const [searchParams] = useSearchParams() // <-- get the "path"
  const navigate = useNavigate()

  useEffect(() => {
    // check is there any redirect?
    if (searchParams?.get('path')?.includes(baseName)) {
      const redirectUrl = searchParams?.get('path')?.split('/').pop()

      if (redirectUrl) {
        navigate('/' + redirectUrl) // redirect
      }
    }
  }, [])

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
