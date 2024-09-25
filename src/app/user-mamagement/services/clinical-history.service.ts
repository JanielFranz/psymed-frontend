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
    const url = `${this.resourcePath()}/${id}`;
    console.log(`Requesting URL: ${url}`);
    return this.http.get<ClinicalHistory>(url).pipe(
      map(() => true),
      catchError((error) => {
        console.error(`Error fetching clinical history with ID ${id}:`, error);
        return of(false);
      })
    );
  }



}
