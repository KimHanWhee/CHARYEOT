import { useState, FormEvent, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Gamepad2, Sun, Moon, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { GAME_PATHS, GAME_TABS, GameTab, GAMES_WITH_TAG } from '../lib/constants';
import { useGame } from '../contexts/GameContext';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedGame, setSelectedGame } = useGame();

  const isSearchPage = location.pathname.includes('/search/');
  const needsTag = GAMES_WITH_TAG.has(selectedGame);

  const [darkMode, setDarkMode] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [searchTag, setSearchTag] = useState('');

  const buildSearchPath = (name: string, tag: string) => {
    if (!name.trim()) return;
    const game = GAME_TABS.find(g => g.id === selectedGame);
    const basePath = `/${game?.path || GAME_PATHS.LOL}/search/${encodeURIComponent(name.trim())}`;
    if (needsTag) {
      const userTag = tag.trim() || 'KR1';
      return `${basePath}/${encodeURIComponent(userTag)}`;
    }
    return basePath;
  };

  const handleGameSelect = (game: GameTab) => {
    if (game.available) {
      setSelectedGame(game.id);
      navigate('/');
    } else {
      setShowComingSoon(true);
      setTimeout(() => setShowComingSoon(false), 2000);
    }
  };

  const handleMiniSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!searchName.trim()) return;
    navigate(buildSearchPath(searchName, searchTag));
    setSearchName('');
    setSearchTag('');
  };

  return (
    <div className={cn("min-h-screen font-sans transition-colors duration-300", darkMode ? "dark" : "")}>
      <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0c] text-slate-900 dark:text-slate-200 selection:bg-rose-500/30 transition-colors duration-300">
        {/* Background Grid */}
        <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none z-0" />
        <div className="fixed inset-0 bg-gradient-to-b from-white/0 via-white/50 to-slate-50 dark:from-slate-900/0 dark:via-slate-900/50 dark:to-[#0a0a0c] pointer-events-none z-0 transition-colors duration-300" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-8 md:py-12">
          {/* Header */}
          <header className="flex items-center justify-between mb-12">
            {/* Logo */}
            <div
              onClick={() => navigate('/')}
              className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 bg-rose-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(225,29,72,0.5)]">
                <Gamepad2 className="text-white" />
              </div>
              <span className="text-xl font-black tracking-tighter text-slate-900 dark:text-white hidden sm:inline">CHARYEOT.GG</span>
            </div>

            {/* Game Tabs */}
            <div className="flex items-center gap-2 relative">
              <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800/50 rounded-full">
                {GAME_TABS.map((game) => (
                  <button
                    key={game.id}
                    onClick={() => handleGameSelect(game)}
                    className={cn(
                      "relative px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs hover:cursor-pointer sm:text-sm font-medium transition-all duration-200",
                      selectedGame === game.id && game.available
                        ? "bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-400 shadow-sm"
                        : game.available
                          ? "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                          : "text-slate-400 dark:text-slate-600 cursor-not-allowed"
                    )}
                  >
                    <span className="hidden sm:inline">{game.name}</span>
                    <span className="sm:hidden">{game.shortName}</span>
                    {!game.available && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full" />
                    )}
                  </button>
                ))}
              </div>

              <AnimatePresence>
                {showComingSoon && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium rounded-lg shadow-lg whitespace-nowrap z-20"
                  >
                    Coming Soon!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Mini Search - visible on search page */}
              {isSearchPage && (
                <form onSubmit={handleMiniSearch} className="hidden sm:flex items-center">
                  <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-transparent focus-within:border-rose-500/50 transition-colors">
                    <Search className="ml-3 text-slate-400 flex-shrink-0" size={16} />
                    <input
                      type="text"
                      placeholder="플레이어명..."
                      value={searchName}
                      onChange={(e) => setSearchName(e.target.value)}
                      className="w-24 lg:w-32 bg-transparent px-2 py-1.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
                    />
                    {needsTag && (
                      <>
                        <span className="text-slate-400 text-sm select-none">#</span>
                        <input
                          type="text"
                          placeholder="태그"
                          value={searchTag}
                          onChange={(e) => setSearchTag(e.target.value)}
                          className="w-14 lg:w-16 bg-transparent px-1 py-1.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
                        />
                      </>
                    )}
                    <button
                      type="submit"
                      disabled={!searchName.trim()}
                      className="px-3 py-1.5 text-slate-500 hover:text-rose-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Search size={16} />
                    </button>
                  </div>
                </form>
              )}

              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                aria-label="Toggle Dark Mode"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </header>

          {/* Page Content */}
          {children}

          <footer className="mt-20 text-center text-slate-500 dark:text-slate-600 text-sm">
            <p>© {new Date().getFullYear()} charyeot.gg - The ultimate tool for finding who to blame.</p>
            <p className="mt-2 text-xs">Not affiliated with Riot Games or any other game publisher.</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
