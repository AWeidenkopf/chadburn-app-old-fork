import { spectrumData } from "src/data/spectrumData";

export enum Actors {
  Psychic = "psychic",
  Player = "player",
}

export interface Spectrum {
  left: string;
  right: string;
}

export interface TurnState {
  readonly actor: Actors.Player | Actors.Psychic;
  readonly spectrum: Spectrum;
  readonly target: number;
  readonly hint: string;
  readonly guess: number;
  readonly rebuttal: string;
}

function getRandomInteger(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

export function getRandomSpectrum(): Spectrum {
  return spectrumData[getRandomInteger(0, 60)];
}

export function getRandomTarget(): number {
  return getRandomInteger(-90, 90);
}

/**
 *
 * @returns AwaitingHint TurnState
 */
export function startTurn(spectrum: Spectrum, target: number): TurnState {
  return {
    actor: Actors.Psychic,
    spectrum: spectrum,
    target: target,
    hint: "",
    guess: 0,
    rebuttal: "",
  };
}

export function submitHint(state: TurnState, hint: string): TurnState {
  return { ...state, actor: Actors.Player, hint: hint };
}

export function submitRebuttal(state: TurnState, rebuttal: string): TurnState {
  return { ...state, actor: Actors.Player, rebuttal: rebuttal };
}

export function submitGuess(state: TurnState, guess: number): TurnState {
  return { ...state, guess };
}

export function finishTurn(state: TurnState): TurnState {
  return { ...state };
}
