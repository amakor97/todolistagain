import { useState } from "react";
import type { Store } from "./types/Store";

function App() {
  const [store, setStore] = useState<Store>({
    tasksList: new Map()
  });

  return <div></div>;
}

export default App;
