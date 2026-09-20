import React from 'react';
import { Modal } from '../common/Modal';
import { HintType } from '../../game/types';
import { Lightbulb, HelpCircle, XCircle } from 'lucide-react';

interface HintModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectHint: (type: HintType) => void;
  hintsUsed: number;
}

export const HintModal: React.FC<HintModalProps> = ({
  isOpen,
  onClose,
  onSelectHint,
  hintsUsed,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Practice Hints" maxWidthClass="max-w-sm">
      <div className="space-y-4 text-sm">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Need a nudge? Hints are available in Practice Mode to help you practice your vocabulary.
          (Hints used: <strong className="text-emerald-600">{hintsUsed}</strong>)
        </p>

        <div className="space-y-2.5">
          <button
            type="button"
            onClick={() => {
              onSelectHint('reveal_letter');
              onClose();
            }}
            className="w-full p-3.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700/80 rounded-xl text-left flex items-start gap-3 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
          >
            <Lightbulb className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
            <div>
              <p className="font-bold text-slate-900 dark:text-slate-100">Reveal Letter & Position</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Reveals one unconfirmed letter and its exact position in the word.
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              onSelectHint('eliminate_letters');
              onClose();
            }}
            className="w-full p-3.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700/80 rounded-xl text-left flex items-start gap-3 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
          >
            <XCircle className="w-5 h-5 text-rose-500 mt-0.5 shrink-0" />
            <div>
              <p className="font-bold text-slate-900 dark:text-slate-100">Eliminate 3 Unused Letters</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Crosses out three letters on the keyboard that do not appear in the secret word.
              </p>
            </div>
          </button>
        </div>
      </div>
    </Modal>
  );
};
