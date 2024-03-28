import "./styles.css";

function Card ({ rank, suit, isClosed = false }) {
  return  <div className={`card _${rank}${suit} ${isClosed ? 'closed' : ''}`} />;
}

export default Card;