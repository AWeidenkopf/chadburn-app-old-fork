import React from "react";
import { BsArrowLeftSquare, BsArrowRightSquare } from "react-icons/bs";
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

      <div className={styles.cardContainer}>
        <p>
          <span>
            <BsArrowLeftSquare
              style={{ marginBottom: "-3px", marginRight: "4px" }}
            />
          </span>
          Spectrum 1
        </p>
        <p>
          Spectrum 2
          <BsArrowRightSquare
            style={{ marginBottom: "-3px", marginLeft: "4px" }}
          />
        </p>
      </div>

      <div className={styles.submitContainer}>
        <button className={styles.submitBtn}>SUBMIT</button>
      </div>
    </>
  );
};
