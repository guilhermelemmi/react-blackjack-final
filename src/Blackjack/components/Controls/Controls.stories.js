import Controls from "./Controls";

export default {
  component: Controls,
};

const noop = () => {};

export const Default = {
  render: () => <Controls hit={noop} stand={noop} />,
};
