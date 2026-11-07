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

/**
 * Full English dictionaries (public/words/{n}.txt, built from the MIT-licensed
 * `word-list` package) are fetched in the background so players can guess any
 * real word, not just the curated lists. Until a dictionary arrives, the
 * curated lists are used, so the game always works offline or if the fetch fails.
 */
const dictionaries: Partial<Record<WordLength, Set<string>>> = {};
const pending: Partial<Record<WordLength, Promise<void>>> = {};

export function loadDictionary(length: WordLength): Promise<void> {
  if (dictionaries[length]) return Promise.resolve();
  if (pending[length]) return pending[length]!;
  if (typeof fetch === 'undefined') return Promise.resolve();
  pending[length] = Promise.resolve()
    .then(() => fetch(`/words/${length}.txt`))
    .then((res) => (res.ok ? res.text() : Promise.reject(new Error(String(res.status)))))
    .then((text) => {
      dictionaries[length] = new Set(text.split('\n').filter(Boolean));
    })
    .catch(() => {
      // Keep using the curated list; try again next time a game starts.
      delete pending[length];
    });
  return pending[length]!;
}

export function isAllowedWord(word: string, length: WordLength): boolean {
  const upper = word.toUpperCase().trim();
  return Boolean(allowedSets[length]?.has(upper) || dictionaries[length]?.has(upper));
}
