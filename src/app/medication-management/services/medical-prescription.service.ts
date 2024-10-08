import { Injectable } from "@angular/core";
import { MedicalPrescription } from "../models/medical-prescription.entity";
import { BaseService } from '../../shared/services/base.service';
import {catchError, map, Observable, retry} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class MedicalPrescriptionService extends BaseService<MedicalPrescription> {
  constructor() {
    super();
    this.resourceEndpoint = '/medical-prescriptions';
  }
  public getPrescriptionsByPatientId(patientId: number): Observable<MedicalPrescription[]> {
    return this.http.get<MedicalPrescription[]>(`${this.resourcePath()}?patientId=${patientId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  public getPrescriptionsByProfessionalId(professionalId: number): Observable<MedicalPrescription[]> {
    return this.http.get<MedicalPrescription[]>(`${this.resourcePath()}?professionalId=${professionalId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

}
