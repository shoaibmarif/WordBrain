import { describe, it, expect } from 'vitest';
import { evaluateGuess, getUpdatedKeyboardStates } from '../wordEvaluation';

describe('evaluateGuess', () => {
  it('correctly identifies all matching letters in exact positions', () => {
    const result = evaluateGuess('PLANT', 'PLANT');
    expect(result.every(r => r.state === 'correct')).toBe(true);
    expect(result.map(r => r.char)).toEqual(['P', 'L', 'A', 'N', 'T']);
  });

  it('correctly identifies all absent letters', () => {
    const result = evaluateGuess('BRICK', 'PLANT');
    expect(result.every(r => r.state === 'absent')).toBe(true);
  });

  it('correctly identifies present letters in wrong positions', () => {
    const result = evaluateGuess('TABLE', 'PLANT');
    // T: present, A: present, B: absent, L: present, E: absent
    expect(result[0]).toEqual({ char: 'T', state: 'present' });
    expect(result[1]).toEqual({ char: 'A', state: 'present' });
    expect(result[2]).toEqual({ char: 'B', state: 'absent' });
    expect(result[3]).toEqual({ char: 'L', state: 'present' });
    expect(result[4]).toEqual({ char: 'E', state: 'absent' });
  });

  it('correctly handles duplicate letter case 1: APPLE vs ALLEY', () => {
    // Target: APPLE (A:1, P:2, L:1, E:1)
    // Guess:  ALLEY (A:0, L:1, L:2, E:3, Y:4)
    // A -> correct
    // L at pos 1 -> present (consumed target L)
    // L at pos 2 -> absent (no more Ls in target)
    // E -> present
    // Y -> absent
    const result = evaluateGuess('ALLEY', 'APPLE');
    expect(result[0]).toEqual({ char: 'A', state: 'correct' });
    expect(result[1]).toEqual({ char: 'L', state: 'present' });
    expect(result[2]).toEqual({ char: 'L', state: 'absent' });
    expect(result[3]).toEqual({ char: 'E', state: 'present' });
    expect(result[4]).toEqual({ char: 'Y', state: 'absent' });
  });

  it('correctly handles duplicate letter case 2: SPEED vs ERASE', () => {
    // Target: SPEED (S:1, P:1, E:2, D:1)
    // Guess:  ERASE (E:0, R:1, A:2, S:3, E:4)
    // Pass 1: no exact match
    // Pass 2: E at 0 -> present (1 E left)
    //         R at 1 -> absent
    //         A at 2 -> absent
    //         S at 3 -> present (0 S left)
    //         E at 4 -> present (0 E left)
    const result = evaluateGuess('ERASE', 'SPEED');
    expect(result[0]).toEqual({ char: 'E', state: 'present' });
    expect(result[1]).toEqual({ char: 'R', state: 'absent' });
    expect(result[2]).toEqual({ char: 'A', state: 'absent' });
    expect(result[3]).toEqual({ char: 'S', state: 'present' });
    expect(result[4]).toEqual({ char: 'E', state: 'present' });
  });

  it('correctly handles duplicate letter case 3: GEESE vs SPEED', () => {
    // Target: SPEED (S:1, P:1, E:2, D:1)
    // Guess:  GEESE (G:0, E:1, E:2, S:3, E:4)
    // Pass 1: E at 2 is exact match -> correct! (1 E remaining in target)
    // Pass 2:
    // G at 0 -> absent
    // E at 1 -> present (uses remaining E)
    // S at 3 -> present
    // E at 4 -> absent (no Es remaining!)
    const result = evaluateGuess('GEESE', 'SPEED');
    expect(result[0]).toEqual({ char: 'G', state: 'absent' });
    expect(result[1]).toEqual({ char: 'E', state: 'present' });
    expect(result[2]).toEqual({ char: 'E', state: 'correct' });
    expect(result[3]).toEqual({ char: 'S', state: 'present' });
    expect(result[4]).toEqual({ char: 'E', state: 'absent' });
  });

  it('throws error if lengths differ', () => {
    expect(() => evaluateGuess('FOUR', 'PLANT')).toThrow();
  });
});

describe('getUpdatedKeyboardStates', () => {
  it('updates unused keys with new states', () => {
    const states = {};
    const evals = [
      { char: 'A', state: 'correct' as const },
      { char: 'B', state: 'present' as const },
      { char: 'C', state: 'absent' as const },
    ];
    const updated = getUpdatedKeyboardStates(states, evals);
    expect(updated['A']).toBe('correct');
    expect(updated['B']).toBe('present');
    expect(updated['C']).toBe('absent');
  });

  it('promotes absent to present or correct', () => {
    const states = { A: 'absent' as const };
    const updated = getUpdatedKeyboardStates(states, [{ char: 'A', state: 'present' as const }]);
    expect(updated['A']).toBe('present');
  });

  it('promotes present to correct, but never downgrades correct to present or absent', () => {
    const states = { A: 'present' as const, B: 'correct' as const };
    const updated = getUpdatedKeyboardStates(states, [
      { char: 'A', state: 'correct' as const },
      { char: 'B', state: 'present' as const },
    ]);
    expect(updated['A']).toBe('correct');
    expect(updated['B']).toBe('correct'); // stays correct
  });
});
