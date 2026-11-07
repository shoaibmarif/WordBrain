/**
 * SEO metadata for every page. Used at runtime by <SeoMeta> and at build time
 * by scripts/seoPlugin.ts (one static HTML file per page + sitemap.xml).
 * Keep titles under ~60 characters.
 */
export type ChangeFreq = 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface RouteMeta {
  path: string;
  title: string;
  description: string;
  label: string;
  heading: string;
  changefreq: ChangeFreq;
  priority: number;
  noindex?: boolean;
  parent?: string;
  /** Interactive game pages get WebApplication structured data. */
  app?: boolean;
}

const lengthPage = (n: 5 | 6 | 7 | 8): RouteMeta => ({
  path: `/${n}-letter-word-game`,
  title: `${n} Letter Word Game - Guess the Word in Six Tries`,
  description: {
    5: 'The classic: guess a hidden five letter word in six tries. Free, unlimited games with a fresh word every time.',
    6: 'One letter longer and noticeably trickier. Guess the six letter word in six tries, as many games as you like.',
    7: 'Seven letter words give you more clues per guess but far more possibilities. Can you crack one in six tries?',
    8: 'The toughest board on WordBrain. Find the hidden eight letter word in six tries. Free and unlimited.',
  }[n],
  label: `${n} letters`,
  heading: `${n} letter word game`,
  changefreq: 'monthly',
  priority: 0.7,
  parent: '/',
  app: true,
});

export const ROUTES: RouteMeta[] = [
  {
    path: '/',
    title: 'WordBrain - Free Word Guessing Game, Daily and Unlimited',
    description:
      'Guess the hidden word in six tries. Play a new daily puzzle, unlimited games, practice with hints or a timed mode, with 5 to 8 letter words.',
    label: 'Home',
    heading: 'Guess the word',
    changefreq: 'weekly',
    priority: 1.0,
    app: true,
  },
  {
    path: '/daily',
    title: 'Daily Word Puzzle - A New Word Every Day',
    description:
      'One five letter word a day, the same for everyone. Solve it in six tries, keep your streak going and share your result without spoilers.',
    label: 'Daily',
    heading: 'Today’s word',
    changefreq: 'daily',
    priority: 0.9,
    parent: '/',
    app: true,
  },
  {
    path: '/practice',
    title: 'Practice Word Game With Hints',
    description:
      'A relaxed way to play: no streak on the line and a couple of hints when you’re stuck. Reveal a letter or rule some out.',
    label: 'Practice',
    heading: 'Practice with hints',
    changefreq: 'monthly',
    priority: 0.8,
    parent: '/',
    app: true,
  },
  {
    path: '/timed',
    title: 'Timed Word Game - Beat the Clock',
    description: 'Two minutes to find the hidden word. A fast, slightly stressful twist on the classic word guessing game.',
    label: 'Timed',
    heading: 'Beat the clock',
    changefreq: 'monthly',
    priority: 0.8,
    parent: '/',
    app: true,
  },
  lengthPage(5),
  lengthPage(6),
  lengthPage(7),
  lengthPage(8),
  {
    path: '/how-to-play',
    title: 'How to Play WordBrain - Rules and Colours Explained',
    description: 'The rules in a minute: what the tile colours mean, how repeated letters work, hard mode, and the different ways to play.',
    label: 'How to play',
    heading: 'How to play',
    changefreq: 'monthly',
    priority: 0.7,
    parent: '/',
  },
  {
    path: '/strategies',
    title: 'Word Game Tips and Strategies That Actually Help',
    description:
      'Good starting words, how to use your second guess, dealing with repeated letters and when to play for information instead of the win.',
    label: 'Tips',
    heading: 'Tips and strategies',
    changefreq: 'monthly',
    priority: 0.7,
    parent: '/',
  },
  {
    path: '/faq',
    title: 'WordBrain FAQ - Common Questions Answered',
    description: 'How the daily word works, why a word was rejected, what hard mode does, where your stats are saved and more.',
    label: 'FAQ',
    heading: 'Frequently asked questions',
    changefreq: 'monthly',
    priority: 0.6,
    parent: '/',
  },
  {
    path: '/about',
    title: 'About WordBrain',
    description: 'Why WordBrain exists, what makes it different, and who builds it.',
    label: 'About',
    heading: 'About WordBrain',
    changefreq: 'yearly',
    priority: 0.5,
    parent: '/',
  },
  {
    path: '/contact',
    title: 'Contact',
    description: 'Report a bug, suggest a word or just say hello. Email, LinkedIn and GitHub links for WordBrain.',
    label: 'Contact',
    heading: 'Contact',
    changefreq: 'yearly',
    priority: 0.4,
    parent: '/',
  },
  {
    path: '/privacy',
    title: 'Privacy Policy',
    description: 'WordBrain has no accounts and no game server. Your stats stay in your browser. Here’s what little we collect.',
    label: 'Privacy',
    heading: 'Privacy policy',
    changefreq: 'yearly',
    priority: 0.3,
    parent: '/',
  },
  {
    path: '/terms',
    title: 'Terms and Conditions',
    description: 'The terms that apply when you use WordBrain.',
    label: 'Terms',
    heading: 'Terms and conditions',
    changefreq: 'yearly',
    priority: 0.3,
    parent: '/',
  },
  {
    path: '/sitemap',
    title: 'Sitemap',
    description: 'Every page on WordBrain in one list.',
    label: 'Sitemap',
    heading: 'Sitemap',
    changefreq: 'monthly',
    priority: 0.2,
    parent: '/',
  },
];

/** Old URLs permanently redirected to their canonical page. */
export const REDIRECTS: Record<string, string> = {
  '/random': '/',
  '/play': '/',
  '/daily-challenge': '/daily',
  '/speed-run': '/timed',
  '/rules': '/how-to-play',
  '/tips': '/strategies',
};

/** Old hash URLs (#/practice) mapped to real paths. */
export const HASH_ROUTES: Record<string, string> = {
  '#/': '/',
  '#/practice': '/practice',
  '#/timed': '/timed',
  '#/how-to-play': '/how-to-play',
  '#/strategies': '/strategies',
  '#/about': '/about',
  '#/privacy': '/privacy',
  '#/terms': '/terms',
};

const byPath = new Map(ROUTES.map((m) => [m.path, m]));
export const getRouteMeta = (path: string): RouteMeta | undefined => byPath.get(path);

export const getBreadcrumbs = (path: string): RouteMeta[] => {
  const trail: RouteMeta[] = [];
  let current = byPath.get(path);
  const seen = new Set<string>();
  while (current && !seen.has(current.path)) {
    seen.add(current.path);
    trail.unshift(current);
    current = current.parent ? byPath.get(current.parent) : undefined;
  }
  return trail;
};
