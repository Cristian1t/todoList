import { format } from "date-fns";
import { getTaskById, postTask, putTask } from "../../api/task-data";
import { createTask, updateTask } from "../../utils/interfaces/task.interface";

function taskUpsert(id: string) {
  const modal = document.getElementById("modal") as any;
  modal.showModal();
  const closeModal = document.querySelector(".close-btn");
  const title = document.getElementById("form-title") as HTMLInputElement;
  const description = document.getElementById(
    "form-description"
  ) as HTMLTextAreaElement;
  const status = document.getElementById("form-status") as HTMLSelectElement;
  const expirationDate = document.getElementById(
    "form-date"
  ) as HTMLInputElement;
  const createTaskBtn = document.getElementById("create-submit");
  const updateTaskBtn = document.getElementById("update-submit");
  const isLoading = document.getElementById("is-loading");
  const modalContainer = document.getElementById("modal-container");

  closeModal?.addEventListener("click", () => {
    modal?.close();
  });

  // handle update task
  if (id !== "") {
    modalContainer?.classList.add("hidden");
    isLoading?.classList.remove("hidden");
    createTaskBtn?.classList.add("hidden");
    updateTaskBtn?.classList.remove("hidden");
    getTaskById(id).then((task) => {
      if (task) {
        modalContainer?.classList.remove("hidden");
        isLoading?.classList.add("hidden");
        title.value = task.task.title;
        description.value = task.task.description;
        status.value = task.task.status;
        expirationDate.value = format(
          new Date(task.task.expirationDate),
          "yyyy-MM-dd"
        );
      }
    });

    updateTaskBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      const task: updateTask = {
        title: title.value,
        description: description.value,
        status: status.value,
        expirationDate: new Date(expirationDate.value),
      };
      putTask(id, task).then(() => {
        modal?.close();
        window.location.reload();
      });
    });
  }
  // handle create task
  else {
    const formDate = document.getElementById("form-date") as HTMLInputElement;
    isLoading?.classList.add("hidden");
    createTaskBtn?.classList.remove("hidden");
    updateTaskBtn?.classList.add("hidden");
    formDate.value = new Date().toISOString().split("T")[0];

    createTaskBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      const task: createTask = {
        title: title.value,
        description: description.value,
        status: status.value,
        expirationDate: new Date(expirationDate.value),
      };
      postTask(task).then(() => {
        modal?.close();
        window.location.reload();
      });
    });
  }
}

export default taskUpsert;
