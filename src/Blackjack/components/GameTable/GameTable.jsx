import Card from "../Card/Card";
import Controls from "../Controls/Controls";
import DeckCounter from "../DeckCounter/DeckCounter";
import Hand from "../Hand/Hand";
import HandTotal from "../HandTotal/HandTotal";
import "./styles.css";

function GameTable({
  dealerCount,
  dealerHand,
  deck,
  hit,
  isPlayerTurn,
  playerCount,
  playerHand,
  stand,
}) {
  return (
    <div>
      <section className="gameTableSection">
        <Hand>
          {dealerHand.map(({ suit, rank }, i) => (
            <Card
              key={`${suit}_${rank}`}
              suit={suit}
              rank={rank}
              isClosed={isPlayerTurn && i === 0}
            />
          ))}
        </Hand>
        <div className="totalContainer">
          <DeckCounter count={deck?.length} />
          <HandTotal count={dealerCount} label="Dealer" />
        </div>
      </section>
      <section className="gameTableSection playerSection">
        <Hand>
          {playerHand.map(({ suit, rank }) => (
            <Card key={`${suit}_${rank}`} suit={suit} rank={rank} />
          ))}
        </Hand>
        <div className="totalContainer">
          <HandTotal count={playerCount} label="Player" />
          {isPlayerTurn && playerHand.length >= 2 && <Controls hit={hit} stand={stand} />}
        </div>
      </section>
    </div>
  );
}

export default GameTable;
