import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { fetchErUserSearchData } from '../../api/er/ErApi';
import { UserStats, BattleUserResult } from '../../types/er';

export function ErSearchResultsPage() {
  const { summonerName: nickname } = useParams<{ summonerName: string }>();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [games, setGames] = useState<BattleUserResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!nickname) return;
    setIsLoading(true);
    setError(null);
    setStats(null);
    setGames([]);

    const load = async () => {
      try {
        const [searchData] = await Promise.all([
          fetchErUserSearchData(nickname)
        ]);
        setStats(searchData.userStats[0]);
        setGames(searchData.battleUserResults);
      } catch (err) {
        console.error('ER 전적 조회 실패:', err);
        setError('플레이어 정보를 불러오지 못했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [nickname]);

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center min-h-[60vh] space-y-4"
      >
        <div className="w-12 h-12 border-4 border-slate-200 dark:border-slate-700 border-t-rose-500 rounded-full animate-spin" />
        <p className="text-slate-500 dark:text-slate-400">
          <span className="font-semibold text-slate-900 dark:text-white">
            {decodeURIComponent(nickname || '')}
          </span>{' '}
          전적 검색 중...
        </p>
      </motion.div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-500 dark:text-slate-400">
        <p className="text-lg font-medium">{error}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* 유저 프로필 */}
      {stats && (
        <div className="flex items-center gap-5 p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 shadow-md">
          <div>
            <span className="text-2xl font-bold text-slate-900 dark:text-white">{nickname}</span>
            <span>LV.{games[0].accountLevel}</span>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              MMR {stats.mmr} · 랭크 {stats.rank} / {stats.rankSize}
              · 총 {stats.totalGames}게임 · {stats.totalWins}승
            </p>
          </div>
        </div>
      )}

      {/* 전적 목록 */}
      <div className="flex items-center justify-between">
        <p className="text-slate-500 text-sm">최근 전적</p>
        <span className="text-slate-500 text-sm">{games.length} 게임 검색 됨</span>
      </div>

      <div className="grid gap-4">
        {games.map((game) => (
          <div
            key={game.gameId}
            className={`rounded-xl border-l-4 shadow-lg bg-white dark:bg-slate-900/80 p-4 ${
              game.gameRank === 1 ? 'border-emerald-500' : 'border-rose-500'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-lg font-bold ${game.gameRank === 1 ? 'text-emerald-500' : 'text-slate-700 dark:text-slate-200'}`}>
                  {game.gameRank}위
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  캐릭터 #{game.characterNum} · Lv.{game.characterLevel}
                  · {Math.floor(game.playTime / 60)}분 {game.playTime % 60}초
                </p>
              </div>
              <div className="text-right text-sm text-slate-600 dark:text-slate-300 space-y-0.5">
                <p>킬 {game.playerKill} · 어시 {game.playerAssistant}</p>
                <p>딜량 {game.damageToPlayer.toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
