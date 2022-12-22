import { createRoot } from "react-dom/client";
import React from "react";
import { Landing } from "./scenes/Landing";
import { RouteComponentProps, Router } from "@reach/router";
import { Game } from "./scenes/Game";

interface RoutedGameProps extends RouteComponentProps {
  id?: string;
}

window.onload = function () {
  const container = document.getElementById("root");
  const root = createRoot(container!);

  const RoutedLanding = (props: RouteComponentProps) => <Landing />;
  const RoutedGame = (props: RoutedGameProps) => <Game id={props.id} />;

  root.render(<Game id={"123"} />);
};
