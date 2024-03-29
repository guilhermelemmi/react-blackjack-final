import { DEALER, PLAYER } from "../../constants";
import Button from "../Button/Button";
import "./styles.css";

function Result({ handWinner, onRestart, onContinue }) {
  return (
    <div className="result">
      <h2>{handWinner === PLAYER ? 'You Won!' : (handWinner === DEALER ? 'You Lost!' : "Push!")}</h2>
      <div className="buttons">
        <Button onClick={onRestart} type="secondary">Restart</Button>
        <Button onClick={onContinue} type="primary">Continue</Button>
      </div>
    </div>
  );
}

export default Result;
