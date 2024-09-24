import { Injectable } from '@angular/core';
import { BaseService} from "../../shared/services/base.service";
import { Task } from "../models/task.entity";
import {catchError, Observable, retry} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService extends BaseService<Task>{
  protected override resourceEndpoint = '/tasks';
  private taskData: Task | null = null;
  constructor() {
    super();
    this.resourceEndpoint = '/tasks';
  }
  public getTaskByPatientId(patientId: number): Observable<Task[]> {
    console.log(`Fetching tasks for patientId: ${patientId}...`);
    const url = `${this.resourcePath()}?patientId=${patientId}`;
    return this.http.get<Task[]>(url, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

}
