import React from 'react';
import { GameStatus, LetterEvaluation, WordLength } from '../../game/types';
import { TileRow } from './TileRow';
import { Play } from 'lucide-react';

interface GameBoardProps {
  wordLength: WordLength;
  maxAttempts: number;
  guesses: string[];
  evaluations: LetterEvaluation[][];
  currentGuess: string;
  isShaking: boolean;
  gameStatus: GameStatus;
  highContrast?: boolean;
  onResume?: () => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  wordLength,
  maxAttempts,
  guesses,
  evaluations,
  currentGuess,
  isShaking,
  gameStatus,
  highContrast = false,
  onResume,
}) => {
  const rows = Array.from({ length: maxAttempts });
  const isWon = gameStatus === 'won';
  const isPaused = gameStatus === 'paused';

  return (
    <div className="relative w-full max-w-sm sm:max-w-md mx-auto px-2 py-2 flex flex-col justify-center items-center select-none">
      {/* Pause Overlay */}
      {isPaused && (
        <div className="absolute inset-0 z-20 backdrop-blur-md bg-slate-900/60 rounded-xl flex flex-col items-center justify-center p-6 text-center text-white">
          <p className="text-xl font-bold tracking-wide mb-4">GAME PAUSED</p>
          <button
            onClick={onResume}
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 font-semibold rounded-lg shadow-lg transition-colors cursor-pointer"
          >
            <Play className="w-5 h-5 fill-current" />
            Resume Game
          </button>
        </div>
      )}

      <div className={`w-full ${isPaused ? 'filter blur-sm pointer-events-none' : ''}`} role="grid">
        {rows.map((_, rowIndex) => {
          const isSubmitted = rowIndex < guesses.length;
          const isCurrent = rowIndex === guesses.length;
          const isWinningRow = isWon && rowIndex === guesses.length - 1;

          return (
            <TileRow
              key={rowIndex}
              wordLength={wordLength}
              guess={isSubmitted ? guesses[rowIndex] : isCurrent ? currentGuess : ''}
              evaluations={isSubmitted ? evaluations[rowIndex] : undefined}
              isCurrentRow={isCurrent}
              isShaking={isCurrent && isShaking}
              isWinningRow={isWinningRow}
              highContrast={highContrast}
            />
          );
        })}
      </div>
    </div>
  );
};
