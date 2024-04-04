import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

const noop = () => {};

describe("Button", () => {
  test("Button onClick works as expected", async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    fireEvent.click(screen.getByText(/Click me/i));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("Primary button matches snapshot", async () => {
    const view = render(
      <Button type="primary" onClick={noop}>
        Click me
      </Button>,
    );
    expect(view.container).toMatchSnapshot();
  });

  test("Secondary button matches snapshot", async () => {
    const view = render(
      <Button type="secondary" onClick={noop}>
        Click me
      </Button>,
    );
    expect(view.container).toMatchSnapshot();
  });
});
