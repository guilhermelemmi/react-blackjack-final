import { render, screen } from "@testing-library/react";
import Hand from "./Hand";

describe("Hand", () => {
  test("It renders its children", async () => {
    render(
      <Hand>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Hand>,
    );
    const div1 = screen.getByText("1");
    const div2 = screen.getByText("2");
    const div3 = screen.getByText("3");
    expect(div1).toBeInTheDocument();
    expect(div2).toBeInTheDocument();
    expect(div3).toBeInTheDocument();
  });

  test("It matches snapshot", async () => {
    const view = render(
      <Hand>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Hand>,
    );
    expect(view.container).toMatchSnapshot();
  });
});
