import React from 'react';
import { APP_NAME, APP_SUBTITLE } from '../../utils/constants';

export const Footer: React.FC = () => {
  const navigateTo = (path: string) => {
    window.location.hash = path;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 mt-12 py-10 text-xs text-slate-500 dark:text-slate-400">
      <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-8">
        {/* Brand & Tagline */}
        <div className="col-span-2 sm:col-span-1 space-y-2">
          <p className="text-sm font-black text-slate-900 dark:text-slate-100 uppercase tracking-tight">
            {APP_NAME} <span className="text-emerald-600 font-bold">{APP_SUBTITLE}</span>
          </p>
          <p className="text-xs leading-relaxed">
            A free, client-side browser word puzzle game. Zero trackers, no accounts, playable offline.
          </p>
        </div>

        {/* Game Modes */}
        <div className="space-y-2">
          <p className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-[11px]">
            Game Modes
          </p>
          <ul className="space-y-1.5">
            <li>
              <button
                onClick={() => navigateTo('#/daily')}
                className="hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer"
              >
                Daily Challenge
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateTo('#/')}
                className="hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer"
              >
                Random Game
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateTo('#/practice')}
                className="hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer"
              >
                Practice & Hints
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateTo('#/timed')}
                className="hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer"
              >
                Timed Speed Run
              </button>
            </li>
          </ul>
        </div>

        {/* Guides & Rules */}
        <div className="space-y-2">
          <p className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-[11px]">
            Guides & Rules
          </p>
          <ul className="space-y-1.5">
            <li>
              <button
                onClick={() => navigateTo('#/how-to-play')}
                className="hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer"
              >
                How to Play
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateTo('#/strategies')}
                className="hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer"
              >
                Best Strategies
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateTo('#/about')}
                className="hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer"
              >
                About LexiQuest
              </button>
            </li>
          </ul>
        </div>

        {/* Legal & Contact */}
        <div className="space-y-2">
          <p className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-[11px]">
            Legal & Support
          </p>
          <ul className="space-y-1.5">
            <li>
              <button
                onClick={() => navigateTo('#/privacy')}
                className="hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer"
              >
                Privacy Policy
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateTo('#/terms')}
                className="hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer"
              >
                Terms of Service
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateTo('#/contact')}
                className="hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer"
              >
                Contact & Feedback
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] gap-2">
        <p>© {new Date().getFullYear()} {APP_NAME}. Independent word guessing game.</p>
        <p className="text-slate-400">Designed for accessible, high-speed mobile and desktop play.</p>
      </div>
    </footer>
  );
};
