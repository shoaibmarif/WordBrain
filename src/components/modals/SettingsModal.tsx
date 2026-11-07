import React from 'react';
import { Modal } from '../ui/Modal';
import { useApp } from '../../context/AppContext';
import type { Difficulty, ThemeMode } from '../../game/types';

const Toggle: React.FC<{ label: string; hint: string; checked: boolean; onChange: (v: boolean) => void }> = ({ label, hint, checked, onChange }) => (
  <label className="flex cursor-pointer items-start justify-between gap-4 py-3.5">
    <span>
      <span className="block font-semibold text-ink">{label}</span>
      <span className="block text-sm leading-6 text-muted">{hint}</span>
    </span>
    <span className="relative mt-1 shrink-0">
      <input type="checkbox" className="peer sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span className="block h-7 w-12 rounded-full border border-edge bg-paper-2 transition-colors peer-checked:bg-hit peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent" />
      <span className="absolute left-1 top-1 h-5 w-5 rounded-full border border-edge bg-card transition-transform peer-checked:translate-x-5" />
    </span>
  </label>
);

function Segmented<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: { value: T; label: string }[]; onChange: (v: T) => void }) {
  return (
    <fieldset className="py-3.5">
      <legend className="mb-2 font-semibold text-ink">{label}</legend>
      <div className="flex rounded-lg border border-edge bg-paper-2 p-1">
        {options.map((o) => (
          <label key={o.value} className="flex-1">
            <input type="radio" className="peer sr-only" name={label} checked={value === o.value} onChange={() => onChange(o.value)} />
            <span className="block cursor-pointer rounded-md py-1.5 text-center text-sm font-semibold text-ink-2 transition-colors peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-accent">
              {o.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export const SettingsModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const { settings, updateSettings, theme, setTheme } = useApp();
  return (
    <Modal open={open} onClose={onClose} title="Settings" subtitle="Saved on this device.">
      <div className="divide-y-2 divide-dashed divide-line">
        <Segmented<ThemeMode>
          label="Theme"
          value={theme}
          onChange={setTheme}
          options={[
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
            { value: 'system', label: 'Auto' },
          ]}
        />
        <Segmented<Difficulty>
          label="Word difficulty (unlimited, practice, timed)"
          value={settings.difficulty}
          onChange={(difficulty) => updateSettings({ difficulty })}
          options={[
            { value: 'easy', label: 'Easy' },
            { value: 'medium', label: 'Normal' },
            { value: 'hard', label: 'Hard' },
          ]}
        />
        <Toggle
          label="Hard mode"
          hint="Letters you’ve found must be used in every later guess."
          checked={settings.hardMode}
          onChange={(hardMode) => updateSettings({ hardMode })}
        />
        <Toggle
          label="High contrast colours"
          hint="Orange and blue tiles with a small symbol, easier to tell apart for colour-blind players."
          checked={settings.highContrast}
          onChange={(highContrast) => updateSettings({ highContrast })}
        />
        <Toggle label="Sound" hint="Little clicks and a jingle when you win." checked={settings.soundEnabled} onChange={(soundEnabled) => updateSettings({ soundEnabled })} />
        <Toggle
          label="Animations"
          hint="Tile flips, shakes and confetti. Turn off for a calmer board."
          checked={settings.animationsEnabled}
          onChange={(animationsEnabled) => updateSettings({ animationsEnabled })}
        />
      </div>
    </Modal>
  );
};
