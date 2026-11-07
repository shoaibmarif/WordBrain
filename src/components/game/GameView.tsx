import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { EyeOff, Flame, Pause, Play, RotateCcw, Sparkles } from 'lucide-react';
import type { GameStatus, WordLength } from '../../game/types';
import { useApp } from '../../context/AppContext';
import { useGame } from '../../hooks/useGame';
import { useKeyboard } from '../../hooks/useKeyboard';
import { useTimer } from '../../hooks/useTimer';
import { GameBoard } from './GameBoard';
import { Keyboard } from './Keyboard';
import { ModeTabs } from './ModeTabs';
import { ResultCard } from './ResultCard';
import { Toast } from '../ui/Toast';
import { TIMED_SECONDS, WORD_LENGTHS } from '../../utils/constants';
import { trackEvent } from '../../lib/consent';
import type { GameResult } from '../../hooks/useStatistics';

interface DailySetup {
  puzzle: number;
  word: string;
  initialGuesses: string[];
  streak: number;
  onGuess: (guesses: string[], status: GameStatus) => void;
}

interface GameViewProps {
  mode: 'random' | 'practice' | 'timed' | 'daily';
  /** Length landing pages lock the word length. */
  fixedLength?: WordLength;
  daily?: DailySetup;
  /** Small heading inside the card (the page's h1). */
  title: React.ReactNode;
}

