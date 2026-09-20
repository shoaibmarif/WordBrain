import React from 'react';
import { SeoHead } from '../components/common/SeoHead';
import { GameView } from '../components/GameView/GameView';
import { GameMode, WordLength, Difficulty } from '../game/types';
import { APP_NAME } from '../utils/constants';

interface PracticePageProps {
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

export const PracticePage: React.FC<PracticePageProps> = props => {
  return (
    <>
      <SeoHead
        title={`Unlimited Practice Mode with Vocabulary Hints | ${APP_NAME}`}
        description="Practice word guessing with unlimited puzzles and optional hints. Reveal letters or eliminate unused consonants at your own pace."
        canonicalPath="/practice"
      />
      <GameView mode="practice" {...props} />
    </>
  );
};
