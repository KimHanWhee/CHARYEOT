// Game path mapping
export const GAME_PATHS = {
  LOL: 'leagueoflegends',
  VALORANT: 'valorant',
  ETERNAL_RETURN: 'eternalreturn',
} as const;

export type GameType = keyof typeof GAME_PATHS;

/** 이름 + 태그(#) 조합 검색이 필요한 게임 */
export const GAMES_WITH_TAG = new Set<GameType>(['LOL', 'VALORANT']);

export interface GameTab {
  id: GameType;
  name: string;
  shortName: string;
  path: string;
  available: boolean;
}

export const GAME_TABS: GameTab[] = [
  { id: 'LOL', name: 'League of Legends', shortName: 'LoL', path: GAME_PATHS.LOL, available: true },
  { id: 'VALORANT', name: 'Valorant', shortName: 'Valorant', path: GAME_PATHS.VALORANT, available: false },
  { id: 'ETERNAL_RETURN', name: 'Eternal Return', shortName: 'ER', path: GAME_PATHS.ETERNAL_RETURN, available: true },
];
