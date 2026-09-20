import React from 'react';
import { Modal } from '../common/Modal';
import { Difficulty, ThemeMode, WordLength } from '../../game/types';
import { Volume2, VolumeX, Eye, Moon, Sun, Monitor, Sparkles, Palette, Check } from 'lucide-react';

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
    <Modal isOpen={isOpen} onClose={onClose} title="Game Settings & Appearance" maxWidthClass="max-w-md">
      <div className="space-y-6 text-sm">
        {/* Visual Theme / Template Selection */}
        <div>
          <div className="flex items-center gap-2 mb-2.5">
            <Palette className="w-4 h-4 text-emerald-500" />
            <p className="font-bold text-slate-900 dark:text-slate-100">Theme Template</p>
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            {/* Light Template Card */}
            <button
              type="button"
              onClick={() => onThemeChange('light')}
              className={`p-3 rounded-xl border-2 text-left cursor-pointer transition-all ${
                theme === 'light'
                  ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 ring-2 ring-emerald-500/20'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="p-1 rounded-md bg-amber-100 text-amber-600">
                  <Sun className="w-4 h-4" />
                </div>
                {theme === 'light' && <Check className="w-3.5 h-3.5 text-emerald-600 font-bold" />}
              </div>
              <p className="font-bold text-slate-900 dark:text-white text-xs">Light</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Crisp & Clean</p>
            </button>

            {/* Dark Template Card */}
            <button
              type="button"
              onClick={() => onThemeChange('dark')}
              className={`p-3 rounded-xl border-2 text-left cursor-pointer transition-all ${
                theme === 'dark'
                  ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 ring-2 ring-emerald-500/20'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="p-1 rounded-md bg-indigo-900/40 text-indigo-400">
                  <Moon className="w-4 h-4" />
                </div>
                {theme === 'dark' && <Check className="w-3.5 h-3.5 text-emerald-500 font-bold" />}
              </div>
              <p className="font-bold text-slate-900 dark:text-white text-xs">Dark</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Deep Obsidian</p>
            </button>

            {/* System Card */}
            <button
              type="button"
              onClick={() => onThemeChange('system')}
              className={`p-3 rounded-xl border-2 text-left cursor-pointer transition-all ${
                theme === 'system'
                  ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 ring-2 ring-emerald-500/20'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="p-1 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  <Monitor className="w-4 h-4" />
                </div>
                {theme === 'system' && <Check className="w-3.5 h-3.5 text-emerald-500 font-bold" />}
              </div>
              <p className="font-bold text-slate-900 dark:text-white text-xs">System</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Auto Detect</p>
            </button>
          </div>
        </div>

        {/* Hard Mode */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
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
          <label className="block font-semibold text-slate-900 dark:text-slate-100 mb-1.5">
            Word Length (Random & Practice)
          </label>
          <div className="grid grid-cols-4 gap-2">
            {([5, 6, 7, 8] as WordLength[]).map(len => (
              <button
                key={len}
                type="button"
                onClick={() => onWordLengthChange(len)}
                className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  wordLength === len
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {len} Letters
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty Selector */}
        <div>
          <label className="block font-semibold text-slate-900 dark:text-slate-100 mb-1.5">
            Vocabulary Difficulty
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['easy', 'medium', 'hard'] as Difficulty[]).map(diff => (
              <button
                key={diff}
                type="button"
                onClick={() => onDifficultyChange(diff)}
                className={`py-2 text-xs font-bold capitalize rounded-xl border transition-all cursor-pointer ${
                  difficulty === diff
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
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
