import { Injectable } from '@angular/core';
import { BaseService } from "../../shared/services/base.service";
import { Task } from "../model/task.entity";
import {Observable, of, retry} from "rxjs";
import { catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TaskService extends BaseService<Task> {

  constructor() {
    super();
    this.resourceEndpoint = '/task';
  }

  public getTasksByPatientId(idPatient: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.resourcePath()}?idPatient=${idPatient}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  public getTaskBySessionId(idSession: number): Observable<Task[]> {
    console.log("Fetching tasks for session ID:", idSession); // Debugging
    return this.http.get<Task[]>(`${this.resourcePath()}?idSession=${idSession}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // New method to get the next available task ID
  public getNextTaskId(): Observable<string> {
    return this.http.get<Task[]>(this.resourcePath(), this.httpOptions).pipe(
      map((tasks: Task[]) => {
        const maxId = tasks.reduce((max, task) => Math.max(max, parseInt(String(task.id), 10)), 0);
        return (maxId + 1).toString();
      }),
      catchError((error) => {
        console.error('Error fetching tasks:', error);
        return of("1"); // Start from 1 if an error occurs
      })
    );
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
