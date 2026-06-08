import type { Status } from "../../types/Status";
import Task from "../Task/Task";

type deleteTask = (id: string) => void;
type changeStatus = (id: string, value: Status) => void;

import type { TaskType } from "../../types/TaskType";

function TasksList({
  tasks,
  deleteFunc,
  changeFunc
}: {
  tasks: TaskType[];
  deleteFunc: deleteTask;
  changeFunc: changeStatus;
}) {
  return (
    <section>
      {tasks.map((task) => {
        return (
          <Task
            task={task}
            deleteFunc={deleteFunc}
            changeFunc={changeFunc}
            key={task.id}
          />
        );
      })}
    </section>
  );
}

export default TasksList;
