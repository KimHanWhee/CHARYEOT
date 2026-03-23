import { JSX } from "react";
import { motion } from "motion/react";
import { LeagueEntry } from "../../types/Lol";

interface RankTierCardProps {
  leagueEntries: LeagueEntry[];
}

const TIER_STYLE: Record<
  string,
  { label: string; color: string; bg: string; border: string }
> = {
  IRON: {
    label: "Iron",
    color: "text-slate-400",
    bg: "hover:bg-slate-100 hover:dark:bg-slate-800",
    border: "border-slate-300 dark:border-slate-600",
  },
  BRONZE: {
    label: "Bronze",
    color: "text-amber-700",
    bg: "hover:bg-amber-50 hover:dark:bg-amber-950/40",
    border: "border-amber-400 dark:border-amber-700",
  },
  SILVER: {
    label: "Silver",
    color: "text-slate-500",
    bg: "hover:bg-slate-100 hover:dark:bg-slate-800",
    border: "border-slate-400 dark:border-slate-500",
  },
  GOLD: {
    label: "Gold",
    color: "text-yellow-600",
    bg: "hover:bg-yellow-50 hover:dark:bg-yellow-950/40",
    border: "border-yellow-400 dark:border-yellow-600",
  },
  PLATINUM: {
    label: "Platinum",
    color: "text-teal-500",
    bg: "hover:bg-teal-50 hover:dark:bg-teal-950/40",
    border: "border-teal-400 dark:border-teal-600",
  },
  EMERALD: {
    label: "Emerald",
    color: "text-emerald-500",
    bg: "hover:bg-emerald-50 hover:dark:bg-emerald-950/40",
    border: "border-emerald-400 dark:border-emerald-600",
  },
  DIAMOND: {
    label: "Diamond",
    color: "text-blue-400",
    bg: "hover:bg-blue-50 hover:dark:bg-blue-950/40",
    border: "border-blue-400 dark:border-blue-600",
  },
  MASTER: {
    label: "Master",
    color: "text-purple-500",
    bg: "hover:bg-purple-50 hover:dark:bg-purple-950/40",
    border: "border-purple-400 dark:border-purple-600",
  },
  GRANDMASTER: {
    label: "Grandmaster",
    color: "text-rose-500",
    bg: "hover:bg-rose-50 hover:dark:bg-rose-950/40",
    border: "border-rose-400 dark:border-rose-600",
  },
  CHALLENGER: {
    label: "Challenger",
    color: "text-sky-400",
    bg: "hover:bg-sky-50 hover:dark:bg-sky-950/40",
    border: "border-sky-400 dark:border-sky-500",
  },
};

const QUEUE_LABEL: Record<string, string> = {
  RANKED_SOLO_5x5: "솔로랭크",
  RANKED_FLEX_SR: "자유랭크",
};

const UNRANKED_STYLE = {
  label: "Unranked",
  color: "text-slate-400",
  bg: "",
  border: "",
};

export function RankTierCard({
  leagueEntries,
}: RankTierCardProps): JSX.Element {
  if (leagueEntries.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col gap-3 p-4 bg-white dark:bg-slate-900/80 shadow-md rounded-2xl w-full"
      >
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 tracking-wide uppercase">
          솔로랭크
        </span>
        <span className="text-lg font-bold text-slate-400">Unranked</span>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {leagueEntries.map((entry) => {
        const { queueType, tier, rank, leaguePoints, wins, losses } = entry;

        const totalGames = wins + losses;
        const winRate =
          totalGames > 0 ? Math.round((wins / totalGames) * 100) : 0;

        const isUnranked = !tier || tier === "UNRANKED";
        const style = isUnranked
          ? {
              label: "Unranked",
              color: "text-slate-400",
              bg: "bg-slate-100 dark:bg-slate-800",
              border: "border-slate-300 dark:border-slate-600",
            }
          : (TIER_STYLE[tier.toUpperCase()] ?? TIER_STYLE["IRON"]);

        const queueLabel = QUEUE_LABEL[queueType] ?? queueType;

        return (
          <motion.div
            key={queueType}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex flex-col gap-3 p-4 bg-white ${style.bg} dark:bg-slate-900/80 dark:hover:bg-slate-800 shadow-md rounded-2xl w-full`}
          >
            {/* 큐 타입 */}
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 tracking-wide uppercase">
              {queueLabel}
            </span>

            <img
              src={`https://pub-51710eb05e764625912a38a15961ab4e.r2.dev/tier/${style.label}.png`}
              alt={style.label}
              className="w-25 h-25 object-contain"
            />
            {/* 티어 + LP */}
            <div className="flex flex-col">
              <span
                className={`text-lg font-bold leading-tight ${style.color}`}
              >
                {style.label}
                {!isUnranked && rank && ` ${rank}`}
              </span>
              {!isUnranked && (
                <span className="text-sm text-slate-600 dark:text-slate-300 font-medium">
                  {leaguePoints} LP
                </span>
              )}
            </div>

            {/* 승/패 */}
            {totalGames > 0 && (
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>{totalGames}전</span>
                  <span>
                    <span className="text-blue-500 font-semibold">
                      {wins}승
                    </span>{" "}
                    <span className="text-rose-500 font-semibold">
                      {losses}패
                    </span>
                  </span>
                </div>

                <div className="w-full h-1.5 rounded-full bg-rose-200 dark:bg-rose-900 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-blue-400 dark:bg-blue-500 transition-all duration-500"
                    style={{ width: `${winRate}%` }}
                  />
                </div>

                <span
                  className={`text-xs font-semibold self-end ${winRate >= 50 ? "text-blue-500" : "text-rose-500"}`}
                >
                  승률 {winRate}%
                </span>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
