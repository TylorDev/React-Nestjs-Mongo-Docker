import { CreateTask, Task } from "./../Interfaces/task.interfaces";
const API = "http://localhost:3000/api";

export const createTaskRequest = async (task: CreateTask) => {
  try {
    const response = await fetch(`${API}/tasks`, {
      method: "POST", // Set the request method to POST
      headers: {
        "Content-Type": "application/json", // Specify that we're sending JSON
      },
      body: JSON.stringify(task), // Convert the task object to a JSON string
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json(); // Parse the JSON response
    return data; // Return the response data
  } catch (error) {
    console.error("Error creating task:", error);
    throw error; // Re-throw the error for further handling
  }
};

export const getTasksRequest = async (): Promise<Task[]> => {
  try {
    const response = await fetch(`${API}/tasks`, {
      method: "GET", // Specify that we're making a GET request
      headers: {
        "Content-Type": "application/json", // Expecting JSON response
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json(); // Parse the JSON response
    return data; // Return the fetched tasks
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error; // Re-throw the error for further handling
  }
};

export const deleteTaskRequest = async (taskId: string): Promise<void> => {
  try {
    const response = await fetch(`${API}/tasks/${taskId}`, {
      method: "DELETE", // Specify that we're making a DELETE request
      headers: {
        "Content-Type": "application/json", // Expecting JSON response
      },
    });

    console.log(response);
    if (!response.ok) {
      throw new Error(`Failed to delete task with id ${taskId}`);
    }
    // No need to return anything for a DELETE request
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error; // Re-throw the error for further handling
  }
};

export const updateTaskRequest = async (
  taskId: string,
  updatedTask: Partial<CreateTask>
): Promise<Task> => {
  try {
    const response = await fetch(`${API}/tasks/${taskId}`, {
      method: "PATCH", // Specify that we're making a PATCH request
      headers: {
        "Content-Type": "application/json", // Expecting JSON response
      },
      body: JSON.stringify(updatedTask), // Send the updated task data
    });
    console.log(response);
    if (!response.ok) {
      throw new Error(`Failed to update task with id ${taskId}`);
    }

    const data = await response.json(); // Parse the JSON response
    return data; // Return the updated task
  } catch (error) {
    console.error("Error updating task:", error);
    throw error; // Re-throw the error for further handling
  }
};
