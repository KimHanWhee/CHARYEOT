import { JSX, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { User, RefreshCw } from 'lucide-react';

const COOLDOWN_SEC = 10;

interface PlayerProfileProps {
  name: string;
  tag: string;
  level: number;
  iconUrl?: string;
  onRefresh?: () => void;
}

export function PlayerProfile({ name, tag, level, iconUrl, onRefresh }: PlayerProfileProps): JSX.Element {
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleRefresh = () => {
    if (cooldown > 0 || !onRefresh) return;
    onRefresh();
    setCooldown(COOLDOWN_SEC);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-5 p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 shadow-md"
    >
      {/* 아이콘 + 레벨 */}
      <div className="relative flex-shrink-0">
        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-slate-200 dark:border-slate-600 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
          {iconUrl ? (
            <img
              src={iconUrl}
              alt={`${name} 아이콘`}
              className="w-full h-full object-cover"
            />
          ) : (
            <User size={36} className="text-slate-400 dark:text-slate-500" />
          )}
        </div>
        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-slate-800 dark:bg-slate-600 text-white text-xs font-bold px-2 py-0.5 rounded-full border border-slate-700 dark:border-slate-500 whitespace-nowrap">
          Lv.{level}
        </span>
      </div>

      {/* 이름 + 태그 + 갱신 버튼 */}
      <div className="flex flex-col gap-2 mt-1">
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-bold text-slate-900 dark:text-white leading-none">
            {name}
          </span>
          <span className="text-base font-medium text-slate-400 dark:text-slate-500 leading-none">
            #{tag}
          </span>
        </div>

        {onRefresh && (
          <button
            onClick={handleRefresh}
            disabled={cooldown > 0}
            className="flex items-center gap-1.5 self-start px-3 py-1 rounded-lg text-xs font-medium transition-colors
              bg-rose-100 hover:bg-rose-200 hover:cursor-pointer text-rose-700
              dark:bg-rose-900/50 dark:hover:bg-rose-800 dark:text-rose-300
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw size={12} className={cooldown > 0 ? '' : 'group-hover:rotate-180 transition-transform'} />
            {cooldown > 0 ? `갱신 대기 (${cooldown}s)` : '전적 갱신'}
          </button>
        )}
      </div>
    </motion.div>
  );
}
