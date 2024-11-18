import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {PatientProfile} from "../../shared/model/patient-profile.entity";
import {catchError, Observable, retry} from "rxjs";
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserManagementService extends BaseService<PatientProfile>{

  constructor() {
    super();
    this.resourceEndpoint = "/patient-profiles"

  }

  public createPatientProfile(patientProfile: PatientProfile, token: string): Observable<PatientProfile> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.post<PatientProfile>(this.resourcePath(), JSON.stringify(patientProfile), httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  public getPatientsByProfessionalId(professionalId: string | null, token: string | null): Observable<PatientProfile[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.get<PatientProfile[]>(`${this.resourcePath()}/professional/${professionalId}`, httpOptions);
  }


}
