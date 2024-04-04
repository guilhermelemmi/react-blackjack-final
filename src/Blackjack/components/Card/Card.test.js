import { render } from "@testing-library/react";
import Card from "./Card";

describe("Card", () => {
  test("Card opens matches snapshot", async () => {
    const view = render(<Card suit={1} rank={1} />);
    expect(view.container).toMatchSnapshot();
  });

  test("Card closed matches snapshot", async () => {
    const view = render(<Card suit={1} rank={1} isClosed={true} />);
    expect(view.container).toMatchSnapshot();
  });
});
