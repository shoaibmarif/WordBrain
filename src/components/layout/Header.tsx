import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { BarChart3, CircleHelp, Menu, Moon, Settings, Sun, X } from 'lucide-react';
import { Logo } from './Logo';
import { HEADER_LINKS } from './nav';
import { useApp } from '../../context/AppContext';

const iconBtn =
  'flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full text-ink-2 transition-colors hover:bg-card hover:text-ink';

export const Header: React.FC = () => {
  const { openModal, isDark, toggleTheme } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative px-1 py-1 text-[15px] font-medium transition-colors ${
      isActive ? 'text-ink after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[3px] after:rounded-full after:bg-accent' : 'text-ink-2 hover:text-ink'
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-edge bg-paper/85 backdrop-blur-md">
      <div className="flex h-1" aria-hidden="true">
        <span className="flex-1 bg-accent" />
        <span className="flex-1 bg-near" />
        <span className="flex-1 bg-hit" />
        <span className="flex-1 bg-sky" />
        <span className="flex-1 bg-plum" />
      </div>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-3 sm:gap-4 sm:px-6">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-6 md:flex">
          {HEADER_LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-0.5">
          <button type="button" className={iconBtn} onClick={() => openModal('help')} aria-label="How to play" title="How to play">
            <CircleHelp className="h-5 w-5" />
          </button>
          <button type="button" className={iconBtn} onClick={() => openModal('stats')} aria-label="Your statistics" title="Statistics">
            <BarChart3 className="h-5 w-5" />
          </button>
          <button type="button" className={iconBtn} onClick={() => openModal('settings')} aria-label="Settings" title="Settings">
            <Settings className="h-5 w-5" />
          </button>
          <button
            type="button"
            className={iconBtn}
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Light mode' : 'Dark mode'}
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button
            type="button"
            className={`${iconBtn} md:hidden`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-menu" aria-label="Mobile" className="animate-fade-in border-t border-edge bg-paper md:hidden">
          <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-2 px-4 py-4">
            {[...HEADER_LINKS, { to: '/practice', label: 'Practice' }, { to: '/timed', label: 'Timed' }].map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end
                  className={({ isActive }) =>
                    `block rounded-xl border px-3 py-2.5 font-medium ${isActive ? 'border-accent/40 bg-accent-soft text-ink' : 'border-line bg-card text-ink-2'}`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};
