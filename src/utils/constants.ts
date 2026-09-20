export const APP_NAME = 'WordBrain';
export const APP_SUBTITLE = 'Daily Word Challenge';
export const APP_FULL_TITLE = `${APP_NAME} - Free Daily Word Guessing & Brain Training Game`;
export const APP_DESCRIPTION =
  'Train your mind with WordBrain! Guess the hidden word in six attempts, challenge yourself with daily, random, practice, and timed modes, and track your streaks.';
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
  DAILY_STATE: 'wg_daily_state_v1',
  ACTIVE_GAME: 'wg_active_game_v1',
};
