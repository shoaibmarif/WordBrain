import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpenText, Brain, CalendarDays, Check, Clock3, Coffee, Flame, Lightbulb, Ruler } from 'lucide-react';
import { GameView } from '../components/game/GameView';
import { GamePage } from '../components/game/GamePage';
import { ExampleRow } from '../components/game/ExampleRow';
import { Accordion } from '../components/ui/Accordion';
import { FAQ_ITEMS } from '../data/faq';
import { DICTIONARY_SIZES, getSolutionsForLength } from '../data';
import { dailyNumber, formatCountdown, liveStreak, msUntilNextPuzzle } from '../game/daily';
import { readDailyProgress, readDailyStats } from '../game/dailyStore';
import { suggestedOpener } from '../game/letterStats';

const MODES = [
  {
    to: '/daily',
    icon: CalendarDays,
    title: 'Daily puzzle',
    body: 'One word for everyone, every day. Keep your streak alive and share your grid.',
    card: 'bg-accent-soft',
    iconBg: 'bg-accent text-white',
  },
  {
    to: '/practice',
    icon: Lightbulb,
    title: 'Practice',
    body: 'No stats, no stress, and a couple of hints for when you’re properly stuck.',
    card: 'bg-near-soft',
    iconBg: 'bg-near text-near-ink',
  },
  {
    to: '/timed',
    icon: Clock3,
    title: 'Timed',
    body: 'Two minutes on the clock. Surprisingly hard when you can see it ticking.',
    card: 'bg-sky-soft',
    iconBg: 'bg-sky text-white',
  },
  {
    to: '/8-letter-word-game',
    icon: Ruler,
    title: 'Longer words',
    body: 'Six, seven or eight letters. Same six tries, a lot more to think about.',
    card: 'bg-plum-soft',
    iconBg: 'bg-plum text-white',
  },
];

const LENGTH_ROWS = ([5, 6, 7, 8] as const).map((n) => ({
  n,
  answers: getSolutionsForLength(n).length,
  dictionary: DICTIONARY_SIZES[n],
  opener: suggestedOpener(n),
}));

const HABITS = [
  {
    icon: Coffee,
    tint: 'bg-near-soft text-ink',
    title: 'Fits in a coffee break',
    body: 'Most games take two or three minutes. The daily puzzle is a nice way to start the morning without getting lost in your phone.',
  },
  {
    icon: BookOpenText,
    tint: 'bg-hit-soft text-hit',
    title: 'Everyday words',
    body: 'Answers are common words you already know, not dictionary oddities. Every finished game links to the meaning if you want to check.',
  },
  {
    icon: Brain,
    tint: 'bg-plum-soft text-plum',
    title: 'A little logic workout',
    body: 'Each guess is a small puzzle of its own: which letters to keep, which to test and where they could go. It gets satisfying fast.',
  },
];

