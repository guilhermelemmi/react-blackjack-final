import { randomInRange } from "../utils/deckUtils";
import Card from "./Card";

class Deck {
  cards = [];
  constructor() {
    console.log("create deck constructor");
    this.createDeck();
    this.shuffle();
    return this.cards;
    // return [
    //   { rank: 1, suit: 1 },
    //   { rank: 1, suit: 2 },
    //   { rank: 1, suit: 3 },
    //   { rank: 1, suit: 4 },
    //   { rank: 5, suit: 4 },
    //   { rank: 8, suit: 4 },
    //   { rank: 4, suit: 4 },
    //   { rank: 9, suit: 4 },
    //   { rank: 3, suit: 4 },
    //   { rank: 12, suit: 4 },
    //   { rank: 10, suit: 4 },
    //   { rank: 2, suit: 2 },
    // ];
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
