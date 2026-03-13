import { AnimatePresence, motion } from 'motion/react';
import { X, Gavel } from 'lucide-react';
import { LolCharyeotResponse } from '../../types/lol';

interface VerdictModalProps {
  isOpen: boolean;
  isLoading: boolean;
  verdict: LolCharyeotResponse | null;
  version: string;
  onClose: () => void;
}

export function VerdictModal({ isOpen, isLoading, verdict, version, onClose }: VerdictModalProps) {
  const player = verdict?.most_responsible_player;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="pointer-events-auto bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 w-full max-w-xl mx-4 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2">
                  <Gavel size={18} className="text-rose-500" />
                  <h2 className="font-bold text-slate-900 dark:text-white">차렷봇의 판결</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-12 gap-4">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-12 h-12 border-4 border-slate-200 dark:border-slate-700 border-t-rose-500 rounded-full"
                    />
                    <p className="text-slate-500 dark:text-slate-400 text-sm">차렷봇 판결 중...</p>
                  </div>
                ) : player ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-5"
                  >
                    {/* 상단: 챔피언 이미지(좌) + 소환사 정보(우) */}
                    <div className="flex items-center gap-5">
                      {/* Champion image + stamp */}
                      <div className="relative w-28 h-28 flex-shrink-0 rounded-xl overflow-hidden shadow-lg border-2 border-rose-500">
                        <img
                          src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${player.champion}.png`}
                          alt={player.champion}
                          className="w-full h-full object-cover"
                        />
                        <motion.div
                          initial={{ opacity: 0, scale: 3, rotate: -15 }}
                          animate={{ opacity: 1, scale: 1.5, rotate: -15 }}
                          transition={{ delay: 0.4, type: 'spring', stiffness: 300, damping: 20 }}
                          className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        >
                          <span className="border-4 border-rose-500 text-rose-500 font-black text-3xl px-3 py-1.5 mix-blend-multiply dark:mix-blend-screen opacity-95 tracking-tighter uppercase leading-none">
                            유죄
                          </span>
                        </motion.div>
                      </div>

                      {/* 소환사 이름 + 태그 + 차렷 + 점수 */}
                      <div className="flex flex-col gap-2 min-w-0">
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <span className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
                            "{player.summonerName}
                          </span>
                          <span className="text-base text-slate-400 font-medium">
                            #{player.summonerTag}
                          </span>
                          <span className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
                            " 차렷.
                          </span>
                        </div>
                        <span className="text-base text-slate-900 dark:text-slate-100 font-medium">
                          {player.champion}
                        </span>
                        <span className="inline-block self-start px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 text-xs font-semibold">
                          범죄 점수 {player.score}점
                        </span>
                      </div>
                    </div>

                    {/* 한줄평 (description) */}
                    <div>
                      <p className="text-base text-slate-700 dark:text-slate-200 leading-relaxed">
                        "{player.description}"
                      </p>
                    </div>

                    {/* reason */}
                    <div className="bg-slate-50 dark:bg-slate-800 rounded-xl px-5 py-4">
                      <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
                        {player.reason}
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <p className="text-center text-slate-500 dark:text-slate-400 py-8 text-sm">
                    차렷봇이 판결 도중 쓰러졌습니다.
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
