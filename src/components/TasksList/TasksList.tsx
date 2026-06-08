import Task from "../Task/Task";

import type { TaskType } from "../../types/TaskType";

function TasksList({ tasks }: { tasks: TaskType[] }) {
  return (
    <section>
      {tasks.map((task) => {
        return <Task task={task} key={task.id} />;
      })}
    </section>
  );
}

export default TasksList;
