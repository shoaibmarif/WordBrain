export const APP_NAME = 'WordBrain';
export const APP_SUBTITLE = 'Word Puzzle & Brain Gym';
export const APP_FULL_TITLE = `${APP_NAME} - Free Word Guessing & Brain Training Game`;
export const APP_DESCRIPTION =
  'Train your mind with WordBrain! Guess the hidden word in six attempts, challenge yourself with unlimited random, practice, and timed modes, and track your streaks.';
export const APP_URL =
  typeof window !== 'undefined' && window.location.origin && window.location.origin !== 'null'
    ? window.location.origin
    : 'https://wordbrain.app';

export const DEFAULT_WORD_LENGTH = 5;
export const DEFAULT_ATTEMPTS = 6;
export const MIN_WORD_LENGTH = 5;
export const MAX_WORD_LENGTH = 8;

export const STORAGE_KEYS = {
  SETTINGS: 'wg_user_settings_v1',
  STATS: 'wg_game_stats_v1',
  HISTORY: 'wg_game_history_v1',
  ACTIVE_GAME: 'wg_active_game_v1',
};

export const DEVELOPER_LINKS = {
  GITHUB: 'https://github.com/shoaibmarif',
  LINKEDIN: 'https://www.linkedin.com/in/shoaibmarif/',
  PORTFOLIO: 'https://github.com/shoaibmarif',
};
