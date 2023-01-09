import React from "react";

import styles from "./PsychicView.module.css";

import { UnselectableImage } from "src/components/UnselectableImage";

interface PsychicViewProps {
  target: number;
}

export const PsychicView = ({ target }: PsychicViewProps) => {
  return (
    <>
      <UnselectableImage
        src="assets/target.svg"
        style={{
          width: "50%",
          minWidth: "400px",
          height: "50%",
          position: "absolute",
          zIndex: 1,
          top: "32%",
          transform: `rotate(${target}deg)`,
        }}
      />

      <img
        src="assets/border.svg"
        alt=""
        className={styles.borderImg}
        draggable={false}
      />
    </>
  );
};
