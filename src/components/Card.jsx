import "./Card.css";

function Card ({ rank, suit, isClosed = false }) {
  return isClosed ? <div /> : (
    <div className={`card _${rank}${suit}`} />
  );
}

export default Card;