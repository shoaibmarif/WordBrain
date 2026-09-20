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
    'bg-slate-200 hover:bg-slate-300 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-100';

  if (state === 'correct') {
    bgClass = highContrast
      ? 'bg-orange-600 hover:bg-orange-500 text-white'
      : 'bg-emerald-600 hover:bg-emerald-500 text-white';
  } else if (state === 'present') {
    bgClass = highContrast
      ? 'bg-sky-600 hover:bg-sky-500 text-white'
      : 'bg-amber-500 hover:bg-amber-400 text-white';
  } else if (state === 'absent') {
    bgClass =
      'bg-slate-400 hover:bg-slate-400 dark:bg-slate-700/70 dark:hover:bg-slate-700/70 text-slate-200 dark:text-slate-400 opacity-80';
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
      className={`touch-manipulation select-none flex items-center justify-center font-bold rounded-md transition-colors active:scale-95 text-sm sm:text-base font-sans cursor-pointer h-12 sm:h-14 ${
        isWide ? 'px-3 sm:px-4 flex-[1.5]' : 'flex-1'
      } ${bgClass}`}
    >
      {display || value}
    </button>
  );
};
