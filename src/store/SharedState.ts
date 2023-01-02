import { GameState } from "src/game/game";

/**
 * SharedState is meant to be shared across all clients in the
 * same game. It includes the game state as well as 'edit mode' properties.
 */
export interface SharedState {
  // guess is the current position of the guess dial;
  // once the guess is submitted, it is saved to the GameState
  guess: number;

  // the current state of the game
  game: GameState;

  started: boolean;
}
