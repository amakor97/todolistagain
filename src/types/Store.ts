import type { TaskType } from "./TaskType";

type AppStatus = "idle" | "adding" | "addingSubtask" | "editing";

export type Store = {
  tasksList: Map<string, TaskType>;
  appStatus: AppStatus;
  editableTask: TaskType | null;
  addingSubtaskId: string | null;
};
