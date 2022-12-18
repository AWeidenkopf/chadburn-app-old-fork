export enum Actors {
  Psychic = "psychic",
  Player = "player",
}

export interface Spectrum {
  left: string;
  right: string;
}

export interface TurnState {
  actor: Actors.Player | Actors.Psychic;
  spectrum: Spectrum;
  target: number;
  clue: string;
  guess: number;
}

/**
 *
 * @returns AwaitingClue TurnState
 */
export function startTurn(
  state: TurnState,
  spectrum: Spectrum,
  target: number
): TurnState {
  return {
    actor: Actors.Psychic,
    spectrum: spectrum,
    target: target,
    clue: "",
    guess: 0,
  };
}

export function submitClue(state: TurnState, clue: string) {
  return { ...state, actor: Actors.Player, clue };
}

export function submitGuess(state: TurnState, guess: string) {
  return { ...state, guess };
}
