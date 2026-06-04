import Task from "../Task/Task";

import type { TaskType } from "../../types/TaskType";

function TasksList({ tasks }: { tasks: TaskType[] }) {
  return (
    <section>
      {tasks.map((task) => {
        return <Task task={task} />;
      })}
    </section>
  );
}

export default TasksList;
