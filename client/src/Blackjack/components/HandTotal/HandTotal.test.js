import { render, screen } from "@testing-library/react";
import HandTotal from "./HandTotal";

describe("HandTotal", () => {
  test("It renders count and label", async () => {
    render(<HandTotal count={13} label="Dealer" />);
    const count = screen.getByText("13");
    const label = screen.getByText("Dealer");
    expect(count).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  test("Dealer's count matches snapshot", async () => {
    const view = render(<HandTotal count={13} label="Dealer" />);
    expect(view.container).toMatchSnapshot();
  });

  test("Player's count matches snapshot", async () => {
    const view = render(<HandTotal count={19} label="Player" />);
    expect(view.container).toMatchSnapshot();
  });
});
