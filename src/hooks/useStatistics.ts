import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { GameHistoryItem, GameMode, GameStats, WordLength } from '../game/types';
import { STORAGE_KEYS } from '../utils/constants';
import { getLocalDateString } from '../game/dailyPuzzle';

const initialStats: GameStats = {
  gamesPlayed: 0,
  gamesWon: 0,
  gamesLost: 0,
  winPercentage: 0,
  currentStreak: 0,
  maxStreak: 0,
  guessDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
  totalGuessesInWins: 0,
  totalTimeSeconds: 0,
  averageGuesses: 0,
};

export interface DailyStreakData {
  currentStreak: number;
  maxStreak: number;
  lastPlayedDate: string; // YYYY-MM-DD
  gamesPlayed: number;
  gamesWon: number;
}

const initialDailyStreak: DailyStreakData = {
  currentStreak: 0,
  maxStreak: 0,
  lastPlayedDate: '',
  gamesPlayed: 0,
  gamesWon: 0,
};

export function useStatistics() {
  const [stats, setStats] = useLocalStorage<GameStats>(STORAGE_KEYS.STATS, initialStats);
  const [history, setHistory] = useLocalStorage<GameHistoryItem[]>(STORAGE_KEYS.HISTORY, []);
  const [dailyStreak, setDailyStreak] = useLocalStorage<DailyStreakData>(
    `${STORAGE_KEYS.STATS}_daily_streak`,
    initialDailyStreak
  );

  const recordGameResult = useCallback(
    (params: {
      mode: GameMode;
      wordLength: WordLength;
      targetWord: string;
      guesses: string[];
      won: boolean;
      attemptsUsed: number;
      maxAttempts: number;
      durationSeconds: number;
      hintsUsed?: number;
    }) => {
      const {
        mode,
        wordLength,
        targetWord,
        guesses,
        won,
        attemptsUsed,
        maxAttempts,
        durationSeconds,
        hintsUsed = 0,
      } = params;

      // Update General Stats
      setStats(prev => {
        const gamesPlayed = prev.gamesPlayed + 1;
        const gamesWon = prev.gamesWon + (won ? 1 : 0);
        const gamesLost = prev.gamesLost + (won ? 0 : 1);
        const winPercentage = Math.round((gamesWon / gamesPlayed) * 100);

        const currentStreak = won ? prev.currentStreak + 1 : 0;
        const maxStreak = Math.max(prev.maxStreak, currentStreak);

        const guessDistribution = { ...prev.guessDistribution };
        let totalGuessesInWins = prev.totalGuessesInWins;

        if (won) {
          guessDistribution[attemptsUsed] = (guessDistribution[attemptsUsed] || 0) + 1;
          totalGuessesInWins += attemptsUsed;
        }

        const averageGuesses =
          gamesWon > 0 ? parseFloat((totalGuessesInWins / gamesWon).toFixed(1)) : 0;

        return {
          gamesPlayed,
          gamesWon,
          gamesLost,
          winPercentage,
          currentStreak,
          maxStreak,
          guessDistribution,
          totalGuessesInWins,
          totalTimeSeconds: prev.totalTimeSeconds + durationSeconds,
          averageGuesses,
        };
      });

      // Update Daily Streak specifically if mode === 'daily'
      if (mode === 'daily') {
        const todayStr = getLocalDateString();
        setDailyStreak(prev => {
          const gamesPlayed = prev.gamesPlayed + 1;
          const gamesWon = prev.gamesWon + (won ? 1 : 0);

          let currentStreak = prev.currentStreak;
          if (won) {
            if (!prev.lastPlayedDate) {
              currentStreak = 1;
            } else {
              // Check if last played was yesterday
              const lastDate = new Date(prev.lastPlayedDate);
              const todayDate = new Date(todayStr);
              const diffMs = todayDate.getTime() - lastDate.getTime();
              const diffDays = Math.round(diffMs / (1000 * 3600 * 24));

              if (diffDays === 1) {
                currentStreak += 1;
              } else if (diffDays === 0) {
                // Same day, keep current
              } else {
                // Missed a day
                currentStreak = 1;
              }
            }
          } else {
            currentStreak = 0;
          }

          const maxStreak = Math.max(prev.maxStreak, currentStreak);

          return {
            currentStreak,
            maxStreak,
            lastPlayedDate: todayStr,
            gamesPlayed,
            gamesWon,
          };
        });
      }

      // Add to Game History (max 50)
      const newHistoryItem: GameHistoryItem = {
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        date: new Date().toISOString(),
        mode,
        wordLength,
        targetWord,
        guesses,
        won,
        attemptsUsed,
        maxAttempts,
        durationSeconds,
        hintsUsed,
      };

      setHistory(prev => [newHistoryItem, ...prev.slice(0, 49)]);
    },
    [setStats, setDailyStreak, setHistory]
  );

  const resetStats = useCallback(() => {
    setStats(initialStats);
    setDailyStreak(initialDailyStreak);
  }, [setStats, setDailyStreak]);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, [setHistory]);

  return {
    stats,
    dailyStreak,
    history,
    recordGameResult,
    resetStats,
    clearHistory,
  };
}
