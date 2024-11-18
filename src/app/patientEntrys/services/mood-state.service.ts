import { Injectable } from '@angular/core';
import { MoodState } from '../models/mood-state.entity';
import { BaseService } from "../../shared/services/base.service";
import {catchError, Observable, retry, switchMap, throwError} from "rxjs";
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoodStateService extends BaseService<MoodState> {
  constructor(protected override http: HttpClient) {
    super();
    this.resourceEndpoint = '/patients';
  }

  // Method to create a new mood state with a unique, sequential ID
  public createMoodState(moodState: MoodState, token: string | null): void {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Mood': moodState.mood.toString()
      })
    };

    const url = `${this.resourcePath()}/${moodState.idPatient}/mood-states`;
    const requestBody = { status: moodState.mood };
    this.http.post(url, JSON.stringify(requestBody), httpOptions)
      .pipe(
        retry(2),
        catchError(error => {
          alert("Only one mood state for day.");
          return throwError(error);
        })
      )
      .subscribe(() => {
        console.log("Mood state created successfully.");
      });
  }


  // Method to fetch all mood states by patient ID
  public getMoodStatesByPatientId(patientId: number | null, token: String | null): Observable<MoodState[]> {
    console.log(`Fetching mood states for patientId: ${patientId}...`);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    const url = `${this.resourcePath()}/${patientId}/mood-states`;
    return this.http.get<MoodState[]>(url, httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Fetch all mood states to determine the highest ID
  public getAllMoodStates(): Observable<MoodState[]> {
    console.log('Fetching all mood states...');
    const url = this.resourcePath();
    return this.http.get<MoodState[]>(url, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
