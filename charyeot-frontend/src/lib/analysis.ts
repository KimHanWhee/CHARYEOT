import { Match, Participant } from '../data/mockData';

export interface BlameResult {
  culprit: Participant;
  reason: string;
  score: number;
}

export function analyzeMatch(match: Match): BlameResult | null {
  // Only analyze losing team for the "Culprit"
  // Find which team lost
  const losingTeam = match.participants.filter(p => !p.win);
  
  if (losingTeam.length === 0) return null; // Everyone won? Impossible in 5v5 but safe check.

  let maxScore = -Infinity;
  let culprit: Participant | null = null;
  let reason = "";

  losingTeam.forEach(p => {
    let score = 0;
    
    // Base score from KDA
    score += (p.deaths * 2);
    score -= (p.kills * 1.5);
    score -= (p.assists * 0.5);

    // Penalty for low damage (if not support)
    if (p.role !== 'SUPPORT' && p.totalDamageDealtToChampions < 10000) {
      score += 10;
    }

    // Penalty for low vision (if support)
    if (p.role === 'SUPPORT' && p.visionScore < 15) {
      score += 10;
    }

    // Penalty for low CS (if carry)
    if ((p.role === 'ADC' || p.role === 'MID') && p.cs < 150) {
      score += 5;
    }

    if (score > maxScore) {
      maxScore = score;
      culprit = p;
    }
  });

  if (!culprit) return null;

  // Determine reason
  const c = culprit as Participant;
  if (c.deaths > 10) reason = "Intentional Feeding (High Deaths)";
  else if (c.totalDamageDealtToChampions < 5000 && c.role !== 'SUPPORT') reason = "Pacifist (Extremely Low Damage)";
  else if (c.visionScore < 5) reason = "Blind (No Vision)";
  else if (c.cs < 100 && (c.role === 'ADC' || c.role === 'MID')) reason = "Minion Allergy (Low CS)";
  else reason = "General incompetence";

  return { culprit, reason, score: maxScore };
}
