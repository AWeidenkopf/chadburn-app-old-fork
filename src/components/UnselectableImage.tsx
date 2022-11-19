import React, { CSSProperties } from "react";
import styled from "styled-components";

/**
 * Browsers by default allow images to be dragged around
 * the page for some reason. This styling disables all that shit.
 */
const StyledImage = styled.img`
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
  transform-origin: center center;
`;

export const UnselectableImage = React.forwardRef((props: any, ref) => {
  return <StyledImage ref={ref} {...props} />;
});
