import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CONSENT_EVENT, getConsent, setConsent, type ConsentChoice } from '../../lib/consent';

/**
 * A small notice, not a wall: analytics is on unless you opt out, and the
 * choice is remembered. "Cookie settings" in the footer brings it back.
 */
export const ConsentBanner: React.FC = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(getConsent() === null);
    const reopen = () => setOpen(true);
    window.addEventListener(CONSENT_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_EVENT, reopen);
  }, []);

  if (!open) return null;

  const choose = (c: ConsentChoice) => {
    setConsent(c);
    setOpen(false);
  };

  return (
    <div
      role="region"
      aria-label="Analytics notice"
      className="block-card animate-modal-in fixed inset-x-3 bottom-3 z-50 mx-auto max-w-md p-4 sm:inset-x-auto sm:bottom-5 sm:right-5"
    >
      <p className="text-sm leading-6 text-ink-2">
        We count visits with Google Analytics so we know which modes people like. No ads and nothing sold.{' '}
        <Link to="/privacy" className="font-semibold text-ink underline underline-offset-2">
          Privacy policy
        </Link>
      </p>
      <div className="mt-3 flex gap-2">
        <button type="button" onClick={() => choose('granted')} className="btn btn-accent btn-sm">
          Fine by me
        </button>
        <button type="button" onClick={() => choose('denied')} className="btn btn-plain btn-sm">
          Opt out
        </button>
      </div>
    </div>
  );
};
