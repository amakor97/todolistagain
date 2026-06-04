import type { TaskType } from "./TaskType";

type AppStatus = "idle" | "adding";

export type Store = {
  tasksList: Map<string, TaskType>,
  appStatus: AppStatus
}