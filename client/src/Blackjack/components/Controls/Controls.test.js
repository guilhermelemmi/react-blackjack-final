import { render, screen, fireEvent } from "@testing-library/react";
import Controls from "./Controls";

const noop = () => {};

describe("Controls", () => {
  test("Hit button onClick", async () => {
    const hit = jest.fn();
    render(<Controls hit={hit} stand={noop} />);

    fireEvent.click(screen.getByText(/Hit/i));
    expect(hit).toHaveBeenCalledTimes(1);
  });

  test("Stand button onClick", async () => {
    const stand = jest.fn();
    render(<Controls hit={noop} stand={stand} />);

    fireEvent.click(screen.getByText(/Stand/i));
    expect(stand).toHaveBeenCalledTimes(1);
  });

  test("It matches snapshot", async () => {
    const view = render(<Controls hit={noop} stand={noop} />);
    expect(view.container).toMatchSnapshot();
  });
});
