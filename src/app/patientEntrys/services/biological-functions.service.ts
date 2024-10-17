import { Injectable } from '@angular/core';
import {BiologicalFunctions} from "../models/biological-functions.entity";
import {BaseService} from "../../shared/services/base.service";
import {catchError, retry} from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class BiologicalFunctionsService extends BaseService<BiologicalFunctions> {

  constructor() {
    super();
    this.resourceEndpoint = '/biologicalFunctions';
  }
  public createBiologicalFunctions(biologicalFunctions: BiologicalFunctions, patientId: number) {
    console.log("Creating biological functions...");
    biologicalFunctions.idPatient = patientId;
    biologicalFunctions.id = 10;
    return this.create(biologicalFunctions);
  }
  public getBiologicalFunctionsByPatientId(patientId: number) {
    console.log(`Fetching biological functions for patientId: ${patientId}...`);
    const url = `${this.resourcePath()}?idPatient=${patientId}`;
    return this.http.get<BiologicalFunctions[]>(url, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
