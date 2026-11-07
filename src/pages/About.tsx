import React from 'react';
import { Link } from 'react-router-dom';
import { ContentPage } from '../components/layout/ContentPage';
import { SITE } from '../seo/site';

export const About: React.FC = () => (
  <ContentPage path="/about" eyebrow="The story" intro="WordBrain is a small word game made for people who want one more puzzle after the daily one is done.">
    <div className="prose-page">
      <h2>Why it exists</h2>
      <p>
        Most word guessing games give you one puzzle a day and then you wait. That’s part of the charm, but sometimes you just want to
        keep playing. WordBrain has a daily word for the ritual, and unlimited games for the evenings when one isn’t enough.
      </p>

      <h2>What’s different</h2>
      <ul>
        <li>Words from five to eight letters, with easy, normal and hard word lists.</li>
        <li>A practice mode with hints, and a timed mode for when you want some pressure.</li>
        <li>A proper dictionary of over 100,000 words, so real words don’t get rejected.</li>
        <li>No account, no ads, no paywall. Your stats stay in your browser.</li>
        <li>Light and dark themes, a high contrast option, and it works with a keyboard or screen reader.</li>
      </ul>

      <h2>Who makes it</h2>
      <p>
        WordBrain is built by <a href={SITE.author.url} target="_blank" rel="noopener noreferrer">{SITE.author.name}</a>, a web
        developer who likes small, fast, well made things. It’s a side project, built with React and TypeScript, and the code is
        open on <a href={SITE.repo} target="_blank" rel="noopener noreferrer">GitHub</a>.
      </p>
      <ul>
        <li>
          Portfolio: <a href={SITE.author.url} target="_blank" rel="noopener noreferrer">shoaibarif.vercel.app</a>
        </li>
        <li>
          LinkedIn: <a href={SITE.author.linkedin} target="_blank" rel="noopener noreferrer">linkedin.com/in/shoaibmarif</a>
        </li>
        <li>
          GitHub: <a href={SITE.author.github} target="_blank" rel="noopener noreferrer">github.com/shoaibmarif</a>
        </li>
      </ul>

      <h2>Credits</h2>
      <p>
        The guess dictionary comes from the open source{' '}
        <a href="https://github.com/sindresorhus/word-list" target="_blank" rel="noopener noreferrer">word-list</a> package (MIT
        licence), which is based on SCOWL. Fonts are Fraunces, DM Sans and DM Mono from Google Fonts.
      </p>
      <p>
        Found a bug or have an idea? <Link to="/contact">Get in touch</Link>.
      </p>
    </div>
  </ContentPage>
);
