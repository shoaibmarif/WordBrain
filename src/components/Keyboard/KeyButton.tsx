import React from 'react';
import { LetterState } from '../../game/types';

interface KeyButtonProps {
  value: string;
  display?: React.ReactNode;
  state?: LetterState;
  onClick: (val: string) => void;
  isWide?: boolean;
  disabled?: boolean;
  highContrast?: boolean;
}

export const KeyButton: React.FC<KeyButtonProps> = ({
  value,
  display,
  state = 'unused',
  onClick,
  isWide = false,
  disabled = false,
  highContrast = false,
}) => {
  let bgClass =
    'bg-slate-200/90 hover:bg-slate-300 text-slate-800 border-b-2 border-slate-300/80 dark:bg-[#1b2536] dark:hover:bg-[#233047] dark:text-slate-100 dark:border-b-2 dark:border-[#0f172a]';

  if (state === 'correct') {
    bgClass = highContrast
      ? 'bg-orange-600 hover:bg-orange-500 text-white border-b-2 border-orange-800 shadow-sm'
      : 'bg-emerald-600 hover:bg-emerald-500 text-white border-b-2 border-emerald-800 shadow-sm';
  } else if (state === 'present') {
    bgClass = highContrast
      ? 'bg-sky-600 hover:bg-sky-500 text-white border-b-2 border-sky-800 shadow-sm'
      : 'bg-amber-500 hover:bg-amber-400 text-white border-b-2 border-amber-700 shadow-sm';
  } else if (state === 'absent') {
    bgClass =
      'bg-slate-400 text-slate-100 border-b-2 border-slate-500 opacity-60 dark:bg-[#0f172a]/90 dark:text-slate-500 dark:border-b-2 dark:border-black/50 dark:opacity-40';
  } else if (isWide && value === 'ENTER') {
    bgClass =
      'bg-emerald-700/15 hover:bg-emerald-700/25 text-emerald-800 border-b-2 border-emerald-600/30 dark:bg-emerald-950/40 dark:hover:bg-emerald-950/60 dark:text-emerald-400 dark:border-b-2 dark:border-emerald-900/50';
  }

  const ariaLabel =
    value === 'ENTER'
      ? 'Enter guess'
      : value === 'BACKSPACE'
      ? 'Backspace'
      : `${value}, ${state}`;

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={() => onClick(value)}
      className={`keycap-btn touch-manipulation select-none flex items-center justify-center font-bold rounded-lg sm:rounded-xl active:scale-[0.96] text-xs sm:text-sm font-sans cursor-pointer h-12 sm:h-13 transition-colors ${
        isWide ? 'px-2 sm:px-3 text-[11px] sm:text-xs flex-[1.4] font-black tracking-wider' : 'flex-1'
      } ${bgClass}`}
    >
      {display || value}
    </button>
  );
};
