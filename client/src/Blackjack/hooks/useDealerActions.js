import { GAME_ACTIONS, GAME_STATUS } from "../constants";
import useInterval from "./useInterval";

function useDealerActions({ dispatch, gameStatus, dealerCount }) {
  useInterval(
    () => {
      dispatch({ type: GAME_ACTIONS.DRAW_CARD });
    },
    gameStatus === GAME_STATUS.STAND && dealerCount < 17 ? 1000 : null
  );
}

export default useDealerActions;
