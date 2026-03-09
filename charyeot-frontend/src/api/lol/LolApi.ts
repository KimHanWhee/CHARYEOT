import type { ApiResponse, DataDragon } from '../../types/api';
import type { LolCharyeotResponse, Match, PlayerSearchResult, Profile } from '../../types/lol';
import { apiClient } from '../Client';

/**
 * 플레이어 프로필 조회
 * GET /v1/lol/summoner/profile/{name}/{tag}
 */
export async function fetchPlayerProfile(name: string, tag: string): Promise<Profile> {
  const res = await apiClient.get<Profile>(
    `/v1/lol/summoner/profile/${encodeURIComponent(name)}/${encodeURIComponent(tag)}`,
  );
  return res.data;
}

/**
 * 플레이어 전적 목록 조회
 * GET /v1/lol/summoner/match/{puuid}
 */
export async function fetchMatches(puuid: string): Promise<Match[]> {
  const res = await apiClient.get<Match[]>(
    `/v1/lol/summoner/match/${encodeURIComponent(puuid)}`,
  );
  return res.data;
}

/**
 * 프로필 + 전적 한 번에 조회
 */
export async function fetchPlayerSummary(name: string, tag: string): Promise<PlayerSearchResult> {
  const res = await apiClient.get<ApiResponse<PlayerSearchResult>>(
    `/players/${encodeURIComponent(name)}/${encodeURIComponent(tag)}/summary`,
  );
  return res.data.data;
}

/**
 * 판결 요청 엔드포인트 URL — 여기서 수정 가능
 */
const CHARYEOT_LOL_ENDPOINT = (matchId: string) => `/v1/charyeot/lol/${encodeURIComponent(matchId)}`;

/**
 * 특정 경기에 대한 Gemini 판결 요청
 * POST /v1/charyeot/lol/{matchId}
 */
export async function fetchLolCharyeot(matchId: string): Promise<LolCharyeotResponse> {
  const res = await apiClient.post<LolCharyeotResponse>(CHARYEOT_LOL_ENDPOINT(matchId), null, {
    timeout: 60_000,
  });
  return res.data;
}

/**
 * DataDragon 버전 조회
 */
export async function fetchDataDragonVersion(): Promise<string> {
  const res = await apiClient.get<DataDragon>(
    'https://ddragon.leagueoflegends.com/realms/kr.json',
  );
  return res.data.v;
}
