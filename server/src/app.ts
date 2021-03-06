import ErrorMiddleware from '@middleware/error.middleware';
import Controller from '@utils/interfaces/controller.interface';
import compression from 'compression';
import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';

class App {
  public express: Application;
  public port: number;

  constructor(controllers: Controller[], port: number) {
    this.express = express();
    this.port = port;

    App.initialiseDatabaseConnection();
    this.initialiseMiddleware();
    this.initialiseControllers(controllers);
    this.initialiseErrorHandling();
  }

  private static initialiseDatabaseConnection(): void {
    const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;

    mongoose.connect(
      `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`
    );
  }

  public listen(): void {
    this.express.listen(this.port, () => {
      console.log(`Listening on port ${this.port}`);
    });
  }

  private initialiseMiddleware(): void {
    this.express.use(helmet());
    this.express.use(cors());
    this.express.use(morgan('dev'));
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(compression());
  }

  private initialiseControllers(controllers: Controller[]): void {
    controllers.forEach((controller) => {
      this.express.use('/api', controller.router);
    });
  }

  private initialiseErrorHandling(): void {
    this.express.use(ErrorMiddleware);
  }
}

export default App;
