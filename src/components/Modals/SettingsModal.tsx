import React from 'react';
import { Modal } from '../common/Modal';
import { Difficulty, ThemeMode, WordLength } from '../../game/types';
import { Volume2, VolumeX, Eye, Moon, Sun, Monitor, Sparkles } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeMode;
  onThemeChange: (t: ThemeMode) => void;
  hardMode: boolean;
  onHardModeToggle: () => void;
  soundEnabled: boolean;
  onSoundToggle: () => void;
  animationsEnabled: boolean;
  onAnimationsToggle: () => void;
  highContrast: boolean;
  onHighContrastToggle: () => void;
  wordLength: WordLength;
  onWordLengthChange: (len: WordLength) => void;
  difficulty: Difficulty;
  onDifficultyChange: (diff: Difficulty) => void;
  isGameInProgress: boolean;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  theme,
  onThemeChange,
  hardMode,
  onHardModeToggle,
  soundEnabled,
  onSoundToggle,
  animationsEnabled,
  onAnimationsToggle,
  highContrast,
  onHighContrastToggle,
  wordLength,
  onWordLengthChange,
  difficulty,
  onDifficultyChange,
  isGameInProgress,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Settings" maxWidthClass="max-w-md">
      <div className="space-y-5 text-sm">
        {/* Theme Selection */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-slate-900 dark:text-slate-100">Theme</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Select interface appearance</p>
          </div>
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => onThemeChange('light')}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                theme === 'light'
                  ? 'bg-white dark:bg-slate-700 text-amber-500 shadow-sm'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
              title="Light"
            >
              <Sun className="w-4 h-4" />
            </button>
            <button
              onClick={() => onThemeChange('dark')}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                theme === 'dark'
                  ? 'bg-white dark:bg-slate-700 text-indigo-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
              title="Dark"
            >
              <Moon className="w-4 h-4" />
            </button>
            <button
              onClick={() => onThemeChange('system')}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                theme === 'system'
                  ? 'bg-white dark:bg-slate-700 text-emerald-500 shadow-sm'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
              title="System"
            >
              <Monitor className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Hard Mode */}
        <div className="flex items-center justify-between">
          <div className="pr-4">
            <p className="font-semibold text-slate-900 dark:text-slate-100">Hard Mode</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Any revealed clues must be used in subsequent guesses
            </p>
            {isGameInProgress && (
              <p className="text-[11px] text-amber-600 dark:text-amber-400 mt-0.5">
                Can only be toggled at the start of a round
              </p>
            )}
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={hardMode}
            disabled={isGameInProgress}
            onClick={onHardModeToggle}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              isGameInProgress ? 'opacity-50 cursor-not-allowed' : ''
            } ${hardMode ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'}`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                hardMode ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* High Contrast / Color Accessibility */}
        <div className="flex items-center justify-between">
          <div className="pr-4">
            <p className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-sky-500" />
              High Contrast / Colorblind Mode
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Uses high-contrast orange & blue palette plus tactile icon badges
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={highContrast}
            onClick={onHighContrastToggle}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              highContrast ? 'bg-orange-600' : 'bg-slate-300 dark:bg-slate-700'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                highContrast ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Sound Effects */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-emerald-500" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-400" />
              )}
              Sound Effects
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Key clicks, tile reveals, and win chimes</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={soundEnabled}
            onClick={onSoundToggle}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              soundEnabled ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                soundEnabled ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Animations */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Animations
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Tile flips, bounces, and celebratory effects</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={animationsEnabled}
            onClick={onAnimationsToggle}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              animationsEnabled ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                animationsEnabled ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Word Length Selector */}
        <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
          <label className="block font-semibold text-slate-900 dark:text-slate-100 mb-1">
            Word Length (Random & Practice)
          </label>
          <div className="grid grid-cols-4 gap-2">
            {([5, 6, 7, 8] as WordLength[]).map(len => (
              <button
                key={len}
                type="button"
                onClick={() => onWordLengthChange(len)}
                className={`py-2 text-xs font-bold rounded-lg border transition-colors cursor-pointer ${
                  wordLength === len
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
                }`}
              >
                {len} Letters
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty Selector */}
        <div>
          <label className="block font-semibold text-slate-900 dark:text-slate-100 mb-1">
            Vocabulary Difficulty
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['easy', 'medium', 'hard'] as Difficulty[]).map(diff => (
              <button
                key={diff}
                type="button"
                onClick={() => onDifficultyChange(diff)}
                className={`py-2 text-xs font-bold capitalize rounded-lg border transition-colors cursor-pointer ${
                  difficulty === diff
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};
