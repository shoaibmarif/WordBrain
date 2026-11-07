import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, Clock3, Lightbulb, Ruler } from 'lucide-react';
import { GameView } from '../components/game/GameView';
import { GamePage } from '../components/game/GamePage';
import { ExampleRow } from '../components/game/ExampleRow';
import { Accordion } from '../components/ui/Accordion';
import { FAQ_ITEMS } from '../data/faq';

const MODES = [
  {
    to: '/daily',
    icon: CalendarDays,
    title: 'Daily puzzle',
    body: 'One word for everyone, every day. Keep your streak alive and share your grid.',
    tint: 'bg-accent text-white',
  },
  {
    to: '/practice',
    icon: Lightbulb,
    title: 'Practice',
    body: 'No stats, no stress, and a couple of hints for when you’re properly stuck.',
    tint: 'bg-near text-near-ink',
  },
  {
    to: '/timed',
    icon: Clock3,
    title: 'Timed',
    body: 'Two minutes on the clock. Surprisingly hard when you can hear it ticking.',
    tint: 'bg-hit text-hit-ink',
  },
  {
    to: '/8-letter-word-game',
    icon: Ruler,
    title: 'Longer words',
    body: 'Six, seven or eight letters. Same six tries, a lot more to think about.',
    tint: 'bg-ink text-paper',
  },
];

export const Home: React.FC = () => (
  <GamePage path="/" game={<GameView mode="random" title="Guess the word" />}>
    <section aria-labelledby="modes-heading" className="lg:-mx-24">
      <h2 id="modes-heading" className="text-3xl font-bold sm:text-4xl">
        Pick your kind of puzzle
      </h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {MODES.map((m) => (
          <Link key={m.to} to={m.to} className="block-card group flex gap-4 p-5 transition-transform hover:-translate-y-0.5">
            <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border-2 border-ink ${m.tint}`}>
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
      <div className="soft-card flex flex-col gap-2 p-4" aria-label="Example guesses">
        <ExampleRow word="STARE" states={{ 0: 'absent', 1: 'present', 2: 'absent', 3: 'present', 4: 'correct' }} />
        <ExampleRow word="TROVE" states={{ 0: 'correct', 1: 'correct', 2: 'absent', 3: 'absent', 4: 'correct' }} />
        <ExampleRow word="TRITE" states={{ 0: 'correct', 1: 'correct', 2: 'correct', 3: 'correct', 4: 'correct' }} />
      </div>
    </section>

    <section aria-labelledby="faq-heading" className="mt-20">
      <h2 id="faq-heading" className="text-3xl font-bold sm:text-4xl">
        Questions people ask
      </h2>
      <div className="mt-6">
        <Accordion items={FAQ_ITEMS.slice(0, 4)} />
      </div>
      <Link to="/faq" className="mt-5 inline-flex items-center gap-1.5 font-semibold text-ink underline decoration-accent decoration-2 underline-offset-4">
        More questions <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </section>
  </GamePage>
);
