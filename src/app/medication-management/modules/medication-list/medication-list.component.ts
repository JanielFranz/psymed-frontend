import { Component, OnInit } from '@angular/core';
import { MedicationService } from '../../services/medication.service';
import { Medication } from '../../models/medication.entity';
import { ActivatedRoute } from '@angular/router';
import {MedicationEditModalComponent} from "../medication-edit-modal/medication-edit-modal.component";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";

@Component({
  selector: 'app-medication-list',
  templateUrl: './medication-list.component.html',
  standalone: true,
  imports: [
    MatSlideToggle,
    NgIf,
    FormsModule,
    TranslateModule,
    MatIcon,
    MatButton,
    DatePipe,
    MatCardTitle,
    MatCardContent,
    MatCardHeader,
    MatCard,
    NgForOf
  ],
  styleUrls: ['./medication-list.component.css']
})
export class MedicationListComponent implements OnInit {
  medications: Medication[] = [];
  patientId!: number;
  role!: string | null;
  private dialog: any;

  constructor(
    private medicationService: MedicationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.patientId = +this.route.snapshot.paramMap.get('id')!;
    this.medicationService.fetchMedicationsByPatientId(this.patientId);  // Initial fetch of medications
    this.medicationService.medications$.subscribe(medications => {
      this.medications = medications;
    });
  }

  toggleStatus(medication: Medication): void {
    this.medicationService.changeStatusByMedicationId(medication.id);
  }

  openEditModal(medication: Medication): void {
    const dialogRef = this.dialog.open(MedicationEditModalComponent, {
      width: '400px',
      data: medication
    });

    dialogRef.afterClosed().subscribe((result: Medication) => {
      if (result) {
        const index = this.medications.findIndex(m => m.id === result.id);
        if (index !== -1) {
          this.medications[index] = result;
        }
      }
    });
  }
}
