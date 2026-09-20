import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { GameHistoryItem, GameStats } from '../../game/types';
import { DailyStreakData } from '../../hooks/useStatistics';
import { Trash2, Flame, Trophy, Award, Clock } from 'lucide-react';

interface StatisticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: GameStats;
  dailyStreak: DailyStreakData;
  history: GameHistoryItem[];
  onResetStats: () => void;
  onClearHistory: () => void;
}

export const StatisticsModal: React.FC<StatisticsModalProps> = ({
  isOpen,
  onClose,
  stats,
  dailyStreak,
  history,
  onResetStats,
  onClearHistory,
}) => {
  const [activeTab, setActiveTab] = useState<'stats' | 'history'>('stats');
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  // Maximum count in distribution for relative bar width
  const maxFreq = Math.max(1, ...Object.values(stats.guessDistribution));

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Statistics & History" maxWidthClass="max-w-lg">
      {/* Tab Switcher */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 mb-5">
        <button
          onClick={() => setActiveTab('stats')}
          className={`flex-1 py-2 text-sm font-semibold border-b-2 transition-colors cursor-pointer ${
            activeTab === 'stats'
              ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400'
          }`}
        >
          Performance
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-2 text-sm font-semibold border-b-2 transition-colors cursor-pointer ${
            activeTab === 'history'
              ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400'
          }`}
        >
          Recent Games ({history.length})
        </button>
      </div>

      {activeTab === 'stats' ? (
        <div className="space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
              <p className="text-2xl font-black text-slate-900 dark:text-slate-100">{stats.gamesPlayed}</p>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Played</p>
            </div>
            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
              <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{stats.winPercentage}%</p>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Win Rate</p>
            </div>
            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
              <p className="text-2xl font-black text-amber-500 flex items-center justify-center gap-0.5">
                <Flame className="w-5 h-5 fill-current" />
                {stats.currentStreak}
              </p>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Streak</p>
            </div>
            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
              <p className="text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center justify-center gap-0.5">
                <Trophy className="w-5 h-5 text-amber-500" />
                {stats.maxStreak}
              </p>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Best</p>
            </div>
          </div>

          {/* Daily Streak Specific Info */}
          <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 rounded-xl flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <div>
                <p className="font-bold text-slate-900 dark:text-slate-100">Daily Challenge Streak</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Consecutive daily wins</p>
              </div>
            </div>
            <div className="text-right">
              <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-lg">
                {dailyStreak.currentStreak}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">
                (Best: {dailyStreak.maxStreak})
              </span>
            </div>
          </div>

          {/* Guess Distribution Histogram */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-3">
              Guess Distribution
            </h3>
            <div className="space-y-1.5 font-mono text-xs">
              {[1, 2, 3, 4, 5, 6].map(attempt => {
                const count = stats.guessDistribution[attempt] || 0;
                const pct = Math.max(8, Math.round((count / maxFreq) * 100));

                return (
                  <div key={attempt} className="flex items-center gap-2">
                    <span className="w-3 text-right font-bold text-slate-600 dark:text-slate-400">
                      {attempt}
                    </span>
                    <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-md overflow-hidden flex">
                      <div
                        style={{ width: `${count > 0 ? pct : 0}%` }}
                        className={`h-5 min-w-[24px] rounded-md flex items-center justify-end px-2 text-white font-bold text-xs transition-all duration-300 ${
                          count > 0
                            ? 'bg-emerald-600 dark:bg-emerald-500'
                            : 'bg-transparent text-slate-400'
                        }`}
                      >
                        {count}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Average metrics */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-800">
            <span>Average Guesses: <strong className="text-slate-800 dark:text-slate-200">{stats.averageGuesses || 'N/A'}</strong></span>
            <span>Total Guesses in Wins: <strong className="text-slate-800 dark:text-slate-200">{stats.totalGuessesInWins}</strong></span>
          </div>

          {/* Reset button */}
          <div className="pt-2">
            {!showConfirmReset ? (
              <button
                type="button"
                onClick={() => setShowConfirmReset(true)}
                className="text-xs text-rose-500 hover:text-rose-600 dark:hover:text-rose-400 flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Reset All Statistics
              </button>
            ) : (
              <div className="flex items-center gap-3 p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-xl text-xs">
                <span className="text-rose-700 dark:text-rose-300">Are you sure? This cannot be undone.</span>
                <button
                  onClick={() => {
                    onResetStats();
                    setShowConfirmReset(false);
                  }}
                  className="px-2.5 py-1 bg-rose-600 text-white font-bold rounded hover:bg-rose-500 cursor-pointer"
                >
                  Yes, Reset
                </button>
                <button
                  onClick={() => setShowConfirmReset(false)}
                  className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* History Tab */
        <div className="space-y-4">
          {history.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              <p>No completed games yet.</p>
              <p className="text-xs mt-1">Finish a puzzle to view it in your history.</p>
            </div>
          ) : (
            <>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onClearHistory}
                  className="text-xs text-rose-500 hover:text-rose-600 flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Clear History
                </button>
              </div>

              <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
                {history.map(item => (
                  <div
                    key={item.id}
                    className="p-3 bg-slate-100 dark:bg-slate-800/80 rounded-xl flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                          {item.mode} ({item.wordLength}L)
                        </span>
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                            item.won
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300'
                              : 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-300'
                          }`}
                        >
                          {item.won ? 'WON' : 'LOST'}
                        </span>
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                        Word: <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{item.targetWord}</span>
                      </p>
                    </div>

                    <div className="text-right text-slate-500 dark:text-slate-400">
                      <p className="font-bold text-slate-800 dark:text-slate-200">
                        {item.attemptsUsed} / {item.maxAttempts}
                      </p>
                      <p className="flex items-center justify-end gap-1 text-[11px]">
                        <Clock className="w-3 h-3" />
                        {item.durationSeconds}s
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </Modal>
  );
};
