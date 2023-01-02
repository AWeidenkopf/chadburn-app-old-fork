import { RouteComponentProps } from "@reach/router";
import React from "react";
import { createRoot } from "react-dom/client";
import { GameController } from "./GameController";
import { YStoreFactory } from "./store/Store";

interface RoutedGameProps extends RouteComponentProps {
  id?: string;
}

window.onload = function () {
  const container = document.getElementById("root");
  const root = createRoot(container!);

  const yStoreFactory = new YStoreFactory({ id: "123" });
  const store = yStoreFactory.getStore();

  root.render(<GameController store={store} />);
};
