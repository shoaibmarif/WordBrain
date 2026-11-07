import { describe, it, expect } from 'vitest';
import { applyResult, initialStats, type GameResult } from '../hooks/useStatistics';
import { buildShareText, generateEmojiGrid } from '../game/share';
import { evaluateGuess } from '../game/wordEvaluation';
import { getRevealLetterHint } from '../game/difficulty';
import { isAllowedWord, getSolutionsForLength } from '../data';

const result = (over: Partial<GameResult> = {}): GameResult => ({
  mode: 'random',
  wordLength: 5,
  targetWord: 'CRANE',
  guesses: ['STARE', 'CRANE'],
  won: true,
  attemptsUsed: 2,
  maxAttempts: 6,
  durationSeconds: 40,
  hintsUsed: 0,
  ...over,
});

describe('stats', () => {
  it('counts wins, streaks and the guess distribution', () => {
    let s = applyResult(initialStats, result());
    s = applyResult(s, result({ attemptsUsed: 4 }));
    expect(s).toMatchObject({ gamesPlayed: 2, gamesWon: 2, currentStreak: 2, winPercentage: 100, averageGuesses: 3 });
    expect(s.guessDistribution[2]).toBe(1);
    s = applyResult(s, result({ won: false, attemptsUsed: 6 }));
    expect(s).toMatchObject({ gamesPlayed: 3, gamesLost: 1, currentStreak: 0, maxStreak: 2, winPercentage: 67 });
  });

  it('leaves practice games out of the stats', () => {
    expect(applyResult(initialStats, result({ mode: 'practice' }))).toBe(initialStats);
  });
});

describe('sharing', () => {
  it('shares squares only, never the word', () => {
    const history = [evaluateGuess('STARE', 'CRANE'), evaluateGuess('CRANE', 'CRANE')];
    const text = buildShareText({ mode: 'daily', puzzle: 12, wordLength: 5, maxAttempts: 6, attemptsUsed: 2, won: true, history });
    expect(text).toContain('WordBrain #12 2/6');
    expect(text).toContain('https://wordbrain.vercel.app/daily');
    expect(text).not.toContain('CRANE');
    expect(generateEmojiGrid(history).split('\n')[1]).toBe('🟩🟩🟩🟩🟩');
  });
});

describe('hints', () => {
  it('never reveals the same position twice', () => {
    const revealed = new Set<number>();
    for (let i = 0; i < 5; i++) {
      const h = getRevealLetterHint('PLANT', [], revealed)!;
      expect(revealed.has(h.position - 1)).toBe(false);
      revealed.add(h.position - 1);
    }
    expect(getRevealLetterHint('PLANT', [], revealed)).toBeNull();
  });
});

describe('word lists', () => {
  it('accepts every possible answer as a guess', () => {
    for (const n of [5, 6, 7, 8] as const) {
      for (const w of getSolutionsForLength(n)) expect(isAllowedWord(w, n), w).toBe(true);
    }
  });
});
