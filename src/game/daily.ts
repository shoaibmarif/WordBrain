import { getSolutionsForLength } from '../data';

/** Day 1 of the daily puzzle. Puzzle numbers count up from here. */
const LAUNCH = Date.UTC(2026, 10, 7);
const DAY_MS = 86_400_000;

/** Puzzle number for a date, using the player's local calendar day. */
export function dailyNumber(date: Date = new Date()): number {
  const local = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.floor((local - LAUNCH) / DAY_MS) + 1;
}

/** Small, fast seeded PRNG so every browser shuffles the list the same way. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

let order: string[] | null = null;
function dailyOrder(): string[] {
  if (order) return order;
  const words = [...getSolutionsForLength(5)].map((w) => w.toUpperCase());
  const rand = mulberry32(20261107);
  for (let i = words.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [words[i], words[j]] = [words[j], words[i]];
  }
  order = words;
  return order;
}

/** The word for a puzzle number. Same answer for everyone on the same day. */
export function dailyWord(puzzle: number): string {
  const list = dailyOrder();
  const i = (((puzzle - 1) % list.length) + list.length) % list.length;
  return list[i];
}

/** Milliseconds until the next puzzle (local midnight). */
export function msUntilNextPuzzle(now: Date = new Date()): number {
  const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  return next.getTime() - now.getTime();
}

export function formatCountdown(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return [h, m, s].map((n) => String(n).padStart(2, '0')).join(':');
}

export interface DailyProgress {
  puzzle: number;
  guesses: string[];
  status: 'playing' | 'won' | 'lost';
}

export interface DailyStats {
  played: number;
  won: number;
  currentStreak: number;
  maxStreak: number;
  /** Puzzle number of the last win, used to tell if the streak is still alive. */
  lastWon: number | null;
}

export const EMPTY_DAILY_STATS: DailyStats = { played: 0, won: 0, currentStreak: 0, maxStreak: 0, lastWon: null };

/** Records a finished daily puzzle. Wins on consecutive days build the streak. */
export function recordDaily(stats: DailyStats, puzzle: number, won: boolean): DailyStats {
  const played = stats.played + 1;
  if (!won) return { ...stats, played, currentStreak: 0 };
  const currentStreak = stats.lastWon === puzzle - 1 ? stats.currentStreak + 1 : 1;
  return {
    played,
    won: stats.won + 1,
    currentStreak,
    maxStreak: Math.max(stats.maxStreak, currentStreak),
    lastWon: puzzle,
  };
}

/** The streak as it stands today: a missed day breaks it even if nothing was recorded. */
export function liveStreak(stats: DailyStats, today: number): number {
  if (stats.lastWon === null) return 0;
  return stats.lastWon >= today - 1 ? stats.currentStreak : 0;
}
