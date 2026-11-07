export const DEFAULT_ATTEMPTS = 6;
export const TIMED_SECONDS = 120;
export const WORD_LENGTHS = [5, 6, 7, 8] as const;

/** localStorage keys. Kept from earlier versions so nobody loses their stats. */
export const STORAGE_KEYS = {
  SETTINGS: 'wg_user_settings_v1',
  STATS: 'wg_game_stats_v1',
  HISTORY: 'wg_game_history_v1',
  DAILY: 'wg_daily_v1',
  DAILY_STATS: 'wg_daily_stats_v1',
};
