import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "motion/react";
import { MatchCard } from "../../components/lol/MatchCard";
import { RankTierCard } from "../../components/lol/RankTierCard";
import { PlayerProfile } from "../../components/lol/PlayerProfile";
import { fetchMatches, fetchPlayerProfile } from "../../api/lol/LolApi";
import { Match, Profile } from "../../types/lol";
import { useDataDragon } from "../../contexts/DataDragonContext";

export function LolSearchResultsPage() {
  const { summonerName, summonerTag } = useParams<{
    summonerName: string;
    summonerTag: string;
  }>();
  const { version } = useDataDragon();
  const [matches, setMatches] = useState<Match[]>([]);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [isMatchesLoading, setIsMatchesLoading] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    setIsProfileLoading(true);
    setProfile(null);
    setMatches([]);

    const loadProfile = async () => {
      try {
        const profileData = await fetchPlayerProfile(summonerName, summonerTag);
        setProfile(profileData);
      } catch (err) {
        console.error("프로필 조회 실패:", err);
      } finally {
        setIsProfileLoading(false);
      }
    };

    loadProfile();
  }, [summonerName, summonerTag]);

  const loadMatches = async (
    puuid: string,
    gameName: string,
    tagLine: string,
  ) => {
    try {
      setIsMatchesLoading(true);
      console.log(`${gameName}#${tagLine} 전적 검색중...`);
      const matchRes = await fetchMatches(puuid);
      setMatches(matchRes);
    } catch (err) {
      console.error("전적 조회 실패:", err);
    } finally {
      setIsMatchesLoading(false);
    }
  };

  useEffect(() => {
    if (!profile) return;
    loadMatches(profile.puuid, profile.gameName, profile.tagLine);
  }, [profile]);

  if (isProfileLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center min-h-[60vh] space-y-4"
      >
        <div className="w-12 h-12 border-4 border-slate-200 dark:border-slate-700 border-t-rose-500 rounded-full animate-spin" />
        <p className="text-slate-500 dark:text-slate-400">
          <span className="font-semibold text-slate-900 dark:text-white">
            {decodeURIComponent(summonerName || "")}
          </span>{" "}
          프로필 검색 중...
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {profile && (
        <PlayerProfile
          name={profile.gameName}
          tag={profile.tagLine}
          level={profile.summonerLevel}
          iconUrl={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${profile.profileIconId}.png`}
          onRefresh={() =>
            loadMatches(profile.puuid, profile.gameName, profile.tagLine)
          }
        />
      )}

      {isMatchesLoading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-16 space-y-4"
        >
          <div className="w-8 h-8 border-4 border-slate-200 dark:border-slate-700 border-t-rose-500 rounded-full animate-spin" />
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            전적 불러오는 중...
          </p>
        </motion.div>
      ) : (
        <div className="flex flex-col xl:flex-row gap-4 items-start">
          {/* 좌측: 랭크 티어 (xl 이상에서 sticky 사이드바) */}
          {profile && (
            <div className="w-full xl:w-48 xl:flex-shrink-0 xl:sticky xl:top-4">
              <RankTierCard leagueEntries={profile.leagueEntries} />
            </div>
          )}

          {/* 우측: 최근 전적 */}
          <div className="flex-1 min-w-0 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="text-slate-500 text-sm">최근 전적</p>
              <span className="text-slate-500 text-sm">
                {matches.length} 게임 검색 됨
              </span>
            </div>

            <div className="grid gap-4">
              {matches.map((match) => (
                <MatchCard
                  match={match}
                  targetPuuid={profile.puuid}
                  version={version}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
