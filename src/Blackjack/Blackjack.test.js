import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Blackjack from "./Blackjack";
import Card from "./classes/Card";
import { GAME_STATUS } from "./constants";

const predictableState = {
  playerHand: [],
  dealerHand: [],
  gameStatus: GAME_STATUS.INTRO,
  handWinner: null,
  deck: [new Card(1, 1), new Card(1, 2), new Card(1, 3), new Card(1, 4)],
};

describe("Blackjack", () => {
  test("It matches snapshot when in INTRO mode", async () => {
    const view = render(<Blackjack initialState={predictableState} />);
    expect(view.container).toMatchSnapshot();
  });

  test("It matches snapshot when in PLAY mode", async () => {
    const view = render(<Blackjack initialState={predictableState} />);
    expect(screen.getByText(/Play/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText("Play"));
    expect(view.container).toMatchSnapshot();
  });

  test("It matches snapshot after cards are dealt", async () => {
    const view = render(<Blackjack initialState={predictableState} />);
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText("Play"));

    await waitFor(() => expect(screen.getAllByRole(/img/i).length).toBe(4), {
      timeout: 10000,
    });
    expect(view.container).toMatchSnapshot();
  });
});
