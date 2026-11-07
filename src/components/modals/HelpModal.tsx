import React from 'react';
import { Link } from 'react-router-dom';
import { Modal } from '../ui/Modal';
import { ExampleRow } from '../game/ExampleRow';

export const HelpModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => (
  <Modal open={open} onClose={onClose} title="How to play" subtitle="Find the hidden word in six tries.">
    <div className="space-y-5 text-[15px] leading-7 text-ink-2">
      <p>Type any real word of the right length and press Enter. The tiles change colour to show how close you got.</p>
      <div className="space-y-4">
        <div>
          <ExampleRow word="CRANE" states={{ 0: 'correct' }} />
          <p className="mt-1.5">
            <strong className="text-ink">C</strong> is in the word and in the right spot.
          </p>
        </div>
        <div>
          <ExampleRow word="PILOT" states={{ 2: 'present' }} />
          <p className="mt-1.5">
            <strong className="text-ink">L</strong> is in the word, just somewhere else.
          </p>
        </div>
        <div>
          <ExampleRow word="VAGUE" states={{ 3: 'absent' }} />
          <p className="mt-1.5">
            <strong className="text-ink">U</strong> isn’t in the word at all.
          </p>
        </div>
      </div>
      <p>
        Letters can repeat. Each tile only matches one letter in the answer, so if just one of your two Es lights up, there’s only
        one E.
      </p>
      <p className="border-t-2 border-dashed border-line pt-4 text-sm">
        Want more? Read the <Link to="/how-to-play" onClick={onClose} className="font-semibold text-ink underline underline-offset-2">full rules</Link> or
        some <Link to="/strategies" onClick={onClose} className="font-semibold text-ink underline underline-offset-2">tips that actually help</Link>.
      </p>
    </div>
  </Modal>
);
