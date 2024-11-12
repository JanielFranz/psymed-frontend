import { Component, OnInit } from '@angular/core';
import { Patient } from "../../../shared/model/patient.entity";
import { PatientService } from "../../../shared/services/patient.service";
import { PatientListComponent } from "../../components/patient-list/patient-list.component";
import { Router } from "@angular/router";

@Component({
  selector: 'app-patient-management',
  standalone: true,
  imports: [
    PatientListComponent
  ],
  templateUrl: './patient-management.component.html',
  styleUrls: ['./patient-management.component.css']
})
export class PatientManagementComponent implements OnInit {
  protected patients!: Array<Patient>;

  constructor(private patientService: PatientService, private router: Router) {}

  ngOnInit(): void {
    this.getAllPatients();
  }

  getAllPatients() {
    this.patientService.getAll().subscribe((response: Array<Patient>) => {
      this.patients = response;
      console.log(this.patients);
    });
  }

  onFeatureSelected(feature: { patient: Patient, feature: string }) {
    const { patient, feature: featureName } = feature;
    console.log('patientSelected', patient.id);
    console.log('feature selected', featureName);

    switch (featureName) {
      case 'edit':
        this.router.navigate([`/patient/profile/${patient.id}`]).then();
        break;
      case 'medication':
        this.router.navigate([`/patient-management/${patient.id}/medication-management`]).then();
        break;
      case 'statistics':
        this.router.navigate([`/patient-management/${patient.id}/dashboard-analytics`]).then();
        break;
      case 'appointments':
        this.router.navigate([`/patient-management/${patient.id}/patient-appointment-list`]).then();
        break;
      case 'history':
        if (patient.idClinicalHistory) {
          this.router.navigate([`/patient-management/${patient.id}/clinical-history/${patient.idClinicalHistory}`]).then();
        } else {
          console.error(`Clinical history ID is missing for patient ID: ${patient.id}`);
          // Optionally, add user feedback here if needed
        }
        break;
    }
  }
}
