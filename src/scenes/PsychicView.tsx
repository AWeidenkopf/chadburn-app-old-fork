import React from "react";
import styled from "styled-components";
import { BsArrowLeftSquare, BsArrowRightSquare } from "react-icons/bs";

import { UnselectableImage } from "src/components/UnselectableImage";

const CardContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 360px;
  height: 50px;
  position: relative;
  bottom: -120px;
`;

export const PsychicView = () => {

  return (
    <>
      <UnselectableImage
        src="assets/target.svg"
        style={{
          width: "50%",
          height: "50%",
          position: "absolute",
          zIndex: 1,
          top: "250px"
        }}
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
    </>
  );
};
