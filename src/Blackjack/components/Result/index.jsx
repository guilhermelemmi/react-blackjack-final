import "./styles.css";

function Result({ isWinner, onRestart, onContinue }) {
  return (
    <div className="hand">
      {isWinner ? 'You Won!' : 'You Lost :('}
      <button onClick={onRestart}>Restart</button>
      <button onClick={onContinue}>Continue</button>
    </div>
  );
}

export default Result;
