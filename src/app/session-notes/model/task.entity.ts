export class Task {
  id: string;
  idPatient: number;
  idSession: number;
  title: string;
  description: string;
  status: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(taskData: { id: string, idPatient: number, idSession: number, title: string, description: string, status: number, createdAt: Date, updatedAt: Date }) {
    this.id = taskData.id;
    this.idPatient = taskData.idPatient;
    this.idSession = taskData.idSession;
    this.title = taskData.title;
    this.description = taskData.description;
    this.status = taskData.status;
    this.createdAt = new Date(taskData.createdAt);
    this.updatedAt = new Date(taskData.updatedAt);
  }
}
