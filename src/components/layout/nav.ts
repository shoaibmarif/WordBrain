export const PLAY_LINKS = [
  { to: '/', label: 'Unlimited' },
  { to: '/daily', label: 'Daily' },
  { to: '/practice', label: 'Practice' },
  { to: '/timed', label: 'Timed' },
];

export const LENGTH_LINKS = [5, 6, 7, 8].map((n) => ({ to: `/${n}-letter-word-game`, label: `${n} letter words` }));

export const LEARN_LINKS = [
  { to: '/how-to-play', label: 'How to play' },
  { to: '/strategies', label: 'Tips and strategies' },
  { to: '/starting-words', label: 'Best starting words' },
  { to: '/faq', label: 'FAQ' },
];

export const INFO_LINKS = [
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/privacy', label: 'Privacy' },
  { to: '/terms', label: 'Terms' },
  { to: '/sitemap', label: 'Sitemap' },
];

/** Links in the top bar. */
export const HEADER_LINKS = [
  { to: '/daily', label: 'Daily' },
  { to: '/', label: 'Unlimited' },
  { to: '/how-to-play', label: 'How to play' },
  { to: '/strategies', label: 'Tips' },
  { to: '/faq', label: 'FAQ' },
];
