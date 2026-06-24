import Styles from "./App.module.css";
import { useEffect, useState } from "react";
import type { Store } from "./types/Store";
import TasksList from "./components/TasksList/TasksList";
import AddingForm from "./components/AddingForm/AddingForm";
import type { TaskType } from "./types/TaskType";
import type { Status } from "./types/Status";
import Button from "./components/Button/Button";
import { fetchData, loadData } from "./api/middleware";

const initialState: Store = {
  tasksList: new Map(),
  appStatus: "idle",
  editableTask: null,
  addingSubtaskId: null
};

function App() {
  const [store, setStore] = useState<Store>(initialState);

  useEffect(() => {
    async function setData(): Promise<void> {
      const data = await fetchData();
      if (data) {
        setStore(() => data);
      }
    }

    void setData();
  }, []);

  function addTask(newTask: TaskType): void {
    changeMode("idle");
    setStore((store) => {
      const newTasksList = new Map(store.tasksList);

      if (store.addingSubtaskId) {
        const parentTask = newTasksList.get(store.addingSubtaskId);
        if (parentTask) {
          parentTask.subTaskIds.push(newTask.id);
          newTasksList.set(store.addingSubtaskId, parentTask);
        }
        store.addingSubtaskId = null;
      }

      newTasksList.set(newTask.id, newTask);

      const newStore = {
        ...store,
        tasksList: newTasksList,
        editableTask: null
      };

      void loadData(newStore);

      return newStore;
    });
  }

  function addSubtask(id: string): void {
    //function addSubtask(subtask: TaskType): void {
    //console.log(subtask);
    console.log(id);
    setStore((store) => {
      return {
        ...store,
        addingSubtaskId: id
      };
    });
    changeMode("addingSubtask");
  }

  function deleteTask(id: string): void {
    const targetTask = store.tasksList.get(id);

    if (targetTask?.subTaskIds) {
      for (const id of targetTask.subTaskIds) {
        deleteTask(id);
        targetTask.subTaskIds = targetTask.subTaskIds.slice(
          targetTask.subTaskIds.indexOf(id),
          1
        );
      }
    }

    setStore((store) => {
      const newTasksList = new Map(store.tasksList);
      newTasksList.delete(id);

      const newStore = {
        ...store,
        tasksList: newTasksList
      };

      void loadData(newStore);

      return newStore;
    });
  }

  function changeStatus(id: string, value: Status): void {
    const targetTask = store.tasksList.get(id);
    console.log("\n");
    console.log("child", value);

    // add recursion

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

      if (targetTask && targetTask.parentTaskId) {
        const parentTask = newTasksList.get(targetTask.parentTaskId);

        if (parentTask) {
          let allWaitng = true;
          let allCompleted = true;

          for (const id of parentTask.subTaskIds) {
            const subtask = newTasksList.get(id);
            console.log(subtask);
            if (
              subtask?.status === "awaiting" ||
              subtask?.status === "inProgress"
            ) {
              console.log("NOT C");
              allCompleted = false;
            }
            if (
              subtask?.status === "completed" ||
              subtask?.status === "inProgress"
            ) {
              console.log("NOT W");
              allWaitng = false;
            }
          }

          parentTask.status = allWaitng
            ? "awaiting"
            : allCompleted
              ? "completed"
              : "inProgress";

          newTasksList.set(parentTask.id, parentTask);
        }
      }

      const newStore = {
        ...store,
        tasksList: newTasksList
      };

      void loadData(newStore);

      return newStore;
    });

    console.log("upload");

    
  }

  function changeMode(mode: Store["appStatus"]): void {
    setStore((store) => {
      return {
        ...store,
        appStatus: mode
      };
    });
  }

  function editTask(id: string): void {
    setStore((store) => {
      const newTasksList = new Map(store.tasksList);
      const editedTask = newTasksList.get(id);
      if (!editedTask) {
        throw new Error("There is no task with such id");
      }

      return { ...store, appStatus: "editing", editableTask: editedTask };
    });
  }

  return (
    <div className={Styles.app}>
      {store.appStatus === "idle" && (
        <TasksList
          tasks={Array.from(store.tasksList.values())}
          deleteFunc={deleteTask}
          changeFunc={changeStatus}
          editFunc={editTask}
          addSubtaskFunc={addSubtask}
        />
      )}
      {(store.appStatus === "adding" ||
        store.appStatus === "editing" ||
        store.appStatus === "addingSubtask") && (
        <AddingForm
          submitFunc={addTask}
          editableTask={store.editableTask}
          appMode={store.appStatus}
          parentTaskId={
            store.appStatus === "editing" && store.editableTask
              ? store.editableTask.parentTaskId
              : store.appStatus === "adding"
                ? null
                : store.addingSubtaskId
          }
        />
      )}

      {store.appStatus === "idle" && (
        <Button
          btnText="Add"
          handleClick={() => {
            changeMode("adding");
          }}
        />
      )}
      <p>m: {store.appStatus}</p>
      <p>e: {store.editableTask?.id || "null"}</p>
      <p>a: {store.addingSubtaskId}</p>
    </div>
  );
}

export default App;
