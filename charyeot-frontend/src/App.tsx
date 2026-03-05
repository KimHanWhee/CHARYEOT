import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { GameProvider } from './contexts/GameContext';
import { DataDragonProvider } from './contexts/DataDragonContext';
import { GAME_PATHS } from './lib/constants';

// Legacy redirect component
function LegacySearchRedirect() {
  const { summonerName } = useParams<{ summonerName: string }>();
  return <Navigate to={`/${GAME_PATHS.LOL}/search/${summonerName}`} replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <GameProvider>
      <DataDragonProvider>
        <Layout>
          <Routes>
            {/* Home */}
            <Route path="/" element={<HomePage />} />

            {/* Game-specific search routes */}
            <Route path="/:game/search/:summonerName/:summonerTag" element={<SearchResultsPage />} />

            {/* Legacy redirect for old URLs */}
            <Route path="/search/:summonerName" element={<LegacySearchRedirect />} />
          </Routes>
        </Layout>
      </DataDragonProvider>
      </GameProvider>
    </BrowserRouter>
  );
}
