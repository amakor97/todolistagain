import { useState } from "react";
import type { Store } from "./types/Store";
import Task from "./components/Task/Task";
import Button from "./components/Button/Button";

function App() {
  const [store, setStore] = useState<Store>({
    tasksList: new Map()
  });

  return (
    <div>
      <Task />
      <Button />
    </div>
  );
}

export default App;
