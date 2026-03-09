import type { BattleUserResult, UserSearchData, UserStats } from '../../types/er';
import { apiClient } from '../Client';

// ── 엔드포인트 URL — 백엔드 완성 후 여기서 수정 ──────────────
const ER_USER_STATS_ENDPOINT = (nickname: string) =>
  `/v1/er/user/${encodeURIComponent(nickname)}/stats`;

const ER_USER_GAMES_ENDPOINT = (nickname: string) =>
  `/v1/er/user/${encodeURIComponent(nickname)}/games`;

const ER_USER_SEARCH_ENDPOINT = (nickname: string) =>
  `/v1/er/search/${encodeURIComponent(nickname)}`;
// ─────────────────────────────────────────────────────────────

/**
 * 유저 통계 조회
 * GET /v1/er/user/{nickname}/stats
 */
export async function fetchErUserStats(nickname: string): Promise<UserStats> {
  const res = await apiClient.get<UserStats>(ER_USER_STATS_ENDPOINT(nickname));
  return res.data;
}

/**
 * 유저 전적 목록 조회
 * GET /v1/er/user/{nickname}/games
 */
export async function fetchErUserGames(nickname: string): Promise<BattleUserResult[]> {
  const res = await apiClient.get<BattleUserResult[]>(ER_USER_GAMES_ENDPOINT(nickname));
  return res.data;
}

/**
 * 유저 검색 정보 조회 API 구조상 유저 정보, 전적 통합 조회
 * GET /v1/er/search/{nickname}
 */
export async function fetchErUserSearchData(nickname: string): Promise<UserSearchData> {
  const res = await apiClient.get<UserSearchData>(ER_USER_SEARCH_ENDPOINT(nickname));
  return res.data;
}
