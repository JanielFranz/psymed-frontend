import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {Diagnostic} from "../model/diagnostic.entity";
import {catchError, retry} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DiagnosticService extends BaseService<Diagnostic>{

  constructor() {
    super();
    this.resourceEndpoint = "/diagnostics";
  }

  public getDiagnosticByClinicalHistoryID(clinicalId: any) {
    return this.http.get<Diagnostic>(`${this.resourcePath()}/${clinicalId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  public updateDiagnostic(diagnostic: Diagnostic){
    this.update(diagnostic.id,diagnostic).subscribe(
      response => {
        console.log('Update successful', response);
      },
      error => {
        console.error('Update failed', error);
      }

    );
  }

}
