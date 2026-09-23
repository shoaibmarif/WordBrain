import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const FAQS_DATA = [
  {
    question: 'How do I play the word guessing game?',
    answer:
      'Enter a valid word into the grid using your keyboard. After submitting your guess, each tile color provides feedback: green indicates the letter is in the correct spot, yellow indicates the letter is in the word but a different position, and gray indicates the letter is not in the word.',
  },
  {
    question: 'How many attempts do I get?',
    answer:
      'In the standard mode, you have 6 attempts to deduce the hidden 5-letter word. The attempt count and word length can also be customized for 6, 7, or 8 letter words in the settings.',
  },
  {
    question: 'What does a correct (green/orange) letter mean?',
    answer:
      'A correct letter means that the letter exists in the secret word and you have placed it in the exact right position.',
  },
  {
    question: 'What does a misplaced (yellow/blue) letter mean?',
    answer:
      'A misplaced letter means that the letter occurs in the target word, but you placed it in the wrong slot.',
  },
  {
    question: 'What does a gray/absent letter mean?',
    answer:
      'A gray letter means that this letter does not appear anywhere in the remaining unconfirmed positions of the secret word.',
  },
  {
    question: 'Is the game free?',
    answer:
      'Yes, the game is 100% free to play. There are no subscriptions, paywalls, or accounts required.',
  },
  {
    question: 'Can I play on mobile devices?',
    answer:
      'Yes, the application is mobile-first, supporting responsive touch keyboards, adaptive sizing, and smooth performance on iOS, Android, tablets, and desktops.',
  },
  {
    question: 'Can I play unlimited games?',
    answer:
      'Yes! WordBrain allows you to play unlimited puzzles with no daily limits or restrictions. You can play Random mode, practice with hints, or race against the clock in Timed mode anytime.',
  },
  {
    question: 'Are my game statistics and streaks saved?',
    answer:
      'Yes, all your game statistics, win streaks, and recent puzzle history are securely saved in your browser localStorage. No data is sent to external servers.',
  },
];

export const FaqAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(prev => (prev === idx ? null : idx));
  };

  return (
    <section className="max-w-3xl mx-auto px-4 py-8">
      <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 mb-6 text-center sm:text-left">
        Frequently Asked Questions
      </h3>

      <div className="space-y-3">
        {FAQS_DATA.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900 transition-colors"
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full px-5 py-4 text-left flex items-center justify-between font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer transition-colors"
              >
                <span>{faq.question}</span>
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-emerald-600 shrink-0 ml-2" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400 shrink-0 ml-2" />
                )}
              </button>

              {isOpen && (
                <div className="px-5 pb-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
