/**
 * Deterministic PRNG and date-based puzzle selector for Daily Challenge mode.
 * Guarantees that every user on the same calendar day gets the identical word.
 */

// Anchor date for Daily Challenge #1: January 1, 2024
const ANCHOR_DATE = new Date('2024-01-01T00:00:00Z');

/**
 * Returns the current date formatted as YYYY-MM-DD in local time.
 */
export function getLocalDateString(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Computes sequential puzzle number based on days elapsed since anchor date.
 */
export function getDailyPuzzleNumber(date: Date = new Date()): number {
  const current = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const anchor = new Date(ANCHOR_DATE.getUTCFullYear(), ANCHOR_DATE.getUTCMonth(), ANCHOR_DATE.getUTCDate());
  const diffTime = current.getTime() - anchor.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(1, diffDays + 1);
}

/**
 * Fast 32-bit hash (cyrb53-inspired) of a string to generate a deterministic integer seed.
 */
export function hashString(str: string): number {
  let h1 = 0xdeadbeef ^ 0;
  let h2 = 0x41c6ce57 ^ 0;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}

/**
 * Selects a deterministic word from a list of solution words for a given date.
 */
export function getDailyWord(dateString: string, wordList: string[]): string {
  if (!wordList || wordList.length === 0) {
    throw new Error('Word list cannot be empty');
  }
  const seed = hashString(`daily-puzzle-${dateString}`);
  const index = Math.abs(seed) % wordList.length;
  return wordList[index].toUpperCase();
}

/**
 * Returns milliseconds remaining until the next local midnight.
 */
export function getTimeUntilNextMidnight(now: Date = new Date()): number {
  const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
  return Math.max(0, tomorrow.getTime() - now.getTime());
}

/**
 * Formats milliseconds as HH:MM:SS for the countdown timer.
 */
export function formatCountdown(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const hh = String(hours).padStart(2, '0');
  const mm = String(minutes).padStart(2, '0');
  const ss = String(seconds).padStart(2, '0');

  return `${hh}:${mm}:${ss}`;
}
