import React, { useState } from 'react';
import { GameMode } from '../../game/types';
import { APP_NAME, APP_SUBTITLE } from '../../utils/constants';
import {
  HelpCircle,
  BarChart3,
  Settings,
  Lightbulb,
  Menu,
  X,
  Calendar,
  Shuffle,
  Compass,
  Timer as TimerIcon,
  Pause,
  Play,
  Sun,
  Moon,
  Brain,
} from 'lucide-react';

interface HeaderProps {
  currentMode: GameMode;
  onSelectMode: (mode: GameMode) => void;
  onOpenHelp: () => void;
  onOpenStats: () => void;
  onOpenSettings: () => void;
  onOpenHints?: () => void;
  isTimedMode?: boolean;
  isPaused?: boolean;
  onTogglePause?: () => void;
  formattedTime?: string;
  isDark?: boolean;
  onToggleTheme?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentMode,
  onSelectMode,
  onOpenHelp,
  onOpenStats,
  onOpenSettings,
  onOpenHints,
  isTimedMode = false,
  isPaused = false,
  onTogglePause,
  formattedTime,
  isDark = false,
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigateTo = (path: string) => {
    window.location.hash = path;
    setMobileMenuOpen(false);
  };

  return (
    <header className="w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/85 dark:bg-[#0c121e]/85 backdrop-blur-md sticky top-0 z-30 select-none transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-3 sm:px-4 h-14 sm:h-16 flex items-center justify-between">
        {/* Left: Mobile menu toggle + Mode Tabs for Desktop */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label="Toggle navigation menu"
            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Desktop Mode Badges */}
          <nav className="hidden md:flex items-center gap-1 text-xs font-semibold p-1 bg-slate-100/80 dark:bg-slate-800/60 rounded-xl border border-slate-200/60 dark:border-slate-700/50">
            <button
              onClick={() => {
                onSelectMode('daily');
                navigateTo('#/daily');
              }}
              className={`px-3 py-1.5 rounded-lg transition-all duration-150 cursor-pointer flex items-center gap-1.5 ${
                currentMode === 'daily'
                  ? 'bg-emerald-600 text-white shadow-sm font-bold scale-[1.02]'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/60 dark:hover:bg-slate-700/60'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              Daily
            </button>
            <button
              onClick={() => {
                onSelectMode('random');
                navigateTo('#/');
              }}
              className={`px-3 py-1.5 rounded-lg transition-all duration-150 cursor-pointer flex items-center gap-1.5 ${
                currentMode === 'random'
                  ? 'bg-emerald-600 text-white shadow-sm font-bold scale-[1.02]'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/60 dark:hover:bg-slate-700/60'
              }`}
            >
              <Shuffle className="w-3.5 h-3.5" />
              Random
            </button>
            <button
              onClick={() => {
                onSelectMode('practice');
                navigateTo('#/practice');
              }}
              className={`px-3 py-1.5 rounded-lg transition-all duration-150 cursor-pointer flex items-center gap-1.5 ${
                currentMode === 'practice'
                  ? 'bg-emerald-600 text-white shadow-sm font-bold scale-[1.02]'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/60 dark:hover:bg-slate-700/60'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              Practice
            </button>
            <button
              onClick={() => {
                onSelectMode('timed');
                navigateTo('#/timed');
              }}
              className={`px-3 py-1.5 rounded-lg transition-all duration-150 cursor-pointer flex items-center gap-1.5 ${
                currentMode === 'timed'
                  ? 'bg-emerald-600 text-white shadow-sm font-bold scale-[1.02]'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/60 dark:hover:bg-slate-700/60'
              }`}
            >
              <TimerIcon className="w-3.5 h-3.5" />
              Timed
            </button>
          </nav>
        </div>

        {/* Center: Brand Title with Brain Icon */}
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => navigateTo('#/')}
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-sm shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-200">
            <Brain className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg sm:text-xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5 leading-none">
              <span>{APP_NAME}</span>
            </h1>
            <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              {APP_SUBTITLE}
            </span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {/* Practice Mode Hint Button */}
          {currentMode === 'practice' && onOpenHints && (
            <button
              type="button"
              onClick={onOpenHints}
              aria-label="Hints"
              title="Practice Hint"
              className="p-1.5 sm:p-2 rounded-lg text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/50 transition-colors cursor-pointer"
            >
              <Lightbulb className="w-5 h-5 fill-amber-500/20" />
            </button>
          )}

          {/* Timed Mode Pause/Resume & Clock */}
          {isTimedMode && formattedTime && (
            <div className="flex items-center gap-1 px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-mono font-bold border border-slate-200 dark:border-slate-700">
              <span className={isPaused ? 'text-amber-500' : 'text-emerald-600 dark:text-emerald-400'}>
                {formattedTime}
              </span>
              {onTogglePause && (
                <button
                  type="button"
                  onClick={onTogglePause}
                  aria-label={isPaused ? 'Resume timer' : 'Pause timer'}
                  className="p-0.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 cursor-pointer"
                >
                  {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                </button>
              )}
            </div>
          )}

          {/* 1-Click Quick Theme Switcher (Light / Dark) */}
          {onToggleTheme && (
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              className="p-1.5 sm:p-2 rounded-lg text-slate-600 dark:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              {isDark ? <Sun className="w-5 h-5 transition-transform hover:rotate-45" /> : <Moon className="w-5 h-5 transition-transform hover:-rotate-12" />}
            </button>
          )}

          {/* How to Play */}
          <button
            type="button"
            onClick={onOpenHelp}
            aria-label="How to play"
            title="How to play"
            className="p-1.5 sm:p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <HelpCircle className="w-5 h-5" />
          </button>

          {/* Statistics */}
          <button
            type="button"
            onClick={onOpenStats}
            aria-label="Statistics"
            title="Statistics"
            className="p-1.5 sm:p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <BarChart3 className="w-5 h-5" />
          </button>

          {/* Settings */}
          <button
            type="button"
            onClick={onOpenSettings}
            aria-label="Settings"
            title="Settings"
            className="p-1.5 sm:p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c121e] px-4 py-3 space-y-3 text-sm shadow-xl">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Game Modes</p>
            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-600" />}
                <span>{isDark ? 'Light Theme' : 'Dark Theme'}</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onSelectMode('daily');
                navigateTo('#/daily');
              }}
              className={`p-2.5 rounded-xl text-left font-bold flex items-center gap-2 cursor-pointer transition-colors ${
                currentMode === 'daily'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200'
              }`}
            >
              <Calendar className="w-4 h-4" />
              Daily Word
            </button>
            <button
              onClick={() => {
                onSelectMode('random');
                navigateTo('#/');
              }}
              className={`p-2.5 rounded-xl text-left font-bold flex items-center gap-2 cursor-pointer transition-colors ${
                currentMode === 'random'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200'
              }`}
            >
              <Shuffle className="w-4 h-4" />
              Random
            </button>
            <button
              onClick={() => {
                onSelectMode('practice');
                navigateTo('#/practice');
              }}
              className={`p-2.5 rounded-xl text-left font-bold flex items-center gap-2 cursor-pointer transition-colors ${
                currentMode === 'practice'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200'
              }`}
            >
              <Compass className="w-4 h-4" />
              Practice
            </button>
            <button
              onClick={() => {
                onSelectMode('timed');
                navigateTo('#/timed');
              }}
              className={`p-2.5 rounded-xl text-left font-bold flex items-center gap-2 cursor-pointer transition-colors ${
                currentMode === 'timed'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200'
              }`}
            >
              <TimerIcon className="w-4 h-4" />
              Timed
            </button>
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Information & Guides
            </p>
            <div className="grid grid-cols-2 gap-1.5 text-slate-600 dark:text-slate-300 text-xs">
              <button
                onClick={() => navigateTo('#/how-to-play')}
                className="text-left py-1 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer"
              >
                How to Play Guide
              </button>
              <button
                onClick={() => navigateTo('#/strategies')}
                className="text-left py-1 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer"
              >
                Best Strategies
              </button>
              <button
                onClick={() => navigateTo('#/about')}
                className="text-left py-1 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer"
              >
                About WordBrain
              </button>
              <button
                onClick={() => navigateTo('#/privacy')}
                className="text-left py-1 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => navigateTo('#/terms')}
                className="text-left py-1 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer"
              >
                Terms of Service
              </button>
              <button
                onClick={() => navigateTo('#/contact')}
                className="text-left py-1 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
