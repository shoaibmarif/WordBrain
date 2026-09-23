import { GameMode, LetterEvaluation, WordLength } from './types';
import { APP_NAME } from '../utils/constants';

export interface ShareOptions {
  mode: GameMode;
  wordLength: WordLength;
  maxAttempts: number;
  attemptsUsed: number;
  won: boolean;
  history: LetterEvaluation[][];
  highContrast?: boolean;
  hardMode?: boolean;
}

/**
 * Converts letter evaluations to spoiler-free emoji grid.
 */
export function generateEmojiGrid(
  history: LetterEvaluation[][],
  highContrast: boolean = false
): string {
  const correctEmoji = highContrast ? '🟧' : '🟩';
  const presentEmoji = highContrast ? '🟦' : '🟨';
  const absentEmoji = '⬛';

  return history
    .map(row => {
      return row
        .map(cell => {
          if (cell.state === 'correct') return correctEmoji;
          if (cell.state === 'present') return presentEmoji;
          return absentEmoji;
        })
        .join('');
    })
    .join('\n');
}

/**
 * Builds the complete share text snippet.
 */
export function buildShareText(options: ShareOptions): string {
  const {
    mode,
    wordLength,
    maxAttempts,
    attemptsUsed,
    won,
    history,
    highContrast = false,
    hardMode = false,
  } = options;

  let header = APP_NAME;
  if (mode === 'timed') {
    header += ` - Timed Mode (${wordLength} letters)`;
  } else if (mode === 'practice') {
    header += ` - Practice (${wordLength} letters)`;
  } else {
    header += ` (${wordLength} letters)`;
  }

  const score = `${won ? attemptsUsed : 'X'}/${maxAttempts}${hardMode ? '*' : ''}`;
  const grid = generateEmojiGrid(history, highContrast);

  return `${header} ${score}\n\n${grid}\n\nPlay at: ${window.location.origin}`;
}

/**
 * Shares game results via Web Share API or falls back to Clipboard.
 * Returns true if copied or shared successfully.
 */
export async function shareGameResult(options: ShareOptions): Promise<{ shared: boolean; message: string }> {
  const text = buildShareText(options);

  if (navigator.share && /mobile|android|iphone/i.test(navigator.userAgent)) {
    try {
      await navigator.share({
        title: APP_NAME,
        text: text,
      });
      return { shared: true, message: 'Result shared!' };
    } catch (err: unknown) {
      if ((err as Error).name === 'AbortError') {
        return { shared: false, message: 'Share cancelled' };
      }
      // Fallback to clipboard
    }
  }

  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return { shared: true, message: 'Result copied to clipboard!' };
    }
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    return { shared: true, message: 'Result copied to clipboard!' };
  } catch {
    return { shared: false, message: 'Failed to copy result' };
  }
}
