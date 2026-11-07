import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { useApp } from '../../context/AppContext';
import { readDailyStats } from '../../game/dailyStore';
import { dailyNumber, liveStreak } from '../../game/daily';

const MODE_LABEL = { random: 'Unlimited', practice: 'Practice', timed: 'Timed', daily: 'Daily' } as const;

const Stat: React.FC<{ value: React.ReactNode; label: string }> = ({ value, label }) => (
  <div className="rounded-lg border-2 border-ink bg-paper px-2 py-3 text-center">
    <div className="font-display text-3xl font-bold leading-none text-ink">{value}</div>
    <div className="mt-1.5 text-xs font-medium leading-4 text-muted">{label}</div>
  </div>
);

export const StatsModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const { stats, history, resetStats, clearHistory } = useApp();
  const [confirming, setConfirming] = useState(false);
  const daily = readDailyStats();
  const max = Math.max(1, ...Object.values(stats.guessDistribution));

  return (
    <Modal open={open} onClose={() => { setConfirming(false); onClose(); }} title="Your stats" subtitle="Practice games don’t count, so go wild with hints.">
      <div className="grid grid-cols-4 gap-2">
        <Stat value={stats.gamesPlayed} label="Played" />
        <Stat value={`${stats.winPercentage}%`} label="Won" />
        <Stat value={stats.currentStreak} label="Streak" />
        <Stat value={stats.maxStreak} label="Best streak" />
      </div>

      <div className="mt-3 flex items-center justify-between rounded-lg border-2 border-dashed border-line px-3 py-2.5 text-sm">
        <span className="text-ink-2">Daily puzzle streak</span>
        <span className="font-semibold text-ink">
          {liveStreak(daily, dailyNumber())} {liveStreak(daily, dailyNumber()) === 1 ? 'day' : 'days'} · best {daily.maxStreak}
        </span>
      </div>

      <h3 className="mt-6 mb-2 font-sans text-sm font-semibold text-ink">Guesses it took to win</h3>
      <div className="space-y-1.5">
        {[1, 2, 3, 4, 5, 6].map((n) => {
          const count = stats.guessDistribution[n] ?? 0;
          return (
            <div key={n} className="flex items-center gap-2 text-sm">
              <span className="w-3 font-mono text-muted">{n}</span>
              <div className="flex-1">
                <div
                  className={`flex h-6 min-w-7 items-center justify-end rounded-[5px] border-2 border-ink px-1.5 font-mono text-xs font-semibold ${count ? 'bg-hit text-hit-ink' : 'bg-paper-2 text-muted'}`}
                  style={{ width: `${Math.max(8, (count / max) * 100)}%` }}
                >
                  {count}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {history.length > 0 && (
        <>
          <h3 className="mt-6 mb-2 font-sans text-sm font-semibold text-ink">Recent games</h3>
          <ul className="max-h-44 divide-y divide-line overflow-y-auto rounded-lg border-2 border-line text-sm">
            {history.slice(0, 15).map((g) => (
              <li key={g.id} className="flex items-center justify-between gap-3 px-3 py-2">
                <span className="font-mono font-semibold tracking-wider text-ink">{g.targetWord}</span>
                <span className="text-muted">{MODE_LABEL[g.mode] ?? g.mode}</span>
                <span className={`ml-auto font-semibold ${g.won ? 'text-hit' : 'text-accent-2'}`}>{g.won ? `${g.attemptsUsed}/${g.maxAttempts}` : 'X'}</span>
              </li>
            ))}
          </ul>
        </>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-2 border-t-2 border-dashed border-line pt-4">
        {confirming ? (
          <>
            <span className="text-sm text-ink-2">Wipe all stats and history?</span>
            <button type="button" className="btn btn-accent btn-sm" onClick={() => { resetStats(); clearHistory(); setConfirming(false); }}>
              Yes, reset
            </button>
            <button type="button" className="btn btn-plain btn-sm" onClick={() => setConfirming(false)}>
              Keep them
            </button>
          </>
        ) : (
          <button type="button" className="text-sm font-medium text-muted underline underline-offset-2 hover:text-accent-2" onClick={() => setConfirming(true)}>
            Reset stats
          </button>
        )}
      </div>
    </Modal>
  );
};
