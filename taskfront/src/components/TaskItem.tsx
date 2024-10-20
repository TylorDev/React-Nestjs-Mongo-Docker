import { useTasks } from "../context/useTask";
import { Task } from "../Interfaces/task.interfaces";

interface TaskItemProps {
  task: Task;
  onUpdate: (taskId: string) => void; // Callback for updating the task
  onDelete: (taskId: string) => void; // Callback for deleting the task
}

export function TaskItem({ task }: TaskItemProps) {
  const { deleteTask, updateTask } = useTasks();

  return (
    <li className="p-4 border border-gray-700 rounded bg-gray-800 text-white">
      <h3 className="font-semibold text-red-400">{task.title}</h3>
      <p className="text-gray-300">{task.description}</p>
      <span
        className={`inline-block mt-1 ${
          task.done ? "text-green-400" : "text-red-400"
        }`}
      >
        {task.done ? "✔️ Done" : "❌ Not Done"}
      </span>
      <div className="mt-2">
        <button
          onClick={() =>
            updateTask(task._id, {
              done: !task.done,
            })
          } // Call the update function
          className="mr-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Update
        </button>
        <button
          onClick={() => deleteTask(task._id)} // Call the delete function
          className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
