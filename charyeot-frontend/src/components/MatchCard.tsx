import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { Sword, Eye, Coins, ChevronDown } from 'lucide-react';
import { JSX, useState } from 'react';
import { Match } from '../types/api';
import { RUNE_MAP, SPELL_MAP } from '../lib/LolUtils';
import { ParticipantRow, TeamHeader } from './ParticipantRow';

interface MatchCardProps {
  match: Match;
  targetPuuid: string;
  version: string;
}

export function MatchCard({ match, targetPuuid, version }: MatchCardProps): JSX.Element {
  const [isExpanded, setIsExpanded] = useState(false);

  const searchUser = match.participantsDTO.find((p) => p.puuid === targetPuuid);
  if (!searchUser) return <></>;

  const spell1Name = SPELL_MAP[searchUser.summoner1Id] || 'SummonerEmpty';
  const spell2Name = SPELL_MAP[searchUser.summoner2Id] || 'SummonerEmpty';
  const kda =
    searchUser.deaths === 0
      ? 'Perfect'
      : ((searchUser.kills + searchUser.assists) / searchUser.deaths).toFixed(2);

  const blueTeam = match.participantsDTO.filter((p) => p.teamId === 100);
  const redTeam = match.participantsDTO.filter((p) => p.teamId === 200);
  const isBlueWin = blueTeam[0]?.win;

  return (
    <div
      className={cn(
        'rounded-xl border-l-4 shadow-lg overflow-hidden transition-colors',
        searchUser.win
          ? 'border-emerald-500'
          : 'border-rose-500',
      )}
    >
      {/* 요약 행 */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={() => setIsExpanded((prev) => !prev)}
        className={cn(
          'flex items-center justify-between p-4 cursor-pointer transition-colors',
          searchUser.win
            ? 'bg-white hover:bg-emerald-50 dark:bg-slate-900/80 dark:hover:bg-slate-800'
            : 'bg-white hover:bg-rose-50 dark:bg-slate-900/80 dark:hover:bg-slate-800',
        )}
      >
        {/* 승/패 및 게임 정보 */}
        <div className="flex-shrink-0 whitespace-nowrap min-w-36">
          <h3 className={cn(
            'text-lg font-bold',
            searchUser.win ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400',
          )}>
            {searchUser.win ? '승리' : '패배'}
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            {match.gameMode} • {Math.floor(match.duration / 60)}분 {Math.floor(match.duration % 60)}초
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* 챔피언 이미지 */}
          <div className="w-16 h-16 rounded-lg overflow-hidden shadow-inner flex-shrink-0">
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${searchUser.championName}.png`}
              alt={searchUser.championName}
              className="w-full h-full object-cover"
            />
          </div>

          {/* 소환사 주문 */}
          <div className="flex flex-col gap-1">
            <div className="w-7 h-7 rounded overflow-hidden bg-slate-200 dark:bg-slate-700">
              <img src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell1Name}.png`} alt="spell1" className="w-full h-full object-cover" />
            </div>
            <div className="w-7 h-7 rounded overflow-hidden bg-slate-200 dark:bg-slate-700">
              <img src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell2Name}.png`} alt="spell2" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* 룬/특성 */}
          <div className="flex flex-col gap-1">
            <div className="w-7 h-7 rounded-full overflow-hidden bg-black flex items-center justify-center shadow-inner">
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/${RUNE_MAP[searchUser.perks.styles[0].selections[0].perk]}.png`}
                alt="Keystone"
                className="w-full h-full object-cover scale-125"
              />
            </div>
            <div className="w-7 h-7 flex items-center justify-center">
              <img
                src={`https://ddragon.canisback.com/img/perk-images/Styles/${RUNE_MAP[searchUser.perks.styles[1].style]}.png`}
                alt="SubStyle"
                className="w-5 h-5 object-contain opacity-90"
              />
            </div>
          </div>

          {/* 아이템 */}
          <div className="hidden sm:flex gap-1">
            {Array.from({ length: 7 }).map((_, i) => {
              const itemId = searchUser[`item${i}` as keyof typeof searchUser] as number;
              return (
                <div key={i} className="w-7 h-7 rounded overflow-hidden bg-slate-200 dark:bg-slate-700">
                  {itemId !== 0 ? (
                    <img
                      src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${itemId}.png`}
                      alt={`item${i}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-200/50 dark:bg-slate-800/50" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* KDA + 스탯 */}
        <div className="flex items-center gap-8 text-slate-700 dark:text-slate-200">
          <div className="text-center flex-shrink-0">
            <p className="text-lg font-mono font-bold flex items-center justify-center gap-1">
              <span className="inline-block w-7 text-right">{searchUser.kills}</span>
              <span>/</span>
              <span className="inline-block w-7 text-center text-rose-500 dark:text-rose-400">{searchUser.deaths}</span>
              <span>/</span>
              <span className="inline-block w-7 text-left">{searchUser.assists}</span>
            </p>
            <p className="text-xs text-slate-500 whitespace-nowrap">KDA {kda}</p>
          </div>

          <div className="hidden md:flex gap-4 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex flex-col items-center gap-1 flex-shrink-0 min-w-14">
              <Sword size={14} />
              <span className="whitespace-nowrap">{searchUser.totalDamageDealtToChampions.toLocaleString()}</span>
            </div>
            <div className="flex flex-col items-center gap-1 flex-shrink-0 min-w-10">
              <Eye size={14} />
              <span>{searchUser.visionScore}</span>
            </div>
            <div className="flex flex-col items-center gap-1 flex-shrink-0 min-w-12">
              <Coins size={14} />
              <span className="whitespace-nowrap">{searchUser.totalMinionsKilled} CS</span>
            </div>
          </div>

          <ChevronDown
            size={18}
            className={cn(
              'text-slate-400 transition-transform duration-200 flex-shrink-0',
              isExpanded && 'rotate-180',
            )}
          />
        </div>
      </motion.div>

      {/* 펼침 패널: 10인 상세 */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {/* 블루팀 */}
            <div className={cn(
              "px-2 py-2",
              isBlueWin 
                ? "bg-emerald-50/80 dark:bg-emerald-900/20" // 승리 시 초록/파란색
                : "bg-rose-50/80 dark:bg-rose-900/20"       // 패배 시 붉은색
            )}>
              <TeamHeader isWin={isBlueWin} team='blue' />
              <div className="flex flex-col gap-0.5">
                {blueTeam.map((p) => (
                  <ParticipantRow
                    key={p.puuid}
                    participant={p}
                    version={version}
                    isTarget={p.puuid === targetPuuid}
                  />
                ))}
              </div>
            </div>

            {/* 레드팀 */}
            <div className={cn(
              "px-2 py-2",
              !isBlueWin 
                ? "bg-emerald-50/80 dark:bg-emerald-900/20" // 승리 시 초록/파란색
                : "bg-rose-50/80 dark:bg-rose-900/20"       // 패배 시 붉은색
            )}>
              <TeamHeader isWin={!isBlueWin} team='red' />
              <div className="flex flex-col gap-0.5">
                {redTeam.map((p) => (
                  <ParticipantRow
                    key={p.puuid}
                    participant={p}
                    version={version}
                    isTarget={p.puuid === targetPuuid}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
