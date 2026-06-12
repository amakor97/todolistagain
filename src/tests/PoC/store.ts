import type { Store } from "../../types/Store";

import { testTask1 } from "./task";

export const testStore1: Store = {
  tasksList: new Map([[testTask1.id, testTask1]]),
  appStatus: "idle",
  editableTask: null
};

const jsonableStore = {
  ...testStore1,
  tasksList: Object.fromEntries(testStore1.tasksList)
};

export const stringedTestStore1 = JSON.stringify(jsonableStore);
