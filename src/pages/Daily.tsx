import React from 'react';
import { SeoHead } from '../components/common/SeoHead';
import { GameView } from '../components/GameView/GameView';
import { GameMode, WordLength, Difficulty } from '../game/types';
import { APP_NAME } from '../utils/constants';

interface DailyPageProps {
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
  dailyStreak: { currentStreak: number; maxStreak: number };
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

export const DailyPage: React.FC<DailyPageProps> = props => {
  return (
    <>
      <SeoHead
        title={`Daily Word Challenge - Today's Secret Word | ${APP_NAME}`}
        description="Play today's official Daily Word Challenge puzzle. Guess the mystery 5-letter word in six attempts and build your winning streak."
        canonicalPath="/daily"
      />
      <GameView mode="daily" {...props} />
    </>
  );
};
