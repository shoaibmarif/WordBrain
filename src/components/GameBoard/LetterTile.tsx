import React from 'react';
import { CellState } from '../../game/types';
import { Check, ArrowLeftRight, X } from 'lucide-react';

interface LetterTileProps {
  char?: string;
  state: CellState;
  animationDelayMs?: number;
  isWinningRow?: boolean;
  highContrast?: boolean;
}

export const LetterTile: React.FC<LetterTileProps> = ({
  char = '',
  state,
  animationDelayMs = 0,
  isWinningRow = false,
  highContrast = false,
}) => {
  const isFilled = char.length > 0;
  const isRevealed = state === 'correct' || state === 'present' || state === 'absent';

  // Base styling for tiles
  let bgClass = 'bg-white dark:bg-[#111827]/80';
  let borderClass = 'border-2 border-slate-200 dark:border-slate-800';
  let textClass = 'text-slate-900 dark:text-slate-100';
  let accessibleLabel = '';

  if (state === 'tbd') {
    bgClass = 'bg-white dark:bg-[#162032]';
    borderClass = 'border-2 border-slate-700 dark:border-slate-400 scale-[1.03] shadow-sm ring-2 ring-slate-900/5 dark:ring-emerald-400/20';
    textClass = 'text-slate-950 dark:text-white font-black';
    accessibleLabel = `${char}, not submitted`;
  } else if (state === 'correct') {
    bgClass = highContrast
      ? 'bg-gradient-to-b from-orange-500 to-orange-600 shadow-md shadow-orange-500/25'
      : 'bg-gradient-to-b from-emerald-500 to-emerald-600 shadow-md shadow-emerald-500/25';
    borderClass = highContrast ? 'border-2 border-orange-600' : 'border-2 border-emerald-600';
    textClass = 'text-white font-black';
    accessibleLabel = `${char}, correct position`;
  } else if (state === 'present') {
    bgClass = highContrast
      ? 'bg-gradient-to-b from-sky-500 to-sky-600 shadow-md shadow-sky-500/25'
      : 'bg-gradient-to-b from-amber-400 to-amber-500 shadow-md shadow-amber-500/25';
    borderClass = highContrast ? 'border-2 border-sky-600' : 'border-2 border-amber-500';
    textClass = 'text-white font-black';
    accessibleLabel = `${char}, in word but wrong position`;
  } else if (state === 'absent') {
    bgClass = 'bg-slate-500 dark:bg-slate-700/90';
    borderClass = 'border-2 border-slate-500 dark:border-slate-700';
    textClass = 'text-white font-black';
    accessibleLabel = `${char}, not in word`;
  } else {
    accessibleLabel = 'empty tile';
  }

  const animationClass = isWinningRow
    ? 'animate-win-bounce'
    : isRevealed
    ? 'animate-flip'
    : isFilled && state === 'tbd'
    ? 'animate-pop'
    : '';

  return (
    <div
      role="text"
      aria-label={accessibleLabel}
      style={{ animationDelay: `${animationDelayMs}ms` }}
      className={`relative flex items-center justify-center font-black select-none transition-all duration-150 rounded-xl aspect-square text-2xl sm:text-3xl max-h-[64px] max-w-[64px] w-full ${bgClass} ${borderClass} ${textClass} ${animationClass}`}
    >
      <span className="drop-shadow-xs">{char}</span>

      {/* Accessible icon badge when high contrast is active */}
      {highContrast && isRevealed && (
        <span
          className="absolute top-1 right-1 opacity-90"
          aria-hidden="true"
        >
          {state === 'correct' && <Check className="w-3.5 h-3.5 text-white stroke-[3.5]" />}
          {state === 'present' && <ArrowLeftRight className="w-3.5 h-3.5 text-white stroke-[3.5]" />}
          {state === 'absent' && <X className="w-3.5 h-3.5 text-white stroke-[3.5]" />}
        </span>
      )}
    </div>
  );
};
