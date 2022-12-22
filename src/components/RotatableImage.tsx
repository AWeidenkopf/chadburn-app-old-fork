import React, {
  useState,
  MouseEvent,
  TouchEvent,
  SyntheticEvent,
  CSSProperties,
  useRef,
  useEffect,
} from "react";
import { UnselectableImage } from "./UnselectableImage";

type Point = {
  x: number;
  y: number;
};

export enum RotationDirection {
  CLOCKWISE = "clockwise",
  COUNTERCLOCKWISE = "counterclockwise",
}

const RADIANS_TO_DEGREES = 180 / Math.PI;
const START_ANGLE = 0;

/**
 *
 * @param point point to get the angle of
 * @param origin origin point for calculating the angle
 * @returns the angle in degrees of the point with respect to the origin
 */
function getAngleOfPointDegrees(point: Point, origin: Point): number {
  const radians = Math.atan2(point.x - origin.x, point.y - origin.y);
  const degrees = Math.round(radians * RADIANS_TO_DEGREES);

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
 * Normalizes the degrees to within -90° and 90°.
 * @param degrees degrees to normalize
 * @returns the degrees normalized within -90° and 90°.
 */
function normalizeDegrees(degrees: number): number {
  degrees %= 360;
  if (degrees < 0) {
    degrees += 360;
  }
  if (degrees > 180) {
    degrees -= 360;
  }

  return degrees;
}

export interface OnUpdatingEvent {
  /**
   * The updated angle, normalized within -90° and 90°.
   */
  angle: number;
  rotationDirection: RotationDirection;
}

export interface RotatableImageProps {
  angle?: number;
  src: string;
  style?: CSSProperties;
  onUpdated?: (angle: number) => void;
  onUpdating?: (event: OnUpdatingEvent) => number;
}

/**
 * RotatableImage is a component for displaying an image that a user
 * can rotate by clicking and dragging their mouse.
 *
 * This component restricts the angle to -90° and 90°, which in
 * browser land is the top half of a circle.
 * @param param0 props
 * @returns RotatableImage component
 */
export const RotatableImage = ({
  src,
  style,
  onUpdated,
  onUpdating,
  angle = START_ANGLE,
}: RotatableImageProps) => {
  // editModedAngle saves the angle while this component is in 'edit mode'
  // (while the mouse is down)
  const [editModeAngle, setEditModeAngle] = useState<number>(angle);
  const [rotationDirection, setRotationDirection] = useState<RotationDirection>(
    RotationDirection.CLOCKWISE
  );
  const [isRotating, setIsRotating] = useState(false);
  const [imageOrigin, setImageOrigin] = useState<Point>({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // don't accept updates from the parent component if
    // this image is being rotated still.
    if (!isRotating) setEditModeAngle(angle);
  }, [angle]);

  const onLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    // set the center point of the image
    setImageOrigin({
      x: event.currentTarget.x + event.currentTarget.width / 2,
      y: event.currentTarget.y + event.currentTarget.height / 2,
    });
  };

  useEffect(() => {
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

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const startRotating = () => {
    setIsRotating(true);
  };

  const finishRotating = () => {
    setIsRotating(false);

    // when the mouse is released, update the parent
    if (onUpdated) onUpdated(editModeAngle);
  };

  const rotate = (point: Point) => {
    if (isRotating) {
      // shift the angle by 90° and normalize it to -90° < θ < 90° to make the logic below easier
      let newAngle = normalizeDegrees(
        getAngleOfPointDegrees(point, imageOrigin)
      );

      // allow the parent to update the angle e.g. to restrict the range
      // the user can rotate.
      if (onUpdating) {
        newAngle = onUpdating({ angle: newAngle, rotationDirection });
      }

      if (newAngle > editModeAngle) {
        setRotationDirection(RotationDirection.CLOCKWISE);
      } else if (newAngle < editModeAngle) {
        setRotationDirection(RotationDirection.COUNTERCLOCKWISE);
      }

      setEditModeAngle(newAngle);
    }
  };

  const mouseMove = (event: MouseEvent<HTMLImageElement>) => {
    const mousePoint = { x: event.clientX, y: event.clientY };
    rotate(mousePoint);
  };

  const tapMove = (event: TouchEvent<HTMLImageElement>) => {
    const touch = event.touches.item(0);
    const touchPoint = { x: touch.clientX, y: touch.clientY };
    rotate(touchPoint);
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
      style={{
        ...style,
        transform: `rotate(${editModeAngle}deg)`,
      }}
      onMouseDown={startRotating}
      onMouseUp={finishRotating}
      onMouseMove={mouseMove}
      onTouchStart={startRotating}
      onTouchEnd={finishRotating}
      onTouchMove={tapMove}
    />
  );
};
