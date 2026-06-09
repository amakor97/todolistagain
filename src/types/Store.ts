import type { TaskType } from "./TaskType";

type AppStatus = "idle" | "adding" | "editing";

export type Store = {
  tasksList: Map<string, TaskType>;
  appStatus: AppStatus;
  editableTask: TaskType | null;
};
