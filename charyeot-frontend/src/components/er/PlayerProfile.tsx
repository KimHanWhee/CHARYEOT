import { JSX, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { User, RefreshCw } from 'lucide-react';

const COOLDOWN_SEC = 10;

interface PlayerProfileProps {
  name: string;
  mostPlayeCharacterName: string;
  level: number;
}

export function PlayerProfile({ name, mostPlayeCharacterName, level }: PlayerProfileProps): JSX.Element {
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleRefresh = () => {
    if (cooldown > 0) return;
    setCooldown(COOLDOWN_SEC);
    window.location.reload();
  };

  const characterImgUrl = mostPlayeCharacterName
    ? `https://pub-ec9311e4416d473a9cdd54c206eb2fef.r2.dev/${mostPlayeCharacterName}_Half_00.png`
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 shadow-md bg-white dark:bg-slate-900/80"
    >
      {/* 배경 로고 이미지 - 라이트/다크 각각 */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <img
          src="https://pub-ec9311e4416d473a9cdd54c206eb2fef.r2.dev/logo/logo_black.png"
          alt=""
          className="block dark:hidden h-4/5 w-auto object-contain opacity-10"
        />
        <img
          src="https://pub-ec9311e4416d473a9cdd54c206eb2fef.r2.dev/logo/logo_white.png"
          alt=""
          className="hidden dark:block h-4/5 w-auto object-contain opacity-10"
        />
      </div>

      <div className="relative flex items-stretch h-50">
        {/* 캐릭터 이미지 */}
        <div className="w-50 flex-shrink-0 overflow-hidden">
          {characterImgUrl ? (
            <img
              src={characterImgUrl}
              alt={mostPlayeCharacterName}
              className="w-full h-full object-cover object-top scale-130"
            />
          ) : (
            <User size={36} className="text-slate-400 dark:text-slate-500" />
          )}
        </div>

        {/* 정보 영역 */}
        <div className="flex-1 p-5 flex flex-col justify-center gap-2">
          <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
            Lv.{level}
          </span>
          <span className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
            {name}
          </span>

          <button
            onClick={handleRefresh}
            disabled={cooldown > 0}
            className="flex items-center gap-1.5 self-start px-3 py-1 rounded-lg text-xs font-medium transition-colors
              bg-rose-100 hover:bg-rose-200 hover:cursor-pointer text-rose-700
              dark:bg-rose-900/50 dark:hover:bg-rose-800 dark:text-rose-300
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw size={12} />
            {cooldown > 0 ? `갱신 대기 (${cooldown}s)` : '전적 갱신'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
