import React from 'react';

/** Short message above the board ("Not in our word list" and so on). */
export const Toast: React.FC<{ message: string | null }> = ({ message }) => (
  <div aria-live="polite" role="status" className="pointer-events-none absolute inset-x-0 top-2 z-30 flex justify-center">
    {message && (
      <span className="animate-pop rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper shadow-lg">
        {message}
      </span>
    )}
  </div>
);
