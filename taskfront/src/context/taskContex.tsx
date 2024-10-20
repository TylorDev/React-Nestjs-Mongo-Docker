import { createContext, FC, ReactNode, useEffect, useState } from "react";
import {
  createTaskRequest,
  deleteTaskRequest,
  getTasksRequest,
  updateTaskRequest,
} from "../api/task";
import { CreateTask, Task } from "../Interfaces/task.interfaces";

interface TaskContexValue {
  tasks: Task[];
  createTask: Promise<void>;
  onDelete: Promise<void>;
  onUpdate: Promise<void>;
}
export const TaskContext = createContext<TaskContexValue | undefined>(
  undefined
);

interface Props {
  children: ReactNode;
}

export const TaskProvider: FC<Props> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    getTasksRequest().then((data) => setTasks(data));
  }, []);

  const createTask = async (task: CreateTask) => {
    const res = await createTaskRequest(task);
    if (res) {
      setTasks((prevTasks) => [...prevTasks, res]); // Añade la nueva tarea al estado
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      const confirmDelete = window.confirm(
        "¿Estás seguro de que quieres eliminar esta tarea?"
      );
      if (confirmDelete) {
        await deleteTaskRequest(taskId); // Llama a la función para eliminar la t
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task._id !== taskId)
        ); // Filtra la tarea eliminada
      }
    } catch (error) {
      console.error("Error deleting task:", error); // Manejo de errores
    }
  };

  const updateTask = async (id: string, task: Partial<CreateTask>) => {
    try {
      const updatedTask = await updateTaskRequest(id, task); // Llama a la función para actualizar la tarea en el backend
      if (updatedTask) {
        setTasks(
          (prevTasks) =>
            prevTasks.map((t) => (t._id === id ? { ...t, ...updatedTask } : t)) // Actualiza la tarea en el estado
        );
      }
    } catch (error) {
      console.error("Error updating task:", error); // Manejo de errores
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        deleteTask,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
