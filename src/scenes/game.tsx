import React, { useState } from "react";
import * as Y from "yjs";
import { YMap } from "yjs/dist/src/internals";

import { RotatableImage } from "../components/rotatableImage";

interface GameProps {
  id?: string;
  ydoc: Y.Doc;
  ymap: Y.Map<string | number>;
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

const START_GUESS = -90;

const Keys = {
  GUESS: "guess",
};

export const Game = ({ id, ymap }: GameProps) => {
  const preferences = useState<Preferences>({ mode: Mode.PLAYER });
  const [guess, setGuess] = useState<number>(START_GUESS);

  ymap.observe((event) => {
    event.changes.keys.forEach((change, key) => {
      if (key === Keys.GUESS && change.action === "update") {
        setGuess(Number(ymap.get(key)));
      }
    });
  });

  return (
    <div>
      <RotatableImage
        url="assets/target.svg"
        style={{
          width: "50%",
          height: "50%",
          position: "absolute",
          zIndex: 1,
        }}
      />
      <RotatableImage
        url="assets/guess.svg"
        style={{
          width: "50%",
          height: "50%",
          position: "absolute",
          zIndex: 2,
        }}
        onUpdate={(angle: number) => {
          ymap.set(Keys.GUESS, angle);
        }}
        angle={guess}
      />
    </div>
  );
};
