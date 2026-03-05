import type { ApiResponse, DataDragon, Match, PlayerSearchResult, Profile } from '../types/api';
import { apiClient } from './client';

/**
 * 플레이어 프로필 조회
 * GET /v1/lol/summoner/{name}/{tag}
 */
export async function fetchPlayerProfile(name: string, tag: string): Promise<Profile> {
  const res = await apiClient.get<Profile>(
    `/v1/lol/summoner/profile/${encodeURIComponent(name)}/${encodeURIComponent(tag)}`,
  );
  return res.data;
}

/**
 * 플레이어 전적 목록 조회
 * GET /players/{name}/{tag}/matches
 */
export async function fetchMatches(puuid: string): Promise<Match[]> {
  const res = await apiClient.get<Match[]>(
    `/v1/lol/summoner/match/${encodeURIComponent(puuid)}`,
  );
  return res.data;
}

/**
 * 프로필 + 전적 한 번에 조회 (서버가 단일 엔드포인트를 제공하는 경우)
 * GET /players/{name}/{tag}/summary
 */
export async function fetchPlayerSummary(
  name: string,
  tag: string,
): Promise<PlayerSearchResult> {
  const res = await apiClient.get<ApiResponse<PlayerSearchResult>>(
    `/players/${encodeURIComponent(name)}/${encodeURIComponent(tag)}/summary`,
  );
  return res.data.data;
}

/**
 * Riot Games에서 제공하는 이미지 데이터 보관소인 DataDragon의 버전정보를 불러오는 API
 */
export async function fetchDataDragonVersion() : Promise<string> {
  const res = await apiClient.get<DataDragon>(
    'https://ddragon.leagueoflegends.com/realms/kr.json',
  );
  return res.data.v;
  
}
