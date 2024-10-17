import { Component, OnInit } from '@angular/core';
import { MedicationService } from '../../services/medication.service';
import { Medication } from '../../models/medication.entity';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-medication-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, TranslateModule],
  templateUrl: './medication-list.component.html',
  styleUrls: ['./medication-list.component.css']
})
export class MedicationListComponent implements OnInit {
  medications: Medication[] = [];
  patientId!: number; // Define the patient ID as a number

  constructor(
    private medicationService: MedicationService,
    private route: ActivatedRoute // Inject the ActivatedRoute service
  ) {}

  /**
   * This method is called when the component is initialized.
   * @description
   * 1. Retrieves the patient ID from the route.
   * 2. Retrieves the medications for the patient using their ids's.
   */
  ngOnInit(): void {
    this.patientId = +this.route.snapshot.paramMap.get('id')!; // Get the patient ID from the route
    console.log('Patient ID para lista:', this.patientId);

    this.medicationService.getMedicationsByPatientId(this.patientId).subscribe({
      next: (response: Medication[]) => {
        this.medications = response;
        console.log('Medications retrieved:', this.medications);
      },
      error: (error) => {
        console.error('Error retrieving medications:', error);
      }
    });
  }
}
