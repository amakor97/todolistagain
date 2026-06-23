import type { TaskType } from "../../types/TaskType";
import { isValidStatus } from "../../types/Status";

import type { Store } from "../../types/Store";

type handler = (newTask: TaskType) => void;

import Styles from "./AddingForm.module.css";

import Button from "../Button/Button";
import { nanoid } from "nanoid";

function AddingForm({
  submitFunc,
  editableTask,
  appMode,
  parentTaskId
}: {
  submitFunc: handler;
  editableTask?: TaskType | null;
  appMode: Store["appStatus"];
  parentTaskId: string | null;
}) {
  console.log(appMode, editableTask);
  console.log(parentTaskId);
  function createTask(): TaskType {
    const form = document.getElementById("newTaskForm");
    if (!(form instanceof HTMLFormElement)) {
      throw new Error();
    }
    const newTask: TaskType = editableTask
      ? {
          id: editableTask.id,
          name: editableTask.name,
          description: editableTask.description,
          status: editableTask.status,
          parentTaskId: editableTask.parentTaskId,
          subTaskIds: []
        }
      : {
          id: nanoid(),
          name: "",
          description: "",
          status: "none",
          parentTaskId: parentTaskId,
          subTaskIds: []
        };

    const nameInput = form.querySelector("input[name='newTaskName']");
    const descInput = form.querySelector("input[name='newTaskDescription']");
    const statusInput = form.querySelector(
      "input[name='newTaskStatus']:checked"
    );
    console.log(statusInput);
    if (!(nameInput instanceof HTMLInputElement)) {
      newTask.name = "New task";
    } else {
      newTask.name = nameInput.value !== "" ? nameInput.value : "New task";
    }

    if (!(descInput instanceof HTMLTextAreaElement)) {
      newTask.description = "";
    } else {
      newTask.description = descInput.value;
    }

    if (statusInput instanceof HTMLInputElement) {
      const status = statusInput.value;
      if (isValidStatus(status)) {
        newTask.status = status;
      }
    }

    form.reset();
    return newTask;
  }

  return (
    <form className={Styles.form} id="newTaskForm">
      <input
        type="text"
        placeholder="Name"
        id="newTaskName"
        name="newTaskName"
        defaultValue={editableTask ? editableTask.name : ""}
      />
      <textarea
        id="newTaskDescription"
        placeholder="Description"
        name="newTaskDescription"
      ></textarea>
      <input type="radio" name="newTaskStatus" value="awaiting" />
      <input type="radio" name="newTaskStatus" value="inProgress" />
      <input type="radio" name="newTaskStatus" value="completed" />
      <Button
        handleClick={() => {
          submitFunc(createTask());
        }}
        btnText={appMode === "adding" ? "Add task" : appMode === "addingSubtask" ? "Add subtask" : "Submit changes"}
      />
    </form>
  );
}

export default AddingForm;
