import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {Task} from "../model/task.entity";
import {catchError, retry} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class TaskService extends BaseService<Task> {

  constructor() {
    super();
    this.resourceEndpoint = '/task';
  }

  public getTasksByPatientId(idPatient: number) {
    return this.http.get<Task[]>(`${this.resourcePath()}?idPatient=${idPatient}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  public getTaskBySessionId(idSession: number) {
    return this.http.get<Task[]>(`${this.resourcePath()}?idSession=${idSession}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));

  }

  public changeTaskStatusById(taskId: string): void {
    this.getById(taskId).subscribe({
      next: (task: Task) => {
        if (!task) {
          console.error(`Task with ID ${taskId} not found.`);
          return;
        }
        task.status = task.status === 0 ? 1 : 0;
        this.update(task.id, task).subscribe({
          next: (updatedTask: Task) => {
            console.log(`Task status updated successfully:`, updatedTask);
          },
          error: (error) => {
            console.error(`Error updating task status:`, error);
          }
        });
      },
      error: (error) => {
        console.error(`Error fetching task:`, error);
      }
    });
  }

}
