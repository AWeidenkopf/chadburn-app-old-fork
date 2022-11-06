import React from "react";

import { RotatableImage } from "../components/rotatableImage";

interface GameProps {
  id?: string;
}

/*
each target slice is 8 degrees
target angles:
points: slices
4: 86 - 94
3: 78 - 86, 94 - 102
2: 70 - 78, 102 - 110
*/

export const Game = ({ id }: GameProps) => {
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
      />
    </div>
  );
};
