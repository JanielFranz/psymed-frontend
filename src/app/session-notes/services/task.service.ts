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

}
