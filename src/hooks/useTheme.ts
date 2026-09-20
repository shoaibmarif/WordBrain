import { useEffect, useState, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { ThemeMode } from '../game/types';
import { STORAGE_KEYS } from '../utils/constants';

export function useTheme() {
  const [theme, setTheme] = useLocalStorage<ThemeMode>(
    `${STORAGE_KEYS.SETTINGS}_theme`,
    'system'
  );

  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    if (theme === 'dark') return true;
    if (theme === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () => {
      const activeDark =
        theme === 'dark' || (theme === 'system' && mediaQuery.matches);
      setIsDark(activeDark);
      if (activeDark) {
        root.classList.add('dark');
        root.setAttribute('data-theme', 'dark');
      } else {
        root.classList.remove('dark');
        root.setAttribute('data-theme', 'light');
      }
    };

    applyTheme();

    const handler = () => {
      if (theme === 'system') applyTheme();
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      if (prev === 'dark') return 'light';
      if (prev === 'light') return 'dark';
      // If was system, toggle opposite to system preference
      const isSysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return isSysDark ? 'light' : 'dark';
    });
  }, [setTheme]);

  return { theme, setTheme, isDark, toggleTheme };
}
