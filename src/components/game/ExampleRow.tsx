import React from 'react';

/** A static row of tiles for explaining the rules. */
export const ExampleRow: React.FC<{ word: string; states: Record<number, 'correct' | 'present' | 'absent'> }> = ({ word, states }) => (
  <div className="flex gap-1.5" aria-hidden="true">
    {word.split('').map((ch, i) => (
      <div key={i} data-state={states[i] ?? 'tbd'} className="tile h-11 w-11 text-xl">
        {ch}
      </div>
    ))}
  </div>
);
