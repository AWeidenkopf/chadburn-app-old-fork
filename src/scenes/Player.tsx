import React, { useEffect, useState } from "react";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import styled from "styled-components";
import { BsArrowLeftSquare, BsArrowRightSquare } from "react-icons/bs";

import {
  OnUpdatingEvent,
  RotatableImage,
  RotationDirection,
} from "../components/RotatableImage";
import { UnselectableImage } from "src/components/UnselectableImage";

interface PlayerViewProps {
  guess?: number;
  setGuess?: any;
  ymap?: any;
  Keys?: any;
  restrictToUpperHalf?: any;
}

const CardContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 360px;
  height: 50px;
  position: relative;
  bottom: -120px;
`;

const SubmitContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 40px;
  top: 560px;
`;

export const Player = ({ guess, ymap, Keys, restrictToUpperHalf }: PlayerViewProps) => {
  return (
    <>
      <RotatableImage
        src="assets/guess.svg"
        style={{
          width: "50%",
          height: "50%",
          position: "absolute",
          zIndex: 2,
          top: "250px",
        }}
        onUpdated={(angle: number) => {
          ymap?.set(Keys.GUESS, angle);
        }}
        onUpdating={restrictToUpperHalf}
        angle={guess}
      />

      <CardContainer>
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
      </CardContainer>

      <SubmitContainer>
        <button
          style={{
            width: "150px",
            height: "40px",
          }}
        >
          SUBMIT
        </button>
      </SubmitContainer>
      </>
  );
};
