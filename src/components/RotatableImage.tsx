import React, {
  useState,
  MouseEvent,
  SyntheticEvent,
  CSSProperties,
  useRef,
} from "react";
import { UnselectableImage } from "./UnselectableImage";

type Point = {
  x: number;
  y: number;
};

enum RotationDirection {
  CLOCKWISE = "clockwise",
  COUNTERCLOCKWISE = "counterclockwise",
}

const RADIANS_TO_DEGRESS = 180 / Math.PI;
const START_ANGLE = -90;

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
  We usually learn about angles and rotation using the convention of
  0° being a horizontal line to the right and 90° being
  a vertical line straight up, but for CSS transforms, 90° is a
  vertical line straight down.
  */
  return degrees * -1 - 180;
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
 * We want to restrict the angle to the top half of a circle (0° - 180°
 * according to usual convention). However, 90° in this system corresponds to
 * a 0° angle in the CSS transform, and thus the top half of a circle becomes
 * -90° < θ < 90° range, which is harder to work with than 0° < θ < 180°.
 *
 * So, we shift the degrees by 90° to simplify things.
 * @param degrees
 * @returns degrees - 90°
 */
function shiftDegrees(degrees: number): number {
  return degrees - 90;
}

/**
 * Reverses the change in shiftDegrees.
 * @param degrees
 * @returns degrees + 90°
 */
function unshiftDegrees(degrees: number): number {
  return degrees + 90;
}

interface RotatableImageProps {
  angle?: number;
  src: string;
  style?: CSSProperties;
  onUpdate?: (angle: number) => void;
}

/**
 * RotatableImage is a component for displaying an image that a user
 * can rotate by clicking and dragging their mouse.
 *
 * This component restricts angle between 180° and 360°, which in
 * browser land is the top half of a circle.
 * @param param0 props
 * @returns RotatableImage component
 */
export const RotatableImage = ({
  src,
  style,
  onUpdate,
  angle = START_ANGLE,
}: RotatableImageProps) => {
  const [rotationDirection, setRotationDirection] = useState<RotationDirection>(
    RotationDirection.CLOCKWISE
  );
  const [isRotating, setIsRotating] = useState(false);
  const [imageOrigin, setImageOrigin] = useState<Point>({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);

  const onLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    // set the center point of the image
    setImageOrigin({
      x: event.currentTarget.x + event.currentTarget.width / 2,
      y: event.currentTarget.y + event.currentTarget.height / 2,
    });

    // use a ResizeObserver to detect whenever the viewport changes size,
    // and set the center point of the image accordingly
    const resizeObserver = new ResizeObserver((entries) => {
      const rect = entries[0].contentRect;
      setImageOrigin({
        x: rect.x + rect.width / 2,
        y: rect.y + rect.height / 2,
      });
    });
    resizeObserver.observe(imageRef.current!);
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
      // shift the angle by 90° and normalize it to 0° < θ < 360° to make the logic below easier
      let newAngle = normalizeDegrees(
        shiftDegrees(getAngleOfPointDegrees(mousePoint, imageOrigin))
      );

      // Restrict the rotation angle to 180° < θ < 360°, the top half of a circle
      // (with our 90° shift above, and keeping in mind that CSS transforms work clockwise
      // instead of the conventional counter-clockwise).
      if (rotationDirection === RotationDirection.CLOCKWISE && newAngle < 180) {
        newAngle = 360;
      } else {
        newAngle = Math.min(Math.max(newAngle, 180), 360);
      }

      if (newAngle > angle) {
        setRotationDirection(RotationDirection.CLOCKWISE);
      } else if (newAngle < angle) {
        setRotationDirection(RotationDirection.COUNTERCLOCKWISE);
      }

      if (onUpdate) onUpdate(newAngle);
    }
  };

  return (
    <UnselectableImage
      ref={imageRef}
      onDragStart={(e: DragEvent) => {
        e.preventDefault();
        return false;
      }}
      onLoad={onLoad}
      draggable={false}
      src={src}
      style={{ ...style, transform: `rotate(${unshiftDegrees(angle)}deg)` }}
      onMouseDown={mouseDown}
      onMouseUp={mouseUp}
      onMouseMove={mouseMove}
    />
  );
};
