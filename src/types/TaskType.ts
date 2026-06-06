import type { Status } from "./Status";

export type TaskType = {
  id: string;
  name: string;
  desription: string;
  status: Status;
};
