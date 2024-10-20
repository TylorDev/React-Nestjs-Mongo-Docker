import { TaskItem } from "./TaskItem";
import { useTasks } from "../context/useTask";

function TaskList() {
  const { tasks } = useTasks();

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Task List</h2>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <TaskItem key={task._id} task={task} />
        ))}
      </ul>
    </div>
  );
}
export default TaskList;
