import { createRoot } from "react-dom/client";
import React from "react";

import { Dial } from "./dial";

window.onload = function () {
  const container = document.getElementById("root");
  const root = createRoot(container!);
  root.render(<Dial />);
};