export const GameView: React.FC<GameViewProps> = ({ mode, fixedLength, daily, title }) => {
  const { settings, updateSettings, stats, recordGameResult } = useApp();
  const wordLength: WordLength = daily ? 5 : fixedLength ?? settings.wordLength;
  const [paused, setPaused] = useState(false);

  const onGameEnd = useCallback(
    (r: GameResult) => {
      recordGameResult(r);
      trackEvent('game_complete', { mode: r.mode, word_length: r.wordLength, won: r.won, guesses: r.attemptsUsed, hints: r.hintsUsed });
    },
    [recordGameResult]
  );

  const game = useGame({
    mode,
    wordLength,
    difficulty: settings.difficulty,
    hardMode: settings.hardMode,
    soundEnabled: settings.soundEnabled,
    animationsEnabled: settings.animationsEnabled,
    fixedWord: daily?.word,
    initialGuesses: daily?.initialGuesses,
    onGuess: daily?.onGuess,
    onGameEnd,
  });

  const playing = game.gameStatus === 'playing';
  const over = game.gameStatus === 'won' || game.gameStatus === 'lost';

  const timer = useTimer({
    duration: TIMED_SECONDS,
    running: mode === 'timed' && playing && !paused && game.targetWord !== '',
    resetKey: game.targetWord,
    onTimeUp: game.handleTimeUp,
  });

  // A fresh word always starts unpaused.
  useEffect(() => setPaused(false), [game.targetWord]);

  useKeyboard({
    onChar: game.addLetter,
    onEnter: game.submitGuess,
    onDelete: game.removeLetter,
    disabled: !playing || paused,
  });

  const restart = () => {
    game.newGame();
    trackEvent('new_word', { mode });
  };

  const streak = daily ? daily.streak : stats.currentStreak;
  const midGame = playing && game.guesses.length > 0;
  const canPickLength = !daily && !fixedLength;

  const toolbar = (
      <div className="flex flex-wrap items-center gap-2">
        {mode !== 'practice' && (
          <span className="chip" title={daily ? 'Daily puzzles solved in a row' : 'Games won in a row'}>
            <Flame className="h-4 w-4 text-accent" aria-hidden="true" />
            {streak} <span className="sr-only sm:not-sr-only">streak</span>
          </span>
        )}
        {mode === 'timed' && (
          <span className={`chip font-mono tabular-nums ${timer.seconds <= 20 && playing ? 'border-accent text-accent' : ''}`} aria-label={`${timer.seconds} seconds left`}>
            {timer.formatted}
            {playing && (
              <button type="button" onClick={() => setPaused((p) => !p)} className="-mr-1 ml-0.5 rounded p-0.5 hover:text-ink" aria-label={paused ? 'Resume' : 'Pause'}>
                {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
              </button>
            )}
          </span>
        )}
        {canPickLength && (
          <div className="flex items-center gap-1.5 text-sm">
            <span className="sr-only">Letters</span>
            <div className="flex gap-1" role="radiogroup" aria-label="Word length">
              {WORD_LENGTHS.map((n) => (
                <button
                  key={n}
                  type="button"
                  role="radio"
                  aria-checked={wordLength === n}
                  disabled={midGame && wordLength !== n}
                  title={midGame && wordLength !== n ? 'Finish or skip this word first' : undefined}
                  onClick={() => updateSettings({ wordLength: n })}
                  className={`h-8 w-7 rounded-md sm:w-8 border-2 font-mono text-sm font-semibold transition-colors disabled:opacity-40 ${
                    wordLength === n ? 'border-ink bg-ink text-paper' : 'border-line bg-card text-ink-2 hover:border-ink'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        )}
        {!daily && (
          <button type="button" onClick={restart} className="chip hover:border-ink hover:text-ink" title="Skip to a new word">
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="sr-only sm:not-sr-only">New word</span>
          </button>
        )}
      </div>
  );

  return (
    <section aria-label="Game" className="mx-auto w-full max-w-3xl">
      <ModeTabs activeOverride={fixedLength ? '/' : undefined} />
      <div className="block-card relative px-3 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pt-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-xl font-bold leading-tight sm:text-2xl">{title}</h1>
            <p className="mt-0.5 hidden text-sm text-muted sm:block">
              {daily ? `Puzzle #${daily.puzzle} · same word for everyone today` : `${wordLength} letters · six tries${settings.hardMode ? ' · hard mode' : ''}`}
            </p>
          </div>
          {toolbar}
        </div>

        <div className="relative">
          <Toast message={game.toastMessage} />
          <GameBoard
            wordLength={wordLength}
            maxAttempts={game.maxAttempts}
            guesses={game.guesses}
            evaluations={game.evaluations}
            currentGuess={game.currentGuess}
            isShaking={game.isShaking}
            won={game.gameStatus === 'won'}
            hidden={paused}
          />
          {paused && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
              <EyeOff className="h-6 w-6 text-ink-2" aria-hidden="true" />
              <p className="font-display text-xl font-bold">Paused</p>
              <button type="button" className="btn btn-accent btn-sm" onClick={() => setPaused(false)}>
                <Play className="h-4 w-4" aria-hidden="true" /> Carry on
              </button>
            </div>
          )}
        </div>

        {mode === 'practice' && playing && (
          <div className="mx-auto mt-3 flex max-w-[34rem] flex-wrap items-center gap-2 rounded-lg border-2 border-dashed border-line px-3 py-2.5">
            <Sparkles className="h-4 w-4 text-near" aria-hidden="true" />
            <span className="mr-auto text-sm font-medium text-ink-2">Stuck?</span>
            <button type="button" className="chip hover:border-ink hover:text-ink" onClick={() => game.useHint('reveal_letter')}>
              Show a letter
            </button>
            <button type="button" className="chip hover:border-ink hover:text-ink" onClick={() => game.useHint('eliminate_letters')}>
              Rule out 3 letters
            </button>
            {game.hintLog.length > 0 && (
              <ul className="w-full pt-1 text-sm text-ink-2">
                {game.hintLog.map((h, i) => (
                  <li key={i}>· {h}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        <div className="mt-5">
          {over ? (
            <ResultCard
              won={game.gameStatus === 'won'}
              word={game.targetWord}
              attempts={game.guesses.length}
              maxAttempts={game.maxAttempts}
              durationSeconds={game.lastResult?.durationSeconds}
              mode={mode}
              wordLength={wordLength}
              evaluations={game.evaluations}
              highContrast={settings.highContrast}
              hardMode={settings.hardMode}
              puzzle={daily?.puzzle}
              onPlayAgain={daily ? undefined : restart}
            />
          ) : (
            <Keyboard
              keyboardStates={game.keyboardStates}
              onChar={game.addLetter}
              onEnter={game.submitGuess}
              onDelete={game.removeLetter}
              disabled={paused}
            />
          )}
        </div>

        {daily && over && (
          <p className="mt-4 text-center text-sm text-ink-2">
            Can’t wait until tomorrow? <Link to="/" className="font-semibold text-ink underline underline-offset-2">Play unlimited words</Link>.
          </p>
        )}
        {fixedLength && (
          <p className="mt-4 text-center text-sm text-ink-2">
            Try another length:{' '}
            {WORD_LENGTHS.filter((n) => n !== fixedLength).map((n, i) => (
              <React.Fragment key={n}>
                {i > 0 && ', '}
                <Link to={`/${n}-letter-word-game`} className="font-semibold text-ink underline underline-offset-2">
                  {n} letters
                </Link>
              </React.Fragment>
            ))}
          </p>
        )}
      </div>
    </section>
  );
};
