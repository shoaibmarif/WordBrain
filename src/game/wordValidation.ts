import { GuessResult } from './types';

export interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

/**
 * Validates basic word criteria: length, alphabet characters, dictionary inclusion.
 */
export function validateWordBasic(
  word: string,
  expectedLength: number,
  isAllowedWordFn: (w: string) => boolean
): ValidationResult {
  const upper = word.toUpperCase().trim();

  if (upper.length !== expectedLength) {
    return {
      isValid: false,
      errorMessage: `Word must be ${expectedLength} letters`,
    };
  }

  if (!/^[A-Z]+$/.test(upper)) {
    return {
      isValid: false,
      errorMessage: 'Only letters A-Z allowed',
    };
  }

  if (!isAllowedWordFn(upper)) {
    return {
      isValid: false,
      errorMessage: 'Not in word list',
    };
  }

  return { isValid: true };
}

/**
 * Validates Hard Mode constraints:
 * - Letters confirmed 'correct' in previous guesses must be used in the same position.
 * - Letters confirmed 'present' in previous guesses must appear in the new guess.
 */
export function validateHardMode(
  currentGuess: string,
  previousResults: GuessResult[]
): ValidationResult {
  const upperGuess = currentGuess.toUpperCase().trim();

  // Aggregate required correct letters by position and required present letters
  const requiredPositions: Record<number, string> = {};
  const requiredLetters: Set<string> = new Set();

  for (const prev of previousResults) {
    prev.letters.forEach((letterEval, idx) => {
      if (letterEval.state === 'correct') {
        requiredPositions[idx] = letterEval.char;
      } else if (letterEval.state === 'present') {
        requiredLetters.add(letterEval.char);
      }
    });
  }

  // Check correct positions
  for (const [posStr, char] of Object.entries(requiredPositions)) {
    const pos = Number(posStr);
    if (upperGuess[pos] !== char) {
      return {
        isValid: false,
        errorMessage: `${char} must be in position ${pos + 1}`,
      };
    }
  }

  // Check present letters are included somewhere in the guess
  for (const char of requiredLetters) {
    if (!upperGuess.includes(char)) {
      return {
        isValid: false,
        errorMessage: `Guess must contain ${char}`,
      };
    }
  }

  return { isValid: true };
}
