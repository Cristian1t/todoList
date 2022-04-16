import Task from '@resources/task/task.interface';
import TaskModel from '@resources/task/task.model';

class TaskService {
  private task = TaskModel;

  /**
   * Create a new task
   */
  public async create(
    title: string,
    description: string,
    status: string,
    expirationDate: Date
  ): Promise<Task> {
    try {
      return await this.task.create({
        title,
        description,
        status,
        expirationDate,
      });
    } catch (error) {
      throw new Error('Unable to create task');
    }
  }

  /**
   * Get all tasks
   */
  public async getAll(): Promise<Task[]> {
    try {
      return await this.task.find();
    } catch (error) {
      throw new Error('Unable to get tasks');
    }
  }

  /**
   * Get a task by id
   */
  public async getById(id: string): Promise<Task | null> {
    try {
      return await this.task.findById(id);
    } catch (error) {
      throw new Error('Unable to get task');
    }
  }

  /**
   * Update a task
   */
  public async update(
    id: string,
    title: string,
    description: string,
    status: string,
    expirationDate: Date
  ): Promise<Task | null> {
    try {
      return await this.task.findByIdAndUpdate(id, {
        title,
        description,
        status,
        expirationDate,
      });
    } catch (error) {
      throw new Error('Unable to update task');
    }
  }

  /**
   * Delete a task
   */
  public async delete(id: string): Promise<Task | null> {
    try {
      return await this.task.findByIdAndDelete(id);
    } catch (error) {
      throw new Error('Unable to delete task');
    }
  }
}

export default TaskService;
