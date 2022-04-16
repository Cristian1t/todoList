import validationMiddleware from '@middleware/validation.middleware';
import TaskService from '@resources/task/task.service';
import validate from '@resources/task/task.validation';
import HttpException from '@utils/exceptions/http.exception';
import Controller from '@utils/interfaces/controller.interface';
import { NextFunction, Request, Response, Router } from 'express';

class TaskController implements Controller {
  public path = '/tasks';
  public router = Router();
  private TaskService = new TaskService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(this.path, this.getAllTasks);
    this.router.get(`${this.path}/:id`, this.getTaskById);
    this.router.post(
      `${this.path}`,
      validationMiddleware(validate.create),
      this.create
    );
    this.router.put(
      `${this.path}/:id`,
      validationMiddleware(validate.update),
      this.update
    );
    this.router.delete(`${this.path}/:id`, this.delete);
  }

  private getAllTasks = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const tasks = await this.TaskService.getAll();
      res.status(200).json({ tasks });
    } catch (error) {
      next(new HttpException(400, 'Cannot get tasks'));
    }
  };

  private getTaskById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { id } = req.params;
      const task = await this.TaskService.getById(id);
      res.status(200).json({ task });
    } catch (error) {
      next(new HttpException(400, 'Cannot get task'));
    }
  };

  private create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { title, description, status, expirationDate } = req.body;
      const task = await this.TaskService.create(
        title,
        description,
        status,
        expirationDate
      );
      res.status(201).json({ task });
    } catch (error) {
      next(new HttpException(400, 'Cannot create task'));
    }
  };

  private update = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { id } = req.params;
      const { title, description, status, expirationDate } = req.body;
      const task = await this.TaskService.update(
        id,
        title,
        description,
        status,
        expirationDate
      );
      res.status(200).json({ task });
    } catch (error) {
      next(new HttpException(400, 'Cannot update task'));
    }
  };

  private delete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { id } = req.params;
      await this.TaskService.delete(id);
      res.status(200).json({ message: 'Task deleted' });
    } catch (error) {
      next(new HttpException(400, 'Cannot delete task'));
    }
  };
}

export default TaskController;
