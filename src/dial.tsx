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

const RADIANS_TO_DEGRESS = 180 / Math.PI;

function getDegreesOfPoint(point: Point, origin: Point): number {
  const radians = Math.atan2(point.x - origin.x, point.y - origin.y);
  const degrees = Math.round(radians * RADIANS_TO_DEGRESS);
  // reverse the sign and multiply by -180 because of the weird orientation
  // of the image. It's starting 0° is facing straight up, and it rotates
  // clockwise, so 90° is 3 o'clock.
  return degrees * -1 - 180;
}

const START_ROTATION = 0;
const MAX_ROTATION = -90;
const MIN_ROTATION = -270;

export const Dial = () => {
  const [rotation, setRotation] = useState(START_ROTATION);
  const [isRotating, setIsRotating] = useState(false);
  const [mouseStartDegrees, setMouseStartDegrees] = useState(0);
  const [imageOrigin, setImageOrigin] = useState<Point>({ x: 0, y: 0 });

  const onLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    setImageOrigin({
      x: event.currentTarget.x + event.currentTarget.width / 2,
      y: event.currentTarget.y + event.currentTarget.height * 0.8,
    });
  };

  const mouseDown = (event: MouseEvent<HTMLImageElement>) => {
    setIsRotating(true);
    setMouseStartDegrees(
      getDegreesOfPoint({ x: event.clientX, y: event.clientY }, imageOrigin) -
        rotation
    );
  };

  const mouseUp = () => {
    setIsRotating(false);
  };

  const mouseMove = (event: MouseEvent<HTMLImageElement>) => {
    if (isRotating) {
      const mousePoint = { x: event.clientX, y: event.clientY };
      let currentDegrees = getDegreesOfPoint(mousePoint, imageOrigin);

      // currentDegrees = Math.min(MAX_ROTATION, currentDegrees);
      // currentDegrees = Math.max(MIN_ROTATION, currentDegrees);

      setRotation(currentDegrees - mouseStartDegrees);
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
