import Task from "../Task/Task";

type deleteTask = (id: string) => void;

import type { TaskType } from "../../types/TaskType";

function TasksList({
  tasks,
  deleteFunc
}: {
  tasks: TaskType[];
  deleteFunc: deleteTask;
}) {
  return (
    <section>
      {tasks.map((task) => {
        return <Task task={task} deleteFunc={deleteFunc} key={task.id} />;
      })}
    </section>
  );
}

export default TasksList;
