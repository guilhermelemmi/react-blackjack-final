import "./styles.css";

function Controls({ hit, stand, isPlayerTurn }) {
  return (
    <div className="controls">
      <button className="button stand" onClick={stand} disabled={!isPlayerTurn} tabIndex={0}>
        Stand
      </button>
      <button className="button hit" onClick={hit} disabled={!isPlayerTurn}>
        Hit
      </button>
    </div>
  );
}

export default Controls;
