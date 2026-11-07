import React from 'react';
import { Mail } from 'lucide-react';
import { ContentPage } from '../components/layout/ContentPage';
import { Github, Linkedin } from '../components/ui/BrandIcons';
import { SITE } from '../seo/site';

const CARDS = [
  {
    href: `mailto:${SITE.author.email}?subject=WordBrain`,
    icon: Mail,
    title: 'Email',
    detail: SITE.author.email,
    note: 'Best for bug reports, word suggestions and anything else. I read everything.',
  },
  {
    href: SITE.issues,
    icon: Github,
    title: 'GitHub issues',
    detail: 'shoaibmarif/wordbrain',
    note: 'If you’re a developer, open an issue or a pull request. The code is public.',
  },
  {
    href: SITE.author.linkedin,
    icon: Linkedin,
    title: 'LinkedIn',
    detail: 'in/shoaibmarif',
    note: 'For work enquiries or just to connect.',
  },
];

export const Contact: React.FC = () => (
  <ContentPage path="/contact" eyebrow="Say hello" intro="Spotted a word that shouldn’t be there, or one that’s missing? Something broken on your phone? I’d like to hear about it.">
    <div className="grid gap-4 sm:grid-cols-3">
      {CARDS.map((c) => (
        <a
          key={c.title}
          href={c.href}
          target={c.href.startsWith('mailto:') ? undefined : '_blank'}
          rel="noopener noreferrer"
          className="block-card flex flex-col p-5 transition-transform hover:-translate-y-0.5"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-ink bg-paper text-ink">
            <c.icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="mt-4 font-display text-lg font-bold">{c.title}</span>
          <span className="mt-0.5 break-all text-sm font-medium text-accent-2">{c.detail}</span>
          <span className="mt-3 text-sm leading-6 text-ink-2">{c.note}</span>
        </a>
      ))}
    </div>
    <div className="prose-page mt-10">
      <p>
        If you’re reporting a bug, it helps to mention your browser and device, and what you were doing when it happened. For a
        rejected word, just tell me the word and the mode you were playing.
      </p>
      <p>
        You can also find more of my work at{' '}
        <a href={SITE.author.url} target="_blank" rel="noopener noreferrer">
          shoaibarif.vercel.app
        </a>
        .
      </p>
    </div>
  </ContentPage>
);
