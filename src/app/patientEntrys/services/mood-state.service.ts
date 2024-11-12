import { Injectable } from '@angular/core';
import { MoodState } from '../models/mood-state.entity';
import { BaseService } from "../../shared/services/base.service";
import { catchError, Observable, retry, switchMap } from "rxjs";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoodStateService extends BaseService<MoodState> {
  constructor(protected override http: HttpClient) {
    super();
    this.resourceEndpoint = '/patientMoods';
  }

  // Method to create a new mood state with a unique, sequential ID
  public createMoodState(moodState: MoodState, patientId: number): Observable<any> {
    console.log("Creating mood state...");
    moodState.idPatient = patientId;

    return this.getAllMoodStates().pipe(
      switchMap((allMoodStates) => {
        const maxId = allMoodStates.length > 0 ? Math.max(...allMoodStates.map(m => m.id)) : 0;
        moodState.id = maxId + 1;

        // Create the mood state with the new ID
        return this.create(moodState);
      }),
      catchError(this.handleError)
    );
  }

  // Method to fetch all mood states by patient ID
  public getMoodStatesByPatientId(patientId: number): Observable<MoodState[]> {
    console.log(`Fetching mood states for patientId: ${patientId}...`);
    const url = `${this.resourcePath()}?idPatient=${patientId}`;
    return this.http.get<MoodState[]>(url, this.httpOptions)
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
