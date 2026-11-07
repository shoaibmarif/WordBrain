import React from 'react';
import { Delete } from 'lucide-react';
import type { LetterState } from '../../game/types';

interface KeyboardProps {
  keyboardStates: Record<string, LetterState>;
  onChar: (char: string) => void;
  onEnter: () => void;
  onDelete: () => void;
  disabled?: boolean;
}

const ROWS = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];

const STATE_LABEL: Record<string, string> = {
  correct: ', right spot',
  present: ', in the word',
  absent: ', not in the word',
};

export const Keyboard: React.FC<KeyboardProps> = ({ keyboardStates, onChar, onEnter, onDelete, disabled = false }) => {
  // Mouse clicks shouldn't move focus onto a key, or a later Enter would press it again.
  const noFocus = (e: React.MouseEvent) => e.preventDefault();

  return (
    <div role="group" aria-label="Keyboard" className="mx-auto flex w-full max-w-[34rem] flex-col gap-1.5 select-none sm:gap-2">
      {ROWS.map((row, i) => (
        <div key={row} className={`flex gap-1 sm:gap-1.5 ${i === 1 ? 'px-[5%]' : ''}`}>
          {i === 2 && (
            <button type="button" data-key data-wide="true" className="key flex-[1.6]" onMouseDown={noFocus} onClick={onEnter} disabled={disabled}>
              ENTER
            </button>
          )}
          {row.split('').map((ch) => {
            const state = keyboardStates[ch];
            return (
              <button
                key={ch}
                type="button"
                data-key
                data-state={state}
                className="key flex-1"
                aria-label={`${ch}${state ? STATE_LABEL[state] ?? '' : ''}`}
                onMouseDown={noFocus}
                onClick={() => onChar(ch)}
                disabled={disabled}
              >
                {ch}
              </button>
            );
          })}
          {i === 2 && (
            <button type="button" data-key data-wide="true" className="key flex-[1.6]" onMouseDown={noFocus} onClick={onDelete} disabled={disabled} aria-label="Delete letter">
              <Delete className="h-5 w-5" aria-hidden="true" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};
