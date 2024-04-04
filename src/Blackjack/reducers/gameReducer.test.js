import Card from "../classes/Card";
import { GAME_ACTIONS, GAME_STATUS } from "../constants";
import gameReducer, { createInitialState } from "./gameReducer";

describe("gameReducer", () => {
  test("It recreates the initial state when game is restarted", async () => {
    const state = gameReducer(createInitialState(), {
      type: GAME_ACTIONS.RESTART_GAME,
    });
    expect(state.deck.length === 52).toBeTruthy();
    expect(Array.isArray(state.dealerHand)).toBeTruthy();
    expect(Array.isArray(state.playerHand)).toBeTruthy();
    expect(state.dealerHand.length === 0).toBeTruthy();
    expect(state.playerHand.length === 0).toBeTruthy();
    expect(state.gameStatus === GAME_STATUS.INTRO).toBeTruthy();
    expect(state.handWinner).toBeNull();
  });

  test("It creates the initial state when game is started", async () => {
    const initialState = createInitialState();
    const state = gameReducer(initialState, {
      type: GAME_ACTIONS.START_GAME,
    });
    expect(state.deck === initialState.deck).toBeTruthy();
    expect(state.dealerHand === initialState.dealerHand).toBeTruthy();
    expect(state.playerHand === initialState.playerHand).toBeTruthy();
    expect(state.handWinner === initialState.handWinner).toBeTruthy();
    expect(state.gameStatus === GAME_STATUS.PLAY).toBeTruthy();
  });

  test("It resets the deck", async () => {
    const initialState = createInitialState();
    const state = gameReducer(initialState, {
      type: GAME_ACTIONS.RESHUFFLE,
    });
    expect(state.deck === initialState.deck).toBeFalsy();
    expect(state.dealerHand === initialState.dealerHand).toBeTruthy();
    expect(state.playerHand === initialState.playerHand).toBeTruthy();
    expect(state.handWinner === initialState.handWinner).toBeTruthy();
    expect(state.gameStatus === initialState.gameStatus).toBeTruthy();
  });

  test("It resets the hand", async () => {
    const initialState = createInitialState();
    const state = gameReducer(
      {
        ...initialState,
        playerHand: [new Card(1, 1), new Card(1, 13)],
        dealerHand: [new Card(2, 1), new Card(2, 13)],
        handWinner: "dealer",
        gameStatus: GAME_STATUS.RESULT,
      },
      {
        type: GAME_ACTIONS.NEW_HAND,
      },
    );

    expect(Array.isArray(state.dealerHand)).toBeTruthy();
    expect(Array.isArray(state.playerHand)).toBeTruthy();
    expect(state.dealerHand.length === 0).toBeTruthy();
    expect(state.playerHand.length === 0).toBeTruthy();
    expect(state.handWinner).toBeNull();
    expect(state.gameStatus === GAME_STATUS.PLAY).toBeTruthy();
    expect(state.deck === initialState.deck).toBeTruthy();
  });

  test("It moves the game status to stand", async () => {
    const initialState = createInitialState();
    const state = gameReducer(initialState, {
      type: GAME_ACTIONS.STAND,
    });
    expect(state.dealerHand === initialState.dealerHand).toBeTruthy();
    expect(state.playerHand === initialState.playerHand).toBeTruthy();
    expect(state.handWinner === initialState.handWinner).toBeTruthy();
    expect(state.deck === initialState.deck).toBeTruthy();
    expect(state.gameStatus === GAME_STATUS.STAND).toBeTruthy();
  });

  test("It draws a new card to the player", async () => {
    const initialState = {
      ...createInitialState(),
      gameStatus: GAME_STATUS.PLAY,
    };
    const state = gameReducer(initialState, {
      type: GAME_ACTIONS.DRAW_CARD,
    });

    expect(state.dealerHand === initialState.dealerHand).toBeTruthy();
    expect(state.handWinner === initialState.handWinner).toBeTruthy();
    expect(state.gameStatus === initialState.gameStatus).toBeTruthy();

    expect(state.deck.length === initialState.deck.length - 1).toBeTruthy();
    expect(
      state.playerHand.length === initialState.playerHand.length + 1,
    ).toBeTruthy();
    expect(
      state.playerHand[state.playerHand.length - 1] === initialState.deck[0],
    ).toBeTruthy();
  });

  test("It draws a new card to the dealer", async () => {
    const initialState = {
      ...createInitialState(),
      gameStatus: GAME_STATUS.STAND,
    };
    const state = gameReducer(initialState, {
      type: GAME_ACTIONS.DRAW_CARD,
    });

    expect(state.playerHand === initialState.playerHand).toBeTruthy();
    expect(state.handWinner === initialState.handWinner).toBeTruthy();
    expect(state.gameStatus === initialState.gameStatus).toBeTruthy();

    expect(state.deck.length === initialState.deck.length - 1).toBeTruthy();
    expect(
      state.dealerHand.length === initialState.dealerHand.length + 1,
    ).toBeTruthy();
    expect(
      state.dealerHand[state.dealerHand.length - 1] === initialState.deck[0],
    ).toBeTruthy();
  });

  test("It draws a card to the specified target", async () => {
    const initialState = {
      ...createInitialState(),
      gameStatus: GAME_STATUS.PLAY,
    };
    const state = gameReducer(initialState, {
      type: GAME_ACTIONS.DRAW_CARD,
      payload: { target: "dealer" },
    });

    expect(state.playerHand === initialState.playerHand).toBeTruthy();
    expect(state.handWinner === initialState.handWinner).toBeTruthy();
    expect(state.gameStatus === initialState.gameStatus).toBeTruthy();

    expect(state.deck.length === initialState.deck.length - 1).toBeTruthy();
    expect(
      state.dealerHand.length === initialState.dealerHand.length + 1,
    ).toBeTruthy();
    expect(
      state.dealerHand[state.dealerHand.length - 1] === initialState.deck[0],
    ).toBeTruthy();
  });

  test("It updates the game status to Stand if player has 21 or more", async () => {
    const initialState = {
      ...createInitialState(),
      gameStatus: GAME_STATUS.PLAY,
    };
    const state = gameReducer(initialState, {
      type: GAME_ACTIONS.UPDATE_GAME_STATUS,
      payload: {
        playerCount: 21,
      },
    });
    expect(state.dealerHand === initialState.dealerHand).toBeTruthy();
    expect(state.playerHand === initialState.playerHand).toBeTruthy();
    expect(state.handWinner === initialState.handWinner).toBeTruthy();
    expect(state.deck === initialState.deck).toBeTruthy();

    expect(state.gameStatus === GAME_STATUS.STAND).toBeTruthy();
  });

  test("It updates the game status to Result if is dealer's turn and he has 17 or more", async () => {
    const initialState = {
      ...createInitialState(),
      gameStatus: GAME_STATUS.STAND,
    };
    const state = gameReducer(initialState, {
      type: GAME_ACTIONS.UPDATE_GAME_STATUS,
      payload: {
        dealerCount: 17,
        playerCount: 16,
      },
    });
    expect(state.dealerHand === initialState.dealerHand).toBeTruthy();
    expect(state.playerHand === initialState.playerHand).toBeTruthy();
    expect(state.deck === initialState.deck).toBeTruthy();

    expect(state.handWinner === "dealer").toBeTruthy();
    expect(state.gameStatus === GAME_STATUS.RESULT).toBeTruthy();
  });

  test("It does not update the game status if not needed", async () => {
    const initialState = {
      ...createInitialState(),
      gameStatus: GAME_STATUS.STAND,
    };
    const state = gameReducer(initialState, {
      type: GAME_ACTIONS.UPDATE_GAME_STATUS,
      payload: {
        dealerCount: 14,
        playerCount: 16,
      },
    });
    expect(state.dealerHand === initialState.dealerHand).toBeTruthy();
    expect(state.playerHand === initialState.playerHand).toBeTruthy();
    expect(state.deck === initialState.deck).toBeTruthy();
    expect(state.handWinner === initialState.handWinner).toBeTruthy();
    expect(state.gameStatus === initialState.gameStatus).toBeTruthy();
  });

  test("It throws an error for an unknown action type", async () => {
    let error = null;
    try {
      gameReducer(createInitialState(), {
        type: "INAVLID ACTION TYPE",
      });
    } catch (err) {
      error = err;
    }
    expect(
      error.message === "Unknown action: INAVLID ACTION TYPE",
    ).toBeTruthy();
  });
});
