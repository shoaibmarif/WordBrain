import React from 'react';
import { Link } from 'react-router-dom';
import { ContentPage } from '../components/layout/ContentPage';

export const Strategies: React.FC = () => (
  <ContentPage
    path="/strategies"
    eyebrow="Get better"
    intro="You don’t need a huge vocabulary to get good at this. Mostly you need a decent first guess and the patience not to waste the second one."
  >
    <div className="prose-page">
      <h2>1. Open with common letters</h2>
      <p>
        The letters that turn up most in five letter English words are E, A, R, O, T, L, I and S. A first guess that tests four or
        five of them, with no repeats, tells you far more than a word full of rare letters. A few that work well:
      </p>
      <ul>
        <li>
          <strong>STARE, CRANE, SLATE, TRACE</strong>: strong all-rounders.
        </li>
        <li>
          <strong>AROSE, ADIEU</strong>: lots of vowels, good if vowels are what usually trip you up.
        </li>
        <li>
          <strong>LOTUS, ROUND</strong>: handy second guesses after a vowel-heavy opener.
        </li>
      </ul>
      <p>
        Pick one and stick with it for a while. Using the same opener every time means you start recognising patterns in what
        comes back.
      </p>

      <h2>2. Spend your second guess on new letters</h2>
      <p>
        It’s tempting to build your second guess around the one mustard letter you found. Often it’s better to try five letters you
        haven’t tested yet. Between two guesses you can cover ten different letters, and that usually narrows things down a lot.
        (Hard mode doesn’t let you do this, which is exactly why it’s hard.)
      </p>

      <h2>3. Think about where letters usually go</h2>
      <p>
        English words have habits. S often starts or ends a word, Y likes the end, and pairs like CH, SH, TH, ST and CR tend to come
        first. If you know there’s an H but not where, try it after C, S or T before anywhere else.
      </p>

      <h2>4. Don’t forget about repeats</h2>
      <p>
        When you’re stuck with three or four letters in place and nothing seems to fit, the answer often has a repeated letter. Words
        like SPOON, LLAMA or SKILL catch a lot of people out.
      </p>

      <h2>5. Watch out for word traps</h2>
      <p>
        Sometimes you’ll have _IGHT, a handful of letters that could go first and only a few guesses left. Trying them one by one
        is a gamble. Instead, spend one guess on a word that tests several candidates at once (FILMS checks F, L and M in one go),
        then go for the answer.
      </p>

      <h2>6. Longer words need a different approach</h2>
      <p>
        With seven or eight letters, think about chunks rather than single letters. Common endings (-ING, -TION, -ER, -LY) and
        beginnings (RE-, UN-, DIS-) are worth testing early. Our{' '}
        <Link to="/7-letter-word-game">seven letter</Link> and <Link to="/8-letter-word-game">eight letter</Link> pages have a few
        more pointers.
      </p>

      <h2>Practise without losing your streak</h2>
      <p>
        <Link to="/practice">Practice mode</Link> doesn’t touch your stats, so it’s a good place to try a new opener or test these
        ideas without anything on the line.
      </p>
    </div>
  </ContentPage>
);
