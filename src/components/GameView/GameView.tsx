import React, { useState, useEffect } from 'react';
import { GameMode, HintType, ThemeMode, WordLength, Difficulty } from '../../game/types';
import { useGame } from '../../hooks/useGame';
import { useKeyboard } from '../../hooks/useKeyboard';
import { useTimer } from '../../hooks/useTimer';
import { GameBoard } from '../GameBoard/GameBoard';
import { VirtualKeyboard } from '../Keyboard/VirtualKeyboard';
import { Toast } from '../common/Toast';
import { ResultModal } from '../Modals/ResultModal';
import { HintModal } from '../Modals/HintModal';
import { getDailyPuzzleNumber } from '../../game/dailyPuzzle';
import { GameGuideSection } from '../SeoContent/GameGuideSection';
import { FaqAccordion } from '../SeoContent/FaqAccordion';
import {
  Calendar,
  RotateCcw,
  Sparkles,
  Lightbulb,
  Pause,
  Play,
  Flame,
  Award,
  Clock,
  Layers,
} from 'lucide-react';

interface GameViewProps {
  mode: GameMode;
  hardMode: boolean;
  soundEnabled: boolean;
  animationsEnabled: boolean;
  highContrast: boolean;
  wordLength: WordLength;
  difficulty: Difficulty;
  onWordLengthChange: (len: WordLength) => void;
  onDifficultyChange: (diff: Difficulty) => void;
  onOpenStats: () => void;
  onOpenSettings: () => void;
  onOpenHelp: () => void;
  dailyStreak: { currentStreak: number; maxStreak: number };
  onGameEnd: (params: {
    mode: GameMode;
    wordLength: WordLength;
    targetWord: string;
    guesses: string[];
    won: boolean;
    attemptsUsed: number;
    maxAttempts: number;
    durationSeconds: number;
    hintsUsed: number;
  }) => void;
}

