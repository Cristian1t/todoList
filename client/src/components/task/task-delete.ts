import { deleteTaskById } from "../../api/task-data";

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

export default deleteTask;
