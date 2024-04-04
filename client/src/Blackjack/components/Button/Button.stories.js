import Button from "./Button";

export default {
  component: Button,
};

export const Primary = {
  render: () => <Button type="primary">Click me</Button>,
};

export const Secondary = {
  render: () => <Button type="secondary">Click me</Button>,
};
