import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useTheme } from '../hooks/useTheme';
import { useStatistics, type GameResult } from '../hooks/useStatistics';
import type { Difficulty, GameHistoryItem, GameStats, ThemeMode, WordLength } from '../game/types';
import { STORAGE_KEYS } from '../utils/constants';

export interface Settings {
  hardMode: boolean;
  soundEnabled: boolean;
  animationsEnabled: boolean;
  highContrast: boolean;
  wordLength: WordLength;
  difficulty: Difficulty;
}

type ModalName = 'help' | 'stats' | 'settings' | null;

interface AppContextValue {
  settings: Settings;
  updateSettings: (patch: Partial<Settings>) => void;
  theme: ThemeMode;
  isDark: boolean;
  setTheme: (t: ThemeMode) => void;
  toggleTheme: () => void;
  stats: GameStats;
  history: GameHistoryItem[];
  recordGameResult: (r: GameResult) => void;
  resetStats: () => void;
  clearHistory: () => void;
  modal: ModalName;
  openModal: (m: Exclude<ModalName, null>) => void;
  closeModal: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

const k = (name: string) => `${STORAGE_KEYS.SETTINGS}_${name}`;

/**
 * One home for settings, stats and the global dialogs. Each setting keeps the
 * localStorage key it had before, so returning players keep their choices.
 */
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme, setTheme, isDark, toggleTheme } = useTheme();
  const [hardMode, setHardMode] = useLocalStorage<boolean>(k('hard_mode'), false);
  const [soundEnabled, setSoundEnabled] = useLocalStorage<boolean>(k('sound'), true);
  const [animationsEnabled, setAnimationsEnabled] = useLocalStorage<boolean>(k('animations'), true);
  const [highContrast, setHighContrast] = useLocalStorage<boolean>(k('high_contrast'), false);
  const [wordLength, setWordLength] = useLocalStorage<WordLength>(k('word_length'), 5);
  const [difficulty, setDifficulty] = useLocalStorage<Difficulty>(k('difficulty'), 'medium');
  const { stats, history, recordGameResult, resetStats, clearHistory } = useStatistics();
  const [modal, setModal] = useState<ModalName>(null);

  const settings = useMemo<Settings>(
    () => ({ hardMode, soundEnabled, animationsEnabled, highContrast, wordLength, difficulty }),
    [hardMode, soundEnabled, animationsEnabled, highContrast, wordLength, difficulty]
  );

  const updateSettings = useCallback(
    (patch: Partial<Settings>) => {
      if (patch.hardMode !== undefined) setHardMode(patch.hardMode);
      if (patch.soundEnabled !== undefined) setSoundEnabled(patch.soundEnabled);
      if (patch.animationsEnabled !== undefined) setAnimationsEnabled(patch.animationsEnabled);
      if (patch.highContrast !== undefined) setHighContrast(patch.highContrast);
      if (patch.wordLength !== undefined) setWordLength(patch.wordLength);
      if (patch.difficulty !== undefined) setDifficulty(patch.difficulty);
    },
    [setHardMode, setSoundEnabled, setAnimationsEnabled, setHighContrast, setWordLength, setDifficulty]
  );

  useEffect(() => {
    document.documentElement.classList.toggle('high-contrast', highContrast);
  }, [highContrast]);

  useEffect(() => {
    document.documentElement.classList.toggle('reduced-motion', !animationsEnabled);
  }, [animationsEnabled]);

  // Show the rules once, the first time someone visits.
  useEffect(() => {
    try {
      if (!localStorage.getItem(k('seen_help'))) {
        const id = window.setTimeout(() => {
          localStorage.setItem(k('seen_help'), '1');
          setModal('help');
        }, 600);
        return () => window.clearTimeout(id);
      }
    } catch {
      // storage blocked: skip the welcome
    }
  }, []);

  const openModal = useCallback((m: Exclude<ModalName, null>) => setModal(m), []);
  const closeModal = useCallback(() => setModal(null), []);

  const value: AppContextValue = {
    settings,
    updateSettings,
    theme,
    isDark,
    setTheme,
    toggleTheme,
    stats,
    history,
    recordGameResult,
    resetStats,
    clearHistory,
    modal,
    openModal,
    closeModal,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>');
  return ctx;
}
