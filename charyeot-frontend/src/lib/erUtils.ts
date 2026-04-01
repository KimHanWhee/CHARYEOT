export interface ErTierInfo {
  engName: string;
  korName: string;
  color: string;
  borderColor: string;
}

const ER_TIERS: Array<{
  engName: string;
  korName: string;
  color: string;
  borderColor: string;
  minMmr: number;
  maxRank?: number;
}> = [
  {
    engName: "Immortal",
    korName: "이터니티",
    color: "text-rose-400",
    borderColor: "border-rose-400 dark:border-rose-500",
    minMmr: 8100,
    maxRank: 300,
  },
  {
    engName: "Titan",
    korName: "데미갓",
    color: "text-purple-400",
    borderColor: "border-purple-400 dark:border-purple-500",
    minMmr: 8100,
    maxRank: 1000,
  },
  {
    engName: "Mithril",
    korName: "미스릴",
    color: "text-cyan-400",
    borderColor: "border-cyan-400 dark:border-cyan-500",
    minMmr: 7400,
  },
  {
    engName: "Meteorite",
    korName: "메테오라이트",
    color: "text-orange-400",
    borderColor: "border-orange-400 dark:border-orange-500",
    minMmr: 6400,
  },
  {
    engName: "Diamond",
    korName: "다이아몬드",
    color: "text-blue-400",
    borderColor: "border-blue-400 dark:border-blue-500",
    minMmr: 5000,
  },
  {
    engName: "Platinum",
    korName: "플레티넘",
    color: "text-teal-500",
    borderColor: "border-teal-400 dark:border-teal-600",
    minMmr: 3600,
  },
  {
    engName: "Gold",
    korName: "골드",
    color: "text-yellow-500",
    borderColor: "border-yellow-400 dark:border-yellow-600",
    minMmr: 2400,
  },
  {
    engName: "Silver",
    korName: "실버",
    color: "text-slate-400",
    borderColor: "border-slate-400 dark:border-slate-500",
    minMmr: 1400,
  },
  {
    engName: "Bronze",
    korName: "브론즈",
    color: "text-amber-700",
    borderColor: "border-amber-400 dark:border-amber-700",
    minMmr: 600,
  },
  {
    engName: "Iron",
    korName: "아이언",
    color: "text-slate-500",
    borderColor: "border-slate-300 dark:border-slate-600",
    minMmr: 0,
  },
];

export const UNRANKED_TIER: ErTierInfo = {
  engName: "Unranked",
  korName: "언랭크드",
  color: "text-slate-400",
  borderColor: "border-slate-300 dark:border-slate-600",
};

export function getErTierInfo(mmr?: number, rank?: number): ErTierInfo {
  if (mmr === undefined || mmr === null) return UNRANKED_TIER;

  for (const tier of ER_TIERS) {
    if (mmr >= tier.minMmr) {
      if (
        tier.maxRank === undefined ||
        (rank !== undefined && rank <= tier.maxRank)
      ) {
        return {
          engName: tier.engName,
          korName: tier.korName,
          color: tier.color,
          borderColor: tier.borderColor,
        };
      }
    }
  }

  return UNRANKED_TIER;
}

export function getErTierImageUrl(engName: string): string {
  return `https://pub-ec9311e4416d473a9cdd54c206eb2fef.r2.dev/Rank/${engName}.png`;
}
