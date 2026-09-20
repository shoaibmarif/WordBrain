import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { GameMode, LetterEvaluation, WordLength } from '../../game/types';
import { shareGameResult } from '../../game/share';
import { getDailyPuzzleNumber, getTimeUntilNextMidnight, formatCountdown } from '../../game/dailyPuzzle';
import { Share2, RotateCcw, Check, Sparkles, Clock, Target } from 'lucide-react';

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  won: boolean;
  targetWord: string;
  attemptsUsed: number;
  maxAttempts: number;
  durationSeconds: number;
  mode: GameMode;
  wordLength: WordLength;
  evaluations: LetterEvaluation[][];
  highContrast: boolean;
  hardMode: boolean;
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
  mode,
  wordLength,
  evaluations,
  highContrast,
  hardMode,
  onPlayAgain,
  onOpenStats,
}) => {
  const [copiedMessage, setCopiedMessage] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<string>('');

  useEffect(() => {
    if (mode !== 'daily') return;

    const updateCountdown = () => {
      const ms = getTimeUntilNextMidnight();
      setCountdown(formatCountdown(ms));
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [mode]);

  const handleShare = async () => {
    const puzzleNumber = mode === 'daily' ? getDailyPuzzleNumber() : undefined;
    const res = await shareGameResult({
      mode,
      puzzleNumber,
      wordLength,
      maxAttempts,
      attemptsUsed,
      won,
      history: evaluations,
      highContrast,
      hardMode,
    });

    setCopiedMessage(res.message);
    setTimeout(() => setCopiedMessage(null), 3000);
  };

  const formattedTime = `${Math.floor(durationSeconds / 60)
    .toString()
    .padStart(2, '0')}:${(durationSeconds % 60).toString().padStart(2, '0')}`;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={won ? '🎉 Spectacular!' : 'Game Over'}
      maxWidthClass="max-w-md"
    >
      <div className="text-center space-y-5">
        {/* Banner */}
        <div>
          <p className="text-xs uppercase tracking-widest font-bold text-slate-500 dark:text-slate-400 mb-1">
            The target word was
          </p>
          <div className="inline-block px-5 py-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="text-3xl font-black font-mono tracking-widest text-emerald-600 dark:text-emerald-400">
              {targetWord}
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs font-semibold mb-0.5">
              <Target className="w-3.5 h-3.5" />
              Attempts
            </div>
            <p className="text-xl font-bold text-slate-900 dark:text-slate-100">
              {won ? `${attemptsUsed} / ${maxAttempts}` : 'Failed'}
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs font-semibold mb-0.5">
              <Clock className="w-3.5 h-3.5" />
              Time
            </div>
            <p className="text-xl font-bold text-slate-900 dark:text-slate-100">{formattedTime}</p>
          </div>
        </div>

        {/* Daily Next Puzzle Timer */}
        {mode === 'daily' && (
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800/50">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
              Today's Challenge Completed
            </p>
            <p className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400 my-1">
              {countdown}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Time until next daily word</p>
          </div>
        )}

        {/* Feedback Message on Share */}
        {copiedMessage && (
          <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 animate-fade flex items-center justify-center gap-1">
            <Check className="w-4 h-4" />
            {copiedMessage}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
          <button
            type="button"
            onClick={handleShare}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md transition-all cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            Share Result
          </button>

          {mode !== 'daily' ? (
            <button
              type="button"
              onClick={() => {
                onClose();
                onPlayAgain();
              }}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Play Again
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenStats();
              }}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              View Stats
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};
