import type { TaskType } from "../../types/TaskType";

import Styles from "./Task.module.css";

import Button from "../Button/Button";

type deleteTask = (id: string) => void;

function Task({
  task,
  deleteFunc
}: {
  task: TaskType;
  deleteFunc: deleteTask;
}) {
  return (
    <article className={Styles.task}>
      <h2 className={Styles.title}>{task.name}</h2>
      <p className={Styles.desc}>{task.description}</p>
      <p className={Styles.status}>{task.status}</p>
      <Button
        btnText="Delete"
        handleClick={() => {
          deleteFunc(task.id);
        }}
      />
    </article>
  );
}

export default Task;
