import { fireEvent, render, screen } from "@testing-library/react";
import MainMenu from "./MainMenu";

const noop = () => {};

describe("MainMenu", () => {
  test("It renders count and label", async () => {
    const handleClick = jest.fn();
    render(<MainMenu onStart={handleClick} />);
    fireEvent.click(screen.getByText(/Play/i));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("It matches snapshot", async () => {
    const view = render(<MainMenu onStart={noop} />);
    expect(view.container).toMatchSnapshot();
  });
});
