import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { ConsentBanner } from '../ui/ConsentBanner';
import { HelpModal } from '../modals/HelpModal';
import { StatsModal } from '../modals/StatsModal';
import { SettingsModal } from '../modals/SettingsModal';
import { useApp } from '../../context/AppContext';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { modal, closeModal } = useApp();
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:border focus:border-edge focus:bg-card focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="mx-auto w-full max-w-6xl flex-1 px-3 pt-3 sm:px-6 sm:pt-10">
        {children}
      </main>
      <Footer />
      <ConsentBanner />
      <HelpModal open={modal === 'help'} onClose={closeModal} />
      <StatsModal open={modal === 'stats'} onClose={closeModal} />
      <SettingsModal open={modal === 'settings'} onClose={closeModal} />
    </div>
  );
};
