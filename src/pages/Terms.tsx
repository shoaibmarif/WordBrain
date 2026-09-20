import React from 'react';
import { SeoHead } from '../components/common/SeoHead';
import { APP_NAME } from '../utils/constants';
import { ArrowLeft, FileText } from 'lucide-react';

export const TermsPage: React.FC = () => {
  const navigateToHome = () => {
    window.location.hash = '#/';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      <SeoHead
        title={`Terms of Service - ${APP_NAME}`}
        description="Terms of service and usage guidelines for playing the free browser-based LexiQuest Word Guessing Game."
        canonicalPath="/terms"
      />

      <button
        onClick={navigateToHome}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Game
      </button>

      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
          <FileText className="w-8 h-8 text-emerald-600" />
          Terms of Service
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Effective Date: September 20, 2026
        </p>
      </div>

      <div className="space-y-6 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">1. Acceptance of Terms</h2>
          <p>
            By accessing or playing {APP_NAME}, you agree to abide by these Terms of Service. If you do not agree
            with any part of these terms, please do not use the application.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">2. Free Entertainment Use</h2>
          <p>
            {APP_NAME} is provided strictly for personal, non-commercial entertainment and educational purposes.
            The software is provided "as is", without warranty of any kind, express or implied.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">3. Intellectual Property</h2>
          <p>
            {APP_NAME} is an original, independent word-puzzle implementation. All code, design, and assets are
            proprietary or appropriately licensed. "Wordle" is a trademark of The New York Times Company; this
            game is not affiliated with, sponsored by, or endorsed by The New York Times Company.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">4. Modifications</h2>
          <p>
            We reserve the right to modify or update these terms at any time without prior notice. Continued use
            of the game constitutes acceptance of updated terms.
          </p>
        </section>
      </div>
    </div>
  );
};
