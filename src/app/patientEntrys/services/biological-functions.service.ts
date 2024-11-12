import { Injectable } from '@angular/core';
import { BiologicalFunctions } from "../models/biological-functions.entity";
import { BaseService } from "../../shared/services/base.service";
import { catchError, map, Observable, of, switchMap } from "rxjs";
import { retry } from "rxjs/operators";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BiologicalFunctionsService extends BaseService<BiologicalFunctions> {

  constructor(override http: HttpClient) {
    super();
    this.resourceEndpoint = '/biologicalFunctions';
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0]; // Format to "yyyy-MM-dd"
  }

  public createBiologicalFunctions(biologicalFunctions: BiologicalFunctions, patientId: number): Observable<any> {
    const today = this.formatDate(new Date());

    return this.getBiologicalFunctionsByPatientId(patientId).pipe(
      switchMap((patientFunctions) => {
        // Ensure all dates are in "yyyy-MM-dd" format and check if an entry exists for today
        const existsToday = patientFunctions.some(func => {
          const createdAtFormatted = this.formatDate(new Date(func.createdAt));
          return createdAtFormatted === today;
        });

        if (existsToday) {
          return of({ error: 'An entry for today already exists for this patient' });
        }

        // Get all functions to find the highest ID and assign the next sequential ID
        return this.getAllBiologicalFunctions().pipe(
          switchMap((allFunctions) => {
            const maxId = allFunctions.length > 0 ? Math.max(...allFunctions.map(f => f.id)) : 0;
            biologicalFunctions.id = maxId + 1;
            biologicalFunctions.idPatient = patientId;
            biologicalFunctions.createdAt = today;
            biologicalFunctions.updatedAt = today;

            // Create the new entry
            return this.create(biologicalFunctions);
          })
        );
      }),
      catchError(this.handleError)
    );
  }

  // Fetch all biological functions to find the highest ID
  public getAllBiologicalFunctions(): Observable<BiologicalFunctions[]> {
    console.log('Fetching all biological functions...');
    const url = this.resourcePath();
    return this.http.get<BiologicalFunctions[]>(url, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Fetch biological functions for a specific patient
  public getBiologicalFunctionsByPatientId(patientId: number): Observable<BiologicalFunctions[]> {
    console.log(`Fetching biological functions for patientId: ${patientId}...`);
    const url = `${this.resourcePath()}?idPatient=${patientId}`;
    return this.http.get<BiologicalFunctions[]>(url, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
