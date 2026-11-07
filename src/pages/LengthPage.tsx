import React from 'react';
import { Link } from 'react-router-dom';
import { GameView } from '../components/game/GameView';
import { GamePage } from '../components/game/GamePage';

type Len = 5 | 6 | 7 | 8;

const COPY: Record<Len, { title: string; body: React.ReactNode[] }> = {
  5: {
    title: 'The classic size',
    body: [
      'Five letters is where most people start, and for good reason. There are enough possible words to make it a puzzle, but few enough that a good opening guess tells you a lot.',
      'Most five letter answers have two vowels, so an opener with A, E or O plus common consonants like R, S, T and L is hard to beat.',
    ],
  },
  6: {
    title: 'One letter makes a difference',
    body: [
      'Six letters sounds like a small step up, but the number of possible words roughly doubles. Endings start to matter: -ER, -ED, -LY and -ING show up all the time.',
      'Try an opener that tests three vowels at once, then use your second guess on the consonants you haven’t seen yet.',
    ],
  },
  7: {
    title: 'More clues, more possibilities',
    body: [
      'Every guess reveals seven letters, which sounds generous until you realise how many seven letter words there are. Look for prefixes and suffixes like RE-, UN-, -ION and -ING.',
      'Repeated letters are much more common at this length, so don’t rule them out too early.',
    ],
  },
  8: {
    title: 'The hardest board here',
    body: [
      'Eight letter words are long enough that the shape of the word matters more than single letters. Once you find two or three letters in place, try to picture the word around them.',
      'Six tries is tight. Use your first two guesses to cover as many different letters as you can, even if they can’t be the answer.',
    ],
  },
};

export const LengthPage: React.FC<{ length: Len }> = ({ length }) => {
  const copy = COPY[length];
  return (
    <GamePage path={`/${length}-letter-word-game`} game={<GameView mode="random" fixedLength={length} title={`${length} letter word game`} />}>
      <section className="prose-page">
        <h2>{copy.title}</h2>
        {copy.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        <p>
          Games here use the same rules as everywhere else on WordBrain: six tries, real words only, and a teal tile for
          every letter in the right spot. New to it? Start with <Link to="/how-to-play">how to play</Link>.
        </p>
      </section>
    </GamePage>
  );
};