export const GameView: React.FC<GameViewProps> = ({
  mode,
  hardMode,
  soundEnabled,
  animationsEnabled,
  highContrast,
  wordLength: propWordLength,
  difficulty,
  onWordLengthChange,
  onDifficultyChange,
  onOpenStats,
  onOpenSettings,
  onOpenHelp,
  dailyStreak,
  onGameEnd,
}) => {
  const [hintModalOpen, setHintModalOpen] = useState(false);
  const [resultModalOpen, setResultModalOpen] = useState(false);

  // Initialize game hook
  const {
    config,
    targetWord,
    guesses,
    evaluations,
    currentGuess,
    gameStatus,
    keyboardStates,
    toastMessage,
    isShaking,
    hintsUsed,
    dailyCompleted,
    addLetter,
    removeLetter,
    submitGuess,
    handleTimeUp,
    restartGame,
    useHint,
    changeMode,
    changeWordLength,
    changeDifficulty,
    setGameStatus,
  } = useGame({
    initialConfig: {
      mode,
      wordLength: mode === 'daily' ? 5 : propWordLength,
      difficulty,
    },
    hardMode,
    soundEnabled,
    onGameEnd: result => {
      onGameEnd(result);
      // Auto open result modal after brief animation delay
      setTimeout(() => setResultModalOpen(true), 1200);
    },
  });

  // Sync mode and wordLength if props change
  useEffect(() => {
    changeMode(mode);
  }, [mode, changeMode]);

  useEffect(() => {
    if (mode !== 'daily') {
      changeWordLength(propWordLength);
    }
  }, [propWordLength, mode, changeWordLength]);

  useEffect(() => {
    changeDifficulty(difficulty);
  }, [difficulty, changeDifficulty]);

  // Timer hook
  const {
    seconds,
    formattedTime,
    isPaused,
    togglePause,
    resetTimer,
  } = useTimer({
    mode,
    status: gameStatus,
    initialTimeSeconds: 120,
    onTimeUp: handleTimeUp,
  });

  // Handle keyboard inputs
  useKeyboard({
    onChar: addLetter,
    onEnter: submitGuess,
    onDelete: removeLetter,
    disabled: isPaused || gameStatus !== 'playing' || resultModalOpen || hintModalOpen,
  });

  const isModalOpen = resultModalOpen || hintModalOpen;
  const puzzleNum = mode === 'daily' ? getDailyPuzzleNumber() : null;

  return (
    <div className="w-full flex flex-col items-center">
      {/* Toast Feedback */}
      <Toast message={toastMessage} />

      {/* Sub-header status bar */}
      <div className="w-full max-w-md px-3 pt-2 pb-1 flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-400">
        {/* Mode / Puzzle badge */}
        <div className="flex items-center gap-1.5">
          {mode === 'daily' && (
            <span className="flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
              <Calendar className="w-3.5 h-3.5" />
              Daily #{puzzleNum}
            </span>
          )}
          {mode === 'random' && (
            <div className="flex items-center gap-1">
              <span className="font-bold text-slate-800 dark:text-slate-200 uppercase">
                Random ({config.wordLength}L)
              </span>
              {/* Quick Length Dropdown / Pill */}
              <div className="flex gap-0.5 ml-1">
                {([5, 6, 7, 8] as WordLength[]).map(len => (
                  <button
                    key={len}
                    onClick={() => {
                      onWordLengthChange(len);
                      changeWordLength(len);
                    }}
                    disabled={guesses.length > 0 && gameStatus === 'playing'}
                    className={`px-1.5 py-0.5 rounded text-[11px] font-bold cursor-pointer transition-colors ${
                      config.wordLength === len
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-300'
                    }`}
                  >
                    {len}
                  </button>
                ))}
              </div>
            </div>
          )}
          {mode === 'practice' && (
            <span className="flex items-center gap-1 font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-full border border-indigo-200 dark:border-indigo-800">
              <Sparkles className="w-3.5 h-3.5" />
              Practice Mode ({config.wordLength}L)
            </span>
          )}
          {mode === 'timed' && (
            <span className="flex items-center gap-1 font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1 rounded-full border border-amber-200 dark:border-amber-800">
              <Clock className="w-3.5 h-3.5" />
              Speed Run ({config.wordLength}L)
            </span>
          )}
        </div>

        {/* Right Status (Streak, Timer, or Hints) */}
        <div className="flex items-center gap-2">
          {mode === 'daily' && (
            <span className="flex items-center gap-1 text-amber-500 font-bold" title="Current Daily Streak">
              <Flame className="w-4 h-4 fill-current" />
              {dailyStreak.currentStreak}
            </span>
          )}

          {mode === 'practice' && (
            <button
              onClick={() => setHintModalOpen(true)}
              className="flex items-center gap-1 px-2.5 py-1 bg-amber-100 hover:bg-amber-200 dark:bg-amber-950 dark:hover:bg-amber-900 text-amber-800 dark:text-amber-300 rounded-full font-bold cursor-pointer transition-colors"
            >
              <Lightbulb className="w-3.5 h-3.5 fill-current" />
              Hints ({hintsUsed})
            </button>
          )}

          {mode === 'timed' && (
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md font-mono font-bold">
              <span className={seconds < 30 ? 'text-rose-500 animate-pulse' : 'text-slate-800 dark:text-slate-200'}>
                {formattedTime}
              </span>
              <button
                onClick={togglePause}
                className="ml-1 p-0.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer"
              >
                {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
              </button>
            </div>
          )}

          {/* Reset / Play Again button for random/practice */}
          {mode !== 'daily' && (
            <button
              onClick={() => {
                restartGame();
                resetTimer();
              }}
              title="New Random Puzzle"
              className="p-1 rounded-md text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Board Container */}
      <main className="w-full flex-1 flex flex-col justify-center items-center py-2">
        <GameBoard
          wordLength={config.wordLength}
          maxAttempts={config.maxAttempts}
          guesses={guesses}
          evaluations={evaluations}
          currentGuess={currentGuess}
          isShaking={isShaking}
          gameStatus={isPaused ? 'paused' : gameStatus}
          highContrast={highContrast}
          onResume={togglePause}
        />

        {/* Virtual Keyboard */}
        <div className="w-full mt-auto">
          <VirtualKeyboard
            keyboardStates={keyboardStates}
            onChar={addLetter}
            onEnter={submitGuess}
            onDelete={removeLetter}
            disabled={isPaused || gameStatus !== 'playing' || isModalOpen}
            highContrast={highContrast}
          />
        </div>
      </main>

      {/* Result Modal */}
      <ResultModal
        isOpen={resultModalOpen}
        onClose={() => setResultModalOpen(false)}
        won={gameStatus === 'won'}
        targetWord={targetWord}
        attemptsUsed={guesses.length}
        maxAttempts={config.maxAttempts}
        durationSeconds={seconds}
        mode={mode}
        wordLength={config.wordLength}
        evaluations={evaluations}
        highContrast={highContrast}
        hardMode={hardMode}
        onPlayAgain={() => {
          restartGame();
          resetTimer();
          setResultModalOpen(false);
        }}
        onOpenStats={onOpenStats}
      />

      {/* Hint Modal */}
      <HintModal
        isOpen={hintModalOpen}
        onClose={() => setHintModalOpen(false)}
        onSelectHint={useHint}
        hintsUsed={hintsUsed}
      />

      {/* Educational SEO & Strategy Content Below Game */}
      <div className="w-full border-t border-slate-200 dark:border-slate-800 mt-10">
        <GameGuideSection />
        <FaqAccordion />
      </div>
    </div>
  );
};
