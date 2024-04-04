import Card from "../classes/Card";
import { countHandValue, getCardValue, getHandWinner } from "./gameUtils";

describe("gameUtils", () => {
  test("getCardValue works as expected", async () => {
    const defaultValue = getCardValue(7);
    const aceValue = getCardValue(1);
    const faceValue1 = getCardValue(10);
    const faceValue2 = getCardValue(11);
    const faceValue3 = getCardValue(12);
    const faceValue4 = getCardValue(13);
    expect(defaultValue).toBe(7);
    expect(aceValue).toBe(1);
    expect(faceValue1).toBe(10);
    expect(faceValue2).toBe(10);
    expect(faceValue3).toBe(10);
    expect(faceValue4).toBe(10);
  });

  test("countHandValue counts aces as expected", async () => {
    const handValue1 = countHandValue([new Card(1, 1), new Card(1, 13)]);
    expect(handValue1).toBe(21);

    const handValue2 = countHandValue([new Card(1, 1)]);
    expect(handValue2).toBe(11);

    const handValue3 = countHandValue([new Card(1, 1), new Card(2, 1)]);
    expect(handValue3).toBe(12);

    const handValue4 = countHandValue([
      new Card(1, 2), //Two
      new Card(1, 1), //Ace
      new Card(2, 2),
      new Card(2, 1),
      new Card(3, 2),
      new Card(3, 1),
      new Card(4, 2),
    ]);
    expect(handValue4).toBe(21);

    const handValue5 = countHandValue([new Card(1, 2), new Card(2, 10)]);
    expect(handValue5).toBe(12);
  });

  test("getHandWinner works as expected", async () => {
    const dealersBlackjack = getHandWinner({
      dealerCount: 21,
      playerCount: 21,
      isDealerBlackjack: true,
      isPlayerBlackjack: true,
    });
    expect(dealersBlackjack).toBe("dealer");

    const playersBlackjack = getHandWinner({
      dealerCount: 21,
      playerCount: 21,
      isDealerBlackjack: false,
      isPlayerBlackjack: true,
    });
    expect(playersBlackjack).toBe("player");

    const playerBusted = getHandWinner({
      dealerCount: 25,
      playerCount: 23,
      isDealerBlackjack: false,
      isPlayerBlackjack: false,
    });
    expect(playerBusted).toBe("dealer");

    const dealerBusted = getHandWinner({
      dealerCount: 23,
      playerCount: 13,
      isDealerBlackjack: false,
      isPlayerBlackjack: false,
    });
    expect(dealerBusted).toBe("player");

    const push = getHandWinner({
      dealerCount: 21,
      playerCount: 21,
      isDealerBlackjack: false,
      isPlayerBlackjack: false,
    });
    expect(push).toBe("push");

    const dealerWin = getHandWinner({
      dealerCount: 19,
      playerCount: 17,
      isDealerBlackjack: false,
      isPlayerBlackjack: false,
    });
    expect(dealerWin).toBe("dealer");

    const playerWin = getHandWinner({
      dealerCount: 17,
      playerCount: 19,
      isDealerBlackjack: false,
      isPlayerBlackjack: false,
    });
    expect(playerWin).toBe("player");
  });
});
