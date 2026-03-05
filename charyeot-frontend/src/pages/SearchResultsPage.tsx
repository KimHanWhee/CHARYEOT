import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { MatchCard } from '../components/MatchCard';
import { PlayerProfile } from '../components/PlayerProfile';
import { fetchMatches, fetchPlayerProfile } from '../api/PlayerApi';
import { Match, Profile } from '../types/api';
import { useDataDragon } from '../contexts/DataDragonContext';

export function SearchResultsPage() {
  const { game, summonerName, summonerTag } = useParams<{ game: string; summonerName: string; summonerTag: string }>();
  const { version } = useDataDragon();
  const [matches, setMatches] = useState<Match[]>([]);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [isMatchesLoading, setIsMatchesLoading] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);

  // const decoded = decodeURIComponent(summonerName || '');
  // const hashIndex = decoded.lastIndexOf('#');
  // const playerName = hashIndex !== -1 ? decoded.slice(0, hashIndex) : decoded;
  // const playerTag = hashIndex !== -1 ? decoded.slice(hashIndex + 1) : '';

  useEffect(() => {
    setIsProfileLoading(true);
    setProfile(null);
    setMatches([]);

    const loadProfile = async () => {
      try {
        // TODO: Switch data source based on game type
        // if (game === 'valorant') { fetch valorant data }
        // if (game === 'eternalreturn') { fetch ER data }
        console.log("fetch Player profile start...");
        const profileData = await fetchPlayerProfile(summonerName, summonerTag);
        console.log("fetch Profile Success : ", profileData);
        setProfile(profileData);
      } catch (err) {
        console.error("프로필 조회 실패:", err);
      } finally {
        setIsProfileLoading(false);
      }
    };

    loadProfile();
  }, [game, summonerName]);

  const loadMatches = async (puuid: string, gameName: string, tagLine: string) => {
    try {
      setIsMatchesLoading(true);
      console.log(`${gameName}#${tagLine} 전적 검색중...`);
      const matchRes = await fetchMatches(puuid);
      console.log("fetch Matches Success : ", matchRes);
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
          <span className="font-semibold text-slate-900 dark:text-white">{decodeURIComponent(summonerName || '')}</span> 프로필 검색 중...
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
          onRefresh={() => loadMatches(profile.puuid, profile.gameName, profile.tagLine)}
        />
      )}

      {isMatchesLoading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-16 space-y-4"
        >
          <div className="w-8 h-8 border-4 border-slate-200 dark:border-slate-700 border-t-rose-500 rounded-full animate-spin" />
          <p className="text-slate-500 dark:text-slate-400 text-sm">전적 불러오는 중...</p>
        </motion.div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <p className="text-slate-500 text-sm">최근 전적</p>
            <span className="text-slate-500 text-sm">{matches.length} 게임 검색 됨</span>
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
        </>
      )}
    </motion.div>
  );
}
