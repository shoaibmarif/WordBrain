import { describe, it, expect } from 'vitest';
import { validateWordBasic, validateHardMode } from '../wordValidation';
import { GuessResult } from '../types';

describe('validateWordBasic', () => {
  const dummyAllowed = (w: string) => ['APPLE', 'PLANT', 'CRANE'].includes(w);

  it('rejects words of incorrect length', () => {
    const res = validateWordBasic('APP', 5, dummyAllowed);
    expect(res.isValid).toBe(false);
    expect(res.errorMessage).toBe('Word must be 5 letters');
  });

  it('rejects words with invalid characters', () => {
    const res = validateWordBasic('APP12', 5, dummyAllowed);
    expect(res.isValid).toBe(false);
    expect(res.errorMessage).toBe('Only letters A-Z allowed');
  });

  it('rejects words not in dictionary', () => {
    const res = validateWordBasic('ZZZZZ', 5, dummyAllowed);
    expect(res.isValid).toBe(false);
    expect(res.errorMessage).toBe('Not in word list');
  });

  it('accepts valid words', () => {
    const res = validateWordBasic('PLANT', 5, dummyAllowed);
    expect(res.isValid).toBe(true);
    expect(res.errorMessage).toBeUndefined();
  });
});

describe('validateHardMode', () => {
  it('enforces previous correct letters in identical positions', () => {
    const previous: GuessResult[] = [
      {
        guess: 'PLANT',
        letters: [
          { char: 'P', state: 'correct' },
          { char: 'L', state: 'absent' },
          { char: 'A', state: 'absent' },
          { char: 'N', state: 'absent' },
          { char: 'T', state: 'absent' },
        ],
      },
    ];

    // Attempting a word that doesn't start with P
    const failRes = validateHardMode('CRANE', previous);
    expect(failRes.isValid).toBe(false);
    expect(failRes.errorMessage).toBe('P must be in position 1');

    // Attempting a word that starts with P
    const passRes = validateHardMode('POUND', previous);
    expect(passRes.isValid).toBe(true);
  });

  it('enforces previous present letters in subsequent guesses', () => {
    const previous: GuessResult[] = [
      {
        guess: 'CRANE',
        letters: [
          { char: 'C', state: 'absent' },
          { char: 'R', state: 'present' },
          { char: 'A', state: 'absent' },
          { char: 'N', state: 'absent' },
          { char: 'E', state: 'absent' },
        ],
      },
    ];

    // Missing 'R'
    const failRes = validateHardMode('PILOT', previous);
    expect(failRes.isValid).toBe(false);
    expect(failRes.errorMessage).toBe('Guess must contain R');

    // Contains 'R'
    const passRes = validateHardMode('BRAIN', previous);
    expect(passRes.isValid).toBe(true);
  });
});
