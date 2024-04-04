import { RANKS_MAP, SUITS_MAP } from "../../constants";
import "./Card.css";

function Card ({ rank, suit, isClosed = false }) {
  return  (
    <div>
      <span
        role="img"
        className={isClosed ? 'card closed' : `card _${rank}${suit}`}
        aria-label={isClosed ? 'Hole Card' : `${RANKS_MAP[rank]} of ${SUITS_MAP[suit]}`} />
    </div>
  )
}

export default Card;