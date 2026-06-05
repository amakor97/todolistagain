import { useState } from "react";
import type { Store } from "./types/Store";
import { nanoid } from "nanoid";
import TasksList from "./components/TasksList/TasksList";
import AddingForm from "./components/AddingForm/AddingForm";
import { testTask1 } from "./tests/PoC/task";

const initialState: Store = {
  tasksList: new Map(),
  appStatus: "idle"
};

function App() {
  const [store, setStore] = useState<Store>(initialState);

  function addTask() {
    setStore((store) => {
      const newTasksList = new Map(store.tasksList);
      newTasksList.set(nanoid(), testTask1);
      return {
        ...store,
        tasksList: newTasksList
      };
    });
  }

  return (
    <div>
      <TasksList tasks={Array.from(store.tasksList.values())} />
      <AddingForm submitFunc={addTask} />
    </div>
  );
}

export default App;
