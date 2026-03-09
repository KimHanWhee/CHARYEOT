// ============================================================
// 유저 통계 (UserStats)
// ============================================================
export interface CharacterStat {
  characterCode: number;
  totalGames: number;
  maxKillings: number;
  wins: number;
  top3: number;
}

export interface UserSearchData {
  userInfo: UserInfo;
  userStats: UserStats[];
  battleUserResults: BattleUserResult[];
}

export interface UserInfo {
  userId: string;
  nickname: string;
}

export interface UserStats {
  seasonId: number;
  mmr: number;
  nickname: string;
  rank: number;
  rankSize: number;
  totalGames: number;
  totalWins: number;
  totalTeamKills: number;
  characterStats: CharacterStat[];
}

// ============================================================
// 전적 (BattleUserResult)
// ============================================================
export interface BattleUserResult {
  nickname: string;
  accountLevel: number;
  gameId: number;
  matchingMode: number;
  seasonId: number;
  characterNum: number;
  skinCode: number;
  characterLevel: number;
  gameRank: number;
  playerKill: number;
  playerAssistant: number;
  monsterKill: number;
  equipment: Record<number, number>;
  playTime: number;
  damageToPlayer: number;
  damageFromPlayer: number;
  damageToMonster: number;
  totalGainVFCredit: number;
  totalUseVFCredit: number;
}
