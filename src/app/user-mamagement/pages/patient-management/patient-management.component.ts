import { Component, OnInit } from '@angular/core';
import { Patient } from "../../../shared/model/patient.entity";
import { PatientService } from "../../../shared/services/patient.service";
import { PatientListComponent } from "../../components/patient-list/patient-list.component";
import { Router } from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {PatientFormComponent} from "../../components/patient-form/patient-form.component";
import {UserManagementService} from "../../services/user-management.service";
import {PatientProfile} from "../../../shared/model/patient-profile.entity";

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
  protected patients!: Array<PatientProfile>;

  constructor(private router: Router, private dialog: MatDialog, private patientService: UserManagementService) {}

  ngOnInit(): void {
    this.getAllPatients();
  }

  getAllPatients() {
    this.patientService.getPatientsByProfessionalId(localStorage.getItem("profileId"), localStorage.getItem("authToken"))
      .subscribe((profiles: Array<PatientProfile>) => {
        this.patients = profiles;
        console.log("profiles obtenidos to list", JSON.stringify(profiles));
      });
  }
  openForm(): void {
    const dialogRef = this.dialog.open(PatientFormComponent);

    dialogRef.componentInstance.formClosed.subscribe(() => {
      dialogRef.close();
      // Handle form closed event (e.g., refresh the list)
    });
  }


  onFeatureSelected(feature: { patient: PatientProfile, feature: string }) {
    const { patient, feature: featureName } = feature;
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
        if (patient.professionalId) {
          this.router.navigate([`/patient-management/${patient.id}/clinical-history/${patient.id}`]).then();
        } else {
          console.error(`Clinical history ID is missing for patient ID: ${patient.id}`);
          // Optionally, add user feedback here if needed
        }
        break;
    }
  }
}
