import { WordLength } from '../game/types';
import { WORDS_5_SOLUTIONS, WORDS_5_ALLOWED } from './words5';
import { WORDS_6_SOLUTIONS, WORDS_6_ALLOWED } from './words6';
import { WORDS_7_SOLUTIONS, WORDS_7_ALLOWED } from './words7';
import { WORDS_8_SOLUTIONS, WORDS_8_ALLOWED } from './words8';

// The source lists contain a few words of the wrong length (WAVE in the five
// letter list, SIGNATURE in the eight letter one). Filter them here so a game can
// never pick an answer that can't be typed on the board.
const clean = (words: string[], length: number) =>
  [...new Set(words.map((w) => w.toUpperCase().trim()))].filter((w) => w.length === length && /^[A-Z]+$/.test(w));

const solutionLists: Record<WordLength, string[]> = {
  5: clean(WORDS_5_SOLUTIONS, 5),
  6: clean(WORDS_6_SOLUTIONS, 6),
  7: clean(WORDS_7_SOLUTIONS, 7),
  8: clean(WORDS_8_SOLUTIONS, 8),
};

// Every answer is always a valid guess, even before the full dictionary loads.
const allowedSets: Record<WordLength, Set<string>> = {
  5: new Set([...clean(WORDS_5_ALLOWED, 5), ...solutionLists[5]]),
  6: new Set([...clean(WORDS_6_ALLOWED, 6), ...solutionLists[6]]),
  7: new Set([...clean(WORDS_7_ALLOWED, 7), ...solutionLists[7]]),
  8: new Set([...clean(WORDS_8_ALLOWED, 8), ...solutionLists[8]]),
};

export function getSolutionsForLength(length: WordLength): string[] {
  return solutionLists[length] ?? solutionLists[5];
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

/** Words in each guess dictionary (public/words/{n}.txt). Rebuilt by `npm run build:dictionary`. */
export const DICTIONARY_SIZES: Record<WordLength, number> = { 5: 12578, 6: 22342, 7: 33192, 8: 40530 };
