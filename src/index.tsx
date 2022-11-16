import { createRoot } from "react-dom/client";
import React from "react";
import { Landing } from "./scenes/landing";
import { RouteComponentProps, Router } from "@reach/router";
import { Game } from "./scenes/game";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";

interface RoutedGameProps extends RouteComponentProps {
  id?: string;
}

window.onload = function () {
  const ydoc = new Y.Doc();
  // @ts-ignore this line - I think Yjs devs effed up the opts object typing
  const provider = new WebrtcProvider("room1", ydoc, {
    signaling: ["ws://localhost:4444"],
  });
  const ymap = ydoc.getMap<string | number>();

  const container = document.getElementById("root");
  const root = createRoot(container!);

  const RoutedLanding = (props: RouteComponentProps) => <Landing />;
  const RoutedGame = (props: RoutedGameProps) => (
    <Game id={props.id} ydoc={ydoc} ymap={ymap} />
  );

  root.render(
    <Router>
      <RoutedLanding path="/" />
      <RoutedGame path="/:id" />
    </Router>
  );
};
