import React, { useState, MouseEvent, SyntheticEvent } from "react";
import styled from "styled-components";

const UnselectableImage = styled.img`
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
  transform-origin: center center;
  margin-left: 50%;
`;

type Point = {
  x: number;
  y: number;
};

enum RotationDirection {
  CLOCKWISE = "clockwise",
  COUNTERCLOCKWISE = "counterclockwise",
}

const RADIANS_TO_DEGRESS = 180 / Math.PI;
const START_ROTATION = 270;

function getDegreesOfPoint(point: Point, origin: Point): number {
  const radians = Math.atan2(point.x - origin.x, point.y - origin.y);
  const degrees = Math.round(radians * RADIANS_TO_DEGRESS);

  return degrees * -1 - 270;
}

function normalizeDegrees(degrees: number): number {
  degrees %= 360;
  if (degrees < 0) {
    degrees += 360;
  }
  return degrees;
}

export const Dial = () => {
  const [rotation, setRotation] = useState(START_ROTATION);
  const [rotationDirection, setRotationDirection] = useState<RotationDirection>(
    RotationDirection.CLOCKWISE
  );
  const [isRotating, setIsRotating] = useState(false);
  const [imageOrigin, setImageOrigin] = useState<Point>({ x: 0, y: 0 });

  const onLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    // the center point of the image
    setImageOrigin({
      x: event.currentTarget.x + event.currentTarget.width / 2,
      y: event.currentTarget.y + event.currentTarget.height / 2,
    });
  };

  const mouseDown = (event: MouseEvent<HTMLImageElement>) => {
    setIsRotating(true);
  };

  const mouseUp = () => {
    setIsRotating(false);
  };

  const mouseMove = (event: MouseEvent<HTMLImageElement>) => {
    if (isRotating) {
      const mousePoint = { x: event.clientX, y: event.clientY };
      let newRotation = normalizeDegrees(
        getDegreesOfPoint(mousePoint, imageOrigin)
      );

      const adjusted = newRotation;

      if (
        rotationDirection === RotationDirection.CLOCKWISE &&
        newRotation < 180
      ) {
        newRotation = 360;
      } else {
        newRotation = Math.min(Math.max(newRotation, 180), 360);
      }

      if (newRotation > rotation) {
        setRotationDirection(RotationDirection.CLOCKWISE);
      } else if (newRotation < rotation) {
        setRotationDirection(RotationDirection.COUNTERCLOCKWISE);
      }
      setRotation(newRotation);
    }
  };

  return (
    <UnselectableImage
      onDragStart={(e) => {
        e.preventDefault();
        return false;
      }}
      onLoad={onLoad}
      draggable={false}
      src="assets/rotating-dial.svg"
      style={{ transform: `rotate(${rotation}deg)` }}
      onMouseDown={mouseDown}
      onMouseUp={mouseUp}
      onMouseMove={mouseMove}
    />
  );
};
