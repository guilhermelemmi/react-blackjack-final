import "./styles.css";

function Intro({onStart}) {
  return (
    <div>
      <button onClick={onStart}>Play</button>
    </div>
  );
}

export default Intro;
