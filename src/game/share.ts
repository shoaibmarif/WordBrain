import type { GameMode, LetterEvaluation, WordLength } from './types';
import { SITE } from '../seo/site';

export interface ShareOptions {
  mode: GameMode;
  wordLength: WordLength;
  maxAttempts: number;
  attemptsUsed: number;
  won: boolean;
  history: LetterEvaluation[][];
  highContrast?: boolean;
  hardMode?: boolean;
  /** Daily puzzle number, shown as "WordBrain #12". */
  puzzle?: number;
}

/** Coloured squares only, so sharing never gives the word away. */
export function generateEmojiGrid(history: LetterEvaluation[][], highContrast = false): string {
  const hit = highContrast ? '🟧' : '🟩';
  const near = highContrast ? '🟦' : '🟨';
  return history
    .map((row) => row.map((c) => (c.state === 'correct' ? hit : c.state === 'present' ? near : '⬜')).join(''))
    .join('\n');
}

const PATHS: Record<GameMode, string> = { daily: '/daily', practice: '/practice', timed: '/timed', random: '/' };

export function buildShareText(o: ShareOptions): string {
  const score = `${o.won ? o.attemptsUsed : 'X'}/${o.maxAttempts}${o.hardMode ? '*' : ''}`;
  const title =
    o.mode === 'daily' && o.puzzle
      ? `${SITE.name} #${o.puzzle}`
      : `${SITE.name} ${o.mode === 'timed' ? 'timed, ' : ''}${o.wordLength} letters`;
  const url = `${SITE.url}${PATHS[o.mode] === '/' ? '' : PATHS[o.mode]}`;
  return `${title} ${score}\n\n${generateEmojiGrid(o.history, o.highContrast)}\n\n${url}`;
}

/** Shares with the system share sheet on phones, otherwise copies to the clipboard. */
export async function shareGameResult(o: ShareOptions): Promise<{ ok: boolean; message: string }> {
  const text = buildShareText(o);
  if (navigator.share && /mobile|android|iphone|ipad/i.test(navigator.userAgent)) {
    try {
      await navigator.share({ text });
      return { ok: true, message: 'Shared' };
    } catch (err) {
      if ((err as Error).name === 'AbortError') return { ok: false, message: '' };
    }
  }
  try {
    await navigator.clipboard.writeText(text);
    return { ok: true, message: 'Copied to clipboard' };
  } catch {
    return { ok: false, message: 'Couldn’t copy, sorry' };
  }
}
