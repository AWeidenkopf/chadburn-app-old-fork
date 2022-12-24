import { RouteComponentProps } from "@reach/router";
import React from "react";
import { createRoot } from "react-dom/client";
import { Game } from "./scenes/Game";
import { Landing } from "./scenes/Landing";

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
