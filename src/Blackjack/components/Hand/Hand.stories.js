import Card from "../Card/Card";
import Hand from "./Hand";

export default {
  component: Hand,
};

export const Blackjack = {
  render: () => (
    <Hand>
      <Card key="1_1" suit={1} rank={1} />
      <Card key="1_13" suit={1} rank={13} />
    </Hand>
  ),
};

export const FourAces = {
  render: () => (
    <Hand>
      <Card key="1_1" suit={1} rank={1} />
      <Card key="1_2" suit={2} rank={1} />
      <Card key="1_3" suit={3} rank={1} />
      <Card key="1_4" suit={4} rank={1} />
    </Hand>
  ),
};
