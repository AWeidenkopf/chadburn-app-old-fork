import React, { useEffect, useState } from "react";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";

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

export const Game = ({ id }: GameProps) => {
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
    <div>
      <UnselectableImage
        src="assets/target.svg"
        style={{
          width: "50%",
          height: "50%",
          position: "absolute",
          zIndex: 1,
        }}
      />
      <RotatableImage
        src="assets/guess.svg"
        style={{
          width: "50%",
          height: "50%",
          position: "absolute",
          zIndex: 2,
        }}
        onUpdated={(angle: number) => {
          ymap?.set(Keys.GUESS, angle);
        }}
        onUpdating={restrictToUpperHalf}
        angle={guess}
      />
    </div>
  );
};
