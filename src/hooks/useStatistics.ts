import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { GameHistoryItem, GameMode, GameStats, WordLength } from '../game/types';
import { STORAGE_KEYS } from '../utils/constants';

export interface GameResult {
  mode: GameMode;
  wordLength: WordLength;
  targetWord: string;
  guesses: string[];
  won: boolean;
  attemptsUsed: number;
  maxAttempts: number;
  durationSeconds: number;
  hintsUsed: number;
}

export const initialStats: GameStats = {
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

/**
 * Adds a finished game to the running totals. Practice games are relaxed
 * on purpose (hints, no pressure), so they go in the history but don't touch
 * the stats or the win streak.
 */
export function applyResult(prev: GameStats, r: GameResult): GameStats {
  if (r.mode === 'practice') return prev;
  const gamesPlayed = prev.gamesPlayed + 1;
  const gamesWon = prev.gamesWon + (r.won ? 1 : 0);
  const currentStreak = r.won ? prev.currentStreak + 1 : 0;
  const guessDistribution = { ...prev.guessDistribution };
  let totalGuessesInWins = prev.totalGuessesInWins;
  if (r.won) {
    guessDistribution[r.attemptsUsed] = (guessDistribution[r.attemptsUsed] || 0) + 1;
    totalGuessesInWins += r.attemptsUsed;
  }
  return {
    gamesPlayed,
    gamesWon,
    gamesLost: gamesPlayed - gamesWon,
    winPercentage: Math.round((gamesWon / gamesPlayed) * 100),
    currentStreak,
    maxStreak: Math.max(prev.maxStreak, currentStreak),
    guessDistribution,
    totalGuessesInWins,
    totalTimeSeconds: prev.totalTimeSeconds + r.durationSeconds,
    averageGuesses: gamesWon > 0 ? Math.round((totalGuessesInWins / gamesWon) * 10) / 10 : 0,
  };
}

export function useStatistics() {
  const [stats, setStats] = useLocalStorage<GameStats>(STORAGE_KEYS.STATS, initialStats);
  const [history, setHistory] = useLocalStorage<GameHistoryItem[]>(STORAGE_KEYS.HISTORY, []);

  const recordGameResult = useCallback(
    (r: GameResult) => {
      setStats((prev) => applyResult(prev, r));
      const item: GameHistoryItem = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        date: new Date().toISOString(),
        ...r,
      };
      setHistory((prev) => [item, ...prev.slice(0, 49)]);
    },
    [setStats, setHistory]
  );

  const resetStats = useCallback(() => setStats(initialStats), [setStats]);
  const clearHistory = useCallback(() => setHistory([]), [setHistory]);

  return { stats, history, recordGameResult, resetStats, clearHistory };
}
