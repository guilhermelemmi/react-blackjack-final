import Deck from "../../classes/Deck";
import { countHandValue } from "../../utils/gameUtils";
import GameTable from "./GameTable";

export default {
  component: GameTable,
};

const noop = () => {};

const deck = new Deck();
const playerHand = [deck[0], deck[2]];
const dealerHand = [deck[1], deck[3]];

export const GameStartPlayerTurn = {
  render: () => (
    <GameTable
      deck={deck.filter((_, i) => i >= 4)}
      dealerHand={dealerHand}
      playerHand={playerHand}
      isPlayerTurn={true}
      dealerCount={countHandValue(dealerHand.filter((card, i) => i > 0))}
      playerCount={countHandValue(playerHand)}
      hit={noop}
      stand={noop}
    />
  ),
};

export const GameStartDealerTurn = {
  render: () => (
    <GameTable
      deck={deck.filter((_, i) => i >= 4)}
      dealerHand={dealerHand}
      playerHand={playerHand}
      isPlayerTurn={false}
      dealerCount={countHandValue(dealerHand)}
      playerCount={countHandValue(playerHand)}
      hit={noop}
      stand={noop}
    />
  ),
};
