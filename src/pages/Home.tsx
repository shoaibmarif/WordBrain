import React from 'react';
import { SeoHead } from '../components/common/SeoHead';
import { GameView } from '../components/GameView/GameView';
import { GameMode, WordLength, Difficulty } from '../game/types';
import { APP_FULL_TITLE, APP_DESCRIPTION } from '../utils/constants';

interface HomePageProps {
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

export const HomePage: React.FC<HomePageProps> = props => {
  return (
    <>
      <SeoHead
        title={APP_FULL_TITLE}
        description={APP_DESCRIPTION}
        canonicalPath="/"
        schemaType="WebApplication"
      />
      <GameView mode="random" {...props} />
    </>
  );
};
