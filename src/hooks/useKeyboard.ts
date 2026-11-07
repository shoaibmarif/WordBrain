import { useEffect, useRef } from 'react';

interface UseKeyboardProps {
  onChar: (char: string) => void;
  onEnter: () => void;
  onDelete: () => void;
  disabled?: boolean;
}

/** Physical keyboard input for the board. */
export function useKeyboard({ onChar, onEnter, onDelete, disabled = false }: UseKeyboardProps) {
  const handlers = useRef({ onChar, onEnter, onDelete });
  handlers.current = { onChar, onEnter, onDelete };

  useEffect(() => {
    if (disabled) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey || e.defaultPrevented) return;
      const target = e.target as HTMLElement | null;
      if (target && (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) || target.isContentEditable)) return;
      // Don't type into the board behind an open dialog.
      if (document.querySelector('[role="dialog"][aria-modal="true"]')) return;
      // Let Enter activate a focused button or link instead of submitting a guess.
      if (e.key === 'Enter' && target && target.closest('a, button')) return;

      if (e.key === 'Enter') {
        e.preventDefault();
        handlers.current.onEnter();
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        handlers.current.onDelete();
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        e.preventDefault();
        handlers.current.onChar(e.key.toUpperCase());
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [disabled]);
}
