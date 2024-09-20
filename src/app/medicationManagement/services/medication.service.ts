import { Injectable } from "@angular/core";
import { Medication } from "../models/medication.entity";
import { BaseService } from '../../shared/services/base.service';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MedicationService extends BaseService<Medication>{
  protected override resourceEndpoint = '/medications';
  constructor() {
    super();
    this.resourceEndpoint = '/medications';
  }
}
