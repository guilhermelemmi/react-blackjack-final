import { RANKS_MAP, SUITS_MAP } from "../constants";

class Card {
  suit;
  suitName;
  rank;
  rankName;

  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
    this.suitName = SUITS_MAP[suit];
    this.rankName = RANKS_MAP[rank];
  }
}

export default Card;
