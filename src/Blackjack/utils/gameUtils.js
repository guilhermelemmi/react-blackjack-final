import { DEALER, PLAYER, PUSH } from "../constants";

function getCardValue(card) {
  switch (card) {
    case 13:
    case 12:
    case 11:
      return 10;
    default:
      return parseInt(card, 10);
  }
}

export function countHandValue(cardsOnHand) {
  let aces = 0;
  let sum = 0;

  for (let i = 0; i < cardsOnHand.length; i++) {
    const cardValue = getCardValue(cardsOnHand[i].rank);
    aces = cardValue === 1 ? aces + 1 : aces;
    sum += cardValue;
  }

  if (aces > 0 && sum + 10 <= 21) {
    sum += 10;
  }

  return sum;
}

export function getHandWinner({
  dealerCount,
  playerCount,
  isDealerBlackjack,
  isPlayerBlackjack,
}) {
  if (isDealerBlackjack) {
    return DEALER;
  }

  if (isPlayerBlackjack) {
    return PLAYER;
  }

  if (playerCount > 21) {
    return DEALER;
  }

  if (dealerCount > 21) {
    return PLAYER;
  }

  if (playerCount === dealerCount) {
    return PUSH;
  }

  return playerCount > dealerCount ? PLAYER : DEALER;
}
