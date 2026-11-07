import React from 'react';
import type { CellState, LetterEvaluation } from '../../game/types';

interface GameBoardProps {
  wordLength: number;
  maxAttempts: number;
  guesses: string[];
  evaluations: LetterEvaluation[][];
  currentGuess: string;
  isShaking: boolean;
  won: boolean;
  /** Hides the letters (timed mode pause) so pausing can't be used to think. */
  hidden?: boolean;
}

const LABEL: Record<string, string> = {
  correct: 'right spot',
  present: 'in the word, wrong spot',
  absent: 'not in the word',
};

/** Symbol shown in high contrast mode so the colours aren't the only cue. */
const MARK: Record<string, string> = { correct: '●', present: '◐', absent: '' };

export const GameBoard: React.FC<GameBoardProps> = ({
  wordLength,
  maxAttempts,
  guesses,
  evaluations,
  currentGuess,
  isShaking,
  won,
  hidden = false,
}) => {
  // Tiles shrink a little for longer words so the board fits on a phone.
  // Width is capped by the screen height too, so the keyboard stays in view on phones.
  const rem = { 5: 20, 6: 22, 7: 24, 8: 26 }[wordLength] ?? 20;
  const maxWidth = `max(12rem, min(${rem}rem, calc((100dvh - 495px) * ${(wordLength / 6).toFixed(3)})))`;
  const text = wordLength >= 7 ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-[2rem]';

  return (
    <div style={{ maxWidth }} className={`mx-auto w-full select-none ${hidden ? 'blur-md' : ''}`} role="grid" aria-label="Game board">
      {Array.from({ length: maxAttempts }, (_, row) => {
        const submitted = row < guesses.length;
        const current = row === guesses.length;
        const winRow = won && row === guesses.length - 1;
        const word = submitted ? guesses[row] : current ? currentGuess : '';
        return (
          <div
            key={row}
            role="row"
            className={`mb-1.5 grid gap-1.5 sm:mb-2 sm:gap-2 ${current && isShaking ? 'animate-shake' : ''}`}
            style={{ gridTemplateColumns: `repeat(${wordLength}, minmax(0, 1fr))` }}
          >
            {Array.from({ length: wordLength }, (_, col) => {
              const ev = submitted ? evaluations[row]?.[col] : undefined;
              const char = ev?.char ?? word[col] ?? '';
              const state: CellState = ev ? ev.state : char ? 'tbd' : 'empty';
              const anim = winRow ? 'animate-win-bounce' : ev ? 'animate-flip' : char ? 'animate-pop' : '';
              const delay = winRow ? col * 90 : ev ? col * 110 : 0;
              return (
                <div
                  key={col}
                  role="gridcell"
                  aria-label={char ? `${char}${ev ? `, ${LABEL[ev.state]}` : ''}` : 'empty'}
                  data-state={state}
                  className={`tile ${text} ${anim}`}
                  style={delay ? { animationDelay: `${delay}ms` } : undefined}
                >
                  {char}
                  {ev && MARK[ev.state] && (
                    <span className="hc-mark absolute right-1 top-0.5 text-[0.6rem] leading-none" aria-hidden="true">
                      {MARK[ev.state]}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
