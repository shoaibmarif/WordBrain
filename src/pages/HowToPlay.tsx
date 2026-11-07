import React from 'react';
import { Link } from 'react-router-dom';
import { ContentPage } from '../components/layout/ContentPage';
import { ExampleRow } from '../components/game/ExampleRow';

export const HowToPlay: React.FC = () => (
  <ContentPage path="/how-to-play" eyebrow="The rules" intro="You can learn WordBrain in about a minute. Here’s everything, including the slightly fiddly bit about repeated letters.">
    <div className="prose-page">
      <h2>The goal</h2>
      <p>
        There’s a hidden word. You have six guesses to find it. Each guess has to be a real English word with the right number of
        letters, and after every guess the tiles change colour to tell you how close you are.
      </p>

      <h2>What the colours mean</h2>
      <div className="my-6 space-y-5">
        <div>
          <ExampleRow word="BRAVE" states={{ 0: 'correct' }} />
          <p className="mt-2">
            <strong>Teal</strong>: B is in the word, in exactly this spot.
          </p>
        </div>
        <div>
          <ExampleRow word="MOUSE" states={{ 1: 'present' }} />
          <p className="mt-2">
            <strong>Mustard</strong>: O is in the word, but in a different spot.
          </p>
        </div>
        <div>
          <ExampleRow word="PLANK" states={{ 4: 'absent' }} />
          <p className="mt-2">
            <strong>Grey</strong>: there’s no K anywhere in the word.
          </p>
        </div>
      </div>
      <p>The keyboard keeps track for you, so you can see at a glance which letters you’ve ruled in and out.</p>

      <h2>Repeated letters</h2>
      <p>
        Answers can have the same letter twice, like LEVEL or GEESE. Each letter in the answer can only be matched once, which
        leads to a couple of rules worth knowing:
      </p>
      <ul>
        <li>If you guess two Es and only one lights up, the word has exactly one E.</li>
        <li>If both light up (in any colour), the word has at least two.</li>
        <li>Teal matches are counted first, so a teal E always takes priority over a mustard one.</li>
      </ul>

      <h2>Ways to play</h2>
      <ul>
        <li>
          <Link to="/daily">Daily</Link>: one five letter word a day, the same for everyone. One attempt, and a streak for every day
          in a row you solve it.
        </li>
        <li>
          <Link to="/">Unlimited</Link>: a new word every time, with 5 to 8 letters and three difficulty levels.
        </li>
        <li>
          <Link to="/practice">Practice</Link>: hints are available and nothing counts towards your stats.
        </li>
        <li>
          <Link to="/timed">Timed</Link>: find the word in two minutes or it counts as a loss.
        </li>
      </ul>

      <h2>Settings worth knowing about</h2>
      <p>Open the gear icon at the top of the page to change these. They’re saved on your device.</p>
      <ul>
        <li>
          <strong>Hard mode</strong>: once you find a letter you have to keep using it. Teal letters stay put and mustard letters
          have to appear somewhere in your next guess.
        </li>
        <li>
          <strong>Difficulty</strong>: easy picks common words with plenty of vowels, hard leans towards words with rarer letters
          or repeats.
        </li>
        <li>
          <strong>High contrast</strong>: switches to orange and blue and adds a symbol to each tile, for colour-blind players.
        </li>
      </ul>

      <h2>Playing with a keyboard</h2>
      <p>
        On a computer just start typing. <kbd>Enter</kbd> submits your guess and <kbd>Backspace</kbd> deletes a letter. Ready to try
        it? <Link to="/">Start a game</Link>, or read some <Link to="/strategies">tips first</Link>.
      </p>
    </div>
  </ContentPage>
);
