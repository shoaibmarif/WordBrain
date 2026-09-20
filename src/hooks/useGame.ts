import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Difficulty,
  GameConfig,
  GameMode,
  GameStatus,
  HintType,
  LetterEvaluation,
  LetterState,
  WordLength,
} from '../game/types';
import { evaluateGuess, getUpdatedKeyboardStates } from '../game/wordEvaluation';
import { validateHardMode, validateWordBasic } from '../game/wordValidation';
import { getDailyWord, getLocalDateString } from '../game/dailyPuzzle';
import {
  filterWordsByDifficulty,
  getRandomWord,
  getRevealLetterHint,
  getEliminateLettersHint,
} from '../game/difficulty';
import { getSolutionsForLength, isAllowedWord } from '../data';
import { soundEngine } from '../game/soundEngine';
import { STORAGE_KEYS } from '../utils/constants';
import confetti from 'canvas-confetti';

interface UseGameProps {
  initialConfig?: Partial<GameConfig>;
  hardMode?: boolean;
  soundEnabled?: boolean;
  onGameEnd?: (result: {
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

export function useGame({
  initialConfig,
  hardMode = false,
  soundEnabled = true,
  onGameEnd,
}: UseGameProps = {}) {
  const [config, setConfig] = useState<GameConfig>({
    wordLength: (initialConfig?.wordLength || 5) as WordLength,
    maxAttempts: initialConfig?.maxAttempts || 6,
    mode: initialConfig?.mode || 'random',
    difficulty: initialConfig?.difficulty || 'medium',
  });

  const [targetWord, setTargetWord] = useState<string>('');
  const [guesses, setGuesses] = useState<string[]>([]);
  const [evaluations, setEvaluations] = useState<LetterEvaluation[][]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
  const [keyboardStates, setKeyboardStates] = useState<Record<string, LetterState>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [revealedHint, setRevealedHint] = useState<string | null>(null);
  const [dailyCompleted, setDailyCompleted] = useState(false);

  const startTimeRef = useRef<number>(Date.now());
  const toastTimeoutRef = useRef<number | null>(null);

  // Sync sound engine preference
  useEffect(() => {
    soundEngine.setEnabled(soundEnabled);
  }, [soundEnabled]);

  const showToast = useCallback((msg: string, duration = 2000) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMessage(msg);
    toastTimeoutRef.current = window.setTimeout(() => {
      setToastMessage(null);
    }, duration);
  }, []);

  const triggerShake = useCallback(() => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 600);
  }, []);

  // Initialize word according to mode
  const initGame = useCallback(
    (cfg: GameConfig) => {
      const todayStr = getLocalDateString();
      const allSolutions = getSolutionsForLength(cfg.wordLength);

      let target = '';
      let initialGuesses: string[] = [];
      let initialEvals: LetterEvaluation[][] = [];
      let initialKeyStates: Record<string, LetterState> = {};
      let initialStatus: GameStatus = 'playing';
      let isDailyDone = false;

      if (cfg.mode === 'daily') {
        // Daily challenge is strictly 5 letters
        const dailySolutions = getSolutionsForLength(5);
        target = getDailyWord(todayStr, dailySolutions);

        // Check if previously played today
        try {
          const savedDaily = localStorage.getItem(`${STORAGE_KEYS.DAILY_STATE}_${todayStr}`);
          if (savedDaily) {
            const data = JSON.parse(savedDaily);
            initialGuesses = data.guesses || [];
            initialEvals = initialGuesses.map(g => evaluateGuess(g, target));
            initialKeyStates = {};
            initialEvals.forEach(ev => {
              initialKeyStates = getUpdatedKeyboardStates(initialKeyStates, ev);
            });
            initialStatus = data.status || 'playing';
            isDailyDone = data.status === 'won' || data.status === 'lost';
          }
        } catch {
          // ignore corrupted localstorage
        }
      } else {
        // Random / Practice / Timed
        const filtered = filterWordsByDifficulty(allSolutions, cfg.difficulty);
        target = getRandomWord(filtered.length > 0 ? filtered : allSolutions);
      }

      setTargetWord(target);
      setGuesses(initialGuesses);
      setEvaluations(initialEvals);
      setCurrentGuess('');
      setKeyboardStates(initialKeyStates);
      setGameStatus(initialStatus);
      setHintsUsed(0);
      setRevealedHint(null);
      setDailyCompleted(isDailyDone);
      startTimeRef.current = Date.now();
    },
    []
  );

