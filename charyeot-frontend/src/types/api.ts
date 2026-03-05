// ============================================================
// 공통
// ============================================================

/** API 공통 응답 래퍼 */
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

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
// 전적 (LoL 기준)
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

// ============================================================
// 검색 결과 페이지 진입점
// ============================================================

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

export interface PerkStyle{
  description: string;
  selections: PerkStyleSelections[];
  style: number;
}

export interface PerkStyleSelections{
  perk: number;
  var1: number;
  var2: number;
  var3: number;
}


export interface DataDragon {
  v: string; 
  l: string; 
  cdn: string; 
  dd: string; 
  lg: string; 
  css: string; 
}
