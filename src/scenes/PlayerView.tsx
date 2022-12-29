import React from "react";
import { GuessDial } from "src/components/GuessDial";
import styles from "./PlayerView.module.css";

interface PlayerViewProps {
  guess: number;
  onUpdated: (angle: number) => void;
  onGuessSubmit: () => void;
  disableSubmit: boolean;
}


export const Player = ({ guess, onUpdated, onGuessSubmit, disableSubmit }: PlayerViewProps) => {
  return (
    <>
      <GuessDial onUpdated={onUpdated} guess={guess} />

      <img
        src="assets/border.svg"
        className={styles.borderImg}
        draggable={false}
      />

      <div className={styles.submitContainer}>
        <button className={styles.submitBtn} disabled={disableSubmit} onClick={() => onGuessSubmit()}>SUBMIT</button>
      </div>
    </>
  );
};
