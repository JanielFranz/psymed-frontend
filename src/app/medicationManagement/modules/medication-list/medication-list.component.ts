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

  constructor(private medicationService: MedicationService) {}

  ngOnInit(): void {
    this.medicationService.getAllMedications().subscribe({
      next: (response: Medication[]) => {
        this.medications = response;
        console.log('Medications retrieved:', this.medications);
      },
      error: (error) => {
        console.error('Failed to fetch medications:', error);
      }
    });
  }
}
