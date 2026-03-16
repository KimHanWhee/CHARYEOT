import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "motion/react";
import { fetchErUserSearchData } from "../../api/er/ErApi";
import { UserStats, UserInfo, BattleUserResponse } from "../../types/er";
import { PlayerProfile } from "@/src/components/er/PlayerProfile";
import { MatchCard } from "../../components/er/MatchCard";

export function ErSearchResultsPage() {
  const { summonerName: nickname } = useParams<{ summonerName: string }>();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [games, setGames] = useState<BattleUserResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!nickname) return;
    setIsLoading(true);
    setError(null);
    setUser(null);
    setStats(null);
    setGames([]);

    const load = async () => {
      try {
        const [searchData] = await Promise.all([
          fetchErUserSearchData(nickname),
        ]);
        setUser(searchData.userInfo);
        setStats(searchData.userStats[0]);
        setGames(searchData.battleUserResponses);
      } catch (err) {
        console.error("ER 전적 조회 실패:", err);
        setError("플레이어 정보를 불러오지 못했습니다.");
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
            {decodeURIComponent(nickname || "")}
          </span>{" "}
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
      {stats && games && (
        <PlayerProfile
          name={user.nickname}
          level={games[0]?.accountLevel ?? 0}
          mostPlayeCharacterName={stats.characterStats[0].engCharacterName}
        />
      )}

      {/* 전적 목록 */}
      <div className="flex items-center justify-between">
        <p className="text-slate-500 text-sm">최근 전적</p>
        <span className="text-slate-500 text-sm">
          {games.length} 게임 검색 됨
        </span>
      </div>

      <div className="grid gap-4">
        {games.map((game) => (
          <MatchCard game={game} myNickname={nickname ?? ""} />
        ))}
      </div>
    </motion.div>
  );
}
