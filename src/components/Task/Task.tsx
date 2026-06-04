import type { TaskType } from "../../types/TaskType";

import Styles from "./Task.module.css";

function Task({ task }: { task: TaskType }) {
  return (
    <article className={Styles.task}>
      <h2 className={Styles.title}>{task.name}</h2>
      <p className={Styles.desc}>{task.desription}</p>
      <p className={Styles.status}>{task.status}</p>
    </article>
  );
}

export default Task;
