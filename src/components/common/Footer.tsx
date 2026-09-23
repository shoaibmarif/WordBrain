import React from 'react';
import { Globe, ExternalLink } from 'lucide-react';
import { APP_NAME, APP_SUBTITLE, DEVELOPER_LINKS } from '../../utils/constants';

const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45c-.89 0-1.61.72-1.61 1.61s.72 1.61 1.61 1.61 1.61-.72 1.61-1.61-.72-1.61-1.61-1.61Z" />
  </svg>
);

export const Footer: React.FC = () => {
  const navigateTo = (path: string) => {
    window.location.hash = path;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 mt-12 py-10 text-xs text-slate-500 dark:text-slate-400">
      <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-8">
        {/* Brand & Tagline */}
        <div className="col-span-2 sm:col-span-1 space-y-3">
          <p className="text-sm font-black text-slate-900 dark:text-slate-100 uppercase tracking-tight">
            {APP_NAME} <span className="text-emerald-600 font-bold">{APP_SUBTITLE}</span>
          </p>
          <p className="text-xs leading-relaxed">
            A free, client-side browser word puzzle game. Zero trackers, no accounts, playable offline.
          </p>
          <div className="flex items-center gap-2 pt-1">
            <a
              href={DEVELOPER_LINKS.GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title="GitHub Profile"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={DEVELOPER_LINKS.LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title="LinkedIn Profile"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={DEVELOPER_LINKS.PORTFOLIO}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-slate-600 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title="Portfolio Website"
              aria-label="Portfolio Website"
            >
              <Globe className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Game Modes */}
        <div className="space-y-2">
          <p className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-[11px]">
            Game Modes
          </p>
          <ul className="space-y-1.5">
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
                About WordBrain
              </button>
            </li>
          </ul>
        </div>

        {/* Developer & Connect */}
        <div className="space-y-2">
          <p className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-[11px]">
            Connect & Legal
          </p>
          <ul className="space-y-1.5">
            <li>
              <a
                href={DEVELOPER_LINKS.PORTFOLIO}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-emerald-600 dark:hover:text-emerald-400 group"
              >
                <Globe className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400" />
                <span>Portfolio Website</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-60" />
              </a>
            </li>
            <li>
              <a
                href={DEVELOPER_LINKS.LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 group"
              >
                <LinkedinIcon className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                <span>LinkedIn Profile</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-60" />
              </a>
            </li>
            <li>
              <a
                href={DEVELOPER_LINKS.GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white group"
              >
                <GithubIcon className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white" />
                <span>GitHub Profile</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-60" />
              </a>
            </li>
            <li className="pt-1.5 border-t border-slate-100 dark:border-slate-800">
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
          </ul>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] gap-2">
        <p>
          © {new Date().getFullYear()} {APP_NAME}. Created by{' '}
          <a
            href={DEVELOPER_LINKS.PORTFOLIO}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 underline underline-offset-2 decoration-slate-300 dark:decoration-slate-600"
          >
            Shoaib Arif
          </a>
        </p>
        <p className="text-slate-400">Designed for accessible, high-speed mobile and desktop play.</p>
      </div>
    </footer>
  );
};

