import Card from "./Card";

export default {
  component: Card,
};

export const AceOfSpades = {
  render: () => <Card suit={1} rank={1} />,
};

export const AceOfClubs = {
  render: () => <Card suit={2} rank={1} />,
};

export const AceOfHearts = {
  render: () => <Card suit={3} rank={1} />,
};

export const AceOfDiamonds = {
  render: () => <Card suit={4} rank={1} />,
};

export const CardClosed = {
  render: () => <Card suit={4} rank={1} isClosed={true} />,
};
