import type { Status } from "../../types/Status";
import Task from "../Task/Task";

type deleteTask = (id: string) => void;
type changeStatus = (id: string, value: Status) => void;
type editTask = (id: string) => void;
type addSubtask = (id: string) => void;

import type { TaskType } from "../../types/TaskType";

function TasksList({
  tasks,
  deleteFunc,
  changeFunc,
  editFunc,
  addSubtaskFunc
}: {
  tasks: TaskType[];
  deleteFunc: deleteTask;
  changeFunc: changeStatus;
  editFunc: editTask;
  addSubtaskFunc: addSubtask;
}) {
  return (
    <section>
      {tasks.map((task) => {
        return (task.parentTaskId === null) &&(
          <Task
            task={task}
            deleteFunc={deleteFunc}
            changeFunc={changeFunc}
            editFunc={editFunc}
            addSubtaskFunc={addSubtaskFunc}
            key={task.id}
          />
        );
      })}
    </section>
  );
}

export default TasksList;
