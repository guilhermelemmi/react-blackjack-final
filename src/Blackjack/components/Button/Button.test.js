import { render } from "@testing-library/react";
import Button from "./Button";

test("Button snapshot", async () => {
  const mounted = render(
    <Button type="primary" onClick={() => {}}>
      Click me
    </Button>,
  );
  expect(mounted.container).toMatchSnapshot();
});
