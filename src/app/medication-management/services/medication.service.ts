import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Medication } from "../models/medication.entity";
import { BaseService } from '../../shared/services/base.service';
import { catchError, retry, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MedicationService extends BaseService<Medication> {
  private medicationsSubject = new BehaviorSubject<Medication[]>([]);
  public medications$ = this.medicationsSubject.asObservable();

  constructor() {
    super();
    this.resourceEndpoint = '/medications';
  }

  public createMedication(medication: Medication, patientId: number): Observable<Medication> {
    medication.patientId = patientId;
    return this.create(medication).pipe(
      tap(() => this.fetchMedicationsByPatientId(patientId))  // Refresh list after creating a medication
    );
  }

  public fetchMedicationsByPatientId(patientId: number): void {
    const url = `${this.resourcePath()}?patientId=${patientId}`;
    this.http.get<Medication[]>(url, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
      .subscribe(medications => this.medicationsSubject.next(medications));
  }

  public getMedicationsByPatientId(patientId: number): Observable<Medication[]> {
    return this.http.get<Medication[]>(`${this.resourcePath()}?patientId=${patientId}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  public changeStatusByMedicationId(medicationId: number): void {
    this.getById(medicationId).subscribe({
      next: (medication: Medication) => {
        if (!medication) return;
        medication.status = medication.status === 0 ? 1 : 0;
        this.update(medication.id, medication).pipe(
          tap(() => this.fetchMedicationsByPatientId(medication.patientId))  // Refresh list after status change
        ).subscribe();
      },
      error: (error) => console.error(`Error fetching medication:`, error)
    });
  }
}
