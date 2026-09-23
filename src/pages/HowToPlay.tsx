import React from 'react';
import { SeoHead } from '../components/common/SeoHead';
import { LetterTile } from '../components/GameBoard/LetterTile';
import { APP_NAME } from '../utils/constants';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export const HowToPlayPage: React.FC = () => {
  const navigateToHome = () => {
    window.location.hash = '#/';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      <SeoHead
        title={`How to Play ${APP_NAME} - Complete Rules & Visual Guide`}
        description="Learn the official rules, letter feedback colors, and strategies for solving word guessing puzzles."
        canonicalPath="/how-to-play"
      />

      <button
        onClick={navigateToHome}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Game
      </button>

      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
          How to Play {APP_NAME}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Master the rules of the six-attempt word guessing challenge
        </p>
      </div>

      <div className="space-y-6 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">The Objective</h2>
          <p>
            The goal of the game is to identify a secret mystery word in <strong>six attempts or fewer</strong>.
            In the standard mode, the word is five letters long, but the game also supports 6, 7, and 8-letter
            variants.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Game Rules & Workflow</h2>
          <div className="space-y-3">
            <div className="flex gap-3 items-start">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
              <p>
                <strong>Valid Words Only:</strong> Every guess must be an authentic, recognized English word.
                Random letter strings or abbreviations like <em>XYZAB</em> are rejected without costing an
                attempt.
              </p>
            </div>
            <div className="flex gap-3 items-start">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
              <p>
                <strong>Submitting a Guess:</strong> After entering your letters using your physical keyboard
                or the on-screen keys, press the <strong>Enter</strong> key to confirm.
              </p>
            </div>
            <div className="flex gap-3 items-start">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
              <p>
                <strong>Tile Reveal:</strong> Once submitted, the tiles will flip one by one to reveal colored
                feedback about each letter.
              </p>
            </div>
            <div className="flex gap-3 items-start">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
              <p>
                <strong>Keyboard Tracking:</strong> The virtual keyboard updates with your best-known state
                for every letter (Green &gt; Yellow &gt; Gray).
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4 pt-2">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Tile Feedback Meanings
          </h2>

          <div className="p-4 bg-white dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex gap-2 items-center">
              <div className="w-12 h-12">
                <LetterTile char="S" state="correct" />
              </div>
              <div>
                <p className="font-bold text-emerald-600 dark:text-emerald-400">Green / Orange (Correct)</p>
                <p className="text-xs">The letter S is in the word and in the exact position.</p>
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <div className="w-12 h-12">
                <LetterTile char="T" state="present" />
              </div>
              <div>
                <p className="font-bold text-amber-500">Yellow / Blue (Present)</p>
                <p className="text-xs">The letter T is in the word, but in a different position.</p>
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <div className="w-12 h-12">
                <LetterTile char="N" state="absent" />
              </div>
              <div>
                <p className="font-bold text-slate-500">Gray (Absent)</p>
                <p className="text-xs">The letter N does not exist in the target word.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Hard Mode</h2>
          <p>
            Looking for a bigger challenge? Toggle <strong>Hard Mode</strong> in Settings before starting a
            round. When active, every subsequent guess must strictly include all previously discovered letters
            and keep confirmed letters in their exact positions.
          </p>
        </section>
      </div>

      <div className="pt-4 text-center">
        <button
          onClick={navigateToHome}
          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg transition-colors cursor-pointer"
        >
          Play a Game Now
        </button>
      </div>
    </div>
  );
};
