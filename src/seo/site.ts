/**
 * Brand and deployment details in one place. Change `url` if the domain
 * changes: canonical URLs, the sitemap, social tags and structured data all
 * derive from it.
 */
export const SITE = {
  name: 'WordBrain',
  url: 'https://wordbrain.vercel.app',
  defaultDescription:
    'WordBrain is a free word guessing game. Find the hidden word in six tries, play a new daily puzzle, practise with hints or race the clock. 5 to 8 letters.',
  locale: 'en_US',
  ogImage: '/og-image.png',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'WordBrain, a free daily word guessing game',
  author: {
    name: 'Shoaib Arif',
    url: 'https://shoaibarif.vercel.app/',
    github: 'https://github.com/shoaibmarif',
    linkedin: 'https://www.linkedin.com/in/shoaibmarif/',
    email: 'shoaibmuhammadarif@gmail.com',
  },
  repo: 'https://github.com/shoaibmarif/wordbrain',
  issues: 'https://github.com/shoaibmarif/wordbrain/issues',
} as const;

export const absoluteUrl = (path: string): string => (path === '/' ? `${SITE.url}/` : `${SITE.url}${path}`);
