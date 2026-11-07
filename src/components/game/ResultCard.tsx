import React, { useEffect, useRef, useState } from 'react';
import { BookOpen, RotateCcw, Share2 } from 'lucide-react';
import type { GameMode, LetterEvaluation, WordLength } from '../../game/types';
import { shareGameResult } from '../../game/share';
import { formatCountdown, msUntilNextPuzzle } from '../../game/daily';
import { trackEvent } from '../../lib/consent';

interface ResultCardProps {
  won: boolean;
  word: string;
  attempts: number;
  maxAttempts: number;
  durationSeconds?: number;
  mode: GameMode;
  wordLength: WordLength;
  evaluations: LetterEvaluation[][];
  highContrast: boolean;
  hardMode: boolean;
  puzzle?: number;
  onPlayAgain?: () => void;
}

const WIN_LINES = ['Genius!', 'Brilliant!', 'Lovely stuff.', 'Nicely done.', 'Good one.', 'Phew, just in time!'];

const Countdown: React.FC = () => {
  const [ms, setMs] = useState(() => msUntilNextPuzzle());
  useEffect(() => {
    const id = window.setInterval(() => setMs(msUntilNextPuzzle()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return <span className="font-mono text-2xl font-medium tabular-nums text-ink">{formatCountdown(ms)}</span>;
};

/** Takes the keyboard's place once a game is over. */
export const ResultCard: React.FC<ResultCardProps> = ({
  won,
  word,
  attempts,
  maxAttempts,
  durationSeconds,
  mode,
  wordLength,
  evaluations,
  highContrast,
  hardMode,
  puzzle,
  onPlayAgain,
}) => {
  const [note, setNote] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, []);

  const share = async () => {
    const res = await shareGameResult({ mode, wordLength, maxAttempts, attemptsUsed: attempts, won, history: evaluations, highContrast, hardMode, puzzle });
    if (res.ok) trackEvent('share', { method: res.message === 'Shared' ? 'share_sheet' : 'clipboard', content_type: mode });
    setNote(res.message);
    if (res.message) window.setTimeout(() => setNote(''), 2500);
  };

  const heading = won ? WIN_LINES[Math.min(attempts, 6) - 1] : mode === 'timed' && attempts < maxAttempts ? 'Out of time' : 'Not this time';

  return (
    <div ref={ref} className="animate-modal-in mx-auto w-full max-w-[34rem] rounded-xl border-2 border-ink bg-paper p-5 sm:p-6" role="status">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="eyebrow">{won ? `Solved in ${attempts} of ${maxAttempts}` : 'The word was'}</p>
          <h2 className="mt-1 text-3xl font-bold">{won ? heading : word}</h2>
          {!won && <p className="mt-1 text-sm text-ink-2">{heading}. You’ll get the next one.</p>}
          {won && durationSeconds !== undefined && mode !== 'daily' && (
            <p className="mt-1 text-sm text-ink-2">
              {Math.floor(durationSeconds / 60) > 0 && `${Math.floor(durationSeconds / 60)} min `}
              {durationSeconds % 60} sec
            </p>
          )}
        </div>
        <a
          href={`https://en.wiktionary.org/wiki/${word.toLowerCase()}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink underline decoration-accent decoration-2 underline-offset-4"
        >
          <BookOpen className="h-4 w-4" aria-hidden="true" />
          What does {word} mean?
        </a>
      </div>

      {mode === 'daily' && (
        <div className="mt-5 flex items-center justify-between rounded-lg border-2 border-dashed border-line px-4 py-3">
          <span className="text-sm text-ink-2">Next puzzle in</span>
          <Countdown />
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        {onPlayAgain && (
          <button type="button" className="btn btn-accent" onClick={onPlayAgain} autoFocus>
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            New word
          </button>
        )}
        <button type="button" className={`btn ${onPlayAgain ? 'btn-plain' : 'btn-accent'}`} onClick={share}>
          <Share2 className="h-4 w-4" aria-hidden="true" />
          Share result
        </button>
        <span aria-live="polite" className="self-center text-sm font-medium text-hit">
          {note}
        </span>
      </div>
    </div>
  );
};
