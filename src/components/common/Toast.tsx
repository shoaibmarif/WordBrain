import React from 'react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed top-16 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-200"
    >
      <div className="bg-slate-900/90 text-white dark:bg-slate-100/95 dark:text-slate-900 font-bold px-4 py-2.5 rounded-lg shadow-xl text-sm sm:text-base tracking-wide flex items-center gap-2 border border-slate-700/50 backdrop-blur-md">
        <span>{message}</span>
      </div>
    </div>
  );
};
