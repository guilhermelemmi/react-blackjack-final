import { render } from "@testing-library/react";
import DeckCounter from "./DeckCounter";

describe("DeckCounter", () => {
  test("It matches snapshot", async () => {
    const view = render(<DeckCounter count={52} />);
    expect(view.container).toMatchSnapshot();
  });
});
