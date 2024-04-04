import HandTotal from "./HandTotal";

export default {
  component: HandTotal,
};

export const Dealer = {
  render: () => <HandTotal count={19} label="Dealer" />,
};

export const Player = {
  render: () => <HandTotal count={19} label="Player" />,
};
