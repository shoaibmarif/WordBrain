import React, { useState, useEffect } from 'react';
import { useTheme } from './hooks/useTheme';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useStatistics } from './hooks/useStatistics';
import { Difficulty, GameMode, WordLength } from './game/types';
import { STORAGE_KEYS } from './utils/constants';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { StatisticsModal } from './components/Modals/StatisticsModal';
import { SettingsModal } from './components/Modals/SettingsModal';
import { HowToPlayModal } from './components/Modals/HowToPlayModal';

// Pages
import { HomePage } from './pages/Home';
import { DailyPage } from './pages/Daily';
import { PracticePage } from './pages/Practice';
import { TimedPage } from './pages/Timed';
import { HowToPlayPage } from './pages/HowToPlay';
import { StrategiesPage } from './pages/Strategies';
import { AboutPage } from './pages/About';
import { PrivacyPage } from './pages/Privacy';
import { TermsPage } from './pages/Terms';
import { ContactPage } from './pages/Contact';

export const App: React.FC = () => {
  const { theme, setTheme, isDark, toggleTheme } = useTheme();

  // Settings
  const [hardMode, setHardMode] = useLocalStorage<boolean>(
    `${STORAGE_KEYS.SETTINGS}_hard_mode`,
    false
  );
  const [soundEnabled, setSoundEnabled] = useLocalStorage<boolean>(
    `${STORAGE_KEYS.SETTINGS}_sound`,
    true
  );
  const [animationsEnabled, setAnimationsEnabled] = useLocalStorage<boolean>(
    `${STORAGE_KEYS.SETTINGS}_animations`,
    true
  );
  const [highContrast, setHighContrast] = useLocalStorage<boolean>(
    `${STORAGE_KEYS.SETTINGS}_high_contrast`,
    false
  );
  const [wordLength, setWordLength] = useLocalStorage<WordLength>(
    `${STORAGE_KEYS.SETTINGS}_word_length`,
    5
  );
  const [difficulty, setDifficulty] = useLocalStorage<Difficulty>(
    `${STORAGE_KEYS.SETTINGS}_difficulty`,
    'medium'
  );

  // Statistics
  const { stats, dailyStreak, history, recordGameResult, resetStats, clearHistory } =
    useStatistics();

  // Modals state
  const [statsModalOpen, setStatsModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [howToPlayModalOpen, setHowToPlayModalOpen] = useState(false);

  // Hash-based client routing
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.hash || '#/';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#/';
      setCurrentPath(hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Sync high-contrast class on root document
  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [highContrast]);

  // Determine current active mode based on route
  const getModeFromPath = (): GameMode => {
    if (currentPath.startsWith('#/daily')) return 'daily';
    if (currentPath.startsWith('#/practice')) return 'practice';
    if (currentPath.startsWith('#/timed')) return 'timed';
    return 'random';
  };

  const currentMode = getModeFromPath();

  const handleSelectMode = (newMode: GameMode) => {
    if (newMode === 'daily') {
      window.location.hash = '#/daily';
    } else if (newMode === 'practice') {
      window.location.hash = '#/practice';
    } else if (newMode === 'timed') {
      window.location.hash = '#/timed';
    } else {
      window.location.hash = '#/';
    }
  };

  // Shared props for game pages
  const gameProps = {
    hardMode,
    soundEnabled,
    animationsEnabled,
    highContrast,
    wordLength,
    difficulty,
    onWordLengthChange: setWordLength,
    onDifficultyChange: setDifficulty,
    onOpenStats: () => setStatsModalOpen(true),
    onOpenSettings: () => setSettingsModalOpen(true),
    onOpenHelp: () => setHowToPlayModalOpen(true),
    dailyStreak,
    onGameEnd: recordGameResult,
  };

  // Render current page
  const renderCurrentPage = () => {
    if (currentPath.startsWith('#/daily')) {
      return <DailyPage {...gameProps} />;
    }
    if (currentPath.startsWith('#/practice')) {
      return <PracticePage {...gameProps} />;
    }
    if (currentPath.startsWith('#/timed')) {
      return <TimedPage {...gameProps} />;
    }
    if (currentPath.startsWith('#/how-to-play')) {
      return <HowToPlayPage />;
    }
    if (currentPath.startsWith('#/strategies')) {
      return <StrategiesPage />;
    }
    if (currentPath.startsWith('#/about')) {
      return <AboutPage />;
    }
    if (currentPath.startsWith('#/privacy')) {
      return <PrivacyPage />;
    }
    if (currentPath.startsWith('#/terms')) {
      return <TermsPage />;
    }
    if (currentPath.startsWith('#/contact')) {
      return <ContactPage />;
    }
    return <HomePage {...gameProps} />;
  };

  return (
    <div className={`min-h-screen flex flex-col ${!animationsEnabled ? 'reduced-motion' : ''}`}>
      {/* Universal Header */}
      <Header
        currentMode={currentMode}
        onSelectMode={handleSelectMode}
        onOpenHelp={() => setHowToPlayModalOpen(true)}
        onOpenStats={() => setStatsModalOpen(true)}
        onOpenSettings={() => setSettingsModalOpen(true)}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      {/* Main Page Area */}
      <div className="flex-1 flex flex-col">{renderCurrentPage()}</div>

      {/* Universal Footer */}
      <Footer />

      {/* Global Modals */}
      <StatisticsModal
        isOpen={statsModalOpen}
        onClose={() => setStatsModalOpen(false)}
        stats={stats}
        dailyStreak={dailyStreak}
        history={history}
        onResetStats={resetStats}
        onClearHistory={clearHistory}
      />

      <SettingsModal
        isOpen={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
        theme={theme}
        onThemeChange={setTheme}
        hardMode={hardMode}
        onHardModeToggle={() => setHardMode(prev => !prev)}
        soundEnabled={soundEnabled}
        onSoundToggle={() => setSoundEnabled(prev => !prev)}
        animationsEnabled={animationsEnabled}
        onAnimationsToggle={() => setAnimationsEnabled(prev => !prev)}
        highContrast={highContrast}
        onHighContrastToggle={() => setHighContrast(prev => !prev)}
        wordLength={wordLength}
        onWordLengthChange={setWordLength}
        difficulty={difficulty}
        onDifficultyChange={setDifficulty}
        isGameInProgress={false}
      />

      <HowToPlayModal
        isOpen={howToPlayModalOpen}
        onClose={() => setHowToPlayModalOpen(false)}
        highContrast={highContrast}
      />
    </div>
  );
};
