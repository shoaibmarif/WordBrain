import { STORAGE_KEYS } from '../utils/constants';
import { EMPTY_DAILY_STATS, type DailyProgress, type DailyStats } from './daily';

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? { ...fallback, ...JSON.parse(raw) } : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage full or blocked: progress only lasts for this visit
  }
}

/** Today's guesses, or a fresh start if the saved game is from another day. */
export function readDailyProgress(puzzle: number): DailyProgress {
  const saved = read<DailyProgress | null>(STORAGE_KEYS.DAILY, null);
  return saved && saved.puzzle === puzzle && Array.isArray(saved.guesses) ? saved : { puzzle, guesses: [], status: 'playing' };
}

export const writeDailyProgress = (p: DailyProgress) => write(STORAGE_KEYS.DAILY, p);
export const readDailyStats = (): DailyStats => read<DailyStats>(STORAGE_KEYS.DAILY_STATS, EMPTY_DAILY_STATS);
export const writeDailyStats = (s: DailyStats) => write(STORAGE_KEYS.DAILY_STATS, s);
