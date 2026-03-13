import { JSX } from "react";
import { BattleUserResponse } from "../../types/er";
import { ChevronDown, Coins, Eye, Sword } from "lucide-react";
import { cn, getTimeAgo } from "@/src/lib/utils";

interface MatchCardProps {
  game: BattleUserResponse;
}

const RANK_STYLE: Record<number, { border: string; text: string }> = {
  1: { border: "border-emerald-400", text: "text-emerald-400" },
  2: { border: "border-pink-400", text: "text-pink-400" },
  3: { border: "border-blue-400", text: "text-blue-400" },
};

const DEFAULT_STYLE = {
  border: "border-slate-300 dark:border-slate-600",
  text: "text-slate-400 dark:text-slate-500",
};

export function MatchCard({ game }: MatchCardProps): JSX.Element {
  const rankStyle = RANK_STYLE[game.gameRank] ?? DEFAULT_STYLE;
  const kda =
    game.playerDeaths === 0
      ? "Perfect"
      : ((game.playerKill + game.playerAssistant) / game.playerDeaths).toFixed(
          2,
        );

  const getItemGradientClass = (grade) => {
    switch (grade) {
      case 1: // 일반 (회색)
        // 중간 회색 -> 아주 연한 회색
        return "bg-gradient-to-b from-slate-500 to-slate-200 dark:to-slate-700 border-slate-600";
      case 2: // 고급 (초록)
        // 진한 초록 -> 연한 초록
        return "bg-gradient-to-b from-green-600 to-green-300 dark:to-green-800 border-green-700";
      case 3: // 희귀 (파랑)
        // 선명한 파랑 -> 연한 파랑
        return "bg-gradient-to-b from-blue-600 to-blue-300 dark:to-blue-800 border-blue-700";
      case 4: // 영웅 (보라)
        // 진한 보라 -> 연한 보라 + 그로우 효과
        return "bg-gradient-to-b from-purple-700 to-purple-400 dark:to-purple-900 border-purple-800 shadow-[0_0_8px_rgba(168,85,247,0.4)]";
      case 5: // 전설 (노랑)
        // 진한 노랑(앰버) -> 연한 노랑 + 강한 그로우
        return "bg-gradient-to-b from-amber-500 to-amber-200 dark:to-amber-900 border-amber-600 shadow-[0_0_10px_rgba(245,158,11,0.5)]";
      case 6: // 초월 (빨강)
        // 진한 빨강 -> 연한 빨강 + 내부 그림자
        return "bg-gradient-to-b from-red-700 to-red-400 dark:to-red-950 border-red-800 shadow-[0_0_12px_rgba(239,68,68,0.6)] shadow-inner";
      default: // 빈 슬롯 또는 0
        return "bg-slate-200 dark:bg-slate-700 border-transparent";
    }
  };

  const unknownImg = "Emoticon/196. Wait a Meowment...";

  const tacticalSkillName =
    game.tacticalSkillName === "Unknown Skill"
      ? unknownImg
      : "Tactical%20Skills/" + game.tacticalSkillName;

  const mainTrait =
    game.mainTrait === "Unknown Trait"
      ? unknownImg
      : "Augments/" + game.mainTrait;

  const subTrait =
    game.subTrait === "Unknown Trait"
      ? unknownImg
      : "Augments/" + game.subTrait;

  const skinCode = String(game.skinCode % 100).padStart(2, "0");

  return (
    <div
      className={`rounded-xl border-l-4 shadow-lg bg-white dark:bg-slate-900/80 p-4 ${rankStyle.border}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            {/* 순위 & 게임 모드 & 시간 */}
            <div className="flex flex-col items-start w-30 flex-shrink-0">
              <div className={`text-lg font-bold ${rankStyle.text}`}>
                #{game.gameRank}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                {game.matchingMode} · {Math.floor(game.duration / 60)}분{" "}
                {game.duration % 60}초
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                {getTimeAgo(game.endTime)}
              </p>
            </div>

            {/* 실험체 이미지 & 레벨 */}
            <div className="relative w-16 h-16 rounded-lg overflow-hidden shadow-inner flex-shrink-0">
              <img
                src={`https://pub-ec9311e4416d473a9cdd54c206eb2fef.r2.dev/${game.engCharacterName.replace(/ & /g, "")}_Mini_${skinCode}.png`}
                alt={game.engCharacterName}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-0 right-0 bg-slate-800/50 dark:bg-slate-600/50 text-white text-xs font-bold px-1.5 py-0.5 rounded-tl border-t border-l border-slate-700/50 dark:border-slate-500/50">
                {game.characterLevel}
              </span>
            </div>
            {/* 무기 & 전술 스킬 */}
            <div className="flex flex-col gap-1">
              <div className="w-7 h-7 rounded overflow-hidden bg-slate-600 dark:bg-slate-700">
                <img
                  src={`https://pub-ec9311e4416d473a9cdd54c206eb2fef.r2.dev/${game.weaponName}.png`}
                  alt="weapon"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-7 h-7 overflow-hidden">
                <img
                  src={`https://pub-ec9311e4416d473a9cdd54c206eb2fef.r2.dev/${tacticalSkillName}.png`}
                  alt="spell"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* 특성 */}
            <div className="flex flex-col gap-1">
              <div className="w-7 h-7 rounded-full overflow-hidden bg-black flex items-center justify-center shadow-inner">
                <img
                  src={`https://pub-ec9311e4416d473a9cdd54c206eb2fef.r2.dev/${mainTrait}.png`}
                  alt="Keystone"
                  className="w-full h-full object-cover scale-125"
                />
              </div>
              <div className="w-7 h-7 flex items-center justify-center">
                <img
                  src={`https://pub-ec9311e4416d473a9cdd54c206eb2fef.r2.dev/${subTrait}.png`}
                  alt="SubStyle"
                  className="w-5 h-5 object-contain opacity-90"
                />
              </div>
            </div>
          </div>
        </div>

        {/* TK/K/A + 딜량 + 동물딜량 */}
        <div className="flex items-center gap-8 text-slate-700 dark:text-slate-200">
          <div className="text-center flex-shrink-0">
            <p className="text-lg font-mono font-bold flex items-center justify-center gap-1">
              <span className="inline-block w-7 text-right">
                {game.teamKill}
              </span>
              <span>/</span>
              <span className="inline-block w-7 text-center">
                {game.playerKill}
              </span>
              <span>/</span>
              <span className="inline-block w-7 text-left">
                {game.playerAssistant}
              </span>
            </p>
            <p className="text-xs text-slate-500 whitespace-nowrap">
              TK / K / A
            </p>
          </div>

          <div className="hidden md:flex gap-4 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex flex-col items-center gap-1 flex-shrink-0 min-w-14">
              딜량
              <span className="whitespace-nowrap">
                {game.damageToPlayer.toLocaleString()}
              </span>
            </div>
            <div className="flex flex-col items-center gap-1 flex-shrink-0 min-w-14">
              동물 딜량
              <span className="whitespace-nowrap">
                {game.damageToMonster.toLocaleString()}
              </span>
            </div>
          </div>

          {/* 아이템 */}
          <div className="hidden sm:flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => {
              const item = game.itemList[i];
              const itemName =
                item?.name === "Unknown Item"
                  ? unknownImg
                  : item.name.split(" - ")[0];
              const itemGrade = item?.grade || 0;

              return (
                <div
                  key={i}
                  className={`w-10 h-7 rounded border overflow-hidden transition-all ${getItemGradientClass(itemGrade)}`}
                >
                  {itemName !== "" ? (
                    <img
                      src={`https://pub-ec9311e4416d473a9cdd54c206eb2fef.r2.dev/${itemName}.png`}
                      alt={itemName}
                      className="w-full h-full object-cover brightness-110 contrast-110" // 투명 이미지라 배경색이 잘 보이게 밝기 조정
                    />
                  ) : (
                    <div className="w-full h-full bg-black/10 dark:bg-black/20" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
