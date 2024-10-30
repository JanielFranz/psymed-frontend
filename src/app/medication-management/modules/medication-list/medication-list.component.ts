import { Component, OnInit } from '@angular/core';
import { MedicationService } from '../../services/medication.service';
import { Medication } from '../../models/medication.entity';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from "@ngx-translate/core";
import { MatIcon } from "@angular/material/icon";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Store } from "@ngrx/store";
import { selectPatientId, selectRolId } from "../../../store/auth/auth.selectors";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-medication-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, TranslateModule, MatIcon, MatSlideToggleModule, FormsModule],
  templateUrl: './medication-list.component.html',
  styleUrls: ['./medication-list.component.css']
})
export class MedicationListComponent implements OnInit {
  medications: Medication[] = [];
  patientId!: number;
  role!: string | null;

  constructor(
    private medicationService: MedicationService,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.select(selectRolId).subscribe(role => {
      this.role = role;
    });

    this.patientId = +this.route.snapshot.paramMap.get('id')!;
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

  toggleStatus(medication: Medication): void {
    this.medicationService.changeStatusByMedicationId(medication.id);
  }
}
