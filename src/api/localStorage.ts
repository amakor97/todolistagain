import type { Store } from "../types/Store";
import type { TaskType } from "../types/TaskType";
import { stringedTestStore1 } from "../tests/PoC/store";

const lsKey = "todo";

export function fetchFromLS(): Store | null {
  const stringedData = window.localStorage.getItem(lsKey);

  if (stringedData) {
    const data = JSON.parse(
      stringedData,
      (key: string, value: string | Record<string, unknown>) => {
        if (key === "tasksList") {
          return new Map(Object.entries(value));
        }
        return value;
      }
    ) as Store;
    // add type guard

    return data;
  } else {
    return null;
  }
}

export function loadToTS(data: unknown): void {
  const stringedData = JSON.stringify(
    data,
    (
      key,
      value: Map<string, TaskType> | Store["appStatus"] | TaskType | null
    ) => {
      if (value instanceof Map) {
        return Object.fromEntries(value);
      }
      return value;
    }
  );

  window.localStorage.setItem(lsKey, stringedData);
}
