import { JSX } from "react";
import { motion } from "motion/react";
import { UserStats } from "../../types/er";
import { getErTierInfo, getErTierImageUrl, UNRANKED_TIER } from "../../lib/erUtils";

interface ErRankTierCardProps {
  stats: UserStats | null;
}

export function ErRankTierCard({ stats }: ErRankTierCardProps): JSX.Element {
  if (!stats) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col gap-3 p-4 bg-white dark:bg-slate-900/80 shadow-md rounded-2xl w-full"
      >
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 tracking-wide uppercase">
          랭크
        </span>
        <span className="text-lg font-bold text-slate-400">
          {UNRANKED_TIER.korName}
        </span>
      </motion.div>
    );
  }

  const tier = getErTierInfo(stats.mmr, stats.rank);

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col gap-3 p-4 bg-white dark:bg-slate-900/80 shadow-md rounded-2xl w-full"
    >
      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 tracking-wide uppercase">
        랭크
      </span>

      <img
        src={getErTierImageUrl(tier.engName)}
        alt={tier.engName}
        className="w-20 h-20 object-contain"
      />

      <div className="flex flex-col">
        <span className={`text-lg font-bold leading-tight ${tier.color}`}>
          {tier.korName}
        </span>
        <span className="text-sm text-slate-600 dark:text-slate-300 font-medium">
          {stats.mmr} RP
        </span>
      </div>
    </motion.div>
  );
}
