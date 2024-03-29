import { randomInRange } from "../utils/shuffle";
import Card from "./Card";

class Deck {
  cards = [];
  constructor() {
    this.createDeck();
    this.shuffle();
    return this.cards;
  }

  createDeck() {
    for (let suit = 1; suit <= 4; suit++) {
      for (let rank = 1; rank <= 13; rank++) {
        this.cards.push(new Card(suit, rank));
      }
    }
  }

  shuffle() {
    for (let i = 0; i < this.cards.length - 1; i++) {
      const j = randomInRange(i, this.cards.length - 1);
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }
}

export default Deck;
