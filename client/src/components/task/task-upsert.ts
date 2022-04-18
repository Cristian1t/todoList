import { format } from "date-fns";
import { getTaskById, postTask, updateTask } from "../../api/task-data";
import { createTask, Task } from "../../utils/interfaces/task.interface";

function openUpsertTaskModal(id?: string) {
  // const modal = document.getElementById("modal") as HTMLDialogElement;
  const modal = document.getElementById("modal") as any;
  const openModal = document.querySelector(".add-task-btn");
  const closeModal = document.querySelector(".close-btn");
  const formDate = document.getElementById("form-date") as HTMLInputElement;
  const title = document.getElementById("form-title") as HTMLInputElement;
  const description = document.getElementById(
    "form-description"
  ) as HTMLTextAreaElement;
  const status = document.getElementById("form-status") as HTMLSelectElement;
  const expirationDate = document.getElementById(
    "form-date"
  ) as HTMLInputElement;
  const createTaskBtn = document.getElementById("form-submit");

  formDate.value = new Date().toISOString().split("T")[0];

  if (id) {
    modal.showModal();
    getTaskById(id).then((task) => {
      if (task) {
        title.value = task.task.title;
        description.value = task.task.description;
        status.value = task.task.status;
        expirationDate.value = format(
          new Date(task.task.expirationDate),
          "yyyy-MM-dd"
        );
      }
    });
    if (createTaskBtn) {
      createTaskBtn.textContent = "Update";
    }
  }
  openModal?.addEventListener("click", () => {
    modal?.showModal();
  });
  closeModal?.addEventListener("click", () => {
    modal?.close();
  });

  createTaskBtn?.addEventListener("click", () => {
    const task: createTask = {
      title: title.value,
      description: description.value,
      status: status.value,
      expirationDate: new Date(expirationDate.value),
    };
    if (id) {
      updateTask(id, task).then((r) => {
        console.log(r);
        modal?.close();
        // location.reload();
      });
      return;
    }
    postTask(task).then((r) => {
      console.log(r);
      modal?.close();
      // location.reload();
    });
  });
}

export default openUpsertTaskModal;
