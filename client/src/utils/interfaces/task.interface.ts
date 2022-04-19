export interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  expirationDate: Date;
}

export interface createTask {
  title: string;
  description: string;
  status: string;
  expirationDate: Date;
}

export interface updateTask {
  title: string;
  description: string;
  status: string;
  expirationDate: Date;
}
