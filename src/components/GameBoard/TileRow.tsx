import React from 'react';
import { CellState, LetterEvaluation, WordLength } from '../../game/types';
import { LetterTile } from './LetterTile';

interface TileRowProps {
  wordLength: WordLength;
  guess?: string;
  evaluations?: LetterEvaluation[];
  isCurrentRow?: boolean;
  isShaking?: boolean;
  isWinningRow?: boolean;
  highContrast?: boolean;
}

export const TileRow: React.FC<TileRowProps> = ({
  wordLength,
  guess = '',
  evaluations,
  isCurrentRow = false,
  isShaking = false,
  isWinningRow = false,
  highContrast = false,
}) => {
  const cells = Array.from({ length: wordLength });

  return (
    <div
      role="row"
      className={`flex justify-center gap-1.5 sm:gap-2 my-1 w-full max-w-sm sm:max-w-md mx-auto ${
        isCurrentRow && isShaking ? 'animate-shake' : ''
      }`}
    >
      {cells.map((_, idx) => {
        let char = '';
        let state: CellState = 'empty';

        if (evaluations && evaluations[idx]) {
          char = evaluations[idx].char;
          state = evaluations[idx].state;
        } else if (guess[idx]) {
          char = guess[idx];
          state = isCurrentRow ? 'tbd' : 'empty';
        }

        const staggerDelay = evaluations ? idx * 120 : isWinningRow ? idx * 100 : 0;

        return (
          <LetterTile
            key={idx}
            char={char}
            state={state}
            animationDelayMs={staggerDelay}
            isWinningRow={isWinningRow}
            highContrast={highContrast}
          />
        );
      })}
    </div>
  );
};
