import { createRoot } from "react-dom/client";
import React from "react";

import { RotatableImage } from "./rotatableImage";

window.onload = function () {
  const container = document.getElementById("root");
  const root = createRoot(container!);
  root.render(<RotatableImage url="assets/rotating-dial.svg" />);
};
