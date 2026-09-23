import React from 'react';
import { LetterTile } from '../GameBoard/LetterTile';

export const GameGuideSection: React.FC = () => {
  return (
    <section className="max-w-3xl mx-auto px-4 py-12 space-y-10 text-slate-700 dark:text-slate-300 leading-relaxed">
      {/* Introduction */}
      <div>
        <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-slate-100 mb-3">
          Word Guessing Game Online
        </h2>
        <p className="text-sm sm:text-base">
          Welcome to <strong>WordBrain</strong>, a polished and accessible browser-based word
          deduction game. Whether you are solving unlimited puzzles in <strong>Random Mode</strong>,
          training with <strong>Practice Mode</strong> hints, or testing your reflexes in{' '}
          <strong>Timed Mode</strong>, the objective remains clear: deduce the mystery hidden word
          within six attempts using color-coded hints.
        </p>
      </div>

      {/* How to Play */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          How to Play the Word Guessing Game
        </h3>
        <ol className="list-decimal list-inside space-y-2 text-sm sm:text-base pl-1">
          <li>
            <strong>Enter a valid word:</strong> Type any recognized English word of the required length (5,
            6, 7, or 8 letters) using either your physical keyboard or the on-screen keys.
          </li>
          <li>
            <strong>Submit your guess:</strong> Press <em>Enter</em> to submit your guess. If the word is not
            in the allowed dictionary, the board will gently shake without penalizing your attempt count.
          </li>
          <li>
            <strong>Analyze the letter feedback:</strong> Examine the color and visual indicators of each
            revealed tile.
          </li>
          <li>
            <strong>Formulate your next guess:</strong> Use the confirmed letters and eliminated consonants to
            deduce remaining possibilities.
          </li>
          <li>
            <strong>Solve the puzzle:</strong> Identify the target word before you run out of six attempts to
            win and build your streak!
          </li>
        </ol>
      </div>

      {/* Letter Colors & Visual Indicators */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          Understanding Letter Feedback & Tile States
        </h3>
        <p className="text-sm">
          After each submission, each tile reveals one of three feedback states evaluated by our two-pass
          matching engine:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {/* Correct */}
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 space-y-2">
            <div className="w-12 h-12">
              <LetterTile char="G" state="correct" />
            </div>
            <p className="font-bold text-emerald-800 dark:text-emerald-300 text-sm">Correct Position</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              The letter is in the secret word and in the exact spot. In High-Contrast mode, this appears as
              vivid orange with a checkmark badge.
            </p>
          </div>

          {/* Present */}
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-2">
            <div className="w-12 h-12">
              <LetterTile char="Y" state="present" />
            </div>
            <p className="font-bold text-amber-800 dark:text-amber-300 text-sm">Present / Wrong Spot</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              The letter exists in the secret word, but in a different position. In High-Contrast mode, this
              appears as sky blue with arrows.
            </p>
          </div>

          {/* Absent */}
          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="w-12 h-12">
              <LetterTile char="X" state="absent" />
            </div>
            <p className="font-bold text-slate-700 dark:text-slate-300 text-sm">Not in Word</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              The letter does not occur in the target word. On the virtual keyboard, this key is dimmed to
              prevent accidental re-use.
            </p>
          </div>
        </div>
      </div>

      {/* Strategies */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          Pro Word Guessing Strategies & Tips
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-slate-100">1. Optimize Your Starting Word</h4>
            <p>
              Begin with words containing at least two or three common vowels (A, E, I, O) and frequent
              consonants like R, T, S, or L (e.g., <em>SLATE</em>, <em>CRANE</em>, <em>AUDIO</em>).
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-slate-100">2. Explore New Letters on Guess 2</h4>
            <p>
              Unless playing in Hard Mode, consider using your second guess to test 5 completely new letters
              to quickly narrow down the pool of candidates.
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-slate-100">3. Beware of Repeated Letters</h4>
            <p>
              Words like <em>APPLE</em>, <em>SPEED</em>, or <em>MUMMY</em> contain duplicates. Our two-pass
              algorithm reveals duplicates accurately without guessing!
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-slate-100">4. Leverage Keyboard Coloring</h4>
            <p>
              Keep an eye on the on-screen keyboard. Dimmed keys save you from wasting valuable guesses on
              eliminated letters.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
