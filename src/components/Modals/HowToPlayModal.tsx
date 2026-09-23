import React from 'react';
import { Modal } from '../common/Modal';
import { LetterTile } from '../GameBoard/LetterTile';

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
  highContrast?: boolean;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({
  isOpen,
  onClose,
  highContrast = false,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="How to Play" maxWidthClass="max-w-lg">
      <div className="space-y-4 text-sm">
        <p>
          Guess the hidden word in <strong>6 attempts</strong>.
        </p>
        <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 pl-1">
          <li>Each guess must be a valid dictionary word.</li>
          <li>Hit the <strong>Enter</strong> button to submit your guess.</li>
          <li>After each guess, the color of the tiles will change to show how close your guess was.</li>
        </ul>

        {/* Visual Examples */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-4">
          <p className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Examples
          </p>

          {/* Example 1: Correct */}
          <div className="space-y-1.5">
            <div className="flex gap-1.5 w-48">
              <LetterTile char="W" state="correct" highContrast={highContrast} />
              <LetterTile char="E" state="empty" highContrast={highContrast} />
              <LetterTile char="A" state="empty" highContrast={highContrast} />
              <LetterTile char="R" state="empty" highContrast={highContrast} />
              <LetterTile char="Y" state="empty" highContrast={highContrast} />
            </div>
            <p className="text-xs">
              <strong className="text-emerald-600 dark:text-emerald-400 font-bold">W</strong> is in the
              word and in the <strong>correct spot</strong>.
            </p>
          </div>

          {/* Example 2: Present */}
          <div className="space-y-1.5">
            <div className="flex gap-1.5 w-48">
              <LetterTile char="P" state="empty" highContrast={highContrast} />
              <LetterTile char="I" state="present" highContrast={highContrast} />
              <LetterTile char="L" state="empty" highContrast={highContrast} />
              <LetterTile char="O" state="empty" highContrast={highContrast} />
              <LetterTile char="T" state="empty" highContrast={highContrast} />
            </div>
            <p className="text-xs">
              <strong className="text-amber-500 font-bold">I</strong> is in the word but in the{' '}
              <strong>wrong spot</strong>.
            </p>
          </div>

          {/* Example 3: Absent */}
          <div className="space-y-1.5">
            <div className="flex gap-1.5 w-48">
              <LetterTile char="V" state="empty" highContrast={highContrast} />
              <LetterTile char="A" state="empty" highContrast={highContrast} />
              <LetterTile char="G" state="empty" highContrast={highContrast} />
              <LetterTile char="U" state="absent" highContrast={highContrast} />
              <LetterTile char="E" state="empty" highContrast={highContrast} />
            </div>
            <p className="text-xs">
              <strong className="text-slate-500 font-bold">U</strong> is <strong>not in the word</strong> in
              any spot.
            </p>
          </div>
        </div>

        {/* Unlimited Puzzles Note */}
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800/50 text-xs">
          <strong className="text-emerald-700 dark:text-emerald-300 block mb-0.5">
            Unlimited Play
          </strong>
          Play as many puzzles as you like! Switch word lengths (5 to 8 letters), use Practice hints, or test your speed in Timed mode.
        </div>
      </div>
    </Modal>
  );
};
