import React from 'react';
import { SeoHead } from '../components/common/SeoHead';
import { APP_NAME, APP_SUBTITLE } from '../utils/constants';
import { ArrowLeft, ShieldCheck, Zap, Code, Heart } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const navigateToHome = () => {
    window.location.hash = '#/';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      <SeoHead
        title={`About ${APP_NAME} (${APP_SUBTITLE}) - Free Browser Word Game`}
        description="Learn about the origins, architecture, and technology behind the WordBrain Word Challenge."
        canonicalPath="/about"
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
          About {APP_NAME}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          An original, independent client-side word deduction game
        </p>
      </div>

      <div className="space-y-6 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Our Mission</h2>
          <p>
            <strong>{APP_NAME}</strong> was built from the ground up to deliver a lightning-fast, privacy-first,
            and completely free word-guessing game in your browser. Unlike platforms crowded with intrusive
            trackers, paywalls, or account registrations, this application runs entirely on your device with
            zero server round-trips.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Core Engineering Principles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100">
                <Zap className="w-5 h-5 text-amber-500" />
                Zero Latency
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                All game state, deterministic daily seed calculations, and dictionary validations happen
                instantly in JavaScript without waiting on API calls.
              </p>
            </div>

            <div className="p-4 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                Total Privacy
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Your guesses, win streaks, and settings are saved exclusively in your browser's local storage.
                No cookies, no telemetry, no analytics.
              </p>
            </div>

            <div className="p-4 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100">
                <Code className="w-5 h-5 text-indigo-500" />
                Modern Stack
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Crafted with React 19, TypeScript, Tailwind CSS, and Web Audio API for synthetic audio cues
                without loading external MP3 files.
              </p>
            </div>

            <div className="p-4 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100">
                <Heart className="w-5 h-5 text-rose-500" />
                Accessibility First
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Built-in High-Contrast mode with patterned icons, keyboard navigability, screen-reader ARIA
                tags, and reduced-motion animation options.
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="pt-4 text-center">
        <button
          onClick={navigateToHome}
          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg transition-colors cursor-pointer"
        >
          Return to Game
        </button>
      </div>
    </div>
  );
};
