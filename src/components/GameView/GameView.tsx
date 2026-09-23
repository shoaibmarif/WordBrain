import React, { useState, useEffect } from 'react';
import { GameMode, WordLength, Difficulty } from '../../game/types';
import { useGame } from '../../hooks/useGame';
import { useKeyboard } from '../../hooks/useKeyboard';
import { useTimer } from '../../hooks/useTimer';
import { GameBoard } from '../GameBoard/GameBoard';
import { VirtualKeyboard } from '../Keyboard/VirtualKeyboard';
import { Toast } from '../common/Toast';
import { ResultModal } from '../Modals/ResultModal';
import { HintModal } from '../Modals/HintModal';
import { GameGuideSection } from '../SeoContent/GameGuideSection';
import { FaqAccordion } from '../SeoContent/FaqAccordion';
import {
  RotateCcw,
  Sparkles,
  Lightbulb,
  Pause,
  Play,
  Flame,
  Clock,
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
  streak: { currentStreak: number; maxStreak: number };
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
  streak,
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
    addLetter,
    removeLetter,
    submitGuess,
    handleTimeUp,
    restartGame,
    useHint,
    changeMode,
    changeWordLength,
    changeDifficulty,
  } = useGame({
    initialConfig: {
      mode,
      wordLength: propWordLength,
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

  // Sync mode, wordLength, and difficulty if props change
  useEffect(() => {
    changeMode(mode);
  }, [mode, changeMode]);

  useEffect(() => {
    changeWordLength(propWordLength);
  }, [propWordLength, changeWordLength]);

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

  return (
    <div className="w-full flex flex-col items-center">
      {/* Toast Feedback */}
      <Toast message={toastMessage} />

      {/* Sub-header status bar */}
      <div className="w-full max-w-lg px-3 pt-3 pb-2 flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-400">
        {/* Mode badge & word length buttons */}
        <div className="flex items-center gap-2">
          {mode === 'random' && (
            <div className="flex items-center gap-2 bg-slate-100/90 dark:bg-slate-800/70 px-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-700/60 shadow-xs">
              <span className="font-extrabold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                Word Length
              </span>
              <div className="flex gap-1">
                {([5, 6, 7, 8] as WordLength[]).map(len => (
                  <button
                    key={len}
                    onClick={() => {
                      onWordLengthChange(len);
                      changeWordLength(len);
                    }}
                    disabled={guesses.length > 0 && gameStatus === 'playing'}
                    className={`px-2 py-0.5 rounded-md text-[11px] font-bold cursor-pointer transition-all ${
                      config.wordLength === len
                        ? 'bg-emerald-600 text-white shadow-xs scale-105'
                        : 'bg-white/80 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                    }`}
                  >
                    {len}L
                  </button>
                ))}
              </div>
            </div>
          )}
          {mode === 'practice' && (
            <span className="flex items-center gap-1.5 font-extrabold text-indigo-700 dark:text-indigo-300 bg-indigo-100/70 dark:bg-indigo-950/70 px-3 py-1.5 rounded-full border border-indigo-300/60 dark:border-indigo-800/80 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
              Practice ({config.wordLength}L)
            </span>
          )}
          {mode === 'timed' && (
            <span className="flex items-center gap-1.5 font-extrabold text-amber-700 dark:text-amber-300 bg-amber-100/70 dark:bg-amber-950/70 px-3 py-1.5 rounded-full border border-amber-300/60 dark:border-amber-800/80 shadow-xs">
              <Clock className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
              Speed Run ({config.wordLength}L)
            </span>
          )}
        </div>

        {/* Right Status (Streak, Timer, Hints, New Game) */}
        <div className="flex items-center gap-2">
          {/* Win streak badge */}
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/25 rounded-full text-amber-600 dark:text-amber-400 font-extrabold shadow-xs"
            title="Current Win Streak"
          >
            <Flame className="w-4 h-4 fill-current" />
            <span>{streak.currentStreak} Streak</span>
          </div>

          {mode === 'practice' && (
            <button
              onClick={() => setHintModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 hover:bg-amber-200 dark:bg-amber-950/80 dark:hover:bg-amber-900 text-amber-900 dark:text-amber-300 border border-amber-300/60 dark:border-amber-800 rounded-full font-bold cursor-pointer transition-colors shadow-xs"
            >
              <Lightbulb className="w-3.5 h-3.5 fill-current" />
              Hints ({hintsUsed})
            </button>
          )}

          {mode === 'timed' && (
            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl font-mono font-bold border border-slate-200 dark:border-slate-700 shadow-xs">
              <span
                className={
                  seconds < 30
                    ? 'text-rose-500 animate-pulse font-black'
                    : 'text-slate-800 dark:text-slate-100'
                }
              >
                {formattedTime}
              </span>
              {togglePause && (
                <button
                  onClick={togglePause}
                  className="ml-1 p-0.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer"
                >
                  {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                </button>
              )}
            </div>
          )}

          {/* New Game / Restart button */}
          <button
            onClick={() => {
              restartGame();
              resetTimer();
            }}
            title="New Puzzle"
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 cursor-pointer transition-all active:scale-95 shadow-xs"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
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
