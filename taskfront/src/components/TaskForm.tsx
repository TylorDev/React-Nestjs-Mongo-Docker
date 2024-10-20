import { useState } from "react";
import { createTaskRequest } from "../api/task";
import { useTasks } from "../context/useTask";

function TaskForm() {
  const [task, setTask] = useState({
    title: "",
    description: "",
    done: false,
  });

  const { createTask } = useTasks();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto de envío del formulario
    createTask(task);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <form action="" className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Task Title"
          onChange={handleChange}
        />
        <textarea
          name="description"
          rows={3}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Task Description"
          onChange={handleChange}
        ></textarea>
        <div className="flex items-center">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              name="done"
              checked={task.done}
              onChange={handleChange}
            />
            <span className="text-gray-700">Done</span>
          </label>
        </div>
        <button className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Save
        </button>
      </form>
    </div>
  );
}
export default TaskForm;
