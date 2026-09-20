import { useState, useEffect, useRef, useCallback } from 'react';
import { GameMode, GameStatus } from '../game/types';

interface UseTimerProps {
  mode: GameMode;
  status: GameStatus;
  initialTimeSeconds?: number;
  onTimeUp?: () => void;
}

export function useTimer({
  mode,
  status,
  initialTimeSeconds = 120,
  onTimeUp,
}: UseTimerProps) {
  const [seconds, setSeconds] = useState(mode === 'timed' ? initialTimeSeconds : 0);
  const [isPaused, setIsPaused] = useState(false);
  const onTimeUpRef = useRef(onTimeUp);
  onTimeUpRef.current = onTimeUp;

  // Reset timer on new game
  const resetTimer = useCallback(
    (newInitialSeconds?: number) => {
      setSeconds(
        mode === 'timed'
          ? newInitialSeconds ?? initialTimeSeconds
          : 0
      );
      setIsPaused(false);
    },
    [mode, initialTimeSeconds]
  );

  const togglePause = useCallback(() => {
    if (status === 'playing') {
      setIsPaused(prev => !prev);
    }
  }, [status]);

  useEffect(() => {
    if (status !== 'playing' || isPaused) {
      return;
    }

    const interval = setInterval(() => {
      setSeconds(prev => {
        if (mode === 'timed') {
          if (prev <= 1) {
            clearInterval(interval);
            onTimeUpRef.current?.();
            return 0;
          }
          return prev - 1;
        } else {
          return prev + 1;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [status, isPaused, mode]);

  const formatTime = useCallback((totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }, []);

  return {
    seconds,
    formattedTime: formatTime(seconds),
    isPaused,
    setIsPaused,
    togglePause,
    resetTimer,
  };
}
