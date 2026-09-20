import { useEffect } from 'react';

interface UseKeyboardProps {
  onChar: (char: string) => void;
  onEnter: () => void;
  onDelete: () => void;
  disabled?: boolean;
}

export function useKeyboard({ onChar, onEnter, onDelete, disabled = false }: UseKeyboardProps) {
  useEffect(() => {
    if (disabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is inside a form input/textarea or using browser shortcuts
      if (
        e.altKey ||
        e.ctrlKey ||
        e.metaKey ||
        ['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)
      ) {
        return;
      }

      const key = e.key;

      if (key === 'Enter') {
        e.preventDefault();
        onEnter();
      } else if (key === 'Backspace') {
        e.preventDefault();
        onDelete();
      } else if (/^[a-zA-Z]$/.test(key)) {
        e.preventDefault();
        onChar(key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onChar, onEnter, onDelete, disabled]);
}
