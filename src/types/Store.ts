import type { TaskType } from "./TaskType";

export type Store = {
  tasksList: Map<string, TaskType>
}