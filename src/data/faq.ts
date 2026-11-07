export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'How do I play?',
    answer:
      'Type a real word and press Enter. Each letter then changes colour: teal means it’s in the right spot, mustard means it’s in the word but somewhere else, and grey means it isn’t in the word at all. Use those clues to find the hidden word in six tries.',
  },
  {
    question: 'How does the daily word work?',
    answer:
      'Everyone gets the same five letter word each day, and a new one arrives at midnight in your time zone. You get one go per day. Solve it on consecutive days to build a streak, then share your result as a grid of coloured squares that doesn’t give the word away.',
  },
  {
    question: 'Why was my word rejected?',
    answer:
      'Guesses have to be real English words of the right length. WordBrain checks against a dictionary of over 100,000 words, so most real words are fine, but very new slang, names and abbreviations won’t be accepted. A rejected guess never costs you a turn.',
  },
  {
    question: 'How do repeated letters work?',
    answer:
      'Each letter in the hidden word can only be matched once. If you guess a word with two Es and the answer has one, only one of your Es will light up; the other turns grey. If both light up, the answer has two Es too.',
  },
  {
    question: 'What is hard mode?',
    answer:
      'In hard mode, any letter you’ve found has to be used in your next guesses: teal letters stay in place and mustard letters have to appear somewhere. It stops you from “wasting” a guess to test new letters, which makes it a lot tougher.',
  },
  {
    question: 'Can I play more than once a day?',
    answer:
      'Yes. The daily word is once a day, but the main game, practice and timed modes give you a fresh word every time, as many times as you like, with 5, 6, 7 or 8 letters.',
  },
  {
    question: 'What’s a good first word?',
    answer:
      'One that tests common letters without repeating any. For five letter words, ALTER, STARE and ARISE all do well. The best starting words page ranks openers for every length, based on the letters that actually appear in WordBrain’s answers.',
  },
  {
    question: 'Do hints or practice games affect my stats?',
    answer:
      'No. Practice mode is separate on purpose: use as many hints as you like and your win rate and streak stay exactly as they were. Unlimited, timed and daily games do count.',
  },
  {
    question: 'Why did my daily streak reset?',
    answer:
      'The daily streak counts puzzles solved on back to back days. Missing a day or running out of guesses sets it back to zero. Your streak is stored in this browser, so playing on a different device or clearing your browser data starts a new one.',
  },
  {
    question: 'Where are my stats saved?',
    answer:
      'In your browser, on this device. There’s no account and nothing is uploaded, which also means your stats won’t follow you to another phone or computer. You can reset them from the statistics window.',
  },
  {
    question: 'Is it free? Can I play on my phone?',
    answer:
      'It’s completely free, with no ads and no sign-up, and it works on phones, tablets and computers. On a computer you can type with your keyboard instead of tapping.',
  },
  {
    question: 'I’m colour-blind. Can I still play?',
    answer:
      'Yes. Turn on high contrast in Settings and the colours switch to orange and blue, and each revealed tile also gets a small symbol, so you never have to rely on colour alone.',
  },
];
