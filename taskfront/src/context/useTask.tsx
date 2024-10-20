import { useContext } from "react";
import { TaskContext } from "./taskContex";

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("NO CONTEXT PROVIDER");
  return context;
};
