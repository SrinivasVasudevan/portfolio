import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import Me from './pages/Me';
import MoreMe from './pages/MoreMe';
import Workexp from './pages/Workexp';
import FavProjects from './pages/FavProjects';
import Research from './pages/Research';

function App() {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}config.json`)
      .then((r) => r.json())
      .then(setConfig)
      .catch(() => setConfig({ error: true }));
  }, []);

  if (config?.error) {
    return (
      <p style={{ color: '#888', padding: '2rem' }}>Failed to load config.json.</p>
    );
  }
  if (!config) {
    return (
      <p style={{ color: '#888', padding: '2rem' }}>Loading...</p>
    );
  }

  return (
    <Layout config={config}>
      <Routes>
        <Route path="/" element={<Home config={config} />} />
        <Route path="/me" element={<Me />} />
        <Route path="/more-me" element={<MoreMe />} />
        <Route path="/workexp" element={<Workexp />} />
        <Route path="/fav-projects" element={<FavProjects />} />
        <Route path="/research" element={<Research />} />
      </Routes>
    </Layout>
  );
}

export default App;
