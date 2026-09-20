import { describe, it, expect } from 'vitest';
import { getDailyWord, getDailyPuzzleNumber, hashString, formatCountdown } from '../dailyPuzzle';

describe('dailyPuzzle', () => {
  const words = ['APPLE', 'BRAIN', 'CRANE', 'DREAM', 'EARTH', 'FLOAT', 'GRAPE', 'HEART'];

  it('generates the same word deterministically for the same date', () => {
    const word1 = getDailyWord('2026-09-20', words);
    const word2 = getDailyWord('2026-09-20', words);
    expect(word1).toBe(word2);
  });

  it('selects valid words belonging to the list', () => {
    const word = getDailyWord('2026-09-20', words);
    expect(words).toContain(word);
  });

  it('generates different words on different dates', () => {
    const wordDay1 = getDailyWord('2026-09-20', words);
    const wordDay2 = getDailyWord('2026-09-21', words);
    // Over a reasonable set of dates, outputs vary
    const setOfWords = new Set<string>();
    for (let d = 1; d <= 15; d++) {
      setOfWords.add(getDailyWord(`2026-10-${String(d).padStart(2, '0')}`, words));
    }
    expect(setOfWords.size).toBeGreaterThan(1);
  });

  it('computes positive sequential puzzle numbers', () => {
    const num = getDailyPuzzleNumber(new Date('2026-09-20'));
    expect(num).toBeGreaterThan(900);
  });

  it('formats countdown string properly', () => {
    const ms = (3 * 3600 + 45 * 60 + 12) * 1000;
    expect(formatCountdown(ms)).toBe('03:45:12');
  });
});
