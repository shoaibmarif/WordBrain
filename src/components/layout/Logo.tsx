import React from 'react';
import { Link } from 'react-router-dom';

/** A single letterpress tile with the wordmark beside it. */
export const Logo: React.FC<{ className?: string }> = ({ className = '' }) => (
  <Link to="/" className={`group inline-flex items-center gap-2.5 ${className}`} aria-label="WordBrain home">
    <span
      className="flex h-8 w-8 sm:h-9 sm:w-9 -rotate-6 items-center justify-center rounded-lg border-2 border-ink bg-card font-display text-xl font-extrabold text-ink shadow-[3px_3px_0_var(--color-accent)] transition-transform duration-200 group-hover:rotate-0"
      aria-hidden="true"
    >
      W
    </span>
    <span className="font-display text-[1.2rem] sm:text-[1.35rem] font-bold tracking-tight text-ink">
      Word<span className="italic text-accent">Brain</span>
    </span>
  </Link>
);
