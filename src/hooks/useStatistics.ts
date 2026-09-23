import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { GameHistoryItem, GameMode, GameStats, WordLength } from '../game/types';
import { STORAGE_KEYS } from '../utils/constants';

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

export function useStatistics() {
  const [stats, setStats] = useLocalStorage<GameStats>(STORAGE_KEYS.STATS, initialStats);
  const [history, setHistory] = useLocalStorage<GameHistoryItem[]>(STORAGE_KEYS.HISTORY, []);

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
    [setStats, setHistory]
  );

  const resetStats = useCallback(() => {
    setStats(initialStats);
  }, [setStats]);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, [setHistory]);

  const streak = {
    currentStreak: stats.currentStreak,
    maxStreak: stats.maxStreak,
  };

  return {
    stats,
    streak,
    history,
    recordGameResult,
    resetStats,
    clearHistory,
  };
}
