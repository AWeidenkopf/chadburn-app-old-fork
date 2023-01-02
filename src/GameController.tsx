import React, { useSyncExternalStore } from "react";
import { Game } from "./scenes/Game";
import { SharedState } from "./store/SharedState";
import { Store } from "./store/Store";

export interface GameControllerProps {
  store: Store;
}

export const GameController = ({ store }: GameControllerProps) => {
  const sharedState = useSyncExternalStore<SharedState>(
    store.subscribe,
    store.getSnapshot
  );
  return <Game sharedState={sharedState} publish={store.publish} />;
};
