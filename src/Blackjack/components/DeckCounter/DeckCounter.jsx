import DeckSVG from "../../assets/DeckSVG";
import "./DeckCounter.css";

function DeckCounter({ count }) {
  return <div className="deckCounter">
    <p>{count}</p>
    <DeckSVG fill="#dedede" stroke="0" />
  </div>;
}

export default DeckCounter;
