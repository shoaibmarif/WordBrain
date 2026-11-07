import type { WordLength } from './types';
import { getSolutionsForLength } from '../data';

export interface LetterShare {
  letter: string;
  /** Share of answers that contain the letter at least once, 0 to 1. */
  share: number;
}

/** How often each letter appears in a list of answers (counted once per word). */
export function letterFrequency(words: string[]): LetterShare[] {
  const counts: Record<string, number> = {};
  for (const w of words) for (const c of new Set(w)) counts[c] = (counts[c] ?? 0) + 1;
  return Object.entries(counts)
    .map(([letter, n]) => ({ letter, share: n / words.length }))
    .sort((a, b) => b.share - a.share || a.letter.localeCompare(b.letter));
}

const scorer = (words: string[]) => {
  const freq = new Map(letterFrequency(words).map((l) => [l.letter, l.share]));
  return (w: string, skip: Set<string> = new Set()) => [...new Set(w)].reduce((s, c) => s + (skip.has(c) ? 0 : freq.get(c) ?? 0), 0);
};

/**
 * Openers that test the most common letters, with no letter repeated.
 * Scored by how many answers contain each of the word's letters.
 */
export function bestOpeners(words: string[], count = 6): string[] {
  const score = scorer(words);
  const seen = new Set<string>();
  return words
    .filter((w) => new Set(w).size === w.length)
    .sort((a, b) => score(b) - score(a) || a.localeCompare(b))
    .filter((w) => {
      // Anagrams (ALERT, ALTER, LATER) test the same letters, so keep just one.
      const key = [...w].sort().join('');
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, count);
}

/** A second guess that shares no letters with the opener and covers the next most common ones. */
export function bestFollowUp(words: string[], opener: string): string | null {
  const score = scorer(words);
  const used = new Set(opener);
  const candidates = words.filter((w) => new Set(w).size === w.length && ![...w].some((c) => used.has(c)));
  if (candidates.length === 0) return null;
  return candidates.sort((a, b) => score(b, used) - score(a, used) || a.localeCompare(b))[0];
}

/** The single opener suggested under an empty board. */
export function suggestedOpener(length: WordLength): string {
  return bestOpeners(getSolutionsForLength(length), 1)[0] ?? 'STARE';
}
