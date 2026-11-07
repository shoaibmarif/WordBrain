import { LetterEvaluation, LetterState } from './types';

/**
 * Evaluates a guessed word against a target word in two passes: exact matches first, then letters in the wrong spot.
 * Handles duplicate letters with strict accuracy.
 *
 * Pass 1: Mark all exact character matches (correct).
 * Pass 2: For remaining characters, mark as present if character remains in target pool,
 *         otherwise mark as absent.
 */
export function evaluateGuess(guess: string, target: string): LetterEvaluation[] {
  const upperGuess = guess.toUpperCase().trim();
  const upperTarget = target.toUpperCase().trim();
  const len = upperTarget.length;

  if (upperGuess.length !== len) {
    throw new Error(`Guess length (${upperGuess.length}) does not match target length (${len})`);
  }

  const result: LetterEvaluation[] = Array.from({ length: len }, (_, i) => ({
    char: upperGuess[i],
    state: 'absent' as LetterState,
  }));

  // Frequency map for target characters not accounted for in Pass 1
  const remainingTargetCounts: Record<string, number> = {};

  // Pass 1: Identify all exact matches ('correct')
  for (let i = 0; i < len; i++) {
    const targetChar = upperTarget[i];
    const guessChar = upperGuess[i];

    if (guessChar === targetChar) {
      result[i].state = 'correct';
    } else {
      remainingTargetCounts[targetChar] = (remainingTargetCounts[targetChar] || 0) + 1;
    }
  }

  // Pass 2: Identify misplaced letters ('present') and unmatched letters ('absent')
  for (let i = 0; i < len; i++) {
    if (result[i].state === 'correct') {
      continue;
    }

    const guessChar = upperGuess[i];
    const count = remainingTargetCounts[guessChar] || 0;

    if (count > 0) {
      result[i].state = 'present';
      remainingTargetCounts[guessChar] = count - 1;
    } else {
      result[i].state = 'absent';
    }
  }

  return result;
}

/**
 * Resolves keyboard key states where priority is:
 * 'correct' > 'present' > 'absent' > 'unused'
 */
export function getUpdatedKeyboardStates(
  currentStates: Record<string, LetterState>,
  evaluations: LetterEvaluation[]
): Record<string, LetterState> {
  const updated = { ...currentStates };

  for (const { char, state } of evaluations) {
    const existing = updated[char];

    if (!existing || existing === 'unused') {
      updated[char] = state;
    } else if (existing === 'absent' && (state === 'present' || state === 'correct')) {
      updated[char] = state;
    } else if (existing === 'present' && state === 'correct') {
      updated[char] = 'correct';
    }
    // If already 'correct', never downgrade
  }

  return updated;
}
