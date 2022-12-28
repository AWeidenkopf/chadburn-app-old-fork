import React, { useEffect, useState } from "react";
import { BsArrowLeftSquare, BsArrowRightSquare } from "react-icons/bs";
import {
  getRandomTarget,
  startTurn,
  submitClue,
  TurnState,
} from "src/game/turn";
import { WebrtcProvider } from "y-webrtc";
import * as Y from "yjs";
import { spectrumData } from "../data/spectrumData";
import styles from "./Game.module.css";
import { Player } from "./PlayerView";
import { PsychicView } from "./PsychicView";

interface GameProps {
  id?: string;
}

const START_GUESS = 0;

const Keys = {
  GUESS: "guess",
};

export const Game = ({ id }: GameProps) => {
  // const currentSpectrumData: number[] = [];
  const randomSpectrum = getRandomSpectrum(0, 60);
  const [turnState, setTurnState] = useState<TurnState>(
    startTurn(spectrumData[randomSpectrum], getRandomTarget(-90, 90))
  );

  const [guess, setGuess] = useState<number>(START_GUESS);

  const [hint, setHint] = useState<string>("");

  const [player, setPlayer] = useState<boolean>(true);
  const [playerBtn, setPlayerBtn] = useState<boolean>(false);
  const [psychicBtn, setPsychicBtn] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setHint(event.target.value);
  };

  const handleHintSubmit = () => {
    setTurnState(submitClue(turnState, hint));
  };

  const handleClick = () => {
    setPlayer(!player);
    player
      ? (setPsychicBtn(true), setPlayerBtn(false))
      : (setPsychicBtn(false), setPlayerBtn(true));
  };

  const [ymap, setYMap] = useState<Y.Map<string | number> | null>(null);
  useEffect(() => {
    const ydoc = new Y.Doc();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore this line - I think Yjs devs effed up the opts object typing
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  const onUpdated = (angle: number) => {
    ymap?.set(Keys.GUESS, angle);
  };

  function getRandomSpectrum(min: number, max: number): number {
    const spectrumIdx = Math.floor(Math.random() * (max - min) + min);
    return spectrumIdx;
    // return currentSpectrumData.indexOf(spectrumIdx) === -1
    // ? (currentSpectrumData.push(spectrumIdx), spectrumIdx)
    // : getRandomSpectrum(0, 60)
  }

  return (
    <div className={styles.pageContainer} draggable={false}>
      <div className={styles.pageHeader}>
        <h1>CHADBURN</h1>
      </div>

      <div className={styles.turnContainer}>
        <h3>Blue: 0 Red: 0</h3>
        <h3>Blue team&apos;s turn!</h3>
      </div>

      <div className={styles.clueContainer}>
        {player ? (
          turnState.clue ? (
            <h2>{turnState.clue}</h2>
          ) : (
            <h2>The Psychic has not chosen a hint yet!</h2>
          )
        ) : turnState.clue ? (
          <h2>The submitted clue is : {turnState.clue} !</h2>
        ) : (
          <>
            <input
              type="text"
              onChange={handleChange}
              style={{
                width: "400px",
                height: "34px",
                zIndex: "3",
              }}
              placeholder="Provide hint"
              id="hint"
            />
            <button
              className={styles.hintBtn}
              onClick={() => handleHintSubmit()}
            >
              SUBMIT
            </button>
          </>
        )}
      </div>
      {player ? (
        <Player guess={guess} onUpdated={onUpdated} />
      ) : (
        <PsychicView target={turnState.target} />
      )}

      <div className={styles.cardContainer}>
        <p style={{ fontSize: "20px" }}>
          <span>
            <BsArrowLeftSquare
              style={{ marginBottom: "-3px", marginRight: "4px" }}
            />
          </span>
          {turnState.spectrum.left}
        </p>
        <p style={{ fontSize: "20px" }}>
          {turnState.spectrum.right}
          <BsArrowRightSquare
            style={{ marginBottom: "-3px", marginLeft: "4px" }}
          />
        </p>
      </div>

      <div className={styles.buttomContainer}>
        <button
          style={{
            width: "100px",
            height: "50px",
            fontSize: "15px",
          }}
          onClick={() => handleClick()}
          disabled={playerBtn}
        >
          Player
        </button>
        <button
          style={{
            width: "100px",
            height: "50px",
            fontSize: "15px",
          }}
          onClick={() => handleClick()}
          disabled={psychicBtn}
        >
          Psychic
        </button>
      </div>
    </div>
  );
};
