import React from "react";
import { BsArrowLeftSquare, BsArrowRightSquare } from "react-icons/bs";
import styles from "./PlayerView.module.css";

import { RotatableImage } from "../components/RotatableImage";

interface PlayerViewProps {
  guess?: number;
  setGuess?: any;
  ymap?: any;
  Keys?: any;
  restrictToUpperHalf?: any;
}

export const Player = ({
  guess,
  ymap,
  Keys,
  restrictToUpperHalf,
}: PlayerViewProps) => {
  return (
    <>
      <RotatableImage
        src="assets/guess.svg"
        style={{
          width: "50%",
          minWidth: "400px",
          height: "50%",
          position: "absolute",
          zIndex: 2,
          top: "32%",
          overflow: "hidden",
        }}
        onUpdated={(angle: number) => {
          ymap?.set(Keys.GUESS, angle);
        }}
        onUpdating={restrictToUpperHalf}
        angle={guess}
      />

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
