import { useCallback, useEffect, useReducer } from "react";
import "./styles.css";
import useInterval from "./hooks/useInterval";
import Deck from "./classes/Deck";
import { CARD_ACTIONS, GAME_STATUS } from "./constants";
import Playing from "./components/Playing";
import Intro from "./components/Intro";
import Result from "./components/Result";

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
    case CARD_ACTIONS.DEAL_DEALER: {
      return {
        ...state,
        dealerHand: [...state.dealerHand, state.deck[0]],
        deck: state.deck.filter((_, i) => i !== 0),
      };
    }
    case CARD_ACTIONS.DEAL_PLAYER: {
      return {
        ...state,
        playerHand: [...state.playerHand, state.deck[0]],
        deck: state.deck.filter((_, i) => i !== 0),
      };
    }
    case CARD_ACTIONS.NEW_HAND: {
      return {
        ...state,
        dealerHand: [],
        playerHand: [],
        isPlayerTurn: true,
        gameWinner: null,
      };
    }
    case CARD_ACTIONS.TOGGLE_TURN: {
      return {
        ...state,
        isPlayerTurn: !state.isPlayerTurn,
      };
    }
    case CARD_ACTIONS.UPDATE_GAME_STATUS: {
      return {
        ...state,
        gameStatus: action.payload.gameStatus,
      };
    }
    case CARD_ACTIONS.SET_GAME_WINNER: {
      return {
        ...state,
        gameWinner: action.payload.gameWinner,
      };
    }
    default:
  }
  throw Error("Unknown action: " + action.type);
}

const countHandValue = (cardsOnHand) => {
  let aces = 0;
  let sum = 0;

  for (let i = 0; i < cardsOnHand.length; i++) {
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
    isPlayerTurn: true,
    gameStatus: GAME_STATUS.INTRO,
    gameWinner: null,
  };
};

function Blackjack () {
  const [{ deck, dealerHand, playerHand, isPlayerTurn, gameStatus, gameWinner }, dispatch] = useReducer(
    cardsReducer,
    null,
    createInitialState
  );
  // const [gameStatus, setGameStatus] = useState(GAME_STATUS.INTRO);
  // const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  // const [gameWinner, setGameWinner] = useState();

  const playerCount = countHandValue(playerHand);
  const dealerCount = countHandValue(dealerHand.filter((card, i) => !isPlayerTurn || i > 0 ));

  useInterval(
    () => {
      dispatch({ type: CARD_ACTIONS.DEAL_DEALER });
    },
    !isPlayerTurn && gameStatus !== GAME_STATUS.END ? 1000 : null
  );

  useEffect(() => {
    if (deck.length && playerHand.length < 2) {
      dispatch({ type: CARD_ACTIONS.DEAL_PLAYER });
    }
  }, [deck, playerHand]);

  useEffect(() => {
    if (deck.length && dealerHand.length < 2) {
      dispatch({ type: CARD_ACTIONS.DEAL_DEALER });
    }
  }, [deck, dealerHand]);

  useEffect(() => {
    if (gameStatus === GAME_STATUS.PLAYING && playerCount >= 21) {
      dispatch({ type: CARD_ACTIONS.TOGGLE_TURN });
    }
  }, [playerCount, gameStatus]);

  useEffect(() => {
    if (!isPlayerTurn && dealerCount >= 17) {
      dispatch({ type: CARD_ACTIONS.UPDATE_GAME_STATUS, payload: {gameStatus: GAME_STATUS.END }});
      // setGameStatus(GAME_STATUS.END);
    }
  }, [dealerCount, isPlayerTurn]);

  useEffect(() => {
    if (!gameWinner && gameStatus === GAME_STATUS.END) {
      console.log('playerCount,', playerCount);
      console.log('dealerCount,', dealerCount);
      if (playerCount > 21) {
        dispatch({ type: CARD_ACTIONS.SET_GAME_WINNER, payload: {gameWinner: 'dealer'}});
        // setGameWinner("dealer");
      }
      if (playerCount <= 21 && dealerCount <= 21) {
        console.log('playerCount,', playerCount);
        console.log('dealerCount,', dealerCount);
        const winner = playerCount < dealerCount
          ? "dealer"
          : playerCount === dealerCount
          ? "push"
          : "player";
        dispatch({ type: CARD_ACTIONS.SET_GAME_WINNER, payload: {gameWinner: winner}});
      }
      if (playerCount <= 21 && dealerCount > 21) {
        dispatch({ type: CARD_ACTIONS.SET_GAME_WINNER, payload: {gameWinner: 'player'}});
      }
      if (dealerCount <= 21 && playerCount > 21) {
        dispatch({ type: CARD_ACTIONS.SET_GAME_WINNER, payload: {gameWinner: 'dealer'}});
      }
    }
  }, [gameStatus, gameWinner, playerCount, dealerCount]);

  const hit = useCallback(() => {
    dispatch({ type: CARD_ACTIONS.DEAL_PLAYER });
  }, []);

  const stand = useCallback(() => {
    dispatch({ type: CARD_ACTIONS.TOGGLE_TURN });
  }, []);

  const onGameStart = useCallback(() => {
    dispatch({ type: CARD_ACTIONS.UPDATE_GAME_STATUS, payload: {gameStatus: GAME_STATUS.PLAYING }});
    // setGameStatus(GAME_STATUS.PLAYING);
  }, []);

  const onRestart = useCallback(() => {
    dispatch({ type: CARD_ACTIONS.UPDATE_GAME_STATUS, payload: {gameStatus: GAME_STATUS.INTRO }});
  }, []);

  const onContinue = useCallback(() => {
    dispatch({ type: CARD_ACTIONS.UPDATE_GAME_STATUS, payload: {gameStatus: GAME_STATUS.PLAYING }});
    dispatch({ type: CARD_ACTIONS.NEW_HAND });
  }, []);

  if (gameStatus === GAME_STATUS.INTRO) {
    return  (
      <div className="App">
        <Intro onStart={onGameStart}/>
      </div>
    );
  }

  return (
    <div className="App">
      {gameStatus === GAME_STATUS.END && <Result isWinner={gameWinner === "player"} onRestart={onRestart} onContinue={onContinue} />}
      <Playing
        deck={deck}
        dealerHand={dealerHand}
        playerHand={playerHand}
        isPlayerTurn={isPlayerTurn}
        dealerCount={dealerCount}
        playerCount={playerCount}
        hit={hit}
        stand={stand}
        gameStatus={gameStatus}
        gameWinner={gameWinner}
      />
    </div>
  );
}

export default Blackjack;
