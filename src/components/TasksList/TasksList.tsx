import type { Status } from "../../types/Status";
import Task from "../Task/Task";

type deleteTask = (id: string) => void;
type changeStatus = (id: string, value: Status) => void;
type editTask = (id: string) => void;

import type { TaskType } from "../../types/TaskType";

function TasksList({
  tasks,
  deleteFunc,
  changeFunc,
  editFunc
}: {
  tasks: TaskType[];
  deleteFunc: deleteTask;
  changeFunc: changeStatus;
  editFunc: editTask;
}) {
  return (
    <section>
      {tasks.map((task) => {
        return (
          <Task
            task={task}
            deleteFunc={deleteFunc}
            changeFunc={changeFunc}
            editFunc={editFunc}
            key={task.id}
          />
        );
      })}
    </section>
  );
}

export default TasksList;