/** Today’s puzzle number, the player’s streak and how long until the next word. */
const TodayStrip: React.FC = () => {
  const puzzle = dailyNumber();
  const progress = readDailyProgress(puzzle);
  const streak = liveStreak(readDailyStats(), puzzle);
  const done = progress.status !== 'playing';
  const [ms, setMs] = useState(() => msUntilNextPuzzle());

  useEffect(() => {
    const id = window.setInterval(() => setMs(msUntilNextPuzzle()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section aria-label="Today’s puzzle" className="lg:-mx-24">
      <div className="block-card grid gap-4 p-5 sm:grid-cols-[1fr_auto_auto] sm:items-center sm:gap-8 sm:p-6">
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-white">
            <CalendarDays className="h-6 w-6" aria-hidden="true" />
          </span>
          <div>
            <p className="eyebrow">Daily puzzle #{puzzle}</p>
            <p className="font-display text-xl font-bold">
              {done ? (progress.status === 'won' ? 'Solved today. Nice!' : 'Better luck tomorrow') : 'Today’s word is waiting'}
            </p>
          </div>
        </div>
        <div className="flex gap-6 text-sm">
          <div>
            <p className="text-muted">Your streak</p>
            <p className="flex items-center gap-1 font-display text-2xl font-bold">
              <Flame className="h-5 w-5 text-accent" aria-hidden="true" />
              {streak}
            </p>
          </div>
          <div>
            <p className="text-muted">Next word in</p>
            <p className="font-mono text-2xl font-medium tabular-nums">{formatCountdown(ms)}</p>
          </div>
        </div>
        <Link to="/daily" className={`btn ${done ? 'btn-plain' : 'btn-accent'}`}>
          {done ? (
            <>
              <Check className="h-4 w-4" aria-hidden="true" /> See result
            </>
          ) : (
            <>
              Play today’s word <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </Link>
      </div>
    </section>
  );
};

export const Home: React.FC = () => (
  <GamePage path="/" game={<GameView mode="random" title="Guess the word" />}>
    <TodayStrip />

    <section aria-labelledby="modes-heading" className="mt-16 lg:-mx-24">
      <h2 id="modes-heading" className="text-3xl font-bold sm:text-4xl">
        Pick your kind of puzzle
      </h2>
      <p className="mt-2 text-ink-2">Four ways to play. Everything is free, and everything except the daily word is unlimited.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {MODES.map((m) => (
          <Link key={m.to} to={m.to} className={`lift group flex gap-4 rounded-[20px] p-5 ${m.card}`}>
            <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${m.iconBg}`}>
              <m.icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span>
              <span className="flex items-center gap-1.5 font-display text-lg font-bold">
                {m.title}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
              <span className="mt-1 block text-[15px] leading-6 text-ink-2">{m.body}</span>
            </span>
          </Link>
        ))}
      </div>
    </section>

    <section aria-labelledby="rules-heading" className="mt-20 grid items-center gap-8 sm:grid-cols-[1fr_auto]">
      <div className="prose-page">
        <h2 id="rules-heading" className="!mt-0">
          The rules fit on a sticky note
        </h2>
        <p>
          Guess a real word and the tiles tell you how close you were. <strong>Teal</strong> is the right letter in the right spot,{' '}
          <strong>mustard</strong> is in the word but somewhere else, and <strong>grey</strong> isn’t in the word at all. You have six
          tries.
        </p>
        <p>
          That’s it. The rest is vocabulary, a bit of logic and the occasional lucky guess. If you want the details, there’s a{' '}
          <Link to="/how-to-play">full guide</Link>.
        </p>
      </div>
      <div className="block-card flex flex-col gap-2 p-4" aria-label="Example: three guesses to find TRITE">
        <ExampleRow word="STARE" states={{ 0: 'absent', 1: 'present', 2: 'absent', 3: 'present', 4: 'correct' }} />
        <ExampleRow word="TROVE" states={{ 0: 'correct', 1: 'correct', 2: 'absent', 3: 'absent', 4: 'correct' }} />
        <ExampleRow word="TRITE" states={{ 0: 'correct', 1: 'correct', 2: 'correct', 3: 'correct', 4: 'correct' }} />
        <p className="mt-1 text-center text-xs text-muted">Solved in three</p>
      </div>
    </section>

    <section aria-labelledby="lengths-heading" className="mt-20">
      <h2 id="lengths-heading" className="text-3xl font-bold sm:text-4xl">
        How hard is each length?
      </h2>
      <p className="mt-2 text-ink-2">
        Longer words give you more letters per guess, but the number of possible words grows quickly. Here’s what you’re up against.
      </p>
      <div className="mt-6 overflow-x-auto rounded-[20px] border border-edge bg-card">
        <table className="w-full min-w-[32rem] text-left text-[15px]">
          <thead>
            <tr className="bg-paper-2 text-sm text-muted">
              <th scope="col" className="px-4 py-3 font-semibold">Length</th>
              <th scope="col" className="px-4 py-3 font-semibold">Possible answers</th>
              <th scope="col" className="px-4 py-3 font-semibold">Words you can guess</th>
              <th scope="col" className="px-4 py-3 font-semibold">Best opener</th>
            </tr>
          </thead>
          <tbody>
            {LENGTH_ROWS.map((r, i) => (
              <tr key={r.n} className="border-t border-line">
                <th scope="row" className="px-4 py-3">
                  <Link to={`/${r.n}-letter-word-game`} className="inline-flex items-center gap-2 font-semibold text-ink hover:text-accent-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${['bg-hit', 'bg-near', 'bg-sky', 'bg-plum'][i]}`} aria-hidden="true" />
                    {r.n} letters
                  </Link>
                </th>
                <td className="px-4 py-3 tabular-nums text-ink-2">{r.answers.toLocaleString('en-US')}</td>
                <td className="px-4 py-3 tabular-nums text-ink-2">{r.dictionary.toLocaleString('en-US')}</td>
                <td className="px-4 py-3 font-mono font-medium tracking-wider text-ink">{r.opener}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-sm text-muted">
        Answers are everyday words; your guesses can be any word in the dictionary. More on openers in{' '}
        <Link to="/starting-words" className="font-semibold text-ink underline underline-offset-2">
          best starting words
        </Link>
        .
      </p>
    </section>

    <section aria-labelledby="habit-heading" className="mt-20 lg:-mx-24">
      <h2 id="habit-heading" className="text-3xl font-bold sm:text-4xl">
        Why people keep coming back
      </h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {HABITS.map((h) => (
          <div key={h.title} className="block-card p-5">
            <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${h.tint}`}>
              <h.icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-lg font-bold">{h.title}</h3>
            <p className="mt-1.5 text-[15px] leading-6 text-ink-2">{h.body}</p>
          </div>
        ))}
      </div>
    </section>

    <section aria-labelledby="faq-heading" className="mt-20">
      <h2 id="faq-heading" className="text-3xl font-bold sm:text-4xl">
        Questions people ask
      </h2>
      <div className="mt-6">
        <Accordion items={FAQ_ITEMS.slice(0, 5)} />
      </div>
      <Link to="/faq" className="mt-5 inline-flex items-center gap-1.5 font-semibold text-ink underline decoration-accent decoration-2 underline-offset-4">
        All questions <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </section>
  </GamePage>
);
