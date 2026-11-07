import React from 'react';
import { Link } from 'react-router-dom';
import { SeoMeta } from '../components/seo/SeoMeta';
import { ExampleRow } from '../components/game/ExampleRow';

export const NotFound: React.FC = () => (
  <div className="mx-auto flex max-w-xl flex-col items-center py-10 text-center">
    <SeoMeta canonicalPath="/404" title="Page not found" description="This page doesn’t exist." noindex />
    <div className="flex flex-col items-center gap-1.5">
      <ExampleRow word="LOST" states={{ 0: 'absent', 1: 'absent', 2: 'absent', 3: 'absent' }} />
    </div>
    <h1 className="mt-8 text-4xl font-bold">Not in our word list</h1>
    <p className="mt-3 text-lg text-ink-2">That page doesn’t exist, or it moved. The game is still where you left it.</p>
    <div className="mt-8 flex flex-wrap justify-center gap-3">
      <Link to="/" className="btn btn-accent">
        Play a game
      </Link>
      <Link to="/daily" className="btn btn-plain">
        Today’s puzzle
      </Link>
    </div>
  </div>
);
