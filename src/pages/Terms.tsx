import React from 'react';
import { Link } from 'react-router-dom';
import { ContentPage } from '../components/layout/ContentPage';
import { SITE } from '../seo/site';

export const Terms: React.FC = () => (
  <ContentPage path="/terms" eyebrow="Last updated 7 November 2026" intro="By using WordBrain you agree to these terms. They’re short, and written to be read.">
    <div className="prose-page">
      <h2>Using WordBrain</h2>
      <p>
        WordBrain is a free game for personal entertainment. You can play as much as you like. Please don’t try to break it, overload
        it, or use it for anything unlawful.
      </p>

      <h2>No guarantees</h2>
      <p>
        We try to keep the game running and the word lists sensible, but WordBrain is provided as it is, without warranties of any
        kind. It may change, pause or stop at any time. Your stats are stored in your browser, so they can be lost if you clear your
        data or switch devices, and we can’t recover them.
      </p>

      <h2>Words</h2>
      <p>
        Answers are picked from lists of common English words, and guesses are checked against a larger open source dictionary.
        A word being accepted or rejected isn’t a judgement on whether it’s “real”. If something looks wrong, let us know.
      </p>

      <h2>The code and content</h2>
      <p>
        The source code is public on <a href={SITE.repo} target="_blank" rel="noopener noreferrer">GitHub</a>. The name WordBrain, the
        logo and the written content on this site belong to {SITE.author.name}. The dictionary is used under the MIT licence of the{' '}
        <a href="https://github.com/sindresorhus/word-list" target="_blank" rel="noopener noreferrer">word-list</a> package.
      </p>

      <h2>Liability</h2>
      <p>
        To the extent the law allows, we aren’t liable for any loss arising from using WordBrain, including lost streaks, which we
        know can hurt.
      </p>

      <h2>Privacy</h2>
      <p>
        How we handle data is covered in the <Link to="/privacy">privacy policy</Link>.
      </p>

      <h2>Changes and contact</h2>
      <p>
        We may update these terms from time to time; the date at the top shows the latest version. Questions? Email{' '}
        <a href={`mailto:${SITE.author.email}`}>{SITE.author.email}</a>.
      </p>
    </div>
  </ContentPage>
);
