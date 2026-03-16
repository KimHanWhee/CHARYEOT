import { JSX } from "react";
import { BattleUserResponse } from "../../types/er";

interface MatchCardDetailProps {
  players: BattleUserResponse[];
  myNickname: string;
}

const RANK_STYLE: Record<number, { text: string; groupBorder: string }> = {
  1: {
    text: "text-emerald-400",
    groupBorder: "border-emerald-400/40 dark:border-emerald-400/30",
  },
  2: {
    text: "text-pink-400",
    groupBorder: "border-pink-400/40 dark:border-pink-400/30",
  },
  3: {
    text: "text-blue-400",
    groupBorder: "border-blue-400/40 dark:border-blue-400/30",
  },
};
const DEFAULT_RANK_STYLE = {
  text: "text-slate-400 dark:text-slate-500",
  groupBorder: "border-slate-300 dark:border-slate-600",
};

const unknownImg = "Emoticon/196. Wait a Meowment...";

const getItemGradientClass = (grade: number) => {
  switch (grade) {
    case 1:
      return "bg-gradient-to-b from-slate-500 to-slate-200 dark:to-slate-700 border-slate-600";
    case 2:
      return "bg-gradient-to-b from-green-600 to-green-300 dark:to-green-800 border-green-700";
    case 3:
      return "bg-gradient-to-b from-blue-600 to-blue-300 dark:to-blue-800 border-blue-700";
    case 4:
      return "bg-gradient-to-b from-purple-700 to-purple-400 dark:to-purple-900 border-purple-800 shadow-[0_0_8px_rgba(168,85,247,0.4)]";
    case 5:
      return "bg-gradient-to-b from-amber-500 to-amber-200 dark:to-amber-900 border-amber-600 shadow-[0_0_10px_rgba(245,158,11,0.5)]";
    case 6:
      return "bg-gradient-to-b from-red-700 to-red-400 dark:to-red-950 border-red-800 shadow-[0_0_12px_rgba(239,68,68,0.6)]";
    default:
      return "bg-slate-200 dark:bg-slate-700 border-transparent";
  }
};

interface DamageMaxes {
  damageToPlayer: number;
  damageFromPlayer: number;
  damageToMonster: number;
}

