import React from 'react';
import { NavLink } from 'react-router-dom';
import { CalendarDays, Clock3, Infinity as InfinityIcon, Lightbulb } from 'lucide-react';

/** Each mode has its own colour, used on its tab and the top edge of the game card. */
export const MODE_COLORS = {
  daily: { solid: 'bg-accent', soft: 'bg-accent-soft', text: 'text-accent-2' },
  random: { solid: 'bg-hit', soft: 'bg-hit-soft', text: 'text-hit' },
  practice: { solid: 'bg-near', soft: 'bg-near-soft', text: 'text-ink' },
  timed: { solid: 'bg-sky', soft: 'bg-sky-soft', text: 'text-sky' },
} as const;

const TABS = [
  { to: '/daily', label: 'Daily', icon: CalendarDays, color: MODE_COLORS.daily },
  { to: '/', label: 'Unlimited', icon: InfinityIcon, color: MODE_COLORS.random },
  { to: '/practice', label: 'Practice', icon: Lightbulb, color: MODE_COLORS.practice },
  { to: '/timed', label: 'Timed', icon: Clock3, color: MODE_COLORS.timed },
];

export const ModeTabs: React.FC<{ activeOverride?: string }> = ({ activeOverride }) => (
  <nav aria-label="Game modes" className="mb-3 flex justify-center">
    <div className="flex gap-1 overflow-x-auto rounded-full border border-edge bg-card/80 p-1 shadow-sm backdrop-blur">
      {TABS.map(({ to, label, icon: Icon, color }) => (
        <NavLink
          key={to}
          to={to}
          end
          className={({ isActive }) => {
            const active = activeOverride ? activeOverride === to : isActive;
            return `flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-semibold transition-colors sm:px-4 sm:text-sm ${
              active ? `${color.soft} ${color.text}` : 'text-muted hover:bg-paper-2 hover:text-ink'
            }`;
          }}
        >
          {({ isActive }) => (
            <>
              <span
                className={`hidden h-5 w-5 items-center sm:flex justify-center rounded-full text-white ${color.solid} ${
                  (activeOverride ? activeOverride === to : isActive) ? '' : 'opacity-70'
                }`}
                aria-hidden="true"
              >
                <Icon className="h-3 w-3" strokeWidth={2.5} />
              </span>
              {label}
            </>
          )}
        </NavLink>
      ))}
    </div>
  </nav>
);
