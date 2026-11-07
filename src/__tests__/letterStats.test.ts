import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { bestFollowUp, bestOpeners, letterFrequency } from '../game/letterStats';
import { DICTIONARY_SIZES, getSolutionsForLength } from '../data';

describe('letter stats', () => {
  it('counts each letter once per word', () => {
    const f = letterFrequency(['EERIE', 'TREES']);
    expect(f.find((l) => l.letter === 'E')?.share).toBe(1);
    expect(f.find((l) => l.letter === 'T')?.share).toBe(0.5);
  });

  it('suggests openers with no repeated letters and no anagram twins', () => {
    for (const n of [5, 6, 7, 8] as const) {
      const openers = bestOpeners(getSolutionsForLength(n), 6);
      expect(openers).toHaveLength(6);
      for (const w of openers) expect(new Set(w).size).toBe(n);
      expect(new Set(openers.map((w) => [...w].sort().join(''))).size).toBe(6);
    }
  });

  it('picks a follow-up that shares no letters with the opener', () => {
    const words = getSolutionsForLength(5);
    const opener = bestOpeners(words, 1)[0];
    const next = bestFollowUp(words, opener)!;
    expect([...next].some((c) => opener.includes(c))).toBe(false);
  });

  it('knows the real dictionary sizes', () => {
    for (const n of [5, 6, 7, 8] as const) {
      const file = fs.readFileSync(path.resolve(__dirname, `../../public/words/${n}.txt`), 'utf8');
      expect(file.split('\n').filter(Boolean).length).toBe(DICTIONARY_SIZES[n]);
    }
  });
});
