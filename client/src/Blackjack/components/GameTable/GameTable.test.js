import { render } from "@testing-library/react";
import GameTable from "./GameTable";
import Card from "../../classes/Card";

const noop = () => {};

describe("GameTable", () => {
  test("It matches snapshot", async () => {
    const card1 = new Card(1, 1);
    const card2 = new Card(1, 2);
    const card3 = new Card(1, 13);
    const card4 = new Card(1, 4);
    const view = render(
      <GameTable
        deck={[]}
        dealerHand={[card1, card3]}
        playerHand={[card2, card4]}
        isPlayerTurn={true}
        dealerCount={6}
        playerCount={21}
        hit={noop}
        stand={noop}
      />,
    );
    expect(view.container).toMatchSnapshot();
  });
});
