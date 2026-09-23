import React from 'react';
import { Modal } from '../common/Modal';
import { GameMode, LetterEvaluation, WordLength } from '../../game/types';
import { RotateCcw, Sparkles, Clock, Target } from 'lucide-react';

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  won: boolean;
  targetWord: string;
  attemptsUsed: number;
  maxAttempts: number;
  durationSeconds: number;
  mode?: GameMode;
  wordLength?: WordLength;
  evaluations?: LetterEvaluation[][];
  highContrast?: boolean;
  hardMode?: boolean;
  onPlayAgain: () => void;
  onOpenStats: () => void;
}

export const ResultModal: React.FC<ResultModalProps> = ({
  isOpen,
  onClose,
  won,
  targetWord,
  attemptsUsed,
  maxAttempts,
  durationSeconds,
  onPlayAgain,
  onOpenStats,
}) => {
  const formattedTime = `${Math.floor(durationSeconds / 60)
    .toString()
    .padStart(2, '0')}:${(durationSeconds % 60).toString().padStart(2, '0')}`;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={won ? '🎉 Brilliant Deduction!' : 'Puzzle Completed'}
      maxWidthClass="max-w-md"
    >
      <div className="text-center space-y-5">
        {/* Target word reveal */}
        <div>
          <p className="text-xs uppercase tracking-widest font-bold text-slate-500 dark:text-slate-400 mb-1.5">
            The target word was
          </p>
          <div className="inline-block px-6 py-2.5 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs">
            <span className="text-3xl font-black font-mono tracking-widest text-emerald-600 dark:text-emerald-400">
              {targetWord}
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs font-semibold mb-0.5">
              <Target className="w-3.5 h-3.5" />
              Attempts
            </div>
            <p className="text-xl font-black text-slate-900 dark:text-slate-100">
              {won ? `${attemptsUsed} / ${maxAttempts}` : 'Failed'}
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs font-semibold mb-0.5">
              <Clock className="w-3.5 h-3.5" />
              Time
            </div>
            <p className="text-xl font-black text-slate-900 dark:text-slate-100">{formattedTime}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5 pt-2">
          <button
            type="button"
            onClick={() => {
              onClose();
              onPlayAgain();
            }}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            Play Again
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenStats();
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            View Statistics
          </button>
        </div>
      </div>
    </Modal>
  );
};
