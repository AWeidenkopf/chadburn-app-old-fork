export enum ActionTypes {
  // game actions
  NEW_GAME = "NEW_GAME",
  START_GAME = "START_GAME",
  START_TURN = "START_TURN",

  // turn actions
  SUBMIT_GUESS = "SUBMIT_GUESS",
  SUBMIT_HINT = "SUBMIT_HINT",
  SUBMIT_REBUTTAL = "SUBMIT_REBUTTAL",

  // updating un-submitted state
  UPDATE_GUESS = "UPDATE_GUESS",
}

export interface Action {
  type: ActionTypes;
}

export interface UpdateGuessAction extends Action {
  type: ActionTypes.UPDATE_GUESS;
  guess: number;
}

export interface SubmitHintAction extends Action {
  type: ActionTypes.SUBMIT_HINT;
  hint: string;
}

export interface SubmitRebuttalAction extends Action {
  type: ActionTypes.SUBMIT_REBUTTAL;
  rebuttal: string;
}
