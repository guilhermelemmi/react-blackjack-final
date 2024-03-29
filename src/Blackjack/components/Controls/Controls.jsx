import Button from "../Button/Button";
import "./styles.css";

function Controls({ hit, stand }) {
  return (
    <div className="controls">
      <h2>Your turn!</h2>
      <div className="buttons">
        <Button tabIndex="0" type="secondary" onClick={stand}>
          Stand
        </Button>
        <Button type="primary" onClick={hit}>
          Hit
        </Button>
      </div>
    </div>
  );
}

export default Controls;
