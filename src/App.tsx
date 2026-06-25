import Styles from "./App.module.css";
import { useEffect, useState } from "react";
import type { Store } from "./types/Store";
import TasksList from "./components/TasksList/TasksList";
import AddingForm from "./components/AddingForm/AddingForm";
import type { TaskType } from "./types/TaskType";
import type { Status } from "./types/Status";
import Button from "./components/Button/Button";
import { fetchData, loadData } from "./api/middleware";
import { AppContext } from "./context";
import { initialState } from "./defaultValues";

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

  useEffect(() => {
    async function uploadData(): Promise<void> {
      await loadData(store);
    }

    void uploadData();
  }, [store]);

  function addTask(newTask: TaskType): void {
    changeMode("idle");

    console.log("gg");

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

      console.log(newTask.id, newTask.status);

      const newStore = {
        ...store,
        tasksList: newTasksList,
        editableTask: null
      };

      void loadData(newStore);

      changeGlobalStatus(newStore, newTask.id, newTask.status);

      return newStore;
    });
  }

  function addSubtask(id: string): void {
    //function addSubtask(subtask: TaskType): void {
    //console.log(subtask);

    console.log("jhh");

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
    const newTasksList = new Map(store.tasksList);
    const targetTask = newTasksList.get(id);

    if (targetTask?.subTaskIds) {
      for (const id of targetTask.subTaskIds) {
        deleteTask(id);

        console.log(targetTask.subTaskIds);

        targetTask.subTaskIds = targetTask.subTaskIds.slice(
          targetTask.subTaskIds.indexOf(id),
          1
        );

        console.log(targetTask.subTaskIds);
      }
    }

    if (targetTask && targetTask.parentTaskId !== null) {
      let parentTask = store.tasksList.get(targetTask.parentTaskId);

      console.log("l");

      if (parentTask) {
        parentTask = {
          ...parentTask,
          subTaskIds: parentTask.subTaskIds.filter((subId) => subId !== id)
        };


        newTasksList.set(targetTask.parentTaskId, parentTask);
      }

      
    }

    setStore((store) => {
      newTasksList.delete(id);

      const newStore = {
        ...store,
        tasksList: newTasksList
      };

      void loadData(newStore);

      return newStore;
    });
  }

  function changeGlobalStatus(store: Store, id: string, value: Status): void {
    const targetTask = store.tasksList.get(id);
    console.log(targetTask);
    console.log(targetTask?.id);
    console.log("\n");
    console.log("child", value);

    let newStore;

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
      console.log(targetTask);
      if (targetTask && targetTask.parentTaskId) {
        console.log("yyyy");
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

          console.log("parent current", parentTask.status);
          newTasksList.set(parentTask.id, parentTask);

          newStore = {
            ...store,
            tasksList: newTasksList
          };

          if (parentTask.parentTaskId) {
            changeGlobalStatus(newStore, parentTask.id, parentTask.status);
          }
        }
      }

      newStore = {
        ...store,
        tasksList: newTasksList
      };

      void loadData(newStore);

      return newStore;
    });

    console.log("upload");
  }

  function changeStatus(id: string, value: Status): void {
    const targetTask = store.tasksList.get(id);
    console.log(targetTask);
    console.log(targetTask?.id);
    console.log("\n");
    console.log("child", value);

    let newStore;

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
      console.log(targetTask);
      if (targetTask && targetTask.parentTaskId) {
        console.log("yyyy");
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

          console.log("parent current", parentTask.status);
          newTasksList.set(parentTask.id, parentTask);

          newStore = {
            ...store,
            tasksList: newTasksList
          };

          if (parentTask.parentTaskId) {
            changeGlobalStatus(newStore, parentTask.id, parentTask.status);
          }
        }
      }

      newStore = {
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
    <AppContext.Provider value={store}>
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
    </AppContext.Provider>
  );
}

export default App;
