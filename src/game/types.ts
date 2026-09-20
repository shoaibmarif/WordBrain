export type LetterState = 'correct' | 'present' | 'absent' | 'unused';

export type CellState = LetterState | 'empty' | 'tbd';

export type GameStatus = 'playing' | 'won' | 'lost' | 'paused';

export type GameMode = 'daily' | 'random' | 'practice' | 'timed';

export type Difficulty = 'easy' | 'medium' | 'hard';

export type WordLength = 5 | 6 | 7 | 8;

export interface LetterEvaluation {
  char: string;
  state: LetterState;
}

export interface GuessResult {
  guess: string;
  letters: LetterEvaluation[];
}

export interface GameStats {
  gamesPlayed: number;
  gamesWon: number;
  gamesLost: number;
  winPercentage: number;
  currentStreak: number;
  maxStreak: number;
  guessDistribution: Record<number, number>; // attempt count 1..attempts -> count
  totalGuessesInWins: number;
  totalTimeSeconds: number;
  averageGuesses: number;
}

export interface DailyProgress {
  date: string; // YYYY-MM-DD
  completed: boolean;
  won: boolean;
  guesses: string[];
  targetWord: string;
  attemptsUsed: number;
  durationSeconds: number;
}

export interface GameHistoryItem {
  id: string;
  date: string; // ISO string
  mode: GameMode;
  wordLength: WordLength;
  targetWord: string;
  guesses: string[];
  won: boolean;
  attemptsUsed: number;
  maxAttempts: number;
  durationSeconds: number;
  hintsUsed: number;
}

export type HintType = 'reveal_letter' | 'reveal_position' | 'eliminate_letters';

export interface HintAction {
  type: HintType;
  description: string;
}

export type ThemeMode = 'light' | 'dark' | 'system';

export interface UserSettings {
  theme: ThemeMode;
  hardMode: boolean;
  soundEnabled: boolean;
  animationsEnabled: boolean;
  highContrast: boolean;
  defaultWordLength: WordLength;
  defaultDifficulty: Difficulty;
  timedDurationSeconds: number; // default 120s
}

export interface GameConfig {
  wordLength: WordLength;
  maxAttempts: number;
  mode: GameMode;
  difficulty: Difficulty;
}
