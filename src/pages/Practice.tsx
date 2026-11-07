import React from 'react';
import { Link } from 'react-router-dom';
import { GameView } from '../components/game/GameView';
import { GamePage } from '../components/game/GamePage';

export const Practice: React.FC = () => (
  <GamePage path="/practice" game={<GameView mode="practice" title="Practice with hints" />}>
    <section className="prose-page">
      <h2>No pressure, a couple of hints</h2>
      <p>
        Practice games don’t count towards your stats or your streak, so this is the place to try a new starting word, get used
        to longer words or just play without worrying about the score.
      </p>
      <p>When you’re stuck, two hints sit under the board:</p>
      <ul>
        <li>
          <strong>Show a letter</strong> tells you one letter and where it goes. It never repeats a letter you already have.
        </li>
        <li>
          <strong>Rule out 3 letters</strong> greys out three letters on the keyboard that aren’t in the word.
        </li>
      </ul>
      <p>
        Use as many as you like. If you want to get better without hints, our <Link to="/strategies">tips page</Link> covers the
        habits that make the biggest difference.
      </p>
    </section>
  </GamePage>
);
