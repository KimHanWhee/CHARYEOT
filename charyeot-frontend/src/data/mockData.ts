export type Role = 'TOP' | 'JUNGLE' | 'MID' | 'ADC' | 'SUPPORT';

export interface Participant {
  summonerName: string;
  championName: string;
  role: Role;
  teamId: number; // 100 (Blue) or 200 (Red)
  kills: number;
  deaths: number;
  assists: number;
  totalDamageDealtToChampions: number;
  visionScore: number;
  goldEarned: number;
  win: boolean;
  items: number[]; // Item IDs (mocked)
  cs: number; // Creep Score
}

export interface Match {
  matchId: string;
  gameCreation: number;
  gameDuration: number; // in seconds
  gameMode: string;
  participants: Participant[];
}

const CHAMPIONS = [
  'Aatrox', 'Ahri', 'Akali', 'Ashe', 'Blitzcrank', 'Caitlyn', 'Darius', 'Ezreal', 'Garen', 'Jinx', 
  'KaiSa', 'LeeSin', 'Lux', 'Malphite', 'MasterYi', 'MissFortune', 'Morgana', 'Nautilus', 'Ornn', 
  'Pyke', 'Riven', 'Sett', 'Teemo', 'Thresh', 'Vayne', 'Yasuo', 'Yone', 'Zed'
];

const NAMES = [
  'Faker', 'Chovy', 'ShowMaker', 'Deft', 'Keria', 'Zeus', 'Oner', 'Gumayusi', 'BeryL', 'Canyon',
  'Hide on bush', 'T1 Fan', 'GenG Fan', 'Bronze King', 'Silver Surfer', 'Gold Digger', 'Plat Player',
  'Diamond Hands', 'Master Yi Main', 'Teemo God'
];

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateParticipant(role: Role, isWin: boolean, teamId: number, isUser: boolean = false): Participant {
  const kills = isWin ? randomInt(5, 15) : randomInt(0, 8);
  const deaths = isWin ? randomInt(0, 5) : randomInt(5, 15);
  const assists = randomInt(2, 20);
  
  // Simulate "bad player" occasionally for losing team
  const isFeeder = !isWin && Math.random() < 0.3;
  
  return {
    summonerName: isUser ? 'MySummonerName' : NAMES[randomInt(0, NAMES.length - 1)],
    championName: CHAMPIONS[randomInt(0, CHAMPIONS.length - 1)],
    role,
    teamId,
    kills: isFeeder ? randomInt(0, 2) : kills,
    deaths: isFeeder ? randomInt(10, 20) : deaths,
    assists: isFeeder ? randomInt(0, 5) : assists,
    totalDamageDealtToChampions: isFeeder ? randomInt(2000, 8000) : randomInt(10000, 40000),
    visionScore: role === 'SUPPORT' ? randomInt(30, 80) : randomInt(5, 20),
    goldEarned: isFeeder ? randomInt(5000, 8000) : randomInt(8000, 18000),
    win: isWin,
    items: [1, 2, 3, 4, 5, 6], // Mock IDs
    cs: role === 'SUPPORT' ? randomInt(10, 40) : randomInt(150, 300),
  };
}

export function generateMatch(id: string): Match {
  const isWin = Math.random() > 0.5;
  const duration = randomInt(1200, 2400); // 20-40 mins
  
  // User is always on Team 100 (Blue) for simplicity in this mock
  const myTeam = [
    generateParticipant('TOP', isWin, 100),
    generateParticipant('JUNGLE', isWin, 100),
    generateParticipant('MID', isWin, 100, true), // User is MID
    generateParticipant('ADC', isWin, 100),
    generateParticipant('SUPPORT', isWin, 100),
  ];

  const enemyTeam = [
    generateParticipant('TOP', !isWin, 200),
    generateParticipant('JUNGLE', !isWin, 200),
    generateParticipant('MID', !isWin, 200),
    generateParticipant('ADC', !isWin, 200),
    generateParticipant('SUPPORT', !isWin, 200),
  ];

  return {
    matchId: id,
    gameCreation: Date.now() - randomInt(0, 100000000),
    gameDuration: duration,
    gameMode: 'CLASSIC',
    participants: [...myTeam, ...enemyTeam],
  };
}

export const MOCK_MATCHES = Array.from({ length: 5 }).map((_, i) => generateMatch(`KR_${1000 + i}`));
