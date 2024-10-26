import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {ClinicalHistory} from "../models/clinical-history.entity";

@Injectable({
  providedIn: 'root'
})
export class ClinicalHistoryService extends BaseService<ClinicalHistory>{

  constructor() {
    super();
    this.resourceEndpoint = '/clinicalHistories';
  }


  public updateClinicalHistory(clinicalHistory: ClinicalHistory) {
    this.update(clinicalHistory.id, clinicalHistory).subscribe(
      response => {
        console.log('Update successful', response);
      },
      error => {
        console.error('Update failed', error);
      }
    );
  }
}
