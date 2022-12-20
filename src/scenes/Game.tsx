import React, { useEffect, useState } from "react";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { Player } from "./Player";
import { PsychicView } from "./PsychicView";
import styled from "styled-components";

import {
  OnUpdatingEvent,
  RotatableImage,
  RotationDirection,
} from "../components/RotatableImage";
import { UnselectableImage } from "src/components/UnselectableImage";

interface GameProps {
  id?: string;
  player?: boolean;
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
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  position: absolute;
  top: 0;
  width: 90%;
  height: 50px;
  font-family: "Rajdhani", sans-serif;
  padding: 20px;
`;

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
`;
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
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  position: absolute;
  width: 400px;
  bottom: 100px;
  right: 90px;
`;

export const Game = ({ id }: GameProps) => {
  const [guess, setGuess] = useState<number>(START_GUESS);

  const [player, setPlayer] = useState<boolean>(true);
  const [playerBtn, setPlayerBtn] = useState<boolean>(false);
  const [psychicBtn, setPsychicBtn] = useState<boolean>(false);

  const handleClick = () => {
    setPlayer(!player)
    player? (setPsychicBtn(true), setPlayerBtn(false)): (setPsychicBtn(false), setPlayerBtn(true))
  }

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
        {player ? <h2>The Psychic has not chosen a hint yet!</h2> 
        :<>
          <input 
          style={{
            width: "400px",
            height: "34px",
          }}
          placeholder="provide hint"/> 
          <button
          style={{
            width: "90px",
            height: "40px",
          }}>
            SUBMIT
          </button>
        </>}
        
      </ClueContainer>
      {player ? <Player guess={guess} setGuess={setGuess} ymap={ymap} Keys={Keys} restrictToUpperHalf={restrictToUpperHalf}/> : <PsychicView />}

      <ButtonContainer>
        <button
          style={{
            width: "90px",
            height: "40px",
          }}

          onClick={() => handleClick()}
          disabled={playerBtn}
        >
          Player
        </button>
        <button
          style={{
            width: "90px",
            height: "40px",
          }}

          onClick={() => handleClick()}
          disabled={psychicBtn}
        >
          Psychic
        </button>
      </ButtonContainer>
      </PageContainer>
)};
