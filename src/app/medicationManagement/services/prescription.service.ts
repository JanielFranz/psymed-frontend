import { Injectable } from "@angular/core";
import { Prescription } from "../models/prescription.entity";
import { BaseService } from '../../shared/services/base.service';
import {catchError, Observable, retry} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService extends BaseService<Prescription>{

  constructor() {
    super();
    this.resourceEndpoint = '/prescriptions';
  }
  public getPrescriptionsByPatientId(patientId: number): Observable<Prescription[]> {
    return this.http.get<Prescription[]>(`${this.resourcePath()}?patientId=${patientId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }


}

