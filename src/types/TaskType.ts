type Status = "awaiting" | "inProgress" | "completed";

export type TaskType = {
  id: string,
  name: string,
  desription: string,
  status: Status
}