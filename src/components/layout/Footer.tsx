import React from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { Github, Linkedin } from '../ui/BrandIcons';
import { Logo } from './Logo';
import { INFO_LINKS, LEARN_LINKS, LENGTH_LINKS, PLAY_LINKS } from './nav';
import { SITE } from '../../seo/site';
import { openConsentSettings } from '../../lib/consent';

const Column: React.FC<{ title: string; dot: string; links: { to: string; label: string }[] }> = ({ title, dot, links }) => (
  <div>
    <h2 className="eyebrow mb-3 flex items-center gap-2">
      <span className={`h-2 w-2 rounded-full ${dot}`} aria-hidden="true" />
      {title}
    </h2>
    <ul className="space-y-2 text-[15px]">
      {links.map((l) => (
        <li key={l.to}>
          <Link to={l.to} className="text-ink-2 hover:text-accent">
            {l.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export const Footer: React.FC = () => (
  <footer className="mt-24 border-t border-edge bg-paper-2/80">
    <div className="flex h-1.5" aria-hidden="true">
      <span className="flex-1 bg-accent" />
      <span className="flex-1 bg-near" />
      <span className="flex-1 bg-hit" />
      <span className="flex-1 bg-sky" />
      <span className="flex-1 bg-plum" />
    </div>
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_repeat(4,1fr)]">
      <div className="max-w-xs">
        <Logo />
        <p className="mt-4 text-[15px] leading-7 text-ink-2">
          A word guessing game you can play all day. Free, no account, and your stats never leave your browser.
        </p>
        <div className="mt-4 flex gap-2">
          {[
            { href: SITE.repo, label: 'Source code on GitHub', icon: <Github className="h-4 w-4" /> },
            { href: SITE.author.linkedin, label: 'Shoaib Arif on LinkedIn', icon: <Linkedin className="h-4 w-4" /> },
            { href: `mailto:${SITE.author.email}`, label: 'Send an email', icon: <Mail className="h-4 w-4" /> },
          ].map((s) => (
            <a
              key={s.href}
              href={s.href}
              target={s.href.startsWith('mailto:') ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={s.label}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-card text-ink shadow-sm transition-[transform,color] hover:-translate-y-0.5 hover:text-accent"
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>
      <Column title="Play" dot="bg-accent" links={PLAY_LINKS} />
      <Column title="Word length" dot="bg-hit" links={LENGTH_LINKS} />
      <Column title="Learn" dot="bg-sky" links={LEARN_LINKS} />
      <Column title="WordBrain" dot="bg-plum" links={INFO_LINKS} />
    </div>
    <div className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          © {new Date().getFullYear()} WordBrain. Made by{' '}
          <a href={SITE.author.url} target="_blank" rel="noopener noreferrer" className="font-medium text-ink-2 hover:text-accent">
            {SITE.author.name}
          </a>
          .
        </p>
        <button type="button" onClick={openConsentSettings} className="self-start text-left hover:text-ink sm:self-auto">
          Cookie settings
        </button>
      </div>
    </div>
  </footer>
);
