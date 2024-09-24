import { Injectable } from '@angular/core';
import { MoodState } from '../models/mood-state.entity';
import { BaseService} from "../../shared/services/base.service";
import {catchError, retry} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class MoodStateService extends BaseService<MoodState> {
  constructor() {
    super();
    this.resourceEndpoint = '/patientMoods';
  }

  public createMoodState(moodState: MoodState, patientId: number) {
    console.log("Creating mood state...");
    moodState.idPatient = patientId;
    return this.create(moodState);
  }

  public getMoodStatesByPatientId(patientId: number) {
    console.log(`Fetching mood states for patientId: ${patientId}...`);
    const url = `${this.resourcePath()}?patientId=${patientId}`;
    return this.http.get<MoodState[]>(url, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

}
