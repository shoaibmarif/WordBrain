import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { GameView } from '../components/game/GameView';
import { GamePage } from '../components/game/GamePage';
import { dailyNumber, dailyWord, liveStreak, msUntilNextPuzzle, recordDaily } from '../game/daily';
import { readDailyProgress, readDailyStats, writeDailyProgress, writeDailyStats } from '../game/dailyStore';
import type { GameStatus } from '../game/types';

export const Daily: React.FC = () => {
  const [puzzle, setPuzzle] = useState(() => dailyNumber());
  const [stats, setStats] = useState(readDailyStats);

  // If the page is left open past midnight, roll over to the new puzzle.
  useEffect(() => {
    const id = window.setTimeout(() => setPuzzle(dailyNumber()), msUntilNextPuzzle() + 1000);
    return () => window.clearTimeout(id);
  }, [puzzle]);

  const progress = useMemo(() => readDailyProgress(puzzle), [puzzle]);

  const onGuess = useCallback(
    (guesses: string[], status: GameStatus) => {
      const s = status === 'won' || status === 'lost' ? status : 'playing';
      writeDailyProgress({ puzzle, guesses, status: s });
      if (s !== 'playing') {
        const next = recordDaily(readDailyStats(), puzzle, s === 'won');
        writeDailyStats(next);
        setStats(next);
      }
    },
    [puzzle]
  );

  return (
    <GamePage
      path="/daily"
      game={
        <GameView
          key={puzzle}
          mode="daily"
          title="Today’s word"
          daily={{ puzzle, word: dailyWord(puzzle), initialGuesses: progress.guesses, streak: liveStreak(stats, puzzle), onGuess }}
        />
      }
    >
      <section className="prose-page">
        <h2>One word a day, the same for everyone</h2>
        <p>
          The daily puzzle is a five letter word that changes at midnight where you are. Everybody gets the same one, so it’s the
          puzzle to compare with friends. You get a single go each day, and your progress is saved if you close the tab halfway
          through.
        </p>
        <p>
          Solve it on back to back days to build a streak. Miss a day, or run out of guesses, and the streak starts again from
          zero. When you’re done, <strong>Share result</strong> copies your grid of coloured squares without giving the word away.
        </p>
        <p>
          Finished already? There’s no limit on <Link to="/">unlimited games</Link>, or try a longer{' '}
          <Link to="/7-letter-word-game">seven letter word</Link> if five feels too easy.
        </p>
      </section>
    </GamePage>
  );
};
