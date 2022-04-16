import Task from '@resources/task/task.interface';
import { model, Schema } from 'mongoose';

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    expirationDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default model<Task>('Task', TaskSchema);
