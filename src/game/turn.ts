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

export function getRandomNumber(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 *
 * @returns AwaitingClue TurnState
 */
export function startTurn(spectrum: Spectrum, target: number): TurnState {
  return {
    actor: Actors.Psychic,
    spectrum: spectrum,
    target: target,
    clue: "",
    guess: 0,
  };
}

export function submitClue(state: TurnState, clue: string): TurnState {
  return { ...state, actor: Actors.Player, clue };
}

export function submitGuess(state: TurnState, guess: number): TurnState {
  return { ...state, guess };
}
