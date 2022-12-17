export enum Actors {
  Psychic = "psychic",
  Player = "player",
}

export interface Spectrum {
  ends: [string, string];
}

export interface TurnState {
  actor: Actors.Player | Actors.Psychic;
  spectrum: Spectrum;
  target: number;
  clue: string;
  guess: number;
}

/**
 * TODO
 */
function randomSpectrum(): Spectrum {
  return { ends: ["likeable", "obnoxious"] };
}

/**
 * TODO
 */
function randomTarget(): number {
  return 90;
}

/**
 *
 * @returns AwaitingClue TurnState
 */
export function startTurn(state: TurnState): TurnState {
  return {
    actor: Actors.Psychic,
    spectrum: randomSpectrum(),
    target: randomTarget(),
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
