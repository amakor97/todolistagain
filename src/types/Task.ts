type Status = "awaiting" | "inProgress" | "completed";

export type Task = {
  id: string,
  name: string,
  desription: string,
  status: Status
}