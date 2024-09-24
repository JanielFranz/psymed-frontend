import { Component, OnInit } from '@angular/core';
import { MedicationService } from '../../services/medication.service';
import { Medication } from '../../models/medication.entity';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-medication-list',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './medication-list.component.html',
  styleUrls: ['./medication-list.component.css']
})
export class MedicationListComponent implements OnInit {
  medications: Medication[] = [];
  patientId: number = 2;
  constructor(private medicationService: MedicationService) {}

  ngOnInit(): void {
    this.medicationService.getMedicationsByPatientId(this.patientId).subscribe({
      next: (response: Medication[]) => {
        this.medications = response;
        console.log('Medications retrieved:', this.medications);
      }
    });
  }
}
