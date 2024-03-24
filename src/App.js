import { useCallback, useEffect, useReducer, useState } from "react";
import "./App.css";
import useInterval from "./hooks/useInterval";
import Deck from "./classes/Deck";
import Card from "./components/Card";

const getCardValue = (card) => {
  switch (card) {
    case 13:
    case 12:
    case 11:
      return 10;
    default:
      return parseInt(card, 10);
  }
};

function cardsReducer(state, action) {
  switch (action.type) {
    case "draw_dealer": {
      return {
        ...state,
        dealerHand: [...state.dealerHand, state.deck[0]],
        deck: state.deck.filter((_, i) => i !== 0),
      };
    }
    case "draw_player": {
      return {
        ...state,
        playerHand: [...state.playerHand, state.deck[0]],
        deck: state.deck.filter((_, i) => i !== 0),
      };
    }
    default:
  }
  throw Error("Unknown action: " + action.type);
}

const countHandValue = (cardsOnHand) => {
  let aces = 0;
  let sum = 0;

  for (let i = 0; i < cardsOnHand; i++) {
    const cardValue = getCardValue(cardsOnHand[i].rank);
    aces = cardValue === 1 ? aces + 1 : aces;
    sum += cardValue;
  }

  if (aces > 0 && sum + 10 <= 21) {
    sum += 10;
  }

  return sum;
};

const createInitialState = () => {
  return {
    deck: new Deck(),
    playerHand: [],
    dealerHand: [],
  };
};

function App() {
  const [{ deck, dealerHand, playerHand }, dispatch] = useReducer(
    cardsReducer,
    null,
    createInitialState
  );
  const [gameStatus, setGameStatus] = useState("playing");
  const [turnOwner, setTurnOwner] = useState("player");
  const [gameWinner, setGameWinner] = useState();

  const playerCount = countHandValue(playerHand);
  // const playerCount = state
  //   ? state.playerHand.reduce((total, card) => {
  //       const cardValue = getCardValue(card.rank);
  //       if (cardValue === 1) {
  //         return total + (total + 11 > 21 ? 1 : 11);
  //       }
  //       return total + cardValue;
  //     }, 0)
  //   : 0;

  const dealerCount = countHandValue(dealerHand);

  useInterval(
    () => {
      dispatch({ type: "draw_dealer" });
    },
    turnOwner === "dealer" && gameStatus !== "end" ? 1000 : null
  );

  // useEffect(() => {
  //   if (state.deck.length && state.playerHand.length < 2) {
  //     dispatch({ type: "draw_player" });
  //   }
  // }, [state.deck, state.playerHand]);

  useEffect(() => {
    if (deck.length && dealerHand.length < 2) {
      dispatch({ type: "draw_dealer" });
    }
  }, [deck, dealerHand]);

  useEffect(() => {
    if (gameStatus === "playing" && playerCount >= 21) {
      setTurnOwner("dealer");
    }
  }, [playerCount, gameStatus]);

  useEffect(() => {
    if (turnOwner === "dealer" && dealerCount >= 17) {
      setGameStatus("end");
    }
  }, [dealerCount, turnOwner]);

  useEffect(() => {
    if (!gameWinner && gameStatus === "end") {
      if (playerCount > 21 && dealerCount > 21) {
        setGameWinner(
          playerCount > dealerCount
            ? "dealer"
            : playerCount === dealerCount
            ? "tie"
            : "player"
        );
      }
      if (playerCount <= 21 && dealerCount <= 21) {
        setGameWinner(
          playerCount < dealerCount
            ? "dealer"
            : playerCount === dealerCount
            ? "push"
            : "player"
        );
      }
      if (playerCount <= 21 && dealerCount > 21) {
        setGameWinner("player");
      }
      if (dealerCount <= 21 && playerCount > 21) {
        setGameWinner("dealer");
      }
    }
  }, [gameStatus, gameWinner, playerCount, dealerCount]);

  const hit = () => {
    dispatch({ type: "draw_player" });
  };

  const stand = useCallback(() => {
    setTurnOwner("dealer");
  }, []);

  return (
    <div>
      <div>
        "gameStatus":{gameStatus}, "dealerCount":{dealerCount} <br />
        "winner": {gameWinner}
      </div>
      <div className="dealerHand">
        {dealerHand.map(({ suit, rank }, i) => (
          <Card
            suit={suit}
            rank={rank}
            isClosed={turnOwner === "player" && i === 1}
          />
        ))}
        <div className="dealerCount">
          {turnOwner === "dealer" ? dealerCount : ""}
        </div>
      </div>
      <br />
      <div className="playerHand">
        {playerHand.map(({ suit, rank }) => (
          <Card suit={suit} rank={rank} />
        ))}
        <div className="playerCount">{playerCount}</div>
      </div>
      <div className="controls">
        <button onClick={stand} disabled={turnOwner !== "player"}>
          Stand
        </button>
        <button onClick={hit} disabled={turnOwner !== "player"}>
          Hit
        </button>
      </div>
    </div>
  );
}

export default App;
