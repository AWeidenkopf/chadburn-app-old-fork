import React from "react";
import {
  OnUpdatingEvent,
  RotatableImage,
  RotationDirection,
} from "../components/RotatableImage";

export interface GuessDialProps {
  guess: number;
  onUpdated: (angle: number) => void;
}

/**
 * GuessDial represents the game's guess dial SVG. It restricts its rotation
 * to the top half of a circle.
 */
export const GuessDial = ({ guess, onUpdated }: GuessDialProps) => {
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
    <RotatableImage
      src="assets/guess.svg"
      style={{
        width: "50%",
        minWidth: "400px",
        height: "50%",
        position: "absolute",
        zIndex: 2,
        top: "32%",
        overflow: "hidden",
      }}
      onUpdated={onUpdated}
      onUpdating={restrictToUpperHalf}
      angle={guess}
    />
  );
};
