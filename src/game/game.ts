import { Spectrum, startTurn as turnStateStartTurn, TurnState } from "./turn";

export interface GameState {
  // mapping between teams and points
  score: Map<string, number>;

  // the team whose turn it is
  teamInTurn: string;

  turnState: TurnState;
}

// export function startGame(spectrum: Spectrum, target: number): GameState {
//   return {
//     score: new Map<string, number>([
//       ["blue", 0],
//       ["red", 0],
//     ]),
//     teamInTurn: "blue",
//     turnState: turnStateStartTurn(turnState, spectrum, target),
//   };
// }

/**
 * startTurn stars a new turn for the given team.
 * @param state current game state
 * @param teamInTurn the team whose turn is starting
 * @param spectrum the spectrum for this turn
 * @param target the target for this turn
 * @returns updated game state
 */
export function startTurn(
  state: GameState,
  teamInTurn: string,
  spectrum: Spectrum,
  target: number
): GameState {
  return {
    ...state,
    teamInTurn,
    turnState: turnStateStartTurn(state.turnState, spectrum, target),
  };
}

/**
 * finishTurn updates the game state with the results of the current turn.
 * It also updates the game state's turn state to prepare for the next turn.
 * TODO calculate the score from the target and guess
 * TODO update the score team
 * TODO determine if the game is finished here
 * @param state current state to update
 * @returns the update state
 */
export function finishTurn(state: GameState): GameState {
  return { ...state };
}

/**
 * updateTurn performs all other turn state updates on the given game state.
 * @param state GameState to update
 * @param turnState the new TurnState for this game
 * @returns the update state
 */
export function updateTurn(state: GameState, turnState: TurnState) {
  return { ...state, turnState };
}
