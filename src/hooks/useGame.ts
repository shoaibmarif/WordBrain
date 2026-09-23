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
import {
  filterWordsByDifficulty,
  getRandomWord,
  getRevealLetterHint,
  getEliminateLettersHint,
} from '../game/difficulty';
import { getSolutionsForLength, isAllowedWord } from '../data';
import { soundEngine } from '../game/soundEngine';
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

  const startTimeRef = useRef<number>(Date.now());
  const toastTimeoutRef = useRef<number | null>(null);

  // Sync sound engine preference
  useEffect(() => {
    soundEngine.setEnabled(soundEnabled);
  }, [soundEnabled]);

  const showToast = useCallback((msg: string, duration = 1800) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToastMessage(msg);
    toastTimeoutRef.current = window.setTimeout(() => {
      setToastMessage(null);
    }, duration);
  }, []);

  const triggerShake = useCallback(() => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 600);
  }, []);

  // Initialize word
  const initGame = useCallback(
    (cfg: GameConfig) => {
      const allSolutions = getSolutionsForLength(cfg.wordLength);
      const filtered = filterWordsByDifficulty(allSolutions, cfg.difficulty);
      const target = getRandomWord(filtered.length > 0 ? filtered : allSolutions);

      setTargetWord(target);
      setGuesses([]);
      setEvaluations([]);
      setCurrentGuess('');
      setKeyboardStates({});
      setGameStatus('playing');
      setHintsUsed(0);
      setRevealedHint(null);
      startTimeRef.current = Date.now();
    },
    []
  );

  // Initialize or re-initialize when mode, wordLength, or difficulty changes
  useEffect(() => {
    initGame(config);
  }, [config.wordLength, config.mode, config.difficulty, initGame]);

  const addLetter = useCallback(
    (char: string) => {
      if (gameStatus !== 'playing') return;
      if (currentGuess.length < config.wordLength) {
        soundEngine.playKeypress();
        setCurrentGuess(prev => prev + char.toUpperCase());
      }
    },
    [gameStatus, currentGuess, config.wordLength]
  );

  const removeLetter = useCallback(() => {
    if (gameStatus !== 'playing') return;
    if (currentGuess.length > 0) {
      soundEngine.playDelete();
      setCurrentGuess(prev => prev.slice(0, -1));
    }
  }, [gameStatus, currentGuess]);

  const submitGuess = useCallback(() => {
    if (gameStatus !== 'playing') return;

    // Length check
    if (currentGuess.length !== config.wordLength) {
      showToast('Not enough letters');
      soundEngine.playInvalid();
      triggerShake();
      return;
    }

    // Basic validity
    const basicValidation = validateWordBasic(currentGuess, config.wordLength, isAllowedWord);
    if (!basicValidation.isValid) {
      showToast(basicValidation.error || 'Word not in list');
      soundEngine.playInvalid();
      triggerShake();
      return;
    }

    // Hard mode checks
    if (hardMode && guesses.length > 0) {
      const hardCheck = validateHardMode(
        currentGuess,
        guesses[guesses.length - 1],
        evaluations[evaluations.length - 1]
      );
      if (!hardCheck.isValid) {
        showToast(hardCheck.error || 'Must follow hard mode clues');
        soundEngine.playInvalid();
        triggerShake();
        return;
      }
    }

    // Evaluate guess
    const newEval = evaluateGuess(currentGuess, targetWord);
    const newGuesses = [...guesses, currentGuess];
    const newEvaluations = [...evaluations, newEval];

    setGuesses(newGuesses);
    setEvaluations(newEvaluations);
    setCurrentGuess('');

    // Update keyboard states
    setKeyboardStates(prev => getUpdatedKeyboardStates(prev, newEval));
    soundEngine.playReveal();

    const won = currentGuess === targetWord;
    const lost = !won && newGuesses.length >= config.maxAttempts;
    const durationSeconds = Math.round((Date.now() - startTimeRef.current) / 1000);

    if (won) {
      setGameStatus('won');
      soundEngine.playVictory();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
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
    }
  }, [
    gameStatus,
    currentGuess,
    config,
    hardMode,
    guesses,
    evaluations,
    targetWord,
    hintsUsed,
    showToast,
    triggerShake,
    onGameEnd,
  ]);

  const handleTimeUp = useCallback(() => {
    if (gameStatus !== 'playing') return;
    setGameStatus('lost');
    soundEngine.playDefeat();
    showToast(`Time's up! Word was ${targetWord}`, 3000);
    const durationSeconds = Math.round((Date.now() - startTimeRef.current) / 1000);
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
  }, [gameStatus, config, targetWord, guesses, hintsUsed, showToast, onGameEnd]);

  // Hints (for Practice mode)
  const useHint = useCallback(
    (hintType: HintType) => {
      if (gameStatus !== 'playing') return;

      if (hintType === 'reveal_letter') {
        const hint = getRevealLetterHint(targetWord, guesses);
        if (hint) {
          setHintsUsed(prev => prev + 1);
          setRevealedHint(hint.description);
          showToast(hint.description, 3000);
        } else {
          showToast('No more letters to reveal');
        }
      } else if (hintType === 'eliminate_letters') {
        const hint = getEliminateLettersHint(targetWord, keyboardStates);
        if (hint) {
          setHintsUsed(prev => prev + 1);
          setRevealedHint(hint.description);
          showToast(hint.description, 3000);
        } else {
          showToast('No more letters to eliminate');
        }
      }
    },
    [gameStatus, targetWord, guesses, keyboardStates, showToast]
  );

  const restartGame = useCallback(() => {
    initGame(config);
  }, [initGame, config]);

  const changeMode = useCallback((newMode: GameMode) => {
    setConfig(prev => ({
      ...prev,
      mode: newMode,
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
