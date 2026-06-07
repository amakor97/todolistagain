import type { TaskType } from "../../types/TaskType";
import { isValidStatus } from "../../types/Status";

type handler = (newTask: TaskType) => void;

import Styles from "./AddingForm.module.css";

import Button from "../Button/Button";
import { nanoid } from "nanoid";

function AddingForm({ submitFunc }: { submitFunc: handler }) {
  function createTask(): TaskType {
    const form = document.getElementById("newTaskForm");
    if (!(form instanceof HTMLFormElement)) {
      throw new Error();
    }
    const newTask: TaskType = {
      id: nanoid(),
      name: "",
      description: "",
      status: "none"
    };

    const nameInput = form.querySelector("input[name='newTaskName']");
    const descInput = form.querySelector("input[name='newTaskDescription']");
    const statusInput = form.querySelector(
      "input[name='taskStatus']:checked"
    );

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
      <input type="text" placeholder="Name" id="newTaskName" name="newTaskName"/>
      <textarea id="newTaskDescription" placeholder="Description" name="newTaskDescription"></textarea>
      <input type="radio" name="newTaskStatus" value="awaiting" />
      <input type="radio" name="newTaskStatus" value="inProgress" />
      <input type="radio" name="newTaskStatus" value="completed" />
      <Button
        handleClick={() => {
          submitFunc(createTask());
        }}
        btnText={"Add task"}
      />
    </form>
  );
}

export default AddingForm;
