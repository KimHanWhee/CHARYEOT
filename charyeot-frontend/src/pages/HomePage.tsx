import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GAME_TABS, GAME_PATHS, GAMES_WITH_TAG } from '../lib/constants';
import { useGame } from '../contexts/GameContext';
export function HomePage() {
  const navigate = useNavigate();
  const { selectedGame } = useGame();
  const needsTag = GAMES_WITH_TAG.has(selectedGame);

  const [name, setName] = useState('');
  const [tag, setTag] = useState('');

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const game = GAME_TABS.find(g => g.id === selectedGame);
    const userTag = tag.trim() || "KR1";
    navigate(`/${game?.path || GAME_PATHS.LOL}/search/${encodeURIComponent(name)}/${encodeURIComponent(userTag)}`);
  };

  const isDisabled = !name.trim();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8"
    >
      <div className="space-y-4 max-w-2xl">
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.9]">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500 dark:from-rose-200 dark:to-orange-200">
            "CHARYEOT."
          </span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl max-w-lg mx-auto">
          Stop guessing. Start blaming.
        </p>
      </div>

      <form onSubmit={handleSearch} className="w-full max-w-lg relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-orange-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
        <div className="relative flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-2xl transition-colors focus-within:border-rose-500/50">
          <Search className="ml-4 flex-shrink-0 text-slate-400" size={20} />

          {/* 이름 입력 */}
          <input
            type="text"
            placeholder="소환사명"
            className="flex-1 min-w-0 bg-transparent border-none p-4 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-0"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* 태그 입력 — LOL / VALORANT 전용 */}

            {needsTag && (
              <div
                key="tag-input"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 'auto', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center border-l border-slate-200 dark:border-slate-700 overflow-hidden"
              >
                <span className="pl-3 text-slate-400 font-medium select-none">#</span>
                <input
                  type="text"
                  placeholder="태그"
                  className="w-20 bg-transparent border-none p-4 pl-1 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-0"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                />
              </div>
            )}

          <button
            type="submit"
            disabled={isDisabled}
            className="px-6 py-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed border-l border-slate-200 dark:border-slate-700 flex-shrink-0"
          >
            Enter
          </button>
        </div>
      </form>
    </motion.div>
  );
}
