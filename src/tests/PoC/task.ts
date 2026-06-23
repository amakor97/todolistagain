import type { TaskType } from "../../types/TaskType";

export const testTask1: TaskType = {
  id: "135642",
  name: "Test task 1",
  description: "Test description 1",
  status: "awaiting",
  parentTaskId: null,
  subTaskIds: []
};

export const stringedTestTask1: string = JSON.stringify(testTask1);
