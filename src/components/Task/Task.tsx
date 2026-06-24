import type { TaskType } from "../../types/TaskType";
import { useContext } from "react";

import type { Store } from "../../types/Store";

import Styles from "./Task.module.css";

import Button from "../Button/Button";
import type { Status } from "../../types/Status";
import { AppContext } from "../../context";

type deleteTask = (id: string) => void;
type changeStatus = (id: string, value: Status) => void;
type editTask = (id: string) => void;
type addSubtask = (id: string) => void;

function Task({
  task,
  deleteFunc,
  changeFunc,
  editFunc,
  addSubtaskFunc
}: {
  task: TaskType;
  deleteFunc: deleteTask;
  changeFunc: changeStatus;
  editFunc: editTask;
  addSubtaskFunc: addSubtask;
}) {
  
  const store: Store = useContext(AppContext);

  return (
    <article className={`${Styles.task} ${task.status === "awaiting" ? Styles.awaiting : task.status === "inProgress" ? Styles.inProgress : Styles.completed}`}>
      <h2 className={Styles.title}>title: {task.name}</h2>
      <p className={Styles.desc}>desc: {task.description}</p>
      <p className={Styles.status}>status: {task.status}</p>
      <p className={Styles.status}>parent id: {task.parentTaskId}</p>
      <p className={Styles.status}>id: {task.id}</p>
      <p className={Styles.status}>sub task id's: {task.subTaskIds.join(", ")}</p>
      <Button
        btnText="Delete"
        handleClick={() => {
          deleteFunc(task.id);
        }}
      />
      {(task.subTaskIds.length === 0) && <><Button
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
      /></>}
      
      <Button
        btnText="Edit"
        handleClick={() => {
          editFunc(task.id);
        }}
      />
      <Button
        btnText="Add subtask"
        handleClick={() => {
          console.log(task.id)
          addSubtaskFunc(task.id);
        }}
      />

      {
        task.subTaskIds.map((id) => {

          const subtask = store.tasksList.get(id)

          return subtask ? (
            <Task
              task={subtask}
              deleteFunc={deleteFunc}
              changeFunc={changeFunc}
              editFunc={editFunc}
              addSubtaskFunc={addSubtaskFunc}
              key={subtask.id}
            />)
          : null;
})
        }
      

    </article>
  );
}

export default Task;
