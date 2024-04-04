import { useCallback } from "react";
import { GAME_ACTIONS } from "../constants";

function useGameCallbacks({ dispatch }) {
  const hit = useCallback(() => {
    dispatch({ type: GAME_ACTIONS.DRAW_CARD });
  }, [dispatch]);

  const stand = useCallback(() => {
    dispatch({ type: GAME_ACTIONS.STAND });
  }, [dispatch]);

  const onGameStart = useCallback(() => {
    dispatch({ type: GAME_ACTIONS.START_GAME });
  }, [dispatch]);

  const onRestart = useCallback(() => {
    dispatch({ type: GAME_ACTIONS.RESTART_GAME });
  }, [dispatch]);

  const onContinue = useCallback(() => {
    dispatch({ type: GAME_ACTIONS.NEW_HAND });
  }, [dispatch]);

  return {
    hit,
    stand,
    onGameStart,
    onRestart,
    onContinue,
  };
}

export default useGameCallbacks;
