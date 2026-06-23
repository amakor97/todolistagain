import type { Status } from "./Status";

export type TaskType = {
  id: string;
  name: string;
  description: string;
  status: Status;
  parentTaskId: string | null;
  subTaskIds: string[]
};
