import React from 'react';
import { Link } from 'react-router-dom';
import { GameView } from '../components/game/GameView';
import { GamePage } from '../components/game/GamePage';

export const Timed: React.FC = () => (
  <GamePage path="/timed" game={<GameView mode="timed" title="Beat the clock" />}>
    <section className="prose-page">
      <h2>Two minutes, six guesses</h2>
      <p>
        Same rules as always, with a clock. You have two minutes to find the word, and running out of time counts as a loss. The
        clock starts with each new word and stops the moment you solve it.
      </p>
      <p>
        You can pause, but the board hides while you do, so there’s no thinking time for free. Timed games count towards your
        stats and win streak.
      </p>
      <p>
        The trick is not to overthink the first two guesses. Pick a starting word you know well (there are some good ones in our{' '}
        <Link to="/strategies">tips</Link>) and save your thinking for guess three onwards.
      </p>
    </section>
  </GamePage>
);
