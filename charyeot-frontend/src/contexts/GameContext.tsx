import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { GAME_TABS, GameType } from '../lib/constants';

interface GameContextValue {
  selectedGame: GameType;
  setSelectedGame: (game: GameType) => void;
}

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const currentGameFromUrl = GAME_TABS.find(g => location.pathname.startsWith(`/${g.path}`));

  const [selectedGame, setSelectedGame] = useState<GameType>(currentGameFromUrl?.id || 'LOL');

  useEffect(() => {
    if (currentGameFromUrl) {
      setSelectedGame(currentGameFromUrl.id);
    }
  }, [currentGameFromUrl]);

  useEffect(() => {
    console.log('[GameContext] selectedGame:', selectedGame);
  }, [selectedGame]);

  return (
    <GameContext.Provider value={{ selectedGame, setSelectedGame }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame(): GameContextValue {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
