// ============================================================
// 유저 통계 (UserStats)
// ============================================================
export interface CharacterStat {
  characterCode: number;
  korCharacterName: string;
  engCharacterName: string;
  totalGames: number;
  maxKillings: number;
  wins: number;
  top3: number;
}

export interface UserSearchData {
  userInfo: UserInfo;
  userStats: UserStats[];
  battleUserResponses: BattleUserResponse[];
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
// 전적 (BattleUserResponse)
// ============================================================
export interface BattleUserResponse {
  nickname: string;
  accountLevel: number;
  gameId: number;
  matchingMode: number;
  seasonId: number;
  characterNum: number;
  engCharacterName: string;
  korCharacterName: string;
  skinCode: number;
  characterLevel: number;
  gameRank: number;
  teamKill: number;
  playerKill: number;
  playerAssistant: number;
  playerDeaths: number;
  monsterKill: number;
  endTime: number;
  duration: number;
  damageToPlayer: number;
  damageFromPlayer: number;
  damageToMonster: number;
  teamRecover: number;
  totalGainVFCredit: number;
  totalUseVFCredit: number;
  tacticalSkillName: string;
  tacticalSkillLevel: number;
  weaponName: string;
  mainTrait: string;
  subTrait: string;
  itemList: Record<string, ItemDetail>;
  transferConsoleFromRevivalUseVFCredit: number;
  creditRevivalCount: number;
  creditRevivedOthersCount: number;
}

export interface ItemDetail {
  name: string;
  grade: number;
}

export interface ErCharyeotPlayer {
  accountName: string;
  korCharacter: string;
  engCharacter: string;
  reason: string;
  description: string;
  score: string;
}

export interface ErCharyeotResponse {
  most_responsible_player: ErCharyeotPlayer;
}
