import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {catchError, map, Observable, of, retry} from "rxjs";
import {ClinicalHistory} from "../model/clinical-history.entity";

@Injectable({
  providedIn: 'root'
})
export class ClinicalHistoryService extends BaseService<ClinicalHistoryService> {
  protected override resourceEndpoint = '/medical-prescriptions';
  private clinicalHistoryData: ClinicalHistory | null = null;

  constructor() {
    super();
    this.resourceEndpoint='/clinicalHistories';
  }


  public updateClinicalHistory(id: any, item: any): Observable<ClinicalHistory> {
    return this.http.put<ClinicalHistory>(`${this.resourcePath()}/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  existsById(id: number): Observable<boolean> {
    return this.http.get<ClinicalHistory>(`${this.resourcePath}/${id}`).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }



}
