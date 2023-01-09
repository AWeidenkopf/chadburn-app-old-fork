import React from "react";

import { useParams } from "react-router";
import { YStoreFactory } from "src/store/Store";
import { GameController } from "./GameController";
import { StoreContext } from "./StoreContext";

export const StoreContextProvider = () => {
  const { gameId } = useParams();

  const yStoreFactory = new YStoreFactory({ id: gameId });
  const store = yStoreFactory.getStore();

  return (
    <StoreContext.Provider value={store}>
      <GameController />
    </StoreContext.Provider>
  );
};
