import { useEffect, useReducer } from "react";
import { GAME_ACTIONS, GAME_STATUS } from "./constants";
import GameTable from "./components/GameTable";
import MainMenu from "./components/MainMenu";
import Result from "./components/Result";
import gameReducer, { createInitialState } from "./reducers/gameReducer";
import { countHandValue } from "./utils/gameUtils";
import useGameCallbacks from "./hooks/useGameCallbacks";
import useDealCards from "./hooks/useDealCards";
import useDealerActions from "./hooks/useDealerActions";
import "./Blackjack.css";

function Blackjack ({ initialState }) {
  const [{
    dealerHand,
    deck,
    gameStatus,
    handWinner,
    playerHand,
  }, dispatch] = useReducer(gameReducer, null, initialState ? () => initialState : createInitialState);

  const playerCount = countHandValue(playerHand);
  const dealerCount = countHandValue(dealerHand.filter((card, i) => i > 0 || gameStatus !== GAME_STATUS.PLAY));

  useDealCards({ dispatch, playerHand, dealerHand, gameStatus });
  useDealerActions({ dispatch, gameStatus, dealerCount });

  useEffect(() => {
    if (playerCount > 0 && dealerCount > 0) {
      dispatch({ type: GAME_ACTIONS.UPDATE_GAME_STATUS, payload: { playerCount, dealerCount }});
    }
  }, [playerCount, dealerCount]);

  useEffect(() => {
    if (deck?.length === 0) {
      dispatch({ type: GAME_ACTIONS.RESHUFFLE });
    }
  }, [deck]);

  const {
    hit,
    stand,
    onGameStart,
    onRestart,
    onContinue,
  } = useGameCallbacks({ dispatch });

  return (
    <div className="App">
      {gameStatus === GAME_STATUS.INTRO ? (
        <MainMenu onStart={onGameStart}/>
      ) : (
        <>
          {gameStatus === GAME_STATUS.RESULT && (
            <Result handWinner={handWinner} onRestart={onRestart} onContinue={onContinue} />
          )}
          <GameTable
            deck={deck}
            dealerHand={dealerHand}
            playerHand={playerHand}
            isPlayerTurn={gameStatus === GAME_STATUS.PLAY}
            dealerCount={dealerCount}
            playerCount={playerCount}
            hit={hit}
            stand={stand}
          />
        </>
      )}
    </div>
  );
}

export default Blackjack;
