import {Component, OnInit} from '@angular/core';
import {Patient} from "../../../shared/model/patient.entity";
import {PatientService} from "../../../shared/services/patient.service";
import {PatientListComponent} from "../../components/patient-list/patient-list.component";

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

  constructor(private patientService: PatientService) {

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

  onPatientSelected(patient: Patient) {
    console.log('patientSelected', patient.id);
  }

}
