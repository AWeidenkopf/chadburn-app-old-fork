import React from "react";
import { GuessDial } from "src/components/GuessDial";
import styles from "./PlayerView.module.css";

interface PlayerViewProps {
  guess: number;
  onUpdated: (angle: number) => void;
}

export const Player = ({ guess, onUpdated }: PlayerViewProps) => {
  return (
    <>
      <GuessDial onUpdated={onUpdated} guess={guess} />

      <img
        src="assets/border.svg"
        className={styles.borderImg}
        draggable={false}
      />

      <div className={styles.submitContainer}>
        <button className={styles.submitBtn}>SUBMIT</button>
      </div>
    </>
  );
};
