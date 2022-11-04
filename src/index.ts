import "src/dial";
import { visitFunctionBody } from "typescript";

window.onload = function () {
  const dial = document.createElement("rotating-dial");
  document.body.appendChild(dial);
};
