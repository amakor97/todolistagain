import { useState } from "react";
import type { Store } from "./types/Store";
import TasksList from "./components/TasksList/TasksList";
import Button from "./components/Button/Button";

import { testTask1 } from "./tests/PoC/task";

function App() {
  const [store, setStore] = useState<Store>({
    tasksList: new Map()
  });

  function addTask() {
    setStore((store) => {
      const newTasksList = new Map(store.tasksList);
      newTasksList.set("1", testTask1);
      return {
        ...store,
        tasksList: newTasksList
      };
    });
  }

  return (
    <div>
      <TasksList tasks={Array.from(store.tasksList.values())}/>
      <Button />
    </div>
  );
}

export default App;
