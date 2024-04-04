import { DEALER, GAME_ACTIONS, GAME_STATUS, PLAYER } from "../constants";
import useInterval from "./useInterval";

function useDealCards({ dispatch, playerHand, dealerHand, gameStatus }) {
  useInterval(
    () => {
      if (playerHand.length === 0) {
        dispatch({ type: GAME_ACTIONS.DRAW_CARD, payload: { target: PLAYER } });
      } else if (dealerHand.length === 0) {
        dispatch({ type: GAME_ACTIONS.DRAW_CARD, payload: { target: DEALER } });
      } else if (playerHand.length === 1) {
        dispatch({ type: GAME_ACTIONS.DRAW_CARD, payload: { target: PLAYER } });
      } else {
        dispatch({ type: GAME_ACTIONS.DRAW_CARD, payload: { target: DEALER } });
      }
    },
    gameStatus === GAME_STATUS.PLAY &&
      (dealerHand.length < 2 || playerHand.length < 2)
      ? 500
      : null
  );
}

export default useDealCards;
