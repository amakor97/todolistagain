import type { Task } from "./Task";

export type Store = {
  tasksList: Map<string, Task>
}