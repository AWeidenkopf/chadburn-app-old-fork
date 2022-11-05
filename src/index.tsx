import { createRoot } from "react-dom/client";
import React from "react";
import { Landing } from "./scenes/landing";
import { RouteComponentProps, Router } from "@reach/router";
import { Game } from "./scenes/game";

interface RoutedGameProps extends RouteComponentProps {
  id?: string;
}

const RoutedLanding = (props: RouteComponentProps) => <Landing />;
const RoutedGame = (props: RoutedGameProps) => <Game id={props.id} />;

window.onload = function () {
  const container = document.getElementById("root");
  const root = createRoot(container!);
  root.render(
    <Router>
      <RoutedLanding path="/" />
      <RoutedGame path="/:id" />
    </Router>
  );
};
