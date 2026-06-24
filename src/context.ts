import { createContext } from "react";
import type { Store } from "./types/Store";

const initialState: Store = {
  tasksList: new Map(),
  appStatus: "idle",
  editableTask: null,
  addingSubtaskId: null
};

export const AppContext = createContext<Store>(initialState);