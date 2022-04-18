import openUpsertTaskModal from "./task-upsert";

function editTask(id: string, index: number) {
  const task = document.getElementById(`task-${index}`);
  console.log(task);
  if (task) {
    task.addEventListener("click", () => {
      openUpsertTaskModal(id);
    });
  }
}

export { editTask };
