import { Component, Input, OnInit } from '@angular/core';
import { ClinicalHistoryService } from '../../services/clinical-history.service';
import { ClinicalHistory } from "../../models/clinical-history.entity";
import { ActivatedRoute, Router } from "@angular/router";
import { Patient } from "../../../shared/model/patient.entity";
import { PatientService } from "../../../shared/services/patient.service";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: 'app-clinical-information',
  standalone: true,
  imports: [
    TranslateModule
  ],
  templateUrl: './clinical-information.component.html',
  styleUrls: ['./clinical-information.component.css']
})
export class ClinicalInformationComponent implements OnInit {
  @Input() clinicalHistory!: ClinicalHistory;
  @Input() patient!: Patient;

  constructor(
    private clinicalHistoryService: ClinicalHistoryService,
    private route: ActivatedRoute,
    private patientService: PatientService,
    private router: Router
  ) {}

  loadClinicalHistory() {
    const clinicalId = this.route.snapshot.params['clinicalHistoryId'];
    const id = this.route.snapshot.params['id'];

    // Check if clinicalId is available; log an error if missing
    if (!clinicalId) {
      console.error('No clinicalHistoryId found in route.');
      return; // Exit to avoid making the API call
    }

    // Fetch patient information
    this.patientService.getById(id).subscribe(
      (patient: Patient) => {
        this.patient = patient;
        console.log('Loaded patient:', this.patient);
      },
      (error) => {
        console.error('Error loading patient:', error);
      }
    );

    // Fetch clinical history information
    this.clinicalHistoryService.getById(clinicalId).subscribe(
      (clinicalHistory: ClinicalHistory) => {
        this.clinicalHistory = clinicalHistory;
        console.log('Loaded clinical history:', this.clinicalHistory);
      },
      (error) => {
        console.error('Error loading clinical history:', error);
      }
    );
  }

  redirectToAdminEdit() {
    this.router.navigate([`./admin-edit`], { relativeTo: this.route });
  }

  redirectToDiagnostic() {
    this.router.navigate([`./diagnostic`], { relativeTo: this.route });
  }

  ngOnInit() {
    this.loadClinicalHistory();
  }
}
