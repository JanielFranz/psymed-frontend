import { Injectable } from "@angular/core";
import { Medication } from "../models/medication.entity";
import { BaseService } from '../../shared/services/base.service';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MedicationService extends BaseService<Medication>{
  protected override resourceEndpoint = '/medications';
  private medicationData: Medication | null = null;

  constructor() {
    super();
    this.resourceEndpoint = '/medications';

  }

  public getMedicationById(id: number) {
    console.log("Fetching medication data...");
    this.getById(id).subscribe({
      next: (response: Medication) => {
        this.medicationData = response;
        console.log("Medication data retrieved:", this.medicationData);
      },
      error: (error) => {
        console.error("Failed to fetch medication data:", error);
      },
      complete: () => {
        console.log("Medication data fetch completed");
      }
    });
  }

  public createMedication(medication: Medication): Observable<Medication> {
    console.log("Creating medication...");
    return this.create(medication);
  }

}
