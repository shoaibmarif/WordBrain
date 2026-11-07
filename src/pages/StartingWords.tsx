import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ContentPage } from '../components/layout/ContentPage';
import { getSolutionsForLength } from '../data';
import { bestFollowUp, bestOpeners, letterFrequency } from '../game/letterStats';
import type { WordLength } from '../game/types';

const LENGTHS: WordLength[] = [5, 6, 7, 8];
const BAR_COLORS = ['bg-accent text-white', 'bg-near text-near-ink', 'bg-hit text-white', 'bg-sky text-white', 'bg-plum text-white', 'bg-berry text-white'];
const VOWELS = new Set(['A', 'E', 'I', 'O', 'U']);

const WordTiles: React.FC<{ word: string; tone?: 'hit' | 'near' | 'plain' }> = ({ word, tone = 'plain' }) => (
  <span className="inline-flex gap-1" aria-label={word}>
    {word.split('').map((c, i) => (
      <span
        key={i}
        aria-hidden="true"
        data-state={tone === 'hit' ? 'correct' : tone === 'near' ? 'present' : undefined}
        className="tile !w-8 !rounded-lg text-base sm:!w-9 sm:text-lg"
      >
        {c}
      </span>
    ))}
  </span>
);

export const StartingWords: React.FC = () => {
  const [length, setLength] = useState<WordLength>(5);

  const data = useMemo(() => {
    const words = getSolutionsForLength(length);
    const openers = bestOpeners(words, 6);
    return {
      count: words.length,
      freq: letterFrequency(words).slice(0, 12),
      openers,
      followUp: bestFollowUp(words, openers[0]),
    };
  }, [length]);

  const top = data.freq[0]?.share ?? 1;

  return (
    <ContentPage
      path="/starting-words"
      eyebrow="Guide · worked out from real answers"
      intro="A good first guess doesn’t need to be the answer. It needs to test the letters that turn up most often. Here are the openers that do that best, calculated from the actual answer lists WordBrain picks from."
    >
      <div className="mb-8 flex flex-wrap items-center gap-2" role="radiogroup" aria-label="Word length">
        {LENGTHS.map((n) => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={length === n}
            onClick={() => setLength(n)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              length === n ? 'bg-hit text-white' : 'border border-edge bg-card text-ink-2 hover:border-muted'
            }`}
          >
            {n} letters
          </button>
        ))}
      </div>

      <section className="block-card p-5 sm:p-7" aria-labelledby="openers-heading">
        <h2 id="openers-heading" className="text-2xl font-bold">
          Best {length} letter openers
        </h2>
        <p className="mt-1 text-sm text-muted">Ranked by how many of the {data.count} possible answers contain each of their letters.</p>
        <ol className="mt-5 grid gap-3 sm:grid-cols-2">
          {data.openers.map((w, i) => (
            <li key={w} className="flex items-center gap-3 rounded-2xl bg-paper-2 px-3 py-2.5">
              <span className="w-5 font-mono text-sm font-semibold text-muted">{i + 1}</span>
              <WordTiles word={w} tone={i === 0 ? 'hit' : 'plain'} />
            </li>
          ))}
        </ol>
        {data.followUp && (
          <div className="mt-6 rounded-2xl bg-near-soft p-4">
            <p className="font-semibold text-ink">A strong second guess</p>
            <p className="mt-1 text-sm leading-6 text-ink-2">
              If {data.openers[0]} doesn’t give you much, {data.followUp} shares none of its letters and covers the next most common
              ones. Together they test {length * 2} different letters in two turns.
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              <WordTiles word={data.openers[0]} />
              <WordTiles word={data.followUp} tone="near" />
            </div>
          </div>
        )}
        {!data.followUp && (
          <p className="callout mt-6">
            At {length} letters there’s no common word that avoids every letter of {data.openers[0]}, so for your second guess, keep
            the letters you found and swap in the most common ones you haven’t tried yet.
          </p>
        )}
      </section>

      <section className="mt-12" aria-labelledby="freq-heading">
        <h2 id="freq-heading" className="text-2xl font-bold">
          The most common letters
        </h2>
        <p className="mt-1 text-[15px] text-ink-2">Share of {length} letter answers that contain each letter at least once.</p>
        <ul className="mt-5 space-y-2">
          {data.freq.map((l, i) => (
            <li key={l.letter} className="flex items-center gap-3">
              <span className={`w-6 text-center font-display text-lg font-bold ${VOWELS.has(l.letter) ? 'text-accent-2' : 'text-ink'}`}>{l.letter}</span>
              <div className="h-7 flex-1 rounded-full bg-paper-2">
                <div
                  className={`flex h-7 items-center justify-end rounded-full pr-2.5 font-mono text-xs font-semibold ${BAR_COLORS[i % BAR_COLORS.length]}`}
                  style={{ width: `${Math.max(14, (l.share / top) * 100)}%` }}
                >
                  {Math.round(l.share * 100)}%
                </div>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-muted">Vowels are shown in orange.</p>
      </section>

      <div className="prose-page mt-12">
        <h2>Why this works</h2>
        <p>
          Every guess is a question. A first guess full of common letters is a question with a useful answer whichever way it goes:
          even five grey tiles rule out a big chunk of the possible words. A guess with Q, X or Z mostly tells you what you already
          suspected.
        </p>
        <p>
          It also matters that the letters are all different. Guessing a word with two Es spends a slot testing a letter you’ve
          already tested, which is why none of the openers above repeat a letter.
        </p>

        <h2>What the numbers don’t tell you</h2>
        <ul>
          <li>
            <strong>Position matters too.</strong> S is common, but mostly at the start or the end. A tile in the right spot is worth
            more than one in the word somewhere.
          </li>
          <li>
            <strong>Use one opener and stick with it.</strong> After a few weeks you’ll start recognising what each pattern of colours
            usually means, which is worth more than a slightly better word.
          </li>
          <li>
            <strong>Daily puzzles are five letters.</strong> If you mostly play the <Link to="/daily">daily word</Link>, learn the five
            letter list first.
          </li>
        </ul>
        <p>
          More ideas for the middle of the game are in <Link to="/strategies">tips and strategies</Link>. Or put an opener to the test
          in <Link to="/practice">practice mode</Link>, where nothing counts towards your stats.
        </p>
      </div>
    </ContentPage>
  );
};
