import Deck from "../classes/Deck";
import { DEALER, GAME_ACTIONS, GAME_STATUS, PLAYER } from "../constants";
import { getHandWinner } from "../utils/gameUtils";

export const createInitialState = () => ({
  deck: new Deck(),
  playerHand: [],
  dealerHand: [],
  gameStatus: GAME_STATUS.INTRO,
  handWinner: null,
});

function gameReducer(state, { type, payload = null }) {
  switch (type) {
    case GAME_ACTIONS.RESTART_GAME: {
      return createInitialState();
    }
    case GAME_ACTIONS.START_GAME: {
      return {
        ...state,
        gameStatus: GAME_STATUS.PLAY,
      };
    }
    case GAME_ACTIONS.RESHUFFLE: {
      return {
        ...state,
        deck: new Deck(),
      };
    }
    case GAME_ACTIONS.NEW_HAND: {
      return {
        ...state,
        dealerHand: [],
        playerHand: [],
        gameStatus: GAME_STATUS.PLAY,
        handWinner: null,
      };
    }
    case GAME_ACTIONS.STAND: {
      return {
        ...state,
        gameStatus: GAME_STATUS.STAND,
      };
    }
    case GAME_ACTIONS.DRAW_CARD: {
      let target = state.gameStatus === GAME_STATUS.PLAY ? PLAYER : DEALER;
      if (payload?.target) {
        target = payload.target;
      }
      return {
        ...state,
        [`${target}Hand`]: [...state[`${target}Hand`], state.deck[0]],
        deck: state.deck.filter((_, i) => i !== 0),
      };
    }
    case GAME_ACTIONS.UPDATE_GAME_STATUS: {
      const { playerCount, dealerCount } = payload || {};
      if (state.gameStatus === GAME_STATUS.PLAY && playerCount >= 21) {
        return {
          ...state,
          gameStatus: GAME_STATUS.STAND,
        };
      } else if (state.gameStatus === GAME_STATUS.STAND && dealerCount >= 17) {
        return {
          ...state,
          gameStatus: GAME_STATUS.RESULT,
          handWinner: getHandWinner({
            dealerCount,
            playerCount,
            isDealerBlackjack:
              dealerCount === 21 && state.dealerHand.length === 2,
            isPlayerBlackjack:
              playerCount === 21 && state.playerHand.length === 2,
          }),
        };
      } else {
        return state;
      }
    }
    default:
      throw Error("Unknown action: " + type);
  }
}

export default gameReducer;
