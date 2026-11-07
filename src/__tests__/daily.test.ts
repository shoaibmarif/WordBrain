import { describe, it, expect } from 'vitest';
import { dailyNumber, dailyWord, EMPTY_DAILY_STATS, formatCountdown, liveStreak, msUntilNextPuzzle, recordDaily } from '../game/daily';
import { getSolutionsForLength } from '../data';

describe('daily puzzle', () => {
  it('starts at #1 on launch day and counts up by local day', () => {
    expect(dailyNumber(new Date(2026, 10, 7, 0, 1))).toBe(1);
    expect(dailyNumber(new Date(2026, 10, 7, 23, 59))).toBe(1);
    expect(dailyNumber(new Date(2026, 10, 8, 0, 0))).toBe(2);
    expect(dailyNumber(new Date(2027, 10, 7, 12))).toBe(366);
  });

  it('gives the same five letter answer every time for a puzzle', () => {
    const solutions = new Set(getSolutionsForLength(5).map((w) => w.toUpperCase()));
    for (let n = 1; n <= 50; n++) {
      expect(dailyWord(n)).toBe(dailyWord(n));
      expect(solutions.has(dailyWord(n))).toBe(true);
    }
  });

  it('does not repeat a word until the list runs out', () => {
    const size = getSolutionsForLength(5).length;
    const seen = new Set(Array.from({ length: size }, (_, i) => dailyWord(i + 1)));
    expect(seen.size).toBe(size);
  });

  it('is not simply alphabetical', () => {
    expect([dailyWord(1), dailyWord(2), dailyWord(3)]).not.toEqual([...[dailyWord(1), dailyWord(2), dailyWord(3)]].sort());
  });

  it('counts down to local midnight', () => {
    expect(msUntilNextPuzzle(new Date(2026, 10, 7, 23, 0, 0))).toBe(3_600_000);
    expect(formatCountdown(3_600_000 + 61_000)).toBe('01:01:01');
  });
});

describe('daily streaks', () => {
  it('grows on consecutive wins and resets on a loss', () => {
    let s = recordDaily(EMPTY_DAILY_STATS, 10, true);
    s = recordDaily(s, 11, true);
    expect(s.currentStreak).toBe(2);
    s = recordDaily(s, 12, false);
    expect(s).toMatchObject({ played: 3, won: 2, currentStreak: 0, maxStreak: 2 });
  });

  it('starts again after a skipped day', () => {
    let s = recordDaily(EMPTY_DAILY_STATS, 10, true);
    s = recordDaily(s, 12, true);
    expect(s.currentStreak).toBe(1);
  });

  it('shows a broken streak as zero before the next game is played', () => {
    const s = recordDaily(recordDaily(EMPTY_DAILY_STATS, 10, true), 11, true);
    expect(liveStreak(s, 11)).toBe(2);
    expect(liveStreak(s, 12)).toBe(2);
    expect(liveStreak(s, 13)).toBe(0);
  });
});
