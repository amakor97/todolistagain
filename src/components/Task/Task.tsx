import type { TaskType } from "../../types/TaskType";

import Styles from "./Task.module.css";

import Button from "../Button/Button";
import type { Status } from "../../types/Status";

type deleteTask = (id: string) => void;
type changeStatus = (id: string, value: Status) => void;
type editTask = (id: string) => void;

function Task({
  task,
  deleteFunc,
  changeFunc,
  editFunc
}: {
  task: TaskType;
  deleteFunc: deleteTask;
  changeFunc: changeStatus;
  editFunc: editTask;
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
      <Button
        btnText="Awaiting"
        handleClick={() => {
          changeFunc(task.id, "awaiting");
        }}
      />
      <Button
        btnText="In progress"
        handleClick={() => {
          changeFunc(task.id, "inProgress");
        }}
      />
      <Button
        btnText="Completed"
        handleClick={() => {
          changeFunc(task.id, "completed");
        }}
      />
      <Button
        btnText="Edit"
        handleClick={() => {
          editFunc(task.id);
        }}
      />
    </article>
  );
}

export default Task;
