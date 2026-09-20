import React from 'react';
import { SeoHead } from '../components/common/SeoHead';
import { APP_NAME } from '../utils/constants';
import { ArrowLeft, Lightbulb, Zap, HelpCircle } from 'lucide-react';

export const StrategiesPage: React.FC = () => {
  const navigateToHome = () => {
    window.location.hash = '#/';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      <SeoHead
        title={`Word Guessing Strategies - Master Tips for ${APP_NAME}`}
        description="Comprehensive strategic guide for word guessing games. Master starting words, letter frequencies, vowel elimination, and deduction tactics."
        canonicalPath="/strategies"
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
          Word Guessing Strategies & Tips
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Deductive strategies to maximize your win rate and streak
        </p>
      </div>

      <div className="space-y-8 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
        {/* Strategy 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Zap className="w-5 h-5 text-emerald-600" />
            1. The Power of High-Frequency Starting Words
          </h2>
          <p>
            In five-letter English words, vowels (<strong>E, A, R, I, O, T, N, S, L, C</strong>) appear in over
            60% of all vocabulary entries. Starting with a word rich in distinct high-frequency letters reveals
            valuable clues on your very first turn.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-center font-bold">
            <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-lg">SLATE</div>
            <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-lg">CRANE</div>
            <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-lg">SOARE</div>
            <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-lg">TRACE</div>
          </div>
        </section>

        {/* Strategy 2 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            2. The 'Two-Word Opener' Exploration Method
          </h2>
          <p>
            When not playing in Hard Mode, you can purposefully choose a second word that shares <em>zero</em>{' '}
            letters with your first word. For instance, pairing <strong>CRANE</strong> with <strong>SLOTH</strong>{' '}
            tests 10 unique common letters in just two attempts. By attempt three, you will have identified almost
            all active letters.
          </p>
        </section>

        {/* Strategy 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-500" />
            3. Dealing with Repeated Letters
          </h2>
          <p>
            Players often forget that words can repeat letters (like <em>APPLE</em>, <em>SPEED</em>, or{' '}
            <em>MUMMY</em>). If you've eliminated most common letters and struggle to find a word that fits, test
            for duplicates among already confirmed vowels or consonants.
          </p>
        </section>

        {/* Strategy 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            4. Avoiding the 'Rhyme Trap'
          </h2>
          <p>
            Be cautious with patterns ending in <strong>_IGHT</strong>, <strong>_OUND</strong>, or{' '}
            <strong>_ATCH</strong>. These patterns can have six or seven valid words (LIGHT, MIGHT, SIGHT, TIGHT,
            NIGHT, FIGHT). If you guess blindly, you risk running out of attempts. Instead, guess a word that
            tests several candidate initial consonants in a single go!
          </p>
        </section>
      </div>

      <div className="pt-4 text-center">
        <button
          onClick={navigateToHome}
          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg transition-colors cursor-pointer"
        >
          Put Strategies to the Test
        </button>
      </div>
    </div>
  );
};
