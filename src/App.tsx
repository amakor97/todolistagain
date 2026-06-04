import { useState } from "react";
import type { Store } from "./types/Store";
import TasksList from "./components/TasksList/TasksList";
import Button from "./components/Button/Button";

function App() {
  const [store, setStore] = useState<Store>({
    tasksList: new Map()
  });

  return (
    <div>
      <TasksList/>
      <Button />
    </div>
  );
}

export default App;
