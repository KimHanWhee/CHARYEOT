// ============================================================
// 플레이어 프로필
// ============================================================
export interface Profile {
  puuid: string;
  gameName: string;
  tagLine: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
}

// ============================================================
// 전적
// ============================================================
export type Role = 'TOP' | 'JUNGLE' | 'MID' | 'ADC' | 'SUPPORT';

export interface Participant {
  puuid: string;
  riotIdGameName: string;
  riotIdTagline: string;
  kills: number;
  deaths: number;
  assists: number;
  win: boolean;
  role: string;
  teamId: number;
  totalDamageDealtToChampions: number;
  totalDamageTaken: number;
  totalHealsOnTeammates: number;
  championId: string;
  championName: string;
  champLevel: number;
  totalMinionsKilled: number;
  item0: number;
  item1: number;
  item2: number;
  item3: number;
  item4: number;
  item5: number;
  item6: number;
  summoner1Id: number;
  summoner2Id: number;
  visionScore: number;
  perks: Perks;
}

export interface Match {
  matchId: string;
  duration: number;
  gameMode: string;
  participantsDTO: Participant[];
}

export interface PlayerSearchResult {
  profile: Profile;
  matches: Match[];
}

// ============================================================
// 특성 정보
// ============================================================
export interface Perks {
  styles: PerkStyle[];
}

export interface PerkStyle {
  description: string;
  selections: PerkStyleSelections[];
  style: number;
}

export interface PerkStyleSelections {
  perk: number;
  var1: number;
  var2: number;
  var3: number;
}

// ============================================================
// 판결
// ============================================================
export interface LolCharyeotPlayerInfo {
  summonerName: string;
  summonerTag: string;
  champion: string;
  reason: string;
  description: string;
  score: number;
}

export interface LolCharyeotResponse {
  most_responsible_player: LolCharyeotPlayerInfo;
}

// ============================================================
// DataDragon 버전 데이터
// ============================================================
export interface DataDragon {
  v: string;
  l: string;
  cdn: string;
  dd: string;
  lg: string;
  css: string;
}
