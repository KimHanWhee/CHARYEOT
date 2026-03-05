import { cn } from '../lib/utils';
import { Sword, ShieldHalf, Coins } from 'lucide-react';
import { Participant } from '../types/api';
import { RUNE_MAP, SPELL_MAP } from '../lib/LolUtils';

interface ParticipantRowProps {
  key: string;
  participant: Participant;
  version: string;
  isTarget: boolean;
}

export function TeamHeader({ isWin, team }: { isWin: true | false, team: 'blue' | 'red' }) {
  // const isWin = color === 'blue';
  return (
    <div className="flex items-center gap-2 px-3 py-1 mb-0.5">
      <span
        className={cn(
          'text-[11px] font-bold flex-shrink-0',
          isWin ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400',
        )}
        style={{ minWidth: 'calc(2rem + 1rem + 1rem + 6rem + 1.5rem)' }}
      >
        {team === 'blue' ? '블루팀' : '레드팀'}{isWin ? '(승리)' : '(패배)'}
      </span>
      <span className="flex-shrink-0 min-w-[90px] text-center text-[10px] text-slate-500 dark:text-slate-400">K / D / A</span>
      <span className="flex-shrink-0 min-w-14 text-center text-[10px] text-slate-500 dark:text-slate-400">가한 피해</span>
      <span className="flex-shrink-0 min-w-14 text-center text-[10px] text-slate-500 dark:text-slate-400">받은 피해</span>
      <span className="flex-shrink-0 min-w-10 text-center text-[10px] text-slate-500 dark:text-slate-400">CS</span>
      <span className="text-[10px] text-slate-500 dark:text-slate-400">아이템</span>
    </div>
  );
}

export function ParticipantRow({ key, participant, version, isTarget }: ParticipantRowProps) {
  const spell1Name = SPELL_MAP[participant.summoner1Id] || 'SummonerEmpty';
  const spell2Name = SPELL_MAP[participant.summoner2Id] || 'SummonerEmpty';
  const kda =
    participant.deaths === 0
      ? 'Perfect'
      : ((participant.kills + participant.assists) / participant.deaths).toFixed(2);

  return (
    <div
      className={cn(
        'flex items-center gap-2 px-3 py-1.5 rounded text-xs transition-colors',
        isTarget 
          ? 'bg-white/50 dark:bg-white/10 font-bold shadow-sm' // 더 밝게 + 그림자 살짝
          : 'hover:bg-white/10 dark:hover:bg-black/10'        // 일반 행 호버 효과
      )}
    >
      {/* 챔피언 이미지 + 레벨 */}
      <div className="relative flex-shrink-0">
        <div className="w-8 h-8 rounded overflow-hidden">
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${participant.championName}.png`}
            alt={participant.championName}
            className="w-full h-full object-cover"
          />
        </div>
        <span className="absolute -bottom-1 -right-1 bg-black/70 text-white text-[9px] leading-none px-0.5 rounded">
          {participant.champLevel}
        </span>
      </div>

      {/* 소환사 주문 (세로 2칸) */}
      <div className="flex flex-col gap-0.5 flex-shrink-0">
        <div className="w-4 h-4 rounded overflow-hidden bg-black/30">
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell1Name}.png`}
            alt="spell1"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-4 h-4 rounded overflow-hidden bg-black/30">
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell2Name}.png`}
            alt="spell2"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* 룬/특성 (세로 2칸) */}
      <div className="flex flex-col gap-0.5 flex-shrink-0">
        <div className="w-4 h-4 rounded-full overflow-hidden bg-black flex items-center justify-center">
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/${RUNE_MAP[participant.perks.styles[0].selections[0].perk]}.png`}
            alt="keystone"
            className="w-full h-full object-cover scale-125"
          />
        </div>
        <div className="w-4 h-4 flex items-center justify-center">
          <img
            src={`https://ddragon.canisback.com/img/perk-images/Styles/${RUNE_MAP[participant.perks.styles[1].style]}.png`}
            alt="subStyle"
            className="w-3.5 h-3.5 object-contain opacity-90"
          />
        </div>
      </div>

      {/* 소환사명 */}
      <span className="w-24 truncate text-[11px]">
        {participant.riotIdGameName}
      </span>

      {/* K / D / A + KDA */}
      <div className="flex-shrink-0 min-w-[90px] text-center">
        <p className="font-mono font-bold">
          <span className="inline-block w-5 text-right">{participant.kills}</span>
          <span className="mx-0.5">/</span>
          <span className="inline-block w-5 text-center text-rose-400">{participant.deaths}</span>
          <span className="mx-0.5">/</span>
          <span className="inline-block w-5 text-left">{participant.assists}</span>
        </p>
        <p className="text-[10px] opacity-70">KDA {kda}</p>
      </div>

      {/* 가한 피해 */}
      <div className="flex-shrink-0 min-w-14 text-center flex flex-col items-center gap-0.5">
        <Sword size={10} />
        <span>{participant.totalDamageDealtToChampions.toLocaleString()}</span>
      </div>

      {/* 받은 피해 */}
      <div className="flex-shrink-0 min-w-14 text-center flex flex-col items-center gap-0.5">
        <ShieldHalf size={10} />
        <span>{participant.totalDamageTaken.toLocaleString()}</span>
      </div>

      {/* CS */}
      <div className="flex-shrink-0 min-w-10 text-center flex flex-col items-center gap-0.5">
        <Coins size={10} />
        <span>{participant.totalMinionsKilled} CS</span>
      </div>

      {/* 아이템 7칸 */}
      <div className="flex gap-0.5 flex-shrink-0">
        {Array.from({ length: 7 }).map((_, i) => {
          const itemId = participant[`item${i}` as keyof typeof participant] as number;
          return (
            <div key={i} className="w-6 h-6 rounded overflow-hidden bg-black/30">
              {itemId !== 0 && (
                <img
                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${itemId}.png`}
                  alt={`item${i}`}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
