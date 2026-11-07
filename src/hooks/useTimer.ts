import { useEffect, useRef, useState } from 'react';

interface UseTimerOptions {
  /** Seconds on the clock at the start of each game. */
  duration: number;
  /** Counts down only while true (game in play, not paused). */
  running: boolean;
  /** Any change (e.g. a new target word) puts the full time back on the clock. */
  resetKey: unknown;
  onTimeUp: () => void;
}

/** Countdown for timed mode. Resets itself whenever a new game starts. */
export function useTimer({ duration, running, resetKey, onTimeUp }: UseTimerOptions) {
  const [seconds, setSeconds] = useState(duration);
  const onTimeUpRef = useRef(onTimeUp);
  onTimeUpRef.current = onTimeUp;

  useEffect(() => {
    setSeconds(duration);
  }, [resetKey, duration]);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setSeconds((s) => Math.max(0, s - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, [running]);

  useEffect(() => {
    if (running && seconds === 0) onTimeUpRef.current();
  }, [seconds, running]);

  const formatted = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
  return { seconds, formatted };
}
