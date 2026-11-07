import { Difficulty, LetterEvaluation, LetterState, WordLength } from './types';

/**
 * Filter words according to difficulty level.
 * Easy: most common, high-vowel words.
 * Medium: standard vocabulary.
 * Hard: words with unusual letters or repeated letters.
 */
export function filterWordsByDifficulty(words: string[], difficulty: Difficulty): string[] {
  if (difficulty === 'easy') {
    // Easy: Words with at least 2 distinct vowels and no unusual letters (Q, X, Z)
    const easy = words.filter(w => {
      const vowels = new Set(w.match(/[AEIOU]/g) || []);
      const hasUnusual = /[QXZ]/.test(w);
      return vowels.size >= 2 && !hasUnusual;
    });
    return easy.length > 20 ? easy : words;
  }

  if (difficulty === 'hard') {
    // Hard: Words with repeated letters or rare consonants (Q, X, Z, J, K, V)
    const hard = words.filter(w => {
      const uniqueCount = new Set(w.split('')).size;
      const hasRare = /[QXZJKV]/.test(w);
      return uniqueCount < w.length || hasRare;
    });
    return hard.length > 20 ? hard : words;
  }

  // Medium: all curated solutions
  return words;
}

/**
 * Selects a random word from candidate list.
 */
export function getRandomWord(words: string[]): string {
  if (!words || words.length === 0) {
    throw new Error('Word pool cannot be empty');
  }
  const index = Math.floor(Math.random() * words.length);
  return words[index].toUpperCase();
}

/**
 * Hint 1: Reveal Letter
 * Reveals a character from the target word that hasn't been guessed as correct yet.
 */
export function getRevealLetterHint(
  target: string,
  currentEvaluations: LetterEvaluation[][],
  alreadyRevealed: Iterable<number> = []
): { char: string; position: number } | null {
  const upper = target.toUpperCase();
  // Skip positions the player has already found or been given as a hint.
  const knownPositions = new Set<number>(alreadyRevealed);

  for (const row of currentEvaluations) {
    row.forEach((le, idx) => {
      if (le.state === 'correct') {
        knownPositions.add(idx);
      }
    });
  }

  const unrevealedIndices: number[] = [];
  for (let i = 0; i < upper.length; i++) {
    if (!knownPositions.has(i)) {
      unrevealedIndices.push(i);
    }
  }

  if (unrevealedIndices.length === 0) return null;

  const chosenIdx = unrevealedIndices[Math.floor(Math.random() * unrevealedIndices.length)];
  return {
    char: upper[chosenIdx],
    position: chosenIdx + 1, // 1-based for display
  };
}

/**
 * Hint 2: Eliminate Letters
 * Identifies up to N letters from the alphabet that do NOT exist in the target word
 * and haven't already been identified as absent.
 */
export function getEliminateLettersHint(
  target: string,
  knownKeyboardStates: Record<string, LetterState>,
  count: number = 3
): string[] {
  const upperTarget = target.toUpperCase();
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const candidates = alphabet.filter(char => {
    // Not in target
    if (upperTarget.includes(char)) return false;
    // Not already marked as absent or used
    if (knownKeyboardStates[char] === 'absent') return false;
    return true;
  });

  // Shuffle and pick `count`
  const shuffled = [...candidates].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
