import { Injectable } from '@angular/core';
import { BiologicalFunctions } from "../models/biological-functions.entity";
import { BaseService } from "../../shared/services/base.service";
import {catchError, map, Observable, of, switchMap, throwError} from "rxjs";
import { retry } from "rxjs/operators";
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BiologicalFunctionsService extends BaseService<BiologicalFunctions> {

  constructor(override http: HttpClient) {
    super();
    this.resourceEndpoint = '/patients';
  }



  public createBiologicalFunctions(biologicalFunctions: BiologicalFunctions, token: string | null): void {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    const url = `${this.resourcePath()}/${biologicalFunctions.idPatient}/biological-functions`;
    const requestBody = {
      hunger: biologicalFunctions.hunger,
      hydration: biologicalFunctions.hydration,
      sleep: biologicalFunctions.sleep,
      energy: biologicalFunctions.energy
    };

    this.http.post(url, JSON.stringify(requestBody), httpOptions)
      .pipe(
        retry(2),
        catchError(error => {
          alert("Only one biological report by Day.");
          return throwError(error);
        })
      )
      .subscribe(() => {
        console.log("Biological functions created successfully.");
      });
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
