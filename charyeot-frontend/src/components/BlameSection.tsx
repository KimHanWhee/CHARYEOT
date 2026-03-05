import { Match, Participant } from '../data/mockData';
import { analyzeMatch, BlameResult } from '../lib/analysis';
import { motion } from 'motion/react';
import { Skull, AlertTriangle, Gavel, ArrowLeft } from 'lucide-react';
import { cn } from '../lib/utils';

interface BlameSectionProps {
  match: Match;
  onBack: () => void;
}

export function BlameSection({ match, onBack }: BlameSectionProps) {
  const result = analyzeMatch(match);
  
  // If no result (e.g. everyone won perfectly?), fallback
  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-900 dark:text-white">
        <h2 className="text-2xl font-bold">No Culprit Found</h2>
        <p>This was a perfect game!</p>
        <button onClick={onBack} className="mt-4 px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded-lg">Back</button>
      </div>
    );
  }

  const { culprit, reason, score } = result;
  const isUser = culprit.summonerName === 'MySummonerName'; // Mock check

  return (
    <div className="relative w-full max-w-4xl mx-auto p-4 md:p-8">
      <button 
        onClick={onBack}
        className="absolute top-4 left-4 flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
      >
        <ArrowLeft size={20} /> Back
      </button>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center text-center space-y-8 mt-12"
      >
        <div className="space-y-2">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
            className="w-24 h-24 bg-rose-600 rounded-full flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(225,29,72,0.6)]"
          >
            <Gavel size={48} className="text-white" />
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">
            The Verdict
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg">Who is responsible for this disaster?</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="relative w-full max-w-md bg-white dark:bg-slate-900 border-2 border-rose-600 rounded-2xl p-8 shadow-2xl overflow-hidden"
        >
          {/* "GUILTY" Stamp Effect */}
          <motion.div 
            initial={{ opacity: 0, scale: 2, rotate: -15 }}
            animate={{ opacity: 1, scale: 1, rotate: -15 }}
            transition={{ delay: 1.2, type: "spring", stiffness: 300 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-rose-500 text-rose-500 font-black text-6xl px-4 py-2 rounded-lg z-10 pointer-events-none mix-blend-multiply dark:mix-blend-screen opacity-80"
          >
            GUILTY
          </motion.div>

          <div className="flex flex-col items-center space-y-4 relative z-0">
            <div className="w-32 h-32 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center border-4 border-rose-500/30">
              <span className="text-4xl font-bold text-slate-500">{culprit.championName[0]}</span>
            </div>
            
            <div className="space-y-1">
              <h2 className={cn("text-3xl font-bold", isUser ? "text-yellow-500 dark:text-yellow-400" : "text-slate-900 dark:text-white")}>
                {culprit.summonerName}
              </h2>
              <p className="text-rose-500 dark:text-rose-400 font-mono text-sm tracking-widest uppercase">{culprit.championName} • {culprit.role}</p>
            </div>

            <div className="w-full bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Crime</span>
                <AlertTriangle size={14} className="text-yellow-500" />
              </div>
              <p className="text-lg font-medium text-slate-900 dark:text-white">"{reason}"</p>
            </div>

            <div className="grid grid-cols-3 gap-2 w-full text-center">
              <StatBox label="KDA" value={`${culprit.kills}/${culprit.deaths}/${culprit.assists}`} highlight={culprit.deaths > 8} />
              <StatBox label="Damage" value={culprit.totalDamageDealtToChampions.toLocaleString()} highlight={culprit.totalDamageDealtToChampions < 10000} />
              <StatBox label="Vision" value={culprit.visionScore} highlight={culprit.visionScore < 10} />
            </div>
            
            <div className="pt-4 w-full">
              <div className="flex justify-between text-xs text-slate-500 mb-1">
                <span>Troll Score</span>
                <span>{Math.min(100, Math.floor(score * 2))}%</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, Math.floor(score * 2))}%` }}
                  transition={{ delay: 1.5, duration: 1 }}
                  className="h-full bg-rose-500"
                />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="text-slate-500 text-sm max-w-md"
        >
          Disclaimer: This analysis is for entertainment purposes only. Don't flame your teammates based on this result!
        </motion.p>
      </motion.div>
    </div>
  );
}

function StatBox({ label, value, highlight }: { label: string, value: string | number, highlight?: boolean }) {
  return (
    <div className={cn(
      "bg-slate-50 dark:bg-slate-800/50 rounded-lg p-2 border", 
      highlight 
        ? "border-rose-500/50 bg-rose-50 dark:bg-rose-900/10 text-rose-600 dark:text-rose-400" 
        : "border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-200"
    )}>
      <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase">{label}</p>
      <p className="font-mono font-bold">{value}</p>
    </div>
  );
}
