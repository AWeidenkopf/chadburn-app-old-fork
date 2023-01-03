import React, { useContext, useSyncExternalStore } from "react";
import { Game } from "./Game";
import { StoreContext } from "./StoreContext";

export function GameController() {
  const store = useContext(StoreContext);
  const sharedState = useSyncExternalStore(store.subscribe, store.getSnapshot);

  return <Game sharedState={sharedState} publish={store.publish}></Game>;
}
