export const GAME_STATUS = {
  INTRO: "INTRO",
  PLAY: "PLAY",
  STAND: "STAND",
  RESULT: "RESULT",
};

export const GAME_ACTIONS = {
  RESHUFFLE: "RESHUFFLE",
  RESTART_GAME: "RESTART_GAME",
  START_GAME: "START_GAME",
  NEW_HAND: "NEW_HAND",
  DRAW_CARD: "DRAW_CARD",
  STAND: "STAND",
  UPDATE_GAME_STATUS: "UPDATE_GAME_STATUS",
};

export const PLAYER = "player";
export const DEALER = "dealer";
export const PUSH = "push";

export const SUITS = {
  SPADES: "Spades",
  CLUBS: "Clubs",
  HEARTS: "Hearts",
  DIAMONDS: "Diamonds",
};

export const SUITS_MAP = [
  null,
  SUITS.SPADES,
  SUITS.CLUBS,
  SUITS.HEARTS,
  SUITS.DIAMONDS,
];

export const RANKS = {
  ACE: "Ace",
  TWO: "Two",
  THREE: "Three",
  FOUR: "Four",
  FIVE: "Five",
  SIX: "Six",
  SEVEN: "Seven",
  EIGHT: "Eight",
  NINE: "Nine",
  TEN: "Ten",
  JACK: "Jack",
  QUEEN: "Queen",
  KING: "King",
};

export const RANKS_MAP = [
  null,
  RANKS.ACE,
  RANKS.TWO,
  RANKS.THREE,
  RANKS.FOUR,
  RANKS.FIVE,
  RANKS.SIX,
  RANKS.SEVEN,
  RANKS.EIGHT,
  RANKS.NINE,
  RANKS.TEN,
  RANKS.JACK,
  RANKS.QUEEN,
  RANKS.KING,
];
