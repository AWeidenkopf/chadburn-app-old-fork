import React from "react";

import { RotatableImage } from "../components/rotatableImage";

interface GameProps {
  id?: string;
}

export const Game = ({ id }: GameProps) => {
  return (
    <div>
      <RotatableImage
        url="assets/target.svg"
        style={{ position: "absolute", zIndex: 1 }}
      />
      <RotatableImage
        url="assets/guess.svg"
        style={{ zIndex: 2, position: "absolute" }}
      />
    </div>
  );
};
