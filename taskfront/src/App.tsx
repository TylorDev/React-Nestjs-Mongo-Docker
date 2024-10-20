import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { TaskProvider } from "./context/taskContex";

function App() {
  return (
    <div className="bg-zinc-700 h-screen  text-white flex  items-center justify-center">
      <div className="bg-gray-950 p-4  w-2/5 ">
        <h1 className="text-3xl font-bold text-center block my-2 ">Task app</h1>
        <TaskProvider>
          <TaskList />
          <TaskForm />
        </TaskProvider>
      </div>
    </div>
  );
}

export default App;
