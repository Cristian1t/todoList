import { format } from "date-fns";
import { Task } from "../../utils/interfaces/task.interface";
import deleteTask from "./task-delete";
import { editTask } from "./task-show";

function getAllTasks(taskList: void | { tasks: Task[] }) {
  const tasks = document.getElementById("tasks");
  let i = 0;
  if (!tasks) {
    return;
  }
  if (taskList) {
    taskList.tasks.forEach((task: Task) => {
      if (!task) {
        return;
      }
      const taskElement = document.createElement("div");
      taskElement.classList.add("task");
      taskElement.innerHTML = `
        <button class="task-delete" id="task-delete-${i}" data-id="${
        task._id
      }">Delete</button>
        <div id="task-${i}">
        <h3 class="task-title">${task.title}</h3>
        <div class="task-description">${task.description}</div>
        <div class="task-status">
        <span class="status-${i}" style="font-weight: bold">${
        task.status
      }</span>
        ${
          task.expirationDate
            ? `<span>${format(
                new Date(task.expirationDate),
                "dd-MMMM-yyyy"
              )}</span>`
            : ""
        }
        </div>
</div>
      `;
      tasks.appendChild(taskElement);
      handleColor(i);
      deleteTask(i);
      editTask(task._id, i);
      i++;
    });
  } else {
    tasks.innerHTML = `
      <div class="task">
        <div class="task-title">No tasks found</div>
      </div>
    `;
  }
}

function handleColor(i: number) {
  const status = document.querySelector(`.status-${i}`) as HTMLSpanElement;
  if (status.textContent === "Inserito") {
    status.style.color = "var(--color-success)";
  } else if (status.textContent === "In elaborazione") {
    status.style.color = "var(--color-warning)";
  } else if (status.textContent === "Completato") {
    status.style.color = "var(--color-error)";
  }
}

export default getAllTasks;
