import { Component } from '@angular/core';
import {
  ClinicalInformationPatientComponent
} from "../../components/clinical-information-patient/clinical-information-patient.component";

@Component({
  selector: 'app-patient-clinical-view',
  standalone: true,
  imports: [ClinicalInformationPatientComponent],
  templateUrl: './patient-clinical-view.component.html',
  styleUrl: './patient-clinical-view.component.css'
})
export class PatientClinicalViewComponent {

}