function DamageCell({
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
    <div className="hidden lg:flex flex-col gap-0.5 w-16 flex-shrink-0">
      <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
        <div
          className={`h-full rounded-full ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
        {value.toLocaleString()}
      </span>
    </div>
  );
}

function TableHeader() {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 border-b border-slate-200 dark:border-slate-700 text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide">
      {/* 순위 */}
      <span className="w-6 flex-shrink-0" />
      {/* 캐릭터 */}
      <span className="w-10 flex-shrink-0" />
      {/* 무기/전술 */}
      <span className="w-6 flex-shrink-0" />
      {/* 특성 */}
      <span className="w-6 flex-shrink-0" />
      {/* 닉네임 */}
      <span className="flex-1 min-w-0">닉네임</span>
      {/* TK/K/D/A */}
      <span className="w-24 flex-shrink-0 text-center">TK/K/D/A</span>
      {/* 딜량 */}
      <span className="hidden lg:block w-16 text-center flex-shrink-0">
        딜량
      </span>
      {/* 받은피해 */}
      <span className="hidden lg:block w-16 text-center flex-shrink-0">
        받은피해
      </span>
      {/* 동물딜 */}
      <span className="hidden lg:block w-16 text-center flex-shrink-0">
        동물딜
      </span>
      {/* 크레딧 */}
      <span className="hidden md:block w-20 text-center flex-shrink-0">
        크레딧
      </span>
      {/* 아이템: w-7 × 5 + gap-0.5 × 4 = 148px */}
      <span className="hidden sm:block w-[148px] text-center flex-shrink-0">
        아이템
      </span>
    </div>
  );
}

function PlayerRow({
  player,
  myNickname,
  damageMaxes,
}: {
  player: BattleUserResponse;
  myNickname: string;
  damageMaxes: DamageMaxes;
}) {
  const rankStyle = RANK_STYLE[player.gameRank] ?? DEFAULT_RANK_STYLE;
  const isMe = player.nickname === myNickname;
  const skinCode = String(player.skinCode % 100).padStart(2, "0");

  const tacticalSkillImg =
    player.tacticalSkillName === "Unknown Skill"
      ? unknownImg
      : `Tactical%20Skills/${player.tacticalSkillName}`;

  const mainTraitImg =
    player.mainTrait === "Unknown Trait"
      ? unknownImg
      : `Augments/${player.mainTrait}`;

  const subTraitImg =
    player.subTrait === "Unknown Trait"
      ? unknownImg
      : `Augments/${player.subTrait}`;

  const itemArray = Object.values(player.itemList);

  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 text-sm
        ${
          isMe
            ? "bg-blue-50 dark:bg-blue-900/20 ring-1 ring-inset ring-blue-300 dark:ring-blue-700 rounded-md"
            : ""
        }`}
    >
      {/* 순위 */}
      <span
        className={`w-6 font-bold text-center flex-shrink-0 text-sm ${rankStyle.text}`}
      >
        #{player.gameRank}
      </span>

      {/* 실험체 이미지 + 레벨 */}
      <div className="relative w-10 h-10 rounded overflow-hidden flex-shrink-0">
        <img
          src={`https://pub-ec9311e4416d473a9cdd54c206eb2fef.r2.dev/${player.engCharacterName.replace(/ & /g, "")}_Mini_${skinCode}.png`}
          alt={player.engCharacterName}
          className="w-full h-full object-cover"
        />
        <span className="absolute bottom-0 right-0 bg-slate-800/60 text-white text-[9px] font-bold px-0.5 leading-tight rounded-tl">
          {player.characterLevel}
        </span>
      </div>

      {/* 무기 + 전술 스킬 (세로) */}
      <div className="flex flex-col gap-0.5 flex-shrink-0">
        <div className="w-6 h-6 rounded overflow-hidden bg-slate-600 dark:bg-slate-700">
          <img
            src={`https://pub-ec9311e4416d473a9cdd54c206eb2fef.r2.dev/${player.weaponName}.png`}
            alt="weapon"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-6 h-6 rounded overflow-hidden">
          <img
            src={`https://pub-ec9311e4416d473a9cdd54c206eb2fef.r2.dev/${tacticalSkillImg}.png`}
            alt="tactical"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* 주특성 + 서브특성 (세로) */}
      <div className="flex flex-col gap-0.5 items-center flex-shrink-0">
        <div className="w-6 h-6 rounded-full overflow-hidden bg-black flex items-center justify-center">
          <img
            src={`https://pub-ec9311e4416d473a9cdd54c206eb2fef.r2.dev/${mainTraitImg}.png`}
            alt="main trait"
            className="w-full h-full object-cover scale-125"
          />
        </div>
        <div className="w-6 h-6 flex items-center justify-center">
          <img
            src={`https://pub-ec9311e4416d473a9cdd54c206eb2fef.r2.dev/${subTraitImg}.png`}
            alt="sub trait"
            className="w-5 h-5 object-contain opacity-90"
          />
        </div>
      </div>

      {/* 닉네임 */}
      <span
        className={`flex-1 truncate font-medium min-w-0 ${
          isMe
            ? "text-blue-600 dark:text-blue-400"
            : "text-slate-700 dark:text-slate-200"
        }`}
      >
        {player.nickname}
        {isMe && (
          <span className="ml-1 text-xs text-blue-400 dark:text-blue-500">
            (나)
          </span>
        )}
      </span>

      {/* TK / K / D / A */}
      <div className="flex-shrink-0 text-center w-24">
        <p className="font-mono text-xs font-semibold whitespace-nowrap">
          <span className="text-slate-400 dark:text-slate-500">
            {player.teamKill}
          </span>
          <span className="text-slate-300 dark:text-slate-600 mx-0.5">/</span>
          <span className="text-green-500">{player.playerKill}</span>
          <span className="text-slate-300 dark:text-slate-600 mx-0.5">/</span>
          <span className="text-red-400">{player.playerDeaths}</span>
          <span className="text-slate-300 dark:text-slate-600 mx-0.5">/</span>
          <span className="text-yellow-400">{player.playerAssistant}</span>
        </p>
      </div>

      {/* 딜량 */}
      <DamageCell
        value={player.damageToPlayer}
        max={damageMaxes.damageToPlayer}
        barColor="bg-rose-400 dark:bg-rose-500"
      />
      {/* 받은피해 */}
      <DamageCell
        value={player.damageFromPlayer}
        max={damageMaxes.damageFromPlayer}
        barColor="bg-blue-400 dark:bg-blue-500"
      />
      {/* 동물딜 */}
      <DamageCell
        value={player.damageToMonster}
        max={damageMaxes.damageToMonster}
        barColor="bg-emerald-400 dark:bg-emerald-500"
      />

      {/* 크레딧 */}
      <div className="hidden md:flex flex-shrink-0 items-center justify-center w-20">
        <span className="font-mono text-xs text-amber-500 dark:text-amber-400">
          {player.totalGainVFCredit.toLocaleString()}
        </span>
      </div>

      {/* 아이템 */}
      <div className="hidden sm:flex flex-col gap-0.5 flex-shrink-0 w-[148px]">
        <div className="flex gap-0.5">
          {itemArray.map((item, i) => {
            const itemName =
              !item || item.name === "Unknown Item"
                ? unknownImg
                : item.name.split(" - ")[0];
            return (
              <div
                key={i}
                className={`w-7 h-5 rounded border overflow-hidden ${getItemGradientClass(item?.grade ?? 0)}`}
              >
                {itemName ? (
                  <img
                    src={`https://pub-ec9311e4416d473a9cdd54c206eb2fef.r2.dev/${itemName}.png`}
                    alt={itemName}
                    className="w-full h-full object-cover brightness-110 contrast-110"
                  />
                ) : (
                  <div className="w-full h-full bg-black/10 dark:bg-black/20" />
                )}
              </div>
            );
          })}
        </div>
        {/* <div className="flex gap-0.5">
          {bottomItems.map((item, i) => {
            const itemName =
              !item || item.name === "Unknown Item"
                ? unknownImg
                : item.name.split(" - ")[0];
            return (
              <div
                key={i}
                className={`w-7 h-5 rounded border overflow-hidden ${getItemGradientClass(item?.grade ?? 0)}`}
              >
                {itemName ? (
                  <img
                    src={`https://pub-ec9311e4416d473a9cdd54c206eb2fef.r2.dev/${itemName}.png`}
                    alt={itemName}
                    className="w-full h-full object-cover brightness-110 contrast-110"
                  />
                ) : (
                  <div className="w-full h-full bg-black/10 dark:bg-black/20" />
                )}
              </div>
            );
          })}
        </div> */}
      </div>
    </div>
  );
}

