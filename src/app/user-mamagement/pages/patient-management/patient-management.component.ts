import {Component, OnInit} from '@angular/core';
import {Patient} from "../../../shared/model/patient.entity";
import {PatientService} from "../../../shared/services/patient.service";
import {PatientListComponent} from "../../components/patient-list/patient-list.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-patient-management',
  standalone: true,
  imports: [
    PatientListComponent
  ],
  templateUrl: './patient-management.component.html',
  styleUrl: './patient-management.component.css'
})
export class PatientManagementComponent implements OnInit{
  protected patients!: Array<Patient>

  constructor(private patientService: PatientService, private router: Router) {

  }

  ngOnInit(): void {
        this.getAllPatients()
    }

  getAllPatients() {
    this.patientService.getAll().subscribe((response: Array<Patient>) => {
      this.patients = response;
      console.log(this.patients);
    })
  }

  onFeatureSelected(feature:{patient: Patient, feature: string}) {
    console.log('patientSelected', feature.patient.id);
    console.log('feature selected', feature.feature);
    switch(feature.feature) {
      case 'edit':
        this.router.navigate([`/patient/profile/${feature.patient.id}`]).then();
        break;
      case 'medication':
        this.router.navigate([`/patient-management/${ feature.patient.id}/medication-management`]).then();
        break;
      case 'statistics':
        this.router.navigate([`/patient-management/${feature.patient.id}/dashboard-analytics`]).then();
        break;
      case 'appointments':
        this.router.navigate([`/patient-management/${feature.patient.id}/patient-appointment-list`]).then();
        break;
      case 'history':
        this.router.navigate([`/patient-management/${feature.patient.id}/clinical-history/${feature.patient.idClinicalHistory}`]).then();
        break;
    }
  }
}
