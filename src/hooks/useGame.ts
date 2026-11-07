import { useCallback, useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import type { Difficulty, GameMode, GameStatus, HintType, LetterEvaluation, LetterState, WordLength } from '../game/types';
import { evaluateGuess, getUpdatedKeyboardStates } from '../game/wordEvaluation';
import { validateHardMode, validateWordBasic } from '../game/wordValidation';
import { filterWordsByDifficulty, getEliminateLettersHint, getRandomWord, getRevealLetterHint } from '../game/difficulty';
import { getSolutionsForLength, isAllowedWord, loadDictionary } from '../data';
import { soundEngine } from '../game/soundEngine';
import type { GameResult } from './useStatistics';
import { DEFAULT_ATTEMPTS } from '../utils/constants';

interface UseGameOptions {
  mode: GameMode;
  wordLength: WordLength;
  difficulty: Difficulty;
  hardMode: boolean;
  soundEnabled: boolean;
  animationsEnabled: boolean;
  /** Daily mode: play this word instead of a random one. */
  fixedWord?: string;
  /** Daily mode: guesses already made today, restored on load. */
  initialGuesses?: string[];
  onGuess?: (guesses: string[], status: GameStatus) => void;
  onGameEnd?: (result: GameResult) => void;
}

const MAX = DEFAULT_ATTEMPTS;

function replay(target: string, guesses: string[]) {
  const evaluations = guesses.map((g) => evaluateGuess(g, target));
  const keyboard = evaluations.reduce<Record<string, LetterState>>((acc, e) => getUpdatedKeyboardStates(acc, e), {});
  const last = guesses[guesses.length - 1];
  const status: GameStatus = last === target ? 'won' : guesses.length >= MAX ? 'lost' : 'playing';
  return { evaluations, keyboard, status };
}

export function useGame({
  mode,
  wordLength,
  difficulty,
  hardMode,
  soundEnabled,
  animationsEnabled,
  fixedWord,
  initialGuesses,
  onGuess,
  onGameEnd,
}: UseGameOptions) {
  const [targetWord, setTargetWord] = useState('');
  const [guesses, setGuesses] = useState<string[]>([]);
  const [evaluations, setEvaluations] = useState<LetterEvaluation[][]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
  const [keyboardStates, setKeyboardStates] = useState<Record<string, LetterState>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [hintLog, setHintLog] = useState<string[]>([]);
  const [lastResult, setLastResult] = useState<GameResult | null>(null);

  const revealedRef = useRef<Set<number>>(new Set());
  const startRef = useRef(Date.now());
  const toastTimer = useRef<number | undefined>(undefined);
  // Keep the latest callbacks without restarting games when they change.
  const onGameEndRef = useRef(onGameEnd);
  onGameEndRef.current = onGameEnd;
  const onGuessRef = useRef(onGuess);
  onGuessRef.current = onGuess;
  const initialGuessesRef = useRef(initialGuesses);
  initialGuessesRef.current = initialGuesses;

  useEffect(() => soundEngine.setEnabled(soundEnabled), [soundEnabled]);
  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  // Pull in the full dictionary for this length in the background.
  useEffect(() => {
    void loadDictionary(wordLength);
  }, [wordLength]);

  const showToast = useCallback((msg: string, ms = 1800) => {
    window.clearTimeout(toastTimer.current);
    setToastMessage(msg);
    toastTimer.current = window.setTimeout(() => setToastMessage(null), ms);
  }, []);

  const shake = useCallback(() => {
    setIsShaking(true);
    window.setTimeout(() => setIsShaking(false), 600);
  }, []);

  const newGame = useCallback(() => {
    let target: string;
    let restored: string[] = [];
    if (fixedWord) {
      target = fixedWord.toUpperCase();
      restored = initialGuessesRef.current ?? [];
    } else {
      const all = getSolutionsForLength(wordLength);
      const pool = filterWordsByDifficulty(all, difficulty);
      target = getRandomWord(pool.length > 0 ? pool : all);
    }
    const { evaluations: ev, keyboard, status } = replay(target, restored);
    setTargetWord(target);
    setGuesses(restored);
    setEvaluations(ev);
    setKeyboardStates(keyboard);
    setGameStatus(status);
    setCurrentGuess('');
    setHintsUsed(0);
    setHintLog([]);
    setLastResult(null);
    revealedRef.current = new Set();
    startRef.current = Date.now();
  }, [fixedWord, wordLength, difficulty]);

  // A new word whenever the mode, length, difficulty or daily word changes.
  useEffect(() => {
    newGame();
  }, [newGame, mode]);

  const finish = useCallback(
    (won: boolean, finalGuesses: string[]) => {
      const result: GameResult = {
        mode,
        wordLength,
        targetWord,
        guesses: finalGuesses,
        won,
        attemptsUsed: finalGuesses.length,
        maxAttempts: MAX,
        durationSeconds: Math.round((Date.now() - startRef.current) / 1000),
        hintsUsed,
      };
      setGameStatus(won ? 'won' : 'lost');
      setLastResult(result);
      if (won) {
        soundEngine.playVictory();
        if (animationsEnabled) confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 }, colors: ['#e4572e', '#2c7a6b', '#e0a82e', '#1d1a16'] });
      } else {
        soundEngine.playDefeat();
      }
      onGameEndRef.current?.(result);
    },
    [mode, wordLength, targetWord, hintsUsed, animationsEnabled]
  );

  const addLetter = useCallback(
    (char: string) => {
      if (gameStatus !== 'playing' || currentGuess.length >= wordLength) return;
      soundEngine.playKeyClick();
      setCurrentGuess((g) => (g.length < wordLength ? g + char.toUpperCase() : g));
    },
    [gameStatus, currentGuess.length, wordLength]
  );

  const removeLetter = useCallback(() => {
    if (gameStatus !== 'playing' || currentGuess.length === 0) return;
    soundEngine.playKeyClick();
    setCurrentGuess((g) => g.slice(0, -1));
  }, [gameStatus, currentGuess.length]);

  const reject = useCallback(
    (msg: string) => {
      showToast(msg);
      soundEngine.playInvalidGuess();
      shake();
    },
    [showToast, shake]
  );

  const submitGuess = useCallback(() => {
    if (gameStatus !== 'playing') return;
    if (currentGuess.length !== wordLength) return reject('Not enough letters');

    const basic = validateWordBasic(currentGuess, wordLength, (w) => isAllowedWord(w, wordLength) || w === targetWord);
    if (!basic.isValid) return reject(basic.errorMessage === 'Not in word list' ? 'Not in our word list' : basic.errorMessage ?? 'Not a word');

    if (hardMode && guesses.length > 0) {
      const check = validateHardMode(
        currentGuess,
        guesses.map((guess, i) => ({ guess, letters: evaluations[i] }))
      );
      if (!check.isValid) return reject(check.errorMessage ?? 'Hard mode: use the letters you’ve found');
    }

    const ev = evaluateGuess(currentGuess, targetWord);
    const nextGuesses = [...guesses, currentGuess];
    setGuesses(nextGuesses);
    setEvaluations((prev) => [...prev, ev]);
    setKeyboardStates((prev) => getUpdatedKeyboardStates(prev, ev));
    setCurrentGuess('');
    soundEngine.playTileFlip();

    const won = currentGuess === targetWord;
    const lost = !won && nextGuesses.length >= MAX;
    onGuessRef.current?.(nextGuesses, won ? 'won' : lost ? 'lost' : 'playing');
    if (won || lost) finish(won, nextGuesses);
  }, [gameStatus, currentGuess, wordLength, targetWord, hardMode, guesses, evaluations, reject, finish]);

  const handleTimeUp = useCallback(() => {
    if (gameStatus !== 'playing') return;
    showToast('Time’s up!', 2500);
    finish(false, guesses);
  }, [gameStatus, guesses, finish, showToast]);

  const useHint = useCallback(
    (type: HintType) => {
      if (gameStatus !== 'playing') return;
      if (type === 'reveal_letter') {
        const hint = getRevealLetterHint(targetWord, evaluations, revealedRef.current);
        if (!hint) return showToast('Every letter is already showing');
        revealedRef.current.add(hint.position - 1);
        const msg = `Letter ${hint.position} is ${hint.char}`;
        setHintsUsed((n) => n + 1);
        setHintLog((log) => [...log, msg]);
        showToast(msg, 3000);
      } else {
        const letters = getEliminateLettersHint(targetWord, keyboardStates);
        if (letters.length === 0) return showToast('Nothing left to rule out');
        // Grey them out on the keyboard so the same letters never come up twice.
        setKeyboardStates((prev) => {
          const next = { ...prev };
          letters.forEach((l) => (next[l] = 'absent'));
          return next;
        });
        const msg = `No ${letters.join(', ')}`;
        setHintsUsed((n) => n + 1);
        setHintLog((log) => [...log, msg]);
        showToast(msg, 3000);
      }
    },
    [gameStatus, targetWord, evaluations, keyboardStates, showToast]
  );

  return {
    targetWord,
    guesses,
    evaluations,
    currentGuess,
    gameStatus,
    keyboardStates,
    toastMessage,
    isShaking,
    hintsUsed,
    hintLog,
    lastResult,
    maxAttempts: MAX,
    addLetter,
    removeLetter,
    submitGuess,
    handleTimeUp,
    newGame,
    useHint,
  };
}
