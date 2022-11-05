import React, { useState, MouseEvent, SyntheticEvent } from "react";
import styled from "styled-components";

/**
 * Browsers by default allow images to be dragged around
 * the page for some reason. This styling disables all that shit.
 */
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

/**
 *
 * @param point point to get the angle of
 * @param origin origin point for calculating the angle
 * @returns the angle in degrees of the point with respect to the origin
 */
function getAngleOfPointDegrees(point: Point, origin: Point): number {
  const radians = Math.atan2(point.x - origin.x, point.y - origin.y);
  const degrees = Math.round(radians * RADIANS_TO_DEGRESS);

  /*
  Adjust the angle because CSS transforms are weird
  We usually learn about angles and rotation using cartesian
  coordinates with 0° being a horizontal line to the right and 90° being
  a vertical line straight up, but for CSS transforms, 90° is a
  vertical line straight down.
  */
  return degrees * -1 - 270;
}

/**
 * Normalizes the degrees to within 0° and 360°.
 * @param degrees degrees to normalize
 * @returns the degrees normalized within 0° - 360°.
 */
function normalizeDegrees(degrees: number): number {
  degrees %= 360;
  if (degrees < 0) {
    degrees += 360;
  }
  return degrees;
}

/**
 * RotatableImage is a component for displaying an image that a user
 * can rotate by clicking and dragging their mouse.
 *
 * This component restricts rotation between 180° and 360°, which in
 * browser land is the top half of a circle.
 * @param param0 props
 * @returns RotatableImage component
 */
export const RotatableImage = ({ url }: { url: string }) => {
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
        getAngleOfPointDegrees(mousePoint, imageOrigin)
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
      src={url}
      style={{ transform: `rotate(${rotation}deg)` }}
      onMouseDown={mouseDown}
      onMouseUp={mouseUp}
      onMouseMove={mouseMove}
    />
  );
};
