import React from "react";
import { BsArrowLeftSquare, BsArrowRightSquare } from "react-icons/bs";
import styles from "./PsychicView.module.css";

import { UnselectableImage } from "src/components/UnselectableImage";

export const PsychicView = () => {
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
        }}
      />

      <img
        src="assets/border.svg"
        alt=""
        className={styles.borderImg}
        draggable={false}
      />

      <div className={styles.cardContainer}>
        <p style={{ fontSize: "20px" }}>
          <span>
            <BsArrowLeftSquare
              style={{ marginBottom: "-3px", marginRight: "4px" }}
            />
          </span>
          Spectrum 1
        </p>
        <p style={{ fontSize: "20px" }}>
          Spectrum 2
          <BsArrowRightSquare
            style={{ marginBottom: "-3px", marginLeft: "4px" }}
          />
        </p>
      </div>
    </>
  );
};
