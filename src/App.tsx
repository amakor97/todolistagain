import { useState } from "react";
import type { Store } from "./types/Store";
import TasksList from "./components/TasksList/TasksList";
import AddingForm from "./components/AddingForm/AddingForm";
import type { TaskType } from "./types/TaskType";
import type { Status } from "./types/Status";

const initialState: Store = {
  tasksList: new Map(),
  appStatus: "idle"
};

function App() {
  const [store, setStore] = useState<Store>(initialState);

  function addTask(newTask: TaskType): void {
    setStore((store) => {
      const newTasksList = new Map(store.tasksList);
      newTasksList.set(newTask.id, newTask);

      return {
        ...store,
        tasksList: newTasksList
      };
    });
  }

  function deleteTask(id: string): void {
    setStore((store) => {
      const newTasksList = new Map(store.tasksList);
      newTasksList.delete(id);

      return {
        ...store,
        tasksList: newTasksList
      };
    });
  }

  function changeStatus(id: string, value: Status): void {
    setStore((store) => {
      const newTasksList = new Map(store.tasksList);
      const editedTask = newTasksList.get(id);
      if (!editedTask) {
        throw new Error("There is no task with such id");
      }
      const newTask = {
        ...editedTask,
        status: value
      };
      newTasksList.set(id, newTask);
      return {
        ...store,
        tasksList: newTasksList
      };
    });
  }

  return (
    <div>
      <TasksList
        tasks={Array.from(store.tasksList.values())}
        deleteFunc={deleteTask}
        changeFunc={changeStatus}
      />
      <AddingForm submitFunc={addTask} />
    </div>
  );
}

export default App;
