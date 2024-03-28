import DeckCounter from "../Deck";
import Card from "../Card";
import Controls from "../Controls";
import Hand from "../Hand";
import HandTotal from "../HandTotal";
import "./styles.css";

function Playing({deck, dealerHand, playerHand, isPlayerTurn, dealerCount, playerCount, hit, stand, gameStatus, gameWinner}) {
  return (
    <div className="App">
      <DeckCounter count={deck?.length} />
      <section>
        <Hand>
          {dealerHand.map(({ suit, rank }, i) => (
            <Card
              suit={suit}
              rank={rank}
              isClosed={isPlayerTurn && i === 0}
            />
          ))}
        </Hand>
        <HandTotal count={dealerCount} isDealer={true} />
      </section>
      <section>
        <Hand>
          {playerHand.map(({ suit, rank }) => (
            <Card suit={suit} rank={rank} />
          ))}
        </Hand>
        <HandTotal count={playerCount} isDealer={false} />
        <Controls hit={hit} stand={stand} isPlayerTurn={isPlayerTurn} />
      </section>
      <div>
        "gameStatus":{gameStatus}, "dealerCount":{dealerCount} <br />
        "winner": {gameWinner}
      </div>
    </div>
  );
}

export default Playing;
