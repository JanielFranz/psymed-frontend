import { Injectable } from "@angular/core";
import { Medication } from "../models/medication.entity";
import { BaseService } from '../../shared/services/base.service';
import {catchError, Observable, retry} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MedicationService extends BaseService<Medication>{


  constructor() {
    super();
    this.resourceEndpoint = '/medications';

  }

  public createMedication(medication: Medication,patientId:number): Observable<Medication> {
    console.log("Creating medication...");
    medication.patientId = patientId;
    return this.create(medication);
  }
  public getMedicationsByPatientId(patientId: number): Observable<Medication[]> {
    console.log(`Fetching medications for patientId: ${patientId}...`);
    const url = `${this.resourcePath()}?patientId=${patientId}`;
    return this.http.get<Medication[]>(url, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  public changeStatusByMedicationId(medicationId: number): void {
    this.getById(medicationId).subscribe({
      next: (medication: Medication) => {
        if (!medication) {
          console.error(`Medication with ID ${medicationId} not found.`);
          return;
        }
        medication.status = medication.status === 0 ? 1 : 0;
        this.update(medication.id, medication).subscribe({
          next: (updatedMedication: Medication) => {
            console.log(`Medication status updated successfully:`, updatedMedication);
          },
          error: (error) => {
            console.error(`Error updating medication status:`, error);
          }
        });
      },
      error: (error) => {
        console.error(`Error fetching medication:`, error);
      }
    });
  }

}
