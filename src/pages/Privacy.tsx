import React from 'react';
import { SeoHead } from '../components/common/SeoHead';
import { APP_NAME } from '../utils/constants';
import { ArrowLeft, Shield } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  const navigateToHome = () => {
    window.location.hash = '#/';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      <SeoHead
        title={`Privacy Policy - ${APP_NAME}`}
        description="Our straightforward privacy policy: we collect zero personal data, use no tracking cookies, and store all gameplay locally."
        canonicalPath="/privacy"
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
          <Shield className="w-8 h-8 text-emerald-600" />
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Effective Date: September 20, 2026
        </p>
      </div>

      <div className="space-y-6 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">1. Information We Do Not Collect</h2>
          <p>
            {APP_NAME} is built as a decentralized client-side browser application. We do not require account
            creation, email addresses, names, or payment details. We do not track IP addresses or transmit your
            puzzle guesses to any remote database.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">2. Local Storage Usage</h2>
          <p>
            To provide persistent game functionality across page reloads, the application stores data locally on
            your browser using the standard HTML5 <strong>LocalStorage</strong> API. This includes:
          </p>
          <ul className="list-disc list-inside text-xs sm:text-sm text-slate-600 dark:text-slate-400 pl-2 space-y-1">
            <li>User settings (theme, sound preference, high contrast, hard mode)</li>
            <li>Gameplay statistics (games played, win percentage, streak counter, guess distribution)</li>
            <li>In-progress or completed daily challenge puzzle state</li>
            <li>Recent game history logs</li>
          </ul>
          <p className="text-xs text-slate-500 mt-2">
            You can clear all stored local data at any time via the Settings modal or by clearing your browser
            cache.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">3. Cookies & Analytics</h2>
          <p>
            We do not use tracking cookies, cross-site trackers, or third-party profiling tools. Your gameplay is
            private to your device.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">4. Contact Information</h2>
          <p>
            For questions or suggestions regarding our privacy practices, please contact us via our support page.
          </p>
        </section>
      </div>
    </div>
  );
};
