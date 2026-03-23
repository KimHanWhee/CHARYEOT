import { cn } from "../../lib/utils";
import { Coins } from "lucide-react";
import { RUNE_MAP, SPELL_MAP } from "../../lib/lolUtils";
import { useNavigate } from "react-router-dom";
import { GAME_PATHS } from "../../lib/constants";
import { Participant } from "@/src/types/Lol";

// champion(2rem) | spells(1rem) | runes(1rem) | name(1fr) | KDA(90px) | dealt(5rem) | taken(5rem) | cs(2.5rem) | items(180px = 7×24px + 6×2px)
const GRID_COLS =
  "2rem 1rem 1rem minmax(5rem, 1fr) 90px 5rem 5rem 2.5rem 180px";

interface ParticipantRowProps {
  key: string;
  participant: Participant;
  version: string;
  isTarget: boolean;
  maxDealt: number;
  maxTaken: number;
}

function DamageBar({
  value,
  max,
  barColor,
}: {
  value: number;
  max: number;
  barColor: string;
}) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="flex flex-col gap-0.5 w-full">
      <div className="w-full h-2.5 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
        <div
          className={`h-full rounded-full ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-[10px] text-center font-mono">
        {value.toLocaleString()}
      </span>
    </div>
  );
}

export function TeamHeader({
  isWin,
  team,
}: {
  isWin: boolean;
  team: "blue" | "red";
}) {
  return (
    <div
      className="grid items-center gap-x-3 px-3 py-1 mb-0.5"
      style={{ gridTemplateColumns: GRID_COLS }}
    >
      {/* 챔피언+주문+룬 3열을 하나로 */}
      <span
        className={cn(
          "col-span-3 text-[11px] font-bold",
          isWin
            ? "text-emerald-700 dark:text-emerald-400"
            : "text-rose-700 dark:text-rose-400",
        )}
      >
        {team === "blue" ? "블루팀" : "레드팀"}
        {isWin ? "(승리)" : "(패배)"}
      </span>
      <span />
      <span className="text-center text-[10px] text-slate-500 dark:text-slate-400">
        K / D / A
      </span>
      <span className="text-center text-[10px] text-slate-500 dark:text-slate-400">
        가한 피해
      </span>
      <span className="text-center text-[10px] text-slate-500 dark:text-slate-400">
        받은 피해
      </span>
      <span className="text-center text-[10px] text-slate-500 dark:text-slate-400">
        CS
      </span>
      <span className="text-[10px] text-slate-500 dark:text-slate-400">
        아이템
      </span>
    </div>
  );
}

export function ParticipantRow({
  key,
  participant,
  version,
  isTarget,
  maxDealt,
  maxTaken,
}: ParticipantRowProps) {
  const navigate = useNavigate();
  const spell1Name = SPELL_MAP[participant.summoner1Id] || "SummonerEmpty";
  const spell2Name = SPELL_MAP[participant.summoner2Id] || "SummonerEmpty";
  const kda =
    participant.deaths === 0
      ? "Perfect"
      : (
          (participant.kills + participant.assists) /
          participant.deaths
        ).toFixed(2);

  const handleNameClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    navigate(
      `/${GAME_PATHS.LOL}/search/${encodeURIComponent(participant.riotIdGameName)}/${encodeURIComponent(participant.riotIdTagline)}`,
    );
  };

  return (
    <div
      className={cn(
        "grid items-center gap-x-3 px-3 py-1.5 rounded text-xs transition-colors",
        isTarget
          ? "bg-white/50 dark:bg-white/10 font-bold shadow-sm"
          : "hover:bg-white/10 dark:hover:bg-black/10",
      )}
      style={{ gridTemplateColumns: GRID_COLS }}
    >
      {/* 챔피언 이미지 + 레벨 */}
      <div className="relative">
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
      <div className="flex flex-col gap-0.5">
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
      <div className="flex flex-col gap-0.5">
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
      <span
        className="truncate text-[11px] cursor-pointer hover:text-rose-500 transition-colors"
        onClick={handleNameClick}
      >
        {participant.riotIdGameName}
      </span>

      {/* K / D / A + KDA */}
      <div className="text-center">
        <p className="font-mono font-bold">
          <span className="inline-block w-5 text-right">
            {participant.kills}
          </span>
          <span className="mx-0.5">/</span>
          <span className="inline-block w-5 text-center text-rose-400">
            {participant.deaths}
          </span>
          <span className="mx-0.5">/</span>
          <span className="inline-block w-5 text-left">
            {participant.assists}
          </span>
        </p>
        <p className="text-[10px] opacity-70">KDA {kda}</p>
      </div>

      {/* 가한 피해 */}
      <DamageBar
        value={participant.totalDamageDealtToChampions}
        max={maxDealt}
        barColor="bg-rose-400 dark:bg-rose-500"
      />

      {/* 받은 피해 */}
      <DamageBar
        value={participant.totalDamageTaken}
        max={maxTaken}
        barColor="bg-blue-400 dark:bg-blue-500"
      />

      {/* CS */}
      <div className="text-center flex flex-col items-center gap-0.5">
        <Coins size={10} />
        <span>{participant.totalMinionsKilled} CS</span>
      </div>

      {/* 아이템 7칸 */}
      <div className="flex gap-0.5">
        {Array.from({ length: 7 }).map((_, i) => {
          const itemId = participant[
            `item${i}` as keyof typeof participant
          ] as number;
          return (
            <div
              key={i}
              className="w-6 h-6 rounded overflow-hidden bg-black/30"
            >
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
