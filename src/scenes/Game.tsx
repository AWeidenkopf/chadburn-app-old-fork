import React, { useEffect, useState } from "react";
import { BsArrowLeftSquare, BsArrowRightSquare } from "react-icons/bs";
import {
  Action,
  ActionTypes,
  SubmitHintAction,
  UpdateGuessAction,
} from "src/store/actions";
import { SharedState } from "src/store/SharedState";
import styles from "./Game.module.css";
import { PlayerView } from "./PlayerView";
import { PsychicView } from "./PsychicView";

interface GameProps {
  sharedState: SharedState;
  publish: <T extends Action>(action: T) => void;
}

export const Game = ({ sharedState, publish }: GameProps) => {
  const [hint, setHint] = useState<string>("");
  const [player, setPlayer] = useState<boolean>(true);
  const [playerBtn, setPlayerBtn] = useState<boolean>(false);
  const [psychicBtn, setPsychicBtn] = useState<boolean>(false);

  useEffect(() => {
    if (!sharedState.started) {
      publish({ type: ActionTypes.START_GAME });
    }
  }, [sharedState]);

  const onNewGameClick = () => {
    publish({ type: ActionTypes.NEW_GAME });
  };

  const onUpdateGuess = (guess: number) => {
    const action: UpdateGuessAction = {
      type: ActionTypes.UPDATE_GUESS,
      guess,
    };
    publish(action);
  };

  const onUpdateHint = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setHint(event.target.value);
  };

  const onSubmitHint = () => {
    const action: SubmitHintAction = {
      type: ActionTypes.SUBMIT_HINT,
      hint,
    };
    publish(action);
  };

  const onToggleActorView = () => {
    setPlayer(!player);
    player
      ? (setPsychicBtn(true), setPlayerBtn(false))
      : (setPsychicBtn(false), setPlayerBtn(true));
  };

  const onGuessSubmit = () => {
    publish({ type: ActionTypes.SUBMIT_GUESS });
  };

  const disableSubmit =
    sharedState.game.turn.actor === "psychic" ? true : false;

  return (
    <div className={styles.pageContainer} draggable={false}>
      <div className={styles.pageHeader}>
        <h1>CHADBURN</h1>
      </div>

      <div className={styles.turnContainer}>
        <h3>Blue: 0 Red: 0</h3>
        <h3>Blue team&apos;s turn!</h3>
      </div>

      <div className={styles.hintContainer}>
        {player ? (
          sharedState.game.turn.hint ? (
            <h2>{sharedState.game.turn.hint}</h2>
          ) : (
            <h2>The Psychic has not chosen a hint yet!</h2>
          )
        ) : sharedState.game.turn.hint ? (
          <h2>The submitted hint is : {sharedState.game.turn.hint} !</h2>
        ) : (
          <>
            <input
              type="text"
              onChange={onUpdateHint}
              style={{
                width: "400px",
                height: "34px",
                zIndex: "3",
              }}
              placeholder="Provide hint"
              id="hint"
            />
            <button className={styles.hintBtn} onClick={() => onSubmitHint()}>
              SUBMIT
            </button>
          </>
        )}
      </div>
      {player ? (
        <PlayerView
          guess={sharedState.guess}
          onUpdated={onUpdateGuess}
          onGuessSubmit={onGuessSubmit}
          disableSubmit={disableSubmit}
        />
      ) : (
        <PsychicView target={sharedState.game.turn.target} />
      )}

      <div className={styles.cardContainer}>
        <p style={{ fontSize: "20px" }}>
          <span>
            <BsArrowLeftSquare
              style={{ marginBottom: "-3px", marginRight: "4px" }}
            />
          </span>
          {sharedState.game.turn.spectrum.left}
        </p>
        <p style={{ fontSize: "20px" }}>
          {sharedState.game.turn.spectrum.right}
          <BsArrowRightSquare
            style={{ marginBottom: "-3px", marginLeft: "4px" }}
          />
        </p>
      </div>

      <div className={styles.buttomContainer}>
        <button
          style={{
            width: "100px",
            height: "50px",
            fontSize: "15px",
          }}
          onClick={() => onToggleActorView()}
          disabled={playerBtn}
        >
          Player
        </button>
        <button
          style={{
            width: "100px",
            height: "50px",
            fontSize: "15px",
          }}
          onClick={() => onToggleActorView()}
          disabled={psychicBtn}
        >
          Psychic
        </button>
      </div>
      <div>
        <button
          style={{
            position: "absolute",
            bottom: "40px",
          }}
          onClick={() => onNewGameClick()}
        >
          New Game
        </button>
      </div>
    </div>
  );
};
