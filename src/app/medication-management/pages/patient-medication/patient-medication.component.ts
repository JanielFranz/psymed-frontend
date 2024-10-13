import { Component } from '@angular/core';
import {MedicationListComponent} from "../../modules/medication-list/medication-list.component";

@Component({
  selector: 'app-patient-medication',
  standalone: true,
  imports: [
    MedicationListComponent
  ],
  templateUrl: './patient-medication.component.html',
  styleUrl: './patient-medication.component.css'
})
export class PatientMedicationComponent {

}
