import React from "react";

import styles from "./UnselectableImage.module.css";

/**
 * Browsers by default allow images to be dragged around
 * the page for some reason. This styling disables all that shit.
 */

const UnselectableImage = React.forwardRef((props: any, ref) => {
  return <img className={styles.styledImage} ref={ref} {...props} />;
});

UnselectableImage.displayName = "UnselectableImage";

export { UnselectableImage };
