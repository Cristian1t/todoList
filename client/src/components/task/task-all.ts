import { getTasks } from "../../api/task-data";
import taskUpsert from "./task-upsert";
import getAllTasks from "./tasks-index";

export default function TaskAll() {
  getTasks().then((taskList) => {
    getAllTasks(taskList);
  });
  taskUpsert();
}
