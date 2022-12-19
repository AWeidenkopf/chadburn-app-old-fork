import React, { useEffect, useState } from "react";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import styled from "styled-components";
import { BsArrowLeftSquare, BsArrowRightSquare } from "react-icons/bs"

import {
  OnUpdatingEvent,
  RotatableImage,
  RotationDirection,
} from "../components/RotatableImage";
import { UnselectableImage } from "src/components/UnselectableImage";

interface GameProps {
  id?: string;
}

interface Match {
  target?: number;
  guess?: number;
  /*
    each target slice is 8 degrees
    target angles:
    points: slices
    4: 86 - 94
    3: 78 - 86, 94 - 102
    2: 70 - 78, 102 - 110
  */
  score: Map<string, number>;
}

enum Mode {
  PLAYER = "Player",
  PSYCHIC = "Psychic",
}

interface Preferences {
  mode: Mode;
}

const START_GUESS = 0;

const Keys = {
  GUESS: "guess",
};

const PageContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: 100%;
`

const PageHeader = styled.div`
display: flex;
justify-content: left;
align-items: center;
position: absolute;
top: 0;
width: 90%;
height: 50px;
font-family: 'Rajdhani', sans-serif;
padding: 20px;
`

const ButtonContainer = styled.div`
display: flex;
justify-content: right;
align-items: center;
position: absolute;
width: 400px;
bottom: 100px;
right: 90px;
`

const CardContainer = styled.div`
display: flex;
justify-content: space-around;
align-items: center;
width: 360px;
height: 50px;
position: relative;
bottom: -120px;
`

const SubmitContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
position: absolute;
width: 100%;
height: 40px;
top: 560px;
`

const TurnContainer = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
position: absolute;
top: 50px;
width: 80%;
height: 50px;
padding: 20px;
margin: 20px;
`
const ClueContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
position: absolute;
top: 100px;
width: 80%;
height: 50px;
padding: 20px;
margin: 20px;
`
export const Player = ({ id }: GameProps) => {
  const preferences = useState<Preferences>({ mode: Mode.PLAYER });
  const [guess, setGuess] = useState<number>(START_GUESS);

  const [ymap, setYMap] = useState<Y.Map<string | number> | null>(null);
  useEffect(() => {
    const ydoc = new Y.Doc();
    // @ts-ignore this line - I think Yjs devs effed up the opts object typing
    const provider = new WebrtcProvider(id, ydoc, {
      signaling: ["ws://localhost:4444"],
    });
    const ymap = ydoc.getMap<string | number>();
    ymap.observe((event) => {
      event.changes.keys.forEach((change, key) => {
        if (key === Keys.GUESS && change.action === "update") {
          setGuess(Number(ymap.get(key)));
        }
      });
    });
    setYMap(ymap);
  }, []);

  

  // Restrict the rotation angle to -90° < θ < 90°, the top half of a circle
  // (keeping in mind that CSS transforms work clockwise
  // instead of the conventional counter-clockwise).
  const restrictToUpperHalf = (event: OnUpdatingEvent) => {
    let newAngle = event.angle;

    if (
      event.rotationDirection === RotationDirection.CLOCKWISE &&
      (newAngle > 90 || newAngle < -90)
    ) {
      newAngle = 90;
    } else if (
      event.rotationDirection === RotationDirection.COUNTERCLOCKWISE &&
      (newAngle < -90 || newAngle > 90)
    ) {
      newAngle = -90;
    }

    return newAngle;
  };



  return (
    <PageContainer>

      <PageHeader>
        <h1>CHADBURN</h1>
      </PageHeader>

      <TurnContainer>
        <h3>Blue: 0 Red: 0</h3>
        <h3>Blue team's turn!</h3>
      </TurnContainer>

      <ClueContainer>
        <h2>The Psychic has not chosen a hint yet!</h2>
      </ClueContainer>

      {/* <UnselectableImage
        src="assets/target.svg"
        style={{
          width: "50%",
          height: "50%",
          position: "absolute",
          zIndex: 1,
        }}
      /> */}

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
        <p
        style={{fontSize: "20px"}}>
          <span><BsArrowLeftSquare style={{marginBottom: "-3px", marginRight: "4px"}}/></span> 
          Spectrum 1
        </p>
        <p
        style={{fontSize: "20px"}}>
          Spectrum 2 
          <BsArrowRightSquare style={{marginBottom: "-3px", marginLeft: "4px"}}/>
        </p>
      </CardContainer>

      <SubmitContainer>
        <button
        style={{
          width: "150px",
          height: "40px"
        }}>
          SUBMIT
        </button>
      </SubmitContainer>

      <ButtonContainer>
        <button 
        style={{
          width: "90px",
          height: "40px"
        }} disabled>
          Player
        </button>
        <button
        style={{
          width: "90px",
          height: "40px"
        }}>
          Psychic
        </button>
      </ButtonContainer>
    </PageContainer>
  );
};
