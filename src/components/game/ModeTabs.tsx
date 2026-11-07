import React from 'react';
import { NavLink } from 'react-router-dom';
import { CalendarDays, Clock3, Infinity as InfinityIcon, Lightbulb } from 'lucide-react';

const TABS = [
  { to: '/daily', label: 'Daily', icon: CalendarDays },
  { to: '/', label: 'Unlimited', icon: InfinityIcon },
  { to: '/practice', label: 'Practice', icon: Lightbulb },
  { to: '/timed', label: 'Timed', icon: Clock3 },
];

/** Folder-style tabs sitting on top of the game card. */
export const ModeTabs: React.FC<{ activeOverride?: string }> = ({ activeOverride }) => (
  <nav aria-label="Game modes" className="-mb-[2px] flex gap-0.5 overflow-x-auto px-2 sm:gap-1 sm:px-5">
    {TABS.map(({ to, label, icon: Icon }) => (
      <NavLink
        key={to}
        to={to}
        end
        className={({ isActive }) => {
          const active = activeOverride ? activeOverride === to : isActive;
          return `relative flex shrink-0 items-center gap-1.5 rounded-t-lg border-2 px-2.5 py-2 text-sm font-semibold transition-colors sm:px-4 ${
            active ? 'z-10 border-ink border-b-card bg-card text-ink' : 'border-transparent text-muted hover:text-ink'
          }`;
        }}
      >
        <Icon className="hidden h-4 w-4 sm:block" aria-hidden="true" />
        {label}
      </NavLink>
    ))}
  </nav>
);
