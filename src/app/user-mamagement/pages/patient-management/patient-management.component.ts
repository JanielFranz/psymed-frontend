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

  onMedicationManagementSelected(feature:{patient: Patient, feature: string}) {
    console.log('patientSelected', feature.patient.id);

    switch(feature.feature) {
      case 'edit':
        this.router.navigate(['/edit-patient', feature.patient.id]).then();
        break;
      case 'medication':
        this.router.navigate(['/medication-management', feature.patient.id]).then();
        break;
      case 'statistics':
        this.router.navigate([`/dashboard-analytics/${feature.patient.id}`]).then();
        break;
      case 'appointments':
        this.router.navigate(['/appointments', feature.patient.id]).then();
        break;
      case 'history':
        this.router.navigate(['/clinical-History', feature.patient.id]).then();
        break;

    }

  }

}
