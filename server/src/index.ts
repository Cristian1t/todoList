import 'dotenv/config';
import 'module-alias/register';
import TaskController from '@resources/task/task.controller';
import App from './app';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new TaskController()], Number(process.env.PORT));

app.listen();