  // Initialize or re-initialize when mode or wordLength changes
  useEffect(() => {
    initGame(config);
  }, [config.mode, config.wordLength, config.difficulty, initGame]);

  // Input actions
  const addLetter = useCallback(
    (char: string) => {
      if (gameStatus !== 'playing') return;
      if (currentGuess.length >= config.wordLength) return;

      const upper = char.toUpperCase();
      if (/^[A-Z]$/.test(upper)) {
        setCurrentGuess(prev => prev + upper);
        soundEngine.playKeyClick();
      }
    },
    [gameStatus, currentGuess.length, config.wordLength]
  );

  const removeLetter = useCallback(() => {
    if (gameStatus !== 'playing') return;
    if (currentGuess.length > 0) {
      setCurrentGuess(prev => prev.slice(0, -1));
      soundEngine.playKeyClick();
    }
  }, [gameStatus, currentGuess.length]);

  const submitGuess = useCallback(() => {
    if (gameStatus !== 'playing') return;

    // 1. Length check
    if (currentGuess.length < config.wordLength) {
      showToast('Not enough letters');
      triggerShake();
      soundEngine.playInvalidGuess();
      return;
    }

    // 2. Dictionary validity check
    const basicValidation = validateWordBasic(
      currentGuess,
      config.wordLength,
      w => isAllowedWord(w, config.wordLength)
    );

    if (!basicValidation.isValid) {
      showToast(basicValidation.errorMessage || 'Not in word list');
      triggerShake();
      soundEngine.playInvalidGuess();
      return;
    }

    // 3. Hard mode validation
    if (hardMode && guesses.length > 0) {
      const prevResults = guesses.map((g, idx) => ({
        guess: g,
        letters: evaluations[idx],
      }));

      const hardModeValidation = validateHardMode(currentGuess, prevResults);
      if (!hardModeValidation.isValid) {
        showToast(hardModeValidation.errorMessage || 'Hard mode constraint violated');
        triggerShake();
        soundEngine.playInvalidGuess();
        return;
      }
    }

    // 4. Evaluate guess
    const newEvaluation = evaluateGuess(currentGuess, targetWord);
    const newEvaluations = [...evaluations, newEvaluation];
    const newGuesses = [...guesses, currentGuess];
    const newKeyboardStates = getUpdatedKeyboardStates(keyboardStates, newEvaluation);

    // Audio feedback for row flip
    soundEngine.playTileFlip(guesses.length);

    setEvaluations(newEvaluations);
    setGuesses(newGuesses);
    setKeyboardStates(newKeyboardStates);
    setCurrentGuess('');

    const won = currentGuess === targetWord;
    const lost = !won && newGuesses.length >= config.maxAttempts;
    const durationSeconds = Math.max(1, Math.round((Date.now() - startTimeRef.current) / 1000));

    if (won) {
      setGameStatus('won');
      soundEngine.playVictory();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      if (config.mode === 'daily') {
        setDailyCompleted(true);
        const todayStr = getLocalDateString();
        localStorage.setItem(
          `${STORAGE_KEYS.DAILY_STATE}_${todayStr}`,
          JSON.stringify({ status: 'won', guesses: newGuesses })
        );
      }
      onGameEnd?.({
        mode: config.mode,
        wordLength: config.wordLength,
        targetWord,
        guesses: newGuesses,
        won: true,
        attemptsUsed: newGuesses.length,
        maxAttempts: config.maxAttempts,
        durationSeconds,
        hintsUsed,
      });
    } else if (lost) {
      setGameStatus('lost');
      soundEngine.playDefeat();
      if (config.mode === 'daily') {
        setDailyCompleted(true);
        const todayStr = getLocalDateString();
        localStorage.setItem(
          `${STORAGE_KEYS.DAILY_STATE}_${todayStr}`,
          JSON.stringify({ status: 'lost', guesses: newGuesses })
        );
      }
      onGameEnd?.({
        mode: config.mode,
        wordLength: config.wordLength,
        targetWord,
        guesses: newGuesses,
        won: false,
        attemptsUsed: newGuesses.length,
        maxAttempts: config.maxAttempts,
        durationSeconds,
        hintsUsed,
      });
    } else {
      // In-progress daily save
      if (config.mode === 'daily') {
        const todayStr = getLocalDateString();
        localStorage.setItem(
          `${STORAGE_KEYS.DAILY_STATE}_${todayStr}`,
          JSON.stringify({ status: 'playing', guesses: newGuesses })
        );
      }
    }
  }, [
    gameStatus,
    currentGuess,
    config,
    hardMode,
    guesses,
    evaluations,
    targetWord,
    keyboardStates,
    hintsUsed,
    showToast,
    triggerShake,
    onGameEnd,
  ]);

