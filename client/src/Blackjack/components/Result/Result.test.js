import { fireEvent, render, screen } from "@testing-library/react";
import Result from "./Result";

const noop = () => {};

describe("Result", () => {
  test("It renders the 'you won' message", async () => {
    render(<Result handWinner={"player"} onRestart={noop} onContinue={noop} />);
    const message = screen.getByText("You Won!");
    expect(message).toBeInTheDocument();
  });

  test("It renders the 'you lost' message", async () => {
    render(<Result handWinner={"dealer"} onRestart={noop} onContinue={noop} />);
    const message = screen.getByText("You Lost!");
    expect(message).toBeInTheDocument();
  });

  test("It renders the 'push' message", async () => {
    render(<Result handWinner={"push"} onRestart={noop} onContinue={noop} />);
    const message = screen.getByText("Push!");
    expect(message).toBeInTheDocument();
  });

  test("It handles the restart button", async () => {
    const handleRestart = jest.fn();
    render(
      <Result
        handWinner={"player"}
        onRestart={handleRestart}
        onContinue={noop}
      />,
    );
    fireEvent.click(screen.getByText(/Restart/i));
    expect(handleRestart).toHaveBeenCalledTimes(1);
  });

  test("It handles the continue button", async () => {
    const handleContinue = jest.fn();
    render(
      <Result
        handWinner={"player"}
        onRestart={noop}
        onContinue={handleContinue}
      />,
    );
    fireEvent.click(screen.getByText(/Continue/i));
    expect(handleContinue).toHaveBeenCalledTimes(1);
  });

  test("Dealer's win matches snapshot", async () => {
    const view = render(
      <Result handWinner={"dealer"} onRestart={noop} onContinue={noop} />,
    );
    expect(view.container).toMatchSnapshot();
  });

  test("Player's win matches snapshot", async () => {
    const view = render(
      <Result handWinner={"player"} onRestart={noop} onContinue={noop} />,
    );
    expect(view.container).toMatchSnapshot();
  });

  test("Push matches snapshot", async () => {
    const view = render(
      <Result handWinner={"push"} onRestart={noop} onContinue={noop} />,
    );
    expect(view.container).toMatchSnapshot();
  });
});
