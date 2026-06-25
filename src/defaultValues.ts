import type { Store } from "./types/Store";

export const initialState: Store = {
  tasksList: new Map(),
  appStatus: "idle",
  editableTask: null,
  addingSubtaskId: null
};