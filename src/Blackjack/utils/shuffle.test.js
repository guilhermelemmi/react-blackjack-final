import Deck from "../classes/Deck";
import { randomInRange, shuffle } from "./shuffle";

describe("Shuffle", () => {
  test("shuffle works as expected", async () => {
    const deck = new Deck();
    const shuffledDeck = shuffle(deck);
    let diffs = 0;
    for (let i = 0; i < deck.length; i++) {
      if (deck[i] !== shuffledDeck[i]) {
        diffs++;
      }
    }
    expect(diffs / deck.length).toBeGreaterThan(0.5);
  });

  test("randomInRange works as expected", async () => {
    const random = randomInRange(1, 10);
    expect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(random)).toBe(true);
  });
});
