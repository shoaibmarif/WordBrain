import React from 'react';
import { SeoHead } from '../components/common/SeoHead';
import { GameView } from '../components/GameView/GameView';
import { GameMode, WordLength, Difficulty } from '../game/types';
import { APP_NAME } from '../utils/constants';

interface TimedPageProps {
  hardMode: boolean;
  soundEnabled: boolean;
  animationsEnabled: boolean;
  highContrast: boolean;
  wordLength: WordLength;
  difficulty: Difficulty;
  onWordLengthChange: (len: WordLength) => void;
  onDifficultyChange: (diff: Difficulty) => void;
  onOpenStats: () => void;
  onOpenSettings: () => void;
  onOpenHelp: () => void;
  streak: { currentStreak: number; maxStreak: number };
  onGameEnd: (params: {
    mode: GameMode;
    wordLength: WordLength;
    targetWord: string;
    guesses: string[];
    won: boolean;
    attemptsUsed: number;
    maxAttempts: number;
    durationSeconds: number;
    hintsUsed: number;
  }) => void;
}

export const TimedPage: React.FC<TimedPageProps> = props => {
  return (
    <>
      <SeoHead
        title={`Timed Speed Run Mode - Beat the Clock | ${APP_NAME}`}
        description="Fast-paced word guessing mode against a countdown timer. Guess the secret word before time runs out!"
        canonicalPath="/timed"
      />
      <GameView mode="timed" {...props} />
    </>
  );
};
