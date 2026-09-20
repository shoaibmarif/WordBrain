import { WordLength } from '../game/types';
import { WORDS_5_SOLUTIONS, WORDS_5_ALLOWED } from './words5';
import { WORDS_6_SOLUTIONS, WORDS_6_ALLOWED } from './words6';
import { WORDS_7_SOLUTIONS, WORDS_7_ALLOWED } from './words7';
import { WORDS_8_SOLUTIONS, WORDS_8_ALLOWED } from './words8';

// Memoized Set lookups for fast O(1) word validation
const allowedSets: Record<WordLength, Set<string>> = {
  5: new Set(WORDS_5_ALLOWED.map(w => w.toUpperCase())),
  6: new Set(WORDS_6_ALLOWED.map(w => w.toUpperCase())),
  7: new Set(WORDS_7_ALLOWED.map(w => w.toUpperCase())),
  8: new Set(WORDS_8_ALLOWED.map(w => w.toUpperCase())),
};

const solutionLists: Record<WordLength, string[]> = {
  5: WORDS_5_SOLUTIONS,
  6: WORDS_6_SOLUTIONS,
  7: WORDS_7_SOLUTIONS,
  8: WORDS_8_SOLUTIONS,
};

export function getSolutionsForLength(length: WordLength): string[] {
  return solutionLists[length] || WORDS_5_SOLUTIONS;
}

export function isAllowedWord(word: string, length: WordLength): boolean {
  const upper = word.toUpperCase().trim();
  const set = allowedSets[length];
  if (!set) return false;
  return set.has(upper);
}
