import { Spectrum, startTurn as turnStateStartTurn, TurnState } from "./turn";

export interface GameState {
  // mapping between teams and points
  readonly score: Map<string, number>;

  // the team whose turn it is
  readonly teamInTurn: string;

  readonly turn: TurnState;
}

export function startGame(spectrum: Spectrum, target: number): GameState {
  return {
    score: new Map<string, number>([
      ["blue", 0],
      ["red", 0],
    ]),
    teamInTurn: "blue",
    turn: turnStateStartTurn(spectrum, target),
  };
}

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
    turn: turnStateStartTurn(spectrum, target),
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
  const turnScore = getTurnScore(state);

  let scoreTeam = "";
  let otherTeam = "";

  if(turnScore > 1) {
    scoreTeam = state.teamInTurn 
    otherTeam = getTeamInTurn(state)
  } else {
    scoreTeam = getTeamInTurn(state)
    otherTeam = state.teamInTurn
  }

  const newState = {...state}
  newState.score = new Map<string, number>(state.score);
  newState.score.set(scoreTeam, (state.score.get(scoreTeam) || 0 ) + turnScore)
  newState.score.set(otherTeam, (state.score.get(otherTeam) || 0 ) + 0)

  return newState
}

  /*
    each target slice is 8 degrees

    example: target is 90°
    target angles:
    points: slices
    4: 86° - 94°
    3: 78° - 86°, 94° - 102°
    2: 70° - 78°, 102° - 110°
  */
export function getTurnScore(state: GameState) : number {

  const absDifference = Math.abs(state.turn.target - state.turn.guess)

  if(absDifference <= 8) {
    return 4;
  } else if(absDifference <= 24) {
    return 3;
  } else if(absDifference <= 40) {
    return 2;
  } else {
    return 1;
  }
}

export function getTeamInTurn(state: GameState) : string {
  return state.teamInTurn === "blue" ? "red" : "blue"
}

/**
 * updateTurn performs all other turn state updates on the given game state.
 * @param state GameState to update
 * @param turn the new TurnState for this game
 * @returns the update state
 */
export function updateTurn(state: GameState, turn: TurnState): GameState {
  return { ...state, turn };
}
