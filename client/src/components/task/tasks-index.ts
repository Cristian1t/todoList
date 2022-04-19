import { format } from "date-fns";
import { deleteTaskById, getTasks } from "../../api/task-data";
import { Task } from "../../utils/interfaces/task.interface";
import taskUpsert from "./task-upsert";

function TasksAll() {
  const isLoadingAll = document.getElementById("is-loading-all");
  // fetch tasks from api and append to DOM
  getTasks().then((taskList) => {
    getAllTasks(taskList);
    isLoadingAll?.classList.add("hidden");
  });

  // handle task creation
  createTask();
}

function getAllTasks(taskList: void | { tasks: Task[] }) {
  const tasks = document.getElementById("tasks");
  let i = 0;
  if (!tasks) {
    return;
  }
  if (taskList && taskList.tasks.length > 0) {
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

      // handle task deletion for each task
      deleteTask(i);

      //handle task update for each task
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

function createTask() {
  console.log("createTask");
  const addNewTask = document.getElementById("add-new-task");
  addNewTask?.addEventListener("click", (e) => {
    e.preventDefault();
    taskUpsert("");
  });
}

function editTask(id: string, index: number) {
  console.log("editTask");
  const task = document.getElementById(`task-${index}`);
  if (task) {
    task.addEventListener("click", (e) => {
      e.preventDefault();
      taskUpsert(id);
    });
  }
}

function deleteTask(i: number) {
  const deleteBtn = document.getElementById(
    `task-delete-${i}`
  ) as HTMLButtonElement;

  deleteBtn?.addEventListener("click", () => {
    const taskId = deleteBtn.dataset.id;
    if (taskId) {
      deleteTaskById(taskId).then(() => {
        location.reload();
      });
    }
  });
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

export default TasksAll;
