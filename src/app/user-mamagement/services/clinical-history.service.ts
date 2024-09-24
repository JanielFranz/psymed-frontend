import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {catchError, Observable, retry} from "rxjs";
import {ClinicalHistory} from "../model/clinical-history.entity";

@Injectable({
  providedIn: 'root'
})
export class ClinicalHistoryService extends BaseService<ClinicalHistoryService> {

  constructor() {
    super();
    this.resourceEndpoint='/clinical-history';
  }

  public createClinicalHistory(item: any): Observable<ClinicalHistory> {
    return this.http.post<ClinicalHistory>(this.resourcePath(), JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  public updateClinicalHistory(id: any, item: any): Observable<ClinicalHistory> {
    return this.http.put<ClinicalHistory>(`${this.resourcePath()}/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
