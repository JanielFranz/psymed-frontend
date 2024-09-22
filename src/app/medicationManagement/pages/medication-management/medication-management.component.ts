import { Component } from '@angular/core';
import { MedicationFormComponent} from "../../modules/medication-form/medication-form.component";

@Component({
  selector: 'app-medication-management',
  standalone: true,
  imports: [MedicationFormComponent],
  templateUrl: './medication-management.component.html',
  styleUrl: './medication-management.component.css'
})
export class MedicationManagementComponent {

}

