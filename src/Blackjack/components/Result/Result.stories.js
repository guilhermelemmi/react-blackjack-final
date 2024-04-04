import Result from "./Result";

export default {
  component: Result,
};

const noop = () => {};

export const PlayerWin = {
  render: () => (
    <Result handWinner={"player"} onRestart={noop} onContinue={noop} />
  ),
};

export const DealerWin = {
  render: () => (
    <Result handWinner={"dealer"} onRestart={noop} onContinue={noop} />
  ),
};