export function MatchCardDetail({
  players,
  myNickname,
}: MatchCardDetailProps): JSX.Element {
  const damageMaxes: DamageMaxes = {
    damageToPlayer: Math.max(...players.map((p) => p.damageToPlayer)),
    damageFromPlayer: Math.max(...players.map((p) => p.damageFromPlayer)),
    damageToMonster: Math.max(...players.map((p) => p.damageToMonster)),
  };

  // gameRank가 같은 플레이어 = 같은 팀
  const groups = players.reduce<Record<number, BattleUserResponse[]>>(
    (acc, player) => {
      const key = player.gameRank;
      if (!acc[key]) acc[key] = [];
      acc[key].push(player);
      return acc;
    },
    {},
  );

  const sortedGroups = Object.entries(groups)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([, teamPlayers]) => teamPlayers);

  return (
    <div className="mt-3 border-t border-slate-200 dark:border-slate-700 pt-3 flex flex-col gap-1.5">
      <TableHeader />
      {sortedGroups.map((teamPlayers, groupIdx) => {
        const rank = teamPlayers[0].gameRank;
        const rankStyle = RANK_STYLE[rank] ?? DEFAULT_RANK_STYLE;

        return (
          <div
            key={groupIdx}
            className={`rounded-lg border ${rankStyle.groupBorder} overflow-hidden`}
          >
            {teamPlayers.map((player, playerIdx) => (
              <div key={player.nickname}>
                {playerIdx > 0 && (
                  <div className={`h-px mx-3 bg-slate-200 dark:bg-slate-700`} />
                )}
                <PlayerRow
                  player={player}
                  myNickname={myNickname}
                  damageMaxes={damageMaxes}
                />
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
