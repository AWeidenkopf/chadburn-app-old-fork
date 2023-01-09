import { createContext } from "react";
import { getInitialSharedState, Store } from "src/store/Store";

export const StoreContext = createContext<Store>({
  getSnapshot() {
    return getInitialSharedState();
  },
  publish() {
    throw "Not implemented!";
  },
  subscribe() {
    return () => {
      throw "Not implemented!";
    };
  },
});
