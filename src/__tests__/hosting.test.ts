import { describe, it, expect } from 'vitest';
import { REDIRECTS, ROUTES, HASH_ROUTES } from '../seo/routes';
import vercel from '../../vercel.json';

describe('vercel.json', () => {
  it('redirects every retired URL permanently', () => {
    const map = Object.fromEntries(vercel.redirects.map((r: { source: string; destination: string }) => [r.source, r.destination]));
    expect(map).toEqual(REDIRECTS);
    for (const r of vercel.redirects) expect(r.permanent).toBe(true);
  });

  it('serves every page at its clean URL', () => {
    const rewrites = new Map(vercel.rewrites.map((r: { source: string; destination: string }) => [r.source, r.destination]));
    for (const r of ROUTES) if (r.path !== '/') expect(rewrites.get(r.path)).toBe(`${r.path}.html`);
  });

  it('never redirects a live page, and every redirect lands on one', () => {
    const live = new Set(ROUTES.map((r) => r.path));
    for (const [from, to] of Object.entries(REDIRECTS)) {
      expect(live.has(from)).toBe(false);
      expect(live.has(to)).toBe(true);
    }
    for (const to of Object.values(HASH_ROUTES)) expect(live.has(to)).toBe(true);
  });

  it('keeps titles and descriptions a sensible length', () => {
    for (const r of ROUTES) {
      expect(r.title.length, r.path).toBeLessThanOrEqual(65);
      expect(r.description.length, r.path).toBeLessThanOrEqual(170);
    }
  });
});
