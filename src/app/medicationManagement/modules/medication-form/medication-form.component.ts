import { Component, OnInit } from '@angular/core';
import { Medication } from '../../models/medication.entity';
import { MedicationService } from '../../services/medication.service';

@Component({
  selector: 'app-medication-form',
  standalone: true,
  imports: [],
  templateUrl: './medication-form.component.html',
  styleUrls: ['./medication-form.component.css']  // Corrected styleUrls typo
})
export class MedicationFormComponent implements OnInit {
  protected medicationData!: Medication;

  constructor(private medicationService: MedicationService) {}

  private getMedicationById(id: number) {
    console.log("Fetching medication data...");
    this.medicationService.getById(id).subscribe({
      next: (response: Medication) => {
        this.medicationData = response;
        console.log("Medication data retrieved:", this.medicationData.name);
      },
      error: (error) => {
        console.error("Failed to fetch medication data:", error);
      },
      complete: () => {
        console.log("Medication data fetch completed");
      }
    });
  }


  ngOnInit(): void {
    console.log("on init");
    this.getMedicationById(1);
  }
}
