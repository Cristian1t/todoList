import { Document } from 'mongoose';

export default interface Task extends Document {
  title: string;
  description: string;
  status: 'Inserito' | 'In elaborazione' | 'Completato';
  expirationDate?: Date;
}
