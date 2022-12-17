import { startTurn, TurnState } from "./turn";

export interface GameState {
  // mapping between teams and points
  score: Map<string, number>;

  // the team whose turn it is
  teamInTurn: string;

  turnState: TurnState;
}

/**
 * finishTurn updates the game state with the results of the current turn.
 * It also updates the game state's turn state to prepare for the next turn.
 * TODO calculate the score from the target and guess
 * TODO update the score team
 * TODO determine if the game is finished here
 * @param state current state to update
 */
export function finishTurn(state: GameState): GameState {
  return { ...state, turnState: startTurn(state.turnState) };
}

/**
 * updateTurn performs all other turn state updates on the given game state.
 * @param state GameState to update
 * @param turnState the new TurnState for this game
 */
export function updateTurn(state: GameState, turnState: TurnState);