  // Timed mode expiry
  const handleTimeUp = useCallback(() => {
    if (gameStatus === 'playing') {
      setGameStatus('lost');
      soundEngine.playDefeat();
      showToast("Time's up!", 3000);
      const durationSeconds = Math.max(1, Math.round((Date.now() - startTimeRef.current) / 1000));
      onGameEnd?.({
        mode: config.mode,
        wordLength: config.wordLength,
        targetWord,
        guesses,
        won: false,
        attemptsUsed: guesses.length,
        maxAttempts: config.maxAttempts,
        durationSeconds,
        hintsUsed,
      });
    }
  }, [gameStatus, config, targetWord, guesses, hintsUsed, showToast, onGameEnd]);

  // Practice mode hints
  const useHint = useCallback(
    (type: HintType) => {
      if (config.mode !== 'practice' || gameStatus !== 'playing') return;

      if (type === 'reveal_letter') {
        const hint = getRevealLetterHint(targetWord, evaluations);
        if (hint) {
          setHintsUsed(h => h + 1);
          setRevealedHint(`Hint: Letter "${hint.char}" is at position ${hint.position}`);
          showToast(`Position ${hint.position} contains "${hint.char}"`, 3500);
        } else {
          showToast('All letters already revealed!');
        }
      } else if (type === 'eliminate_letters') {
        const eliminated = getEliminateLettersHint(targetWord, keyboardStates, 3);
        if (eliminated.length > 0) {
          setHintsUsed(h => h + 1);
          // Mark these letters as absent on the keyboard
          setKeyboardStates(prev => {
            const next = { ...prev };
            eliminated.forEach(c => {
              if (!next[c]) next[c] = 'absent';
            });
            return next;
          });
          setRevealedHint(`Eliminated unused letters: ${eliminated.join(', ')}`);
          showToast(`Eliminated: ${eliminated.join(', ')}`, 3500);
        } else {
          showToast('No more letters to eliminate!');
        }
      }
    },
    [config.mode, gameStatus, targetWord, evaluations, keyboardStates, showToast]
  );

  const restartGame = useCallback(() => {
    initGame(config);
  }, [initGame, config]);

  const changeMode = useCallback((newMode: GameMode) => {
    setConfig(prev => ({
      ...prev,
      mode: newMode,
      wordLength: newMode === 'daily' ? 5 : prev.wordLength,
    }));
  }, []);

  const changeWordLength = useCallback((newLen: WordLength) => {
    setConfig(prev => ({
      ...prev,
      wordLength: newLen,
    }));
  }, []);

  const changeDifficulty = useCallback((newDiff: Difficulty) => {
    setConfig(prev => ({
      ...prev,
      difficulty: newDiff,
    }));
  }, []);

  return {
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
    revealedHint,
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
  };
}
