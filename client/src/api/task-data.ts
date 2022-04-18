import { environment } from "../environments/environment";
import { createTask, Task } from "../utils/interfaces/task.interface";

const urlApi: string = environment.urlApi + "/tasks";

async function getTasks(): Promise<void | { tasks: Task[] }> {
  const response = await fetch(urlApi);
  return await response.json();
}

async function postTask(task: createTask): Promise<void | { task: Task }> {
  const response = await fetch(urlApi, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  return await response.json();
}

async function deleteTaskById(id: string): Promise<void | { task: Task }> {
  const response = await fetch(urlApi + "/" + id, {
    method: "DELETE",
  });
  return await response.json();
}

function updateTask(
  id: string,
  task: createTask
): Promise<void | { task: Task }> {
  return fetch(urlApi + "/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  }).then((response) => response.json());
}

function getTaskById(id: string): Promise<void | { task: Task }> {
  return fetch(urlApi + "/" + id).then((response) => response.json());
}

export { getTasks, postTask, deleteTaskById, getTaskById, updateTask };
